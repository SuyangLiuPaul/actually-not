import { C, shadow } from './lib.mjs'

/** 图元：以 (0,0) 为底部中心，向上为负 y。尺寸约 100–180 单位。 */
export const M = {
  /** 稿纸：lines 行字线；strike 红笔划掉一行；note 角上的小红点 */
  sheet({ w = 120, h = 156, lines = 6, strike = -1 } = {}) {
    let s = shadow(w * 0.6, 7)
    s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="5" fill="${C.paper}" stroke="${C.gray2}" stroke-width="2"/>`
    const gap = (h - 40) / lines
    for (let i = 0; i < lines; i++) {
      const y = -h + 28 + i * gap
      const len = i % 3 === 2 ? w * 0.5 : w * 0.72
      s += `<rect x="${-w / 2 + 14}" y="${y}" width="${len}" height="5" rx="2.5" fill="${C.gray2}"/>`
      if (i === strike) s += `<path d="M${-w / 2 + 6} ${y + 2} Q${-w / 6} ${y - 7} ${w / 3} ${y + 3} T${w / 2 - 4} ${y - 2}" stroke="${C.red}" stroke-width="6" stroke-linecap="round" fill="none"/>`
    }
    return s
  },

  /** 摊开的书 */
  book({ w = 170, h = 110 } = {}) {
    const hw = w / 2
    let s = shadow(hw * 1.1, 9)
    s += `<path d="M0 ${-h * 0.92} Q${-hw * 0.55} ${-h * 1.08} ${-hw} ${-h * 0.9} L${-hw} ${-8} Q${-hw * 0.55} ${-h * 0.22} 0 ${-4} Z" fill="${C.paper}" stroke="${C.gray2}" stroke-width="2"/>`
    s += `<path d="M0 ${-h * 0.92} Q${hw * 0.55} ${-h * 1.08} ${hw} ${-h * 0.9} L${hw} ${-8} Q${hw * 0.55} ${-h * 0.22} 0 ${-4} Z" fill="#fbf7ee" stroke="${C.gray2}" stroke-width="2"/>`
    for (let i = 0; i < 4; i++) {
      s += `<path d="M${-hw * 0.82} ${-h * 0.72 + i * 15} Q${-hw * 0.45} ${-h * 0.8 + i * 15} ${-hw * 0.1} ${-h * 0.7 + i * 15}" stroke="${C.gray}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
      s += `<path d="M${hw * 0.1} ${-h * 0.7 + i * 15} Q${hw * 0.45} ${-h * 0.8 + i * 15} ${hw * 0.82} ${-h * 0.72 + i * 15}" stroke="${C.gray}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    }
    s += `<path d="M${-hw - 4} ${-4} Q${-hw * 0.55} ${-h * 0.2} 0 ${2} Q${hw * 0.55} ${-h * 0.2} ${hw + 4} ${-4} L${hw + 4} 4 Q${hw * 0.55} ${-h * 0.14} 0 8 Q${-hw * 0.55} ${-h * 0.14} ${-hw - 4} 4 Z" fill="${C.brown}"/>`
    return s
  },

  /** 墨水瓶 + 毛笔 */
  ink() {
    let s = shadow(48, 7)
    s += `<rect x="-34" y="-62" width="68" height="62" rx="14" fill="${C.ink}"/>`
    s += `<rect x="-20" y="-76" width="40" height="18" rx="4" fill="${C.ink2}"/>`
    s += `<rect x="-16" y="-84" width="32" height="12" rx="3" fill="${C.brown}"/>`
    s += `<path d="M-22 -50 q10 -8 22 -2" stroke="#fff" stroke-opacity=".25" stroke-width="4" fill="none" stroke-linecap="round"/>`
    return s
  },
  brush() {
    let s = ''
    s += `<rect x="-5" y="-150" width="10" height="110" rx="5" fill="${C.brown}"/>`
    s += `<path d="M-9 -40 Q0 -8 9 -40 Z" fill="${C.ink}"/>`
    s += `<rect x="-6.5" y="-46" width="13" height="10" rx="3" fill="${C.gold}"/>`
    return s
  },

  /** 咖啡杯（带碟和热气） */
  coffee() {
    let s = shadow(70, 8)
    s += `<ellipse cx="0" cy="-6" rx="66" ry="12" fill="${C.gray2}"/>`
    s += `<path d="M-44 -64 L44 -64 L38 -12 Q0 4 -38 -12 Z" fill="${C.paper}" stroke="${C.gray2}" stroke-width="2"/>`
    s += `<ellipse cx="0" cy="-64" rx="44" ry="9" fill="${C.brown2}"/>`
    s += `<ellipse cx="0" cy="-64" rx="38" ry="6" fill="#3a2a1d"/>`
    s += `<path d="M44 -52 q26 2 22 22 q-4 14 -26 12" stroke="${C.gray2}" stroke-width="7" fill="none" stroke-linecap="round"/>`
    for (const x of [-14, 6, 24])
      s += `<path d="M${x} -80 q-9 -12 0 -22 q9 -10 0 -22" stroke="${C.gray}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>`
    return s
  },

  /** 烛台 + 火苗 */
  candle() {
    let s = shadow(34, 6)
    s += `<ellipse cx="0" cy="-6" rx="34" ry="8" fill="${C.tan2}"/>`
    s += `<rect x="-13" y="-86" width="26" height="82" rx="5" fill="${C.paper}" stroke="${C.gray2}" stroke-width="2"/>`
    s += `<path d="M0 -122 Q-16 -102 0 -90 Q16 -102 0 -122 Z" fill="${C.gold}"/>`
    s += `<path d="M0 -112 Q-7 -102 0 -95 Q7 -102 0 -112 Z" fill="${C.red}"/>`
    return s
  },

  clock({ r = 62, hh = -35, mm = 60 } = {}) {
    let s = shadow(r * 0.8, 7)
    s += `<circle cx="0" cy="${-r - 8}" r="${r}" fill="${C.paper}" stroke="${C.ink}" stroke-width="7"/>`
    for (let i = 0; i < 12; i++) {
      const a = (i * 30 * Math.PI) / 180
      s += `<line x1="${Math.sin(a) * (r - 8)}" y1="${-r - 8 - Math.cos(a) * (r - 8)}" x2="${Math.sin(a) * (r - 15)}" y2="${-r - 8 - Math.cos(a) * (r - 15)}" stroke="${C.ink2}" stroke-width="3" stroke-linecap="round"/>`
    }
    const hand = (deg, len, w, col) => {
      const a = (deg * Math.PI) / 180
      return `<line x1="0" y1="${-r - 8}" x2="${Math.sin(a) * len}" y2="${-r - 8 - Math.cos(a) * len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`
    }
    s += hand(hh, r * 0.5, 6, C.ink) + hand(mm, r * 0.75, 4, C.ink) + `<circle cx="0" cy="${-r - 8}" r="5" fill="${C.red}"/>`
    return s
  },

  hourglass() {
    let s = shadow(40, 6)
    s += `<rect x="-36" y="-130" width="72" height="9" rx="4" fill="${C.brown}"/><rect x="-36" y="-9" width="72" height="9" rx="4" fill="${C.brown}"/>`
    s += `<path d="M-28 -121 L28 -121 Q28 -85 4 -70 Q28 -52 28 -9 L-28 -9 Q-28 -52 -4 -70 Q-28 -85 -28 -121 Z" fill="#fff" fill-opacity=".55" stroke="${C.ink2}" stroke-width="3"/>`
    s += `<path d="M-20 -14 Q0 -44 20 -14 Z" fill="${C.gold}"/><path d="M-3 -100 L3 -100 L1 -72 L-1 -72 Z" fill="${C.gold}"/>`
    return s
  },

  bee() {
    let s = ''
    s += `<ellipse cx="-12" cy="-26" rx="22" ry="12" fill="#fff" fill-opacity=".8" stroke="${C.blue}" stroke-width="2" transform="rotate(-25 -12 -26)"/>`
    s += `<ellipse cx="14" cy="-28" rx="22" ry="12" fill="#fff" fill-opacity=".8" stroke="${C.blue}" stroke-width="2" transform="rotate(25 14 -28)"/>`
    s += `<ellipse cx="0" cy="-10" rx="30" ry="20" fill="${C.gold}"/>`
    s += `<path d="M-10 -28 q-3 18 0 36 M6 -29 q3 19 0 38 M20 -24 q2 14 0 28" stroke="${C.ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`
    s += `<circle cx="-30" cy="-12" r="11" fill="${C.ink}"/><circle cx="-34" cy="-15" r="2.5" fill="#fff"/>`
    s += `<path d="M-36 -22 q-8 -10 -14 -8 M-30 -23 q-3 -12 -8 -14" stroke="${C.ink}" stroke-width="2" fill="none"/>`
    return s
  },

  hex({ s = 34, fill = C.gold } = {}) {
    const p = [...Array(6)].map((_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6
      return `${(Math.cos(a) * s).toFixed(1)},${(Math.sin(a) * s).toFixed(1)}`
    })
    return `<polygon points="${p.join(' ')}" fill="${fill}" stroke="${C.brown}" stroke-width="3" stroke-linejoin="round" transform="translate(0 ${-s})"/>`
  },

  bulb() {
    let s = shadow(34, 6)
    s += `<path d="M0 -150 C-46 -150 -58 -100 -34 -72 Q-22 -58 -22 -44 L22 -44 Q22 -58 34 -72 C58 -100 46 -150 0 -150 Z" fill="#fff6d6" stroke="${C.gold}" stroke-width="4"/>`
    s += `<path d="M-10 -60 Q-6 -92 0 -80 Q6 -92 10 -60" stroke="${C.red}" stroke-width="3" fill="none"/>`
    s += `<rect x="-20" y="-44" width="40" height="12" rx="3" fill="${C.gray}"/><rect x="-17" y="-32" width="34" height="12" rx="3" fill="${C.tan2}"/><rect x="-12" y="-20" width="24" height="12" rx="6" fill="${C.ink2}"/>`
    return s
  },

  /** 苹果 */
  apple({ col = C.red } = {}) {
    let s = shadow(40, 6)
    s += `<path d="M0 -92 C-26 -112 -62 -90 -54 -50 C-48 -20 -22 -2 0 -10 C22 -2 48 -20 54 -50 C62 -90 26 -112 0 -92 Z" fill="${col}"/>`
    s += `<path d="M0 -92 q2 -18 14 -26" stroke="${C.brown2}" stroke-width="5" fill="none" stroke-linecap="round"/>`
    s += `<path d="M6 -104 q22 -16 34 2 q-18 14 -34 -2 Z" fill="${C.sage2}"/>`
    s += `<path d="M-34 -70 q-6 12 -2 26" stroke="#fff" stroke-opacity=".35" stroke-width="6" fill="none" stroke-linecap="round"/>`
    return s
  },

  /** 场记板 */
  clapper() {
    let s = shadow(80, 8)
    s += `<rect x="-76" y="-84" width="152" height="82" rx="6" fill="${C.ink}"/>`
    s += `<rect x="-62" y="-70" width="124" height="6" rx="3" fill="${C.gray}" opacity=".6"/><rect x="-62" y="-54" width="90" height="6" rx="3" fill="${C.gray}" opacity=".6"/><rect x="-62" y="-38" width="110" height="6" rx="3" fill="${C.gray}" opacity=".6"/>`
    s += `<g transform="rotate(-9 -76 -88)"><rect x="-76" y="-116" width="152" height="26" rx="5" fill="${C.ink2}"/>`
    for (let i = 0; i < 5; i++) s += `<polygon points="${-70 + i * 30},-116 ${-50 + i * 30},-116 ${-62 + i * 30},-90 ${-82 + i * 30},-90" fill="${i % 2 ? C.paper : C.red}" opacity="${i % 2 ? 0.9 : 1}"/>`
    s += `</g>`
    return s
  },

  reel() {
    let s = shadow(62, 7)
    s += `<circle cx="0" cy="-70" r="62" fill="${C.ink2}"/><circle cx="0" cy="-70" r="50" fill="${C.ink}"/>`
    for (let i = 0; i < 6; i++) {
      const a = (i * 60 * Math.PI) / 180
      s += `<circle cx="${Math.cos(a) * 30}" cy="${-70 + Math.sin(a) * 30}" r="13" fill="${C.cream2}"/>`
    }
    s += `<circle cx="0" cy="-70" r="9" fill="${C.red}"/>`
    return s
  },

  popcorn() {
    let s = shadow(54, 7)
    for (const [x, y, r] of [[-26, -92, 16], [-4, -102, 18], [20, -94, 17], [-40, -80, 13], [38, -80, 13], [6, -84, 15]])
      s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff6dc" stroke="${C.gold}" stroke-width="2"/>`
    s += `<path d="M-50 -78 L50 -78 L38 0 L-38 0 Z" fill="${C.paper}" stroke="${C.gray2}" stroke-width="2"/>`
    for (const x of [-30, -10, 10, 30]) s += `<path d="M${x * 1.15} -78 L${x * 0.85} 0" stroke="${C.red}" stroke-width="9" opacity=".9"/>`
    return s
  },

  /** 放大镜 */
  lens() {
    let s = shadow(38, 6)
    s += `<circle cx="-8" cy="-92" r="44" fill="#fff" fill-opacity=".5" stroke="${C.ink}" stroke-width="8"/>`
    s += `<path d="M-30 -108 q10 -16 28 -14" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".8"/>`
    s += `<line x1="24" y1="-60" x2="58" y2="-14" stroke="${C.brown}" stroke-width="13" stroke-linecap="round"/>`
    return s
  },

  quill() {
    let s = ''
    s += `<path d="M30 -140 C-6 -128 -34 -86 -42 -32 L-36 -30 C-30 -62 -6 -78 4 -76 C-4 -66 -14 -50 -16 -36 C16 -52 34 -92 30 -140 Z" fill="${C.paper}" stroke="${C.gray}" stroke-width="2.5"/>`
    s += `<path d="M-42 -32 L-50 -6" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`
    return s
  },

  /** 火漆印 */
  seal() {
    return `<circle cx="0" cy="-30" r="30" fill="${C.red}"/><circle cx="0" cy="-30" r="21" fill="none" stroke="${C.red2}" stroke-width="3"/><path d="M-10 -30 l7 8 l14 -16" stroke="${C.red2}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  },

  /** 一条延伸的小路（带脚印） */
  path({ w = 300 } = {}) {
    let s = `<path d="M${-w / 2} 0 Q${-w / 6} -40 0 -46 T${w / 2} -88" stroke="${C.tan}" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/>`
    for (let i = 0; i < 6; i++) {
      const t = i / 5, x = -w / 2 + t * w, y = -t * 88 - Math.sin(t * Math.PI) * 6
      s += `<ellipse cx="${x}" cy="${y - (i % 2 ? 5 : -2)}" rx="5" ry="8" fill="${C.brown}" opacity=".55" transform="rotate(${i % 2 ? 14 : -10} ${x} ${y})"/>`
    }
    return s
  },

  /** 铁轨（正面透视） */
  rails() {
    let s = ''
    for (let i = 0; i < 7; i++) {
      const y = -i * 16, hw = 78 - i * 6
      s += `<rect x="${-hw}" y="${y - 8}" width="${hw * 2}" height="9" rx="2" fill="${C.brown}"/>`
    }
    s += `<path d="M-30 0 L-14 -104" stroke="${C.gray}" stroke-width="8" stroke-linecap="round"/><path d="M30 0 L14 -104" stroke="${C.gray}" stroke-width="8" stroke-linecap="round"/>`
    s += `<path d="M-32 0 L-16 -104" stroke="${C.ink2}" stroke-width="2" opacity=".5"/>`
    return s
  },

  /** 头盔：horns 是否带角 */
  helmet({ horns = false } = {}) {
    let s = shadow(60, 7)
    s += `<path d="M-52 -14 C-52 -82 -22 -100 0 -100 C22 -100 52 -82 52 -14 Z" fill="${C.gray}" stroke="${C.ink2}" stroke-width="4"/>`
    s += `<rect x="-56" y="-26" width="112" height="14" rx="4" fill="${C.tan2}"/>`
    s += `<rect x="-6" y="-100" width="12" height="76" fill="${C.ink2}" opacity=".55"/>`
    if (horns) {
      s += `<path d="M-50 -70 C-84 -76 -92 -112 -78 -132 C-76 -104 -64 -92 -48 -90 Z" fill="${C.paper}" stroke="${C.gray}" stroke-width="3"/>`
      s += `<path d="M50 -70 C84 -76 92 -112 78 -132 C76 -104 64 -92 48 -90 Z" fill="${C.paper}" stroke="${C.gray}" stroke-width="3"/>`
    }
    return s
  },

  leaf({ col = C.sage } = {}) {
    return `<path d="M0 0 C-30 -30 -26 -80 0 -104 C26 -80 30 -30 0 0 Z" fill="${col}"/><path d="M0 -6 L0 -92" stroke="${C.sage2}" stroke-width="3"/>`
  },

  tree() {
    let s = shadow(44, 6)
    s += `<rect x="-9" y="-70" width="18" height="70" rx="5" fill="${C.brown}"/>`
    s += `<circle cx="0" cy="-102" r="46" fill="${C.sage}"/><circle cx="-30" cy="-84" r="30" fill="${C.sage2}"/><circle cx="30" cy="-86" r="30" fill="${C.sage}"/>`
    return s
  },

  mountain() {
    return `<path d="M-140 0 L-40 -110 L10 -60 L60 -126 L150 0 Z" fill="${C.blue}" opacity=".75"/><path d="M60 -126 L38 -90 L52 -96 L62 -84 L74 -96 L86 -88 Z" fill="${C.paper}"/>`
  },

  sun({ r = 34 } = {}) {
    let s = `<circle cx="0" cy="${-r}" r="${r}" fill="${C.gold}"/>`
    for (let i = 0; i < 10; i++) {
      const a = (i * 36 * Math.PI) / 180
      s += `<line x1="${Math.cos(a) * (r + 8)}" y1="${-r + Math.sin(a) * (r + 8)}" x2="${Math.cos(a) * (r + 18)}" y2="${-r + Math.sin(a) * (r + 18)}" stroke="${C.gold}" stroke-width="5" stroke-linecap="round"/>`
    }
    return s
  },

  /** 天平 */
  scales() {
    let s = shadow(44, 6)
    s += `<rect x="-5" y="-130" width="10" height="130" rx="4" fill="${C.brown}"/><rect x="-38" y="-8" width="76" height="8" rx="3" fill="${C.brown2}"/>`
    s += `<rect x="-88" y="-136" width="176" height="7" rx="3" fill="${C.ink2}" transform="rotate(-5 0 -132)"/>`
    s += `<path d="M-84 -122 L-104 -70 L-64 -70 Z M-84 -122 L-84 -70" stroke="${C.gray}" stroke-width="2" fill="none"/><path d="M-110 -70 Q-84 -46 -58 -70 Z" fill="${C.gold}"/>`
    s += `<path d="M84 -146 L64 -90 L104 -90 Z" stroke="${C.gray}" stroke-width="2" fill="none"/><path d="M58 -90 Q84 -66 110 -90 Z" fill="${C.gold}"/>`
    return s
  },

  key() {
    let s = ''
    s += `<circle cx="-46" cy="-30" r="26" fill="none" stroke="${C.gold}" stroke-width="12"/>`
    s += `<rect x="-22" y="-35" width="86" height="11" rx="4" fill="${C.gold}"/><rect x="40" y="-35" width="11" height="26" rx="3" fill="${C.gold}"/><rect x="58" y="-35" width="9" height="19" rx="3" fill="${C.gold}"/>`
    return s
  },

  /** 一只小旗/红笔叉（用来表示"不对"） */
  cross() {
    return `<path d="M-22 -52 L22 -8 M22 -52 L-22 -8" stroke="${C.red}" stroke-width="11" stroke-linecap="round"/>`
  },
}
