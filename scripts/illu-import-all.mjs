#!/usr/bin/env node
// 导入 ~/Downloads 里的 ILLU-<id>[ (n)].png → public/illu/<id>.webp：同 id 多份取最新；已比它新的 webp 跳过。
import { readdirSync, statSync, existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dl = join(homedir(), 'Downloads')
const best = new Map()
for (const n of readdirSync(dl)) {
  const m = n.match(/^ILLU-(.+?)(?: \(\d+\))?\.png$/)
  if (!m) continue
  const f = join(dl, n), t = statSync(f).mtimeMs
  if (!best.has(m[1]) || t > best.get(m[1]).t) best.set(m[1], { f, t })
}
let k = 0
for (const [id, { f, t }] of best) {
  const w = join(root, 'public/illu', `${id}.webp`)
  if (existsSync(w) && statSync(w).mtimeMs > t) continue
  console.log(execFileSync('node', [join(root, 'scripts/illu-import.mjs'), f, id], { encoding: 'utf8' }).trim())
  k++
}
console.log(`导入 ${k} 张`)
