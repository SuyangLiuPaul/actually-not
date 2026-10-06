import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { UpdatePrompt } from './components/UpdatePrompt.tsx'
import { mythsFor } from './data/localized.ts'
import { parsePath } from './i18n.ts'

const container = document.getElementById('root')
if (!container) throw new Error('找不到 #root 挂载点')

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

const app = (
  <StrictMode>
    <ErrorBoundary>
      <App />
      <UpdatePrompt />
    </ErrorBoundary>
  </StrictMode>
)

// 离线回退可能拿到首页 HTML，但当前 URL 是英文页或条目页。
// 只有同一路径且没有客户端分类参数时才接管；否则按真实 URL 重新渲染。
const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/'
const samePage = container.dataset.prerenderPath !== undefined &&
  normalizePath(container.dataset.prerenderPath) === normalizePath(window.location.pathname)
const hasCategory = new URLSearchParams(window.location.search).has('c')
if (container.hasChildNodes() && samePage && !hasCategory) hydrateRoot(container, app)
else {
  container.replaceChildren()
  createRoot(container).render(app)
}
