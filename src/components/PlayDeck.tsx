import { useEffect, useRef, useState } from 'react'
import { mythsFor } from '../data/localized'
import { playRound, type PlayTopic } from '../data/play'
import { categoryLabel, type Locale } from '../i18n'
import { PLAY_QUESTIONS, type PlayQuestion } from '../data/play'
import { resumeStep, type Discovery } from '../native/journal'
import { shareDiscovery, tapFeedback } from '../native/platform'

const SAVED_KEY = 'actually-not-saved-v1'
const COPY = {
  zh: {
    eyebrow: '给直觉一个小小的意外', title: '你确定吗？', intro: '先猜一下，再让出处说话。每次三条，随时可以直接看答案。',
    topics: { mix: '三次改观', quote: '谁说的？', film: '电影别当真', why: '为什么长这样' },
    round: '这一轮', certainty: '你有多确定？（可选）', levels: ['猜的', '有点把握', '非常确定'],
    reveal: '看看出处怎么说', skip: '直接看答案', supported: '这次，直觉有出处支持。', surprise: '原来，还有这一层。', sure: '刚才很确定，现在多了一条证据。',
    evidence: '目前证据支持', limited: '研究有限：这是对现有证据的判断，不是证明某句话绝不可能出现。', debated: '尚有争议：不同来源仍有分歧，阅读完整条目了解边界。',
    strengths: { strong: '出处明确', limited: '研究有限', debated: '尚有争议' }, next: '下一次改观', finish: '收好这次发现',
    sources: '展开出处', detail: '读完整条目', save: '收藏这次发现', saved: '已收藏 · 再点取消', collection: '我的改观收藏', empty: '还没有收藏。遇到让你意外的一条，就把它收起来。',
    endTitle: '给想法留一点余地。', end: '三条出处，三次重新想一想。', again: '再来一轮', all: '查看全部内容', town: '去小镇动手试试', townNote: '换一种发现方式：操作、观察、比较。', close: '收起收藏',
  },
  en: {
    eyebrow: 'A little surprise for your intuition', title: 'Are you sure?', intro: 'Take a guess, then let the sources speak. Three at a time; you can skip straight to the evidence.',
    topics: { mix: 'Three discoveries', quote: 'Who said it?', film: 'Movie myths', why: 'Why that shape?' },
    round: 'This round', certainty: 'How sure are you? (optional)', levels: ['Guessing', 'Fairly sure', 'Very sure'],
    reveal: 'Let the sources speak', skip: 'Show me the answer', supported: 'Your intuition has a source this time.', surprise: 'There is more to the story.', sure: 'You were sure. Now there is another piece of evidence.',
    evidence: 'What the evidence supports', limited: 'Limited evidence: this is a judgment about available sources, not proof that a line could never have been written.', debated: 'Debated: sources disagree. Read the full entry for the limits.',
    strengths: { strong: 'Well supported', limited: 'Limited evidence', debated: 'Debated' }, next: 'Next discovery', finish: 'Keep these discoveries',
    sources: 'Explore the sources', detail: 'Read the full entry', save: 'Save this discovery', saved: 'Saved · tap to remove', collection: 'My saved discoveries', empty: 'Nothing saved yet. Keep a discovery when it surprises you.',
    endTitle: 'Leave room to change your mind.', end: 'Three sources. Three chances to think again.', again: 'Another round', all: 'Explore every entry', town: 'Try the discovery town', townNote: 'Another way to discover: change things, observe, compare.', close: 'Close saved discoveries',
  },
}

type Props = { locale: Locale; onOpen: (id: string) => void; onBrowse: () => void; onRead: (id: string) => void; initialRound?: PlayQuestion[]; onDiscovery?: (record: Discovery) => void; resumeRecords?: Discovery[]; reviewMode?: boolean }

export function PlayDeck({ locale, onOpen, onBrowse, onRead, initialRound, onDiscovery, resumeRecords = [], reviewMode = false }: Props) {
  const t = COPY[locale]
  const [topic, setTopic] = useState<PlayTopic>('mix')
  // 预渲染与首次水合保持相同；挂载后才读取当天和个人收藏。
  const [seed, setSeed] = useState(0)
  const [firstRound, setFirstRound] = useState(true)
  const [challenge, setChallenge] = useState<PlayQuestion[] | null>(null)
  const [shareNotice, setShareNotice] = useState('')
  const [step, setStep] = useState(() => initialRound ? resumeStep(initialRound, resumeRecords) : 0)
  const [results, setResults] = useState<Discovery[]>(resumeRecords)
  const [choice, setChoice] = useState<number | null>(null)
  const [certainty, setCertainty] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [collectionOpen, setCollectionOpen] = useState(false)
  const focusRef = useRef<HTMLHeadingElement>(null)
  const interacted = useRef(false)
  const myths = mythsFor(locale)
  const questions = reviewMode && initialRound ? initialRound : firstRound && topic === 'mix' ? (challenge ?? initialRound ?? playRound(topic, seed)) : playRound(topic, seed)
  const q = questions[step]
  const myth = q ? myths.find((m) => m.id === q.id) : null

  useEffect(() => {
    setSeed(Math.floor(Date.now() / 86_400_000))
    const params = new URLSearchParams(window.location.search)
    const ids = (params.get('challenge') ?? '').split(',')
    if (ids.length === 3 && new Set(ids).size === 3) {
      const round = ids.map(id => PLAY_QUESTIONS.find(q => q.id === id))
      if (round.every((q): q is PlayQuestion => !!q)) setChallenge(round)
    }
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]')
      if (Array.isArray(raw)) {
        const known = new Set(mythsFor('zh').map((m) => m.id))
        setSaved(new Set(raw.filter((id): id is string => typeof id === 'string' && known.has(id))))
      }
    } catch { /* 收藏失败不影响阅读或游玩。 */ }
  }, [])

  useEffect(() => {
    if (interacted.current) focusRef.current?.focus()
  }, [step, topic, seed])

  function reset(nextTopic: PlayTopic, nextSeed: number) {
    interacted.current = true
    setFirstRound(false)
    setTopic(nextTopic)
    setSeed(nextSeed)
    setStep(0)
    setChoice(null)
    setCertainty(null)
    setRevealed(false)
    setResults([])
  }

  function reveal(skip = false) {
    if (!myth) return
    const recordedChoice = skip ? null : choice
    const recordedCertainty = skip ? null : certainty
    if (skip) { setChoice(null); setCertainty(null) }
    setRevealed(true)
    onRead(myth.id)
    void tapFeedback()
    const record: Discovery = { id: myth.id, shownAt: new Date().toISOString(), choice: recordedChoice === null ? null : { zh: q.choices.zh[recordedChoice], en: q.choices.en[recordedChoice] }, answer: { zh: q.choices.zh[q.answer], en: q.choices.en[q.answer] }, certainty: recordedCertainty, correct: recordedChoice === null ? null : recordedChoice === q.answer }
    setResults(previous => [...previous.filter(r => r.id !== record.id), record])
    onDiscovery?.(record)
  }

  function save(id: string) {
    const next = new Set(saved)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSaved(next)
    try { localStorage.setItem(SAVED_KEY, JSON.stringify([...next])) } catch { /* 本次会话仍可收藏。 */ }
    window.dispatchEvent(new Event('actually-not-saved'))
  }

  async function shareRound() {
    const params = new URLSearchParams({ challenge: questions.map(q => q.id).join(',') })
    const result = await shareDiscovery(locale === 'zh' ? '三次改观 · 其实不是' : 'Three discoveries · Actually, Not', locale === 'zh' ? '这三条，你怎么看？先猜，再让出处说话。' : 'What do you think about these three? Guess, then let the sources speak.', `https://actually-not.com/${locale === 'en' ? 'en/' : ''}?${params}`)
    setShareNotice(result === 'copied' ? (locale === 'zh' ? '挑战链接已复制。' : 'Challenge link copied.') : '')
  }

  function advance() {
    interacted.current = true
    setStep((s) => s + 1)
    setChoice(null)
    setCertainty(null)
    setRevealed(false)
  }

  return (
    <section className="play" aria-label={t.title}>
      <div className="play-topline"><p className="play-eyebrow">{t.eyebrow}</p><button className="play-text-button" aria-expanded={collectionOpen} onClick={() => setCollectionOpen(!collectionOpen)}>{t.collection} <span>{saved.size}</span></button></div>
      <div className="play-heading"><h2>{reviewMode ? (locale === 'zh' ? '这次，再想想。' : 'Think again.') : t.title}</h2><p>{reviewMode ? (locale === 'zh' ? '把以前的发现重新想一次。仍然可以随时看答案。' : 'Revisit your earlier discoveries. You can still go straight to the answer.') : t.intro}</p></div>
      {!reviewMode && <div className="play-topics" aria-label={locale === 'zh' ? '选择玩法' : 'Choose a theme'}>
        {(['mix', 'quote', 'film', 'why'] as PlayTopic[]).map((id) => <button key={id} aria-pressed={topic === id} onClick={() => reset(id, seed)}>{t.topics[id]}</button>)}
      </div>}
      {collectionOpen && <div className="play-collection"><h3>{t.collection}</h3>{saved.size ? <ul>{myths.filter((m) => saved.has(m.id)).map((m) => <li key={m.id}><button className="play-text-button" onClick={() => onOpen(m.id)}>{m.belief} ↗</button></li>)}</ul> : <p>{t.empty}</p>}<button className="play-text-button" onClick={() => setCollectionOpen(false)}>{t.close}</button></div>}
      <div className="play-stage">
        {myth && q ? <>
          <div className="play-art"><img src={`/illu/${myth.id}.webp`} width={960} height={400} alt="" fetchPriority="high" /><span className="play-art-label">{categoryLabel(myth.category, locale)}</span><div className="play-page-number" aria-hidden="true">0{step + 1}<span>/ {String(questions.length).padStart(2,'0')}</span></div></div>
          <div className="play-content">
            <div className="play-progress" aria-label={`${t.round} ${step + 1}/${questions.length}`}>{questions.map((item, i) => <span key={item.id} data-current={i === step} data-done={i < step}>{i < step ? '✓' : i + 1}</span>)}</div>
            <h3 ref={focusRef} tabIndex={-1} className="play-question">{q.question[locale]}</h3>
            {!revealed ? <>
              <div className="play-answers">{q.choices[locale].map((answer, i) => <button key={answer} aria-pressed={choice === i} onClick={() => setChoice(i)}><span aria-hidden="true">{'ABC'[i]}</span>{answer}</button>)}</div>
              <div className="play-certainty"><p>{t.certainty}</p><div>{t.levels.map((label, i) => <button key={label} aria-pressed={certainty === i} onClick={() => setCertainty(i)}>{label}</button>)}</div></div>
              <div className="play-actions"><button className="play-text-button" onClick={() => reveal(true)}>{t.skip}</button><button className="play-primary" disabled={choice === null} onClick={() => reveal()}>{t.reveal} →</button></div>
            </> : <div className="play-reveal" aria-live="polite">
              <p className="play-feedback">{choice === null ? t.evidence : choice === q.answer ? t.supported : certainty === 2 ? t.sure : t.surprise}</p>
              <div className="play-finding"><span className="play-stamp">{t.strengths[myth.confidence]}</span><p>{myth.truth}</p></div>
              {myth.confidence !== 'strong' && <p className="play-boundary">{myth.confidence === 'limited' ? t.limited : t.debated}</p>}
              <details key={myth.id} className="play-sources"><summary>{t.sources} <span>{myth.sources.length}</span></summary><ul>{myth.sources.map((source, i) => <li key={i}>{source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a> : source.label}</li>)}</ul></details>
              <div className="play-detail-actions"><button className="play-text-button" onClick={() => onOpen(myth.id)}>{t.detail} ↗</button><button className="play-text-button" aria-pressed={saved.has(myth.id)} onClick={() => save(myth.id)}>{saved.has(myth.id) ? t.saved : t.save}</button></div>
              <div className="play-actions play-next"><span>{step + 1} / {questions.length}</span><button className="play-primary" onClick={advance}>{step === questions.length - 1 ? t.finish : t.next} →</button></div>
            </div>}
          </div>
        </> : <div className="play-complete">
          <span className="play-complete-number" aria-hidden="true">{String(questions.length).padStart(2,'0')}</span><p className="play-eyebrow">{locale === 'zh' ? '这一轮，发现已收好' : 'Your discoveries are saved'}</p><h3 ref={focusRef} tabIndex={-1}>{t.endTitle}</h3>
          <p className="play-round-result">{locale === 'zh' ? `${questions.length} 条发现 · ${questions.filter(q => results.some(r => r.id === q.id && r.correct === true)).length} 次直觉有依据 · ${questions.filter(q => results.some(r => r.id === q.id && r.correct === false)).length} 次改观` : `${questions.length} discoveries · ${questions.filter(q => results.some(r => r.id === q.id && r.correct === true)).length} supported guesses · ${questions.filter(q => results.some(r => r.id === q.id && r.correct === false)).length} new perspectives`}</p>
          <ul>{questions.map((item) => { const entry = myths.find((m) => m.id === item.id); return entry ? <li key={item.id}><button className="play-text-button" onClick={() => onOpen(item.id)}>{entry.truth} ↗</button><button className="play-text-button" aria-pressed={saved.has(item.id)} onClick={() => save(item.id)}>{saved.has(item.id) ? t.saved : t.save}</button></li> : null })}</ul>
          <div className="play-actions"><button className="play-primary" onClick={() => reset(topic, seed + 1)}>{t.again} →</button><button className="play-text-button" onClick={onBrowse}>{t.all} ↓</button></div>
        </div>}
      </div>
      {!reviewMode && <div className="play-share"><button className="play-text-button" onClick={() => void shareRound()}>{locale === 'zh' ? '这三条，邀请朋友也猜猜 ↗' : 'Invite a friend to guess these three ↗'}</button><span role="status">{shareNotice}</span></div>}
      <div className="play-bottom"><button className="play-text-button" onClick={onBrowse}>{t.all} · {myths.length} ↓</button><a href="/town/">{t.town} ↗<small>{t.townNote}</small></a></div>
    </section>
  )
}
