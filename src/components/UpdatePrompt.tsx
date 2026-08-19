import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { STRINGS, parsePath } from '../i18n'

/**
 * 两种提示，都是右下角一条不挡路的小横幅：
 *  1. 内容更新了 —— 让用户自己决定什么时候刷新，不在阅读中途把页面换掉
 *  2. 首次装好、可离线使用 —— 出现几秒后自动消失
 */
export function UpdatePrompt() {
  // 只在客户端挂载，直接读路径判断语言
  const [locale] = useState(() =>
    typeof window !== 'undefined' ? parsePath(window.location.pathname).locale : 'zh',
  )
  const t = STRINGS[locale]
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(err) {
      console.warn('Service worker 注册失败，站点仍可正常使用：', err)
    },
  })

  const [reloading, setReloading] = useState(false)

  // 「可离线使用」是个纯粹的好消息，不需要用户操作，几秒后自己收起
  useEffect(() => {
    if (!offlineReady) return
    const t = setTimeout(() => setOfflineReady(false), 5000)
    return () => clearTimeout(t)
  }, [offlineReady, setOfflineReady])

  if (!offlineReady && !needRefresh) return null

  const dismiss = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="rise fixed right-4 bottom-4 left-4 z-60 mx-auto max-w-sm rounded-xl border p-4 sm:left-auto"
      style={{
        background: 'var(--paper-raised)',
        borderColor: 'var(--rule-strong)',
        boxShadow: 'var(--shadow-lift)',
      }}
    >
      {needRefresh ? (
        <>
          <p className="text-sm font-medium">{t.updateNew}</p>
          <p className="mt-1 text-[13px]" style={{ color: 'var(--ink-soft)' }}>
            {t.updateNewBody}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setReloading(true)
                void updateServiceWorker(true)
              }}
              disabled={reloading}
              className="rounded-lg px-3 py-1.5 text-[13px] font-medium transition-transform active:scale-[0.97] disabled:opacity-60"
              style={{ background: 'var(--pen)', color: '#fff' }}
            >
              {reloading ? t.updateReloading : t.updateReload}
            </button>
            <button
              onClick={dismiss}
              className="rounded-lg px-3 py-1.5 text-[13px] font-medium"
              style={{ color: 'var(--ink-soft)' }}
            >
              {t.updateLater}
            </button>
          </div>
        </>
      ) : (
        <p className="text-[13px]" style={{ color: 'var(--ink-soft)' }}>
          <span className="font-medium" style={{ color: 'var(--ink)' }}>
            {t.updateOffline}
          </span>{' '}
          {t.updateOfflineTail}
        </p>
      )}
    </div>
  )
}
