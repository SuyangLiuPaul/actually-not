#!/usr/bin/env node
/**
 * 一张 2×2 四宫格合成图 → 四张插画：node scripts/illu-import-quad.mjs <png> <左上id> <右上id> <左下id> <右下id>
 * （ChatGPT 对「一次出 4 张」常给一张四宫格，按象限裁开；每格留 8px 内缩去掉分隔线。）
 */
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [src, ...ids] = process.argv.slice(2)
if (!src || ids.length !== 4) { console.error('用法：illu-import-quad.mjs <png> id1 id2 id3 id4'); process.exit(1) }
mkdirSync(join(root, 'content-staging', 'illu-raw'), { recursive: true })
copyFileSync(src, join(root, 'content-staging', 'illu-raw', `quad-${ids[0]}.png`))
const { width: W, height: H } = await sharp(src).metadata()
const w = Math.floor(W / 2), h = Math.floor(H / 2), pad = 8
for (let i = 0; i < 4; i++) {
  const left = (i % 2) * w + pad, top = Math.floor(i / 2) * h + pad
  const cw = w - 2 * pad, ch = h - 2 * pad
  const th = Math.min(ch, Math.round(cw / 2.4)), tt = top + Math.round((ch - th) / 2)
  const o = await sharp(src).extract({ left, top: tt, width: cw, height: th }).resize(960, 400, { fit: 'cover' }).webp({ quality: 86 }).toFile(join(root, 'public/illu', `${ids[i]}.webp`))
  console.log(`${ids[i]} ${(o.size / 1024).toFixed(0)}KB`)
}
