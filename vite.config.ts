import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const DESCRIPTION =
  '早上不吃饭伤身、洗完头不吹干有湿气、骨头汤补钙……61 条听起来天经地义、但证据并不支持的生活常识，每条附出处。'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      // 不设 includeAssets：下面的 globPatterns 已经覆盖了图标和 og 图，
      // 两边都写会让 precache 清单里出现重复条目。
      manifest: {
        id: '/',
        name: '其实不是 · 那些你以为对的生活常识',
        short_name: '其实不是',
        description: DESCRIPTION,
        lang: 'zh-CN',
        dir: 'ltr',
        start_url: '/',
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
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        navigateFallback: '/index.html',
        // 站点是纯静态的，整站都能预缓存 —— 装上之后完全离线可用
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      devOptions: { enabled: false },
    }),
  ],
})
