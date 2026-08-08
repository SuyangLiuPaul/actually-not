import { useState } from 'react'
import { Strike } from './Strike'
import { CATEGORIES, STAKES_META, type Myth } from '../types'

export function MythCard({
  myth,
  index,
  onOpen,
}: {
  myth: Myth
  index: number
  onOpen: () => void
}) {
  const [hover, setHover] = useState(false)
  const cat = CATEGORIES.find((c) => c.id === myth.category)!
  const stakes = STAKES_META[myth.stakes]

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group relative flex w-full flex-col gap-4 rounded-xl border p-5 text-left transition-all duration-200 sm:p-6"
      style={{
        background: 'var(--paper-raised)',
        borderColor: hover ? 'var(--rule-strong)' : 'var(--rule)',
        boxShadow: hover ? 'var(--shadow-lift)' : 'var(--shadow)',
        transform: hover ? 'translateY(-3px)' : 'none',
      }}
      aria-label={`${myth.belief} —— 展开看证据`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide"
          style={{ color: 'var(--ink-faint)' }}
        >
          <span aria-hidden="true">{cat.emoji}</span>
          {cat.label}
        </span>
        <StakesDot tone={stakes.tone} label={stakes.label} />
      </div>

      <p
        className="text-[1.0625rem] leading-[1.75] font-medium sm:text-lg"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
      >
        <Strike on={hover} seed={index + 1}>
          {myth.belief}
        </Strike>
      </p>

      <div
        className="mt-auto flex items-center gap-1.5 text-[13px] font-medium transition-colors"
        style={{ color: hover ? 'var(--pen)' : 'var(--ink-faint)' }}
      >
        其实不是
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
