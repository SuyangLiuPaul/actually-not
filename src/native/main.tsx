import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import NativeApp from './NativeApp'
import { ErrorBoundary } from '../components/ErrorBoundary'

const container = document.getElementById('root')
if (!container) throw new Error('找不到应用挂载点')
createRoot(container).render(<StrictMode><ErrorBoundary><NativeApp /></ErrorBoundary></StrictMode>)
