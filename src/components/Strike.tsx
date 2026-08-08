import { useMemo } from 'react'

/**
 * 红笔划掉一句话。线条带一点手写的抖动，看起来不像是电脑画的。
 * seed 让每条线的形状略有不同。
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
  const { d, len } = useMemo(() => buildPath(seed), [seed])

  return (
    <span className="strike" data-on={on}>
      {children}
      <svg
        viewBox="0 0 400 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ ['--len' as string]: len }}
      >
        <path d={d} />
      </svg>
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
