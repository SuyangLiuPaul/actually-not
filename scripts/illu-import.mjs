#!/usr/bin/env node
/**
 * 把 ChatGPT 生成并下载的插画导入成 public/illu/{id}.webp。
 *
 *   node scripts/illu-import.mjs <下载的png> <id>
 *
 * 做三件事：
 *  1. 原图复制一份到 content-staging/illu-raw/{id}.png 留档（出处记录；不动 ~/Downloads 里的原文件）
 *  2. 中央裁成 2.4:1（卡片/详情页都是横幅裁切，主体放中间）
 *  3. 缩到 960×400，压成 webp
 * 和 generate-og.mjs 一样只在本地跑、产物进仓库。
 */
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [src, id] = process.argv.slice(2)
if (!src || !id) {
  console.error('用法：node scripts/illu-import.mjs <png> <id>')
  process.exit(1)
}
mkdirSync(join(root, 'content-staging', 'illu-raw'), { recursive: true })
copyFileSync(src, join(root, 'content-staging', 'illu-raw', `${id}.png`))

const { width, height } = await sharp(src).metadata()
const h = Math.min(height, Math.round(width / 2.4))
const top = Math.round((height - h) / 2)
const out = await sharp(src)
  .extract({ left: 0, top, width, height: h })
  .resize(960, 400, { fit: 'cover' })
  .webp({ quality: 84 })
  .toFile(join(root, 'public', 'illu', `${id}.webp`))
console.log(`${id}: ${width}×${height} → 960×400 webp ${(out.size / 1024).toFixed(0)}KB`)
