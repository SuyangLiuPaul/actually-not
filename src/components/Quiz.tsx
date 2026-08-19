import { useEffect, useRef, useState } from 'react'
import { Strike } from './Strike'
import { mythsFor } from '../data/localized'
import { STRINGS, type Locale, type T } from '../i18n'
import type { Myth } from '../types'

/**
 * 「你中了几条」测验：随机抽 10 条，只问信不信过，最后逐条对答案。
 * 结果可以生成一张成绩图（canvas 本地画，不上传任何东西），方便分享。
 */

const QUIZ_LEN = 10

type Phase = 'start' | 'answering' | 'result'

function pickRandom(locale: Locale): Myth[] {
  const pool = [...mythsFor(locale)]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, QUIZ_LEN)
}

/** 手写感的红笔线（和 Strike 同一个伪随机思路） */
function wavyLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  len: number,
  seed: number,
) {
  let a = seed * 9301 + 49297
  const rand = () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  ctx.beginPath()
  ctx.moveTo(x, y)
  const steps = 6
  for (let i = 1; i <= steps; i++) {
    const nx = x + (len / steps) * i
    ctx.quadraticCurveTo(
      x + (len / steps) * (i - 0.5),
      y + (rand() - 0.5) * 16,
      nx,
      y + (rand() - 0.5) * 12,
    )
  }
  ctx.stroke()
}

/** 成绩分享图：1200×630，纸墨红笔风格，和站点 og 图一套语言 */
function drawScoreImage(score: number, total: number, t: T): Promise<Blob | null> {
  const W = 1200
  const H = 630
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d')
  if (!ctx) return Promise.resolve(null)

  const serif = `'Iowan Old Style', 'Palatino Linotype', Georgia, 'Songti SC', 'Noto Serif SC', 'SimSun', serif`
  const sans = `-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif`

  // 纸 + 稿纸横线
  ctx.fillStyle = '#f7f4ee'
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = '#e2dcd1'
  ctx.lineWidth = 1.5
  for (let y = 120; y <= 520; y += 80) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(W, y)
    ctx.stroke()
  }

  ctx.fillStyle = '#cf3a30'
  ctx.font = `600 26px ${sans}`
  ctx.fillText(t.quizImgHeader, 88, 152)

  // 成绩
  ctx.fillStyle = '#1c1a17'
  ctx.font = `700 110px ${serif}`
  const scoreText = t.quizImgScore(score, total)
  // 英文句子比中文长，字号自适应缩一点
  if (ctx.measureText(scoreText).width > 1024) {
    ctx.font = `700 84px ${serif}`
  }
  ctx.fillText(scoreText, 88, 330)
  ctx.strokeStyle = '#cf3a30'
  ctx.lineWidth = 7
  ctx.lineCap = 'round'
  ctx.globalAlpha = 0.88
  wavyLine(ctx, 84, 292, Math.min(ctx.measureText(scoreText).width, 1000), score + 7)
  ctx.globalAlpha = 1

  ctx.fillStyle = '#55504a'
  ctx.font = `400 34px ${sans}`
  ctx.fillText(t.quizVerdict(score), 88, 436)

  ctx.fillStyle = '#8c857c'
  ctx.font = `400 27px ${sans}`
  ctx.fillText(t.quizImgFooter, 88, 522)

  return new Promise((resolve) => cv.toBlob((b) => resolve(b), 'image/png'))
}

export function Quiz({
  locale,
  onClose,
  onOpenMyth,
}: {
  locale: Locale
  onClose: () => void
  onOpenMyth: (id: string) => void
}) {
  const t = STRINGS[locale]
  const panelRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('start')
  const [items, setItems] = useState<Myth[]>([])
  const [step, setStep] = useState(0)
  const [believed, setBelieved] = useState<boolean[]>([])
  const [struck, setStruck] = useState(false)
  const [copied, setCopied] = useState(false)
  const [img, setImg] = useState<{ url: string; blob: Blob } | null>(null)

  const score = believed.filter(Boolean).length

  const restart = () => {
    setItems(pickRandom(locale))
    setStep(0)
    setBelieved([])
    setCopied(false)
    setImg((old) => {
      if (old) URL.revokeObjectURL(old.url)
      return null
    })
    setPhase('answering')
  }

  // 卸载时释放图片对象 URL
  useEffect(() => {
    return () => {
      if (img) URL.revokeObjectURL(img.url)
    }
    // eslint 友好：只在卸载时跑
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 答题时每换一题重播划线动画
  useEffect(() => {
    if (phase !== 'answering') return
    setStruck(false)
    const t = setTimeout(() => setStruck(true), 220)
    return () => clearTimeout(t)
  }, [phase, step])

  useEffect(() => {
    panelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
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
  }, [onClose])

  const answer = (didBelieve: boolean) => {
    const next = [...believed, didBelieve]
    setBelieved(next)
    if (step + 1 >= items.length) setPhase('result')
    else setStep(step + 1)
  }

  // 注意别在渲染期碰 window：这个组件会被预渲染（SSR）
  const shareText = () => t.quizShareText(score, items.length, window.location.origin)

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(shareText())
    } catch {
      const ta = document.createElement('textarea')
      ta.value = shareText()
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const makeImage = async () => {
    if (img) return
    const blob = await drawScoreImage(score, items.length, t)
    if (blob) setImg({ url: URL.createObjectURL(blob), blob })
  }

  const shareImage = async () => {
    if (!img) return
    const file = new File([img.blob], t.quizImgFile(score, items.length), { type: 'image/png' })
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: t.quizTitle })
      } catch {
        // 用户取消，不用做任何事
      }
    }
  }

  const current = items[step]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t.quizName}
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
            className="text-xs font-medium tracking-wide"
            style={{ color: 'var(--ink-faint)' }}
            aria-live="polite"
          >
            {phase === 'answering' ? t.quizProgress(step + 1, items.length) : t.quizName}
          </span>
          <button
            onClick={onClose}
            aria-label={t.close}
            className="grid h-8 w-8 place-items-center rounded-lg transition-colors"
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

        <div className="px-5 pb-9 sm:px-7">
          {/* ── 开场 ── */}
          {phase === 'start' && (
            <div className="pt-8 pb-2 text-center">
              <p
                className="text-[2rem] leading-[1.3] font-bold sm:text-[2.5rem]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {t.quizName}
              </p>
              <p
                className="mx-auto mt-4 max-w-[40ch] text-[15px] leading-[1.85]"
                style={{ color: 'var(--ink-soft)' }}
              >
                {t.quizIntro(QUIZ_LEN)}
              </p>
              <button
                onClick={restart}
                className="mt-7 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-transform active:scale-[0.97]"
                style={{ background: 'var(--pen)', color: '#fff' }}
              >
                {t.quizStart}
              </button>
              <p className="mt-4 text-[12px]" style={{ color: 'var(--ink-faint)' }}>
                {t.quizPrivacy}
              </p>
            </div>
          )}

          {/* ── 答题 ── */}
          {phase === 'answering' && current && (
            <div className="pt-8">
              <p
                className="text-[11px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: 'var(--ink-faint)' }}
              >
                {t.quizQuestion}
              </p>
              <p
                className="mt-3 min-h-[5.5rem] text-[1.35rem] leading-[1.6] font-medium sm:text-[1.6rem]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                <Strike on={struck} seed={step + 1}>
                  {current.belief}
                </Strike>
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  onClick={() => answer(true)}
                  className="rounded-xl border px-4 py-3.5 text-[15px] font-medium transition-transform active:scale-[0.97]"
                  style={{
                    borderColor: 'var(--pen)',
                    color: 'var(--pen)',
                    background: 'var(--pen-soft)',
                  }}
                >
                  {t.quizYes}
                </button>
                <button
                  onClick={() => answer(false)}
                  className="rounded-xl border px-4 py-3.5 text-[15px] font-medium transition-transform active:scale-[0.97]"
                  style={{
                    borderColor: 'var(--rule-strong)',
                    color: 'var(--ink-soft)',
                    background: 'var(--paper)',
                  }}
                >
                  {t.quizNo}
                </button>
              </div>
            </div>
          )}

          {/* ── 结果 ── */}
          {phase === 'result' && (
            <div className="pt-8">
              <div className="text-center">
                <p
                  className="text-[2rem] leading-[1.3] font-bold sm:text-[2.5rem]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {t.quizScore(score, items.length)}
                </p>
                <p className="mt-3 text-[15px]" style={{ color: 'var(--ink-soft)' }}>
                  {t.quizVerdict(score)}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    onClick={copyResult}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium transition-transform active:scale-[0.97]"
                    style={{ background: 'var(--pen)', color: '#fff' }}
                  >
                    {copied ? t.quizCopied : t.quizCopy}
                  </button>
                  <button
                    onClick={makeImage}
                    className="rounded-lg border px-4 py-2.5 text-sm font-medium transition-transform active:scale-[0.97]"
                    style={{
                      borderColor: 'var(--rule-strong)',
                      color: 'var(--ink-soft)',
                      background: 'var(--paper)',
                    }}
                  >
                    {t.quizMakeImage}
                  </button>
                  <button
                    onClick={restart}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium"
                    style={{ color: 'var(--ink-faint)' }}
                  >
                    {t.quizRestart}
                  </button>
                </div>
              </div>

              {/* 成绩图预览 + 保存/分享 */}
              {img && (
                <div className="mt-6">
                  <img
                    src={img.url}
                    alt={t.quizImgAlt(score, items.length)}
                    className="w-full rounded-lg border"
                    style={{ borderColor: 'var(--rule)' }}
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
                    {typeof navigator !== 'undefined' && 'canShare' in navigator && (
                      <button
                        onClick={shareImage}
                        className="rounded-lg px-4 py-2 text-[13px] font-medium"
                        style={{ background: 'var(--pen)', color: '#fff' }}
                      >
                        {t.quizShareImage}
                      </button>
                    )}
                    <a
                      href={img.url}
                      download={t.quizImgFile(score, items.length)}
                      className="rounded-lg border px-4 py-2 text-[13px] font-medium"
                      style={{
                        borderColor: 'var(--rule-strong)',
                        color: 'var(--ink-soft)',
                        background: 'var(--paper)',
                      }}
                    >
                      {t.quizSaveImage}
                    </a>
                  </div>
                </div>
              )}

              {/* 逐条对答案 */}
              <div className="mt-8 space-y-2.5">
                {items.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => onOpenMyth(m.id)}
                    className="flex w-full items-start justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors"
                    style={{ borderColor: 'var(--rule)', background: 'var(--paper)' }}
                  >
                    <span className="min-w-0">
                      <span
                        className="block text-[14px] leading-[1.6] font-medium"
                        style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink-soft)' }}
                      >
                        <Strike on seed={i + 1}>
                          {m.belief}
                        </Strike>
                      </span>
                      <span
                        className="mt-1 block text-[13px] leading-[1.6]"
                        style={{ color: 'var(--ink-faint)' }}
                      >
                        {m.truth}
                      </span>
                    </span>
                    <span
                      className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={
                        believed[i]
                          ? { background: 'var(--pen-soft)', color: 'var(--pen)' }
                          : { background: 'var(--slate-soft)', color: 'var(--slate)' }
                      }
                    >
                      {believed[i] ? t.quizBelieved : t.quizNotBelieved}
                    </span>
                  </button>
                ))}
              </div>

              <p
                className="mt-5 text-center text-[12px]"
                style={{ color: 'var(--ink-faint)' }}
              >
                {t.quizReviewHint}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
