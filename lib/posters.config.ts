/**
 * Centralized Posters & Photography Configuration
 * Real posters and couple photos can be dropped into /public/posters
 * without modifying any component code.
 */
export const POSTERS_CONFIG = {
  // Hero Editorial Poster (9:16 for Mobile, 16:9 for Desktop)
  hero: {
    mobile: '/posters/hero-9-16.webp',
    desktop: '/posters/hero-16-9.webp',
    alt: 'Malli & Rishma Wedding Editorial Poster',
    fallbackColor: '#4A0F20',
  },

  // Day 1: Christian Ceremony Chapel Poster
  christianChapel: {
    mobile: '/posters/christian-chapel-9-16.webp',
    desktop: '/posters/christian-chapel-16-9.webp',
    alt: 'Candlelit Chapel · Christian Ring Exchange & Gala Dinner',
    fallbackColor: '#4A0F20',
  },

  // Day 2: Sacred Hindu Temple Poster
  hinduTemple: {
    mobile: '/posters/hindu-temple-9-16.webp',
    desktop: '/posters/hindu-temple-16-9.webp',
    alt: 'Sacred Hillside Temple · Muhurtham & Reception',
    fallbackColor: '#4A0F20',
  },

  // Couple Editorial Portraits
  couple: {
    malli: {
      src: '/posters/malli-portrait.webp',
      alt: 'Malli Sumandhar · The Groom',
      fallbackColor: '#360B17',
    },
    rishma: {
      src: '/posters/rishma-portrait.webp',
      alt: 'Rishma John · The Bride',
      fallbackColor: '#360B17',
    },
    jointCover: {
      src: '/posters/couple-cover.webp',
      alt: 'Malli Sumandhar & Rishma John',
      fallbackColor: '#4A0F20',
    },
  },

  // Looping Smoke Transition Layer (Screen Blend Mode)
  smokeVideo: {
    src: '/smoke-loop.webm',
    fallbackColor: 'transparent',
  },
} as const

export type PostersConfig = typeof POSTERS_CONFIG
