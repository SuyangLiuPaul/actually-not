import { MYTHS } from './myths'
import { MYTHS_EN } from './myths-en'
import { contentOverride } from '../content/current'
import type { Myth } from '../types'
import type { Locale } from '../i18n'

/**
 * 按语言给出条目列表：结构字段（id / category / stakes / related）始终
 * 以 myths.ts 为准，文字字段英文时取自 myths-en.ts 的翻译。
 * 原生 App 拿到更新的远程内容后（src/content/），这里改读那一份（已按平台过滤）。
 */
export function mythsFor(locale: Locale): Myth[] {
  const remote = contentOverride()
  const entries = remote?.entries ?? MYTHS
  const en = remote?.en ?? MYTHS_EN
  if (locale === 'zh') return entries
  return entries.map((m) => ({ ...m, ...en[m.id] }))
}
