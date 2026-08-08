#!/usr/bin/env node
/**
 * 从 assets/*.svg 生成所有平台需要的图标，输出到 public/。
 *
 *   node scripts/generate-icons.mjs
 *
 * 生成结果是提交进仓库的，CI 不需要跑这个脚本（也就不依赖构建机上有中文字体）。
 * 只有改了图标设计才需要重新运行。
 */
import { Buffer } from 'node:buffer'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = (f) => join(root, 'assets', f)
const out = (f) => join(root, 'public', f)

/** PNG 尺寸清单：[源文件, 输出路径, 边长] */
const PNGS = [
  ['icon.svg', 'icons/favicon-16.png', 16],
  ['icon.svg', 'icons/favicon-32.png', 32],
  ['icon.svg', 'icons/favicon-48.png', 48],
  ['icon.svg', 'icons/icon-192.png', 192],
  ['icon.svg', 'icons/icon-512.png', 512],
  // Apple 的图标不支持透明，且会自己加圆角，所以铺一层不透明底色
  ['icon.svg', 'icons/apple-touch-icon.png', 180],
  ['icon-maskable.svg', 'icons/maskable-192.png', 192],
  ['icon-maskable.svg', 'icons/maskable-512.png', 512],
]

async function render(file, size) {
  const svg = await readFile(src(file))
  return sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: '#f7f4ee' })
    .flatten({ background: '#f7f4ee' })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

async function main() {
  await mkdir(out('icons'), { recursive: true })

  for (const [file, target, size] of PNGS) {
    const buf = await render(file, size)
    await writeFile(out(target), buf)
    console.log(`  ${target.padEnd(30)} ${size}×${size}  ${(buf.length / 1024).toFixed(1)} kB`)
  }

  // favicon.ico —— 给不认 SVG favicon 的旧环境兜底
  const ico = await pngToIco([
    await render('icon.svg', 16),
    await render('icon.svg', 32),
    await render('icon.svg', 48),
  ])
  await writeFile(out('favicon.ico'), ico)
  console.log(`  ${'favicon.ico'.padEnd(30)} 16/32/48  ${(ico.length / 1024).toFixed(1)} kB`)

  // 浏览器标签页用的矢量 favicon
  await writeFile(out('favicon.svg'), await readFile(src('icon.svg')))
  console.log(`  ${'favicon.svg'.padEnd(30)} vector`)

  // 社交分享图
  const og = await sharp(await readFile(src('og.svg')), { density: 144 })
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toBuffer()
  await writeFile(out('og.png'), og)
  console.log(`  ${'og.png'.padEnd(30)} 1200×630  ${(og.length / 1024).toFixed(1)} kB`)

  console.log('\n图标生成完毕。')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

// 让 Buffer 的导入不被 tree-shake 工具误判为未使用
void Buffer
