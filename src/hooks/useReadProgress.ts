import { useCallback, useEffect, useState } from 'react'
import { MYTHS } from '../data/myths'

/**
 * 「看过」进度：打开过详情的条目算已读，存 localStorage，下次来接着看。
 * 内容改版后被删掉的 id 会在加载时过滤掉。
 */
const KEY = 'read-v1'
const KNOWN_IDS = new Set(MYTHS.map((m) => m.id))

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return new Set()
    const ids: unknown = JSON.parse(raw)
    if (!Array.isArray(ids)) return new Set()
    return new Set(ids.filter((x): x is string => typeof x === 'string' && KNOWN_IDS.has(x)))
  } catch {
    return new Set()
  }
}

export function useReadProgress() {
  const [read, setRead] = useState<Set<string>>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify([...read]))
    } catch {
      // 隐私模式等场景写不进去，进度只保留在本次会话里
    }
  }, [read])

  const markRead = useCallback((id: string) => {
    setRead((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])

  const toggleRead = useCallback((id: string) => {
    setRead((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return { read, markRead, toggleRead, readCount: read.size }
}
