import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import { MYTHS } from './data/myths'

/**
 * 预渲染入口（只在构建时运行，不进客户端 bundle）。
 * 客户端通过 main.tsx 的 hydrateRoot 接管生成的 HTML。
 * UpdatePrompt 依赖 Service Worker，刻意不在 SSR 图里。
 */

export interface PrerenderRoute {
  path: string
  title: string
  description: string
}

export const ROUTES: PrerenderRoute[] = [
  {
    path: '/',
    title: '其实不是 · 那些你以为对的生活常识',
    description: `早上不吃饭伤身、洗完头不吹干有湿气、骨头汤补钙……${MYTHS.length} 条听起来天经地义、但证据并不支持的生活常识，每条附出处。`,
  },
  {
    path: '/quiz',
    title: '你中了几条？｜其实不是',
    description:
      '随机抽 10 条听起来天经地义的说法，只问你信不信过，最后逐条对答案——每条都有出处。',
  },
  ...MYTHS.map((m) => ({
    path: `/${m.id}`,
    title: `${m.belief}｜其实不是`,
    description: m.truth,
  })),
]

export function render(path: string): string {
  // App 的 pathId() 在 SSR 下从这里读路径
  ;(globalThis as Record<string, unknown>).__PRERENDER_PATH__ = path
  return renderToString(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
}
