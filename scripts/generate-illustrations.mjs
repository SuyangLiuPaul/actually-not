#!/usr/bin/env node
/**
 * 为每条内容生成一张插画，输出到 public/illu/{id}.webp。
 *
 *   node scripts/generate-illustrations.mjs [id ...]   # 不带参数 = 全部缺的
 *
 * 用 pollinations.ai 的免费图像 API（无需密钥），统一提示词模板保证风格一致，
 * 再用 sharp 压成 640×640 webp。和 generate-og.mjs 一样只在本地跑、产物进仓库。
 * 失败或超时自动重试；个别图内容不合适可以用 --seed 重抽：
 *   node scripts/generate-illustrations.mjs fever-sweat --seed=7
 */
import { mkdir, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { MYTHS } from '../src/data/myths.ts'
import { MYTHS_EN } from '../src/data/myths-en.ts'
import SCENES from './illu-scenes.json' with { type: 'json' }

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'illu')

/** 提示词 = 人工写的场景（illu-scenes.json）+ 统一风格；缺场景时退回英文 belief */
function promptFor(id) {
  const scene =
    SCENES[id] ??
    (() => {
      const en = MYTHS_EN[id]
      if (!en) throw new Error(`插画：${id} 缺英文翻译`)
      return en.belief.split(/[—–]/)[0].trim()
    })()
  return `${scene}. Flat minimalist vector illustration, editorial magazine style, warm cream paper background (#f7f4ee), muted earthy palette with a single red accent (#c13024), soft rounded shapes, no text, no letters, no watermark`
}

async function fetchImage(prompt, seed) {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=768&height=768&model=flux&nologo=true&seed=${seed}`
  const res = await fetch(url, { signal: AbortSignal.timeout(180_000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 10_000) throw new Error(`返回太小（${buf.length}B），可能是错误页`)
  return buf
}

async function generate(id, seed) {
  const prompt = promptFor(id)
  let lastErr
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const raw = await fetchImage(prompt, seed + attempt)
      const webp = await sharp(raw)
        .resize(640, 640, { fit: 'cover' })
        .webp({ quality: 72 })
        .toBuffer()
      await writeFile(join(outDir, `${id}.webp`), webp)
      return webp.length
    } catch (err) {
      lastErr = err
      await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)))
    }
  }
  throw lastErr
}

async function main() {
  const args = process.argv.slice(2)
  const seedArg = args.find((a) => a.startsWith('--seed='))
  const seedBase = seedArg ? Number(seedArg.split('=')[1]) : 1
  const ids = args.filter((a) => !a.startsWith('--'))

  await mkdir(outDir, { recursive: true })

  // 默认只生成缺图的；指定 id 则强制重抽
  let targets = ids.length ? ids : []
  if (!ids.length) {
    for (const m of MYTHS) {
      try {
        await access(join(outDir, `${m.id}.webp`))
      } catch {
        targets.push(m.id)
      }
    }
  }
  if (!targets.length) {
    console.log('插画齐了，没有要生成的。')
    return
  }
  console.log(`要生成 ${targets.length} 张插画 → public/illu/`)

  let done = 0
  const failed = []
  // 并发 2，对免费 API 友好
  for (let i = 0; i < targets.length; i += 2) {
    const batch = targets.slice(i, i + 2)
    await Promise.all(
      batch.map(async (id, j) => {
        try {
          const size = await generate(id, seedBase * 1000 + i + j)
          done++
          console.log(`✓ ${id} (${(size / 1024).toFixed(0)} KB)`)
        } catch (err) {
          failed.push(id)
          console.error(`✗ ${id}: ${err.message}`)
        }
      }),
    )
    // 免费 API 有速率限制，批间歇一下
    await new Promise((r) => setTimeout(r, 4000))
  }
  console.log(`完成 ${done}/${targets.length}${failed.length ? `，失败：${failed.join(', ')}` : ''}`)
  if (failed.length) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
