import { defineConfig, build as viteBuild, type Plugin } from 'vite'
import { resolve } from 'node:path'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { prerender } from './scripts/prerender.ts'

/**
 * 构建末尾：SSR 打包 → 给首页和每条内容预渲染真实路径的 HTML。
 * 必须排在 VitePWA 前面——closeBundle 按插件顺序执行，
 * 这样 62 个页面才会进入 sw.js 的预缓存清单。
 */
function prerenderPlugin(): Plugin {
  return {
    name: 'actually-not-prerender',
    apply: 'build',
    async closeBundle() {
      await viteBuild({
        configFile: false,
        logLevel: 'silent',
        plugins: [react()],
        build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', emptyOutDir: true },
      })
      await prerender(resolve('dist'), resolve('dist-ssr'))
      mkdirSync(resolve('dist/app'), { recursive: true })
      writeFileSync(resolve('dist/app/index.html'), readFileSync(resolve('dist/index.html'), 'utf8'))
    },
  }
}

const DESCRIPTION =
  '早上不吃饭伤身、鲁迅说过的名言、电影里的桥段……一百多条听起来天经地义、但证据并不支持的说法，每条附出处。'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerenderPlugin(),
    VitePWA({
      registerType: 'prompt',
      // 不设 includeAssets：下面的 globPatterns 已经覆盖了图标和 og 图，
      // 两边都写会让 precache 清单里出现重复条目。
      manifest: {
        id: '/',
        name: '其实不是 · 那些你以为对的常识、名言和故事',
        short_name: '其实不是',
        description: DESCRIPTION,
        lang: 'zh-CN',
        dir: 'ltr',
        start_url: '/app/',
        scope: '/',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui', 'browser'],
        orientation: 'any',
        background_color: '#f7f4ee',
        theme_color: '#f7f4ee',
        categories: ['health', 'education', 'reference'],
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          {
            src: '/icons/maskable-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
        shortcuts: [
          {
            name: '随便看一条',
            short_name: '随便看',
            url: '/?random=1',
            description: '随机打开一条，看缘分',
          },
          {
            name: '关键时刻：照做会出事的',
            short_name: '关键时刻',
            url: '/?c=urgent',
            description: '急救类误区，信错了真的有风险',
          },
          {
            name: '名言没说过：被误传的名言',
            short_name: '名言',
            url: '/?c=quote',
            description: '这句话，其实不是他说的',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,ico,webmanifest}'],
        // 每条的 OG 分享图是给爬虫看的，不进预缓存（61 张约 3MB，会拖慢 SW 安装）
        // 预渲染出的每条/每页 HTML（458 个，各约 430KB）只给爬虫和首屏用，不进预缓存：
        // 离线时任何路由都回退到 index.html，由客户端按 URL 渲染（内容都在 JS 包里）。
        globIgnores: ['og/**', 'town/**', '*/index.html', '*/*/index.html'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/town(?:\/|\?|$)/],
        // 站点是纯静态的，整站都能预缓存 —— 装上之后完全离线可用
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      devOptions: { enabled: false },
    }),
  ],
})
