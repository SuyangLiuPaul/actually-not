/**
 * 打包内容 ⇄ 远程 JSON 的互相转换。纯函数，没有副作用：
 * 构建期（vite 预渲染插件、scripts/mobile/build.mjs，在 node 里直接 import）和 App 运行时共用。
 * 运行时依赖只能用带 .ts 扩展名的相对路径，node 才能直接加载。
 */
import type { Myth, MythText } from '../types'
import type { EntryVideo } from '../data/videos'
import type { PlayQuestion } from '../data/play'
import { CONTENT_SCHEMA, type ContentBody, type ContentPayload, type EnglishText, type Revision } from './schema.ts'

export interface ContentSources {
  myths: readonly Myth[]
  en: Record<string, MythText>
  revisions: Record<string, Revision>
  videos: Record<string, EntryVideo>
  play: readonly PlayQuestion[]
}

/** 64 位左右的字符串哈希（两路 cyrb53），只用于识别「内容变没变」，不是安全用途。 */
export function hashString(text: string): string {
  const run = (seed: number) => {
    let h1 = 0xdeadbeef ^ seed
    let h2 = 0x41c6ce57 ^ seed
    for (let i = 0; i < text.length; i++) {
      const ch = text.charCodeAt(i)
      h1 = Math.imul(h1 ^ ch, 2654435761)
      h2 = Math.imul(h2 ^ ch, 1597334677)
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, '0')
  }
  return run(0) + run(0x9e3779b9)
}

export function contentVersion(body: ContentBody): string {
  return hashString(JSON.stringify([body.entries, body.en, body.revisions, body.videos, body.play]))
}

/** 打包数据 → 内容主体（英文出处只留 label，url 由中文补回） */
export function buildContentBody(src: ContentSources): ContentBody {
  const ids = new Set(src.myths.map((m) => m.id))
  const en: Record<string, EnglishText> = {}
  for (const m of src.myths) {
    const t = src.en[m.id]
    if (!t) throw new Error(`内容导出：${m.id} 缺英文翻译`)
    en[m.id] = { belief: t.belief, truth: t.truth, detail: t.detail, origin: t.origin, instead: t.instead, sources: t.sources.map((s) => s.label) }
  }
  const pick = <T,>(record: Record<string, T>) => Object.fromEntries(Object.entries(record).filter(([id]) => ids.has(id)))
  return {
    entries: src.myths.map((m) => ({ ...m })),
    en,
    revisions: pick(src.revisions),
    videos: pick(src.videos),
    play: src.play.filter((q) => ids.has(q.id)).map((q) => ({ ...q })),
  }
}

export function buildContentPayload(src: ContentSources, meta: { contentAt: string; generatedAt: string }): ContentPayload {
  const body = buildContentBody(src)
  return { schema: CONTENT_SCHEMA, version: contentVersion(body), contentAt: meta.contentAt, generatedAt: meta.generatedAt, ...body }
}

/** 远程英文 → 和 myths-en.ts 一样的 MythText（按下标补回中文条目的出处 url） */
export function expandEnglish(entries: readonly Myth[], en: Record<string, EnglishText>): Record<string, MythText> {
  const out: Record<string, MythText> = {}
  for (const m of entries) {
    const t = en[m.id]
    if (!t) continue
    out[m.id] = {
      belief: t.belief, truth: t.truth, detail: t.detail, origin: t.origin, instead: t.instead,
      sources: t.sources.map((label, i) => (m.sources[i]?.url ? { label, url: m.sources[i].url } : { label })),
    }
  }
  return out
}
