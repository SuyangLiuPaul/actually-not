import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

/**
 * 兜底：真出了渲染错误，也别只留一个白屏。
 * 顺手给一条「清掉缓存重来」的出路 —— 装成 PWA 之后，
 * 万一缓存到了一个坏版本，普通刷新是救不回来的。
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('页面渲染出错：', error, info.componentStack)
  }

  private hardReset = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations()
        await Promise.all(regs.map((r) => r.unregister()))
      }
      if ('caches' in window) {
        const keys = await caches.keys()
        await Promise.all(keys.map((k) => caches.delete(k)))
      }
    } catch {
      // 清不掉也没关系，下面照样重新加载
    }
    window.location.replace(window.location.pathname)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div
        className="mx-auto max-w-lg px-6 py-24"
        style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink)' }}
      >
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
          这一页出错了
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          抱歉，页面没能正常显示。可以先试试重新加载；如果还是不行，
          清一下本地缓存通常能解决。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg px-4 py-2 text-sm font-medium"
            style={{ background: 'var(--pen)', color: '#fff' }}
          >
            重新加载
          </button>
          <button
            onClick={() => void this.hardReset()}
            className="rounded-lg border px-4 py-2 text-sm font-medium"
            style={{ borderColor: 'var(--rule-strong)', color: 'var(--ink-soft)' }}
          >
            清除缓存后重试
          </button>
        </div>

        <details className="mt-8">
          <summary
            className="cursor-pointer text-[13px]"
            style={{ color: 'var(--ink-faint)' }}
          >
            错误详情
          </summary>
          <pre
            className="mt-2 overflow-x-auto rounded-lg border p-3 text-[12px] leading-relaxed"
            style={{ borderColor: 'var(--rule)', color: 'var(--ink-faint)' }}
          >
            {error.message}
          </pre>
        </details>

        <p className="mt-8 text-[13px]" style={{ color: 'var(--ink-faint)' }}>
          反复出现的话，欢迎到{' '}
          <a
            href="https://github.com/SuyangLiuPaul/actually-not/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            GitHub
          </a>{' '}
          提一个 issue。
        </p>
      </div>
    )
  }
}
