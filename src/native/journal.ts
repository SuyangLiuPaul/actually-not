import type { Locale } from '../i18n'
import { PLAY_QUESTIONS, playRound, type PlayQuestion } from '../data/play'

export type Discovery = {
  id: string
  shownAt: string
  choice: Record<Locale, string> | null
  answer: Record<Locale, string>
  certainty: number | null
  correct: boolean | null
}
export const JOURNAL_KEY = 'actually-not-journal-v1'
export const SAVED_KEY = 'actually-not-saved-v1'
export function localDay(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function daySeed(day: string): number {
  return [...day].reduce((n, c) => Math.imul(n, 31) + c.charCodeAt(0), 0) >>> 0
}
export function loadJournal(): Discovery[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(JOURNAL_KEY) ?? '[]')
    const known = new Set(PLAY_QUESTIONS.map(q => q.id))
    return Array.isArray(raw) ? raw.filter((r): r is Discovery => typeof r === 'object' && r !== null && known.has(r.id) && typeof r.shownAt === 'string' && typeof r.answer?.zh === 'string' && typeof r.answer?.en === 'string' && (r.choice === null || (typeof r.choice?.zh === 'string' && typeof r.choice?.en === 'string')) && (r.correct === null || typeof r.correct === 'boolean') && (r.certainty === null || [0,1,2].includes(r.certainty))) : []
  } catch { return [] }
}
export function appendDiscovery(record: Discovery): Discovery[] {
  const records = loadJournal().filter(r => !(r.id === record.id && localDay(new Date(r.shownAt)) === localDay(new Date(record.shownAt))))
  const next = [...records, record].slice(-1000)
  try { localStorage.setItem(JOURNAL_KEY, JSON.stringify(next)) } catch { /* 阅读不依赖存储。 */ }
  return next
}
export function dailyQuestions(day: string, journal: Discovery[]): PlayQuestion[] {
  const seed = daySeed(day)
  // 用当天开始前的记录，保证本日答题不会改变本日题单。
  const earlier = journal.filter(r => localDay(new Date(r.shownAt)) < day)
  const seen = new Set(earlier.map(r => r.id))
  const ordered = [...PLAY_QUESTIONS].sort((a,b) => daySeed(`${day}:${a.id}`) - daySeed(`${day}:${b.id}`))
  const fresh = ordered.filter(q => !seen.has(q.id))
  const latest = new Map<string, Discovery>()
  earlier.forEach(r => { if (!latest.has(r.id) || latest.get(r.id)!.shownAt < r.shownAt) latest.set(r.id, r) })
  const review = [...latest.values()].sort((a,b) => Number(a.correct === true) - Number(b.correct === true) || a.shownAt.localeCompare(b.shownAt)).map(r => ordered.find(q => q.id === r.id)!).filter(Boolean)
  const chosen = fresh.slice(0,2)
  const third = review.find(q => !chosen.some(c => c.id === q.id)) ?? fresh[2]
  if (third) chosen.push(third)
  for (const q of ordered) if (chosen.length < 3 && !chosen.some(c => c.id === q.id)) chosen.push(q)
  // 沿用经过测试的洗牌，逐题保持中英对应和正确答案映射。
  return chosen.map((q,i) => playRound(q.topic, seed + i).find(item => item.id === q.id) ?? q)
}
