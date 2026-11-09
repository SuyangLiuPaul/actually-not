/**
 * 每条短动画对应一个已有条目（id 必须是真实条目 id，测试会检查）。
 * youtubeId 填 'PENDING' 表示视频还没上传：界面对这样的条目什么都不渲染，
 * 所以不管填没填，构建都可以发布。上传后把真实的 YouTube 视频 ID 替换进来即可。
 *
 * 播放器是 9:16 竖屏短片。不依赖日期、开关或解锁：只要这里有真实 ID，
 * 详情页就显示播放器、视频列表就出现这一条。
 */
export interface EntryVideo {
  youtubeId: string
  durationSec: number
  /** 动画风格的简短标签 */
  style: string
}

export const VIDEO_PENDING = 'PENDING'

export const VIDEOS: Record<string, EntryVideo> = {
  'film-space-sound': { youtubeId: VIDEO_PENDING, durationSec: 52, style: 'Pixel art' },
  'five-second': { youtubeId: VIDEO_PENDING, durationSec: 50, style: 'Stickman' },
  'swallowed-gum': { youtubeId: VIDEO_PENDING, durationSec: 55, style: 'Claymation' },
  'why-runway-numbers': { youtubeId: VIDEO_PENDING, durationSec: 60, style: 'Chalkboard' },
  'film-bullet-knockback': { youtubeId: VIDEO_PENDING, durationSec: 57, style: 'PS2 retro 3D' },
  'origin-newton-apple-head': { youtubeId: VIDEO_PENDING, durationSec: 54, style: '90s anime' },
  'origin-viking-horned-helmets': { youtubeId: VIDEO_PENDING, durationSec: 56, style: 'Comic book' },
  'origin-great-wall-from-space': { youtubeId: VIDEO_PENDING, durationSec: 47, style: 'Glow sketch' },
  'tongue-map': { youtubeId: VIDEO_PENDING, durationSec: 53, style: '3D cartoon' },
  'origin-railway-gauge': { youtubeId: VIDEO_PENDING, durationSec: 58, style: 'Toy bricks' },
}

const STYLE_ZH: Record<string, string> = {
  'Pixel art': '像素风', Stickman: '火柴人', Claymation: '黏土动画', Chalkboard: '黑板',
  'PS2 retro 3D': 'PS2 复古 3D', '90s anime': '90 年代动漫', 'Comic book': '美漫',
  'Glow sketch': '发光速写', '3D cartoon': '3D 卡通', 'Toy bricks': '积木玩具',
}

/** 风格标签的本地化显示（数据里存英文，中文界面查表） */
export function styleLabel(style: string, locale: 'zh' | 'en'): string {
  return locale === 'zh' ? (STYLE_ZH[style] ?? style) : style
}

/** 该条目的可播放视频；没有，或还是 PENDING 占位时返回 undefined（界面据此什么都不渲染） */
export function videoFor(id: string): EntryVideo | undefined {
  const v = VIDEOS[id]
  return v && v.youtubeId !== VIDEO_PENDING && /^[A-Za-z0-9_-]{6,20}$/.test(v.youtubeId) ? v : undefined
}

/** 所有有可播放视频的条目 id（视频列表用） */
export function videoIds(): string[] {
  return Object.keys(VIDEOS).filter((id) => videoFor(id))
}
