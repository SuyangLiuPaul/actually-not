import { useLayoutEffect, useMemo, useRef, useState } from 'react'

interface LineBox {
  x: number
  y: number
  w: number
  h: number
}

/**
 * 红笔划掉一句话。线条带一点手写的抖动，看起来不像是电脑画的。
 * seed 让每条线的形状略有不同。
 * 多行文本会按实际换行逐行各画一条。注意用内层 inline 元素的
 * getClientRects() 量——Range.getClientRects() 在 WebKit 里会把
 * 行盒拉满整行宽，划线就会超出文字一大截。
 * 逐行带一点延迟，像一笔一笔划过去。
 */
export function Strike({
  children,
  on,
  seed = 0,
}: {
  children: React.ReactNode
  on: boolean
  seed?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)
  const [lines, setLines] = useState<LineBox[]>([])

  useLayoutEffect(() => {
    const el = ref.current
    const inner = innerRef.current
    if (!el || !inner) return
    const measure = () => {
      const base = el.getBoundingClientRect()
      const next = [...inner.getClientRects()]
        .filter((r) => r.width > 4)
        .map((r) => ({ x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height }))
      setLines((prev) =>
        prev.length === next.length && JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
      )
    }
    measure()
    // 字体加载完会改换行，补量一次
    document.fonts?.ready.then(measure).catch(() => {})
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [children])

  const paths = useMemo(() => lines.map((_, i) => buildPath(seed + i * 13)), [lines, seed])

  return (
    <span ref={ref} className="strike" data-on={on}>
      <span ref={innerRef}>{children}</span>
      {lines.map((line, i) => (
        <svg
          key={i}
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={
            {
              left: line.x - line.w * 0.005,
              top: line.y + line.h / 2,
              width: line.w * 1.01,
              '--len': paths[i].len,
              '--delay': `${i * 0.12}s`,
            } as React.CSSProperties
          }
        >
          <path d={paths[i].d} />
        </svg>
      ))}
    </span>
  )
}

/** 用一点伪随机把直线揉出手写的起伏 */
function buildPath(seed: number) {
  const rand = mulberry32(seed * 9301 + 49297)
  const steps = 6
  const startY = 10 + (rand() - 0.5) * 3
  let d = `M 2 ${startY.toFixed(2)}`
  let len = 0
  let prevX = 2
  let prevY = startY

  for (let i = 1; i <= steps; i++) {
    const x = 2 + (396 / steps) * i
    const y = 10 + (rand() - 0.5) * 5
    const cx = (prevX + x) / 2
    const cy = 10 + (rand() - 0.5) * 6
    d += ` Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`
    len += Math.hypot(x - prevX, y - prevY)
    prevX = x
    prevY = y
  }

  // 留些余量，保证动画能把整条线画完
  return { d, len: Math.ceil(len * 1.25) }
}

function mulberry32(a: number) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
