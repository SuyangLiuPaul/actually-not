import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MYTHS } from './data/myths'
import { CATEGORIES, STAKES_META, type CategoryId, type Stakes } from './types'
import { useReadProgress } from './hooks/useReadProgress'
import { MythCard } from './components/MythCard'
import { MythDetail } from './components/MythDetail'

type Theme = 'light' | 'dark' | 'auto'

export default function App() {
  const [query, setQuery] = useState('')
  // ?c=urgent —— 给 PWA 的快捷方式用，也方便直接分享某一类
  const [cat, setCat] = useState<CategoryId | 'all'>(() => {
    const c = new URLSearchParams(window.location.search).get('c')
    return CATEGORIES.some((x) => x.id === c) ? (c as CategoryId) : 'all'
  })
  const [stakes, setStakes] = useState<Stakes | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [theme, setTheme] = useState<Theme>('auto')
  const searchRef = useRef<HTMLInputElement>(null)
  const { read, markRead, toggleRead, readCount } = useReadProgress()

  // 主题
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'auto') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // 用 hash 做深链，方便把某一条直接发给别人
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.replace(/^#\/?/, '')
      setOpenId(MYTHS.some((m) => m.id === id) ? id : null)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  // PWA 快捷方式「随便看一条」：/?random=1（已有 hash 深链时让位）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.has('random') || window.location.hash) return
    const m = MYTHS[Math.floor(Math.random() * MYTHS.length)]
    params.delete('random')
    const qs = params.toString()
    const base = window.location.pathname + (qs ? `?${qs}` : '')
    history.replaceState('', document.title, `${base}#/${m.id}`)
    setOpenId(m.id)
  }, [])

  // 打开详情即算「看过」
  useEffect(() => {
    if (openId) markRead(openId)
  }, [openId, markRead])

  const open = useCallback((id: string) => {
    window.location.hash = `/${id}`
  }, [])

  const close = useCallback(() => {
    const id = window.location.hash.replace(/^#\/?/, '')
    history.pushState('', document.title, window.location.pathname + window.location.search)
    setOpenId(null)
    // 焦点还给对应卡片，键盘用户不至于丢位置
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-myth-id="${id}"]`)?.focus()
    })
  }, [])

  // 搜索 + 筛选
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MYTHS.filter((m) => {
      if (cat !== 'all' && m.category !== cat) return false
      if (stakes !== 'all' && m.stakes !== stakes) return false
      if (!q) return true
      return (
        m.belief.toLowerCase().includes(q) ||
        m.truth.toLowerCase().includes(q) ||
        m.detail.toLowerCase().includes(q) ||
        m.origin.toLowerCase().includes(q) ||
        m.instead.toLowerCase().includes(q)
      )
    })
  }, [query, cat, stakes])

  const openIndex = filtered.findIndex((m) => m.id === openId)
  const openMyth = openId ? (MYTHS.find((m) => m.id === openId) ?? null) : null

  // 「/」聚焦搜索框
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !openId) {
        const el = document.activeElement
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openId])

  const randomOne = () => {
    const pool = filtered.length ? filtered : MYTHS
    open(pool[Math.floor(Math.random() * pool.length)].id)
  }

  const riskyCount = MYTHS.filter((m) => m.stakes === 'risky').length

  return (
    <div className="relative z-1 min-h-dvh">
      <a
        href="#content"
        className="sr-only rounded-lg px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
        style={{ background: 'var(--pen)', color: '#fff' }}
      >
        跳到正文
      </a>
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* ── 页头 ── */}
        <header className="pt-14 pb-10 sm:pt-20 sm:pb-14">
          <div className="mb-7 flex items-start justify-between gap-4">
            <span
              className="text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'var(--pen)' }}
            >
              常识核对表
            </span>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>

          <h1
            className="text-[2.75rem] leading-[1.08] font-bold tracking-tight sm:text-[4.25rem]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            其实不是
          </h1>

          <p
            className="mt-5 max-w-[46ch] text-[15px] leading-[1.85] sm:text-base"
            style={{ color: 'var(--ink-soft)' }}
          >
            早上不吃饭伤身、洗完头不吹干有湿气、骨头汤补钙——
            有些说法听起来天经地义，讲了几十年，但证据并不支持。
            这里收了 <strong style={{ color: 'var(--ink)' }}>{MYTHS.length} 条</strong>
            ，每条都写清楚了：真相是什么、这个说法当初怎么传开的、以及那到底该怎么做。
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={randomOne}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-transform active:scale-[0.97]"
              style={{ background: 'var(--pen)', color: '#fff' }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 4h3l6 8h3M2 12h3l1.5-2M14 12l-2-1.5M14 12l-2 1.5M11.5 5.5L14 4l-2-1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              随便看一条
            </button>
            <p className="text-[13px]" style={{ color: 'var(--ink-faint)' }}>
              其中 {riskyCount} 条照做可能有害
            </p>
          </div>
        </header>

        {/* ── 筛选 ── */}
        <div
          className="sticky top-0 z-30 -mx-5 mb-8 border-y px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8"
          style={{
            borderColor: 'var(--rule)',
            background: 'color-mix(in srgb, var(--paper) 86%, transparent)',
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="relative">
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
                style={{ color: 'var(--ink-faint)' }}
              >
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M10.5 10.5L14 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜一个说法，比如「感冒」「补钙」「减肥」"
                className="w-full rounded-lg border py-2.5 pr-9 pl-9 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--paper-raised)',
                  borderColor: 'var(--rule)',
                  color: 'var(--ink)',
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="清空搜索"
                  className="absolute top-1/2 right-2.5 grid h-6 w-6 -translate-y-1/2 place-items-center rounded"
                  style={{ color: 'var(--ink-faint)' }}
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 4l8 8M12 4l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5">
              <Chip active={cat === 'all'} onClick={() => setCat('all')}>
                全部
              </Chip>
              {CATEGORIES.map((c) => (
                <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
                  <span aria-hidden="true" className="mr-1">
                    {c.emoji}
                  </span>
                  {c.label}
                </Chip>
              ))}
              <span
                className="mx-1 w-px shrink-0 self-stretch"
                style={{ background: 'var(--rule)' }}
                aria-hidden="true"
              />
              {(['risky', 'wasteful', 'harmless'] as Stakes[]).map((s) => (
                <Chip
                  key={s}
                  active={stakes === s}
                  onClick={() => setStakes(stakes === s ? 'all' : s)}
                  tone={s}
                >
                  {STAKES_META[s].label}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* ── 卡片 ── */}
        <main id="content" className="pb-16">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-base" style={{ color: 'var(--ink-soft)' }}>
                没找到「{query}」相关的条目。
              </p>
              <button
                onClick={() => {
                  setQuery('')
                  setCat('all')
                  setStakes('all')
                }}
                className="mt-3 text-sm underline underline-offset-4"
                style={{ color: 'var(--pen)' }}
              >
                清除筛选
              </button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-[13px]" style={{ color: 'var(--ink-faint)' }}>
                {filtered.length} 条 · 已读 {readCount}/{MYTHS.length}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((m, i) => (
                  <MythCard
                    key={m.id}
                    myth={m}
                    index={i}
                    read={read.has(m.id)}
                    query={query}
                    onOpen={() => open(m.id)}
                  />
                ))}
              </div>
            </>
          )}
        </main>

        {/* ── 页脚 ── */}
        <footer
          className="border-t pt-8 pb-16 text-[13px] leading-[1.8]"
          style={{ borderColor: 'var(--rule)', color: 'var(--ink-faint)' }}
        >
          <p className="max-w-[62ch]">
            <strong style={{ color: 'var(--ink-soft)' }}>关于这些结论。</strong>
            每条都附了出处，多数来自系统综述、随机对照试验或卫生机构的公开指南。
            凡是「证据不足以支持」而不是「已被推翻」的，正文里都写明了区别；
            有争议或有例外的地方也尽量留了余地——因为把一个过度简化的说法
            换成另一个过度简化的说法，并没有变好。
          </p>
          <p className="mt-3 max-w-[62ch]">
            <strong style={{ color: 'var(--ink-soft)' }}>这不是医疗建议。</strong>
            这里讲的是人群层面的一般规律，落到具体的人身上未必适用。
            身体不舒服请找医生，别拿网页当诊断。
          </p>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>发现哪条写错了？欢迎提 issue 或 PR。</span>
            <a
              href="https://github.com/SuyangLiuPaul/actually-not"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-[3px]"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>

      {openMyth && (
        <MythDetail
          myth={openMyth}
          index={openIndex >= 0 ? openIndex : 0}
          read={read.has(openMyth.id)}
          onClose={close}
          onPrev={openIndex > 0 ? () => open(filtered[openIndex - 1].id) : undefined}
          onNext={
            openIndex >= 0 && openIndex < filtered.length - 1
              ? () => open(filtered[openIndex + 1].id)
              : undefined
          }
          onToggleRead={() => toggleRead(openMyth.id)}
          onOpenMyth={open}
        />
      )}
    </div>
  )
}

function Chip({
  children,
  active,
  onClick,
  tone,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  tone?: Stakes
}) {
  const accent =
    tone === 'risky'
      ? 'var(--pen)'
      : tone === 'wasteful'
        ? 'var(--amber)'
        : tone === 'harmless'
          ? 'var(--slate)'
          : 'var(--ink)'

  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-full border px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors"
      style={{
        borderColor: active ? accent : 'var(--rule)',
        background: active ? accent : 'var(--paper-raised)',
        color: active ? 'var(--paper-raised)' : 'var(--ink-soft)',
      }}
    >
      {children}
    </button>
  )
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme
  setTheme: (t: Theme) => void
}) {
  const next: Record<Theme, Theme> = { auto: 'light', light: 'dark', dark: 'auto' }
  const icon = { auto: '◐', light: '☀', dark: '☾' }[theme]
  const label = { auto: '跟随系统', light: '浅色', dark: '深色' }[theme]

  return (
    <button
      onClick={() => setTheme(next[theme])}
      title={`外观：${label}（点击切换）`}
      aria-label={`外观：${label}，点击切换`}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-sm transition-colors"
      style={{
        borderColor: 'var(--rule)',
        color: 'var(--ink-soft)',
        background: 'var(--paper-raised)',
      }}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  )
}
