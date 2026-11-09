import { describe, expect, it } from 'vitest'
import { MYTHS } from './myths'
import { VIDEOS, VIDEO_PENDING, videoFor, videoIds } from './videos'

describe('视频数据', () => {
  it('每个键都是真实的条目 id', () => {
    const ids = new Set(MYTHS.map((m) => m.id))
    expect(Object.keys(VIDEOS).filter((id) => !ids.has(id))).toEqual([])
  })

  it('字段合法：时长为正、风格非空、youtubeId 是 PENDING 或形如 YouTube ID', () => {
    for (const [id, v] of Object.entries(VIDEOS)) {
      expect(v.durationSec, id).toBeGreaterThan(0)
      expect(v.durationSec, id).toBeLessThanOrEqual(60 * 3)
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
})
