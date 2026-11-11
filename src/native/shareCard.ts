import type { Confidence } from '../types'
import type { Locale } from '../i18n'

/**
 * 结论分享图（1.2）：在本机用 canvas 画 1080×1350（4:5，朋友圈 / 小红书 / IG 都合适）。
 * 旧说法用衬线大字并被红笔划掉，下面是「其实」一句话和置信度标签（永远印出来，
 * 研究有限 / 尚有争议的条目不能被截成「谣言粉碎」式的图），页脚是小字 actually-not.com。
 * 不放二维码。深色模式下也输出浅色图。
 *
 * layoutShareCard 是纯函数（传入量字宽的函数），测试不需要真的 canvas。
 */
export const CARD_W = 1080
export const CARD_H = 1350
const PAD = 88
const ART_H = 430
const FOOTER_TOP = 1212

export const CARD_COLORS = {
  paper: '#f7f4ee', ink: '#1c1a17', soft: '#55504a', faint: '#8a8378', rule: '#ddd5c7', pen: '#c13024',
  strong: '#2f5b67', limited: '#8f5f16', debated: '#4a6670',
}
export const SERIF = '"Songti SC", "Noto Serif CJK SC", "Noto Serif SC", "Source Han Serif SC", "Iowan Old Style", Georgia, serif'
export const SANS = '-apple-system, "PingFang SC", "Noto Sans CJK SC", "Noto Sans SC", "Helvetica Neue", Arial, sans-serif'

export type Measure = (text: string, font: string) => number
export type CardOp =
  | { t: 'text'; text: string; x: number; y: number; font: string; color: string; align?: 'left' | 'right' }
  | { t: 'strike'; x1: number; x2: number; y: number; seed: number }
  | { t: 'pill'; x: number; y: number; w: number; h: number; color: string }
  | { t: 'rule'; x1: number; x2: number; y: number }
  | { t: 'art'; x: number; y: number; w: number; h: number }
export type CardInput = { belief: string; truth: string; confidence: Confidence; confidenceLabel: string; category: string; locale: Locale; hasArt: boolean }
export type CardLayout = { width: number; height: number; ops: CardOp[]; beliefLines: string[]; truthLines: string[] }

const NO_LINE_START = new Set('，。、；：？！」』）》〉】,.;:?!)]}…%”’·')
const NO_LINE_END = new Set('「『（《〈【(“‘')
const isWide = (ch: string) => /[⺀-鿿豈-﫿＀-￯　-〿]/.test(ch)

/** 拆成可换行的片段：中日文按字，拉丁文按词（词后的空格跟着词走） */
function tokens(text: string): string[] {
  const out: string[] = []
  let word = ''
  for (const ch of text) {
    if (isWide(ch)) { if (word) { out.push(word); word = '' } out.push(ch) }
    else if (ch === ' ') { out.push(word + ' '); word = '' }
    else word += ch
  }
  if (word) out.push(word)
  return out
}

/** 按宽度换行；避头尾标点；超长的单词按字切开。 */
export function wrapText(text: string, maxWidth: number, font: string, measure: Measure): string[] {
  const lines: string[] = []
  let line = ''
  for (const token of tokens(text.replace(/\s+/g, ' ').trim())) {
    const candidate = line + token
    if (!line || measure(candidate.trimEnd(), font) <= maxWidth) { line = candidate; continue }
    if (NO_LINE_START.has(token[0]) && line.length > 1) {
      // 标点不放行首：把上一行最后一个字带下来
      const chars = [...line]
      const last = chars.pop()!
      lines.push(chars.join('').trimEnd())
      line = last + token
      continue
    }
    if (NO_LINE_END.has(line[line.length - 1]) && line.length > 1) {
      const chars = [...line]
      const last = chars.pop()!
      lines.push(chars.join('').trimEnd())
      line = last + token
      continue
    }
    lines.push(line.trimEnd())
    line = token
  }
  if (line.trim()) lines.push(line.trimEnd())
  // 单个超宽片段（很长的英文词）按字符硬切
  return lines.flatMap((l) => {
    if (measure(l, font) <= maxWidth) return [l]
    const parts: string[] = []
    let part = ''
    for (const ch of l) { if (part && measure(part + ch, font) > maxWidth) { parts.push(part); part = ch } else part += ch }
    if (part) parts.push(part)
    return parts
  })
}

function clampLines(lines: string[], max: number, maxWidth: number, font: string, measure: Measure): string[] {
  if (lines.length <= max) return lines
  const kept = lines.slice(0, max)
  let last = kept[max - 1]
  while (last && measure(last + '…', font) > maxWidth) last = [...last].slice(0, -1).join('')
  kept[max - 1] = last.trimEnd() + '…'
  return kept
}

export function layoutShareCard(input: CardInput, measure: Measure): CardLayout {
  const zh = input.locale === 'zh'
  const width = CARD_W - PAD * 2
  const ops: CardOp[] = []
  const top = input.hasArt ? ART_H + 40 : 140
  if (input.hasArt) ops.push({ t: 'art', x: 0, y: 0, w: CARD_W, h: ART_H })

  // 先挑能放下的字号：说法最多 4 行，结论最多 6 行
  const overline = `600 30px ${SANS}`
  let beliefSize = 68, truthSize = 44
  let beliefLines: string[] = [], truthLines: string[] = []
  let beliefLH = 0, truthLH = 0
  const confH = 64
  const available = FOOTER_TOP - 48 - top
  for (;;) {
    const beliefFont = `700 ${beliefSize}px ${SERIF}`
    const truthFont = `500 ${truthSize}px ${SERIF}`
    beliefLH = Math.round(beliefSize * 1.3)
    truthLH = Math.round(truthSize * 1.55)
    beliefLines = wrapText(input.belief, width, beliefFont, measure)
    truthLines = wrapText(input.truth, width, truthFont, measure)
    const needed = 44 + beliefLines.length * beliefLH + 56 + 44 + truthLines.length * truthLH + 40 + confH
    if ((needed <= available && beliefLines.length <= 4) || (beliefSize <= 48 && truthSize <= 32)) {
      beliefLines = clampLines(beliefLines, 4, width, beliefFont, measure)
      const maxTruth = Math.max(2, Math.floor((available - (44 + beliefLines.length * beliefLH + 56 + 44 + 40 + confH)) / truthLH))
      truthLines = clampLines(truthLines, maxTruth, width, truthFont, measure)
      break
    }
    if (beliefSize > 48) beliefSize -= 4
    if (truthSize > 32) truthSize -= 2
  }
  const beliefFont = `700 ${beliefSize}px ${SERIF}`
  const truthFont = `500 ${truthSize}px ${SERIF}`
  const blockH = 44 + beliefLines.length * beliefLH + 56 + 44 + truthLines.length * truthLH + 40 + confH
  // 内容块在可用空间里略偏上居中
  let y = top + Math.max(0, Math.round((available - blockH) * 0.4))

  ops.push({ t: 'text', text: `${zh ? '你以为' : 'YOU THOUGHT'} · ${input.category}`, x: PAD, y: y + 30, font: overline, color: CARD_COLORS.pen })
  y += 44
  beliefLines.forEach((line, i) => {
    const baseline = y + Math.round(beliefLH * 0.78)
    ops.push({ t: 'text', text: line, x: PAD, y: baseline, font: beliefFont, color: CARD_COLORS.ink })
    const w = Math.min(width, measure(line, beliefFont))
    ops.push({ t: 'strike', x1: PAD - 6, x2: PAD + w + 6, y: baseline - Math.round(beliefSize * 0.32), seed: i })
    y += beliefLH
  })
  y += 56
  ops.push({ t: 'text', text: zh ? '其实' : 'ACTUALLY', x: PAD, y: y + 30, font: overline, color: CARD_COLORS.pen })
  y += 44
  truthLines.forEach((line) => {
    ops.push({ t: 'text', text: line, x: PAD, y: y + Math.round(truthLH * 0.74), font: truthFont, color: CARD_COLORS.ink })
    y += truthLH
  })
  y += 40
  const confFont = `600 30px ${SANS}`
  const confText = zh ? `证据强度：${input.confidenceLabel}` : `Evidence: ${input.confidenceLabel}`
  const pillW = Math.min(width, measure(confText, confFont) + 56)
  const color = CARD_COLORS[input.confidence]
  ops.push({ t: 'pill', x: PAD, y, w: pillW, h: confH, color })
  ops.push({ t: 'text', text: confText, x: PAD + 28, y: y + 42, font: confFont, color })

  ops.push({ t: 'rule', x1: PAD, x2: CARD_W - PAD, y: FOOTER_TOP })
  ops.push({ t: 'text', text: zh ? '先别急着信 · 每条附出处' : 'Not So Fast · every entry sourced', x: PAD, y: FOOTER_TOP + 70, font: `600 30px ${SERIF}`, color: CARD_COLORS.ink })
  ops.push({ t: 'text', text: 'actually-not.com', x: CARD_W - PAD, y: FOOTER_TOP + 70, font: `500 28px ${SANS}`, color: CARD_COLORS.soft, align: 'right' })
  return { width: CARD_W, height: CARD_H, ops, beliefLines, truthLines }
}

/** 手写感的红笔划线（与页面上的 Strike 同一种感觉） */
function strikePath(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, seed: number) {
  let s = seed * 9301 + 49297
  const rand = () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
  const steps = 5
  ctx.beginPath()
  ctx.moveTo(x1, y + (rand() - 0.5) * 6)
  for (let i = 1; i <= steps; i++) {
    const x = x1 + ((x2 - x1) / steps) * i
    const cx = x - (x2 - x1) / steps / 2
    ctx.quadraticCurveTo(cx, y + (rand() - 0.5) * 10, x, y + (rand() - 0.5) * 7)
  }
  ctx.stroke()
}

export function drawShareCard(ctx: CanvasRenderingContext2D, layout: CardLayout, art?: CanvasImageSource & { width: number; height: number }) {
  ctx.fillStyle = CARD_COLORS.paper
  ctx.fillRect(0, 0, layout.width, layout.height)
  // 稿纸横线
  ctx.strokeStyle = 'rgba(205,197,182,0.35)'
  ctx.lineWidth = 2
  for (let y = ART_H + 64; y < FOOTER_TOP - 10; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(layout.width, y); ctx.stroke() }
  for (const op of layout.ops) {
    if (op.t === 'art') {
      if (art && art.width && art.height) {
        const scale = Math.max(op.w / art.width, op.h / art.height)
        const w = art.width * scale, h = art.height * scale
        ctx.drawImage(art, op.x + (op.w - w) / 2, op.y + (op.h - h) / 2, w, h)
      }
      const fade = ctx.createLinearGradient(0, op.h - 140, 0, op.h)
      fade.addColorStop(0, 'rgba(247,244,238,0)')
      fade.addColorStop(1, CARD_COLORS.paper)
      ctx.fillStyle = fade
      ctx.fillRect(0, op.h - 140, op.w, 141)
    } else if (op.t === 'text') {
      ctx.font = op.font
      ctx.fillStyle = op.color
      ctx.textAlign = op.align ?? 'left'
      ctx.textBaseline = 'alphabetic'
      ctx.fillText(op.text, op.x, op.y)
    } else if (op.t === 'strike') {
      ctx.strokeStyle = CARD_COLORS.pen
      ctx.globalAlpha = 0.85
      ctx.lineWidth = 7
      ctx.lineCap = 'round'
      strikePath(ctx, op.x1, op.x2, op.y, op.seed + 1)
      ctx.globalAlpha = 1
    } else if (op.t === 'pill') {
      ctx.strokeStyle = op.color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.roundRect(op.x + 1.5, op.y + 1.5, op.w - 3, op.h - 3, op.h / 2)
      ctx.stroke()
    } else if (op.t === 'rule') {
      ctx.strokeStyle = CARD_COLORS.rule
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(op.x1, op.y); ctx.lineTo(op.x2, op.y); ctx.stroke()
    }
  }
}

function loadImage(src: string): Promise<HTMLImageElement | undefined> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(undefined)
    img.src = src
  })
}

/** 在浏览器 / WebView 里画出分享图，返回 canvas */
export async function renderShareCard(input: Omit<CardInput, 'hasArt'> & { artSrc?: string }): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas')
  canvas.width = CARD_W
  canvas.height = CARD_H
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas 2d 不可用')
  const art = input.artSrc ? await loadImage(input.artSrc) : undefined
  try { await document.fonts?.ready } catch { /* 字体没加载完也能画 */ }
  const measure: Measure = (text, font) => { ctx.font = font; return ctx.measureText(text).width }
  drawShareCard(ctx, layoutShareCard({ ...input, hasArt: !!art }, measure), art)
  return canvas
}
