import { useState } from 'react'
import { categoryLabel, type Locale } from '../i18n'
import type { Myth } from '../types'
import { ConfidenceChip } from './BeliefCard'

/** 资料库里的「随便翻一条」：优先翻到没读过的；急救类不参加随机（板块里随时可读）。 */
export function DiscoveryTrail({ myths, read, locale, onOpen, onRead }: {
  myths: Myth[]; read: Set<string>; locale: Locale; onOpen: (id: string) => void; onRead: (id: string) => void
}) {
  const zh = locale === 'zh'
  const [id, setId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [visited, setVisited] = useState<Set<string>>(new Set())
  const entry = myths.find((m) => m.id === id)
  function draw() {
    const eligible = myths.filter((m) => m.category !== 'urgent' && m.id !== id)
    const fresh = eligible.filter((m) => !read.has(m.id) && !visited.has(m.id))
    const unseen = eligible.filter((m) => !visited.has(m.id))
    const pool = fresh.length ? fresh : unseen.length ? unseen : eligible
    const next = pool[Math.floor(Math.random() * pool.length)]
    if (!next) return
    setId(next.id); setRevealed(false); setVisited((previous) => new Set([...previous, next.id]))
  }
  return <section className="shelf trail" aria-labelledby="trail-title">
    <div className="shelf-head"><h2 id="trail-title">{zh ? '随便翻一条' : 'Surprise me'}</h2><button className="ghost-button small" onClick={draw}>{id ? (zh ? '再翻一条 ↻' : 'Another ↻') : (zh ? '翻一条' : 'Draw one')}</button></div>
    {entry ? <article className="trail-card" key={entry.id}>
      <img src={`/illu/${entry.id}.webp`} width="960" height="400" alt="" />
      <div>
        <p className="over-label">{zh ? '你以为' : 'You might think'} · {categoryLabel(entry.category, locale)}</p>
        <h3>{entry.belief}</h3>
        {revealed ? <><p className="trail-truth" aria-live="polite">{entry.truth}</p><div className="belief-meta"><ConfidenceChip confidence={entry.confidence} locale={locale} /><button className="link-button" onClick={() => onOpen(entry.id)}>{zh ? '解释和出处 ↗' : 'Explanation & sources ↗'}</button></div></>
          : <button className="primary-button small" onClick={() => { setRevealed(true); onRead(entry.id) }}>{zh ? '其实呢？' : 'Actually?'}</button>}
      </div>
    </article> : <p className="quiet-note">{zh ? '优先翻到你还没读过的。没有分数，也不用等明天。' : 'Unread entries come first. No scores, no waiting.'}</p>}
  </section>
}
