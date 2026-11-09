import { useMemo, useState } from 'react'
import { categoryLabel, type Locale } from '../i18n'
import { CATEGORIES, type CategoryId, type Myth } from '../types'
import { ConfidenceChip } from './BeliefCard'
import { changedMindIds, latestBeliefs, localDay, nextReviewDay, type JournalRecord, type QuizRecord, type Stance } from './journal'
import { dayLabel, STANCE_LABEL } from './copy'
import { TabHeader } from './TabHeader'

type Filter = 'all' | Stance | 'saved'

/** 间隔回看：反过来问「其实是怎样？」→ 先在心里回忆 → 看结论 → 自评。不计分。 */
function ReviewSession({ ids, myths, locale, onRecord, onOpen, onDone }: {
  ids: string[]; myths: Myth[]; locale: Locale; onRecord: (id: string, recalled: boolean) => void; onOpen: (id: string) => void; onDone: () => void
}) {
  const zh = locale === 'zh'
  const [queue] = useState(ids)
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(false)
  const myth = myths.find((m) => m.id === queue[index])
  if (!myth) return <section className="review-card review-done">
    <p className="over-label">{zh ? '回看完了' : 'All revisited'}</p>
    <h2>{zh ? '记得的会排到更久以后；有点忘的，一周后再见。' : 'What you remembered comes back later; anything fuzzy returns in a week.'}</h2>
    <button className="primary-button" onClick={onDone}>{zh ? '回到改观簿' : 'Back to your journal'}</button>
  </section>
  const answer = (recalled: boolean) => { onRecord(myth.id, recalled); setShown(false); setIndex(index + 1) }
  return <section className="review-card" aria-live="polite">
    <div className="review-top"><p className="over-label">{zh ? `回看 · ${index + 1}/${queue.length}` : `Revisit · ${index + 1}/${queue.length}`}</p><button className="link-button" onClick={onDone}>{zh ? '先不回看' : 'Not now'}</button></div>
    <h2 className="review-q">{zh ? `「${myth.belief}」` : `“${myth.belief}”`}<span>{zh ? '其实是怎样？' : 'What’s actually true?'}</span></h2>
    {!shown ? <>
      <p className="quiet-note">{zh ? '先在心里想一想，再看结论。' : 'Recall it in your head first, then check.'}</p>
      <button className="primary-button" onClick={() => setShown(true)}>{zh ? '想好了，看结论' : 'Show me'}</button>
    </> : <>
      <p className="over-label">{zh ? '其实' : 'Actually'}</p>
      <p className="belief-truth">{myth.truth}</p>
      <div className="belief-meta"><ConfidenceChip confidence={myth.confidence} locale={locale} /><button className="link-button" onClick={() => onOpen(myth.id)}>{zh ? '解释和出处 ↗' : 'Explanation & sources ↗'}</button></div>
      <div className="button-row">
        <button className="primary-button" onClick={() => answer(true)}>{zh ? '记得' : 'I remembered'}</button>
        <button className="ghost-button" onClick={() => answer(false)}>{zh ? '有点忘了' : 'A bit fuzzy'}</button>
      </div>
    </>}
  </section>
}

/** 改观簿：属于你自己的记录。只陈述累积，不比较、不排行、不设目标。 */
export function JournalView({ journal, myths, locale, day, read, readCount, saved, due, reviewing, showOffer, onReviewStart, onReviewEnd, onReviewRecord, onOpen, onSave, onSettings, onToday, onLibrary, onOfferAccept, onOfferDismiss }: {
  journal: JournalRecord[]
  myths: Myth[]
  locale: Locale
  day: string
  read: Set<string>
  readCount: number
  saved: Set<string>
  due: string[]
  reviewing: boolean
  showOffer: boolean
  onReviewStart: () => void
  onReviewEnd: () => void
  onReviewRecord: (id: string, recalled: boolean) => void
  onOpen: (id: string) => void
  onSave: (id: string) => void
  onSettings: () => void
  onToday: () => void
  onLibrary: (category: CategoryId | 'all') => void
  onOfferAccept: () => void
  onOfferDismiss: () => void
}) {
  const zh = locale === 'zh'
  const [filter, setFilter] = useState<Filter>('all')
  const visible = useMemo(() => new Set(myths.map((m) => m.id)), [myths])
  const changed = changedMindIds(journal, visible).length
  const savedVisible = myths.filter((m) => saved.has(m.id))
  // 每条只列最新一次：表态优先；1.1 的挑战题记录作为「旧版挑战题」列出
  const rows = useMemo(() => {
    const beliefs = latestBeliefs(journal)
    const quizzes = new Map<string, QuizRecord>()
    for (const r of journal) if (r.kind === 'quiz' && !beliefs.has(r.id) && (!quizzes.has(r.id) || quizzes.get(r.id)!.shownAt < r.shownAt)) quizzes.set(r.id, r)
    return [...beliefs.values(), ...quizzes.values()].filter((r) => visible.has(r.id)).sort((a, b) => b.shownAt.localeCompare(a.shownAt))
  }, [journal, visible])
  const shownRows = filter === 'saved' ? [] : rows.filter((r) => filter === 'all' || (r.kind === 'belief' && r.stance === filter))
  const gear = <button className="icon-button" onClick={onSettings} aria-label={zh ? '设置' : 'Settings'}>
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" /></svg>
  </button>

  if (reviewing) return <section className="tab-view journal">
    <TabHeader kicker={zh ? '只保存在你的设备' : 'Stored on this device'} title={zh ? '改观簿' : 'Journal'} right={gear} />
    <ReviewSession ids={due} myths={myths} locale={locale} onRecord={onReviewRecord} onOpen={onOpen} onDone={onReviewEnd} />
  </section>

  const filters: [Filter, string][] = [['all', zh ? '全部' : 'All'], ['thought', zh ? '改观了' : 'Changed my mind'], ['doubted', zh ? '本来就不信' : 'Didn’t buy it'], ['unsure', zh ? '说不准' : 'Not sure'], ['saved', zh ? `收藏 ${savedVisible.length}` : `Saved ${savedVisible.length}`]]

  return <section className="tab-view journal">
    <TabHeader kicker={zh ? '只保存在你的设备' : 'Stored on this device'} title={zh ? '改观簿' : 'Journal'} right={gear} />
    <div className="journal-summary">
      <p className="journal-count">{zh ? <>你改观过 <strong>{changed}</strong> 件事</> : <>You’ve changed your mind about <strong>{changed}</strong> {changed === 1 ? 'thing' : 'things'}</>}</p>
      <p className="journal-sub">{zh ? `读过 ${readCount}/${myths.length} · 收藏 ${savedVisible.length}` : `Read ${readCount}/${myths.length} · Saved ${savedVisible.length}`}</p>
      {due.length > 0 && <button className="today-review in-card" onClick={onReviewStart}><span><strong>{zh ? `待回看 ${due.length} 条` : `${due.length} to revisit`}</strong><small>{zh ? '间隔 2 天、7 天、21 天，记得的就不再问' : 'At 2, 7 and 21 days; once remembered, it graduates'}</small></span><span aria-hidden="true">→</span></button>}
    </div>
    {showOffer && <div className="offer" role="note">
      <p><strong>{zh ? '想每天在锁屏上看到一条吗？' : 'Want one claim on your lock screen each day?'}</strong>{zh ? '每天 20:00 一条，内容就是当天的说法。随时可以在设置里关掉或改时间。' : 'One a day at 20:00, showing that day’s claim. Turn it off or change the time in Settings.'}</p>
      <div className="button-row"><button className="primary-button small" onClick={onOfferAccept}>{zh ? '开启提醒' : 'Turn on'}</button><button className="link-button" onClick={onOfferDismiss}>{zh ? '不用了' : 'No thanks'}</button></div>
    </div>}
    <details className="shelf fold coverage">
      <summary><span><strong>{zh ? '各板块读了多少' : 'Reading by category'}</strong><small>{zh ? '只是记录，没有目标' : 'Just a record, no targets'}</small></span></summary>
      <div className="coverage-list">{CATEGORIES.map((c) => {
        const entries = myths.filter((m) => m.category === c.id)
        const count = entries.filter((m) => read.has(m.id)).length
        return <button key={c.id} onClick={() => onLibrary(c.id)}><span>{categoryLabel(c.id, locale)}</span><span className="meter" aria-hidden="true"><span style={{ width: `${entries.length ? (count / entries.length) * 100 : 0}%` }} /></span><small>{count}/{entries.length}</small></button>
      })}</div>
    </details>
    <div className="chip-scroll journal-filters" role="group" aria-label={zh ? '筛选记录' : 'Filter records'}>
      {filters.map(([id, label]) => <button key={id} className="chip-button" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}
    </div>
    {!rows.length && filter !== 'saved' && <div className="empty">
      <p>{zh ? '还没有改观。今天的第一条在「今天」页，也可以去资料库查一个你听过的说法。' : 'Nothing here yet. Today’s first claim is on the Today tab, or look up something you’ve heard in the Library.'}</p>
      <div className="button-row"><button className="primary-button small" onClick={onToday}>{zh ? '去今天' : 'Go to Today'}</button><button className="ghost-button small" onClick={() => onLibrary('all')}>{zh ? '去资料库' : 'Open the Library'}</button></div>
    </div>}
    {rows.length > 0 && filter !== 'saved' && !shownRows.length && <p className="quiet-note">{zh ? '这一类还没有记录。' : 'No records of this kind yet.'}</p>}
    <ul className="record-list">
      {filter === 'saved'
        ? (savedVisible.length ? savedVisible.map((m) => <li key={m.id}><button className="record-claim" onClick={() => onOpen(m.id)}>{m.belief}</button><p className="record-truth">{m.truth}</p><div className="record-actions"><ConfidenceChip confidence={m.confidence} locale={locale} /><button className="link-button" aria-pressed onClick={() => onSave(m.id)}>{zh ? '取消收藏' : 'Remove'}</button></div></li>)
          : <li className="quiet-note">{zh ? '还没有收藏。在详情页点「收藏」就会出现在这里。' : 'Nothing saved yet. Save an entry from its detail page.'}</li>)
        : shownRows.map((r) => {
          const m = myths.find((x) => x.id === r.id)!
          const next = r.kind === 'belief' ? nextReviewDay(r.id, journal) : null
          return <li key={`${r.kind}:${r.id}`}>
            <p className="record-meta">{dayLabel(localDay(new Date(r.shownAt)), locale)} · {categoryLabel(m.category, locale)}</p>
            <button className="record-claim" data-changed={r.kind === 'belief' && r.stance === 'thought'} onClick={() => onOpen(m.id)}>{m.belief}</button>
            <p className="record-stance">{r.kind === 'belief'
              ? (r.stance ? `${zh ? '当时：' : 'You said: '}${STANCE_LABEL[locale][r.stance]}` : (zh ? '当时直接看了答案' : 'You went straight to the answer'))
              : `${zh ? '旧版挑战题 · 当时选了：' : 'Earlier quiz · you chose: '}${r.choice?.[locale] ?? (zh ? '直接看答案' : 'skipped')}`}
              {next && next > day && <span> · {zh ? `${dayLabel(next, locale).split(' · ')[0]}回看` : `revisit ${dayLabel(next, locale)}`}</span>}
            </p>
            <p className="record-truth">{m.truth}</p>
            <div className="record-actions"><ConfidenceChip confidence={m.confidence} locale={locale} /><button className="link-button" aria-pressed={saved.has(m.id)} onClick={() => onSave(m.id)}>{saved.has(m.id) ? (zh ? '已收藏' : 'Saved') : (zh ? '收藏' : 'Save')}</button></div>
          </li>
        })}
    </ul>
  </section>
}
