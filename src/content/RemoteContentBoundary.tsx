import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** 界面出错时调用：退回打包数据成功就返回 true（见 native.ts 的 revertToBundledContent） */
  revert: () => boolean
}

interface State { error: Error | null; fatal: boolean }

/**
 * 远程内容的最后一道保险：校验已经挡住了结构问题，但万一某份远程内容仍让界面渲染出错，
 * 就记下这个版本、退回打包数据、重新渲染，而不是停在错误页。
 * 当前本来就是打包数据（退无可退）时，把错误继续抛给外层原有的 ErrorBoundary。
 */
export class RemoteContentBoundary extends Component<Props, State> {
  state: State = { error: null, fatal: false }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error }
  }

  componentDidCatch() {
    if (this.props.revert()) this.setState({ error: null, fatal: false })
    else this.setState({ fatal: true })
  }

  render() {
    const { error, fatal } = this.state
    if (!error) return this.props.children
    if (fatal) throw error
    return null // 退回打包数据前的一瞬间
  }
}
