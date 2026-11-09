import { useState } from 'react'
import type { Locale } from '../i18n'
import type { Myth } from '../types'
import { Strike } from '../components/Strike'
import { BeliefCard } from './BeliefCard'
import { beliefOn, type JournalRecord, type Stance } from './journal'
import { dayLabel } from './copy'
import { TabHeader } from './TabHeader'

/**
 * 今天：一屏讲完。一次只放一张卡（共 3 张），下面最多一行「该回看了」。
 * 没有连胜、没有分数、没有「明天解锁」。
 */
export function TodayView({ day, ids, myths, journal, locale, total, dueCount, onAnswer, onOpen, onShare, onReview, onLibrary, onJournal }: {
  day: string
  ids: string[]
  myths: Myth[]
  journal: JournalRecord[]
  locale: Locale
  total: number
  dueCount: number
  onAnswer: (id: string, stance: Stance | null) => void
  onOpen: (id: string) => void
  onShare: (myth: Myth) => void
  onReview: () => void
  onLibrary: () => void
  onJournal: () => void
}) {
  const zh = locale === 'zh'
  const entries = ids.map((id) => myths.find((m) => m.id === id)).filter((m): m is Myth => !!m)
  const records = entries.map((m) => beliefOn(day, m.id, journal))
  const firstOpen = records.findIndex((r) => !r)
  const [step, setStep] = useState(firstOpen < 0 ? entries.length : firstOpen)
  const everAnswered = journal.some((r) => r.kind === 'belief')
  const answeredCount = journal.filter((r) => r.kind === 'belief').length
  const current = entries[step]
  const done = step >= entries.length

  const dots = <div className="today-dots" role="group" aria-label={zh ? `今天 ${records.filter(Boolean).length}/${entries.length} 条` : `${records.filter(Boolean).length} of ${entries.length} today`}>
    {entries.map((m, i) => <button key={m.id} aria-current={i === step ? 'step' : undefined} data-done={!!records[i]} disabled={!records[i] && i !== firstOpen} onClick={() => setStep(i)} aria-label={zh ? `第 ${i + 1} 条` : `Card ${i + 1}`}><span /></button>)}
  </div>

  return <section className="tab-view today">
    <TabHeader kicker={dayLabel(day, locale)} title={zh ? '你信吗？' : 'Do you buy it?'} right={dots} />
    {!done && current ? <>
      <BeliefCard key={current.id} myth={current} locale={locale} record={records[step]} firstTime={!everAnswered} onAnswer={(s) => onAnswer(current.id, s)} onOpen={onOpen} onShare={onShare} />
      {records[step] && <div className="today-next">
        {answeredCount === 1 && <p className="quiet-note">{zh ? `每条都附出处。所有 ${total} 条随时可查，没有任何需要解锁的内容。` : `Every entry is sourced. All ${total} are open any time; nothing to unlock.`}</p>}
        <button className="primary-button" onClick={() => setStep(records.findIndex((r, i) => i > step && !r) >= 0 ? records.findIndex((r, i) => i > step && !r) : entries.length)}>
          {records.every(Boolean) ? (zh ? '收好今天的 3 条' : 'Done for today') : (zh ? '下一条 →' : 'Next →')}
        </button>
      </div>}
    </> : <div className="today-done">
      <p className="over-label">{zh ? '今天的 3 条已收好' : 'Today’s three are saved'}</p>
      <h2>{zh ? '明天还有新的。想多看，资料库随时开放。' : 'New ones tomorrow. The library is always open.'}</h2>
      <ul>{entries.map((m, i) => <li key={m.id}><button onClick={() => setStep(i)}>
        <span className="today-done-claim"><Strike on seed={i}>{m.belief}</Strike></span>
        <span className="today-done-truth">{m.truth}</span>
      </button></li>)}</ul>
      <div className="button-row">
        <button className="primary-button" onClick={onLibrary}>{zh ? '去资料库查一个说法' : 'Look something up'}</button>
        <button className="ghost-button" onClick={onJournal}>{zh ? '打开改观簿' : 'Open your journal'}</button>
      </div>
    </div>}
    {dueCount > 0 && <button className="today-review" onClick={onReview}>
      <span><strong>{zh ? '该回看了' : 'Time to revisit'}</strong><small>{zh ? `${dueCount} 条你改观过的事，还记得其实是怎样吗？` : `${dueCount} thing${dueCount > 1 ? 's' : ''} you changed your mind about. Still remember?`}</small></span>
      <span aria-hidden="true">→</span>
    </button>}
  </section>
}
