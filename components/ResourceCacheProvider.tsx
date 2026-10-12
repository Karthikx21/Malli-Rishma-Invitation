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

    // 1. Register Service Worker for Cache-First performance & offline support
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
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

    // 2. Preload & Cache Key Media Assets via Cache API in background
    if ('caches' in window) {
      const cacheTimeout = setTimeout(() => {
        caches.open('malli-rishma-v1').then((cache) => {
          KEY_ASSETS_TO_PRECACHE.forEach(async (url) => {
            try {
              const matched = await cache.match(url)
              if (!matched) {
                const response = await fetch(url, { mode: 'no-cors' })
                if (response) {
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
