import { afterEach, describe, expect, it, vi } from 'vitest'
import { MYTHS } from './myths'
import { filterMythsForPlatform, ANDROID_EXCLUDED_CATEGORIES } from './platform'

const EXCLUDED = new Set<string>(ANDROID_EXCLUDED_CATEGORIES)

describe('平台过滤：Android 包不含急救与身体', () => {
  const android = filterMythsForPlatform(MYTHS, 'android')

  it('网站 / iOS 保留全部条目', () => {
    expect(filterMythsForPlatform(MYTHS, undefined)).toHaveLength(MYTHS.length)
    expect(filterMythsForPlatform(MYTHS, 'ios')).toHaveLength(MYTHS.length)
  })

  it('Android 版没有 urgent / body 条目，且其余条目一条没少', () => {
    expect(android.filter((m) => EXCLUDED.has(m.category))).toEqual([])
    const removed = MYTHS.filter((m) => EXCLUDED.has(m.category)).length
    expect(removed).toBeGreaterThan(0)
    expect(android).toHaveLength(MYTHS.length - removed)
  })

  it('Android 版 related 没有断链，也不指向被排除的条目', () => {
    const ids = new Set(android.map((m) => m.id))
    const dangling = android.flatMap((m) => (m.related ?? []).filter((r) => !ids.has(r)).map((r) => `${m.id} -> ${r}`))
    expect(dangling).toEqual([])
  })

  it('其余条目的 related 仍然双向互链', () => {
    const byId = new Map(android.map((m) => [m.id, m]))
    const bad = android.flatMap((m) => (m.related ?? []).filter((r) => !byId.get(r)?.related?.includes(m.id)).map((r) => `${m.id} -> ${r}`))
    expect(bad).toEqual([])
  })

  it('不改动传入的数据', () => {
    const before = MYTHS.map((m) => m.related?.length ?? 0)
    filterMythsForPlatform(MYTHS, 'android')
    expect(MYTHS.map((m) => m.related?.length ?? 0)).toEqual(before)
  })
})

describe('平台过滤接入真实数据层（VITE_APP_PLATFORM=android）', () => {
  afterEach(() => { vi.unstubAllEnvs(); vi.resetModules() })

  it('MYTHS、CATEGORIES、英文列表、玩法题库都看不到 urgent / body', async () => {
    vi.stubEnv('VITE_APP_PLATFORM', 'android')
    vi.resetModules()
    const { MYTHS: filtered } = await import('./myths')
    const { CATEGORIES } = await import('../types')
    const { mythsFor } = await import('./localized')
    const { PLAY_QUESTIONS } = await import('./play')
    expect(filtered.some((m) => EXCLUDED.has(m.category))).toBe(false)
    expect(CATEGORIES.some((c) => EXCLUDED.has(c.id))).toBe(false)
    expect(mythsFor('en')).toHaveLength(filtered.length)
    const ids = new Set(filtered.map((m) => m.id))
    expect(filtered.flatMap((m) => (m.related ?? []).filter((r) => !ids.has(r)))).toEqual([])
    expect(PLAY_QUESTIONS.every((q) => ids.has(q.id))).toBe(true)
  })

  it('默认（无平台）仍然是完整数据', async () => {
    vi.resetModules()
    const { CATEGORIES } = await import('../types')
    expect(CATEGORIES.some((c) => c.id === 'urgent')).toBe(true)
    expect(CATEGORIES.some((c) => c.id === 'body')).toBe(true)
  })
})
