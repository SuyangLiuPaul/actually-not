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

// 预渲染页面带着完整 HTML 来，接管即可；dev / SPA 回退页则从空开始渲染
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
