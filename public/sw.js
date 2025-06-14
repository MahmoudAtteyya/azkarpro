// Service Worker for Azkar App
const CACHE_NAME = 'azkar-cache-v1';

// This is the service worker with the Cache-first network
// Add this below to the "catch" handler
self.__WB_MANIFEST;

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/manifest.json',
        '/icons/app-icon.png',
        '/images/logo-black.png',
        '/images/logo-white.png'
      ]);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Start scheduling notifications
      scheduleNotifications(),
      // Request notification permission
      self.registration.showNotification('تطبيق الأذكار', {
        body: 'تم تفعيل الإشعارات بنجاح',
        icon: '/icons/app-icon.png',
        badge: '/icons/app-icon.png'
      })
    ])
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icons/app-icon.png',
    badge: '/icons/app-icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'فتح التطبيق'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('تطبيق الأذكار', options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Schedule notifications
function scheduleNotifications() {
  // Morning notification at 6 AM GMT
  const morningTime = new Date();
  morningTime.setHours(6, 0, 0, 0);
  
  // Evening notification at 3 PM GMT
  const eveningTime = new Date();
  eveningTime.setHours(15, 0, 0, 0);

  // If the time has passed for today, schedule for tomorrow
  const now = new Date();
  if (morningTime < now) {
    morningTime.setDate(morningTime.getDate() + 1);
  }
  if (eveningTime < now) {
    eveningTime.setDate(eveningTime.getDate() + 1);
  }

  // Schedule morning notification
  setTimeout(() => {
    self.registration.showNotification('تطبيق الأذكار', {
      body: 'حان وقت أذكار الصباح',
      icon: '/icons/app-icon.png',
      badge: '/icons/app-icon.png',
      vibrate: [100, 50, 100],
      actions: [
        {
          action: 'open',
          title: 'فتح التطبيق'
        }
      ]
    });
    // Reschedule for next day
    scheduleNotifications();
  }, morningTime.getTime() - now.getTime());

  // Schedule evening notification
  setTimeout(() => {
    self.registration.showNotification('تطبيق الأذكار', {
      body: 'حان وقت أذكار المساء',
      icon: '/icons/app-icon.png',
      badge: '/icons/app-icon.png',
      vibrate: [100, 50, 100],
      actions: [
        {
          action: 'open',
          title: 'فتح التطبيق'
        }
      ]
    });
    // Reschedule for next day
    scheduleNotifications();
  }, eveningTime.getTime() - now.getTime());
} 