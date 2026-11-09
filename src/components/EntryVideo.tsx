import { styleLabel, videoFor } from '../data/videos'
import type { Locale } from '../i18n'

/**
 * 条目详情页里的竖屏（9:16）短动画。该条目没有视频、或视频 ID 仍是 PENDING 时什么都不渲染。
 * 用 youtube-nocookie 域名嵌入；懒加载，进入视口前不请求任何第三方资源。
 */
export function EntryVideo({ id, title, locale }: { id: string; title: string; locale: Locale }) {
  const video = videoFor(id)
  if (!video) return null
  const caption = locale === 'en' ? 'Watch the 1-minute animation' : '看 1 分钟动画'
  return (
    <figure className="mx-auto mt-6 w-full" style={{ maxWidth: 360 }} data-entry-video={id}>
      <div
        className="overflow-hidden rounded-xl border"
        style={{ aspectRatio: '9 / 16', borderColor: 'var(--rule)', background: 'var(--paper-raised)' }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?playsinline=1&rel=0`}
          title={title}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-full w-full border-0"
        />
      </div>
      <figcaption className="mt-2 text-center text-[13px]" style={{ color: 'var(--ink-soft)' }}>
        {caption} · {styleLabel(video.style, locale)}
      </figcaption>
      {/* 嵌入播放器加载不出来时（离线、被拦截）的兜底：直接去 YouTube 看 */}
      <p className="mt-1 text-center text-[12px]">
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-[3px]"
          style={{ color: 'var(--ink-faint)' }}
        >
          {locale === 'en' ? 'Open on YouTube ↗' : '在 YouTube 打开 ↗'}
        </a>
      </p>
    </figure>
  )
}
