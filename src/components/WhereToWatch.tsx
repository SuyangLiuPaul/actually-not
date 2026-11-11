import type { Locale } from '../i18n'

/**
 * 页脚「在哪里看」：频道在各平台的主页。只列出地方，不喊「关注」（Paul, 2026-11-11）。
 * 普通链接，不加载任何第三方脚本或图标。
 * 中文页先列国内平台；英文页先列海外平台；两边都能看到全部。
 */
type Site = { name: string; handle: string; href?: string }

const ZH: Site[] = [
  { name: '视频号', handle: '先别急着信（微信里搜索）' },
  { name: '公众号', handle: '先别急着信（扫二维码）' },
  { name: '抖音', handle: '先别急着信', href: 'https://www.douyin.com/user/MS4wLjABAAAAJLHasftN7oI0l3i_G2e-rswPmv3oAd_y9HYpjKzRhLD4QGWtu8CDVUngeV9ZvieF' },
  { name: '小红书', handle: '先别急着信', href: 'https://www.xiaohongshu.com/user/profile/5e185efd000000000100a404' },
  { name: 'B站', handle: '先别急着信', href: 'https://space.bilibili.com/3546678881683541' },
]
const INTL: Site[] = [
  { name: 'YouTube', handle: '@notsofastshow', href: 'https://www.youtube.com/@notsofastshow' },
  { name: 'TikTok', handle: '@notsofastshow', href: 'https://www.tiktok.com/@notsofastshow' },
  { name: 'Instagram', handle: '@notsofast.show', href: 'https://www.instagram.com/notsofast.show/' },
  { name: 'Facebook', handle: 'Not So Fast', href: 'https://www.facebook.com/profile.php?id=61596198909883' },
]

function Row({ s }: { s: Site }) {
  return (
    <li className="flex gap-2">
      <span className="min-w-[4.5em]" style={{ color: 'var(--ink-soft)' }}>{s.name}</span>
      {s.href
        ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-[3px]">{s.handle}</a>
        : <span>{s.handle}</span>}
    </li>
  )
}

export function WhereToWatch({ locale }: { locale: Locale }) {
  const zh = locale === 'zh'
  const groups: [string, Site[]][] = zh
    ? [['国内平台', ZH], ['海外平台', INTL]]
    : [['Watch', INTL], ['In Chinese (先别急着信)', ZH]]
  return (
    <section className="mb-8" data-where-to-watch="">
      <p className="text-[15px]" style={{ color: 'var(--ink)' }}>
        <strong>{zh ? '在这些地方也能看到我们' : 'Also on'}</strong>
      </p>
      <div className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
        {groups.map(([title, list]) => (
          <div key={title}>
            <p className="text-[12px] uppercase tracking-wide" style={{ color: 'var(--ink-faint)' }}>{title}</p>
            <ul className="mt-1 space-y-0.5">{list.map((s) => <Row key={s.name} s={s} />)}</ul>
          </div>
        ))}
        <figure className="text-center">
          <img src="/qr-gzh.jpg" alt={zh ? '公众号「先别急着信」二维码' : 'WeChat Official Account QR code (先别急着信)'} width={112} height={112} loading="lazy"
            className="rounded-md border" style={{ borderColor: 'var(--rule)' }} />
          <figcaption className="mt-1 text-[12px]">{zh ? '公众号二维码' : 'WeChat QR'}</figcaption>
        </figure>
      </div>
    </section>
  )
}
