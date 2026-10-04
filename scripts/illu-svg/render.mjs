#!/usr/bin/env node
/**
 * 把 scenes.mjs 里的手绘场景渲染成 public/illu/{id}.webp（960×320，3:1 横幅）。
 *   node scripts/illu-svg/render.mjs [id ...]        # 不带参数 = 全部
 *   node scripts/illu-svg/render.mjs --sheet out.png  # 另出一张总览图供目视检查
 */
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { canvas } from './lib.mjs'
import { SCENES } from './scenes.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const args = process.argv.slice(2)
const si = args.indexOf('--sheet')
const sheetOut = si >= 0 ? args[si + 1] : null
const ids = args.filter((a, i) => !a.startsWith('--') && i !== si + 1)
const targets = ids.length ? ids : Object.keys(SCENES)
const tiles = []
for (const key of targets) {
  const sc = SCENES[key]
  if (!sc) {
    console.error('无场景：', key)
    continue
  }
  const svg = canvas(sc.tint, sc.body(), { cx: sc.cx })
  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  await writeFile(join(root, 'public', 'illu', `${key}.webp`), await sharp(png).webp({ quality: 82 }).toBuffer())
  tiles.push({ key, png })
}
console.log(`渲染 ${tiles.length} 张`)
if (sheetOut && tiles.length) {
  const cols = 2
  const w = 480
  const h = 160
  const rows = Math.ceil(tiles.length / cols)
  const comps = await Promise.all(
    tiles.map(async (t, i) => ({
      input: await sharp(t.png).resize(w, h).toBuffer(),
      left: (i % cols) * w,
      top: Math.floor(i / cols) * h,
    })),
  )
  await sharp({ create: { width: cols * w, height: rows * h, channels: 3, background: '#fff' } })
    .composite(comps)
    .png()
    .toFile(sheetOut)
}
