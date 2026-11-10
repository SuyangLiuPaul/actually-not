/**
 * 每条短动画对应一个已有条目（id 必须是真实条目 id，测试会检查）。
 * youtubeId 填 'PENDING' 表示视频还没上传：界面对这样的条目什么都不渲染，
 * 所以不管填没填，构建都可以发布。上传后把真实的 YouTube 视频 ID 替换进来即可。
 *
 * 播放器是 9:16 竖屏短片。publishAt 之前（YouTube 上还是私享）显示「X 月 X 日上线」预告卡，
 * 到点自动变成播放器。不隐藏任何东西，没有开关或解锁。
 */
export interface EntryVideo {
  youtubeId: string
  durationSec: number
  /** 动画风格的简短标签 */
  style: string
  /** YouTube 定时公开的时间（墨尔本 17:00）。到点之前视频在 YouTube 上还是私享，嵌入也播不了，所以界面先不显示。 */
  publishAt?: string
  /** 横屏（16:9）视频；不填就是 9:16 竖屏短片 */
  landscape?: boolean
  /** 英文版（英文界面优先用它）；只填和中文版不同的字段 */
  en?: { youtubeId: string; durationSec?: number; publishAt?: string }
}

export const VIDEO_PENDING = 'PENDING'

export const VIDEOS: Record<string, EntryVideo> = {
  'film-space-sound': { youtubeId: 'sH0SbRTBBAw', durationSec: 53, publishAt: '2026-11-16T17:00:00+11:00', style: 'Pixel art' },
  'five-second': { youtubeId: 'MSjqeZlISNk', durationSec: 52, publishAt: '2026-12-03T17:00:00+11:00', style: 'Stickman' },
  'swallowed-gum': { youtubeId: 'jiktHvEBtgw', durationSec: 47, publishAt: '2026-12-14T17:00:00+11:00', style: 'Claymation' },
  'why-runway-numbers': { youtubeId: 'J5HeRQfVywA', durationSec: 59, publishAt: '2026-11-23T17:00:00+11:00', style: 'Chalkboard' },
  'film-bullet-knockback': { youtubeId: 'MfBTp7pLXFw', durationSec: 51, publishAt: '2026-11-30T17:00:00+11:00', style: 'PS2 retro 3D' },
  'origin-newton-apple-head': { youtubeId: 'q5IzE-OFS7c', durationSec: 47, publishAt: '2026-12-07T17:00:00+11:00', style: '90s anime' },
  'origin-viking-horned-helmets': { youtubeId: 'Njl7knL3lpc', durationSec: 56, publishAt: '2026-11-19T17:00:00+11:00', style: 'Comic book' },
  'origin-great-wall-from-space': { youtubeId: 'fqZNkrSSzoY', durationSec: 52, publishAt: '2026-11-12T17:00:00+11:00', style: 'Glow sketch' },
  'tongue-map': { youtubeId: '69L8h8QzHV0', durationSec: 60, publishAt: '2026-11-26T17:00:00+11:00', style: '3D cartoon' },
  'origin-railway-gauge': { youtubeId: '0MDB7LfwHP4', durationSec: 54, publishAt: '2026-12-10T17:00:00+11:00', style: 'Toy bricks' },
  'honey-for-sugar': { youtubeId: 'cl3CPGBpa3w', durationSec: 149, publishAt: '2026-11-13T23:00:00+11:00', style: 'Claymation', landscape: true, en: { youtubeId: VIDEO_PENDING, durationSec: 168, publishAt: '2026-11-14T11:00:00+11:00' } },
  leftovers: { youtubeId: 'gbajL3AI8us', durationSec: 212, publishAt: '2026-11-13T17:00:00+11:00', style: 'Kitchen flat illustration', landscape: true, en: { youtubeId: 'p9GyW8ikX_U', durationSec: 215, publishAt: '2026-11-11T11:00:00+11:00' } },
}

const STYLE_ZH: Record<string, string> = {
  'Pixel art': '像素风', Stickman: '火柴人', Claymation: '黏土动画', Chalkboard: '黑板',
  'PS2 retro 3D': 'PS2 复古 3D', '90s anime': '90 年代动漫', 'Comic book': '美漫',
  'Glow sketch': '发光速写', '3D cartoon': '3D 卡通', 'Toy bricks': '积木玩具',
  'Kitchen flat illustration': '厨房插画',
}

/** 风格标签的本地化显示（数据里存英文，中文界面查表） */
export function styleLabel(style: string, locale: 'zh' | 'en'): string {
  return locale === 'zh' ? (STYLE_ZH[style] ?? style) : style
}

/** 「1 分钟动画」/「4 分钟动画」这样的长度标签（按分钟四舍五入，至少 1） */
export function lengthLabel(v: EntryVideo, locale: 'zh' | 'en'): string {
  const m = Math.max(1, Math.round(v.durationSec / 60))
  return locale === 'zh' ? `${m} 分钟动画` : `${m}-minute animation`
}

/** 该条目的可播放视频；没有，或还是 PENDING 占位时返回 undefined（界面据此什么都不渲染） */
export function videoFor(id: string, locale?: 'zh' | 'en'): EntryVideo | undefined {
  const base = VIDEOS[id]
  const v = base && locale === 'en' && base.en && base.en.youtubeId !== VIDEO_PENDING ? { ...base, ...base.en } : base
  return v && v.youtubeId !== VIDEO_PENDING && /^[A-Za-z0-9_-]{6,20}$/.test(v.youtubeId) ? v : undefined
}

/**
 * 视频是否已在 YouTube 公开。之前它是私享的，嵌入会显示「视频不可用」，
 * 所以界面在那之前显示「X 月 X 日上线」的预告卡，而不是隐藏——条目和视频列表始终可见。
 */
export function isLive(v: EntryVideo, now: Date = new Date()): boolean {
  return !v.publishAt || now.getTime() >= Date.parse(v.publishAt)
}

/** 上线日期的本地化显示（按墨尔本时间的日历日） */
export function publishLabel(v: EntryVideo, locale: 'zh' | 'en'): string {
  if (!v.publishAt) return ''
  const d = new Date(v.publishAt)
  const opts = { timeZone: 'Australia/Melbourne', month: 'long', day: 'numeric' } as const
  return locale === 'zh' ? d.toLocaleDateString('zh-CN', opts) : d.toLocaleDateString('en-AU', opts)
}

/** 所有有可播放视频的条目 id（视频列表用） */
export function videoIds(): string[] {
  return Object.keys(VIDEOS).filter((id) => videoFor(id))
}
