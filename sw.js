/* ─────────────────────────────────────────────
   Service Worker — Khadhami Academy (khadhami.com)
   Cache-first for static assets, network-first for HTML.
   ───────────────────────────────────────────── */

const CACHE_VERSION = 'ka-v4';
const PRECACHE_URLS = [
    '/',
    
    '/css/variables.css',
    '/css/base.css',
    '/css/components.css',
    '/css/sections.css',
    '/css/responsive.css',
    '/js/i18n.js',
    '/js/theme.js',
    '/js/animations.js',
    '/js/app.js',
    '/assets/images/app-icon.png',
    '/assets/images/app-icon-round-128.webp',
    '/manifest.webmanifest'
];

/* Install — pre-cache critical resources */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

/* Activate — clean up old caches */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) => key !== CACHE_VERSION)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

/* Fetch — network-first for HTML, cache-first for static assets */
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET and cross-origin
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // HTML — network first, fallback to cache
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
                    return response;
                })
                .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
        );
        return;
    }

    // Static assets — cache first, fallback to network
    event.respondWith(
        caches.match(request)
            .then((cached) => {
                if (cached) return cached;
                return fetch(request).then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
                    }
                    return response;
                });
            })
    );
});
