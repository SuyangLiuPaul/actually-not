import { useMemo, useRef, useState } from 'react'
import { categoryLabel, expandQuery, FEEDBACK_EMAIL, type Locale } from '../i18n'
import { CATEGORIES, type CategoryId, type Myth } from '../types'
import { MythCard } from '../components/MythCard'
import { PlayDeck } from '../components/PlayDeck'
import type { Discovery } from './journal'
import { DiscoveryTrail } from './DiscoveryTrail'
import { Experiments } from './Experiments'
import { VideoShelf } from './VideoShelf'
import { TabHeader } from './TabHeader'

const RECENT_KEY = 'app-recent-searches'
function loadRecent(): string[] {
  try { const v: unknown = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]'); return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, 6) : [] } catch { return [] }
}

export type LibraryFilter = { category: CategoryId | 'all'; nonce: number }

/**
 * 资料库：搜索在最上面（「听到一个说法？」），没在搜时是板块、随便翻、视频、动手实验和挑战题。
 * 全部内容随时可读，没有锁。
 */
export function LibraryView({ myths, locale, read, readCount, saved, initial, onOpen, onRead, onQuiz }: {
  myths: Myth[]
  locale: Locale
  read: Set<string>
  readCount: number
  saved: Set<string>
  initial: LibraryFilter
  onOpen: (id: string) => void
  onRead: (id: string) => void
  onQuiz: (record: Discovery) => void
}) {
  const zh = locale === 'zh'
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | 'all'>(initial.category)
  const [onlyRisky, setOnlyRisky] = useState(false)
  const [onlySaved, setOnlySaved] = useState(false)
  const [recent, setRecent] = useState(loadRecent)
  const inputRef = useRef<HTMLInputElement>(null)
  const searching = query.trim() !== '' || category !== 'all' || onlyRisky || onlySaved
  const filtered = useMemo(() => {
    const terms = expandQuery(query.trim().toLowerCase())
    return myths.filter((m) => (category === 'all' || m.category === category) && (!onlyRisky || m.stakes === 'risky') && (!onlySaved || saved.has(m.id)) && (!query.trim() || terms.some((term) => `${m.belief}\n${m.truth}\n${m.detail}\n${m.origin}`.toLowerCase().includes(term))))
  }, [myths, category, onlyRisky, onlySaved, saved, query])

  function remember(q = query) {
    const term = q.trim()
    if (!term) return
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 6)
    setRecent(next)
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)) } catch { /* 最近搜索只是方便，不影响查询 */ }
  }
  function clear() { setQuery(''); setCategory('all'); setOnlyRisky(false); setOnlySaved(false) }
  function openResult(id: string) { remember(); onOpen(id) }

  return <section className="tab-view library">
    <TabHeader kicker={zh ? `${myths.length} 条 · 每条附出处 · 无需解锁` : `${myths.length} entries · all sourced · nothing locked`} title={zh ? '资料库' : 'Library'} />
    <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); remember(); inputRef.current?.blur() }}>
      <label htmlFor="library-search" className="search-label">{zh ? '听到一个说法？搜一下' : 'Heard a claim? Look it up'}</label>
      <div className="search-box">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 20 20" /></svg>
        <input ref={inputRef} id="library-search" type="search" enterKeyHint="search" autoComplete="off" placeholder={zh ? '比如：隔夜菜、鲁迅、消音器' : 'e.g. knuckles, Einstein, quicksand'} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {!query && recent.length > 0 && <div className="recent" aria-label={zh ? '最近搜索' : 'Recent searches'}>
        {recent.map((r) => <button type="button" key={r} className="chip-button" onClick={() => setQuery(r)}>{r}</button>)}
        <button type="button" className="link-button" onClick={() => { setRecent([]); try { localStorage.removeItem(RECENT_KEY) } catch { /* 无所谓 */ } }}>{zh ? '清除' : 'Clear'}</button>
      </div>}
    </form>

    {searching ? <>
      <div className="filter-row" aria-label={zh ? '筛选' : 'Filters'}>
        <div className="chip-scroll">
          <button className="chip-button" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>{zh ? '全部板块' : 'All'}</button>
          {CATEGORIES.map((c) => <button key={c.id} className="chip-button" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>{categoryLabel(c.id, locale)}</button>)}
        </div>
        <div className="filter-toggles">
          <label><input type="checkbox" checked={onlyRisky} onChange={(e) => setOnlyRisky(e.target.checked)} />{zh ? '照做可能有害' : 'Potentially harmful'}</label>
          <label><input type="checkbox" checked={onlySaved} onChange={(e) => setOnlySaved(e.target.checked)} />{zh ? '我的收藏' : 'Saved'}</label>
          <button className="link-button" onClick={clear}>{zh ? '清除' : 'Clear'}</button>
        </div>
      </div>
      <p className="result-count" aria-live="polite">{zh ? `${filtered.length} 条 · 已读 ${readCount}/${myths.length}` : `${filtered.length} entries · read ${readCount}/${myths.length}`}</p>
      {!filtered.length && <div className="empty">
        <p>{zh ? '这条还没收录。我们只收找得到可靠出处的说法。' : 'Not in the library yet. We only include claims we can source reliably.'}</p>
        <div className="button-row"><button className="ghost-button" onClick={() => { setQuery(''); inputRef.current?.focus() }}>{zh ? '换个关键词' : 'Try another word'}</button><a className="ghost-button" href={`mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(zh ? `建议收录：${query}` : `Suggestion: ${query}`)}`}>{zh ? '告诉我们这个说法' : 'Suggest this claim'}</a></div>
      </div>}
      <div className="card-list">{filtered.map((m, i) => <MythCard key={m.id} myth={m} index={i} locale={locale} read={read.has(m.id)} query={query} onOpen={() => openResult(m.id)} />)}</div>
    </> : <>
      <section className="shelf" aria-labelledby="cat-title">
        <div className="shelf-head"><h2 id="cat-title">{zh ? '板块' : 'Categories'}</h2><span>{zh ? `已读 ${readCount}/${myths.length}` : `${readCount}/${myths.length} read`}</span></div>
        <div className="category-grid">{CATEGORIES.map((c) => {
          const entries = myths.filter((m) => m.category === c.id)
          const count = entries.filter((m) => read.has(m.id)).length
          return <button key={c.id} onClick={() => setCategory(c.id)}>
            <strong>{categoryLabel(c.id, locale)}</strong>
            <small>{zh ? `${entries.length} 条 · 已读 ${count}` : `${entries.length} · ${count} read`}</small>
            <span className="meter" aria-hidden="true"><span style={{ width: `${entries.length ? (count / entries.length) * 100 : 0}%` }} /></span>
          </button>
        })}</div>
      </section>
      <DiscoveryTrail myths={myths} read={read} locale={locale} onOpen={onOpen} onRead={onRead} />
      <VideoShelf myths={myths} locale={locale} onOpen={onOpen} />
      <details className="shelf fold">
        <summary><span><strong>{zh ? '动手试试' : 'Try it yourself'}</strong><small>{zh ? '转一转、折一折，让眼睛验证 · 2 个实验' : 'Rotate, fold, see for yourself · 2 experiments'}</small></span></summary>
        <Experiments locale={locale} onOpen={onOpen} />
      </details>
      <details className="shelf fold">
        <summary><span><strong>{zh ? '挑战题' : 'Challenge rounds'}</strong><small>{zh ? '10 道手写选择题：名言、电影、物件原理' : '10 hand-written questions: quotes, films, why things look that way'}</small></span></summary>
        <PlayDeck key={locale} locale={locale} onOpen={onOpen} onBrowse={clear} onRead={onRead} onDiscovery={onQuiz} />
      </details>
    </>}
  </section>
}
