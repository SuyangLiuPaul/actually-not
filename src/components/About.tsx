import type { Locale } from '../i18n'
import { CONTACT_EMAIL, STRINGS } from '../i18n'

/** 信封图标（内联 SVG，不引入图标库）。跟随当前文字颜色。 */
export function MailIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 4.5l5.5 4.2 5.5-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** 带信封图标的 mailto 链接 */
export function MailLink({ className = '', subject }: { className?: string; subject?: string }) {
  const href = `mailto:${CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
  return (
    <a href={href} className={`inline-flex items-center gap-1.5 underline decoration-dotted underline-offset-[3px] ${className}`}>
      <MailIcon />
      <span>{CONTACT_EMAIL}</span>
    </a>
  )
}

type Block = { h: string; p?: string[]; list?: { b: string; t: string }[]; channel?: boolean }

const YT = 'https://www.youtube.com/@notsofastshow'

const ZH: { lead: string; blocks: Block[]; channelLead: string; channelTail: string } = {
  lead: '「早上不吃饭伤身」「洗完头不吹干会有湿气」「这句话是鲁迅说的」……这些话我们听了很多年，却很少有人追问过：出处在哪？',
  blocks: [
    {
      h: '我们做什么',
      p: [
        '我们把流传很广的说法——健康和日常生活里的常识、被安错了作者的名言、编出来的起源故事、星座、上火……——拿出来，对照目前能找到的最好的证据去核查：系统综述、随机对照试验、卫生机构的官方指南，以及一手文献。',
        '然后把结果老老实实写清楚：真相是什么、这个说法当初怎么传开的、那到底该怎么做。',
      ],
    },
    {
      h: '我们怎么做',
      list: [
        { b: '每个说法都有出处。', t: '能打开的都附了链接，你可以自己去核对，不必只听我们的。' },
        { b: '「已被推翻」和「证据不足」是两回事。', t: '前者是有证据说它不对；后者是目前没有足够的证据支持它，并不等于它一定错。我们会在正文里把这两种情况分开写。' },
        { b: '数字不确定时，我们说「约」。', t: '不把估计写成精确值，也不把一项研究的结论说成定论。' },
        { b: '写错了就改。', t: '每条页面底部标着收录日期和最近修订日期。发现错误，我们会修订并更新日期，而不是悄悄替换。' },
      ],
    },
    { h: '视频频道', channel: true },
    {
      h: '这不是医疗建议',
      p: ['这里讲的是人群层面的一般规律，不能代替医生对你个人情况的判断。身体不舒服，请找医生。详见页脚的免责声明。'],
    },
  ],
  channelLead: '我们也有一个同名的视频频道「先别急着信」（英文 Not So Fast，YouTube：',
  channelTail: '），把其中一些说法讲成几分钟的短视频。视频里的解说是 AI 合成的语音，用的是创作者本人声音的克隆，不是真人现场录音——这一点我们不想含糊。',
}

const EN: typeof ZH = {
  lead: '"Skipping breakfast is bad for you." "Going to bed with wet hair gives you a cold." "Einstein said it." We have heard these for years, and rarely stopped to ask: where does that come from?',
  blocks: [
    {
      h: 'What we do',
      p: [
        'We take popular claims — everyday health and life advice, quotes pinned on the wrong person, origin stories that were made up, star signs, the Chinese idea of "heatiness" — and check them against the best evidence we can find: systematic reviews, randomized trials, official guidelines from health agencies, and primary sources.',
        'Then we write down what we found: what is actually true, how the claim spread, and what to do instead.',
      ],
    },
    {
      h: 'How we work',
      list: [
        { b: 'Every claim has a source.', t: 'Where a link opens, we give it, so you can check for yourself rather than take our word.' },
        { b: '"Debunked" and "not enough evidence" are different things.', t: 'The first means evidence says it is wrong; the second means there is not enough to support it, which does not make it false. We keep the two apart in the text.' },
        { b: 'When numbers are approximate, we say "about".', t: 'We do not turn an estimate into an exact figure, or one study into settled fact.' },
        { b: 'When we are wrong, we correct it.', t: 'Each entry shows the date it was added and the date it was last revised. If we find a mistake, we revise the entry and update the date rather than quietly swap the text.' },
      ],
    },
    { h: 'The video channel', channel: true },
    {
      h: 'Not medical advice',
      p: ['What we write describes general, population-level patterns. It is no substitute for a doctor who knows your situation. If you are unwell, see one. The disclaimer in the footer has the details.'],
    },
  ],
  channelLead: 'We also run a video channel of the same name, Not So Fast (先别急着信 in Chinese; YouTube: ',
  channelTail: '), which turns some of these claims into short videos. The narration is AI-synthesized speech, made from a clone of the creator\'s own voice — it is not a live human recording. We would rather say that plainly.',
}

export function About({ locale, onBack }: { locale: Locale; onBack: () => void }) {
  const zh = locale === 'zh'
  const c = zh ? ZH : EN
  const t = STRINGS[locale]
  const homeHref = zh ? '/' : '/en'

  return (
    <article className="mb-14 max-w-[40rem]" data-about="">
      <a
        href={homeHref}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
          e.preventDefault()
          onBack()
        }}
        className="mb-6 inline-block text-[13px] underline decoration-dotted underline-offset-[3px]"
        style={{ color: 'var(--ink-faint)' }}
      >
        {t.aboutBack}
      </a>
      <h1 className="text-[1.6rem] leading-[1.2] font-bold tracking-tight sm:text-[2rem]" style={{ fontFamily: 'var(--font-serif)' }}>
        {zh ? '关于「先别急着信」' : 'About Not So Fast'}
      </h1>
      <p className="mt-2 text-[15px] italic" style={{ color: 'var(--pen)', fontFamily: 'var(--font-serif)' }}>
        {t.slogan}
      </p>
      <p className="mt-6 text-[15px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>{c.lead}</p>

      {c.blocks.map((b) => (
        <section key={b.h} className="mt-9">
          <h2 className="mb-3 text-[1.2rem] font-bold" style={{ fontFamily: 'var(--font-serif)' }}>{b.h}</h2>
          {b.p?.map((para) => (
            <p key={para} className="mb-3 text-[15px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>{para}</p>
          ))}
          {b.list && (
            <ul className="space-y-3">
              {b.list.map((li) => (
                <li key={li.b} className="text-[15px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
                  <strong style={{ color: 'var(--ink)' }}>{li.b}</strong> {li.t}
                </li>
              ))}
            </ul>
          )}
          {b.channel ? (
            <p className="text-[15px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              {c.channelLead}
              <a href={YT} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-[3px]">@notsofastshow</a>
              {c.channelTail}
            </p>
          ) : null}
        </section>
      ))}

      <section className="mt-9 rounded-xl border px-4 py-4" style={{ borderColor: 'var(--rule)', background: 'var(--paper-raised)' }}>
        <h2 className="mb-2 text-[1.2rem] font-bold" style={{ fontFamily: 'var(--font-serif)' }}>{t.contactLabel}</h2>
        <p className="mb-3 text-[15px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
          {zh
            ? '发现错误、想到值得查的说法，或者任何反馈，都欢迎来信。每一封我们都会看。'
            : 'Corrections, claims you would like checked, or any other feedback are all welcome. We read every message.'}
        </p>
        <MailLink className="text-[15px]" />
      </section>
    </article>
  )
}
