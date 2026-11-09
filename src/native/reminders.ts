import type { Locale } from '../i18n'
import { addDays, localDay } from './journal'

/**
 * 每日提醒（1.2）：默认关闭；用户在 3 个不同的日子用过 App 后才轻轻提出；每天最多一条；
 * 通知正文就是那天「今日一条」的说法；本机预排未来 7 天，每次打开 App / 表态后重排。
 */
export const DEFAULT_REMINDER_TIME = '20:00'
export const REMINDER_DAYS = 7
/** 1.1 用的重复提醒 id，开启新提醒前要取消它 */
export const LEGACY_REMINDER_ID = 301
export const REMINDER_IDS = Array.from({ length: REMINDER_DAYS + 1 }, (_, i) => 310 + i)

export type ReminderItem = { id: number; at: Date; title: string; body: string; day: string }

export function parseTime(time: string): { hour: number; minute: number } | null {
  const m = /^(\d{2}):(\d{2})$/.exec(time)
  if (!m) return null
  const hour = Number(m[1]), minute = Number(m[2])
  return hour <= 23 && minute <= 59 ? { hour, minute } : null
}

export function reminderText(belief: string, locale: Locale): { title: string; body: string } {
  const claim = belief.trim()
  return locale === 'zh'
    ? { title: '其实不是', body: `「${claim}」你信吗？` }
    : { title: 'Actually, Not', body: `“${claim}” Do you buy it?` }
}

/**
 * 接下来 7 个提醒时刻（今天的时间已过、或今天 3 条都已表态，就从明天开始）。
 * beliefFor(day) 返回那天第 1 条的说法；返回 undefined 的日子跳过。
 */
export function reminderPlan(opts: { now: Date; time: string; locale: Locale; todayDone: boolean; beliefFor: (day: string) => string | undefined }): ReminderItem[] {
  const t = parseTime(opts.time)
  if (!t) return []
  const items: ReminderItem[] = []
  const today = new Date(opts.now.getFullYear(), opts.now.getMonth(), opts.now.getDate())
  const todayKey = localDay(today)
  for (let offset = 0; items.length < REMINDER_DAYS && offset <= REMINDER_DAYS; offset++) {
    const at = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset, t.hour, t.minute)
    if (offset === 0 && (opts.todayDone || at.getTime() <= opts.now.getTime())) continue
    const day = addDays(todayKey, offset)
    const belief = opts.beliefFor(day)
    if (!belief) continue
    items.push({ id: REMINDER_IDS[items.length], at, day, ...reminderText(belief, opts.locale) })
  }
  return items
}
