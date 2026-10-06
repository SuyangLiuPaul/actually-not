import { Capacitor } from '@capacitor/core'
import { Share } from '@capacitor/share'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Browser } from '@capacitor/browser'
import type { Locale } from '../i18n'

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
export async function setReminder(time: string, locale: Locale): Promise<boolean> {
  if (!native || !/^\d{2}:\d{2}$/.test(time)) return false
  const [hour, minute] = time.split(':').map(Number)
  if (hour > 23 || minute > 59) return false
  const permission = await LocalNotifications.requestPermissions()
  if (permission.display !== 'granted') return false
  await LocalNotifications.cancel({ notifications: [{ id: 301 }] })
  await LocalNotifications.schedule({ notifications: [{ id: 301, title: locale === 'zh' ? '其实不是' : 'Actually, Not', body: locale === 'zh' ? '今天，给直觉三个小意外。' : 'Three little surprises for your intuition today.', schedule: { on: { hour, minute }, repeats: true }, sound: undefined }] })
  return true
}
export async function stopReminder() {
  if (native) await LocalNotifications.cancel({ notifications: [{ id:301 }] })
}
export async function openSource(url: string) {
  if (!/^https?:\/\//.test(url)) return
  if (native) await Browser.open({ url })
  else window.open(url, '_blank', 'noopener,noreferrer')
}
