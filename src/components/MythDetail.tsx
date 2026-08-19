import { useEffect, useRef, useState } from 'react'
import { Strike } from './Strike'
import { StakesDot } from './MythCard'
import { mythsFor } from '../data/localized'
import { categoryLabel, catEmoji, CAT_ACCENT, stakesMeta, STRINGS, pathFor, type Locale } from '../i18n'
import type { Myth } from '../types'

export function MythDetail({
  myth,
  index,
  read,
  locale,
  onClose,
  onPrev,
  onNext,
  onToggleRead,
  onOpenMyth,
}: {
  myth: Myth
  index: number
  read: boolean
  locale: Locale
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  onToggleRead: () => void
  onOpenMyth: (id: string) => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [struck, setStruck] = useState(false)
  const [shared, setShared] = useState(false)

  // 每次换一条，重新播划线动画、清掉「已复制」反馈，并把滚动条拉回顶部
  useEffect(() => {
    setStruck(false)
    setShared(false)
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
      // 把 Tab 圈在弹层里
      if (e.key === 'Tab') {
        const panel = panelRef.current
        if (!panel) return
        const focusables = panel.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || active === panel)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, onPrev, onNext])

  // 优先调起系统分享，不行就复制深链
  const t = STRINGS[locale]
  const share = async () => {
    const url = `${window.location.origin}${pathFor(locale, myth.id)}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.shareNativeTitle(myth.belief),
          text: t.shareNativeText(myth.belief, myth.truth),
          url,
        })
        return
      } catch (err) {
        // 用户主动取消不算失败，也不再退回复制
        if (err instanceof Error && err.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // 老浏览器没有 clipboard API，退回隐藏输入框
      const ta = document.createElement('textarea')
      ta.value = url
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setShared(true)
    window.setTimeout(() => setShared(false), 1600)
  }

  const catLabel = categoryLabel(myth.category, locale)
  const stakes = stakesMeta(myth.stakes, locale)
  const all = mythsFor(locale)
  const relatedMyths = (myth.related ?? [])
    .map((id) => all.find((m) => m.id === id))
    .filter((m): m is Myth => m !== undefined)

  const issueUrl = `https://github.com/SuyangLiuPaul/actually-not/issues/new?title=${encodeURIComponent(
    t.correctionIssueTitle(myth.belief),
  )}&body=${encodeURIComponent(t.correctionIssueBody(myth.id))}`

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
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
            style={{
              background: `color-mix(in srgb, ${CAT_ACCENT[myth.category]} 12%, transparent)`,
              color: `color-mix(in srgb, ${CAT_ACCENT[myth.category]} 55%, var(--ink-soft))`,
            }}
          >
            <span aria-hidden="true">{catEmoji(myth.category)}</span>
            {catLabel}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={share}
              aria-label={shared ? t.shareCopied : t.shareAria}
              title={shared ? t.shareCopied : t.shareTitle}
              className="grid h-8 w-8 place-items-center rounded-lg transition-colors"
              style={{ color: shared ? 'var(--slate)' : 'var(--ink-soft)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--rule)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {shared ? (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8.5L6.5 12L13 4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M6.6 9.4a3 3 0 004.3.3l2-2a3 3 0 10-4.3-4.3l-1 1M9.4 6.6a3 3 0 00-4.3-.3l-2 2a3 3 0 104.3 4.3l1-1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
            <NavBtn onClick={onPrev} label={t.prev} dir="prev" />
            <NavBtn onClick={onNext} label={t.next} dir="next" />
            <button
              onClick={onClose}
              aria-label={t.close}
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

        {/* 分享图（红笔划掉那条的卡片图） */}
        <img
          src={locale === 'en' ? `/og/en/${myth.id}.png` : `/og/${myth.id}.png`}
          alt={myth.belief}
          width={1200}
          height={630}
          loading="lazy"
          className="block w-full border-b"
          style={{ borderColor: 'var(--rule)' }}
        />

        <div className="px-5 pb-9 sm:px-7">
          {/* 你以为 */}
          <div className="pt-6">
            <Label>{t.detailBelief}</Label>
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
            <Label tone="pen">{t.detailTruth}</Label>
            <p
              className="mt-1.5 text-[1.0625rem] leading-[1.7] font-medium sm:text-[1.125rem]"
              style={{ color: 'var(--ink)' }}
            >
              {myth.truth}
            </p>
          </div>

          <Section title={t.detailEvidence} body={myth.detail} />
          <Section title={t.detailOrigin} body={myth.origin} />
          <Section title={t.detailInstead} body={myth.instead} accent />

          {/* 影响程度 */}
          <div
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border px-4 py-3"
            style={{ borderColor: 'var(--rule)' }}
          >
            <StakesDot tone={stakes.tone} label={stakes.label} />
            <span className="text-[13px]" style={{ color: 'var(--ink-soft)' }}>
              {stakes.hint}
            </span>
            <button
              onClick={onToggleRead}
              aria-pressed={read}
              className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors"
              style={{
                borderColor: read ? 'var(--slate)' : 'var(--rule-strong)',
                background: read ? 'var(--slate-soft)' : 'transparent',
                color: 'var(--slate)',
              }}
            >
              {read && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 6.5L4.8 9L10 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {read ? t.readBadge : t.markRead}
            </button>
          </div>

          {/* 出处 */}
          <div className="mt-7">
            <Label>{t.detailSources}</Label>
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

          {/* 相关条目 */}
          {relatedMyths.length > 0 && (
            <div className="mt-7">
              <Label>{t.detailRelated}</Label>
              <div className="mt-2.5 grid gap-2">
                {relatedMyths.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onOpenMyth(r.id)}
                    className="group flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors"
                    style={{ borderColor: 'var(--rule)', background: 'var(--paper)' }}
                  >
                    <span
                      className="text-[14px] leading-[1.6] font-medium"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink-soft)' }}
                    >
                      {r.belief}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-hover:translate-x-0.5"
                      style={{ color: 'var(--ink-faint)' }}
                    >
                      <path
                        d="M2 7h9m0 0L7.5 3.5M11 7l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 纠错入口 */}
          <p
            className="mt-8 border-t pt-5 text-[13px] leading-[1.8]"
            style={{ borderColor: 'var(--rule)', color: 'var(--ink-faint)' }}
          >
            {t.correctionLead}
            <a
              href={issueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-[3px]"
              style={{ color: 'var(--ink-soft)' }}
            >
              {t.correctionCta}
            </a>
            {t.correctionTail}
          </p>
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
