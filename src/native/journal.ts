import type { Locale } from '../i18n'
import type { CategoryId } from '../types'

/**
 * 改观簿 v2（App 1.2）。
 *
 * 存储键不变（actually-not-journal-v1，本地存储来源也不变），记录格式加了版本号 `v` 和类型 `kind`：
 *   belief  每日「你信吗？」的表态（我一直这么以为 / 说不准 / 我不信 / 直接看答案）
 *   quiz    手写选择题（PlayDeck）。1.1 及以前的记录没有 v/kind，一律按 quiz 读取。
 *   review  间隔回看时的自评（记得 / 有点忘了）
 *
 * 不丢数据的规则：
 * - 记录不再按「当前包里有没有这条内容」过滤。Android 包不含 urgent/body 的条目，
 *   这些记录照样保留在存储里，只是不显示、不计数。
 * - 认不出的记录（比如以后版本写入的新类型）原样保留，不覆盖。
 * - 第一次迁移前，把原始字符串备份到 JOURNAL_BACKUP_KEY。
 */
export type Stance = 'thought' | 'unsure' | 'doubted'
export const STANCES: readonly Stance[] = ['thought', 'unsure', 'doubted']
export const JOURNAL_VERSION = 2

type Base = { v: 2; id: string; shownAt: string }
export type BeliefRecord = Base & { kind: 'belief'; stance: Stance | null }
export type QuizRecord = Base & { kind: 'quiz'; choice: Record<Locale, string> | null; answer: Record<Locale, string>; certainty: number | null; correct: boolean | null }
export type ReviewRecord = Base & { kind: 'review'; recalled: boolean }
export type JournalRecord = BeliefRecord | QuizRecord | ReviewRecord

/** 1.1 的记录格式，PlayDeck（网站和 App 共用）仍然产出它；写入时升级成 QuizRecord。 */
export type Discovery = {
  id: string
  shownAt: string
  choice: Record<Locale, string> | null
  answer: Record<Locale, string>
  certainty: number | null
  correct: boolean | null
}

export const JOURNAL_KEY = 'actually-not-journal-v1'
export const JOURNAL_BACKUP_KEY = 'actually-not-journal-v1-backup'
export const SAVED_KEY = 'actually-not-saved-v1'
/** 约 1.5 MB，远低于 localStorage 的 5 MB；每天 3 条 + 回看也够用十年以上。 */
export const JOURNAL_LIMIT = 10_000

export function localDay(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number)
  return localDay(new Date(y, m - 1, d + n))
}
const recordDay = (r: { shownAt: string }) => localDay(new Date(r.shownAt))

/** 32 位字符串哈希（FNV-1a + murmur 收尾），只用于确定性排序。 */
export function hash(text: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193)
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16
  return h >>> 0
}

const isObject = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x)
const isBilingual = (x: unknown): x is Record<Locale, string> => isObject(x) && typeof x.zh === 'string' && typeof x.en === 'string'

/** 把一条存储里的记录升级为 v2；认不出就返回 null（调用方原样保留它）。 */
export function migrateRecord(raw: unknown): JournalRecord | null {
  if (!isObject(raw)) return null
  const { id, shownAt } = raw
  if (typeof id !== 'string' || !id || id.length > 200) return null
  if (typeof shownAt !== 'string' || !Number.isFinite(Date.parse(shownAt))) return null
  const base = { v: 2 as const, id, shownAt }
  if (raw.kind === 'belief') {
    const stance = raw.stance
    return stance === null || (typeof stance === 'string' && (STANCES as readonly string[]).includes(stance)) ? { ...base, kind: 'belief', stance: stance as Stance | null } : null
  }
  if (raw.kind === 'review') return typeof raw.recalled === 'boolean' ? { ...base, kind: 'review', recalled: raw.recalled } : null
  if (raw.kind === undefined || raw.kind === 'quiz') {
    const { choice, answer, certainty, correct } = raw
    if (!isBilingual(answer)) return null
    if (!(choice === null || isBilingual(choice))) return null
    if (!(correct === null || typeof correct === 'boolean')) return null
    if (!(certainty === null || certainty === 0 || certainty === 1 || certainty === 2)) return null
    return { ...base, kind: 'quiz', choice: choice === null ? null : { zh: choice.zh, en: choice.en }, answer: { zh: answer.zh, en: answer.en }, certainty, correct }
  }
  return null
}

/** 解析存储内容：返回认得的 v2 记录。不按内容 id 过滤。 */
export function parseJournal(raw: unknown): JournalRecord[] {
  if (!Array.isArray(raw)) return []
  return raw.flatMap((r) => { const m = migrateRecord(r); return m ? [m] : [] })
}

/** 存储里的原始记录（含认不出的和当前平台不显示的），导出备份用。 */
export function rawJournal(): unknown[] { return readRaw() }
function readRaw(): unknown[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(JOURNAL_KEY) ?? '[]')
    return Array.isArray(value) ? value : []
  } catch { return [] }
}
function writeRaw(entries: unknown[]) {
  try { localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries.slice(-JOURNAL_LIMIT))) } catch { /* 阅读不依赖存储。 */ }
}

export function loadJournal(): JournalRecord[] {
  return parseJournal(readRaw())
}

/**
 * 启动时调用一次：把旧记录就地升级为 v2，认不出的原样保留。
 * 第一次升级前备份原始字符串。返回升级了几条。
 */
export function migrateStoredJournal(): number {
  let original: string | null = null
  try { original = localStorage.getItem(JOURNAL_KEY) } catch { return 0 }
  if (!original) return 0
  const raw = readRaw()
  let changed = 0
  const next = raw.map((r) => {
    if (isObject(r) && r.v === JOURNAL_VERSION) return r
    const m = migrateRecord(r)
    if (!m) return r
    changed++
    return m
  })
  if (!changed) return 0
  try { if (localStorage.getItem(JOURNAL_BACKUP_KEY) === null) localStorage.setItem(JOURNAL_BACKUP_KEY, original) } catch { /* 备份失败也继续，迁移本身不删任何东西。 */ }
  writeRaw(next)
  return changed
}

export function quizRecord(d: Discovery): QuizRecord {
  return { v: 2, kind: 'quiz', id: d.id, shownAt: d.shownAt, choice: d.choice, answer: d.answer, certainty: d.certainty, correct: d.correct }
}

/** 追加一条记录。同一天、同一条、同一类型只保留最新一次；其它记录（含认不出的）原样保留。 */
export function appendRecord(record: JournalRecord): JournalRecord[] {
  const day = recordDay(record)
  const kept = readRaw().filter((r) => {
    const m = migrateRecord(r)
    return !(m && m.id === record.id && m.kind === record.kind && recordDay(m) === day)
  })
  writeRaw([...kept, record])
  return loadJournal()
}

// ── 每日「你信吗？」 ───────────────────────────────────────────

export const DAILY_COUNT = 3
type Entry = { id: string; category: CategoryId | string }

/**
 * 某个本地日期的 3 条。只看这一天之前的记录，所以当天怎么答都不会改变当天的题单。
 * 候选：传入的条目（调用方已经按平台过滤），急救类不进随机出题（板块里随时可读）。
 * 先挑从没表过态的，尽量来自不同板块；全部表过态以后，从最久以前表态的开始再问一次。
 */
export function dailyBeliefIds(day: string, entries: readonly Entry[], journal: readonly JournalRecord[]): string[] {
  const pool = entries.filter((m) => m.category !== 'urgent')
  const answeredAt = new Map<string, string>()
  for (const r of journal) {
    if (r.kind !== 'belief' || recordDay(r) >= day) continue
    const prev = answeredAt.get(r.id)
    if (!prev || prev < r.shownAt) answeredAt.set(r.id, r.shownAt)
  }
  const ordered = [...pool].sort((a, b) => hash(`${day}|${a.id}`) - hash(`${day}|${b.id}`) || a.id.localeCompare(b.id))
  const fresh = ordered.filter((m) => !answeredAt.has(m.id))
  const picked: Entry[] = []
  for (const m of fresh) if (picked.length < DAILY_COUNT && !picked.some((p) => p.category === m.category)) picked.push(m)
  for (const m of fresh) if (picked.length < DAILY_COUNT && !picked.includes(m)) picked.push(m)
  if (picked.length < DAILY_COUNT) {
    const again = ordered.filter((m) => answeredAt.has(m.id) && !picked.includes(m))
      .sort((a, b) => answeredAt.get(a.id)!.localeCompare(answeredAt.get(b.id)!) || a.id.localeCompare(b.id))
    for (const m of again) if (picked.length < DAILY_COUNT) picked.push(m)
  }
  return picked.map((m) => m.id)
}

/** 当天对某条的表态记录（没有就是 undefined） */
export function beliefOn(day: string, id: string, journal: readonly JournalRecord[]): BeliefRecord | undefined {
  let found: BeliefRecord | undefined
  for (const r of journal) if (r.kind === 'belief' && r.id === id && recordDay(r) === day && (!found || found.shownAt < r.shownAt)) found = r
  return found
}

// ── 改观与回看 ───────────────────────────────────────────────

/** 「改观」只算表态「我一直这么以为」的条目（说不准不算）。只数 visible 里的条目。 */
export function changedMindIds(journal: readonly JournalRecord[], visible?: ReadonlySet<string>): string[] {
  const ids = new Set<string>()
  for (const r of journal) if (r.kind === 'belief' && r.stance === 'thought' && (!visible || visible.has(r.id))) ids.add(r.id)
  return [...ids]
}

/** 每条最新的表态 */
export function latestBeliefs(journal: readonly JournalRecord[]): Map<string, BeliefRecord> {
  const latest = new Map<string, BeliefRecord>()
  for (const r of journal) if (r.kind === 'belief' && (!latest.has(r.id) || latest.get(r.id)!.shownAt < r.shownAt)) latest.set(r.id, r)
  return latest
}

/** 回看间隔：2 天 → 7 天 → 21 天，然后毕业。只针对改观过的条目。 */
export const REVIEW_INTERVALS = [2, 7, 21] as const

/**
 * 某条的下一次回看日期；不需要回看（没改观过，或已毕业）返回 null。
 * 记得 → 进入下一档；有点忘了 → 回到 7 天档。从最近一次「我一直这么以为」算起。
 */
export function nextReviewDay(id: string, journal: readonly JournalRecord[]): string | null {
  const own = journal.filter((r) => r.id === id && (r.kind === 'belief' || r.kind === 'review')).sort((a, b) => a.shownAt.localeCompare(b.shownAt))
  let start = -1
  own.forEach((r, i) => { if (r.kind === 'belief' && r.stance === 'thought') start = i })
  if (start < 0) return null
  let stage = 0
  let base = recordDay(own[start])
  for (const r of own.slice(start + 1)) {
    if (r.kind !== 'review') continue
    stage = r.recalled ? stage + 1 : 1
    base = recordDay(r)
  }
  return stage >= REVIEW_INTERVALS.length ? null : addDays(base, REVIEW_INTERVALS[stage])
}

/** 到期（含过期）的回看，最早到期的在前。 */
export function dueReviews(day: string, journal: readonly JournalRecord[], visible?: ReadonlySet<string>): string[] {
  return changedMindIds(journal, visible)
    .map((id) => ({ id, due: nextReviewDay(id, journal) }))
    .filter((x): x is { id: string; due: string } => x.due !== null && x.due <= day)
    .sort((a, b) => a.due.localeCompare(b.due) || a.id.localeCompare(b.id))
    .map((x) => x.id)
}

// ── 使用天数（决定什么时候提出提醒） ─────────────────────────

export function addUseDay(days: readonly string[], day: string): string[] {
  return days.includes(day) ? [...days] : [...days, day].sort().slice(-30)
}
export const REMINDER_OFFER_AFTER_DAYS = 3

// ── 续玩（PlayDeck 用） ──────────────────────────────────────

export function resumeStep(questions: { id: string }[], records: { id: string }[]): number {
  const seen = new Set(records.map((r) => r.id))
  const first = questions.findIndex((q) => !seen.has(q.id))
  return first < 0 ? questions.length : first
}
