/**
 * 打包进代码的全部内容，整理成导出远程 JSON 用的形状。
 * 构建期由 entry-server.tsx（SSR bundle）调用，网站构建时没有 VITE_APP_PLATFORM，所以这里永远是完整集合；
 * scripts/mobile/build.mjs 在 node 里直接 import 它算安装包内容的版本号，所以相对路径都带 .ts。
 * Android 的过滤发生在 App 读到远程内容之后（loader.ts 的 snapshotFromPayload）。
 */
import { MYTHS } from '../data/myths.ts'
import { MYTHS_EN } from '../data/myths-en.ts'
import { REVISIONS } from '../data/revisions.ts'
import { STAGING_REVISIONS } from '../data/revisions-staging.ts'
import { VIDEOS } from '../data/videos.ts'
import { PLAY_QUESTIONS } from '../data/play.ts'
import type { ContentSources } from './payload'

export function bundledContentSources(): ContentSources {
  return {
    myths: MYTHS,
    en: MYTHS_EN,
    revisions: { ...REVISIONS, ...STAGING_REVISIONS },
    videos: VIDEOS,
    play: PLAY_QUESTIONS,
  }
}
