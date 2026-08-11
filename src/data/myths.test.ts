import { describe, expect, it } from 'vitest'
import { MYTHS } from './myths'
import { CATEGORIES, STAKES_META, type Myth } from '../types'

const CATEGORY_IDS = new Set(CATEGORIES.map((c) => c.id))
const STAKES_IDS = new Set(Object.keys(STAKES_META))

/** 出现在正文里就说明这条还没写完 */
const PLACEHOLDERS = [/TODO/i, /FIXME/i, /待补/, /lorem ipsum/i, /XXX/]

/**
 * 每个字段的最短长度。中文很密，「吃辣会吃出胃溃疡」八个字就是完整一句，
 * 所以这里按字段分别定，而不是一刀切。目的是挡住空字符串和半句话，
 * 不是给写作定字数。
 */
const MIN_LENGTH = {
  belief: 5,
  truth: 10,
  detail: 40,
  origin: 15,
  instead: 15,
} as const

const TEXT_FIELDS = Object.keys(MIN_LENGTH) as (keyof typeof MIN_LENGTH)[]

describe('内容数据完整性', () => {
  it('有条目', () => {
    expect(MYTHS.length).toBeGreaterThan(0)
  })

  it('id 唯一', () => {
    const seen = new Map<string, number>()
    for (const m of MYTHS) seen.set(m.id, (seen.get(m.id) ?? 0) + 1)
    const dupes = [...seen.entries()].filter(([, n]) => n > 1).map(([id]) => id)
    expect(dupes).toEqual([])
  })

  it('id 是可用作 URL 片段的短横线小写形式', () => {
    const bad = MYTHS.filter((m) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(m.id)).map((m) => m.id)
    expect(bad).toEqual([])
  })

  it('belief 不重复（避免同一条被写两遍）', () => {
    const seen = new Map<string, number>()
    for (const m of MYTHS) seen.set(m.belief, (seen.get(m.belief) ?? 0) + 1)
    const dupes = [...seen.entries()].filter(([, n]) => n > 1).map(([b]) => b)
    expect(dupes).toEqual([])
  })

  describe.each(MYTHS.map((m) => [m.id, m] as const))('%s', (_id, myth: Myth) => {
    it('分类是已定义的', () => {
      expect(CATEGORY_IDS.has(myth.category)).toBe(true)
    })

    it('stakes 是已定义的', () => {
      expect(STAKES_IDS.has(myth.stakes)).toBe(true)
    })

    it.each(TEXT_FIELDS)('%s 非空且有实际内容', (field) => {
      const v = myth[field]
      expect(typeof v).toBe('string')
      expect(v.trim().length).toBeGreaterThanOrEqual(MIN_LENGTH[field])
    })

    it('正文里没有占位符', () => {
      for (const field of TEXT_FIELDS) {
        for (const p of PLACEHOLDERS) {
          expect(myth[field]).not.toMatch(p)
        }
      }
    })

    it('至少有一条出处', () => {
      expect(myth.sources.length).toBeGreaterThan(0)
    })

    it('每条出处都有说明文字', () => {
      for (const s of myth.sources) {
        expect(s.label.trim().length).toBeGreaterThan(4)
      }
    })

    it('出处链接是合法的 https 地址', () => {
      for (const s of myth.sources) {
        if (s.url === undefined) continue
        expect(() => new URL(s.url!)).not.toThrow()
        expect(new URL(s.url!).protocol).toBe('https:')
      }
    })
  })
})

describe('分类', () => {
  it('每个分类都至少有一条内容（否则筛选出来是空的）', () => {
    const empty = CATEGORIES.filter((c) => !MYTHS.some((m) => m.category === c.id)).map(
      (c) => c.id,
    )
    expect(empty).toEqual([])
  })
})

describe('相关条目', () => {
  const IDS = new Set(MYTHS.map((m) => m.id))

  it('related 里的 id 都存在、不指向自己', () => {
    for (const m of MYTHS) {
      for (const r of m.related ?? []) {
        expect(IDS.has(r), `${m.id} 链了不存在的 ${r}`).toBe(true)
        expect(r, `${m.id} 链了自己`).not.toBe(m.id)
      }
    }
  })

  it('related 是双向的（A 列了 B，B 必须回链 A）', () => {
    const byId = new Map(MYTHS.map((m) => [m.id, m]))
    for (const m of MYTHS) {
      for (const r of m.related ?? []) {
        const other = byId.get(r)!
        expect(other.related ?? [], `${r} 没有回链 ${m.id}`).toContain(m.id)
      }
    }
  })
})

describe('OG 分享图', () => {
  const OG_FILES = new Set(
    Object.keys(import.meta.glob('../../public/og/*.png')).map((p) => p.split('/').pop()),
  )

  it('每条都有对应的 public/og/{id}.png（加条目后要重跑 npm run og）', () => {
    const missing = MYTHS.filter((m) => !OG_FILES.has(`${m.id}.png`)).map((m) => m.id)
    expect(missing).toEqual([])
  })
})
