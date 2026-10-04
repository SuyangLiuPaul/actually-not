#!/usr/bin/env node
/**
 * 把审核通过的 content-staging/approved/*.json 合并成两份 TS 数据：
 *   src/data/myths-extra.ts      中文条目（Myth[]）
 *   src/data/myths-en-extra.ts   英文翻译（Record<id, MythText>）
 * 并校验：id 唯一、不撞现有 id、字段齐全、英文 sources 与中文 url 一致。
 * 不在构建里跑；只在本地整合内容时跑，产物提交进仓库。
 *
 *   node scripts/merge-staging.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'content-staging', 'approved')
const CATS = new Set(['quote', 'film', 'origin', 'word', 'why'])
const STAKES = new Set(['harmless', 'wasteful', 'risky'])
const CONF = new Set(['strong', 'limited', 'debated'])

const base = readFileSync(join(root, 'src/data/myths.ts'), 'utf8')
const existing = new Set([...base.matchAll(/^\s*id: '([a-z0-9-]+)'/gm)].map((m) => m[1]))

const onlyIllustrated = process.argv.includes('--only-illustrated')
const files = readdirSync(dir).filter((f) => f.endsWith('.json')).sort()
const all = []
for (const f of files) all.push(...JSON.parse(readFileSync(join(dir, f), 'utf8')).map((e) => ({ ...e, _file: f })))
// --only-illustrated：还没出插画的条目先留在 staging，不进站（等插画齐了再合并）
if (onlyIllustrated) {
  const have = new Set(readdirSync(join(root, 'public', 'illu')).map((n) => n.replace(/\.webp$/, '')))
  const skipped = all.filter((e) => !have.has(e.id)).map((e) => e.id)
  all.splice(0, all.length, ...all.filter((e) => have.has(e.id)))
  console.log(`跳过 ${skipped.length} 条（无插画）`)
}

const errs = []
const seen = new Set()
for (const e of all) {
  const where = `${e._file}:${e.id}`
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id ?? '')) errs.push(`${where} id 格式`)
  if (existing.has(e.id)) errs.push(`${where} 撞现有 id`)
  if (seen.has(e.id)) errs.push(`${where} 批内重复`)
  seen.add(e.id)
  if (!CATS.has(e.category)) errs.push(`${where} category`)
  if (!STAKES.has(e.stakes)) errs.push(`${where} stakes`)
  if (!CONF.has(e.confidence)) errs.push(`${where} confidence`)
  for (const k of ['belief', 'truth', 'detail', 'origin', 'instead']) {
    if (typeof e[k] !== 'string' || !e[k].trim()) errs.push(`${where} 缺 ${k}`)
    if (typeof e.en?.[k] !== 'string' || !e.en[k].trim()) errs.push(`${where} 缺 en.${k}`)
  }
  if (!e.sources?.length) errs.push(`${where} 无出处`)
  if ((e.en?.sources ?? []).length !== (e.sources ?? []).length) errs.push(`${where} en.sources 数量不一致`)
  for (let i = 0; i < (e.sources ?? []).length; i++) {
    if (e.sources[i].url !== e.en?.sources?.[i]?.url) errs.push(`${where} en.sources[${i}].url 不一致`)
  }
  if (!e.scene) errs.push(`${where} 缺 scene`)
}
if (errs.length) {
  console.error('校验失败：\n' + errs.join('\n'))
  process.exit(1)
}

// related：从 related-pairs.json 生成双向链接；一端是现有条目（如 cpr-hard）时，只给新条目这一端写，
// 现有条目那一端要在 myths.ts 里手动补（测试会查对称性）。
const pairs = JSON.parse(readFileSync(join(root, 'content-staging', 'related-pairs.json'), 'utf8'))
const rel = new Map(all.map((e) => [e.id, []]))
for (const [a, b] of pairs) {
  const known = (x) => rel.has(x) || existing.has(x)
  if (!known(a) || !known(b)) {
    // 另一端还没批准入库（板块没写完）就先跳过这对
    continue
  }
  if (rel.has(a)) rel.get(a).push(b)
  if (rel.has(b)) rel.get(b).push(a)
}
for (const e of all) e.related = [...new Set(rel.get(e.id))]

const zh = all.map((e) => ({
  id: e.id,
  category: e.category,
  belief: e.belief,
  truth: e.truth,
  detail: e.detail,
  origin: e.origin,
  instead: e.instead,
  stakes: e.stakes,
  confidence: e.confidence,
  sources: e.sources,
  ...(e.related?.length ? { related: e.related } : {}),
}))
const en = Object.fromEntries(
  all.map((e) => [
    e.id,
    { belief: e.en.belief, truth: e.en.truth, detail: e.en.detail, origin: e.en.origin, instead: e.en.instead, sources: e.en.sources },
  ]),
)
writeFileSync(
  join(root, 'src/data/myths-extra.ts'),
  `/**\n * 新板块（名言没说过 / 电影骗了你 / 起源是编的）的中文条目。\n * 由 scripts/merge-staging.mjs 从 content-staging/approved/ 生成，别手改；改源 JSON 后重跑。\n */\nimport type { Myth } from '../types'\n\nexport const MYTHS_EXTRA: Myth[] = ${JSON.stringify(zh, null, 2)}\n`,
)
writeFileSync(
  join(root, 'src/data/myths-en-extra.ts'),
  `/**\n * 新板块条目的英文翻译。由 scripts/merge-staging.mjs 生成，别手改。\n */\nimport type { MythText } from '../types'\n\nexport const MYTHS_EN_EXTRA: Record<string, MythText> = ${JSON.stringify(en, null, 2)}\n`,
)
writeFileSync(
  join(root, 'content-staging', 'approved-scenes.json'),
  JSON.stringify(Object.fromEntries(all.map((e) => [e.id, e.scene])), null, 2),
)
console.log(`合并 ${all.length} 条（${files.join(', ')}）`)
