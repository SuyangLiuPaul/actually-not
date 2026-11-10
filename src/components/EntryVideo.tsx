import { useEffect, useState } from 'react'
import { isLive, lengthLabel, publishLabel, styleLabel, videoFor } from '../data/videos'
import type { Locale } from '../i18n'

/**
 * 条目详情页里的动画：默认竖屏（9:16）短片，landscape 的是横屏（16:9）。该条目没有视频、或视频 ID 仍是 PENDING 时什么都不渲染。
 * 用 youtube-nocookie 域名嵌入；懒加载，进入视口前不请求任何第三方资源。
 */
export function EntryVideo({ id, title, locale }: { id: string; title: string; locale: Locale }) {
  const video = videoFor(id)
  // 预渲染时不知道访问时刻；挂载后再判断是否已公开，避免水合不一致（先显示预告卡）。
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => setNow(new Date()), [])
  if (!video) return null
  const len = lengthLabel(video, locale)
  const caption = locale === 'en' ? `Watch the ${len}` : `看${len}`
  const maxWidth = video.landscape ? 720 : 360
  if (!now || !isLive(video, now)) {
    const when = publishLabel(video, locale)
    return (
      <figure className="mx-auto mt-6 w-full" style={{ maxWidth }} data-entry-video={id} data-video-upcoming="">
        <div className="rounded-xl border px-4 py-5 text-center text-[14px]" style={{ borderColor: 'var(--rule)', background: 'var(--paper-raised)', color: 'var(--ink-soft)' }}>
          {now
            ? (locale === 'en' ? `▶ ${len} · coming ${when}` : `▶ ${len} · ${when}上线`)
            : `▶ ${len}`}
          <span className="mt-1 block text-[12px]" style={{ color: 'var(--ink-faint)' }}>{styleLabel(video.style, locale)}</span>
        </div>
      </figure>
    )
  }
  return (
    <figure className="mx-auto mt-6 w-full" style={{ maxWidth }} data-entry-video={id}>
      <div
        className="overflow-hidden rounded-xl border"
        style={{ aspectRatio: video.landscape ? '16 / 9' : '9 / 16', borderColor: 'var(--rule)', background: 'var(--paper-raised)' }}
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
