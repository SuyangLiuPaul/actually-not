import { useSyncExternalStore } from 'react'
import { contentRevision, subscribeContent } from './current'

/** 内容每换一次加一；放进 useMemo 依赖里，远程内容换上来时界面跟着重算 */
export function useContentRevision(): number {
  return useSyncExternalStore(subscribeContent, contentRevision, () => 0)
}
