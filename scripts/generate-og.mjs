#!/usr/bin/env node
/**
 * 为每条内容生成一张 1200×630 的 OG 分享图，输出到 public/og/{id}.png。
 *
 *   node scripts/generate-og.mjs
 *
 * 和 generate-icons.mjs 一样只在本地跑、产物提交进仓库：
 * 图上有中文字，构建机上不一定装了中文字体（见 HANDOVER 坑②）。
 * 改了内容文案或设计才需要重新运行；CI 不跑这个脚本。
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { MYTHS } from '../src/data/myths.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'og')

const W = 1200
const H = 630
const MARGIN = 88
const TEXT_W = W - MARGIN * 2
const SERIF = 'Songti SC, Noto Serif SC, STSong, serif'
const SANS = 'PingFang SC, Helvetica Neue, sans-serif'

/** SVG 文本必须转义 */
function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** 宽度估算：全角字符算 1 个单位，其余（ASCII、半角标点）算 0.55 */
function units(s) {
  let n = 0
  for (const ch of s) n += ch.charCodeAt(0) > 0x2e7f ? 1 : 0.55
  return n
}

/** 标点不能出现在行首：行首碰上标点就把它挪回上一行末尾 */
const LEAD_PUNCT = /^[，。、；：？！）」』…—·]/

/** 按视觉单位折行（中文没有词边界，直接按宽度切） */
function wrap(text, perLine) {
  const lines = []
  let rest = text
  while (units(rest) > perLine) {
    let acc = 0
    let i = 0
    while (i < rest.length && acc + (rest.charCodeAt(i) > 0x2e7f ? 1 : 0.55) <= perLine) {
      acc += rest.charCodeAt(i) > 0x2e7f ? 1 : 0.55
      i++
    }
    let cut = rest.slice(0, i)
    rest = rest.slice(i)
    while (rest && LEAD_PUNCT.test(rest)) {
      cut += rest[0]
      rest = rest.slice(1)
    }
    lines.push(cut)
  }
  if (rest) lines.push(rest)
  return lines
}

/** belief 的字号：先取行数最少的方案，行数相同时取最大字号（最多 3 行） */
function layoutBelief(belief) {
  let best
  for (const fs of [64, 56, 48, 42]) {
    const lines = wrap(belief, Math.floor(TEXT_W / fs))
    if (!best || lines.length < best.lines.length) best = { fs, lines }
    if (lines.length === 1) break
  }
  return best
}

/** truth 固定 30px 两行，放不下就截断加省略号 */
function layoutTruth(truth) {
  const fs = 30
  const perLine = Math.floor(TEXT_W / fs)
  const lines = wrap(truth, perLine)
  if (lines.length <= 2) return { fs, lines }
  let last = lines[1]
  while (units(last + '…') > perLine) last = last.slice(0, -1)
  return { fs, lines: [lines[0], last + '…'] }
}

/** 红笔划线：和站点 og.svg 同款的微波浪线 */
function strike(x, y, w, fs) {
  const sw = Math.max(5, Math.round(fs * 0.11))
  return `<path d="M${x - 6} ${y + 2} Q ${x + w * 0.25} ${y - 7} ${x + w * 0.52} ${y + 3} T ${x + w + 6} ${y - 3}"
    fill="none" stroke="#c13024" stroke-width="${sw}" stroke-linecap="round" opacity="0.9"/>`
}

function ruledLines() {
  let out = ''
  for (let y = 120; y <= 520; y += 80) {
    out += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>\n    `
  }
  return `<g stroke="#e2dcd1" stroke-width="1.5">${out}</g>`
}

function svg(m) {
  const belief = layoutBelief(m.belief)
  const truth = layoutTruth(m.truth)

  // belief 块垂直居中在上 2/3 区域（中线约 y=295）
  const lh = belief.fs * 1.55
  const firstBaseline = 295 - ((belief.lines.length - 1) * lh) / 2 + belief.fs * 0.35
  const beliefSvg = belief.lines
    .map((line, i) => {
      const y = firstBaseline + i * lh
      const w = units(line) * belief.fs
      return (
        `<text x="${MARGIN}" y="${y.toFixed(1)}" font-family="${SERIF}" font-size="${belief.fs}" font-weight="700" fill="#1c1a17">${esc(line)}</text>\n    ` +
        strike(MARGIN, y - belief.fs * 0.32, w, belief.fs)
      )
    })
    .join('\n    ')

  const truthSvg = truth.lines
    .map(
      (line, i) =>
        `<text x="${MARGIN}" y="${505 + i * 47}" font-family="${SANS}" font-size="${truth.fs}" fill="#55504a">${esc(line)}</text>`,
    )
    .join('\n  ')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#f7f4ee"/>
  ${ruledLines()}

  <text x="${MARGIN}" y="110" font-family="${SANS}" font-size="26" font-weight="600" letter-spacing="6" fill="#c13024">常识核对表</text>

  <g>
    ${beliefSvg}
  </g>

  ${truthSvg}

  <text x="${MARGIN}" y="592" font-family="${SANS}" font-size="22" fill="#948c80">其实不是 · 那些你以为对的生活常识</text>
</svg>
`
}

async function main() {
  await mkdir(outDir, { recursive: true })
  let total = 0
  for (const m of MYTHS) {
    const buf = await sharp(Buffer.from(svg(m)), { density: 144 })
      .resize(W, H)
      .png({ compressionLevel: 9 })
      .toBuffer()
    await writeFile(join(outDir, `${m.id}.png`), buf)
    total += buf.length
  }
  console.log(
    `OG 图生成完毕：${MYTHS.length} 张 → public/og/，共 ${(total / 1024 / 1024).toFixed(1)} MB`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
