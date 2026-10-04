export type CategoryId =
  | 'eat'
  | 'body'
  | 'sleep'
  | 'move'
  | 'life'
  | 'urgent'
  | 'quote'
  | 'film'
  | 'origin'
  | 'word'
  | 'why'

/**
 * 信了这条会怎样 —— 用来提醒读者哪些只是白费功夫，哪些真的会出事。
 */
export type Stakes = 'harmless' | 'wasteful' | 'risky'

/**
 * 结论的证据强度 —— 区分「研究很确定」「研究不多」「学界还在吵」，
 * 让读者一眼看出这条结论有多稳。
 */
export type Confidence = 'strong' | 'limited' | 'debated'

export interface Source {
  label: string
  /** 省略表示这条只有文献出处、没有稳定的公开链接 */
  url?: string
}

export interface Myth {
  id: string
  category: CategoryId
  /** 你以为 —— 卡片正面那句耳熟能详的话 */
  belief: string
  /** 其实 —— 一句话给出结论 */
  truth: string
  /** 展开讲讲证据 */
  detail: string
  /** 这个说法当初是怎么传开的 */
  origin: string
  /** 那到底该怎么做 */
  instead: string
  stakes: Stakes
  /** 证据强度：strong 证据充分 | limited 研究有限 | debated 尚有争议 */
  confidence: Confidence
  sources: Source[]
  /** 相关条目的 id —— 详情页底部「你可能也以为……」。写了就必须双向互链（测试会查） */
  related?: string[]
}

/** 条目里的文字部分 —— 英文版（myths-en.ts）按 id 提供同一份文字的翻译 */
export type MythText = Pick<Myth, 'belief' | 'truth' | 'detail' | 'origin' | 'instead' | 'sources'>

export interface Category {
  id: CategoryId
  label: string
  emoji: string
}

export const CATEGORIES: Category[] = [
  { id: 'eat', label: '吃', emoji: '🍚' },
  { id: 'body', label: '身体', emoji: '🩺' },
  { id: 'sleep', label: '睡', emoji: '🌙' },
  { id: 'move', label: '运动', emoji: '🏃' },
  { id: 'life', label: '生活', emoji: '🏠' },
  { id: 'urgent', label: '关键时刻', emoji: '🚨' },
  { id: 'quote', label: '名言没说过', emoji: '💬' },
  { id: 'film', label: '电影骗了你', emoji: '🎬' },
  { id: 'origin', label: '起源是编的', emoji: '📜' },
  // word 板块的条目已写好在 content-staging/，插画齐了再合并并放开这一行
  { id: 'word', label: '这个词你用错了', emoji: '✍️' },
  { id: 'why', label: '为什么长这样', emoji: '🔧' },
]

export const STAKES_META: Record<
  Stakes,
  { label: string; hint: string; tone: string }
> = {
  harmless: {
    label: '无伤大雅',
    hint: '信了也没什么损失，就是不太对',
    tone: 'harmless',
  },
  wasteful: {
    label: '白费功夫',
    hint: '花了钱花了力气，换不来你想要的结果',
    tone: 'wasteful',
  },
  risky: {
    label: '可能有害',
    hint: '照做反而可能把事情弄糟',
    tone: 'risky',
  },
}

export const CONFIDENCE_META: Record<Confidence, { label: string; hint: string }> = {
  strong: {
    label: '证据充分',
    hint: '有系统综述、随机对照试验或权威机构指南支撑',
  },
  limited: {
    label: '研究有限',
    hint: '现有研究不多或质量一般，方向明确但别把结论当铁律',
  },
  debated: {
    label: '尚有争议',
    hint: '不同研究结论不一，正文里写了几边各自的理由',
  },
}
