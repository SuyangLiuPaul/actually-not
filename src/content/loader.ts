/**
 * 原生 App 的「不发版也能更新内容」：启动时先用手上已有的内容渲染，后台再看有没有更新的。
 *
 *   1. 启动立即渲染打包数据（这一步和以前完全一样，不等任何东西）。
 *   2. 读本机缓存：合法、且比打包数据新 → 换上。
 *   3. 后台拉远程 JSON（约 5 秒超时）：合法、比当前这份新、条目数没有骤降 → 存进缓存并换上。
 *   任何一步失败（没网、超时、半截文件、结构不对）都只是保持当前这份，不报错、不白屏。
 *
 * App Store 审核指南 2.5.2：这里下载的只是 JSON **数据**（条目文字、出处、日期、视频 ID），
 * 只经 JSON.parse + 逐字段校验后交给已打包的界面渲染；从不下载或执行代码（没有 eval / 动态 import / 远程脚本）。
 *
 * 这个文件不依赖 Capacitor，所有外部能力（存储、网络、换内容）都从参数传入，方便测试；
 * 真机接线在 src/content/native.ts。
 */
import { filterMythsForPlatform } from '../data/platform'
import { expandEnglish } from './payload'
import type { ContentPayload, ContentSnapshot } from './schema'
import { validateContentPayload } from './validate'

/** 条目数比当前少这么多以上就当作坏数据（比如导出出了问题），不采用 */
export const MAX_ENTRY_DROP = 0.2
export const FETCH_TIMEOUT_MS = 5000
/** 远程文件的大小上限（现在约 1 MB），防止异常响应把内存吃满 */
export const MAX_CONTENT_BYTES = 8 * 1024 * 1024

export interface ContentMeta { version: string; contentAt: string; count: number }

export interface ContentStorage {
  read(): Promise<string | null>
  write(text: string): Promise<void>
}

export interface LoaderDeps {
  /** 构建平台（'android' 时去掉医疗分类，见 data/platform.ts） */
  platform: string | undefined
  storage: ContentStorage
  fetchText(signal: AbortSignal): Promise<string>
  /** 当前生效的这份内容（打包数据或已换上的远程内容）的版本、时间、条目数 */
  active(): ContentMeta
  apply(snapshot: ContentSnapshot): void
  /** 曾经导致界面出错的版本：不再采用 */
  badVersion?(): string | null
  timeoutMs?: number
}

export type Outcome = 'applied' | 'missing' | 'invalid' | 'not-newer' | 'dropped' | 'bad-version' | 'error'

/**
 * 远程内容 → App 用的一份。按平台过滤：Android 去掉 urgent / body 条目，
 * related 里指向它们的链接、它们的英文、视频、修订日期、玩法题一并去掉——和打包时的过滤是同一个函数。
 */
export function snapshotFromPayload(payload: ContentPayload, platform: string | undefined): ContentSnapshot {
  const entries = filterMythsForPlatform(payload.entries, platform)
  const ids = new Set(entries.map((m) => m.id))
  const keep = <T,>(record: Record<string, T>) => Object.fromEntries(Object.entries(record).filter(([id]) => ids.has(id)))
  return {
    version: payload.version,
    contentAt: payload.contentAt,
    entries,
    en: expandEnglish(entries, payload.en),
    revisions: keep(payload.revisions),
    videos: keep(payload.videos),
    play: payload.play.filter((q) => ids.has(q.id)),
  }
}

type Judged = { ok: true; snapshot: ContentSnapshot } | { ok: false; outcome: Outcome; reason: string }

/** 解析 + 校验 + 判断是否比当前这份新。纯函数，不碰存储和界面。 */
export function judgeContent(text: string, deps: Pick<LoaderDeps, 'platform' | 'active' | 'badVersion'>): Judged {
  let raw: unknown
  try { raw = JSON.parse(text) } catch { return { ok: false, outcome: 'invalid', reason: '不是合法 JSON' } }
  const result = validateContentPayload(raw)
  if (!result.ok) return { ok: false, outcome: 'invalid', reason: result.reason }
  const payload = result.payload
  if (deps.badVersion?.() === payload.version) return { ok: false, outcome: 'bad-version', reason: `版本 ${payload.version} 曾导致界面出错` }
  const active = deps.active()
  const newer = payload.version !== active.version && Date.parse(payload.contentAt) > (Date.parse(active.contentAt) || 0)
  if (!newer) return { ok: false, outcome: 'not-newer', reason: `不比当前这份新（${payload.contentAt} ≤ ${active.contentAt}）` }
  const snapshot = snapshotFromPayload(payload, deps.platform)
  if (snapshot.entries.length < active.count * (1 - MAX_ENTRY_DROP)) {
    return { ok: false, outcome: 'dropped', reason: `条目数从 ${active.count} 骤降到 ${snapshot.entries.length}` }
  }
  return { ok: true, snapshot }
}

/** 启动时：本机缓存比打包数据新就换上 */
export async function loadCachedContent(deps: LoaderDeps): Promise<Outcome> {
  try {
    const text = await deps.storage.read()
    if (!text) return 'missing'
    const judged = judgeContent(text, deps)
    if (!judged.ok) return judged.outcome
    deps.apply(judged.snapshot)
    return 'applied'
  } catch {
    return 'error'
  }
}

function withTimeout<T>(work: (signal: AbortSignal) => Promise<T>, ms: number): Promise<T> {
  const controller = new AbortController()
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => { controller.abort(); reject(new Error('timeout')) }, ms)
  })
  return Promise.race([work(controller.signal), timeout]).finally(() => clearTimeout(timer))
}

/** 后台：拉远程 JSON，合法且更新就先存缓存、再换上 */
export async function refreshRemoteContent(deps: LoaderDeps): Promise<Outcome> {
  try {
    const text = await withTimeout((signal) => deps.fetchText(signal), deps.timeoutMs ?? FETCH_TIMEOUT_MS)
    if (text.length > MAX_CONTENT_BYTES) return 'invalid'
    const judged = judgeContent(text, deps)
    if (!judged.ok) return judged.outcome
    // 存不进去也照样换上：这次能看到，下次启动再拉一次
    try { await deps.storage.write(text) } catch { /* 忽略 */ }
    deps.apply(judged.snapshot)
    return 'applied'
  } catch {
    return 'error'
  }
}

export async function startRemoteContent(deps: LoaderDeps): Promise<{ cached: Outcome; remote: Outcome }> {
  const cached = await loadCachedContent(deps)
  const remote = await refreshRemoteContent(deps)
  return { cached, remote }
}
