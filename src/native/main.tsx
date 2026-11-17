import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import NativeApp from './NativeApp'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { RemoteContentBoundary } from '../content/RemoteContentBoundary'
import { revertToBundledContent } from '../content/native'

const container = document.getElementById('root')
if (!container) throw new Error('找不到应用挂载点')
createRoot(container).render(<StrictMode><ErrorBoundary><RemoteContentBoundary revert={revertToBundledContent}><NativeApp /></RemoteContentBoundary></ErrorBoundary></StrictMode>)
