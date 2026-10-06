import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { App as DeviceApp } from '@capacitor/app'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { Capacitor } from '@capacitor/core'
import { Share } from '@capacitor/share'
import { mythsFor } from '../data/localized'
import { CATEGORIES, type CategoryId } from '../types'
import { categoryLabel, confidenceMeta, expandQuery, parsePath, type Locale } from '../i18n'
import { PlayDeck } from '../components/PlayDeck'
import { MythCard } from '../components/MythCard'
import { MythDetail } from '../components/MythDetail'
import { useReadProgress } from '../hooks/useReadProgress'
import { Experiments } from './Experiments'
import { appendDiscovery, dailyQuestions, loadJournal, localDay, SAVED_KEY, type Discovery } from './journal'
import { native, openSource, setReminder, shareDiscovery, stopReminder } from './platform'

function stored(key: string, fallback = ''): string { try { return localStorage.getItem(key) ?? fallback } catch { return fallback } }
function remember(key: string, value: string) { try { localStorage.setItem(key,value) } catch { /* 存储失败不挡阅读。 */ } }
function savedIds(): Set<string> { try { const value = JSON.parse(stored(SAVED_KEY,'[]')); return new Set(Array.isArray(value) ? value.filter(x=>typeof x==='string') : []) } catch { return new Set() } }
type Tab = 'today'|'play'|'all'|'mine'

export default function NativeApp() {
  const [locale,setLocale] = useState<Locale>(() => stored('app-locale') === 'en' ? 'en':'zh')
  const zh = locale === 'zh'
  const [tab,setTab] = useState<Tab>('today')
  const [journal,setJournal] = useState(loadJournal)
  const [saved,setSaved] = useState(savedIds)
  const [day,setDay] = useState(localDay)
  const [query,setQuery] = useState('')
  const [category,setCategory] = useState<CategoryId|'all'>('all')
  const [onlyRisky,setOnlyRisky] = useState(false)
  const [onlySaved,setOnlySaved] = useState(false)
  const [openId,setOpenId] = useState<string|null>(null)
  const [theme,setTheme] = useState(stored('app-theme','auto'))
  const [large,setLarge] = useState(stored('app-large')==='1')
  const [reminder,setReminderState] = useState(stored('app-reminder'))
  const [time,setTime] = useState(stored('app-reminder','19:30'))
  const [notice,setNotice] = useState('')
  const [busy,setBusy] = useState(false)
  const opener = useRef<HTMLElement|null>(null)
  const myths = useMemo(()=>mythsFor(locale),[locale])
  const round = useMemo(()=>dailyQuestions(day,journal),[day,journal])
  const {read,markRead,toggleRead,readCount} = useReadProgress()
  const current = myths.find(m=>m.id===openId)
  const filtered = useMemo(()=> {
    const terms=expandQuery(query.trim().toLowerCase())
    return myths.filter(m=>(category==='all'||m.category===category)&&(!onlyRisky||m.stakes==='risky')&&(!onlySaved||saved.has(m.id))&&(!query.trim()||terms.some(term=>`${m.belief}\n${m.truth}\n${m.detail}\n${m.origin}`.toLowerCase().includes(term))))
  },[myths,category,onlyRisky,onlySaved,saved,query])
  const latest = useMemo(()=>{const records=new Map<string,Discovery>();for(const r of [...journal].reverse())if(!records.has(r.id))records.set(r.id,r);return [...records.values()]},[journal])
  const review = latest.filter(r=>r.correct!==true && localDay(new Date(r.shownAt))<day)
  useEffect(()=>{remember('app-locale',locale);document.documentElement.lang=zh?'zh-CN':'en';document.title=zh?'其实不是':'Actually, Not'},[locale,zh])
  useEffect(()=>{document.documentElement.dataset.theme=theme;remember('app-theme',theme)},[theme])
  useEffect(()=>{document.documentElement.classList.toggle('app-large',large);remember('app-large',large?'1':'0')},[large])
  useEffect(()=>{
    const sync=()=>{setDay(localDay());setSaved(savedIds())}
    const handle=(e:MouseEvent)=>{
      if (!native) return
      const a=(e.target as Element)?.closest('a[href]') as HTMLAnchorElement|null
      if (a && /^https?:\/\//.test(a.href) && a.origin !== window.location.origin) { e.preventDefault();void openSource(a.href) }
    }
    document.addEventListener('visibilitychange',sync)
    window.addEventListener('actually-not-saved',sync)
    document.addEventListener('click',handle)
    return()=>{document.removeEventListener('visibilitychange',sync);window.removeEventListener('actually-not-saved',sync);document.removeEventListener('click',handle)}
  },[])
  useEffect(()=>{
    if (!native) return
    const promise=DeviceApp.addListener('appUrlOpen',event=>{try { const parsed=parsePath(new URL(event.url).pathname);setLocale(parsed.locale);if (mythsFor(parsed.locale).some(m=>m.id===parsed.id)) setOpenId(parsed.id) } catch { /* 忽略未知链接。 */ }})
    return()=>{void promise.then(listener=>listener.remove())}
  },[])
  useEffect(()=>{
    if (!native) return
    const promise=DeviceApp.addListener('backButton',()=>{if(openId)setOpenId(null);else if(tab!=='today')setTab('today')})
    return()=>{void promise.then(listener=>listener.remove())}
  },[openId,tab])
  const open = useCallback((id:string)=> { if (!mythsFor('zh').some(m=>m.id===id))return;opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setOpenId(id);markRead(id) },[markRead])
  const close = useCallback(()=>{setOpenId(null);requestAnimationFrame(()=>opener.current?.focus())},[])
  function browse() {setTab('all');setQuery('');setCategory('all');setOnlyRisky(false);setOnlySaved(false);window.scrollTo({top:0})}
  function switchTab(next:Tab) {setTab(next);setSaved(savedIds());setNotice('');window.scrollTo({top:0})}
  function save(id:string) {const next=new Set(saved);if(next.has(id))next.delete(id);else next.add(id);setSaved(next);remember(SAVED_KEY,JSON.stringify([...next]));window.dispatchEvent(new Event('actually-not-saved'))}
  function answer(record:Discovery) {setJournal(appendDiscovery(record))}
  async function reminderToggle() {
    setBusy(true)
    try {if(reminder){await stopReminder();setReminderState('');remember('app-reminder','');setNotice(zh?'提醒已关闭。':'Reminders are off.')}else{const ok=await setReminder(time,locale);if(ok){setReminderState(time);remember('app-reminder',time);setNotice(zh?'提醒已设置。':'Reminder scheduled.')}else setNotice(zh?'请在系统设置允许通知后重试。':'Allow notifications in system settings, then retry.')}}catch{setNotice(zh?'暂时无法设置提醒，请稍后重试。':'Unable to schedule a reminder. Please retry.')}finally{setBusy(false)}
  }
  async function exportJournal() {
    const data=JSON.stringify({version:1,exportedAt:new Date().toISOString(),journal:loadJournal(),saved:[...saved],read:[...read]},null,2)
    try {
      if(Capacitor.isNativePlatform()){const result=await Filesystem.writeFile({path:'actually-not-discoveries.json',data,directory:Directory.Cache,encoding:Encoding.UTF8});await Share.share({title:zh?'导出改观簿':'Export discoveries',files:[result.uri]})}
      else{const url=URL.createObjectURL(new Blob([data],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='actually-not-discoveries.json';a.click();URL.revokeObjectURL(url)}
    }catch{setNotice(zh?'导出未完成，你的记录仍保留在设备上。':'Export was not completed. Your records are still on this device.')}
  }
  return <div className="app-shell">
    <header className="app-header"><div><p>{zh?'给直觉一个小意外':'A little surprise for your intuition'}</p><h1>{zh?'其实不是':'Actually, Not'}</h1></div><button className="app-language" onClick={()=>setLocale(zh?'en':'zh')}>{zh?'English':'中文'}</button></header>
    <main className="app-main">
      {tab==='today'&&<><div className="app-day"><span>{day.replaceAll('-',' / ')}</span><span>{zh?'每次三条 · 随时直接看答案':'Three at a time · skip straight to evidence'}</span></div><PlayDeck key={`${locale}:${day}`} locale={locale} onOpen={open} onBrowse={browse} onRead={markRead} initialRound={round} onDiscovery={answer}/><p className="app-experiment-note">{zh?'优先带来未玩过的题，再回看以前的发现。题目用完后会复习，内容不以数量换准确性。':'Unseen questions come first, with past discoveries revisited. When you have seen the pool, rounds become review.'}</p></>}
      {tab==='play'&&<><div className="app-section-title"><p className="play-eyebrow">{zh?'玩一会儿':'Explore for a moment'}</p><h2>{zh?'让手和眼睛也参与。':'Let your hands and eyes join in.'}</h2></div><Experiments locale={locale} onOpen={open}/><details className="app-freeplay"><summary>{zh?'再来一轮主题挑战':'Play another themed round'}</summary><PlayDeck key={locale} locale={locale} onOpen={open} onBrowse={browse} onRead={markRead} onDiscovery={answer}/></details></>}
      {tab==='all'&&<><div className="app-section-title"><h2>{zh?'全部内容，随你翻。':'Every entry. Yours to explore.'}</h2><p>{zh?`${myths.length} 条 · 每条附出处 · 无需解锁`:`${myths.length} entries · all sourced · no unlocking`}</p></div><div className="app-library-controls"><input type="search" aria-label={zh?'搜索全部内容':'Search every entry'} placeholder={zh?'搜索说法、人物、关键词':'Search claims, names, keywords'} value={query} onChange={e=>setQuery(e.target.value)}/><div className="app-category-list"><button aria-pressed={category==='all'} onClick={()=>setCategory('all')}>{zh?'全部':'All'}</button>{CATEGORIES.map(c=><button key={c.id} aria-pressed={category===c.id} onClick={()=>setCategory(c.id)}>{categoryLabel(c.id,locale)}</button>)}</div><div className="app-library-options"><label><input type="checkbox" checked={onlyRisky} onChange={e=>setOnlyRisky(e.target.checked)}/>{zh?'照做可能有害':'Potentially harmful'}</label><label><input type="checkbox" checked={onlySaved} onChange={e=>setOnlySaved(e.target.checked)}/>{zh?'我的收藏':'Saved entries'}</label><button className="play-text-button" onClick={browse}>{zh?'清除筛选':'Clear filters'}</button></div></div><p className="app-result-count" aria-live="polite">{zh?`${filtered.length} 条 · 已读 ${readCount}/${myths.length}`:`${filtered.length} entries · read ${readCount}/${myths.length}`}</p>{!filtered.length&&<p>{zh?'没有符合这些条件的条目。试试别的关键词，或清除筛选。':'No matching entries. Try another keyword or clear filters.'}</p>}<div className="app-card-grid">{filtered.map((m,i)=><MythCard key={m.id} myth={m} index={i} locale={locale} read={read.has(m.id)} query={query} onOpen={()=>open(m.id)}/>)}</div></>}
      {tab==='mine'&&<><div className="app-section-title"><p className="play-eyebrow">{zh?'只保存在你的设备':'Stored on your device'}</p><h2>{zh?'我的改观簿':'My discoveries'}</h2><p>{zh?`${latest.length} 次发现 · ${saved.size} 条收藏`:`${latest.length} discoveries · ${saved.size} saved`}</p></div>
        {review.length>0&&<section className="app-review"><h3>{zh?'隔几天，再想一想':'Think again after a few days'}</h3><p>{zh?`${review.length} 条以前不确定或选错的发现，等你回看。`:`${review.length} discoveries you skipped or missed are ready to revisit.`}</p>{review.slice(0,3).map(r=><button className="play-text-button" key={r.id} onClick={()=>open(r.id)}>{myths.find(m=>m.id===r.id)?.belief} ↗</button>)}</section>}
        {!latest.length&&<p className="app-experiment-note">{zh?'揭晓一题，这里就会留下你的发现。也可以不答题，直接查完整资料库。':'Reveal a question to start your journal, or explore the complete library directly.'}</p>}
        <div className="app-journal">{latest.map(r=>{const m=myths.find(item=>item.id===r.id);return m?<article key={r.id}><p className="play-eyebrow">{localDay(new Date(r.shownAt))} · {categoryLabel(m.category,locale)}</p><button className="app-journal-title" onClick={()=>open(m.id)}>{m.belief} ↗</button><p className="app-old-choice">{zh?'当时的直觉：':'Your first thought: '}{r.choice?.[locale]??(zh?'直接看了答案':'Skipped to the answer')}{r.certainty!==null&&` · ${zh?['猜的','有点把握','非常确定'][r.certainty]:['Guessing','Fairly sure','Very sure'][r.certainty]}`}</p><p>{m.truth}</p><div className="play-actions"><span className="play-stamp">{confidenceMeta(m.confidence,locale).label}</span><button className="play-text-button" aria-pressed={saved.has(m.id)} onClick={()=>save(m.id)}>{saved.has(m.id)?(zh?'已收藏 · 取消':'Saved · remove'):(zh?'收藏':'Save')}</button></div></article>:null})}</div>
        <section className="app-settings"><h3>{zh?'阅读与提醒':'Reading and reminders'}</h3><div className="app-setting-row"><label htmlFor="app-theme">{zh?'外观':'Appearance'}</label><select id="app-theme" value={theme} onChange={e=>setTheme(e.target.value)}><option value="auto">{zh?'跟随系统':'System'}</option><option value="light">{zh?'浅色':'Light'}</option><option value="dark">{zh?'深色':'Dark'}</option></select></div><label className="app-setting-row"><span>{zh?'放大文字':'Larger text'}</span><input type="checkbox" checked={large} onChange={e=>setLarge(e.target.checked)}/></label>{native&&<div className="app-reminder"><label htmlFor="app-time">{zh?'每日提醒时间':'Daily reminder time'}</label><input id="app-time" type="time" value={time} disabled={!!reminder} onChange={e=>setTime(e.target.value)}/><button className="play-primary" disabled={busy} onClick={()=>void reminderToggle()}>{reminder?(zh?'关闭提醒':'Turn off reminders'):(zh?'开启提醒':'Enable reminders')}</button></div>}<button className="play-text-button" onClick={()=>void exportJournal()}>{zh?'导出收藏和改观簿':'Export saved entries and discoveries'}</button><button className="play-text-button" onClick={()=>void shareDiscovery(zh?'其实不是':'Actually, Not',zh?'每次三条，每条附出处。一起给直觉一个意外。':'Three discoveries at a time, each with sources.','https://actually-not.com/')}>{zh?'把这个 App 分享给朋友':'Share the app with a friend'}</button><p className="app-notice" role="status">{notice}</p><p className="app-experiment-note">{zh?'无需账号，不上传你的答题、收藏或搜索记录。删除 App 可能会丢失本地记录，建议先导出。':'No account required. Answers, saved entries and searches are not uploaded. Export your records before uninstalling.'}</p><button className="play-text-button" onClick={()=>void openSource(`https://actually-not.com/privacy/`)}>{zh?'隐私说明与支持':'Privacy and support'}</button><p className="app-experiment-note">{zh?'本站提供一般科普信息，不是医疗器械，不诊断、治疗或预防疾病。涉及急救先联系当地急救服务；身体不适请咨询医生。':'General educational information. Not a medical device; does not diagnose, treat or prevent disease. Contact local emergency services first in an emergency; seek medical advice when unwell.'}</p><small>1.0.0 · actually-not.com</small></section>
      </>}
    </main>
    <nav className="app-bottom-nav" aria-label={zh?'主导航':'Main navigation'}>{(['today','play','all','mine'] as Tab[]).map((id,i)=><button key={id} aria-current={tab===id?'page':undefined} onClick={()=>switchTab(id)}><span aria-hidden="true">{['○','◇','▤','⌑'][i]}</span>{(zh?['今天','玩法','全部','我的']:['Today','Play','All','Mine'])[i]}</button>)}</nav>
    {current&&<MythDetail myth={current} index={myths.findIndex(m=>m.id===current.id)} read={read.has(current.id)} locale={locale} onClose={close} onToggleRead={()=>toggleRead(current.id)} onOpenMyth={open}/>}
  </div>
}
