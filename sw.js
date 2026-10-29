/* J.Law Notepad Service Worker */
const CACHE = 'jl-notepad-v2';
const PRECACHE = [
  './',
  './index.html',
  './vendor/tailwindcss.js',
  './vendor/html2canvas.min.js',
  './vendor/jspdf.umd.min.js',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // CDN / Supabase: network only
  if (url.hostname.includes('supabase') || url.hostname.includes('jsdelivr')) {
    return;
  }

  if (/\.(js|css|png|jpg|jpeg|webp|woff2?|svg|webmanifest)$/i.test(url.pathname) ||
      url.pathname.endsWith('/vendor/tailwindcss.js')) {
    event.respondWith(
      caches.match(req).then((cached) =>
        cached ||
        fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        }).catch(() => cached)
      )
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then((c) => c || caches.match('./index.html') || caches.match('./'))
      )
  );
});
