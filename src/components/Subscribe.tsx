import { useState } from 'react'
import type { Locale } from '../i18n'
import { STRINGS } from '../i18n'

/**
 * 页脚的每周邮件订阅（Kit）。中文、英文各一个 Kit 表单，方便按语言分别发周报。
 * Kit 默认双重确认：提交后对方要点确认邮件里的链接才算订阅。
 * 只在提交时联系 app.kit.com，平时不加载任何第三方资源。
 */
const KIT_FORM: Record<Locale, string> = { zh: '10170056', en: '10170063' }

export function Subscribe({ locale }: { locale: Locale }) {
  const t = STRINGS[locale]
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const action = `https://app.kit.com/forms/${KIT_FORM[locale]}/subscriptions`

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setState('error'); return }
    setState('sending')
    try {
      const body = new FormData(); body.append('email_address', email.trim())
      const res = await fetch(action, { method: 'POST', body, headers: { Accept: 'application/json' } })
      const j = await res.json().catch(() => null)
      setState(res.ok && (!j || j.status !== 'failed') ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <section className="mb-8 rounded-xl border px-4 py-4 text-[14px]" style={{ borderColor: 'var(--rule)', background: 'var(--paper-raised)', color: 'var(--ink-soft)' }} data-subscribe="done">
        {t.subscribeDone}
      </section>
    )
  }
  return (
    <section className="mb-8 rounded-xl border px-4 py-4" style={{ borderColor: 'var(--rule)', background: 'var(--paper-raised)' }} data-subscribe="">
      <p className="text-[15px]" style={{ color: 'var(--ink)' }}><strong>{t.subscribeTitle}</strong></p>
      <p className="mt-1 text-[13px]" style={{ color: 'var(--ink-soft)' }}>{t.subscribeLead}</p>
      <form className="mt-3 flex flex-wrap gap-2" onSubmit={submit} action={action} method="post" noValidate>
        <label className="sr-only" htmlFor="subscribe-email">{t.subscribePlaceholder}</label>
        <input
          id="subscribe-email"
          type="email"
          name="email_address"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
          placeholder={t.subscribePlaceholder}
          className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-[15px]"
          style={{ borderColor: 'var(--rule)', background: 'var(--paper)', color: 'var(--ink)' }}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="rounded-lg px-4 py-2 text-[15px] font-semibold disabled:opacity-60"
          style={{ background: 'var(--pen)', color: '#fff' }}
        >
          {state === 'sending' ? t.subscribeSending : t.subscribeButton}
        </button>
      </form>
      {state === 'error' && <p className="mt-2 text-[13px]" style={{ color: 'var(--pen)' }}>{t.subscribeError}</p>}
      <p className="mt-2 text-[12px]" style={{ color: 'var(--ink-faint)' }}>{t.subscribeFine}</p>
    </section>
  )
}
