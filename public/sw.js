// Service Worker for Malli & Rishma Wedding Invitation
// Caches resources (images, audio, videos, fonts, chunks) for maximum speed & offline support

const CACHE_NAME = 'malli-rishma-v1'

const PRECACHE_RESOURCES = [
  '/',
  '/envelope-video-poster.jpg',
  '/floating-song.mp3',
  '/FLOATING%20SONG.mp3',
  '/editorial/couple-traditional.webp',
  '/editorial/couple-traditional.jpg',
  '/MR-logo-gold.png',
  '/icon.svg',
  '/icon.png',
  '/icon-192.png',
  '/icon-512.png',
]

// 1. Install Event: Precache essential assets
self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(PRECACHE_RESOURCES)
      } catch (err) {
        // Continue even if some individual asset fails
        console.warn('Pre-cache partial warning:', err)
      }
    })
  )
})

// 2. Activate Event: Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key)
            }
          })
        )
      ),
    ])
  )
})

// 3. Fetch Event: Cache-First for media & static assets, Network-First for HTML
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle GET requests for same origin or fonts/cdn
  if (request.method !== 'GET') return

  // Bypass Service Worker entirely on localhost / development / HMR
  if (
    url.hostname === 'localhost' ||
    url.hostname === '127.0.0.1' ||
    url.pathname.includes('/_next/webpack-hmr') ||
    url.pathname.includes('/__turbopack__')
  ) {
    return
  }

  // Do not intercept Range requests (avoids Safari/iOS video seeking issues)
  if (request.headers.get('range')) {
    return
  }

  // Check if target is a static resource (image, audio, video, font, chunk)
  const isStaticResource =
    url.pathname.startsWith('/_next/static') ||
    url.pathname.startsWith('/editorial') ||
    url.pathname.startsWith('/videos') ||
    url.pathname.startsWith('/audio') ||
    /\.(jpg|jpeg|png|webp|svg|ico|mp3|mp4|webm|woff2|woff|ttf|css|js)$/i.test(url.pathname)

  if (isStaticResource) {
    // Cache-First strategy: Return from cache immediately, fetch and cache on miss
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request)
        if (cached) {
          return cached
        }

        try {
          const networkResponse = await fetch(request)
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone())
          }
          return networkResponse
        } catch {
          // If offline and not in cache, fallback
          return cached || new Response('Asset unavailable offline', { status: 503 })
        }
      })
    )
    return
  }

  // Network-First for navigation (HTML documents)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(async () => {
          const cached = await caches.match(request)
          return cached || caches.match('/')
        })
    )
  }
})
