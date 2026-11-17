import { describe, expect, it } from 'vitest'
import { bundledContentSources } from './bundled'
import { buildContentPayload, contentVersion } from './payload'
import type { ContentPayload } from './schema'
import { validateContentPayload } from './validate'

const good = buildContentPayload(bundledContentSources(), { contentAt: '2026-11-18T00:00:00.000Z', generatedAt: '2026-11-18T00:00:00.000Z' })

/** 改一处，再把版本哈希重算成对得上的——确认是字段校验挡住的，不是哈希挡住的 */
function broken(mutate: (p: ContentPayload & Record<string, unknown>) => void, rehash = true): unknown {
  const p = structuredClone(good) as ContentPayload & Record<string, unknown>
  mutate(p)
  if (rehash && 'version' in p) try { p.version = contentVersion(p) } catch { /* 结构坏到算不了哈希也行 */ }
  return p
}

function reason(raw: unknown): string {
  const r = validateContentPayload(raw)
  return r.ok ? 'ok' : r.reason
}

describe('远程内容校验', () => {
  it('接受构建导出的完整内容', () => {
    expect(reason(good)).toBe('ok')
  })

  it.each([
    ['null', null],
    ['数组', []],
    ['字符串', 'hello'],
    ['空对象', {}],
  ])('拒绝非内容对象：%s', (_name, raw) => {
    expect(reason(raw)).not.toBe('ok')
  })

  it.each<[string, (p: ContentPayload & Record<string, unknown>) => void]>([
    ['schema 版本不对', (p) => { (p as Record<string, unknown>).schema = 2 }],
    ['缺 version', (p) => { delete (p as Partial<ContentPayload>).version }],
    ['contentAt 不是时间', (p) => { p.contentAt = 'yesterday' }],
    ['entries 为空', (p) => { p.entries = [] }],
    ['entries 缺失', (p) => { delete (p as Partial<ContentPayload>).entries }],
    ['id 重复', (p) => { p.entries.push({ ...p.entries[0] }) }],
    ['id 不是短横线小写', (p) => { p.entries[0].id = 'Bad ID' }],
    ['未知分类', (p) => { (p.entries[0] as { category: string }).category = 'medicine' }],
    ['未知 stakes', (p) => { (p.entries[0] as { stakes: string }).stakes = 'deadly' }],
    ['未知 confidence', (p) => { (p.entries[0] as { confidence: string }).confidence = 'sure' }],
    ['正文字段为空', (p) => { p.entries[0].truth = '  ' }],
    ['正文字段缺失', (p) => { delete (p.entries[0] as Partial<ContentPayload['entries'][0]>).detail }],
    ['没有出处', (p) => { p.entries[0].sources = [] }],
    ['出处不是 https', (p) => { p.entries[0].sources[0] = { label: 'x', url: 'http://example.com' } }],
    ['出处是 javascript: 链接', (p) => { p.entries[0].sources[0] = { label: 'x', url: 'javascript:alert(1)' } }],
    ['related 指向不存在的条目', (p) => { p.entries[0].related = ['no-such-entry'] }],
    ['缺某条英文', (p) => { delete p.en[p.entries[0].id] }],
    ['英文出处数量不一致', (p) => { p.en[p.entries[0].id].sources.push('extra') }],
    ['英文字段为空', (p) => { p.en[p.entries[0].id].belief = '' }],
    ['修订日期格式不对', (p) => { p.revisions[p.entries[0].id] = { added: '18/11/2026', updated: '2026-11-18' } }],
    ['视频 id 不合法', (p) => { Object.values(p.videos)[0].youtubeId = '<script>' }],
    ['视频时长不对', (p) => { Object.values(p.videos)[0].durationSec = -1 }],
    ['视频上线时间不对', (p) => { Object.values(p.videos)[0].publishAt = 'soon' }],
    ['玩法题指向不存在的条目', (p) => { p.play[0].id = 'no-such-entry' }],
    ['玩法题选项不是 3 个', (p) => { (p.play[0].choices.zh as string[]).pop() }],
    ['玩法题答案越界', (p) => { p.play[0].answer = 3 }],
  ])('拒绝：%s', (_name, mutate) => {
    expect(reason(broken(mutate))).not.toBe('ok')
  })

  it('拒绝版本哈希和内容不符的文件（半截下载 / 被改过）', () => {
    expect(reason(broken((p) => { p.entries[0].truth += '!' }, false))).toMatch(/哈希/)
  })

  it('从不抛异常', () => {
    const weird = [undefined, 0, true, { schema: 1, entries: 'x' }, { schema: 1, version: 'v', contentAt: '2026-01-01', generatedAt: '2026-01-01', entries: [null] }]
    for (const raw of weird) expect(() => validateContentPayload(raw)).not.toThrow()
  })
})
