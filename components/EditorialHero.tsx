'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { POSTERS_CONFIG } from '@/lib/posters.config'

interface EditorialHeroProps {
  isRevealed?: boolean
}

export default function EditorialHero({ isRevealed = true }: EditorialHeroProps) {
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
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center px-5 sm:px-10 py-8 sm:py-12 overflow-hidden bg-[#2A0510]"
      aria-label="Wedding Invitation Hero"
    >
      {/* 1. Base Full-Bleed Arched Window Background */}
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
              className="w-full h-full object-cover object-center transition-transform duration-[20000ms] ease-out scale-105"
              style={{
                animation: reducedMotion ? 'none' : 'editorialSlowDrift 24s ease-out forwards',
              }}
            />
          </picture>
        )}

        {/* Ambient Subtle Video Dust / Bokeh Haze */}
        {!reducedMotion && (
          <video
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-35 pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/hero-ambient-loop.webm" type="video/webm" />
            <source src="/hero-ambient-loop.mp4" type="video/mp4" />
          </video>
        )}

        {/* Wine Gradient Overlay for Luxury Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A0510]/80 via-[#3D0B1B]/70 to-[#1F040C]/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(26,5,16,0.85)_100%)] pointer-events-none" />
      </div>

      {/* 2. Top Header: Controlled 2-Line Hashtag Lockup */}
      <header className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-2">
        <motion.div
          initial={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: -14, filter: 'blur(4px)' }
          }
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Line 1: #RISHMA FOUND HER (Tiny Caps) */}
          <span className="font-functional text-[10px] sm:text-xs text-[#FAF6EE]/80 font-medium">
            #RISHMA FOUND HER
          </span>

          {/* Line 2: Pavazha Malli (Script + Tamil Accent) */}
          <div className="flex items-center gap-2 mt-1">
            <span className="font-accent text-2xl sm:text-3xl text-[#E6CA85] leading-none">
              Pavazha Malli
            </span>
            <span className="font-tamil text-xs sm:text-sm text-[#C5A059] font-normal tracking-wider opacity-90">
              பவழ மல்லி
            </span>
          </div>

          {/* Delicate Hairline */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mt-3" />
        </motion.div>
      </header>

      {/* 3. Center: Magazine Cover Composition */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col justify-center my-auto py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 22, filter: 'blur(6px)' }
          }
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col"
        >
          {/* Top-Left: Rishma */}
          <div className="text-left">
            <h1 className="font-serif-title text-[3.75rem] xs:text-7xl sm:text-8xl md:text-9xl font-light text-[#FAF6EE] leading-[0.88] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              Rishma
            </h1>
            <p className="font-tamil text-xs sm:text-sm text-[#C5A059] tracking-[0.25em] mt-1 pl-1 font-normal opacity-90">
              ரிஷ்மா ஜான்
            </p>
          </div>

          {/* Center Ampersand Break */}
          <div className="flex items-center justify-center my-2 sm:my-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C5A059]/35 to-transparent" />
            <span className="font-accent text-3xl sm:text-4xl text-[#E6CA85] mx-4 -rotate-6 select-none">
              &amp;
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C5A059]/35 to-transparent" />
          </div>

          {/* Bottom-Right: Malli */}
          <div className="text-right">
            <h2 className="font-serif-title text-[3.75rem] xs:text-7xl sm:text-8xl md:text-9xl font-light text-[#FAF6EE] leading-[0.88] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              Malli
            </h2>
            <p className="font-tamil text-xs sm:text-sm text-[#C5A059] tracking-[0.25em] mt-1 pr-1 font-normal opacity-90">
              மல்லி சுமந்தர்
            </p>
          </div>
        </motion.div>

        {/* Gold Hairline Separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            isRevealed
              ? { scaleX: 1, opacity: 1 }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 sm:w-36 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-6"
        />

        {/* Date and Location Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 14, filter: 'blur(4px)' }
          }
          transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-1.5"
        >
          <p className="font-display text-xs sm:text-sm md:text-base text-[#FAF6EE] tracking-[0.28em] uppercase font-medium">
            18 &amp; 20 NOVEMBER 2026 · COIMBATORE
          </p>
          <p className="font-serif-title text-sm sm:text-base italic text-[#FAF6EE]/75 tracking-wide">
            Two Days · Two Cultures · One Celebration of Love
          </p>
        </motion.div>

        {/* Sacred Love Quotes: Thirukkural & Colossians 3:14 */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 16, filter: 'blur(4px)' }
          }
          transition={{ duration: 1.3, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-center space-y-3 max-w-lg mx-auto px-4"
        >
          {/* Subtle gold hairline ornament */}
          <div className="flex items-center justify-center gap-3 mb-2" aria-hidden="true">
            <div className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#C5A059]/50" />
            <span className="text-[#E6CA85] text-xs">✦</span>
            <div className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#C5A059]/50" />
          </div>

          {/* Thirukkural Quote */}
          <div>
            <p className="font-tamil text-sm sm:text-base text-[#F2DFB5] font-normal leading-relaxed">
              அன்பிற்கும் உண்டோ அடைக்குந்தாழ் ஆர்வலர் புன்கணீர் பூசல் தரும்.
            </p>
            <span className="font-tamil text-xs text-[#C5A059] tracking-wider block mt-0.5">
              — திருவள்ளுவர்
            </span>
          </div>

          <div className="w-12 h-px bg-[#C5A059]/30 mx-auto" />

          {/* Colossians 3:14 Scripture Quote */}
          <div>
            <p className="font-serif-title italic text-sm sm:text-base text-[#FAF6EE]/90 font-light leading-snug">
              &ldquo;And above all these put on love, which binds everything together in perfect harmony.&rdquo;
            </p>
            <span className="font-functional text-[10px] text-[#E6CA85] tracking-[0.25em] block mt-0.5">
              — COLOSSIANS 3:14
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4. Bottom Editorial Eyebrow */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto border-t border-[#C5A059]/25 pt-4 flex items-center justify-center font-functional text-[10px] text-[#FAF6EE]/60 text-center tracking-[0.25em]">
        <span>COIMBATORE · CHRISTIAN RING EXCHANGE &amp; HINDU MUHURTHAM</span>
      </footer>

      {/* Keyframe animation for smooth slow drift */}
      <style jsx>{`
        @keyframes editorialSlowDrift {
          0% {
            transform: scale(1.02) translateY(0);
          }
          100% {
            transform: scale(1.08) translateY(-10px);
          }
        }
      `}</style>
    </section>
  )
}
