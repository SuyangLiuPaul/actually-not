/**
 * 远程内容的真机接线：Capacitor Filesystem 做缓存，fetch 拉 actually-not.com 上的 JSON。
 * 只在原生 App 里调用（NativeApp 挂载时）；网站和 /app/ 网页预览都不调用，继续只用打包数据。
 *
 * App Store 审核指南 2.5.2：下载的是 JSON 数据，不是代码。见 loader.ts 顶部说明。
 */
import { Capacitor } from '@capacitor/core'
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'
import { mythsFor } from '../data/localized'
import { APP_PLATFORM } from '../data/platform'
import { contentOverride, setContentOverride } from './current'
import { startRemoteContent, type ContentMeta, type ContentStorage } from './loader'
import { CONTENT_URL } from './schema'

/** 打包进这个安装包的内容的版本与时间（scripts/mobile/build.mjs 在构建时注入） */
export const BUNDLED_CONTENT = {
  version: String(import.meta.env.VITE_CONTENT_VERSION || 'bundled'),
  contentAt: String(import.meta.env.VITE_CONTENT_AT || '1970-01-01T00:00:00.000Z'),
}

const CACHE_PATH = 'content/v1/content.json'
const BAD_VERSION_KEY = 'content-bad-version'

const filesystemStorage: ContentStorage = {
  async read() {
    try {
      const file = await Filesystem.readFile({ path: CACHE_PATH, directory: Directory.Data, encoding: Encoding.UTF8 })
      return typeof file.data === 'string' ? file.data : null
    } catch {
      return null // 第一次启动还没有缓存
    }
  },
  async write(text) {
    await Filesystem.writeFile({ path: CACHE_PATH, data: text, directory: Directory.Data, encoding: Encoding.UTF8, recursive: true })
  },
}

function activeContent(): ContentMeta {
  const remote = contentOverride()
  if (remote) return { version: remote.version, contentAt: remote.contentAt, count: remote.entries.length }
  return { ...BUNDLED_CONTENT, count: mythsFor('zh').length }
}

function badVersion(): string | null {
  try { return localStorage.getItem(BAD_VERSION_KEY) } catch { return null }
}

/**
 * 界面在远程内容上出错时调用：记下这个版本以后不再用，退回打包数据。
 * 返回 true 表示确实退回了（调用方可以重渲染）；当前本来就是打包数据则返回 false。
 */
export function revertToBundledContent(): boolean {
  const remote = contentOverride()
  if (!remote) return false
  try { localStorage.setItem(BAD_VERSION_KEY, remote.version) } catch { /* 记不住也要先退回 */ }
  setContentOverride(null)
  return true
}

let started = false
export function startNativeContent(): void {
  if (started || !Capacitor.isNativePlatform()) return
  started = true
  void startRemoteContent({
    platform: APP_PLATFORM,
    storage: filesystemStorage,
    async fetchText(signal) {
      const res = await fetch(CONTENT_URL, { signal, cache: 'no-cache', credentials: 'omit' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.text()
    },
    active: activeContent,
    apply: setContentOverride,
    badVersion,
  }).catch(() => { /* loader 本身不抛；这里只是双保险 */ })
}
