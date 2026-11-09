import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  addDays, addUseDay, appendRecord, beliefOn, changedMindIds, dailyBeliefIds, dueReviews, JOURNAL_BACKUP_KEY, JOURNAL_KEY,
  latestBeliefs, loadJournal, localDay, migrateStoredJournal, nextReviewDay, parseJournal, resumeStep,
  type BeliefRecord, type JournalRecord, type ReviewRecord, type Stance,
} from './journal'
import { MYTHS } from '../data/myths'
import { filterMythsForPlatform, ANDROID_EXCLUDED_CATEGORIES } from '../data/platform'

const at = (day: string, hour = 12) => { const [y, m, d] = day.split('-').map(Number); return new Date(y, m - 1, d, hour).toISOString() }
const belief = (id: string, day: string, stance: Stance | null, hour = 12): BeliefRecord => ({ v: 2, kind: 'belief', id, shownAt: at(day, hour), stance })
const review = (id: string, day: string, recalled: boolean): ReviewRecord => ({ v: 2, kind: 'review', id, shownAt: at(day, 13), recalled })
const v1 = (id: string, shownAt: string, correct: boolean | null) => ({ id, shownAt, correct, choice: correct === null ? null : { zh: '甲', en: 'A' }, answer: { zh: '答案', en: 'Answer' }, certainty: null })

/** 一个最小的 localStorage，测试迁移与写入 */
class MemoryStorage {
  data = new Map<string, string>()
  getItem(k: string) { return this.data.has(k) ? this.data.get(k)! : null }
  setItem(k: string, v: string) { this.data.set(k, String(v)) }
  removeItem(k: string) { this.data.delete(k) }
  clear() { this.data.clear() }
  key(i: number) { return [...this.data.keys()][i] ?? null }
  get length() { return this.data.size }
}

describe('日期', () => {
  it('使用本地日历日期，不以 UTC 日界线切换', () => { expect(localDay(new Date(2026, 9, 6, 0, 5))).toBe('2026-10-06') })
  it('addDays 跨月、跨年', () => {
    expect(addDays('2026-10-30', 2)).toBe('2026-11-01')
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28')
  })
})

describe('每日「你信吗？」选题', () => {
  const ios = filterMythsForPlatform(MYTHS, 'ios')
  const android = filterMythsForPlatform(MYTHS, 'android')

  it('同一天、同样的历史，总是同一组 3 条，且彼此不同', () => {
    const a = dailyBeliefIds('2026-11-09', ios, [])
    const b = dailyBeliefIds('2026-11-09', [...ios].reverse(), [])
    expect(a).toHaveLength(3)
    expect(new Set(a).size).toBe(3)
    expect(b).toEqual(a)
  })

  it('不同日期给出不同的题单', () => {
    const days = Array.from({ length: 10 }, (_, i) => addDays('2026-11-01', i))
    const sets = new Set(days.map((d) => dailyBeliefIds(d, ios, []).join(',')))
    expect(sets.size).toBe(10)
  })

  it('当天表态不会改变当天的题单', () => {
    const day = '2026-11-09'
    const round = dailyBeliefIds(day, ios, [])
    const after = dailyBeliefIds(day, ios, round.map((id) => belief(id, day, 'thought')))
    expect(after).toEqual(round)
  })

  it('优先挑从没表过态的条目，三条尽量来自不同板块', () => {
    const day1 = dailyBeliefIds('2026-11-09', ios, [])
    const history = day1.map((id) => belief(id, '2026-11-09', 'unsure'))
    const day2 = dailyBeliefIds('2026-11-10', ios, history)
    expect(day2.some((id) => day1.includes(id))).toBe(false)
    const cats = day2.map((id) => ios.find((m) => m.id === id)!.category)
    expect(new Set(cats).size).toBe(3)
  })

  it('急救类不进每日出题（板块里随时可读）', () => {
    for (let i = 0; i < 60; i++) for (const id of dailyBeliefIds(addDays('2026-11-01', i), ios, [])) expect(ios.find((m) => m.id === id)!.category).not.toBe('urgent')
  })

  it('Android：只从过滤后的条目出题，从不出现 urgent / body', () => {
    const allowed = new Set(android.map((m) => m.id))
    let history: JournalRecord[] = []
    for (let i = 0; i < 90; i++) {
      const day = addDays('2026-11-01', i)
      const ids = dailyBeliefIds(day, android, history)
      expect(ids).toHaveLength(3)
      for (const id of ids) {
        expect(allowed.has(id)).toBe(true)
        expect(ANDROID_EXCLUDED_CATEGORIES).not.toContain(MYTHS.find((m) => m.id === id)!.category)
      }
      history = [...history, ...ids.map((id) => belief(id, day, 'doubted'))]
    }
  })

  it('全部表过态以后，从最久以前表态的条目开始再问', () => {
    const small = ios.filter((m) => m.category === 'film').slice(0, 4)
    const history = [belief(small[0].id, '2026-10-01', 'thought'), belief(small[1].id, '2026-10-05', 'thought'), belief(small[2].id, '2026-10-03', 'thought'), belief(small[3].id, '2026-10-04', 'thought')]
    expect(dailyBeliefIds('2026-11-09', small, history)).toEqual([small[0].id, small[2].id, small[3].id])
  })

  it('beliefOn 只认当天的表态', () => {
    const records = [belief('a', '2026-11-08', 'thought'), belief('a', '2026-11-09', 'doubted', 9), belief('a', '2026-11-09', 'unsure', 10)]
    expect(beliefOn('2026-11-09', 'a', records)?.stance).toBe('unsure')
    expect(beliefOn('2026-11-07', 'a', records)).toBeUndefined()
  })
})

describe('改观簿 v2：旧记录迁移', () => {
  let storage: MemoryStorage
  beforeEach(() => { storage = new MemoryStorage(); (globalThis as { localStorage?: unknown }).localStorage = storage })
  afterEach(() => { delete (globalThis as { localStorage?: unknown }).localStorage })

  it('1.1 的记录按 quiz 读取，加上版本号和类型，字段不丢', () => {
    const old = v1('film-silencer', at('2026-10-06'), false)
    const [r] = parseJournal([old])
    expect(r).toEqual({ v: 2, kind: 'quiz', id: 'film-silencer', shownAt: old.shownAt, choice: old.choice, answer: old.answer, certainty: null, correct: false })
  })

  it('不再丢掉不在手写题库里的记录（1.1 的 loadJournal 会丢）', () => {
    const records = [v1('film-silencer', at('2026-10-06'), true), belief('tongue-map', '2026-11-09', 'thought'), belief('some-entry-not-in-play', '2026-11-09', 'unsure')]
    expect(parseJournal(records).map((r) => r.id)).toEqual(['film-silencer', 'tongue-map', 'some-entry-not-in-play'])
  })

  it('Android 被排除分类的记录保留在存储里，计数时不算、但数据还在', () => {
    const bodyId = MYTHS.find((m) => m.category === 'body')!.id
    const urgentId = MYTHS.find((m) => m.category === 'urgent')!.id
    const eatId = MYTHS.find((m) => m.category === 'eat')!.id
    storage.setItem(JOURNAL_KEY, JSON.stringify([v1(bodyId, at('2026-10-01'), false), belief(urgentId, '2026-11-01', 'thought'), belief(eatId, '2026-11-02', 'thought')]))
    migrateStoredJournal()
    appendRecord(belief(eatId, '2026-11-09', 'doubted'))
    const ids = loadJournal().map((r) => r.id)
    expect(ids).toContain(bodyId)
    expect(ids).toContain(urgentId)
    const visible = new Set(filterMythsForPlatform(MYTHS, 'android').map((m) => m.id))
    expect(changedMindIds(loadJournal(), visible)).toEqual([eatId])
    expect(changedMindIds(loadJournal())).toEqual([urgentId, eatId])
  })

  it('迁移就地写回 v2、先备份原始数据，重复迁移是空操作', () => {
    const raw = JSON.stringify([v1('film-silencer', at('2026-10-06'), false), v1('why-black-box-orange', at('2026-10-07'), null)])
    storage.setItem(JOURNAL_KEY, raw)
    expect(migrateStoredJournal()).toBe(2)
    expect(storage.getItem(JOURNAL_BACKUP_KEY)).toBe(raw)
    const stored = JSON.parse(storage.getItem(JOURNAL_KEY)!)
    expect(stored.every((r: { v: number; kind: string }) => r.v === 2 && r.kind === 'quiz')).toBe(true)
    expect(migrateStoredJournal()).toBe(0)
    expect(storage.getItem(JOURNAL_BACKUP_KEY)).toBe(raw)
  })

  it('认不出的记录（坏数据或以后版本的新类型）原样保留，写入新记录也不覆盖', () => {
    const future = { v: 3, kind: 'weekly', id: 'x', shownAt: at('2026-12-01'), extra: 1 }
    const broken = { id: 'film-silencer', shownAt: 'not a date' }
    storage.setItem(JOURNAL_KEY, JSON.stringify([future, broken, v1('film-silencer', at('2026-10-06'), true)]))
    migrateStoredJournal()
    appendRecord(belief('film-quicksand', '2026-11-09', 'unsure'))
    const stored = JSON.parse(storage.getItem(JOURNAL_KEY)!)
    expect(stored[0]).toEqual(future)
    expect(stored[1]).toEqual(broken)
    expect(loadJournal().map((r) => r.kind)).toEqual(['quiz', 'belief'])
  })

  it('同一天同一条同一类型只留最新一次；不同类型互不覆盖', () => {
    appendRecord(belief('a', '2026-11-09', 'unsure', 9))
    appendRecord(belief('a', '2026-11-09', 'thought', 10))
    appendRecord(review('a', '2026-11-09', true))
    appendRecord(belief('a', '2026-11-10', 'doubted'))
    expect(loadJournal().map((r) => `${r.kind}:${r.kind === 'belief' ? r.stance : ''}`)).toEqual(['belief:thought', 'review:', 'belief:doubted'])
  })

  it('存储坏掉或不可用时返回空列表，不抛错', () => {
    storage.setItem(JOURNAL_KEY, '{not json')
    expect(loadJournal()).toEqual([])
    delete (globalThis as { localStorage?: unknown }).localStorage
    expect(loadJournal()).toEqual([])
    expect(migrateStoredJournal()).toBe(0)
  })
})

describe('改观计数口径', () => {
  it('只算「我一直这么以为」，说不准 / 我不信 / 直接看答案都不算；同一条只算一次', () => {
    const records: JournalRecord[] = [
      belief('a', '2026-11-01', 'thought'), belief('a', '2026-12-01', 'doubted'),
      belief('b', '2026-11-01', 'unsure'), belief('c', '2026-11-01', 'doubted'), belief('d', '2026-11-01', null),
      { v: 2, kind: 'quiz', id: 'e', shownAt: at('2026-10-01'), choice: { zh: '甲', en: 'A' }, answer: { zh: '乙', en: 'B' }, certainty: 2, correct: false },
      belief('f', '2026-11-02', 'thought'),
    ]
    expect(changedMindIds(records).sort()).toEqual(['a', 'f'])
    expect(latestBeliefs(records).get('a')?.stance).toBe('doubted')
  })
})

describe('间隔回看 2 / 7 / 21 天', () => {
  it('只给改观过的条目排回看：2 天后到期', () => {
    const records = [belief('a', '2026-11-01', 'thought'), belief('b', '2026-11-01', 'unsure'), belief('c', '2026-11-01', 'doubted')]
    expect(nextReviewDay('a', records)).toBe('2026-11-03')
    expect(nextReviewDay('b', records)).toBeNull()
    expect(nextReviewDay('c', records)).toBeNull()
    expect(dueReviews('2026-11-02', records)).toEqual([])
    expect(dueReviews('2026-11-03', records)).toEqual(['a'])
    expect(dueReviews('2026-11-20', records)).toEqual(['a'])
  })

  it('记得 → 7 天 → 21 天 → 毕业', () => {
    let records: JournalRecord[] = [belief('a', '2026-11-01', 'thought')]
    records = [...records, review('a', '2026-11-03', true)]
    expect(nextReviewDay('a', records)).toBe('2026-11-10')
    records = [...records, review('a', '2026-11-10', true)]
    expect(nextReviewDay('a', records)).toBe('2026-12-01')
    records = [...records, review('a', '2026-12-01', true)]
    expect(nextReviewDay('a', records)).toBeNull()
    expect(dueReviews('2027-06-01', records)).toEqual([])
  })

  it('有点忘了 → 7 天后再回看（从那次回看算起）', () => {
    const records = [belief('a', '2026-11-01', 'thought'), review('a', '2026-11-03', true), review('a', '2026-11-12', false)]
    expect(nextReviewDay('a', records)).toBe('2026-11-19')
  })

  it('晚来回看按实际回看那天重新起算；到期的按到期先后排序', () => {
    const records = [belief('a', '2026-11-05', 'thought'), belief('b', '2026-11-01', 'thought'), review('b', '2026-11-08', true)]
    expect(nextReviewDay('b', records)).toBe('2026-11-15')
    expect(dueReviews('2026-11-20', records)).toEqual(['a', 'b'])
  })

  it('不显示的条目（Android 排除）不排回看', () => {
    const records = [belief('hidden', '2026-11-01', 'thought'), belief('shown', '2026-11-01', 'thought')]
    expect(dueReviews('2026-11-05', records, new Set(['shown']))).toEqual(['shown'])
  })
})

describe('其它', () => {
  it('使用天数去重、排序，最多留 30 天', () => {
    expect(addUseDay(['2026-11-02', '2026-11-01'], '2026-11-02')).toEqual(['2026-11-02', '2026-11-01'])
    expect(addUseDay(['2026-11-01'], '2026-11-03')).toEqual(['2026-11-01', '2026-11-03'])
    expect(addUseDay(Array.from({ length: 30 }, (_, i) => addDays('2026-10-01', i)), '2026-12-01')).toHaveLength(30)
  })
  it('续玩从第一个未揭晓的题开始，全部完成后进入结果页', () => {
    const qs = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    expect(resumeStep(qs, [])).toBe(0)
    expect(resumeStep(qs, [{ id: 'a' }])).toBe(1)
    expect(resumeStep(qs, qs)).toBe(3)
  })
})
