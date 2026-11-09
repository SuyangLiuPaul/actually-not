import type { Locale } from '../i18n'
import { APP_PLATFORM } from '../data/platform'
import { TabHeader } from './TabHeader'

export const APP_VERSION = '1.2.0'

/** 设置（改观簿右上角的齿轮）：语言、外观、文字、提醒、导出、隐私、免责声明、版本。 */
export function SettingsView({ locale, theme, large, nativeApp, reminderOn, reminderTime, busy, notice, onBack, onLocale, onTheme, onLarge, onReminderTime, onReminderToggle, onExport, onShareApp, onPrivacy }: {
  locale: Locale
  theme: string
  large: boolean
  nativeApp: boolean
  reminderOn: boolean
  reminderTime: string
  busy: boolean
  notice: string
  onBack: () => void
  onLocale: (l: Locale) => void
  onTheme: (t: string) => void
  onLarge: (v: boolean) => void
  onReminderTime: (t: string) => void
  onReminderToggle: () => void
  onExport: () => void
  onShareApp: () => void
  onPrivacy: () => void
}) {
  const zh = locale === 'zh'
  return <section className="tab-view settings">
    <button className="link-button back" onClick={onBack}>{zh ? '← 改观簿' : '← Journal'}</button>
    <TabHeader title={zh ? '设置' : 'Settings'} />
    <div className="settings-group">
      <div className="setting-row"><span id="lang-label">{zh ? '语言' : 'Language'}</span>
        <div className="segmented" role="group" aria-labelledby="lang-label">
          <button aria-pressed={zh} onClick={() => onLocale('zh')}>中文</button>
          <button aria-pressed={!zh} onClick={() => onLocale('en')}>English</button>
        </div>
      </div>
      <div className="setting-row"><label htmlFor="app-theme">{zh ? '外观' : 'Appearance'}</label>
        <select id="app-theme" value={theme} onChange={(e) => onTheme(e.target.value)}><option value="auto">{zh ? '跟随系统' : 'System'}</option><option value="light">{zh ? '浅色' : 'Light'}</option><option value="dark">{zh ? '深色' : 'Dark'}</option></select>
      </div>
      <label className="setting-row"><span>{zh ? '放大文字' : 'Larger text'}</span><input type="checkbox" role="switch" checked={large} onChange={(e) => onLarge(e.target.checked)} /></label>
    </div>

    <div className="settings-group">
      <h2>{zh ? '每日一条提醒' : 'Daily reminder'}</h2>
      {nativeApp ? <>
        <p className="quiet-note">{zh ? '每天最多一条，内容就是当天的说法。默认关闭。' : 'At most one a day, showing that day’s claim. Off by default.'}</p>
        <div className="setting-row"><label htmlFor="app-time">{zh ? '时间' : 'Time'}</label><input id="app-time" type="time" value={reminderTime} disabled={reminderOn || busy} onChange={(e) => onReminderTime(e.target.value)} /></div>
        <label className="setting-row"><span>{zh ? '开启提醒' : 'Remind me'}</span><input type="checkbox" role="switch" checked={reminderOn} disabled={busy} onChange={onReminderToggle} /></label>
      </> : <p className="quiet-note">{zh ? '提醒只在安装版 App 里提供。' : 'Reminders are available in the installed app.'}</p>}
      <p className="app-notice" role="status">{notice}</p>
    </div>

    <div className="settings-group">
      <h2>{zh ? '你的记录' : 'Your records'}</h2>
      <p className="quiet-note">{zh ? '无需账号，不上传你的表态、收藏或搜索记录。删除 App 可能会丢失本地记录，建议先导出。' : 'No account. Your answers, saved entries and searches are never uploaded. Export before uninstalling.'}</p>
      <button className="ghost-button" onClick={onExport}>{zh ? '导出收藏和改观簿' : 'Export saved entries and journal'}</button>
      <button className="ghost-button" onClick={onShareApp}>{zh ? '把这个 App 分享给朋友' : 'Share the app with a friend'}</button>
      <button className="link-button" onClick={onPrivacy}>{zh ? '隐私说明与支持 ↗' : 'Privacy and support ↗'}</button>
    </div>

    <p className="quiet-note disclaimer">{APP_PLATFORM === 'android'
      ? (zh ? '本应用提供一般科普信息，并非任何专业建议。' : 'General educational information, not professional advice.')
      : (zh ? '本站提供一般科普信息，不是医疗器械，不诊断、治疗或预防疾病。涉及急救先联系当地急救服务；身体不适请咨询医生。' : 'General educational information. Not a medical device; does not diagnose, treat or prevent disease. Contact local emergency services first in an emergency; seek medical advice when unwell.')}</p>
    <p className="version">{APP_VERSION} · actually-not.com</p>
  </section>
}
