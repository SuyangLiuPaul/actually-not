/**
 * 远程内容的校验。远程 JSON 只要有一处不对就整份不用（回退到手上已有的那份），
 * 绝不让半份或坏数据进入界面：界面代码默认每个字段都在（比如 categoryLabel 里的 `!`）。
 */
import { ALL_CATEGORY_IDS } from '../types'
import { CONTENT_SCHEMA, type ContentPayload } from './schema'
import { contentVersion } from './payload'

export type ValidationResult = { ok: true; payload: ContentPayload } | { ok: false; reason: string }

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/
const DAY = /^\d{4}-\d{2}-\d{2}$/
const YOUTUBE_ID = /^(PENDING|[A-Za-z0-9_-]{6,20})$/
const STAKES = new Set(['harmless', 'wasteful', 'risky'])
const CONFIDENCE = new Set(['strong', 'limited', 'debated'])
const TOPICS = new Set(['quote', 'film', 'why'])
const TEXT_FIELDS = ['belief', 'truth', 'detail', 'origin', 'instead'] as const

class Invalid extends Error {}
function fail(reason: string): never { throw new Invalid(reason) }
function isObject(v: unknown): v is Record<string, unknown> { return typeof v === 'object' && v !== null && !Array.isArray(v) }
function text(v: unknown, where: string): string {
  if (typeof v !== 'string' || v.trim() === '') fail(`${where} 不是非空字符串`)
  return v
}
function isoTime(v: unknown, where: string) { if (typeof v !== 'string' || Number.isNaN(Date.parse(v))) fail(`${where} 不是合法时间`) }
function httpsUrl(v: unknown, where: string) {
  if (typeof v !== 'string') fail(`${where} 不是字符串`)
  let u: URL
  try { u = new URL(v) } catch { fail(`${where} 不是合法网址`) }
  if (u.protocol !== 'https:') fail(`${where} 不是 https`)
}

function checkEntries(raw: unknown): Set<string> {
  if (!Array.isArray(raw) || raw.length === 0) fail('entries 为空')
  const ids = new Set<string>()
  for (const [i, m] of raw.entries()) {
    const at = `entries[${i}]`
    if (!isObject(m)) fail(`${at} 不是对象`)
    if (typeof m.id !== 'string' || !ID.test(m.id)) fail(`${at}.id 不合法`)
    if (ids.has(m.id)) fail(`id 重复：${m.id}`)
    ids.add(m.id)
    if (!(ALL_CATEGORY_IDS as readonly unknown[]).includes(m.category)) fail(`${m.id} 分类未知：${String(m.category)}`)
    if (!STAKES.has(m.stakes as string)) fail(`${m.id} stakes 未知`)
    if (!CONFIDENCE.has(m.confidence as string)) fail(`${m.id} confidence 未知`)
    for (const f of TEXT_FIELDS) text(m[f], `${m.id}.${f}`)
    if (!Array.isArray(m.sources) || m.sources.length === 0) fail(`${m.id} 没有出处`)
    for (const [j, s] of m.sources.entries()) {
      if (!isObject(s)) fail(`${m.id}.sources[${j}] 不是对象`)
      text(s.label, `${m.id}.sources[${j}].label`)
      if (s.url !== undefined) httpsUrl(s.url, `${m.id}.sources[${j}].url`)
    }
    if (m.related !== undefined && (!Array.isArray(m.related) || m.related.some((r) => typeof r !== 'string'))) fail(`${m.id}.related 不合法`)
  }
  for (const m of raw as { id: string; related?: string[] }[]) {
    for (const r of m.related ?? []) if (!ids.has(r)) fail(`${m.id}.related 指向不存在的条目 ${r}`)
  }
  return ids
}

function checkEnglish(raw: unknown, entries: { id: string; sources: unknown[] }[]) {
  if (!isObject(raw)) fail('en 不是对象')
  for (const m of entries) {
    const t = raw[m.id]
    if (!isObject(t)) fail(`${m.id} 缺英文`)
    for (const f of TEXT_FIELDS) text(t[f], `en.${m.id}.${f}`)
    if (!Array.isArray(t.sources) || t.sources.length !== m.sources.length) fail(`en.${m.id}.sources 数量和中文不一致`)
    t.sources.forEach((label, j) => text(label, `en.${m.id}.sources[${j}]`))
  }
}

function checkRevisions(raw: unknown) {
  if (!isObject(raw)) fail('revisions 不是对象')
  for (const [id, r] of Object.entries(raw)) {
    if (!isObject(r) || typeof r.added !== 'string' || !DAY.test(r.added) || typeof r.updated !== 'string' || !DAY.test(r.updated)) fail(`revisions.${id} 不合法`)
  }
}

function checkVideos(raw: unknown) {
  if (!isObject(raw)) fail('videos 不是对象')
  for (const [id, v] of Object.entries(raw)) {
    const at = `videos.${id}`
    if (!isObject(v)) fail(`${at} 不是对象`)
    if (typeof v.youtubeId !== 'string' || !YOUTUBE_ID.test(v.youtubeId)) fail(`${at}.youtubeId 不合法`)
    if (typeof v.durationSec !== 'number' || !(v.durationSec > 0)) fail(`${at}.durationSec 不合法`)
    text(v.style, `${at}.style`)
    if (v.publishAt !== undefined) isoTime(v.publishAt, `${at}.publishAt`)
    if (v.landscape !== undefined && typeof v.landscape !== 'boolean') fail(`${at}.landscape 不合法`)
    if (v.en !== undefined) {
      if (!isObject(v.en) || typeof v.en.youtubeId !== 'string' || !YOUTUBE_ID.test(v.en.youtubeId)) fail(`${at}.en 不合法`)
      if (v.en.durationSec !== undefined && (typeof v.en.durationSec !== 'number' || !(v.en.durationSec > 0))) fail(`${at}.en.durationSec 不合法`)
      if (v.en.publishAt !== undefined) isoTime(v.en.publishAt, `${at}.en.publishAt`)
    }
  }
}

function checkPlay(raw: unknown, ids: Set<string>) {
  if (!Array.isArray(raw)) fail('play 不是数组')
  const seen = new Set<string>()
  for (const [i, q] of raw.entries()) {
    const at = `play[${i}]`
    if (!isObject(q) || typeof q.id !== 'string' || !ids.has(q.id)) fail(`${at} 指向不存在的条目`)
    if (seen.has(q.id)) fail(`${at} 重复`)
    seen.add(q.id)
    if (!TOPICS.has(q.topic as string)) fail(`${at}.topic 未知`)
    if (!isObject(q.question)) fail(`${at}.question 不合法`)
    text(q.question.zh, `${at}.question.zh`)
    text(q.question.en, `${at}.question.en`)
    if (!isObject(q.choices)) fail(`${at}.choices 不合法`)
    for (const lang of ['zh', 'en'] as const) {
      const c = q.choices[lang]
      if (!Array.isArray(c) || c.length !== 3) fail(`${at}.choices.${lang} 必须是 3 个选项`)
      c.forEach((s, j) => text(s, `${at}.choices.${lang}[${j}]`))
    }
    if (q.answer !== 0 && q.answer !== 1 && q.answer !== 2) fail(`${at}.answer 不合法`)
  }
}

/** 逐字段校验；任何一处不对都返回 ok:false 和原因，从不抛异常。 */
export function validateContentPayload(raw: unknown): ValidationResult {
  try {
    if (!isObject(raw)) fail('不是 JSON 对象')
    if (raw.schema !== CONTENT_SCHEMA) fail(`schema 不是 ${CONTENT_SCHEMA}：${String(raw.schema)}`)
    text(raw.version, 'version')
    isoTime(raw.contentAt, 'contentAt')
    isoTime(raw.generatedAt, 'generatedAt')
    const ids = checkEntries(raw.entries)
    checkEnglish(raw.en, raw.entries as { id: string; sources: unknown[] }[])
    checkRevisions(raw.revisions)
    checkVideos(raw.videos)
    checkPlay(raw.play, ids)
    // 哈希对得上，才说明拿到的是完整的一份（不是半截下载或被改过的文件）
    if (contentVersion(raw as unknown as ContentPayload) !== raw.version) fail('version 和内容哈希不符')
    return { ok: true, payload: raw as unknown as ContentPayload }
  } catch (e) {
    if (e instanceof Invalid) return { ok: false, reason: e.message }
    return { ok: false, reason: `校验出错：${e instanceof Error ? e.message : String(e)}` }
  }
}
