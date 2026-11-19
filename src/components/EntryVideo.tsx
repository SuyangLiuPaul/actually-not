import { useEffect, useState } from 'react'
import { isLive, lengthLabel, publishLabel, styleLabel, videoFor } from '../data/videos'
import type { Locale } from '../i18n'

/**
 * 条目详情页里的动画：默认竖屏（9:16）短片，landscape 的是横屏（16:9）。该条目没有视频、或视频 ID 仍是 PENDING 时什么都不渲染。
 * 用 youtube-nocookie 域名嵌入；懒加载，进入视口前不请求任何第三方资源。
 */
export function EntryVideo({ id, title, locale }: { id: string; title: string; locale: Locale }) {
  const video = videoFor(id, locale)
  // 预渲染时不知道访问时刻；挂载后再判断是否已公开，避免水合不一致（先显示预告卡）。
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => setNow(new Date()), [])
  // 中国大陆访客打不开 YouTube（Paul 2026-11-19）：有 B站版本时，
  // 1) 时区是中国大陆的，直接先用 B站（不用等）；
  // 2) 其他人先用 YouTube，同时用一张 YouTube 缩略图探测 3 秒，加载不出来就自动换成 B站；
  // 3) 播放器下面始终有「换 B站 / 换 YouTube」，用户选过的会记住（localStorage）。
  const [src, setSrc] = useState<'yt' | 'bili'>('yt')
  useEffect(() => {
    if (!video?.bili) return
    let saved: string | null = null
    try { saved = localStorage.getItem('an-video-src') } catch { /* private mode */ }
    if (saved === 'yt' || saved === 'bili') { setSrc(saved); return }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (/^Asia\/(Shanghai|Urumqi|Chongqing|Harbin|Kashgar)$/.test(tz)) { setSrc('bili'); return }
    let done = false
    const img = new Image()
    const t = window.setTimeout(() => { if (!done) { done = true; setSrc('bili') } }, 3000)
    img.onload = () => { if (!done) { done = true; window.clearTimeout(t) } }
    img.onerror = () => { if (!done) { done = true; window.clearTimeout(t); setSrc('bili') } }
    img.src = `https://i.ytimg.com/vi/${video.youtubeId}/default.jpg?probe=${Date.now()}`
    return () => { done = true; window.clearTimeout(t) }
  }, [video?.bili, video?.youtubeId])
  const pick = (v: 'yt' | 'bili') => { setSrc(v); try { localStorage.setItem('an-video-src', v) } catch { /* ignore */ } }
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
          key={src}
          src={src === 'bili' && video.bili
            ? `https://player.bilibili.com/player.html?bvid=${video.bili}&autoplay=0&high_quality=1&danmaku=0`
            : `https://www.youtube-nocookie.com/embed/${video.youtubeId}?playsinline=1&rel=0`}
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
        {video.bili ? (
          <button type="button" onClick={() => pick(src === 'bili' ? 'yt' : 'bili')} className="mr-3 underline decoration-dotted underline-offset-[3px]" style={{ color: 'var(--ink-faint)' }}>
            {src === 'bili'
              ? (locale === 'en' ? 'Switch to YouTube' : '换成 YouTube 播放')
              : (locale === 'en' ? 'Can’t play? Try Bilibili (Chinese)' : '播放不了？换成 B站')}
          </button>
        ) : null}
        <a
          href={src === 'bili' && video.bili ? `https://www.bilibili.com/video/${video.bili}` : `https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-[3px]"
          style={{ color: 'var(--ink-faint)' }}
        >
          {src === 'bili' && video.bili
            ? (locale === 'en' ? 'Open on Bilibili ↗' : '在 B站打开 ↗')
            : (locale === 'en' ? 'Open on YouTube ↗' : '在 YouTube 打开 ↗')}
        </a>
      </p>
    </figure>
  )
}
