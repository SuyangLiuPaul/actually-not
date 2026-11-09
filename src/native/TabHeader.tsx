import type { ReactNode } from 'react'

export function TabHeader({ kicker, title, right }: { kicker?: ReactNode; title: ReactNode; right?: ReactNode }) {
  return <header className="tab-header">
    <div>{kicker && <p className="tab-kicker">{kicker}</p>}<h1>{title}</h1></div>
    {right && <div className="tab-header-right">{right}</div>}
  </header>
}
