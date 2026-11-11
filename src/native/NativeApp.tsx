import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { App as DeviceApp } from '@capacitor/app'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'
import { mythsFor } from '../data/localized'
import type { CategoryId, Myth } from '../types'
import { categoryLabel, confidenceMeta, parsePath, type Locale } from '../i18n'
import { MythDetail } from '../components/MythDetail'
import { useReadProgress } from '../hooks/useReadProgress'
import {
  addUseDay, appendRecord, beliefOn, dailyBeliefIds, dueReviews, loadJournal, localDay, migrateStoredJournal, quizRecord, rawJournal,
  REMINDER_OFFER_AFTER_DAYS, SAVED_KEY, type Discovery, type Stance,
} from './journal'
import { native, openSource, scheduleReminders, shareCanvas, shareDiscovery, stopReminder, tapFeedback } from './platform'
import { DEFAULT_REMINDER_TIME, reminderPlan } from './reminders'
import { renderShareCard } from './shareCard'
import { TodayView } from './TodayView'
import { LibraryView, type LibraryFilter } from './LibraryView'
import { JournalView } from './JournalView'
import { APP_VERSION, SettingsView } from './SettingsView'

function stored(key: string, fallback = ''): string { try { return localStorage.getItem(key) ?? fallback } catch { return fallback } }
function remember(key: string, value: string) { try { localStorage.setItem(key, value) } catch { /* 存储失败不挡阅读。 */ } }
function savedIds(): Set<string> { try { const value = JSON.parse(stored(SAVED_KEY, '[]')); return new Set(Array.isArray(value) ? value.filter((x) => typeof x === 'string') : []) } catch { return new Set() } }
function storedList(key: string): string[] { try { const v: unknown = JSON.parse(stored(key, '[]')); return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [] } catch { return [] } }
/** 首次启动跟随系统语言（zh* → 中文，其余 → 英文）；用户在设置里选过就记住。 */
function initialLocale(): Locale {
  const chosen = stored('app-locale')
  if (chosen === 'zh' || chosen === 'en') return chosen
  const lang = (typeof navigator !== 'undefined' && (navigator.languages?.[0] ?? navigator.language)) || ''
  return /^zh/i.test(lang) ? 'zh' : 'en'
}

type Tab = 'today' | 'library' | 'journal'
type JournalMode = 'list' | 'review' | 'settings'
const TABS: Tab[] = ['today', 'library', 'journal']

function TabIcon({ tab }: { tab: Tab }) {
  if (tab === 'today') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4M16 3v4M4 10h16" /><path d="M8.5 15.5c2.2-.6 4.6-.9 7-1" className="pen" /></svg>
  if (tab === 'library') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h11a2 2 0 0 1 2 2v15H8a2 2 0 0 1-2-2z" /><path d="M6 18.5a2 2 0 0 1 2-2h11" /><path d="M10 8.5l1.6 1.6L15 6.8" /></svg>
}

export default function NativeApp() {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const zh = locale === 'zh'
  const [tab, setTab] = useState<Tab>('today')
  const [journalMode, setJournalMode] = useState<JournalMode>('list')
  const [journal, setJournal] = useState(() => { migrateStoredJournal(); return loadJournal() })
  const [saved, setSaved] = useState(savedIds)
  const [day, setDay] = useState(localDay)
  const [openId, setOpenId] = useState<string | null>(null)
  const [theme, setTheme] = useState(stored('app-theme', 'auto'))
  const [large, setLarge] = useState(stored('app-large') === '1')
  // 'app-reminder' 沿用 1.1 的含义：开启时存时间，关闭时为空
  const [reminderOn, setReminderOn] = useState(stored('app-reminder') !== '')
  const [reminderTime, setReminderTime] = useState(stored('app-reminder') || stored('app-reminder-time') || DEFAULT_REMINDER_TIME)
  const [useDays, setUseDays] = useState(() => storedList('app-used-days'))
  const [offerDismissed, setOfferDismissed] = useState(stored('app-reminder-offer') === 'dismissed')
  const [libraryFilter, setLibraryFilter] = useState<LibraryFilter>({ category: 'all', nonce: 0 })
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const opener = useRef<HTMLElement | null>(null)
  const myths = useMemo(() => mythsFor(locale), [locale])
  const visible = useMemo(() => new Set(myths.map((m) => m.id)), [myths])
  const todayIds = useMemo(() => dailyBeliefIds(day, myths, journal), [day, myths, journal])
  const due = useMemo(() => dueReviews(day, journal, visible), [day, journal, visible])
  const { read, markRead, toggleRead, readCount } = useReadProgress()
  const current = myths.find((m) => m.id === openId)

  useEffect(() => { document.documentElement.lang = zh ? 'zh-CN' : 'en'; document.title = zh ? '先别急着信' : 'Not So Fast' }, [zh])
  useEffect(() => { document.documentElement.dataset.theme = theme; remember('app-theme', theme) }, [theme])
  useEffect(() => { document.documentElement.classList.toggle('app-large', large); remember('app-large', large ? '1' : '0') }, [large])
  useEffect(() => { setUseDays((days) => { const next = addUseDay(days, day); remember('app-used-days', JSON.stringify(next)); return next }) }, [day])
  useEffect(() => {
    const sync = () => { setDay(localDay()); setSaved(savedIds()) }
    const handle = (e: MouseEvent) => {
      if (!native) return
      const a = (e.target as Element)?.closest('a[href]') as HTMLAnchorElement | null
      if (a && /^https?:\/\//.test(a.href) && a.origin !== window.location.origin) { e.preventDefault(); void openSource(a.href) }
    }
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('actually-not-saved', sync)
    document.addEventListener('click', handle)
    return () => { document.removeEventListener('visibilitychange', sync); window.removeEventListener('actually-not-saved', sync); document.removeEventListener('click', handle) }
  }, [])
  useEffect(() => {
    if (!native) return
    const promise = DeviceApp.addListener('appUrlOpen', (event) => { try { const parsed = parsePath(new URL(event.url).pathname); if (mythsFor(parsed.locale).some((m) => m.id === parsed.id)) setOpenId(parsed.id) } catch { /* 忽略未知链接。 */ } })
    return () => { void promise.then((listener) => listener.remove()) }
  }, [])
  useEffect(() => {
    if (!native) return
    const promise = DeviceApp.addListener('backButton', () => {
      if (openId) setOpenId(null)
      else if (tab === 'journal' && journalMode !== 'list') setJournalMode('list')
      else if (tab !== 'today') setTab('today')
    })
    return () => { void promise.then((listener) => listener.remove()) }
  }, [openId, tab, journalMode])

  // 提醒开着时，每次打开 App、表态、换语言都按最新记录重排未来 7 天（不弹权限框）
  const plan = useCallback((time: string) => reminderPlan({
    now: new Date(), time, locale,
    todayDone: todayIds.every((id) => beliefOn(day, id, journal)),
    beliefFor: (d) => myths.find((m) => m.id === dailyBeliefIds(d, myths, journal)[0])?.belief,
  }), [locale, todayIds, day, journal, myths])
  useEffect(() => { if (native && reminderOn) void scheduleReminders(plan(reminderTime), false).catch(() => {}) }, [reminderOn, reminderTime, plan])

  const open = useCallback((id: string) => { if (!mythsFor('zh').some((m) => m.id === id)) return; opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setOpenId(id); markRead(id) }, [markRead])
  const close = useCallback(() => { setOpenId(null); requestAnimationFrame(() => opener.current?.focus()) }, [])
  function switchTab(next: Tab) { setTab(next); setJournalMode('list'); setSaved(savedIds()); setNotice(''); window.scrollTo({ top: 0 }) }
  function toLibrary(category: CategoryId | 'all') { setLibraryFilter((f) => ({ category, nonce: f.nonce + 1 })); switchTab('library') }
  function save(id: string) { const next = new Set(saved); if (next.has(id)) next.delete(id); else next.add(id); setSaved(next); remember(SAVED_KEY, JSON.stringify([...next])); window.dispatchEvent(new Event('actually-not-saved')) }
  function answer(id: string, stance: Stance | null) { setJournal(appendRecord({ v: 2, kind: 'belief', id, shownAt: new Date().toISOString(), stance })); markRead(id); void tapFeedback() }
  function reviewed(id: string, recalled: boolean) { setJournal(appendRecord({ v: 2, kind: 'review', id, shownAt: new Date().toISOString(), recalled })) }
  function quiz(record: Discovery) { setJournal(appendRecord(quizRecord(record))) }
  function chooseLocale(next: Locale) { setLocale(next); remember('app-locale', next) }

  async function shareMyth(m: Myth) {
    setNotice('')
    try {
      const canvas = await renderShareCard({ belief: m.belief, truth: m.truth, confidence: m.confidence, confidenceLabel: confidenceMeta(m.confidence, locale).label, category: categoryLabel(m.category, locale), locale, artSrc: `/illu/${m.id}.webp` })
      const result = await shareCanvas(canvas, `actually-not-${m.id}.png`, zh ? '先别急着信' : 'Not So Fast')
      if (result === 'downloaded') setNotice(zh ? '结论图已保存。' : 'Image saved.')
    } catch { setNotice(zh ? '暂时无法生成结论图。' : 'Could not create the image.') }
  }
  async function enableReminder(time = reminderTime) {
    setBusy(true)
    try {
      const ok = await scheduleReminders(plan(time), true)
      if (ok) { setReminderOn(true); remember('app-reminder', time); remember('app-reminder-time', time); setNotice(zh ? `提醒已开启：每天 ${time}。` : `Reminder on: daily at ${time}.`) }
      else setNotice(zh ? '请在系统设置里允许通知，然后再试一次。' : 'Allow notifications in system settings, then try again.')
    } catch { setNotice(zh ? '暂时无法设置提醒，请稍后重试。' : 'Unable to schedule a reminder. Please retry.') } finally { setBusy(false) }
  }
  async function reminderToggle() {
    if (!reminderOn) return enableReminder()
    setBusy(true)
    try { await stopReminder(); setReminderOn(false); remember('app-reminder', ''); setNotice(zh ? '提醒已关闭。' : 'Reminders are off.') } catch { setNotice(zh ? '暂时无法关闭提醒，请稍后重试。' : 'Unable to change reminders. Please retry.') } finally { setBusy(false) }
  }
  function dismissOffer() { setOfferDismissed(true); remember('app-reminder-offer', 'dismissed') }
  async function exportJournal() {
    // 导出存储里的全部原始记录（含当前平台不显示的），换平台导入时不丢
    const data = JSON.stringify({ version: 2, app: APP_VERSION, exportedAt: new Date().toISOString(), journal: rawJournal(), saved: [...saved], read: [...read] }, null, 2)
    try {
      if (native) { const result = await Filesystem.writeFile({ path: 'actually-not-discoveries.json', data, directory: Directory.Cache, encoding: Encoding.UTF8 }); await Share.share({ title: zh ? '导出改观簿' : 'Export journal', files: [result.uri] }) }
      else { const url = URL.createObjectURL(new Blob([data], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'actually-not-discoveries.json'; a.click(); URL.revokeObjectURL(url) }
    } catch { setNotice(zh ? '导出未完成，你的记录仍保留在设备上。' : 'Export was not completed. Your records are still on this device.') }
  }

  const showOffer = native && !reminderOn && !offerDismissed && useDays.length >= REMINDER_OFFER_AFTER_DAYS
  const labels = zh ? { today: '今天', library: '资料库', journal: '改观簿' } : { today: 'Today', library: 'Library', journal: 'Journal' }

  return <div className="app-shell">
    <main className="app-main">
      {tab === 'today' && <TodayView key={`${day}:${todayIds.join(',')}`} day={day} ids={todayIds} myths={myths} journal={journal} locale={locale} total={myths.length} dueCount={due.length}
        onAnswer={answer} onOpen={open} onShare={(m) => void shareMyth(m)} onReview={() => { switchTab('journal'); setJournalMode('review') }} onLibrary={() => toLibrary('all')} onJournal={() => switchTab('journal')} />}
      {tab === 'library' && <LibraryView key={`${locale}:${libraryFilter.nonce}`} myths={myths} locale={locale} read={read} readCount={readCount} saved={saved} initial={libraryFilter} onOpen={open} onRead={markRead} onQuiz={quiz} />}
      {tab === 'journal' && journalMode === 'settings' && <SettingsView locale={locale} theme={theme} large={large} nativeApp={native} reminderOn={reminderOn} reminderTime={reminderTime} busy={busy} notice={notice}
        onBack={() => { setJournalMode('list'); setNotice('') }} onLocale={chooseLocale} onTheme={setTheme} onLarge={setLarge} onReminderTime={setReminderTime} onReminderToggle={() => void reminderToggle()}
        onExport={() => void exportJournal()} onShareApp={() => void shareDiscovery(zh ? '先别急着信' : 'Not So Fast', zh ? '每天一条「你以为」，每条附出处。' : 'One “you might think” a day, every one sourced.', 'https://actually-not.com/')} onPrivacy={() => void openSource('https://actually-not.com/privacy/')} />}
      {tab === 'journal' && journalMode !== 'settings' && <JournalView journal={journal} myths={myths} locale={locale} day={day} read={read} readCount={readCount} saved={saved} due={due} reviewing={journalMode === 'review'} showOffer={showOffer}
        onReviewStart={() => setJournalMode('review')} onReviewEnd={() => setJournalMode('list')} onReviewRecord={reviewed} onOpen={open} onSave={save} onSettings={() => { setJournalMode('settings'); window.scrollTo({ top: 0 }) }}
        onToday={() => switchTab('today')} onLibrary={toLibrary} onOfferAccept={() => { dismissOffer(); void enableReminder() }} onOfferDismiss={dismissOffer} />}
      {notice && tab !== 'journal' && <p className="toast" role="status">{notice}</p>}
    </main>
    <nav className="app-bottom-nav" aria-label={zh ? '主导航' : 'Main navigation'}>
      {TABS.map((id) => <button key={id} aria-current={tab === id ? 'page' : undefined} onClick={() => switchTab(id)}><TabIcon tab={id} /><span>{labels[id]}</span></button>)}
    </nav>
    {current && <MythDetail myth={current} index={myths.findIndex((m) => m.id === current.id)} read={read.has(current.id)} locale={locale} onClose={close} onToggleRead={() => toggleRead(current.id)} onOpenMyth={open}
      actions={<>
        <button className="ghost-button" aria-pressed={saved.has(current.id)} onClick={() => save(current.id)}>{saved.has(current.id) ? (zh ? '已收藏 · 取消' : 'Saved · remove') : (zh ? '收藏' : 'Save')}</button>
        <button className="ghost-button" onClick={() => void shareMyth(current)}>{zh ? '分享结论图' : 'Share as image'}</button>
      </>} />}
  </div>
}
