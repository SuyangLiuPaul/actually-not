import type { Locale } from '../i18n'

export type PlayTopic = 'mix' | 'quote' | 'film' | 'why'
export type PlayQuestion = {
  id: string
  topic: Exclude<PlayTopic, 'mix'>
  question: Record<Locale, string>
  choices: Record<Locale, [string, string, string]>
  answer: number
}

// 问题只改变呈现方式；结论、证据强度和出处仍来自原条目。
export const PLAY_QUESTIONS: PlayQuestion[] = [
  { id: 'luxun-some-live-dead', topic: 'quote', question: { zh: '「有的人活着，他已经死了……」是谁写的？', en: 'Who wrote “Some people are alive, yet already dead…”?' }, choices: { zh: ['鲁迅', '臧克家', '郭沫若'], en: ['Lu Xun', 'Zang Kejia', 'Guo Moruo'] }, answer: 1 },
  { id: 'luxun-one-confidant', topic: 'quote', question: { zh: '「人生得一知己足矣」与鲁迅是什么关系？', en: 'What connects Lu Xun to the “one true confidant” couplet?' }, choices: { zh: ['他原创的句子', '他抄写赠给朋友的联句', '他的小说标题'], en: ['He composed it', 'He copied it as a gift', 'It is a novel’s title'] }, answer: 1 },
  { id: 'zh-liang-qichao-drink-ice', topic: 'quote', question: { zh: '「十年饮冰，难凉热血」可以确定是梁启超写的吗？', en: 'Can “Ten years drinking ice…” be securely attributed to Liang Qichao?' }, choices: { zh: ['已经找到他的原文', '已证明绝不是他写的', '现有出处还不能确认'], en: ['His original text is known', 'It is proven he never wrote it', 'The available sources cannot confirm it'] }, answer: 2 },
  { id: 'world-einstein-compound-interest', topic: 'quote', question: { zh: '「复利是世界第八大奇迹」最早能追到哪里？', en: 'Where does the earliest traceable “eighth wonder” line about compound interest appear?' }, choices: { zh: ['爱因斯坦的论文', '一家储蓄贷款公司的广告', '古希腊哲学著作'], en: ['An Einstein paper', 'A savings-and-loan advertisement', 'Ancient Greek philosophy'] }, answer: 1 },
  { id: 'film-silencer', topic: 'film', question: { zh: '装上消音器，枪声会变成怎样？', en: 'What happens to gunfire with a suppressor?' }, choices: { zh: ['完全听不见', '只剩轻轻一声「噗」', '有所降低，但仍可能伤耳'], en: ['It becomes inaudible', 'Only a quiet puff remains', 'Quieter, but still potentially damaging'] }, answer: 2 },
  { id: 'film-space-sound', topic: 'film', question: { zh: '飞船在真空中爆炸，声音能穿过真空传到另一艘飞船吗？', en: 'Can an explosion’s sound travel through a vacuum to another spacecraft?' }, choices: { zh: ['能，爆炸越大越响', '不能，声音需要传播介质', '能，只是速度慢一点'], en: ['Yes, louder for bigger explosions', 'No: sound needs a medium', 'Yes, just more slowly'] }, answer: 1 },
  { id: 'film-quicksand', topic: 'film', question: { zh: '电影里的流沙，会把站着的人一路吞到头顶吗？', en: 'Does quicksand swallow a standing person all the way under, as in films?' }, choices: { zh: ['会，像水一样不断下沉', '一般不会，但仍可能陷住人', '完全没有危险'], en: ['Yes, like sinking in water', 'Generally not, but it can trap you', 'It is completely harmless'] }, answer: 1 },
  { id: 'why-manhole-round', topic: 'why', question: { zh: '不会掉进同形洞口的井盖，只有圆形吗？', en: 'Is a circle the only cover shape that cannot fall through its matching opening?' }, choices: { zh: ['是，只有圆形', '不是，其他等宽曲线也可以', '任何形状都可以'], en: ['Yes, only a circle', 'No, other constant-width shapes work', 'Any shape works'] }, answer: 1 },
  { id: 'why-black-box-orange', topic: 'why', question: { zh: '飞机的「黑匣子」，通常是什么颜色？', en: 'What colour is an aircraft’s “black box” usually?' }, choices: { zh: ['黑色', '银灰色', '醒目的橙色'], en: ['Black', 'Silver-grey', 'Bright orange'] }, answer: 2 },
  { id: 'why-coin-ridged-edge', topic: 'why', question: { zh: '硬币边缘的齿纹，最初主要防什么？', en: 'What did ridged coin edges originally help prevent?' }, choices: { zh: ['硬币从手里滑走', '有人削走边缘的贵金属', '机器把硬币夹住'], en: ['Coins slipping from your hand', 'Clipping precious metal off the edge', 'Coins jamming machines'] }, answer: 1 },
]

function random(seed: number) {
  let n = seed | 0
  return () => {
    n = (Math.imul(n, 1664525) + 1013904223) | 0
    return (n >>> 0) / 4294967296
  }
}

export function playRound(topic: PlayTopic, seed: number): PlayQuestion[] {
  const next = random(seed)
  const pool = PLAY_QUESTIONS.filter((q) => topic === 'mix' || q.topic === topic)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, 3).map((q) => {
    const order = [0, 1, 2]
    for (let i = 2; i > 0; i--) {
      const j = Math.floor(next() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }
    return { ...q, answer: order.indexOf(q.answer), choices: {
      zh: order.map((i) => q.choices.zh[i]) as [string, string, string],
      en: order.map((i) => q.choices.en[i]) as [string, string, string],
    } }
  })
}
