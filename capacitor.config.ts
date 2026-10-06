import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.actuallynot.app',
  appName: '其实不是',
  webDir: 'dist-app',
  ios: { contentInset: 'automatic', preferredContentMode: 'mobile' },
  android: { allowMixedContent: false },
  plugins: { LocalNotifications: { smallIcon: 'ic_stat_discovery', iconColor: '#cf3a30' } },
}
export default config
