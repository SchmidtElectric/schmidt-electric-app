// Schmidt Electric — Service Worker
// Handles background push notifications

self.addEventListener('push', function(event) {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body || '',
    icon: 'https://raw.githubusercontent.com/SchmidtElectric/schmidt-electric-app/main/Schmidt%20Electric%20Company%20Logo%20(1).png',
    badge: 'https://raw.githubusercontent.com/SchmidtElectric/schmidt-electric-app/main/Schmidt%20Electric%20Company%20Logo%20(1).png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' }
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Schmidt Electric', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});
