#!/usr/bin/env node
/**
 * 从 git 历史生成每条内容的收录/最近修订日期，输出到 src/data/revisions.ts。
 *
 *   node scripts/generate-revisions.mjs
 *
 * 和插画、OG 一样：本地跑一次、产物提交进仓库（构建机上可能没有完整 git 历史）。
 * 判断标准：某个 id 第一次出现在 myths.ts 的提交日期 = 收录；最后一次出现变动的 = 修订。
 * 加条目或改正文之后重跑一次即可。
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MYTHS } from '../src/data/myths.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outFile = join(root, 'src', 'data', 'revisions.ts')

function dates(id) {
  const out = execFileSync(
    'git',
    ['log', '--format=%ad', '--date=short', '-S', `id: '${id}'`, '--', 'src/data/myths.ts'],
    { cwd: root, encoding: 'utf8' },
  ).trim()
  if (!out) return null
  const all = out.split('\n')
  return { added: all[all.length - 1], updated: all[0] }
}

const revisions = {}
let missing = 0
for (const m of MYTHS) {
  const d = dates(m.id)
  if (d) revisions[m.id] = d
  else {
    missing++
    console.warn(`⚠ ${m.id} 在 git 历史里找不到（未提交的新条目？）`)
  }
}

const body = `/** 生成物（scripts/generate-revisions.mjs），不要手改 */
export const REVISIONS: Record<string, { added: string; updated: string }> =
  ${JSON.stringify(revisions, null, 2)}
`
writeFileSync(outFile, body)
console.log(`修订记录生成完毕：${Object.keys(revisions).length} 条 → src/data/revisions.ts`)
if (missing) process.exit(1)
