/**
 * 构建末尾导出远程内容：dist/content/v1/content.json。
 * 原生 App 启动后在后台拉这份 JSON，比安装包里的新就换上——新条目、新视频不用等商店发版。
 * 由 vite.config.ts 的 prerenderPlugin 在预渲染之后调用（复用同一个 SSR bundle 读数据）。
 *
 * 只导出**数据**（JSON），不含任何代码（App Store 审核指南 2.5.2）。
 * 缓存头与 CORS 在 netlify.toml / public/_headers 的 /content/* 段。
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { gzipSync } from 'node:zlib'

export const CONTENT_FILE = join('content', 'v1', 'content.json')

/**
 * 内容的时间 = 当前 git HEAD 的提交时间。App 只采用比手上这份更新的内容，
 * 用提交时间而不是构建时间，是为了重新部署一个旧提交时不会让 App 退回旧内容。
 * 拿不到 git（比如没有 .git 的目录）时退回当前时间。
 */
export function gitContentAt(cwd = process.cwd()): string {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI'], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    if (out && !Number.isNaN(Date.parse(out))) return new Date(out).toISOString()
  } catch { /* 没有 git */ }
  return new Date().toISOString()
}

export async function writeContentFile(distDir: string, ssrDir: string): Promise<{ bytes: number; gzipBytes: number; entries: number; version: string }> {
  const ssrFile = readdirSync(ssrDir).find((f) => /^entry-server\.(js|mjs)$/.test(f))
  if (!ssrFile) throw new Error(`内容导出：在 ${ssrDir} 找不到 entry-server 产物`)
  const ssr = (await import(pathToFileURL(join(ssrDir, ssrFile)).href)) as {
    contentPayload: (meta: { contentAt: string; generatedAt: string }) => { version: string; entries: unknown[] }
  }
  const payload = ssr.contentPayload({ contentAt: gitContentAt(), generatedAt: new Date().toISOString() })
  const json = JSON.stringify(payload)
  const out = join(distDir, CONTENT_FILE)
  mkdirSync(join(distDir, 'content', 'v1'), { recursive: true })
  writeFileSync(out, json)
  const stats = { bytes: Buffer.byteLength(json), gzipBytes: gzipSync(json).length, entries: payload.entries.length, version: payload.version }
  console.log(`内容导出：${CONTENT_FILE}，${stats.entries} 条，${(stats.bytes / 1024).toFixed(0)} KB（gzip ${(stats.gzipBytes / 1024).toFixed(0)} KB），版本 ${stats.version}`)
  return stats
}
