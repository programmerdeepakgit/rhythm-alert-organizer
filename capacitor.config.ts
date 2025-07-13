import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.02bdfa04331844399dd08c04786f88e3',
  appName: 'Babes Habit',
  webDir: 'dist',
  server: {
    url: 'https://02bdfa04-3318-4439-9dd0-8c04786f88e3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;