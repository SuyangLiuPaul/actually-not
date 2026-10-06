import { useState } from 'react'
import { categoryLabel, confidenceMeta, type Locale } from '../i18n'
import { CATEGORIES, type CategoryId, type Myth } from '../types'

export function DiscoveryTrail({ myths, read, locale, onOpen, onRead, onCategory }: {
  myths: Myth[]; read: Set<string>; locale: Locale; onOpen: (id: string) => void; onRead: (id: string) => void; onCategory: (id: CategoryId) => void
}) {
  const zh = locale === 'zh'
  const [id,setId] = useState<string|null>(null)
  const [revealed,setRevealed] = useState(false)
  const [visited,setVisited] = useState<Set<string>>(new Set())
  const entry = myths.find(m => m.id === id)
  function draw() {
    const eligible = myths.filter(m => m.category !== 'urgent' && m.id !== id)
    const fresh = eligible.filter(m => !read.has(m.id) && !visited.has(m.id))
    const unseen = eligible.filter(m => !visited.has(m.id))
    const pool = fresh.length ? fresh : unseen.length ? unseen : eligible
    const next = pool[Math.floor(Math.random()*pool.length)]
    if (!next) return
    setId(next.id);setRevealed(false);setVisited(previous => new Set([...previous,next.id]))
  }
  return <section className="app-trail" aria-labelledby="trail-title">
    <div className="app-trail-heading"><div><p className="play-eyebrow">{zh?'不限题库，去逛逛':'Explore beyond the quiz'}</p><h2 id="trail-title">{zh?'下一条，会让你意外吗？':'What will surprise you next?'}</h2></div><button className="play-primary" onClick={draw}>{id?(zh?'再翻一条 ↻':'Another discovery ↻'):(zh?'随便翻一条 ↗':'Surprise me ↗')}</button></div>
    {entry ? <article className="app-surprise" key={entry.id}>
      <img src={`/illu/${entry.id}.webp`} width="960" height="400" alt=""/>
      <div><p className="play-eyebrow">{categoryLabel(entry.category,locale)} · {confidenceMeta(entry.confidence,locale).label}</p><h3>{entry.belief}</h3>{revealed ? <><p className="app-surprise-truth" aria-live="polite">{entry.truth}</p><button className="play-text-button" onClick={()=>onOpen(entry.id)}>{zh?'读解释和出处 ↗':'Read the explanation and sources ↗'}</button></> : <button className="play-primary" onClick={()=>{setRevealed(true);onRead(entry.id)}}>{zh?'其实呢？ →':'Actually? →'}</button>}</div>
    </article> : <p className="app-trail-note">{zh?'优先翻到你还没读过的内容。没有分数，也不用等明天。':'Unseen entries come first. No scores, no waiting for tomorrow.'}</p>}
    <div className="app-worlds">{CATEGORIES.map((c,i)=>{const entries=myths.filter(m=>m.category===c.id);const count=entries.filter(m=>read.has(m.id)).length;return <button key={c.id} onClick={()=>onCategory(c.id)}><span className="app-world-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><strong>{categoryLabel(c.id,locale)} <span aria-hidden="true">↗</span></strong><small>{zh?`${entries.length} 条 · 已读 ${count}`:`${entries.length} entries · ${count} read`}</small><span className="app-world-meter" aria-hidden="true"><span style={{width:`${entries.length?count/entries.length*100:0}%`}}/></span></button>})}</div>
    <p className="app-experiment-note">{zh?'急救内容请从板块直接阅读，不参加随机翻牌。所有板块随时开放。':'Emergency entries are directly accessible in their category and excluded from random cards. Every category is always open.'}</p>
  </section>
}
