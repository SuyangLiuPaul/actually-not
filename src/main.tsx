import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { UpdatePrompt } from './components/UpdatePrompt.tsx'
import { MYTHS } from './data/myths.ts'

const container = document.getElementById('root')
if (!container) throw new Error('找不到 #root 挂载点')

// 结构化数据：hash 路由的深链搜索引擎抓不到，FAQ JSON-LD 帮它理解每条问答
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: MYTHS.map((m) => ({
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
