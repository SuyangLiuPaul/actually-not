#!/usr/bin/env node
// 把若干 public/illu/{id}.webp 拼成一张总览图，目视检查用：node scripts/illu-sheet.mjs out.png id1 id2 ...
import sharp from 'sharp'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [out, ...ids] = process.argv.slice(2)
const w = 480, h = 200, cols = 2
const comps = await Promise.all(ids.map(async (id, i) => ({
  input: await sharp(join(root, 'public/illu', `${id}.webp`)).resize(w, h).png().toBuffer(),
  left: (i % cols) * w, top: Math.floor(i / cols) * h })))
await sharp({ create: { width: cols * w, height: Math.ceil(ids.length / cols) * h, channels: 3, background: '#fff' } }).composite(comps).png().toFile(out)
