import { describe, expect, it } from 'vitest'
import { MYTHS } from '../data/myths'
import { MYTHS_EN } from '../data/myths-en'
import { REVISIONS } from '../data/revisions'
import { STAGING_REVISIONS } from '../data/revisions-staging'
import { VIDEOS } from '../data/videos'
import { PLAY_QUESTIONS } from '../data/play'
import { bundledContentSources } from './bundled'
import { buildContentPayload, contentVersion, expandEnglish, hashString } from './payload'
import { CONTENT_SCHEMA, type ContentPayload } from './schema'
import { validateContentPayload } from './validate'

const META = { contentAt: '2026-11-18T00:00:00.000Z', generatedAt: '2026-11-18T01:00:00.000Z' }
const build = () => buildContentPayload(bundledContentSources(), META)

describe('远程内容导出', () => {
  const payload = build()
  const json = JSON.stringify(payload)
  const parsed = JSON.parse(json) as ContentPayload

  it('带 schema、版本和时间', () => {
    expect(parsed.schema).toBe(CONTENT_SCHEMA)
    expect(parsed.version).toMatch(/^[0-9a-f]{28}$/)
    expect(parsed.contentAt).toBe(META.contentAt)
    expect(parsed.generatedAt).toBe(META.generatedAt)
  })

  it('经过 JSON 往返后，中文条目与打包数据完全一致（完整集合，不按平台过滤）', () => {
    expect(parsed.entries).toEqual(MYTHS)
  })

  it('英文往返后与 myths-en.ts 完全一致（出处 url 由中文补回）', () => {
    const en = expandEnglish(parsed.entries, parsed.en)
    for (const m of MYTHS) expect(en[m.id], m.id).toEqual(MYTHS_EN[m.id])
  })

  it('修订日期、视频、玩法题都在', () => {
    expect(parsed.revisions).toEqual(Object.fromEntries(Object.entries({ ...REVISIONS, ...STAGING_REVISIONS }).filter(([id]) => MYTHS.some((m) => m.id === id))))
    expect(parsed.videos).toEqual(VIDEOS)
    expect(parsed.play).toEqual(PLAY_QUESTIONS)
  })

  it('导出的就是校验器认可的格式', () => {
    const result = validateContentPayload(parsed)
    expect(result.ok ? 'ok' : result.reason).toBe('ok')
  })

  it('不重复存数据：英文出处不带 url，不重复存结构字段', () => {
    for (const t of Object.values(parsed.en)) {
      expect(t.sources.every((s) => typeof s === 'string')).toBe(true)
      expect(Object.keys(t).sort()).toEqual(['belief', 'detail', 'instead', 'origin', 'sources', 'truth'])
    }
  })

  it('体积可控（原始不到 2 MB，gzip 后不到 600 KB）', async () => {
    expect(new TextEncoder().encode(json).length).toBeLessThan(2 * 1024 * 1024)
    const gz = await new Response(new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer()
    expect(gz.byteLength).toBeLessThan(600 * 1024)
  })

  it('版本只由内容决定：时间变了版本不变，内容变了版本就变', () => {
    expect(buildContentPayload(bundledContentSources(), { ...META, generatedAt: '2030-01-01T00:00:00Z' }).version).toBe(payload.version)
    const changed = structuredClone(payload)
    changed.entries[0].truth += '。'
    expect(contentVersion(changed)).not.toBe(payload.version)
  })

  it('哈希稳定且区分相近的字符串', () => {
    expect(hashString('abc')).toBe(hashString('abc'))
    expect(hashString('abc')).not.toBe(hashString('abd'))
    expect(hashString('')).toMatch(/^[0-9a-f]{28}$/)
  })

  it('缺英文翻译时导出直接报错（不会悄悄导出半份）', () => {
    const src = bundledContentSources()
    const en = { ...src.en }
    delete en[MYTHS[0].id]
    expect(() => buildContentPayload({ ...src, en }, META)).toThrow(/缺英文/)
  })
})
