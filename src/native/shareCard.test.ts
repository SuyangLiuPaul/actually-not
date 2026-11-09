import { describe, expect, it } from 'vitest'
import { CARD_H, CARD_W, layoutShareCard, wrapText, type Measure } from './shareCard'
import { MYTHS } from '../data/myths'
import { mythsFor } from '../data/localized'
import { confidenceMeta, categoryLabel } from '../i18n'

/** 近似字宽：中文按 1em，其它按 0.56em */
const measure: Measure = (text, font) => {
  const size = Number(/(\d+)px/.exec(font)?.[1] ?? 16)
  let w = 0
  for (const ch of text) w += /[⺀-鿿＀-￯　-〿]/.test(ch) ? size : size * 0.56
  return w
}
const PAD = 88

describe('结论分享图排版', () => {
  it('换行不超宽，中文避头标点', () => {
    const lines = wrapText('吃完饭马上洗澡，会伤胃，这是真的吗？其实未必。', 300, '700 60px serif', measure)
    for (const line of lines) expect(measure(line, '700 60px serif')).toBeLessThanOrEqual(300)
    for (const line of lines.slice(1)) expect('，。？！').not.toContain(line[0])
    expect(lines.join('')).toBe('吃完饭马上洗澡，会伤胃，这是真的吗？其实未必。')
  })

  it('英文按词换行', () => {
    const lines = wrapText('Cracking your knuckles will give you arthritis later in life', 400, '700 40px serif', measure)
    expect(lines.length).toBeGreaterThan(1)
    for (const line of lines) expect(line).not.toMatch(/^\s|\s$/)
    expect(lines.join(' ')).toBe('Cracking your knuckles will give you arthritis later in life')
  })

  it('全部条目（中英）都能排进 1080×1350：不越界、划线逐行、置信度标签一定印出', () => {
    for (const locale of ['zh', 'en'] as const) {
      for (const m of mythsFor(locale)) {
        const conf = confidenceMeta(m.confidence, locale).label
        const layout = layoutShareCard({ belief: m.belief, truth: m.truth, confidence: m.confidence, confidenceLabel: conf, category: categoryLabel(m.category, locale), locale, hasArt: true }, measure)
        expect(layout.width).toBe(CARD_W)
        expect(layout.height).toBe(CARD_H)
        const texts = layout.ops.flatMap((o) => (o.t === 'text' ? [o] : []))
        for (const op of texts) {
          expect(op.y).toBeGreaterThan(0)
          expect(op.y).toBeLessThan(CARD_H)
          if (op.align !== 'right') expect(op.x + measure(op.text, op.font)).toBeLessThanOrEqual(CARD_W - PAD + 1)
        }
        expect(layout.ops.filter((o) => o.t === 'strike')).toHaveLength(layout.beliefLines.length)
        expect(texts.some((o) => o.text.includes(conf))).toBe(true)
        expect(texts.some((o) => o.text === 'actually-not.com')).toBe(true)
        expect(layout.beliefLines.length).toBeLessThanOrEqual(4)
      }
    }
    expect(MYTHS.length).toBeGreaterThan(200)
  })

  it('研究有限 / 尚有争议的条目，标签照实印出，不会被印成「证据充分」', () => {
    const limited = MYTHS.find((m) => m.confidence === 'limited')!
    const layout = layoutShareCard({ belief: limited.belief, truth: limited.truth, confidence: 'limited', confidenceLabel: confidenceMeta('limited', 'zh').label, category: '名言', locale: 'zh', hasArt: false }, measure)
    const texts = layout.ops.flatMap((o) => (o.t === 'text' ? [o.text] : [])).join('\n')
    expect(texts).toContain('研究有限')
    expect(texts).not.toContain('证据充分')
  })
})
