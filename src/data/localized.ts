import { MYTHS } from './myths'
import { MYTHS_EN } from './myths-en'
import type { Myth } from '../types'
import type { Locale } from '../i18n'

/**
 * 按语言给出条目列表：结构字段（id / category / stakes / related）始终
 * 以 myths.ts 为准，文字字段英文时取自 myths-en.ts 的翻译。
 */
export function mythsFor(locale: Locale): Myth[] {
  if (locale === 'zh') return MYTHS
  return MYTHS.map((m) => ({ ...m, ...MYTHS_EN[m.id] }))
}
