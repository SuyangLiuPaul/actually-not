import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CATEGORIES, type CategoryId, type Stakes } from './types'
import {
  STRINGS,
  categoryLabel,
  parsePath,
  pathFor,
  stakesMeta,
  type Locale,
  type T,
} from './i18n'
import { mythsFor } from './data/localized'
import { useReadProgress } from './hooks/useReadProgress'
import { MythCard } from './components/MythCard'
import { MythDetail } from './components/MythDetail'
import { Quiz } from './components/Quiz'

type Theme = 'light' | 'dark' | 'auto'

/**
 * 真实路径路由：/wet-hair 直接打开对应条目；英文版统一在 /en 前缀下
 *（/en、/en/quiz、/en/wet-hair）。
 * 预渲染（SSR）时没有 window，从构建期注入的全局变量读路径。
 * 旧的 #/xxx 深链由 index.html 里的内联脚本重写到路径，不会走到这里。
 */
function currentPath(): string {
  return typeof window !== 'undefined'
    ? window.location.pathname
    : ((globalThis as Record<string, unknown>).__PRERENDER_PATH__ as string | undefined) ?? '/'
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => parsePath(currentPath()).locale)
  const myths = mythsFor(locale)
  const t = STRINGS[locale]
  const [query, setQuery] = useState('')
  // ?c=urgent —— 给 PWA 的快捷方式用，也方便直接分享某一类
  const [cat, setCat] = useState<CategoryId | 'all'>(() => {
    if (typeof window === 'undefined') return 'all'
    const c = new URLSearchParams(window.location.search).get('c')
    return CATEGORIES.some((x) => x.id === c) ? (c as CategoryId) : 'all'
  })
  const [stakes, setStakes] = useState<Stakes | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(() => {
    const id = parsePath(currentPath()).id
    return mythsFor(parsePath(currentPath()).locale).some((m) => m.id === id) ? id : null
  })
  const [quizOpen, setQuizOpen] = useState(() => parsePath(currentPath()).id === 'quiz')
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

  // 浏览器前进 / 后退时跟着 URL 走
  useEffect(() => {
    const sync = () => {
      const { locale: loc, id } = parsePath(currentPath())
      setLocale(loc)
      setOpenId(mythsFor(loc).some((m) => m.id === id) ? id : null)
      setQuizOpen(id === 'quiz')
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  // PWA 快捷方式「随便看一条」：/?random=1（已有路径深链时让位）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.has('random') || parsePath(currentPath()).id) return
    const pool = mythsFor(parsePath(currentPath()).locale)
    const m = pool[Math.floor(Math.random() * pool.length)]
    params.delete('random')
    const qs = params.toString()
    history.replaceState('', document.title, `${pathFor(locale, m.id)}${qs ? `?${qs}` : ''}`)
    setOpenId(m.id)
  }, [])

  // 打开详情即算「看过」
  useEffect(() => {
    if (openId) markRead(openId)
  }, [openId, markRead])

  const open = useCallback(
    (id: string) => {
      history.pushState('', '', pathFor(locale, id))
      setOpenId(id)
    },
    [locale],
  )

  const close = useCallback(() => {
    const id = parsePath(currentPath()).id
    history.pushState('', '', `${pathFor(locale, '')}${window.location.search}`)
    setOpenId(null)
    // 焦点还给对应卡片，键盘用户不至于丢位置
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-myth-id="${id}"]`)?.focus()
    })
  }, [locale])

  const openQuiz = useCallback(() => {
    history.pushState('', '', pathFor(locale, 'quiz'))
    setOpenId(null)
    setQuizOpen(true)
  }, [locale])

  const closeQuiz = useCallback(() => {
    history.pushState('', '', `${pathFor(locale, '')}${window.location.search}`)
    setQuizOpen(false)
  }, [locale])

  // 搜索 + 筛选
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return myths.filter((m) => {
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
  }, [query, cat, stakes, myths])

  const openIndex = filtered.findIndex((m) => m.id === openId)
  const openMyth = openId ? (myths.find((m) => m.id === openId) ?? null) : null

  // 标题跟着当前条目 / 测验走（和预渲染页面的 <title> 同一格式）
  useEffect(() => {
    document.title = quizOpen
      ? t.quizTitle
      : openMyth
        ? t.mythTitle(openMyth.belief)
        : t.homeTitle
  }, [openMyth, quizOpen, t])

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
    const pool = filtered.length ? filtered : myths
    open(pool[Math.floor(Math.random() * pool.length)].id)
  }

  const riskyCount = myths.filter((m) => m.stakes === 'risky').length

  return (
    <div className="relative z-1 min-h-dvh">
      <a
        href="#content"
        className="sr-only rounded-lg px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
        style={{ background: 'var(--pen)', color: '#fff' }}
      >
        {t.skipToContent}
      </a>
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* ── 页头 ── */}
        <header className="pt-14 pb-10 sm:pt-20 sm:pb-14">
          <div className="mb-7 flex items-start justify-between gap-4">
            <span
              className="text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'var(--pen)' }}
            >
              {t.brand}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={pathFor(locale === 'en' ? 'zh' : 'en', openId ?? (quizOpen ? 'quiz' : ''))}
                aria-label={t.langToggleLabel}
                className="grid h-8 shrink-0 place-items-center rounded-lg border px-2.5 text-[13px] font-medium transition-colors"
                style={{
                  borderColor: 'var(--rule)',
                  color: 'var(--ink-soft)',
                  background: 'var(--paper-raised)',
                }}
              >
                {t.langToggle}
              </a>
              <ThemeToggle theme={theme} setTheme={setTheme} t={t} />
            </div>
          </div>

          <h1
            className="text-[2.75rem] leading-[1.08] font-bold tracking-tight sm:text-[4.25rem]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.siteName}
          </h1>

          <p
            className="mt-5 max-w-[46ch] text-[15px] leading-[1.85] sm:text-base"
            style={{ color: 'var(--ink-soft)' }}
          >
            {t.introLead}
            {t.introCountLead}
            <strong style={{ color: 'var(--ink)' }}>{t.introCountNum(myths.length)}</strong>
            {t.introTail}
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
              {t.randomOne}
            </button>
            <button
              onClick={openQuiz}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-transform active:scale-[0.97]"
              style={{
                borderColor: 'var(--rule-strong)',
                color: 'var(--ink-soft)',
                background: 'var(--paper-raised)',
              }}
            >
              {t.quizEntry}
            </button>
            <p className="text-[13px]" style={{ color: 'var(--ink-faint)' }}>
              {t.riskyNote(riskyCount)}
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
                placeholder={t.searchPlaceholder}
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
                  aria-label={t.clearSearch}
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
                {t.filterAll}
              </Chip>
              {CATEGORIES.map((c) => (
                <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
                  <span aria-hidden="true" className="mr-1">
                    {c.emoji}
                  </span>
                  {categoryLabel(c.id, locale)}
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
                  {stakesMeta(s, locale).label}
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
                {t.emptyResult(query)}
              </p>
              <p className="mt-2 text-[13px]" style={{ color: 'var(--ink-faint)' }}>
                {t.emptySubmitLead}
                <a
                  href="https://github.com/SuyangLiuPaul/actually-not/issues/new?template=new-entry.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted underline-offset-[3px]"
                >
                  {t.emptySubmit}
                </a>
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
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-[13px]" style={{ color: 'var(--ink-faint)' }}>
                {t.listStatus(filtered.length, readCount, myths.length)}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((m, i) => (
                  <MythCard
                    key={m.id}
                    myth={m}
                    index={i}
                    read={read.has(m.id)}
                    query={query}
                    locale={locale}
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
            <strong style={{ color: 'var(--ink-soft)' }}>{t.footerAboutTitle}</strong>
            {t.footerAbout}
          </p>
          <p className="mt-3 max-w-[62ch]">
            <strong style={{ color: 'var(--ink-soft)' }}>{t.footerMedicalTitle}</strong>
            {t.footerMedical}
          </p>
          <p className="mt-3 max-w-[62ch]">
            <strong style={{ color: 'var(--ink-soft)' }}>{t.disclaimerTitle}</strong>
            {t.disclaimer}
          </p>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{t.footerCorrection}</span>
            <a
              href="https://github.com/SuyangLiuPaul/actually-not/issues/new?template=new-entry.md"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-[3px]"
            >
              {t.footerSubmit}
            </a>
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

      {quizOpen && (
        <Quiz
          locale={locale}
          onClose={closeQuiz}
          onOpenMyth={(id) => {
            setQuizOpen(false)
            open(id)
          }}
        />
      )}

      {openMyth && (
        <MythDetail
          myth={openMyth}
          index={openIndex >= 0 ? openIndex : 0}
          read={read.has(openMyth.id)}
          locale={locale}
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
  t,
}: {
  theme: Theme
  setTheme: (t: Theme) => void
  t: T
}) {
  const next: Record<Theme, Theme> = { auto: 'light', light: 'dark', dark: 'auto' }
  const icon = { auto: '◐', light: '☀', dark: '☾' }[theme]
  const label = { auto: t.themeAuto, light: t.themeLight, dark: t.themeDark }[theme]

  return (
    <button
      onClick={() => setTheme(next[theme])}
      title={t.themeLabel(label)}
      aria-label={t.themeLabel(label)}
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
