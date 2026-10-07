'use client'

import { useState, useEffect } from 'react'
import { POSTERS_CONFIG } from '@/lib/posters.config'

export default function EditorialHero() {
  const [imgError, setImgError] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReducedMotion(mediaQuery.matches)
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-8 py-12 overflow-hidden bg-[#4A0F20]"
      style={{ backgroundColor: POSTERS_CONFIG.hero.fallbackColor }}
      aria-label="Wedding Invitation Hero"
    >
      {/* 1. Base Layer: Real High-Definition Editorial Poster (9:16 mobile / 16:9 desktop) */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {!imgError && (
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={POSTERS_CONFIG.hero.desktop}
            />
            <img
              src={POSTERS_CONFIG.hero.mobile}
              alt={POSTERS_CONFIG.hero.alt}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover object-center transition-transform duration-[25000ms] ease-out ${
                reducedMotion ? 'scale-100' : 'scale-105'
              }`}
              style={{
                animation: reducedMotion ? 'none' : 'editorialSlowZoom 25s ease-out forwards',
              }}
            />
          </picture>
        )}

        {/* 2. Ambient Video Layer: Subtle Drifting Gold Dust & Candlelit Bokeh Haze (Only in Hero) */}
        {!reducedMotion && (
          <video
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40 pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/hero-ambient-loop.webm" type="video/webm" />
            <source src="/hero-ambient-loop.mp4" type="video/mp4" />
          </video>
        )}

        {/* 3. Contrast Scrim & Dark Vignette (>= 70% contrast protection for WCAG AA) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A0F]/75 via-[#1A0A0F]/55 to-[#1A0A0F]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(26,10,15,0.75)_100%)] pointer-events-none" />
      </div>

      {/* Top Header Eyebrow */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 sm:w-16 h-px bg-[#B8893E]/50" />
          <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.35em] text-[#F4ECDD]/90">
            #RISHMA found her <span className="font-tamil text-[#D4A359] font-normal tracking-wider">பவழ</span> MALLI
          </span>
          <div className="w-8 sm:w-16 h-px bg-[#B8893E]/50" />
        </div>
        <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B8893E] font-medium font-sans">
          Wedding Invitation · A celebration of love, faith and family
        </p>
      </header>

      {/* Center Cinematic Name Lockup */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto py-8">
        {/* Monogram Badge */}
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#B8893E]/40 bg-[#1A0A0F]/60 text-[#F2DFB5] font-headline text-sm tracking-widest backdrop-blur-sm shadow-md">
          RM
        </div>

        {/* The Couple Names in Pinyon Script */}
        <h1 className="font-names text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F4ECDD] leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] select-none">
          Rishma <span className="text-[#D4A359] font-light">&</span> Malli
        </h1>

        {/* Tamil Names Lockup */}
        <p className="font-tamil text-base sm:text-xl text-[#F2DFB5]/90 mt-3 font-normal tracking-wide">
          ரிஷ்மா ஜான் <span className="text-[#B8893E] mx-1">·</span> மல்லி சுமந்தர்
        </p>

        {/* Editorial Gold Hairline Rule */}
        <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#B8893E] to-transparent my-6" />

        {/* Date and Location */}
        <div className="space-y-1">
          <p className="font-headline text-base sm:text-xl md:text-2xl text-[#F4ECDD] tracking-[0.2em] uppercase">
            18 & 20 November 2026
          </p>
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F4ECDD]/75 font-sans">
            Coimbatore, Tamil Nadu
          </p>
        </div>

        {/* Editorial Subtitle */}
        <p className="mt-4 max-w-md text-xs sm:text-sm text-[#F4ECDD]/80 font-sans tracking-wide leading-relaxed px-4">
          Two Days. Two Cultures. One Celebration of Love.
        </p>

        {/* Editorial Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollToSection('celebration')}
            className="px-6 py-2.5 border border-[#B8893E] bg-[#4A0F20]/80 hover:bg-[#4A0F20] text-[#F4ECDD] text-xs uppercase tracking-[0.25em] font-sans transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg"
          >
            The Celebration ↓
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('rsvp')}
            className="px-6 py-2.5 border border-[#B8893E]/50 hover:border-[#B8893E] bg-[#1A0A0F]/60 hover:bg-[#1A0A0F]/90 text-[#F4ECDD] text-xs uppercase tracking-[0.25em] font-sans transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            RSVP · வருவீர்களா?
          </button>
        </div>
      </div>

      {/* Bottom Editorial Marquee Ticker */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto border-t border-[#B8893E]/30 pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F4ECDD]/70 font-sans gap-2 text-center">
        <span>Coimbatore · Ring Exchange & Hindu Muhurtham</span>
        <span className="text-[#B8893E]">Kindly Reply by 10 November</span>
      </footer>

      {/* Keyframe animation for smooth slow zoom */}
      <style jsx>{`
        @keyframes editorialSlowZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.06);
          }
        }
      `}</style>
    </section>
  )
}
