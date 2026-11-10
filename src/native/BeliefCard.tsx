import { useEffect, useRef } from 'react'
import { Strike } from '../components/Strike'
import { categoryLabel, confidenceMeta, type Locale } from '../i18n'
import { isLive, publishLabel, videoFor, lengthLabel } from '../data/videos'
import type { Myth } from '../types'
import { STANCES, type BeliefRecord, type Stance } from './journal'
import { claimSize, responseFor, STANCE_LABEL } from './copy'

export function ConfidenceChip({ confidence, locale }: { confidence: Myth['confidence']; locale: Locale }) {
  const meta = confidenceMeta(confidence, locale)
  return <span className="conf-chip" data-tone={confidence} title={meta.hint}>{meta.label}</span>
}

/**
 * 每日「你信吗？」卡片：先表态，再看红笔划过、其实、证据强度和出处入口。
 * 没有分数；研究有限 / 尚有争议的条目不说对错。
 */
export function BeliefCard({ myth, locale, record, firstTime, onAnswer, onOpen, onShare }: {
  myth: Myth
  locale: Locale
  record?: BeliefRecord
  firstTime?: boolean
  onAnswer: (stance: Stance | null) => void
  onOpen: (id: string) => void
  onShare: (myth: Myth) => void
}) {
  const zh = locale === 'zh'
  const revealed = !!record
  const truthRef = useRef<HTMLDivElement>(null)
  const video = videoFor(myth.id)
  const answeredHere = useRef(false)
  useEffect(() => { if (revealed && answeredHere.current) truthRef.current?.focus({ preventScroll: true }) }, [revealed])

  return <article className="belief-card" data-state={revealed ? 'revealed' : 'ask'} aria-label={zh ? '今天的说法' : 'Today’s claim'}>
    <figure className="belief-art" aria-hidden={revealed}>
      <img src={`/illu/${myth.id}.webp`} width="960" height="400" alt="" fetchPriority="high" />
      <figcaption>{categoryLabel(myth.category, locale)}</figcaption>
    </figure>
    <div className="belief-body">
      <p className="over-label">{zh ? '你以为' : 'You might think'}{revealed && <span className="over-label-meta"> · {categoryLabel(myth.category, locale)}</span>}</p>
      <h2 className="belief-claim" data-size={claimSize(myth.belief, locale)}>
        <span className="sr-only">{zh ? '你以为：' : 'Claim: '}</span>
        <Strike key={revealed ? 'revealed' : 'ask'} on={revealed} seed={myth.id.length}>{myth.belief}</Strike>
      </h2>
      {!revealed ? <>
        <p className="belief-prompt">{firstTime ? (zh ? '先表个态，再看出处。' : 'Take a stance first, then see the sources.') : (zh ? '你怎么看？' : 'What do you think?')}</p>
        <div className="stance-list" role="group" aria-label={zh ? '你的看法' : 'Your view'}>
          {STANCES.map((s) => <button key={s} className="stance" onClick={() => { answeredHere.current = true; onAnswer(s) }}>{STANCE_LABEL[locale][s]}</button>)}
        </div>
        <button className="link-button belief-skip" onClick={() => { answeredHere.current = true; onAnswer(null) }}>{zh ? '直接看答案 →' : 'Just show me →'}</button>
      </> : <div className="belief-reveal" ref={truthRef} tabIndex={-1} aria-live="polite">
        <p className="over-label">{zh ? '其实' : 'Actually'}</p>
        <p className="belief-truth">{myth.truth}</p>
        <p className="belief-response">
          {record.stance && <span className="belief-stance">{zh ? '你的表态：' : 'You said: '}{STANCE_LABEL[locale][record.stance]}{zh ? '。' : '. '}</span>}
          {responseFor(locale, record.stance, myth.confidence)}
        </p>
        <div className="belief-meta">
          <ConfidenceChip confidence={myth.confidence} locale={locale} />
          {video && <button className="chip-button" onClick={() => onOpen(myth.id)}>{isLive(video) ? `▶ ${lengthLabel(video, locale)}` : (zh ? `动画 ${publishLabel(video, locale)}上线` : `Animation coming ${publishLabel(video, locale)}`)}</button>}
        </div>
        <div className="belief-actions">
          <button className="ghost-button" onClick={() => onOpen(myth.id)}>{zh ? `解释和出处 · ${myth.sources.length}` : `Sources · ${myth.sources.length}`}</button>
          <button className="ghost-button" onClick={() => onShare(myth)}>{zh ? '分享结论图' : 'Share image'}</button>
        </div>
      </div>}
    </div>
  </article>
}
