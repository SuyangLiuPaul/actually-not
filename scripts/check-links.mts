/**
 * 链接体检：用真实浏览器（不是 curl！）跑一遍所有出处链接，报告失效的。
 *
 *   node scripts/check-links.mts            # 用本机 Chrome
 *   npx playwright install chromium         # CI 上没有 Chrome 时先装这个
 *   USE_BUNDLED_CHROMIUM=1 node scripts/check-links.mts
 *
 * 为什么必须用真实浏览器（HANDOVER 坑①）：Mayo Clinic、CDC、JAMA、BMJ、
 * Cochrane 这些站对 curl 一律返回 403，不管路径对不对。用 curl 写这个脚本
 * 会得到几十个假警报，然后可能误删掉一堆其实有效的链接。
 */
import { chromium, type Browser } from 'playwright'
import { MYTHS } from '../src/data/myths.ts'

interface Link {
  mythId: string
  label: string
  url: string
}

interface Result extends Link {
  status: number | null // null = 导航直接抛错（DNS、超时、证书……）
  finalUrl: string
  error?: string
  /** ok=能打开 / blocked=被反爬拦（403，人工复核，别当死链删） / dead=确定失效 */
  verdict: 'ok' | 'blocked' | 'dead'
}

const CONCURRENCY = 4
const NAV_TIMEOUT = 30_000
const RETRIES = 1

function collect(): Link[] {
  const links: Link[] = []
  for (const m of MYTHS) {
    for (const s of m.sources) {
      if (s.url) links.push({ mythId: m.id, label: s.label, url: s.url })
    }
  }
  return links
}

async function checkOnce(browser: Browser, link: Link): Promise<Result> {
  const context = await browser.newContext({
    ignoreHTTPSErrors: false,
    locale: 'zh-CN',
    viewport: { width: 1280, height: 900 },
    // 默认 UA 里带 HeadlessChrome，正好撞上这些站的反爬规则
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  })
  // headless 模式 navigator.webdriver=true，也是反爬的识别点
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
  })
  try {
    const page = await context.newPage()
    const resp = await page.goto(link.url, {
      waitUntil: 'domcontentloaded',
      timeout: NAV_TIMEOUT,
    })
    const status = resp?.status() ?? null
    // 有些站先 200 再靠 JS 跳错误页，给一次补判的机会
    await page.waitForTimeout(1500)
    const finalUrl = page.url()
    const verdict = status === null ? 'dead' : status === 403 ? 'blocked' : status < 400 ? 'ok' : 'dead'
    return { ...link, status, finalUrl, verdict }
  } catch (err) {
    return { ...link, status: null, finalUrl: '', error: String(err).split('\n')[0], verdict: 'dead' }
  } finally {
    await context.close()
  }
}

async function check(browser: Browser, link: Link): Promise<Result> {
  let r = await checkOnce(browser, link)
  for (let i = 0; i < RETRIES && r.verdict === 'dead'; i++) r = await checkOnce(browser, link)
  return r
}

async function main() {
  const links = collect()
  console.log(`共 ${links.length} 条出处链接，开始体检（并发 ${CONCURRENCY}）……\n`)

  // 本机用系统 Chrome；CI 上设 USE_BUNDLED_CHROMIUM=1 用 playwright 自带的
  const channel = process.env.USE_BUNDLED_CHROMIUM ? undefined : 'chrome'
  const browser = await chromium.launch({
    channel,
    headless: true,
    args: ['--disable-blink-features=AutomationControlled'],
  })

  const results: Result[] = []
  let cursor = 0
  async function worker() {
    while (cursor < links.length) {
      const link = links[cursor++]
      const r = await check(browser, link)
      results.push(r)
      const mark = r.verdict === 'ok' ? '✓' : r.verdict === 'blocked' ? '?' : '✗'
      const detail = r.status ?? r.error ?? '?'
      console.log(`${mark} [${detail}] ${r.url}${r.verdict === 'ok' ? '' : `  ← ${r.mythId}「${r.label}」`}`)
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  await browser.close()

  const blocked = results.filter((r) => r.verdict === 'blocked')
  const dead = results.filter((r) => r.verdict === 'dead')
  console.log(
    `\n体检完成：${results.length - blocked.length - dead.length} 正常，` +
      `${blocked.length} 被反爬拦截（需人工复核，别当死链删），${dead.length} 确定失效`,
  )
  if (blocked.length > 0) {
    console.log('\n被反爬拦截（人工用浏览器打开确认）：')
    for (const r of blocked) console.log(`  - ${r.mythId}「${r.label}」 ${r.url}`)
  }
  if (dead.length > 0) {
    console.log('\n确定失效的链接：')
    for (const r of dead) {
      console.log(`  - ${r.mythId}「${r.label}」 ${r.url} → ${r.status ?? r.error}`)
    }
    console.log('\n处理原则（HANDOVER 第 6 节）：先找替代出处；确认不了的只保留文献信息、删掉链接。')
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
