import { Capacitor } from '@capacitor/core'
import { Share } from '@capacitor/share'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Browser } from '@capacitor/browser'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { LEGACY_REMINDER_ID, REMINDER_IDS, type ReminderItem } from './reminders'

export const native = Capacitor.isNativePlatform()
export async function tapFeedback() {
  if (native) try { await Haptics.impact({ style: ImpactStyle.Light }) } catch { /* 可关闭触感的设备也能用。 */ }
}
export async function shareDiscovery(title: string, text: string, url: string): Promise<'shared' | 'copied' | 'cancelled'> {
  try {
    if (native) { await Share.share({ title, text, url, dialogTitle: title }); return 'shared' }
    if (navigator.share) { await navigator.share({ title, text, url }); return 'shared' }
    await navigator.clipboard.writeText(`${text}\n${url}`)
    return 'copied'
  } catch { return 'cancelled' }
}
/**
 * 分享一张本机画好的图。App 里：写进缓存目录再调系统分享（导出改观簿用的是同一条路）；
 * 网页里：支持带文件的 Web Share 就用它，否则直接下载 PNG。
 */
export async function shareCanvas(canvas: HTMLCanvasElement, fileName: string, title: string): Promise<'shared' | 'downloaded' | 'cancelled'> {
  try {
    if (native) {
      const data = canvas.toDataURL('image/png').split(',')[1]
      const file = await Filesystem.writeFile({ path: fileName, data, directory: Directory.Cache })
      await Share.share({ title, files: [file.uri], dialogTitle: title })
      return 'shared'
    }
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) return 'cancelled'
    const file = new File([blob], fileName, { type: 'image/png' })
    if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title }); return 'shared' }
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = fileName; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    return 'downloaded'
  } catch { return 'cancelled' }
}
/**
 * 预排每日提醒（内容见 reminders.ts）。request=true 时才会弹系统权限框——只在用户主动开启时这样做；
 * 打开 App 时的静默重排用 request=false，没有权限就什么都不做。
 */
export async function scheduleReminders(items: ReminderItem[], request: boolean): Promise<boolean> {
  if (!native) return false
  const permission = request ? await LocalNotifications.requestPermissions() : await LocalNotifications.checkPermissions()
  if (permission.display !== 'granted') return false
  await cancelReminders()
  if (items.length) await LocalNotifications.schedule({ notifications: items.map((item) => ({ id: item.id, title: item.title, body: item.body, schedule: { at: item.at, allowWhileIdle: true }, extra: { day: item.day } })) })
  return true
}
async function cancelReminders() {
  await LocalNotifications.cancel({ notifications: [LEGACY_REMINDER_ID, ...REMINDER_IDS].map((id) => ({ id })) })
}
export async function stopReminder() {
  if (native) await cancelReminders()
}
export async function openSource(url: string) {
  if (!/^https?:\/\//.test(url)) return
  if (native) await Browser.open({ url })
  else window.open(url, '_blank', 'noopener,noreferrer')
}
