import { useState } from 'react'
import { Strike } from './Strike'
import { categoryLabel, catEmoji, stakesMeta, STRINGS, type Locale } from '../i18n'
import type { Myth } from '../types'

/** 把搜索词在文本里标出来 */
export function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim().toLowerCase()
  if (!needle) return <>{text}</>
  const lower = text.toLowerCase()
  const parts: React.ReactNode[] = []
  let i = 0
  while (i < text.length) {
    const j = lower.indexOf(needle, i)
    if (j === -1) {
      parts.push(text.slice(i))
      break
    }
    if (j > i) parts.push(text.slice(i, j))
    parts.push(
      <mark
        key={j}
        className="rounded-[3px] px-px"
        style={{ background: 'var(--amber-soft)', color: 'var(--ink)' }}
      >
        {text.slice(j, j + needle.length)}
      </mark>,
    )
    i = j + needle.length
  }
  return <>{parts}</>
}

export function MythCard({
  myth,
  index,
  read = false,
  query = '',
  locale,
  onOpen,
}: {
  myth: Myth
  index: number
  read?: boolean
  query?: string
  locale: Locale
  onOpen: () => void
}) {
  const [hover, setHover] = useState(false)
  const t = STRINGS[locale]
  const catLabel = categoryLabel(myth.category, locale)
  const stakes = stakesMeta(myth.stakes, locale)

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      data-myth-id={myth.id}
      className="group relative flex w-full flex-col gap-4 rounded-xl border p-5 text-left transition-all duration-200 sm:p-6"
      style={{
        background: 'var(--paper-raised)',
        borderColor: hover ? 'var(--rule-strong)' : 'var(--rule)',
        boxShadow: hover ? 'var(--shadow-lift)' : 'var(--shadow)',
        transform: hover ? 'translateY(-3px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide"
          style={{ color: 'var(--ink-faint)' }}
        >
          <span aria-hidden="true">{catEmoji(myth.category)}</span>
          {catLabel}
        </span>
        <StakesDot tone={stakes.tone} label={stakes.label} />
      </div>

      <p
        className="text-[1.0625rem] leading-[1.75] font-medium sm:text-lg"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
      >
        <Strike on={hover} seed={index + 1}>
          <Highlight text={myth.belief} query={query} />
        </Strike>
      </p>

      <div className="mt-auto flex items-center justify-between gap-2">
        <span
          className="flex items-center gap-1.5 text-[13px] font-medium transition-colors"
          style={{ color: hover ? 'var(--pen)' : 'var(--ink-faint)' }}
        >
          {t.cardCta}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            style={{
              transform: hover ? 'translateX(3px)' : 'none',
              transition: 'transform 0.2s',
            }}
          >
            <path
              d="M2 7h9m0 0L7.5 3.5M11 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {read && (
          <span
            className="inline-flex items-center gap-1 text-[11px] font-medium"
            style={{ color: 'var(--slate)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6.5L4.8 9L10 3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t.readBadge}
          </span>
        )}
      </div>
    </button>
  )
}

export function StakesDot({ tone, label }: { tone: string; label: string }) {
  const color =
    tone === 'risky'
      ? 'var(--pen)'
      : tone === 'wasteful'
        ? 'var(--amber)'
        : 'var(--slate)'
  const bg =
    tone === 'risky'
      ? 'var(--pen-soft)'
      : tone === 'wasteful'
        ? 'var(--amber-soft)'
        : 'var(--slate-soft)'

  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ background: bg, color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}
