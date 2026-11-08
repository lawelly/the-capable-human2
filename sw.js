/* Offline support: always try the network first, fall back to the cached app shell offline.
   Bump VERSION whenever you deploy changes so phones pick up the new files. */
const VERSION = 'tch-v3';
const SHELL = ['./', 'index.html', 'css/style.css', 'js/firebase-config.js', 'js/sync.js', 'js/data.js', 'js/app.js',
  'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  const sameOrigin = url.origin === location.origin;
  const fonts = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (!sameOrigin && !fonts) return; // Firebase and Google sign-in go straight to the network
  // Network first so new releases show up right away; the cache is the offline fallback.
  e.respondWith(caches.open(VERSION).then(c =>
    fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })
      .catch(() => c.match(e.request, { ignoreSearch: true }))
  ));
});
