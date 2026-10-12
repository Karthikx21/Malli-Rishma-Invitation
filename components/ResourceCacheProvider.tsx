'use client'

import { useEffect } from 'react'

const KEY_ASSETS_TO_PRECACHE = [
  '/envelope-video-poster.jpg',
  '/floating-song.mp3',
  '/FLOATING%20SONG.mp3',
  '/editorial/couple-traditional.webp',
  '/editorial/couple-traditional.jpg',
  '/editorial/baroque-candelabra-stairs.jpg',
  '/editorial/candlelit-antique-mirror.jpg',
  '/editorial/crimson-urulis-fresco.jpg',
  '/editorial/peacock-crimson-arch.jpg',
  '/editorial/metti-ritual.jpg',
  '/editorial/temple-sacred-carvings.jpg',
  '/MR-logo-gold.png',
  '/icon.svg',
]

export default function ResourceCacheProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // In development mode: clean up any previously registered service workers or stale caches
    if (process.env.NODE_ENV !== 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const reg of registrations) {
            reg.unregister()
          }
        })
      }
      if ('caches' in window) {
        caches.keys().then((keys) => {
          for (const key of keys) {
            caches.delete(key)
          }
        })
      }
      return
    }

    // 1. Register Service Worker for Cache-First performance & offline support (production only)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('Resource Cache Service Worker active:', reg.scope)
          })
          .catch((err) => {
            console.warn('Service Worker registration skipped:', err)
          })
      })
    }

    // 2. Preload & Cache Key Media Assets via Cache API in background (production only)
    if ('caches' in window) {
      const cacheTimeout = setTimeout(() => {
        caches.open('malli-rishma-v1').then((cache) => {
          KEY_ASSETS_TO_PRECACHE.forEach(async (url) => {
            try {
              const matched = await cache.match(url)
              if (!matched) {
                const response = await fetch(url)
                if (response && response.status === 200) {
                  await cache.put(url, response)
                }
              }
            } catch {
              // Silently ignore individual asset cache misses
            }
          })
        })
      }, 1500) // Delay by 1.5s so initial interactive load gets 100% of bandwidth

      return () => clearTimeout(cacheTimeout)
    }
  }, [])

  return null
}
