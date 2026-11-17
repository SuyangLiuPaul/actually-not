/**
 * 当前生效的远程内容（没有就是 null，各数据访问函数回退到打包数据）。
 *
 * 只有原生 App 会设置它（见 src/content/native.ts）；网站永远是 null，行为和以前完全一样。
 * 这个模块没有运行时依赖，所以 data/localized.ts、data/videos.ts 可以放心 import，不会循环引用。
 */
import type { ContentSnapshot } from './schema'

let override: ContentSnapshot | null = null
let revision = 0
const listeners = new Set<() => void>()

export function contentOverride(): ContentSnapshot | null { return override }

/** 换上一份内容（null = 回到打包数据），并通知界面重渲染 */
export function setContentOverride(next: ContentSnapshot | null) {
  override = next
  revision++
  for (const fn of listeners) fn()
}

export function subscribeContent(fn: () => void): () => void {
  listeners.add(fn)
  return () => { listeners.delete(fn) }
}

/** 内容每换一次加一 */
export function contentRevision(): number { return revision }
