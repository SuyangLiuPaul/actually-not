import { useEffect, useRef, useState } from 'react'
import { mythsFor } from '../data/localized'
import { playRound, type PlayTopic } from '../data/play'
import { categoryLabel, type Locale } from '../i18n'

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

type Props = { locale: Locale; onOpen: (id: string) => void; onBrowse: () => void; onRead: (id: string) => void }

export function PlayDeck({ locale, onOpen, onBrowse, onRead }: Props) {
  const t = COPY[locale]
  const [topic, setTopic] = useState<PlayTopic>('mix')
  // 预渲染与首次水合保持相同；挂载后才读取当天和个人收藏。
  const [seed, setSeed] = useState(0)
  const [step, setStep] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [certainty, setCertainty] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [collectionOpen, setCollectionOpen] = useState(false)
  const focusRef = useRef<HTMLHeadingElement>(null)
  const interacted = useRef(false)
  const myths = mythsFor(locale)
  const questions = playRound(topic, seed)
  const q = questions[step]
  const myth = q ? myths.find((m) => m.id === q.id) : null

  useEffect(() => {
    setSeed(Math.floor(Date.now() / 86_400_000))
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
    setTopic(nextTopic)
    setSeed(nextSeed)
    setStep(0)
    setChoice(null)
    setCertainty(null)
    setRevealed(false)
  }

  function reveal() {
    if (!myth) return
    setRevealed(true)
    onRead(myth.id)
  }

  function save(id: string) {
    const next = new Set(saved)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSaved(next)
    try { localStorage.setItem(SAVED_KEY, JSON.stringify([...next])) } catch { /* 本次会话仍可收藏。 */ }
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
      <div className="play-heading"><h2>{t.title}</h2><p>{t.intro}</p></div>
      <div className="play-topics" aria-label={locale === 'zh' ? '选择玩法' : 'Choose a theme'}>
        {(['mix', 'quote', 'film', 'why'] as PlayTopic[]).map((id) => <button key={id} aria-pressed={topic === id} onClick={() => reset(id, seed)}>{t.topics[id]}</button>)}
      </div>
      {collectionOpen && <div className="play-collection"><h3>{t.collection}</h3>{saved.size ? <ul>{myths.filter((m) => saved.has(m.id)).map((m) => <li key={m.id}><button className="play-text-button" onClick={() => onOpen(m.id)}>{m.belief} ↗</button></li>)}</ul> : <p>{t.empty}</p>}<button className="play-text-button" onClick={() => setCollectionOpen(false)}>{t.close}</button></div>}
      <div className="play-stage">
        {myth && q ? <>
          <div className="play-art"><img src={`/illu/${myth.id}.webp`} width={960} height={400} alt="" fetchPriority="high" /><span className="play-art-label">{categoryLabel(myth.category, locale)}</span><div className="play-page-number" aria-hidden="true">0{step + 1}<span>/ 03</span></div></div>
          <div className="play-content">
            <div className="play-progress" aria-label={`${t.round} ${step + 1}/3`}>{questions.map((item, i) => <span key={item.id} data-current={i === step} data-done={i < step}>{i < step ? '✓' : i + 1}</span>)}</div>
            <h3 ref={focusRef} tabIndex={-1} className="play-question">{q.question[locale]}</h3>
            {!revealed ? <>
              <div className="play-answers">{q.choices[locale].map((answer, i) => <button key={answer} aria-pressed={choice === i} onClick={() => setChoice(i)}><span aria-hidden="true">{'ABC'[i]}</span>{answer}</button>)}</div>
              <div className="play-certainty"><p>{t.certainty}</p><div>{t.levels.map((label, i) => <button key={label} aria-pressed={certainty === i} onClick={() => setCertainty(i)}>{label}</button>)}</div></div>
              <div className="play-actions"><button className="play-text-button" onClick={() => { setChoice(null); setCertainty(null); reveal() }}>{t.skip}</button><button className="play-primary" disabled={choice === null} onClick={reveal}>{t.reveal} →</button></div>
            </> : <div className="play-reveal" aria-live="polite">
              <p className="play-feedback">{choice === null ? t.evidence : choice === q.answer ? t.supported : certainty === 2 ? t.sure : t.surprise}</p>
              <div className="play-finding"><span className="play-stamp">{t.strengths[myth.confidence]}</span><p>{myth.truth}</p></div>
              {myth.confidence !== 'strong' && <p className="play-boundary">{myth.confidence === 'limited' ? t.limited : t.debated}</p>}
              <details key={myth.id} className="play-sources"><summary>{t.sources} <span>{myth.sources.length}</span></summary><ul>{myth.sources.map((source, i) => <li key={i}>{source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a> : source.label}</li>)}</ul></details>
              <div className="play-detail-actions"><button className="play-text-button" onClick={() => onOpen(myth.id)}>{t.detail} ↗</button><button className="play-text-button" aria-pressed={saved.has(myth.id)} onClick={() => save(myth.id)}>{saved.has(myth.id) ? t.saved : t.save}</button></div>
              <div className="play-actions play-next"><span>{step + 1} / 3</span><button className="play-primary" onClick={advance}>{step === 2 ? t.finish : t.next} →</button></div>
            </div>}
          </div>
        </> : <div className="play-complete">
          <span className="play-complete-number" aria-hidden="true">03</span><p className="play-eyebrow">{t.end}</p><h3 ref={focusRef} tabIndex={-1}>{t.endTitle}</h3>
          <ul>{questions.map((item) => { const entry = myths.find((m) => m.id === item.id); return entry ? <li key={item.id}><button className="play-text-button" onClick={() => onOpen(item.id)}>{entry.truth} ↗</button><button className="play-text-button" aria-pressed={saved.has(item.id)} onClick={() => save(item.id)}>{saved.has(item.id) ? t.saved : t.save}</button></li> : null })}</ul>
          <div className="play-actions"><button className="play-primary" onClick={() => reset(topic, seed + 1)}>{t.again} →</button><button className="play-text-button" onClick={onBrowse}>{t.all} ↓</button></div>
        </div>}
      </div>
      <div className="play-bottom"><button className="play-text-button" onClick={onBrowse}>{t.all} · {myths.length} ↓</button><a href="/town/">{t.town} ↗<small>{t.townNote}</small></a></div>
    </section>
  )
}
