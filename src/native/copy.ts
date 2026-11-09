import type { Confidence } from '../types'
import type { Locale } from '../i18n'
import type { Stance } from './journal'

/** 表态按钮文字 */
export const STANCE_LABEL: Record<Locale, Record<Stance, string>> = {
  zh: { thought: '我一直这么以为', unsure: '说不准', doubted: '我不信' },
  en: { thought: 'I always thought so', unsure: 'Not sure', doubted: 'I didn’t buy it' },
}

/**
 * 揭晓后的回应：按「表态 × 证据强度」给出，诚实、不计分。
 * 研究有限 / 尚有争议的条目永远不说「答对 / 答错」。
 */
const RESPONSES: Record<Locale, Record<Stance | 'skip', Record<Confidence, string>>> = {
  zh: {
    thought: {
      strong: '这条记进了你的改观簿。',
      limited: '现有证据撑不起这个说法，不过也不等于证明它是假的。',
      debated: '这条没有定论。读读两边各怎么说。',
    },
    unsure: {
      strong: '现在有出处可以帮你判断了。',
      limited: '你的谨慎是对的：证据确实有限。',
      debated: '说不准，正是这条的现状。',
    },
    doubted: {
      strong: '你的直觉和证据一致。',
      limited: '你的直觉和现有证据方向一致。',
      debated: '研究者自己也还没吵完。',
    },
    skip: {
      strong: '证据说得很清楚。',
      limited: '证据有限：这是对现有资料的判断，不是定论。',
      debated: '这条尚有争议，完整条目里写了几边各自的理由。',
    },
  },
  en: {
    thought: {
      strong: 'Added to your journal of changed minds.',
      limited: 'The evidence doesn’t support the claim, though that isn’t proof it’s false.',
      debated: 'This one is unsettled. See what each side says.',
    },
    unsure: {
      strong: 'Now you have sources to decide with.',
      limited: 'Your caution fits: the evidence really is limited.',
      debated: '“Not sure” is exactly where this one stands.',
    },
    doubted: {
      strong: 'Your instinct matches the evidence.',
      limited: 'Your instinct points the same way as the available evidence.',
      debated: 'Researchers are still arguing about this one.',
    },
    skip: {
      strong: 'The evidence here is clear.',
      limited: 'Limited evidence: a judgment about available sources, not a final word.',
      debated: 'Debated: the full entry sets out each side’s reasons.',
    },
  },
}

export function responseFor(locale: Locale, stance: Stance | null, confidence: Confidence): string {
  return RESPONSES[locale][stance ?? 'skip'][confidence]
}

export function dayLabel(day: string, locale: Locale): string {
  const [y, m, d] = day.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return locale === 'zh'
    ? `${m} 月 ${d} 日 · ${'日一二三四五六'.split('').map((c) => `周${c}`)[date.getDay()]}`
    : date.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })
}

/** 说法越长字号越小，让「今天」一屏放得下 */
export function claimSize(text: string, locale: Locale): 'l' | 'm' | 's' {
  const n = [...text].length
  if (locale === 'zh') return n <= 16 ? 'l' : n <= 28 ? 'm' : 's'
  return n <= 42 ? 'l' : n <= 80 ? 'm' : 's'
}
