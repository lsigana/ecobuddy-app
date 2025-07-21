export class NotificationService {
  static async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    return false
  }

  static async sendNotification(title, body, icon = '/favicon.ico') {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon,
        badge: '/favicon.ico',
        vibrate: [200, 100, 200],
        tag: 'ecobuddy-notification'
      })
    }
  }

  static async scheduleReminder() {
    if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready
      
      // Schedule daily reminder
      setTimeout(() => {
        registration.showNotification('EcoBuddy Reminder', {
          body: 'Don\'t forget to log your eco-actions today!',
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          vibrate: [200, 100, 200],
          tag: 'daily-reminder'
        })
      }, 24 * 60 * 60 * 1000) // 24 hours
    }
  }
}
