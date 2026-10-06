import { describe, expect, it } from 'vitest'
import { MYTHS } from './myths'
import { PLAY_QUESTIONS, playRound } from './play'

describe('互动题目与原条目的关系', () => {
  it('每题链接真实条目，保持中英文选项齐全，急救不设答题门槛', () => {
    expect(new Set(PLAY_QUESTIONS.map((q) => q.id)).size).toBe(PLAY_QUESTIONS.length)
    for (const q of PLAY_QUESTIONS) {
      const myth = MYTHS.find((m) => m.id === q.id)
      expect(myth).toBeDefined()
      expect(myth?.category).not.toBe('urgent')
      expect(q.question.zh).toBeTruthy()
      expect(q.question.en).toBeTruthy()
      expect(q.choices.zh).toHaveLength(3)
      expect(q.choices.en).toHaveLength(3)
      expect(new Set(q.choices.zh).size).toBe(3)
      expect(q.answer).toBeGreaterThanOrEqual(0)
      expect(q.answer).toBeLessThan(3)
    }
  })
  it('洗牌不会改动答案或中英文选项的对应关系', () => {
    const original = JSON.stringify(PLAY_QUESTIONS)
    for (let seed = 0; seed < 30; seed++) {
      for (const q of playRound('mix', seed)) {
        const source = PLAY_QUESTIONS.find((x) => x.id === q.id)!
        expect(q.choices.zh[q.answer]).toBe(source.choices.zh[source.answer])
        expect(q.choices.en[q.answer]).toBe(source.choices.en[source.answer])
        q.choices.zh.forEach((choice, i) => {
          expect(q.choices.en[i]).toBe(source.choices.en[source.choices.zh.indexOf(choice)])
        })
      }
    }
    expect(JSON.stringify(PLAY_QUESTIONS)).toBe(original)
  })
  it('每种玩法都有三条不重复的题，相同种子可重现', () => {
    for (const topic of ['mix', 'quote', 'film', 'why'] as const) {
      const round = playRound(topic, 20732)
      expect(round).toHaveLength(3)
      expect(new Set(round.map((q) => q.id)).size).toBe(3)
      if (topic !== 'mix') expect(round.every((q) => q.topic === topic)).toBe(true)
      expect(playRound(topic, 20732)).toEqual(round)
    }
  })
  it('查无原文的梁启超条目保留有限证据，不能当成伪造已证实', () => {
    const q = PLAY_QUESTIONS.find((q) => q.id === 'zh-liang-qichao-drink-ice')!
    expect(q.choices.zh[q.answer]).toBe('现有出处还不能确认')
    expect(MYTHS.find((m) => m.id === q.id)?.confidence).toBe('limited')
  })
})
