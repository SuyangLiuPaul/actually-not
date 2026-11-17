import type { Locale } from '../i18n'

/**
 * 「下载 App」(Paul, 2026-11-18)：iOS 已全球上架；Android 还在 Google Play 封闭测试，
 * 所以只给「抢先体验」两步，不放 Google Play 商店徽章（没正式上架前不能当成下载入口）。
 * 纯文字按钮，不加载第三方脚本或商标图。转正式上架后把 ANDROID 改成商店链接即可。
 */
export const IOS_URL = 'https://apps.apple.com/app/id6819674595'
export const ANDROID_GROUP = 'https://groups.google.com/g/yahwehs-people-testers'
export const ANDROID_OPTIN = 'https://play.google.com/apps/testing/com.actuallynot.app'

const btn = 'inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[14px] font-medium no-underline transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2'

export function GetTheApp({ locale, detailed = false }: { locale: Locale; detailed?: boolean }) {
  const zh = locale === 'zh'
  return (
    <section className={detailed ? '' : 'mb-8'} data-get-the-app="">
      {!detailed && (
        <p className="text-[15px]" style={{ color: 'var(--ink)' }}>
          <strong>{zh ? '手机上看：先别急着信 App' : 'On your phone: the Not So Fast app'}</strong>
        </p>
      )}
      {detailed && (
        <p className="mb-3 text-[15px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
          {zh
            ? '网站上的内容也做成了 App：每天一条，随手翻、随手查，离线也能看。免费，没有广告。'
            : 'Everything on this site is also an app: one claim a day, quick to browse and search, readable offline. Free, no ads.'}
        </p>
      )}
      <div className="mt-2 flex flex-wrap items-start gap-x-6 gap-y-3">
        <a href={IOS_URL} target="_blank" rel="noopener noreferrer" className={btn}
          style={{ borderColor: 'var(--rule)', background: 'var(--paper-raised)', color: 'var(--ink)' }}>
          {zh ? 'iPhone / iPad：App Store 下载' : 'iPhone / iPad: App Store'}
        </a>
        <div className="text-[13px] leading-[1.7]" style={{ color: 'var(--ink-faint)' }}>
          <p style={{ color: 'var(--ink-soft)' }}>
            <strong>{zh ? 'Android：抢先体验（测试中）' : 'Android: early access (in testing)'}</strong>
          </p>
          <ol className="mt-0.5 list-decimal pl-5">
            <li>
              <a href={ANDROID_GROUP} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-[3px]">
                {zh ? '先加入测试者群组' : 'Join the tester group'}
              </a>
              {zh ? '（用你 Google Play 的同一个账号）' : ' (with the same Google account you use on Google Play)'}
            </li>
            <li>
              <a href={ANDROID_OPTIN} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-[3px]">
                {zh ? '再点「成为测试人员」并安装' : 'Then tap "Become a tester" and install'}
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
