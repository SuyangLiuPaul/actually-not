/**
 * 手绘 SVG 插画库 —— 「其实不是」新板块（名言 / 电影 / 起源）用。
 * 原创几何图形，无外部素材、无水印、无版权问题；统一奶油底 + 单一红色点缀。
 * 画布 960×320（卡片里是 3:1 的横幅裁切，所以内容放在中央横带里）。
 */
export const W = 960
export const H = 320

export const C = {
  paper: '#fffdf8',
  cream: '#f7f4ee',
  cream2: '#efe7d8',
  ink: '#2b2723',
  ink2: '#4a443d',
  gray: '#b9b1a4',
  gray2: '#d9d2c5',
  tan: '#d8c3a0',
  tan2: '#c0a47a',
  brown: '#8a6d4b',
  brown2: '#5f4a33',
  sage: '#8fa58a',
  sage2: '#6f8a6a',
  blue: '#6f88a0',
  blue2: '#4d6680',
  gold: '#d9a441',
  red: '#c13024',
  red2: '#8f221a',
}

/** 每个板块一个底色调，让三个新板块各有气质 */
export const TINT = {
  quote: ['#efe0e6', '#e4cdd6'],
  film: ['#dde6f0', '#c9d8e8'],
  origin: ['#e6e8cf', '#d7dbb5'],
  warm: ['#f3e3cf', '#ead2b3'],
}

let uid = 0
export const id = (p = 'g') => `${p}${++uid}`

/** 画布：渐变底 + 一个大的柔和圆（舞台感）+ 内容 */
export function canvas(tint, body, opts = {}) {
  const [a, b] = TINT[tint] ?? TINT.warm
  const cx = opts.cx ?? 480
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.cream2}"/></linearGradient>
  <radialGradient id="stage" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<ellipse cx="${cx}" cy="165" rx="330" ry="150" fill="url(#stage)"/>
<ellipse cx="${cx}" cy="262" rx="300" ry="14" fill="${b}" opacity=".55"/>
${body}
</svg>`
}

/** 放置一个图元：x,y 是图元基点（底部中心），s 缩放，r 旋转（度） */
export const at = (x, y, inner, s = 1, r = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${inner}</g>`

/** 物体脚下的软阴影 */
export const shadow = (rx = 60, ry = 8, o = 0.28) =>
  `<ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" fill="${C.brown2}" opacity="${o}" filter="url(#soft)"/>`
