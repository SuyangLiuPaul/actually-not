import { useEffect, useRef, useState } from 'react'
import { Strike } from './Strike'
import { StakesDot } from './MythCard'
import { CATEGORIES, STAKES_META, type Myth } from '../types'

export function MythDetail({
  myth,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  myth: Myth
  index: number
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [struck, setStruck] = useState(false)

  // 每次换一条，重新播划线动画并把滚动条拉回顶部
  useEffect(() => {
    setStruck(false)
    panelRef.current?.scrollTo({ top: 0 })
    const t = setTimeout(() => setStruck(true), 220)
    return () => clearTimeout(t)
  }, [myth.id])

  useEffect(() => {
    panelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, onPrev, onNext])

  const cat = CATEGORIES.find((c) => c.id === myth.category)!
  const stakes = STAKES_META[myth.stakes]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={myth.belief}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'rgb(20 19 15 / 0.55)', animation: 'fade .2s ease both' }}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="scroll-quiet rise relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl outline-none sm:max-h-[86vh] sm:rounded-2xl"
        style={{
          background: 'var(--paper-raised)',
          boxShadow: 'var(--shadow-lift)',
          border: '1px solid var(--rule)',
        }}
      >
        {/* 顶栏 */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b px-5 py-3 backdrop-blur sm:px-7"
          style={{
            borderColor: 'var(--rule)',
            background: 'color-mix(in srgb, var(--paper-raised) 88%, transparent)',
          }}
        >
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium"
            style={{ color: 'var(--ink-faint)' }}
          >
            <span aria-hidden="true">{cat.emoji}</span>
            {cat.label}
          </span>
          <div className="flex items-center gap-1">
            <NavBtn onClick={onPrev} label="上一条" dir="prev" />
            <NavBtn onClick={onNext} label="下一条" dir="next" />
            <button
              onClick={onClose}
              aria-label="关闭"
              className="ml-1 grid h-8 w-8 place-items-center rounded-lg transition-colors"
              style={{ color: 'var(--ink-soft)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--rule)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-5 pb-9 sm:px-7">
          {/* 你以为 */}
          <div className="pt-6">
            <Label>你以为</Label>
            <p
              className="mt-2 text-[1.35rem] leading-[1.6] font-medium sm:text-[1.6rem]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              <Strike on={struck} seed={index + 1}>
                {myth.belief}
              </Strike>
            </p>
          </div>

          {/* 其实 */}
          <div
            className="mt-6 rounded-xl border-l-[3px] py-4 pr-4 pl-4 sm:pl-5"
            style={{ background: 'var(--pen-soft)', borderColor: 'var(--pen)' }}
          >
            <Label tone="pen">其实</Label>
            <p
              className="mt-1.5 text-[1.0625rem] leading-[1.7] font-medium sm:text-[1.125rem]"
              style={{ color: 'var(--ink)' }}
            >
              {myth.truth}
            </p>
          </div>

          <Section title="证据是什么" body={myth.detail} />
          <Section title="这个说法是怎么传开的" body={myth.origin} />
          <Section title="那到底该怎么做" body={myth.instead} accent />

          {/* 影响程度 */}
          <div
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border px-4 py-3"
            style={{ borderColor: 'var(--rule)' }}
          >
            <StakesDot tone={stakes.tone} label={stakes.label} />
            <span className="text-[13px]" style={{ color: 'var(--ink-soft)' }}>
              {stakes.hint}
            </span>
          </div>

          {/* 出处 */}
          <div className="mt-7">
            <Label>出处</Label>
            <ul className="mt-2.5 space-y-2">
              {myth.sources.map((s) => (
                <li key={s.label} className="text-[13px] leading-relaxed">
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1.5 underline decoration-dotted underline-offset-[3px] transition-colors"
                      style={{ color: 'var(--ink-soft)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pen)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-soft)')}
                    >
                      <span>{s.label}</span>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className="mt-[5px] shrink-0"
                      >
                        <path
                          d="M4 2h6v6M10 2L2.5 9.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ) : (
                    <span style={{ color: 'var(--ink-faint)' }}>{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  body,
  accent,
}: {
  title: string
  body: string
  accent?: boolean
}) {
  return (
    <div className="mt-7">
      <Label tone={accent ? 'slate' : undefined}>{title}</Label>
      <div className="mt-2 space-y-3">
        {body.split('\n\n').map((p, i) => (
          <p
            key={i}
            className="text-[15px] leading-[1.85]"
            style={{ color: 'var(--ink-soft)' }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

function Label({
  children,
  tone,
}: {
  children: React.ReactNode
  tone?: 'pen' | 'slate'
}) {
  const color =
    tone === 'pen' ? 'var(--pen)' : tone === 'slate' ? 'var(--slate)' : 'var(--ink-faint)'
  return (
    <span
      className="text-[11px] font-semibold tracking-[0.14em] uppercase"
      style={{ color }}
    >
      {children}
    </span>
  )
}

function NavBtn({
  onClick,
  label,
  dir,
}: {
  onClick?: () => void
  label: string
  dir: 'prev' | 'next'
}) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 place-items-center rounded-lg transition-colors disabled:opacity-30"
      style={{ color: 'var(--ink-soft)' }}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.background = 'var(--rule)'
      }}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={dir === 'prev' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
