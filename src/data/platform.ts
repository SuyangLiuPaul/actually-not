import type { Myth } from '../types'

/**
 * 构建平台。`APP_PLATFORM=android npm run app:build` 会把 VITE_APP_PLATFORM 定义为 'android'；
 * 网站、iOS 包、以及在 node 里直接 import 的脚本（og / links / revisions）都没有这个值，
 * 因此看到的是完整的条目集。
 */
export const APP_PLATFORM: string | undefined =
  typeof import.meta.env !== 'undefined' ? import.meta.env.VITE_APP_PLATFORM : undefined

/**
 * Google Play 对个人开发者账号不允许「医疗」类应用，所以 Android 包整体不含这两个分类
 * （急救 urgent、身体 body）。iOS 与网站保留全部内容。
 */
export const ANDROID_EXCLUDED_CATEGORIES: readonly string[] = ['urgent', 'body']

export function excludedCategoriesFor(platform: string | undefined): readonly string[] {
  return platform === 'android' ? ANDROID_EXCLUDED_CATEGORIES : []
}

/**
 * 唯一的平台过滤点：去掉被排除分类的条目，并把其余条目 related 里指向它们的链接一并删除
 * （不会留下断链）。返回新数组与新对象，不改动传入的数据。
 */
export function filterMythsForPlatform(myths: readonly Myth[], platform: string | undefined): Myth[] {
  const excluded = excludedCategoriesFor(platform)
  if (excluded.length === 0) return [...myths]
  const dropped = new Set(myths.filter((m) => excluded.includes(m.category)).map((m) => m.id))
  return myths
    .filter((m) => !dropped.has(m.id))
    .map((m) => (m.related ? { ...m, related: m.related.filter((id) => !dropped.has(id)) } : m))
}
