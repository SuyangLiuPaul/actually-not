import { isLive, publishLabel, styleLabel, videoFor } from '../data/videos'
import type { Locale } from '../i18n'
import type { Myth } from '../types'

/** 「视频 / Videos」：列出有短动画的条目。没有可播放视频时整块不渲染；有就一直可见，不需要任何解锁。 */
export function VideoShelf({ myths, locale, onOpen }: { myths: Myth[]; locale: Locale; onOpen: (id: string) => void }) {
  const zh = locale === 'zh'
  const items = myths.flatMap((m) => { const video = videoFor(m.id); return video ? [{ m, video }] : [] })
  if (!items.length) return null
  return <section className="app-videos" aria-labelledby="videos-title">
    <h3 id="videos-title">{zh ? '视频' : 'Videos'}<span>{zh ? `${items.length} 个动画` : `${items.length} animations`}</span></h3>
    <ul>{items.map(({ m, video }) => <li key={m.id}><button onClick={() => onOpen(m.id)}>
      <img src={`/illu/${m.id}.webp`} width="96" height="40" alt="" loading="lazy" />
      <span><strong>{m.belief}</strong><small>{isLive(video) ? '▶ ' : ''}{Math.round(video.durationSec)} {zh ? '秒' : 's'} · {styleLabel(video.style, locale)}{isLive(video) ? '' : (zh ? ` · ${publishLabel(video, locale)}上线` : ` · coming ${publishLabel(video, locale)}`)}</small></span>
    </button></li>)}</ul>
  </section>
}
