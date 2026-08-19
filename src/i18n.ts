/**
 * 界面文案（中英双语）。条目正文在 data/myths.ts / data/myths-en.ts，
 * 这里只放 UI 字符串。新增文案要两边都加——T 类型是两边的并集校验。
 */
import { CATEGORIES, STAKES_META, type CategoryId, type Stakes } from './types'

export type Locale = 'zh' | 'en'

const zh = {
  brand: '常识核对表',
  siteName: '其实不是',
  homeTitle: '其实不是 · 那些你以为对的生活常识',
  quizTitle: '你中了几条？｜其实不是',
  mythTitle: (belief: string) => `${belief}｜其实不是`,
  skipToContent: '跳到正文',
  introLead: '早上不吃饭伤身、洗完头不吹干有湿气、骨头汤补钙——有些说法听起来天经地义，讲了几十年，但证据并不支持。',
  introCountLead: '这里收了 ',
  introCountNum: (n: number) => `${n} 条`,
  introTail: '，每条都写清楚了：真相是什么、这个说法当初怎么传开的、以及那到底该怎么做。',
  randomOne: '随便看一条',
  quizEntry: '你中了几条？',
  riskyNote: (n: number) => `其中 ${n} 条照做可能有害`,
  searchPlaceholder: '搜一个说法，比如「感冒」「补钙」「减肥」',
  clearSearch: '清空搜索',
  filterAll: '全部',
  emptyResult: (q: string) => `没找到「${q}」相关的条目。`,
  emptySubmitLead: '觉得这句该收？',
  emptySubmit: '投给我们',
  clearFilters: '清除筛选',
  listStatus: (shown: number, read: number, total: number) => `${shown} 条 · 已读 ${read}/${total}`,
  footerAboutTitle: '关于这些结论。',
  footerAbout:
    '每条都附了出处，多数来自系统综述、随机对照试验或卫生机构的公开指南。凡是「证据不足以支持」而不是「已被推翻」的，正文里都写明了区别；有争议或有例外的地方也尽量留了余地——因为把一个过度简化的说法换成另一个过度简化的说法，并没有变好。',
  footerMedicalTitle: '这不是医疗建议。',
  footerMedical: '这里讲的是人群层面的一般规律，落到具体的人身上未必适用。身体不舒服请找医生，别拿网页当诊断。',
  disclaimerTitle: '免责声明。',
  disclaimer:
    '本站内容仅供一般科普参考，不构成医疗、营养或法律建议，也不构成医患关系。我们尽量核对出处并标注证据强度，但不保证所有信息绝对准确、完整或永远最新——科学结论会更新，条目也会随之修订。任何健康决策请结合自身情况咨询医生或注册营养师等专业人士；因参考本站内容做出的任何决定，后果由个人承担。文中外链仅作出处标注，不代表我们为其全部内容背书。',
  footerCorrection: '发现哪条写错了？欢迎提 issue 或 PR。',
  footerSubmit: '想到一句该收的？投稿一条',
  themeAuto: '跟随系统',
  themeLight: '浅色',
  themeDark: '深色',
  themeLabel: (label: string) => `外观：${label}，点击切换`,
  langToggle: 'English',
  langToggleLabel: '切换到英文版',

  cardCta: '其实不是',
  readBadge: '已读',
  markRead: '标为已读',

  detailBelief: '你以为',
  detailTruth: '其实',
  detailEvidence: '证据是什么',
  detailOrigin: '这个说法是怎么传开的',
  detailInstead: '那到底该怎么做',
  detailSources: '出处',
  detailRelated: '你可能也以为',
  prev: '上一条',
  next: '下一条',
  close: '关闭',
  shareCopied: '链接已复制',
  shareAria: '分享这一条，复制链接',
  shareTitle: '分享这一条',
  shareNativeTitle: (belief: string) => `其实不是：${belief}`,
  shareNativeText: (belief: string, truth: string) => `你以为「${belief}」？其实——${truth}`,
  correctionLead: '这条写错了、出处打不开、或者有更准的说法？',
  correctionCta: '来提个 issue 纠错',
  correctionTail: '——这个站的公信力靠「可以被纠错」建立，不靠自称严谨。',
  correctionIssueTitle: (belief: string) => `纠错：${belief}`,
  correctionIssueBody: (id: string) => `条目：/${id}\n\n**哪里不对**\n\n\n**依据**（综述 / 指南 / 原始研究链接）\n\n`,

  quizName: '你中了几条',
  quizStart: '开始',
  quizIntro: (n: number) => `随机抽 ${n} 条，只看那句「你以为」，回答你信不信过。最后逐条对答案——每条都有出处。`,
  quizPrivacy: '不记分、不上传，答完只在你自己设备上',
  quizProgress: (step: number, total: number) => `第 ${step} / ${total} 条`,
  quizQuestion: '这句话你信过吗',
  quizYes: '我信过',
  quizNo: '我没信过',
  quizScore: (score: number, total: number) => `${total} 条里中过 ${score} 条`,
  quizCopy: '复制战绩',
  quizCopied: '✓ 已复制',
  quizMakeImage: '生成成绩图',
  quizRestart: '再测一次',
  quizShareImage: '直接分享',
  quizSaveImage: '保存图片',
  quizReviewHint: '点开任意一条看证据和出处',
  quizBelieved: '你信过',
  quizNotBelieved: '没信过',
  quizImgAlt: (score: number, total: number) => `成绩图：${total} 条里中过 ${score} 条`,
  quizShareText: (score: number, total: number, origin: string) =>
    `我在「其实不是」的常识测验里 ${total} 条中过 ${score} 条——你呢？ ${origin}/quiz`,
  quizVerdict: (n: number): string => {
    if (n <= 2) return '你不太好骗。'
    if (n <= 5) return '正常人水平——这些说法本来就设计得很可信。'
    if (n <= 8) return '过半了。没关系，每一条当初都是有头有脸的传言。'
    return '几乎全中。这个站就是为你写的。'
  },
  quizImgHeader: '常识核对表 · 你中了几条',
  quizImgScore: (score: number, total: number) => `${total} 条里中过 ${score} 条`,
  quizImgFooter: '其实不是 · 每条附出处 · actually-not.netlify.app/quiz',
  quizImgFile: (score: number, total: number) => `你中了几条-${score}of${total}.png`,

  updateNew: '有新内容',
  updateNewBody: '条目或措辞有更新，刷新一下就能看到。',
  updateReload: '刷新',
  updateReloading: '正在刷新…',
  updateLater: '以后再说',
  updateOffline: '已经可以离线看了。',
  updateOfflineTail: '没网也能打开。',
}

export type T = typeof zh

const en: T = {
  brand: 'The Common-Sense Checklist',
  siteName: 'Actually, Not',
  homeTitle: 'Actually, Not · Everyday things you thought were true',
  quizTitle: 'How many got you? | Actually, Not',
  mythTitle: (belief) => `${belief} | Actually, Not`,
  skipToContent: 'Skip to content',
  introLead:
    "Skipping breakfast wrecks your stomach. Going out with wet hair gives you a cold. Bone soup is full of calcium. Some claims sound self-evident — they've been repeated for decades — but the evidence doesn't back them. ",
  introCountLead: 'This site collects ',
  introCountNum: (n) => `${n} of them`,
  introTail:
    ', and for each one it spells out: what the truth is, how the claim spread in the first place, and what to do instead.',
  randomOne: 'Surprise me',
  quizEntry: 'How many got you?',
  riskyNote: (n) => `${n} of them can do real harm`,
  searchPlaceholder: 'Search a claim — try "cold", "calcium", "weight loss"',
  clearSearch: 'Clear search',
  filterAll: 'All',
  emptyResult: (q) => `Nothing matches "${q}".`,
  emptySubmitLead: 'Think it belongs here?',
  emptySubmit: 'Submit it',
  clearFilters: 'Clear filters',
  listStatus: (shown, read, total) => `${shown} entries · read ${read}/${total}`,
  footerAboutTitle: 'About these conclusions.',
  footerAbout:
    "Every entry cites its sources — mostly systematic reviews, randomized controlled trials, or public guidelines from health agencies. Where the answer is 'insufficient evidence' rather than 'disproven', the text says so; where there's controversy or exceptions, it leaves room — because replacing one oversimplification with another is not progress.",
  footerMedicalTitle: 'This is not medical advice.',
  footerMedical:
    "What's written here describes population-level patterns, which may not apply to you. If you're unwell, see a doctor — don't use a webpage as a diagnosis.",
  disclaimerTitle: 'Disclaimer.',
  disclaimer:
    "This site is for general education only. It is not medical, nutritional, or legal advice, and using it creates no doctor–patient relationship. We check sources and mark evidence strength carefully, but we can't guarantee every detail is accurate, complete, or current — science moves on, and entries get revised. Talk to a doctor, registered dietitian, or other qualified professional before making health decisions; whatever you decide after reading this site is your own responsibility. External links are citations, not endorsements of everything on those sites.",
  footerCorrection: 'Spotted an error? Issues and PRs are welcome.',
  footerSubmit: 'Know a claim we should cover? Submit it',
  themeAuto: 'System',
  themeLight: 'Light',
  themeDark: 'Dark',
  themeLabel: (label) => `Theme: ${label}. Click to switch`,
  langToggle: '中文',
  langToggleLabel: 'Switch to the Chinese version',

  cardCta: 'Actually, not',
  readBadge: 'Read',
  markRead: 'Mark as read',

  detailBelief: "You'd think",
  detailTruth: 'Actually',
  detailEvidence: 'The evidence',
  detailOrigin: 'How it spread',
  detailInstead: 'What to do instead',
  detailSources: 'Sources',
  detailRelated: 'You might also believe',
  prev: 'Previous',
  next: 'Next',
  close: 'Close',
  shareCopied: 'Link copied',
  shareAria: 'Share this entry, copy link',
  shareTitle: 'Share this entry',
  shareNativeTitle: (belief) => `Actually, Not: ${belief}`,
  shareNativeText: (belief, truth) => `You'd think "${belief}"? Actually — ${truth}`,
  correctionLead: 'Something wrong here, a dead source link, or a more accurate framing?',
  correctionCta: 'File an issue to correct it',
  correctionTail: " — this site's credibility comes from being correctable, not from claiming rigor.",
  correctionIssueTitle: (belief) => `Correction: ${belief}`,
  correctionIssueBody: (id) =>
    `Entry: /${id}\n\n**What's wrong**\n\n\n**Evidence** (review / guideline / primary study link)\n\n`,

  quizName: 'How many got you?',
  quizStart: 'Start',
  quizIntro: (n) =>
    `We draw ${n} random entries, show you just the claim, and ask whether you've ever believed it. Then we go through the answers one by one — every one with sources.`,
  quizPrivacy: 'No scoring, no uploads — your answers stay on your device',
  quizProgress: (step, total) => `${step} / ${total}`,
  quizQuestion: 'Have you ever believed this?',
  quizYes: "I've believed it",
  quizNo: 'Not me',
  quizScore: (score, total) => `${score} out of ${total} got you`,
  quizCopy: 'Copy result',
  quizCopied: '✓ Copied',
  quizMakeImage: 'Make a score card',
  quizRestart: 'Try again',
  quizShareImage: 'Share',
  quizSaveImage: 'Save image',
  quizReviewHint: 'Open any entry to see the evidence and sources',
  quizBelieved: 'Believed',
  quizNotBelieved: 'Nope',
  quizImgAlt: (score, total) => `Score card: ${score} out of ${total}`,
  quizShareText: (score, total, origin) =>
    `I fell for ${score} out of ${total} everyday myths on "Actually, Not" — how about you? ${origin}/en/quiz`,
  quizVerdict: (n) => {
    if (n <= 2) return "You're hard to fool."
    if (n <= 5) return "About average — these claims were engineered to sound true."
    if (n <= 8) return 'More than half. No shame — each of these was once a respectable rumor.'
    return 'Nearly all of them. This site was written for you.'
  },
  quizImgHeader: 'The Common-Sense Checklist',
  quizImgScore: (score, total) => `${score} out of ${total} got me`,
  quizImgFooter: 'Actually, Not · every entry sourced · actually-not.netlify.app/en/quiz',
  quizImgFile: (score, total) => `actually-not-${score}of${total}.png`,

  updateNew: 'New content available',
  updateNewBody: 'Entries or wording have been updated. Refresh to see the latest.',
  updateReload: 'Refresh',
  updateReloading: 'Refreshing…',
  updateLater: 'Later',
  updateOffline: 'Ready for offline reading.',
  updateOfflineTail: 'Works without a connection.',
}

export const STRINGS: Record<Locale, T> = { zh, en }

/** 分类和危害程度的中文名在 types.ts；英文名在这里 */
export const CATEGORY_LABELS_EN: Record<CategoryId, string> = {
  eat: 'Food',
  body: 'Body',
  sleep: 'Sleep',
  move: 'Exercise',
  life: 'Daily life',
  urgent: 'Emergencies',
}

export const STAKES_META_EN: Record<Stakes, { label: string; hint: string }> = {
  harmless: {
    label: 'Harmless',
    hint: 'Wrong, but believing it costs you nothing',
  },
  wasteful: {
    label: 'Wasted effort',
    hint: 'Money and effort spent, results not delivered',
  },
  risky: {
    label: 'Can harm',
    hint: 'Following this one can actually make things worse',
  },
}

export function categoryLabel(id: CategoryId, locale: Locale): string {
  return locale === 'en' ? CATEGORY_LABELS_EN[id] : CATEGORIES.find((c) => c.id === id)!.label
}

export function catEmoji(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)!.emoji
}

/** 每个分类的强调色（卡片/详情 chip 用，color-mix 后深浅色主题都安全） */
export const CAT_ACCENT: Record<CategoryId, string> = {
  eat: '#b3541e',
  body: '#2f6f6a',
  sleep: '#4a5a8a',
  move: '#4d7a3a',
  life: '#8a6d3b',
  urgent: '#c13024',
}

export function stakesMeta(s: Stakes, locale: Locale): { label: string; hint: string; tone: string } {
  if (locale === 'en') return { ...STAKES_META_EN[s], tone: s }
  return STAKES_META[s]
}

// ── 路由：英文版统一走 /en 前缀，中文版路径不变 ──

/** 把 location.pathname 拆成语言 + 条目 id（'quiz' 也算） */
export function parsePath(path: string): { locale: Locale; id: string } {
  const clean = path.replace(/^\/+|\/+$/g, '')
  if (clean === 'en') return { locale: 'en', id: '' }
  if (clean.startsWith('en/')) return { locale: 'en', id: clean.slice(3) }
  return { locale: 'zh', id: clean }
}

/** 语言 + id 拼回路径 */
export function pathFor(locale: Locale, id: string): string {
  if (locale === 'en') return id ? `/en/${id}` : '/en'
  return id ? `/${id}` : '/'
}
