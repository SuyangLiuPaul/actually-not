/**
 * 预渲染：为首页和每一条内容生成真实路径的独立 HTML
 *（各自的 title / description / canonical / og），并生成 sitemap.xml 和 robots.txt。
 *
 * 由 vite.config.ts 里的 prerenderPlugin 在构建末尾调用。
 * 必须跑在 VitePWA 生成 sw.js 之前（插件数组里排它前面），
 * 这样 62 个页面才会进入 Service Worker 的预缓存清单。
 */
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ORIGIN = 'https://actually-not.netlify.app'

interface Route {
  path: string
  title: string
  description: string
}

/** 写进 HTML 属性 / 标签里的文本必须转义 */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * 按正则替换一次或全部。模板（index.html）和这里的对应关系是硬约束：
 * 任何一处匹配不到都直接让构建失败，而不是静默地产出一个 meta 没换的页面。
 */
function replaceChecked(html: string, pattern: RegExp, replacement: string, all = false): string {
  if (!pattern.test(html)) throw new Error(`预渲染：模板里匹配不到 ${pattern}`)
  return all ? html.replace(pattern, replacement) : html.replace(pattern, replacement)
}

function applyMeta(html: string, route: Route): string {
  const url = `${ORIGIN}${route.path}`
  const title = esc(route.title)
  const desc = esc(route.description)
  // 属性之间用 \s+：模板里的多行标签（换行 + 缩进）也要能匹配
  html = replaceChecked(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = replaceChecked(
    html,
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${desc}$2`,
  )
  html = replaceChecked(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
  html = replaceChecked(html, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`)
  html = replaceChecked(html, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
  // og:description 和 twitter:description 在模板里是同一个字符串，一起换
  html = replaceChecked(
    html,
    /(content=")听起来天经地义，其实证据不支持。[^"]*(")/g,
    `$1${desc}$2`,
    true,
  )
  html = replaceChecked(html, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${title}$2`)
  return html
}

export async function prerender(distDir: string, ssrDir: string): Promise<void> {
  const ssrFile = readdirSync(ssrDir).find((f) => /^entry-server\.(js|mjs)$/.test(f))
  if (!ssrFile) throw new Error(`预渲染：在 ${ssrDir} 找不到 entry-server 产物`)
  const ssr = (await import(pathToFileURL(join(ssrDir, ssrFile)).href)) as {
    render: (path: string) => string
    ROUTES: Route[]
  }

  const template = readFileSync(join(distDir, 'index.html'), 'utf8')
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('预渲染：模板里找不到 <div id="root"></div>')
  }

  for (const route of ssr.ROUTES) {
    const body = ssr.render(route.path)
    let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    if (route.path !== '/') html = applyMeta(html, route)
    const file =
      route.path === '/' ? join(distDir, 'index.html') : join(distDir, route.path.slice(1), 'index.html')
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
  }

  const today = new Date().toISOString().slice(0, 10)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ssr.ROUTES.map((r) => `  <url><loc>${ORIGIN}${r.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
  writeFileSync(join(distDir, 'sitemap.xml'), sitemap)
  writeFileSync(
    join(distDir, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`,
  )

  rmSync(ssrDir, { recursive: true, force: true })
  console.log(`预渲染完成：${ssr.ROUTES.length} 个页面 + sitemap.xml + robots.txt`)
}
