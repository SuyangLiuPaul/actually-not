import { afterEach, describe, expect, it, vi } from 'vitest'
import { MYTHS } from '../data/myths'
import { mythsFor } from '../data/localized'
import { videoFor } from '../data/videos'
import { playQuestions } from '../data/play'
import { ANDROID_EXCLUDED_CATEGORIES } from '../data/platform'
import { contentOverride, setContentOverride } from './current'
import { bundledContentSources } from './bundled'
import { buildContentPayload, contentVersion } from './payload'
import { judgeContent, loadCachedContent, refreshRemoteContent, snapshotFromPayload, startRemoteContent, type ContentMeta, type LoaderDeps } from './loader'
import type { ContentPayload, ContentSnapshot } from './schema'

const EXCLUDED = new Set<string>(ANDROID_EXCLUDED_CATEGORIES)
const BUNDLED: ContentMeta = { version: 'bundled-v', contentAt: '2026-11-10T00:00:00.000Z', count: MYTHS.length }

function payloadAt(contentAt: string, mutate?: (p: ContentPayload) => void): ContentPayload {
  const p = buildContentPayload(bundledContentSources(), { contentAt, generatedAt: contentAt })
  if (mutate) { mutate(p); p.version = contentVersion(p) }
  return p
}

/** 加一条新条目（模拟发了新内容），顺带给它一个视频 */
function withNewEntry(p: ContentPayload) {
  const base = p.entries.find((m) => m.category === 'film')!
  p.entries.push({ ...base, id: 'brand-new-entry', belief: `${base.belief}（新）`, related: [] })
  p.en['brand-new-entry'] = { ...p.en[base.id] }
  p.videos['brand-new-entry'] = { youtubeId: 'abcdefghijk', durationSec: 50, style: 'Stickman' }
}

function harness(opts: { cached?: string | null; remote?: string | (() => Promise<string>); platform?: string; active?: ContentMeta; bad?: string } = {}) {
  let stored = opts.cached ?? null
  let active = opts.active ?? BUNDLED
  const applied: ContentSnapshot[] = []
  const writes: string[] = []
  const deps: LoaderDeps = {
    platform: opts.platform,
    storage: { read: async () => stored, write: async (t) => { stored = t; writes.push(t) } },
    fetchText: async () => {
      if (opts.remote === undefined) throw new Error('offline')
      return typeof opts.remote === 'string' ? opts.remote : opts.remote()
    },
    active: () => active,
    apply: (s) => { applied.push(s); active = { version: s.version, contentAt: s.contentAt, count: s.entries.length } },
    badVersion: () => opts.bad ?? null,
    timeoutMs: 50,
  }
  return { deps, applied, writes, stored: () => stored }
}

afterEach(() => { setContentOverride(null) })

describe('远程内容加载：缓存', () => {
  it('缓存比打包数据新 → 换上', async () => {
    const h = harness({ cached: JSON.stringify(payloadAt('2026-11-15T00:00:00Z', withNewEntry)) })
    expect(await loadCachedContent(h.deps)).toBe('applied')
    expect(h.applied[0].entries.some((m) => m.id === 'brand-new-entry')).toBe(true)
  })

  it('缓存比打包数据旧（比如商店刚更新过）→ 不用，继续用打包数据', async () => {
    const h = harness({ cached: JSON.stringify(payloadAt('2026-11-01T00:00:00Z', withNewEntry)) })
    expect(await loadCachedContent(h.deps)).toBe('not-newer')
    expect(h.applied).toEqual([])
  })

  it('缓存和打包数据是同一版本 → 不用', async () => {
    const p = payloadAt('2026-11-15T00:00:00Z')
    const h = harness({ cached: JSON.stringify(p), active: { ...BUNDLED, version: p.version } })
    expect(await loadCachedContent(h.deps)).toBe('not-newer')
  })

  it.each([
    ['半截文件', (s: string) => s.slice(0, s.length / 2)],
    ['不是 JSON', () => '<html>offline</html>'],
    ['结构坏了', (s: string) => s.replace('"schema":1', '"schema":"1"')],
  ])('缓存坏了（%s）→ 不用，不报错', async (_name, corrupt) => {
    const h = harness({ cached: corrupt(JSON.stringify(payloadAt('2026-11-15T00:00:00Z'))) })
    expect(['invalid']).toContain(await loadCachedContent(h.deps))
    expect(h.applied).toEqual([])
  })

  it('没有缓存 / 读缓存出错 → 不用，不报错', async () => {
    expect(await loadCachedContent(harness().deps)).toBe('missing')
    const h = harness()
    h.deps.storage.read = async () => { throw new Error('disk') }
    expect(await loadCachedContent(h.deps)).toBe('error')
  })

  it('曾导致界面出错的版本 → 不再用', async () => {
    const p = payloadAt('2026-11-15T00:00:00Z', withNewEntry)
    const h = harness({ cached: JSON.stringify(p), bad: p.version })
    expect(await loadCachedContent(h.deps)).toBe('bad-version')
  })
})

describe('远程内容加载：拉取', () => {
  it('远程更新 → 先存缓存，再换上', async () => {
    const text = JSON.stringify(payloadAt('2026-11-16T00:00:00Z', withNewEntry))
    const h = harness({ remote: text })
    expect(await refreshRemoteContent(h.deps)).toBe('applied')
    expect(h.stored()).toBe(text)
    expect(h.applied).toHaveLength(1)
  })

  it('下次启动用缓存里的那份', async () => {
    const text = JSON.stringify(payloadAt('2026-11-16T00:00:00Z', withNewEntry))
    const first = harness({ remote: text })
    await refreshRemoteContent(first.deps)
    const next = harness({ cached: first.stored() })
    expect(await loadCachedContent(next.deps)).toBe('applied')
    expect(next.applied[0].version).toBe(first.applied[0].version)
  })

  it('没网 → 保持当前内容，不动缓存', async () => {
    const cached = JSON.stringify(payloadAt('2026-11-15T00:00:00Z'))
    const h = harness({ cached })
    expect(await refreshRemoteContent(h.deps)).toBe('error')
    expect(h.stored()).toBe(cached)
    expect(h.applied).toEqual([])
  })

  it('超时 → 放弃，保持当前内容', async () => {
    const h = harness({ remote: () => new Promise<string>(() => {}) })
    expect(await refreshRemoteContent(h.deps)).toBe('error')
    expect(h.applied).toEqual([])
  })

  it('远程坏了 → 不存、不换', async () => {
    const h = harness({ remote: '{"schema":1,"entries":[]}' })
    expect(await refreshRemoteContent(h.deps)).toBe('invalid')
    expect(h.writes).toEqual([])
    expect(h.applied).toEqual([])
  })

  it('条目数骤降超过 20% → 当作坏数据，不存、不换', async () => {
    const text = JSON.stringify(payloadAt('2026-11-16T00:00:00Z', (p) => {
      const keep = new Set(p.entries.slice(0, Math.floor(p.entries.length * 0.7)).map((m) => m.id))
      p.entries = p.entries.filter((m) => keep.has(m.id)).map((m) => ({ ...m, related: (m.related ?? []).filter((r) => keep.has(r)) }))
      p.en = Object.fromEntries(Object.entries(p.en).filter(([id]) => keep.has(id)))
      p.play = p.play.filter((q) => keep.has(q.id))
    }))
    const h = harness({ remote: text })
    expect(await refreshRemoteContent(h.deps)).toBe('dropped')
    expect(h.writes).toEqual([])
  })

  it('少几条（下架个别条目）可以接受', async () => {
    const text = JSON.stringify(payloadAt('2026-11-16T00:00:00Z', (p) => {
      const drop = p.entries.find((m) => !m.related?.length && !p.play.some((q) => q.id === m.id))!.id
      p.entries = p.entries.filter((m) => m.id !== drop)
      delete p.en[drop]
    }))
    expect(await refreshRemoteContent(harness({ remote: text }).deps)).toBe('applied')
  })

  it('远程和当前一样新 → 不换', async () => {
    const p = payloadAt('2026-11-16T00:00:00Z', withNewEntry)
    const h = harness({ remote: JSON.stringify(p), active: { version: p.version, contentAt: p.contentAt, count: p.entries.length } })
    expect(await refreshRemoteContent(h.deps)).toBe('not-newer')
  })

  it('完整流程：缓存先换上，远程更新的再换一次', async () => {
    const h = harness({
      cached: JSON.stringify(payloadAt('2026-11-15T00:00:00Z')),
      remote: JSON.stringify(payloadAt('2026-11-16T00:00:00Z', withNewEntry)),
    })
    expect(await startRemoteContent(h.deps)).toEqual({ cached: 'applied', remote: 'applied' })
    expect(h.applied.map((s) => s.contentAt)).toEqual(['2026-11-15T00:00:00Z', '2026-11-16T00:00:00Z'])
  })

  it('远程比已换上的缓存旧（重新部署了旧提交）→ 不倒退', async () => {
    const h = harness({
      cached: JSON.stringify(payloadAt('2026-11-16T00:00:00Z', withNewEntry)),
      remote: JSON.stringify(payloadAt('2026-11-15T00:00:00Z')),
    })
    expect(await startRemoteContent(h.deps)).toEqual({ cached: 'applied', remote: 'not-newer' })
  })
})

describe('远程内容：Android 继续过滤医疗分类', () => {
  const payload = payloadAt('2026-11-16T00:00:00Z', withNewEntry)

  it('远程数据本身含 urgent / body（网站和 iOS 要用）', () => {
    expect(payload.entries.some((m) => EXCLUDED.has(m.category))).toBe(true)
  })

  it('Android：条目、related、英文、视频、修订日期、玩法题里都没有 urgent / body', () => {
    const s = snapshotFromPayload(payload, 'android')
    const ids = new Set(s.entries.map((m) => m.id))
    const droppedIds = payload.entries.filter((m) => EXCLUDED.has(m.category)).map((m) => m.id)
    expect(s.entries.some((m) => EXCLUDED.has(m.category))).toBe(false)
    expect(s.entries.flatMap((m) => (m.related ?? []).filter((r) => !ids.has(r)))).toEqual([])
    for (const id of droppedIds) {
      expect(s.en[id]).toBeUndefined()
      expect(s.videos[id]).toBeUndefined()
      expect(s.revisions[id]).toBeUndefined()
    }
    expect(s.play.every((q) => ids.has(q.id))).toBe(true)
    expect(s.entries).toHaveLength(payload.entries.length - droppedIds.length)
    expect(s.entries.some((m) => m.id === 'brand-new-entry')).toBe(true)
  })

  it('tongue-map（body）的视频在 Android 不出现', () => {
    expect(payload.videos['tongue-map']).toBeDefined()
    expect(snapshotFromPayload(payload, 'android').videos['tongue-map']).toBeUndefined()
  })

  it('iOS / 无平台：保留全部条目', () => {
    expect(snapshotFromPayload(payload, 'ios').entries).toHaveLength(payload.entries.length)
    expect(snapshotFromPayload(payload, undefined).entries).toHaveLength(payload.entries.length)
  })

  it('经加载器换上后，Android 的条目数比较按过滤后的数目算（不会因为少了医疗条目被当成骤降）', async () => {
    const androidCount = MYTHS.filter((m) => !EXCLUDED.has(m.category)).length
    const h = harness({ remote: JSON.stringify(payload), platform: 'android', active: { ...BUNDLED, count: androidCount } })
    expect(await refreshRemoteContent(h.deps)).toBe('applied')
    expect(h.applied[0].entries.some((m) => EXCLUDED.has(m.category))).toBe(false)
  })

  it('换上之后，界面读到的数据（mythsFor / videoFor / 玩法题）也没有 urgent / body', () => {
    setContentOverride(snapshotFromPayload(payload, 'android'))
    for (const locale of ['zh', 'en'] as const) {
      const list = mythsFor(locale)
      expect(list.some((m) => EXCLUDED.has(m.category))).toBe(false)
      expect(list.some((m) => m.id === 'brand-new-entry')).toBe(true)
    }
    expect(videoFor('tongue-map')).toBeUndefined()
    expect(videoFor('brand-new-entry')?.youtubeId).toBe('abcdefghijk')
    const ids = new Set(mythsFor('zh').map((m) => m.id))
    expect(playQuestions().every((q) => ids.has(q.id))).toBe(true)
  })
})

describe('数据访问层：换内容与回退', () => {
  it('没有远程内容时，读的就是打包数据（网站的行为不变）', () => {
    expect(contentOverride()).toBeNull()
    expect(mythsFor('zh')).toBe(MYTHS)
  })

  it('换上远程内容后英文文字来自远程，清掉后回到打包数据', () => {
    const p = payloadAt('2026-11-16T00:00:00Z', (q) => { q.en[q.entries[0].id].truth = 'Remote English truth.' })
    setContentOverride(snapshotFromPayload(p, undefined))
    expect(mythsFor('en')[0].truth).toBe('Remote English truth.')
    expect(mythsFor('en')[0].sources).toEqual(mythsFor('zh')[0].sources.map((s, i) => ({ ...s, label: p.en[p.entries[0].id].sources[i] })))
    setContentOverride(null)
    expect(mythsFor('zh')).toBe(MYTHS)
  })

  it('judgeContent 不碰存储和界面', () => {
    const apply = vi.fn()
    const r = judgeContent(JSON.stringify(payloadAt('2026-11-16T00:00:00Z')), { platform: undefined, active: () => BUNDLED })
    expect(r.ok).toBe(true)
    expect(apply).not.toHaveBeenCalled()
  })
})
