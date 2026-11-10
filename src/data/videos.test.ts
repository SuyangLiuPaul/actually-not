import { describe, expect, it } from 'vitest'
import { MYTHS } from './myths'
import { VIDEOS, VIDEO_PENDING, isLive, publishLabel, videoFor, videoIds } from './videos'

describe('视频数据', () => {
  it('每个键都是真实的条目 id', () => {
    const ids = new Set(MYTHS.map((m) => m.id))
    expect(Object.keys(VIDEOS).filter((id) => !ids.has(id))).toEqual([])
  })

  it('字段合法：时长为正、风格非空、youtubeId 是 PENDING 或形如 YouTube ID', () => {
    for (const [id, v] of Object.entries(VIDEOS)) {
      expect(v.durationSec, id).toBeGreaterThan(0)
      expect(v.durationSec, id).toBeLessThanOrEqual(v.landscape ? 60 * 10 : 60 * 3)   // 竖屏短片 ≤3 分钟；横屏长片 ≤10 分钟
      expect(v.style.length, id).toBeGreaterThan(0)
      expect(v.youtubeId === VIDEO_PENDING || /^[A-Za-z0-9_-]{6,20}$/.test(v.youtubeId), id).toBe(true)
    }
  })

  it('PENDING 的条目不产生视频（界面什么都不渲染）', () => {
    for (const [id, v] of Object.entries(VIDEOS)) {
      if (v.youtubeId === VIDEO_PENDING) expect(videoFor(id)).toBeUndefined()
    }
    expect(videoFor('不存在')).toBeUndefined()
    expect(videoIds().every((id) => videoFor(id))).toBe(true)
  })
  it('publishAt 之前不算公开，之后算；日期标签按墨尔本日历日', () => {
    const v = VIDEOS['origin-great-wall-from-space']
    expect(v.publishAt).toBe('2026-11-12T17:00:00+11:00')
    expect(isLive(v, new Date('2026-11-12T05:59:00Z'))).toBe(false)
    expect(isLive(v, new Date('2026-11-12T06:00:00Z'))).toBe(true)
    expect(publishLabel(v, 'zh')).toBe('11月12日')
    for (const [id, x] of Object.entries(VIDEOS)) if (x.publishAt) expect(Number.isNaN(Date.parse(x.publishAt)), id).toBe(false)
  })
})
