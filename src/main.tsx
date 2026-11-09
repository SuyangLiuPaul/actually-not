import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { UpdatePrompt } from './components/UpdatePrompt.tsx'
import { Capacitor } from '@capacitor/core'
import NativeApp from './native/NativeApp'
import { mythsFor } from './data/localized.ts'
import { parsePath } from './i18n.ts'

const container = document.getElementById('root')
if (!container) throw new Error('找不到 #root 挂载点')

// 旧链接 /m/<条目>/（YouTube 简介里用过）→ 条目真实地址。服务器有 301，
// 但装过 service worker 的回访者会被离线首页兜住，所以这里再跳一次。
const legacy = window.location.pathname.match(/^\/(en\/)?m\/(.+)$/)
if (legacy) window.location.replace(`/${legacy[1] ?? ''}${legacy[2]}${window.location.search}${window.location.hash}`)

// 结构化数据：每条内容以 FAQ JSON-LD 暴露给搜索引擎；语言跟着当前页面走
const locale = parsePath(window.location.pathname).locale
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: mythsFor(locale).map((m) => ({
    '@type': 'Question',
    name: m.belief,
    acceptedAnswer: { '@type': 'Answer', text: `${m.truth}\n\n${m.detail}` },
  })),
}
const ldScript = document.createElement('script')
ldScript.type = 'application/ld+json'
ldScript.textContent = JSON.stringify(faqLd)
document.head.appendChild(ldScript)

const appShell = Capacitor.isNativePlatform() || import.meta.env.VITE_APP_SHELL === 'true' || /^\/app\/?$/.test(window.location.pathname)
const app = (
  <StrictMode>
    <ErrorBoundary>
      {appShell ? <NativeApp /> : <App />}
      {!Capacitor.isNativePlatform() && <UpdatePrompt />}
    </ErrorBoundary>
  </StrictMode>
)

// 离线回退可能拿到首页 HTML，但当前 URL 是英文页或条目页。
// 只有同一路径且没有客户端分类参数时才接管；否则按真实 URL 重新渲染。
const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/'
const samePage = container.dataset.prerenderPath !== undefined &&
  normalizePath(container.dataset.prerenderPath) === normalizePath(window.location.pathname)
const hasCategory = new URLSearchParams(window.location.search).has('c')
if (container.hasChildNodes() && samePage && !hasCategory && !appShell) hydrateRoot(container, app)
else {
  container.replaceChildren()
  createRoot(container).render(app)
}
