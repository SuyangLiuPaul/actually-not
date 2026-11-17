#!/usr/bin/env node
/**
 * App Store / Play screenshots of the native app UI (dist-app, served locally), then framed with a caption.
 *   npm run app:build && node scripts/store-shots.mjs [outDir]
 * Raw captures: <outDir>/raw/<locale>-<device>-<n>.png ; framed: <outDir>/<locale>-<device>-<n>.png
 * iPhone 6.3" 1206×2622 (402×874 @3), iPad 13" 2064×2752 (1032×1376 @2).
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { extname, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist-app')
const out = process.argv[2] || join(root, 'content-staging', 'store-shots-1.2')
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.jpg': 'image/jpeg' }
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'
  try { const b = await readFile(join(dist, p)); res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' }); res.end(b) }
  catch { const b = await readFile(join(dist, 'index.html')); res.writeHead(200, { 'content-type': 'text/html' }); res.end(b) }
}).listen(8765)

const DEVICES = { iphone: { w: 402, h: 874, s: 3 }, ipad: { w: 768, h: 1024, s: 2.6875 } }
const CAPTIONS = {
  zh: ['每天三条「你信吗？」', '先猜，再看证据', '230 多条，几秒查到', '记下你改观过的事'],
  en: ['Three “Do you buy it?” a day', 'Guess first, then see the sources', '230+ myth checks, found in seconds', 'Keep track of what changed your mind'],
}
const SUB = { zh: '先别急着信 · 信不信，查过再说', en: 'Not So Fast · Let’s check' }

const browser = await chromium.launch({ channel: 'chrome' })
await mkdir(join(out, 'raw'), { recursive: true })
for (const locale of ['zh', 'en']) {
  for (const [dev, d] of Object.entries(DEVICES)) {
    const ctx = await browser.newContext({ viewport: { width: d.w, height: d.h }, deviceScaleFactor: d.s, locale: locale === 'zh' ? 'zh-CN' : 'en-US', colorScheme: 'light' })
    await ctx.addInitScript((l) => { try { localStorage.setItem('app-locale', l) } catch {} }, locale)
    const page = await ctx.newPage()
    await page.goto('http://localhost:8765/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1200)
    const shot = async (n) => { await page.waitForTimeout(700); await page.screenshot({ path: join(out, 'raw', `${locale}-${dev}-${n}.png`) }) }
    await shot(1)                                                     // Today: ask
    await page.locator('button.stance').first().click(); await shot(2) // Today: reveal
    for (let i = 0; i < 2; i++) { const b = page.locator('button.stance').first(); if (await b.count()) { await b.click(); await page.waitForTimeout(400) } }
    await page.locator('.app-bottom-nav button').nth(1).click(); await page.evaluate(() => window.scrollTo(0, 0)); await shot(3) // Library
    await page.locator('.app-bottom-nav button').nth(2).click(); await page.evaluate(() => window.scrollTo(0, 0)); await shot(4) // Journal
    await ctx.close()
  }
}
// framing: caption on a paper ground, screen in a rounded frame
for (const locale of ['zh', 'en']) {
  for (const [dev, d] of Object.entries(DEVICES)) {
    for (let n = 1; n <= 4; n++) {
      const W = d.w, H = d.h
      const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: d.s })
      const page = await ctx.newPage()
      const img = (await readFile(join(out, 'raw', `${locale}-${dev}-${n}.png`))).toString('base64')
      const scale = dev === 'ipad' ? 0.74 : 0.78
      await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
        html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:linear-gradient(180deg,#fbf7f0,#ede5d6);font-family:${locale === 'zh' ? '"PingFang SC","Hiragino Sans GB"' : '"SF Pro Display","Helvetica Neue"'},sans-serif;color:#1d1b18}
        .cap{position:absolute;top:${Math.round(H * 0.055)}px;left:0;right:0;text-align:center;padding:0 ${Math.round(W * 0.07)}px}
        h1{margin:0;font-size:${Math.round(W * (dev === 'ipad' ? 0.052 : 0.074))}px;font-weight:700;letter-spacing:${locale === 'zh' ? '0.02em' : '-0.01em'};line-height:1.2;text-wrap:balance}
        h1 .mark{background:linear-gradient(transparent 62%,rgba(217,70,58,.28) 62%)}
        p{margin:${Math.round(H * 0.012)}px 0 0;font-size:${Math.round(W * (dev === 'ipad' ? 0.022 : 0.034))}px;color:#7a6f60;letter-spacing:.02em}
        .dev{position:absolute;left:50%;bottom:-${Math.round(H * 0.035)}px;transform:translateX(-50%);width:${Math.round(W * scale)}px;border-radius:${Math.round(W * 0.07)}px;overflow:hidden;box-shadow:0 30px 70px rgba(60,40,10,.22),0 0 0 ${Math.round(W * 0.012)}px #1d1b18}
        .dev img{display:block;width:100%}
      </style></head><body><div class="cap"><h1><span class="mark">${CAPTIONS[locale][n - 1]}</span></h1><p>${SUB[locale]}</p></div><div class="dev"><img src="data:image/png;base64,${img}"></div></body></html>`)
      await page.waitForTimeout(300)
      await page.screenshot({ path: join(out, `${locale}-${dev}-${n}.png`) })
      await ctx.close()
    }
  }
}
await browser.close(); server.close()
console.log('done →', out)
