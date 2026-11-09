#!/usr/bin/env node
/**
 * 从 assets/ 里的 SVG 母版生成所有平台需要的图标。
 *
 *   node scripts/generate-icons.mjs            # 网站 + iOS + Android 全部
 *   node scripts/generate-icons.mjs --check    # 另外输出自查图 content-staging/redesign-2026-11/icon-check-v1.2.png
 *
 * 母版：
 *   assets/icon.svg、assets/icon-maskable.svg   网站 / PWA / favicon（扁平版，小尺寸也清楚）
 *   assets/app-icon/light|dark|tinted.svg       iOS 图标的浅色 / 深色 / 着色三种外观
 *   assets/app-icon/android-*.svg、monochrome.svg  Android 自适应图标的前景、背景和主题图标层
 *
 * 生成结果提交进仓库，CI 不跑这个脚本（og.png 里有中文字，构建机不一定有中文字体）。
 * 只有改了图标设计才需要重新运行。
 */
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const asset = (f) => join(root, 'assets', f)
const pub = (f) => join(root, 'public', f)
const PAPER = '#f1ebdf'

async function svgPng(file, size, { flatten = true } = {}) {
  let img = sharp(await readFile(asset(file)), { density: Math.max(72, Math.ceil((size / 1024) * 72 * 4)) })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  if (flatten) img = img.flatten({ background: PAPER })
  return img.png({ compressionLevel: 9 }).toBuffer()
}

/** 用一个形状遮罩（圆角方形 / 圆形）裁切 PNG，透明背景 */
async function masked(buf, size, shape) {
  const mask = shape === 'circle'
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${size * 0.2}"/></svg>`
  return sharp(buf).composite([{ input: Buffer.from(mask), blend: 'dest-in' }]).png({ compressionLevel: 9 }).toBuffer()
}

async function write(path, buf, label) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, buf)
  console.log(`  ${label.padEnd(58)} ${(buf.length / 1024).toFixed(1)} kB`)
}

// ── 网站 / PWA ─────────────────────────────────────────────
const WEB_PNGS = [
  ['icon.svg', 'icons/favicon-16.png', 16, false],
  ['icon.svg', 'icons/favicon-32.png', 32, false],
  ['icon.svg', 'icons/favicon-48.png', 48, false],
  ['icon.svg', 'icons/icon-192.png', 192, false],
  ['icon.svg', 'icons/icon-512.png', 512, false],
  // Apple 主屏图标不支持透明、自己加圆角：用 App 图标的浅色母版（带纸纹和投影）
  ['app-icon/light.svg', 'icons/apple-touch-icon.png', 180, true],
  ['icon-maskable.svg', 'icons/maskable-192.png', 192, true],
  ['icon-maskable.svg', 'icons/maskable-512.png', 512, true],
]

async function web() {
  console.log('网站 / PWA')
  for (const [file, target, size, flatten] of WEB_PNGS) await write(pub(target), await svgPng(file, size, { flatten }), `public/${target} ${size}×${size}`)
  const ico = await pngToIco(await Promise.all([16, 32, 48].map((s) => svgPng('icon.svg', s, { flatten: false }))))
  await write(pub('favicon.ico'), ico, 'public/favicon.ico 16/32/48')
  await write(pub('favicon.svg'), await readFile(asset('icon.svg')), 'public/favicon.svg vector')
  const og = await sharp(await readFile(asset('og.svg')), { density: 144 }).resize(1200, 630).png({ compressionLevel: 9 }).toBuffer()
  await write(pub('og.png'), og, 'public/og.png 1200×630')
}

// ── iOS：单一 1024 图标 + 深色 + 着色（Xcode 16+ 资产目录格式） ──
async function ios() {
  console.log('iOS')
  const dir = join(root, 'ios/App/App/Assets.xcassets/AppIcon.appiconset')
  await write(join(dir, 'AppIcon-1024.png'), await svgPng('app-icon/light.svg', 1024), 'AppIcon-1024.png (light)')
  await write(join(dir, 'AppIcon-Dark-1024.png'), await svgPng('app-icon/dark.svg', 1024, { flatten: false }), 'AppIcon-Dark-1024.png')
  await write(join(dir, 'AppIcon-Tinted-1024.png'), await svgPng('app-icon/tinted.svg', 1024, { flatten: false }), 'AppIcon-Tinted-1024.png')
  // 旧版留下的、Contents.json 不再引用的文件
  await rm(join(dir, 'AppIcon-512@2x.png'), { force: true })
  const image = (filename, appearance) => ({
    ...(appearance ? { appearances: [{ appearance: 'luminosity', value: appearance }] } : {}),
    filename, idiom: 'universal', platform: 'ios', size: '1024x1024',
  })
  const contents = { images: [image('AppIcon-1024.png'), image('AppIcon-Dark-1024.png', 'dark'), image('AppIcon-Tinted-1024.png', 'tinted')], info: { author: 'xcode', version: 1 } }
  await write(join(dir, 'Contents.json'), Buffer.from(JSON.stringify(contents, null, 2) + '\n'), 'Contents.json')
}

// ── Android：自适应图标（前景 / 背景 / 单色）+ 旧版启动图标 + 通知小图标 ──
const DENSITIES = [['mdpi', 1], ['hdpi', 1.5], ['xhdpi', 2], ['xxhdpi', 3], ['xxxhdpi', 4]]
async function android() {
  console.log('Android')
  const res = join(root, 'android/app/src/main/res')
  for (const [density, scale] of DENSITIES) {
    const dir = join(res, `mipmap-${density}`)
    const layer = Math.round(108 * scale)
    const legacy = Math.round(48 * scale)
    await write(join(dir, 'ic_launcher_foreground.png'), await svgPng('app-icon/android-foreground.svg', layer, { flatten: false }), `mipmap-${density}/ic_launcher_foreground.png ${layer}`)
    await write(join(dir, 'ic_launcher_background.png'), await svgPng('app-icon/android-background.svg', layer), `mipmap-${density}/ic_launcher_background.png ${layer}`)
    await write(join(dir, 'ic_launcher_monochrome.png'), await svgPng('app-icon/monochrome.svg', layer, { flatten: false }), `mipmap-${density}/ic_launcher_monochrome.png ${layer}`)
    const full = await svgPng('app-icon/light.svg', legacy)
    await write(join(dir, 'ic_launcher.png'), await masked(full, legacy, 'square'), `mipmap-${density}/ic_launcher.png ${legacy}`)
    await write(join(dir, 'ic_launcher_round.png'), await masked(full, legacy, 'circle'), `mipmap-${density}/ic_launcher_round.png ${legacy}`)
  }
  const adaptive = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
    <monochrome android:drawable="@mipmap/ic_launcher_monochrome"/>
</adaptive-icon>
`
  for (const name of ['ic_launcher', 'ic_launcher_round']) await write(join(res, `mipmap-anydpi-v26/${name}.xml`), Buffer.from(adaptive), `mipmap-anydpi-v26/${name}.xml`)
  // 通知栏小图标：只用 alpha，对勾 + 一道划线
  const stat = '<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="24dp" android:height="24dp" android:viewportWidth="24" android:viewportHeight="24">'
    + '<path android:pathData="M6.2,12.1L10,15.9L17.6,7.2" android:strokeColor="#ffffff" android:strokeWidth="2.8" android:strokeLineCap="round" android:strokeLineJoin="round" android:fillColor="#00000000"/>'
    + '<path android:pathData="M3.6,14.2C8.2,13.2 14,12.4 20.4,12.3" android:strokeColor="#ffffff" android:strokeWidth="2.2" android:strokeLineCap="round" android:fillColor="#00000000"/>'
    + '</vector>\n'
  await write(join(res, 'drawable/ic_stat_discovery.xml'), Buffer.from(stat), 'drawable/ic_stat_discovery.xml')
}

// ── 自查图：各尺寸、圆形遮罩与安全圆、深色、着色、单色 ──
async function checkSheet() {
  const W = 1900, H = 1100
  const cells = []
  const label = (x, y, text, color = '#55504a') => `<text x="${x}" y="${y}" font-family="Helvetica, Arial" font-size="20" fill="${color}">${text}</text>`
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#ffffff"/><rect x="0" y="560" width="${W}" height="540" fill="#e9e9ee"/>`
  svg += label(40, 40, 'v1.2 icon A · light / on white (top) and on a light-grey wallpaper (bottom) · iOS squircle approximated with rx=22.5%', '#1c1a17')
  const light = (s) => svgPng('app-icon/light.svg', s)
  const place = async (buf, x, y, s, shape = 'ios') => {
    const m = shape === 'none' ? buf : await masked(buf, s, shape === 'circle' ? 'circle' : 'square')
    cells.push({ input: m, left: x, top: y })
  }
  // iOS sizes on white, then on light grey
  for (const [row, y0] of [[0, 70], [1, 600]]) {
    let x = 40
    for (const s of [1024 / 2.2 | 0, 180, 60, 29]) {
      await place(await light(s), x, y0, s)
      svg += label(x, y0 + s + 28, s === (1024 / 2.2 | 0) ? '1024 (shown at 465)' : `${s}px`)
      x += s + 40
    }
    if (row === 0) {
      // dark + tinted at 180
      await place(await svgPng('app-icon/dark.svg', 180), x, y0, 180)
      svg += label(x, y0 + 208, 'dark 180')
      x += 220
      // tinted: simulate a blue tint by colourising luminance
      const tinted = await sharp(await svgPng('app-icon/tinted.svg', 180, { flatten: false })).tint({ r: 70, g: 130, b: 230 }).png().toBuffer()
      await place(tinted, x, y0, 180)
      svg += label(x, y0 + 208, 'tinted (blue) 180')
    } else {
      // Android circle mask: background + foreground, with the 66dp safe circle in green
      const s = 240
      const bg = await svgPng('app-icon/android-background.svg', s)
      const fg = await svgPng('app-icon/android-foreground.svg', s, { flatten: false })
      const combined = await sharp(bg).composite([{ input: fg }]).png().toBuffer()
      await place(combined, x, y0, s, 'circle')
      const ring = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${(s * 66) / 108 / 2}" fill="none" stroke="#1a9a4a" stroke-width="2" stroke-dasharray="6 5"/></svg>`
      cells.push({ input: Buffer.from(ring), left: x, top: y0 })
      svg += label(x, y0 + s + 28, 'Android circle + safe zone')
      x += s + 40
      const mono = await sharp(await svgPng('app-icon/monochrome.svg', s, { flatten: false })).tint({ r: 40, g: 70, b: 40 }).png().toBuffer()
      const monoBg = await sharp({ create: { width: s, height: s, channels: 4, background: '#cfe8cf' } }).composite([{ input: mono }]).png().toBuffer()
      await place(monoBg, x, y0, s, 'circle')
      svg += label(x, y0 + s + 28, 'Android 13 themed')
      x += s + 40
      for (const f of [16, 32]) {
        const fav = await svgPng('icon.svg', f, { flatten: false })
        await place(fav, x, y0 + 20, f, 'none')
        const big = await sharp(fav).resize(f * 4, f * 4, { kernel: 'nearest' }).png().toBuffer()
        await place(big, x, y0 + 70, f * 4, 'none')
        svg += label(x, y0 + 90 + f * 4, `favicon ${f}`)
        x += f * 4 + 30
      }
    }
  }
  svg += '</svg>'
  const out = join(root, 'content-staging/redesign-2026-11/icon-check-v1.2.png')
  await sharp(Buffer.from(svg)).composite(cells).png().toFile(out)
  console.log(`自查图 → ${out}`)
}

await web()
await ios()
if (existsSync(join(root, 'android/app/src/main/res'))) await android()
if (process.argv.includes('--check')) await checkSheet()
console.log('\n图标生成完毕。')
