/**
 * 远程内容（content.json）的数据结构。
 *
 * App Store 审核指南 2.5.2：App 只下载**数据**（这份 JSON 里的条目文字、出处、日期、视频 ID），
 * 从不下载、也不执行任何代码。JSON 只会被 JSON.parse 读成普通对象，经过逐字段校验后交给
 * 已经打包在 App 里的界面渲染；这里没有 eval、没有动态 import、没有远程脚本或 HTML。
 *
 * 改结构时：不兼容的改动必须把 CONTENT_SCHEMA 加一，并换一个新路径（/content/v2/），
 * 旧版 App 继续读 v1，不会拿到它看不懂的数据。
 */
import type { Myth, MythText } from '../types'
import type { EntryVideo } from '../data/videos'
import type { PlayQuestion } from '../data/play'

export const CONTENT_SCHEMA = 1
export const CONTENT_PATH = '/content/v1/content.json'
export const CONTENT_URL = `https://actually-not.com${CONTENT_PATH}`

export type Revision = { added: string; updated: string }

/**
 * 英文文字。出处的 url 和中文版逐条相同（内容测试保证），所以这里只存 label，
 * 读取时按下标从中文条目补回 url，JSON 里不重复存一遍链接。
 */
export type EnglishText = Omit<MythText, 'sources'> & { sources: string[] }

/** 参与版本哈希的内容主体 */
export interface ContentBody {
  /** 中文条目（结构字段 + 中文文字），完整集合，不按平台过滤 */
  entries: Myth[]
  en: Record<string, EnglishText>
  revisions: Record<string, Revision>
  videos: Record<string, EntryVideo>
  play: PlayQuestion[]
}

export interface ContentPayload extends ContentBody {
  schema: typeof CONTENT_SCHEMA
  /** 内容主体的哈希：内容不变，版本就不变 */
  version: string
  /** 内容的时间（构建时 git HEAD 的提交时间）。只有比手上这份更新才会被采用 */
  contentAt: string
  /** 生成这份文件的时间，仅供排查 */
  generatedAt: string
}

/** App 运行时实际使用的一份内容（已按平台过滤、英文已展开） */
export interface ContentSnapshot {
  version: string
  contentAt: string
  entries: Myth[]
  en: Record<string, MythText>
  revisions: Record<string, Revision>
  videos: Record<string, EntryVideo>
  play: PlayQuestion[]
}
