import { describe, expect, it } from 'vitest'
import { parseTime, reminderPlan, reminderText, REMINDER_DAYS, REMINDER_IDS, DEFAULT_REMINDER_TIME } from './reminders'

const beliefFor = (day: string) => `说法 ${day}`

describe('每日提醒', () => {
  it('默认 20:00；时间格式校验', () => {
    expect(DEFAULT_REMINDER_TIME).toBe('20:00')
    expect(parseTime('20:00')).toEqual({ hour: 20, minute: 0 })
    expect(parseTime('24:00')).toBeNull()
    expect(parseTime('8:00')).toBeNull()
  })

  it('预排 7 天、每天最多一条，正文就是那天的说法', () => {
    const plan = reminderPlan({ now: new Date(2026, 10, 9, 9, 0), time: '20:00', locale: 'zh', todayDone: false, beliefFor })
    expect(plan).toHaveLength(REMINDER_DAYS)
    expect(new Set(plan.map((p) => p.day)).size).toBe(REMINDER_DAYS)
    expect(plan[0].day).toBe('2026-11-09')
    expect(plan[0].at).toEqual(new Date(2026, 10, 9, 20, 0))
    expect(plan[0].body).toBe('「说法 2026-11-09」你信吗？')
    expect(plan[6].day).toBe('2026-11-15')
    expect(plan.map((p) => p.id)).toEqual(REMINDER_IDS.slice(0, 7))
  })

  it('今天的时间已过，或今天 3 条都表过态，就从明天开始', () => {
    expect(reminderPlan({ now: new Date(2026, 10, 9, 21, 0), time: '20:00', locale: 'zh', todayDone: false, beliefFor })[0].day).toBe('2026-11-10')
    const done = reminderPlan({ now: new Date(2026, 10, 9, 9, 0), time: '20:00', locale: 'en', todayDone: true, beliefFor })
    expect(done[0].day).toBe('2026-11-10')
    expect(done).toHaveLength(REMINDER_DAYS)
  })

  it('英文文案；没有催促或内疚的措辞', () => {
    const t = reminderText('Cracking your knuckles causes arthritis.', 'en')
    expect(t.body).toBe('“Cracking your knuckles causes arthritis.” Do you buy it?')
    for (const banned of ['别错过', '在等你', '天没来', 'miss', 'streak', 'waiting']) expect(`${t.title}${t.body}${reminderText('x', 'zh').body}`).not.toContain(banned)
  })
})
