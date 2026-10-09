'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface EditorialHeroProps {
  isRevealed?: boolean
}

export default function EditorialHero({ isRevealed = true }: EditorialHeroProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReducedMotion(mediaQuery.matches)
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  // Enforce cinematic slow motion playback on the hero video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center px-4 sm:px-8 py-6 sm:py-9 overflow-hidden bg-[#181324]"
      aria-label="Wedding Invitation Hero"
    >
      {/* 1. Full-Bleed HERO Video Background (Zero Background Image) */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Primary Cinematic Slow-Motion HERO Video */}
        {!reducedMotion && (
          <video
            ref={videoRef}
            onLoadedMetadata={handleLoadedMetadata}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-105"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source
              src="https://res.cloudinary.com/drvvekzzm/video/upload/v1791453303/HERO_scbjkz.mp4"
              type="video/mp4"
            />
            <source src="/HERO.mp4" type="video/mp4" />
          </video>
        )}

        {/* Soft Lavender Mist & Ambient Lilac Color Grading (Pure Christian Vibe) */}
        <div className="absolute inset-0 bg-[#B8A9C9]/20 mix-blend-color pointer-events-none" />
        <div className="absolute inset-0 bg-[#8D76A8]/15 mix-blend-soft-light pointer-events-none" />

        {/* Top Vignette for Header Contrast */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#181324]/85 via-[#181324]/40 to-transparent pointer-events-none" />

        {/* Bottom Twilight Lavender Gradient to smoothly ground the bright aisle runner */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#181324]/95 via-[#181324]/60 to-transparent pointer-events-none" />

        {/* Soft Radial Center Scrim for Pristine Contrast Behind Names */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,19,36,0.3)_0%,rgba(24,19,36,0.65)_100%)] pointer-events-none" />

        {/* Subtle 35mm Film Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* 2. Top Header: Refined 2-Line Hashtag Lockup */}
      <header className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-1">
        <motion.div
          initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: -12, filter: 'blur(4px)' }
          }
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Line 1: #RISHMA FOUND HER */}
          <span className="font-functional text-[9px] sm:text-[10px] text-[#FAF7F2]/90 font-medium tracking-[0.35em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            #RISHMA FOUND HER
          </span>

          {/* Line 2: Pavazha (Script) + MALLI (White Sans) */}
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="font-accent text-2xl sm:text-3xl text-[#E6CA85] leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Pavazha
            </span>
            <span className="font-functional text-xs sm:text-sm text-[#FAF7F2] font-semibold tracking-[0.28em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              MALLI
            </span>
          </div>

          {/* Delicate Champagne-Gold Hairline */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/60 to-transparent mt-2.5" />
        </motion.div>
      </header>

      {/* 3. Center: Cinematic Wedding Title Composition (Centered, Balanced, Grand) */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col justify-center my-auto py-2 sm:py-4">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 20, filter: 'blur(6px)' }
          }
          transition={{ duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center text-center"
        >
          {/* Groom Name */}
          <h1 className="font-serif-title text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light text-[#FAF7F2] tracking-[0.12em] uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] flex items-center justify-center">
            <span>MALLI SUMANDHAR</span>
            <motion.span
              animate={{ scale: [1, 1.16, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              className="text-[#E6CA85] text-[0.65em] font-normal ml-2.5 opacity-90 select-none inline-block"
            >
              ♡
            </motion.span>
          </h1>

          {/* Romantic Gold Ampersand Divider */}
          <div className="flex items-center justify-center gap-3 w-full max-w-xs my-2.5 sm:my-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/50 to-[#E6CA85]/80" />
            <motion.span
              animate={{ y: [0, -3, 0], rotate: [-6, -3, -6] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="font-accent text-3xl sm:text-4xl text-[#E6CA85] select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] inline-block"
            >
              &amp;
            </motion.span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#E6CA85]/50 to-[#E6CA85]/80" />
          </div>

          {/* Bride Name */}
          <h2 className="font-serif-title text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light text-[#FAF7F2] tracking-[0.12em] uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] flex items-center justify-center">
            <span>RISHMA JOHN</span>
            <motion.span
              animate={{ scale: [1, 1.16, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 3.2, delay: 0.5, ease: "easeInOut" }}
              className="text-[#E6CA85] text-[0.65em] font-normal ml-2.5 opacity-90 select-none inline-block"
            >
              ♡
            </motion.span>
          </h2>
        </motion.div>

        {/* Delicate Champagne-Gold Hairline Separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            isRevealed
              ? { scaleX: 1, opacity: 1 }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 sm:w-36 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/70 to-transparent mx-auto my-4 sm:my-5"
        />

        {/* Date and Location Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 14, filter: 'blur(4px)' }
          }
          transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-1"
        >
          <p className="font-display text-[11px] sm:text-xs md:text-sm text-[#FAF7F2] tracking-[0.3em] uppercase font-medium drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            18 &amp; 20 NOVEMBER 2026 · COIMBATORE
          </p>
          <p className="font-serif-title text-xs sm:text-sm md:text-base italic text-[#E6CA85] tracking-[0.06em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Two Days · Two Cultures · One Celebration of Love
          </p>
        </motion.div>

        {/* Sacred Blessing Quote: Pure Open Editorial Typography (NO BOXES) */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 14, filter: 'blur(4px)' }
          }
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-7 text-center max-w-lg mx-auto px-4"
        >
          {/* Whisper-thin Champagne Gold Hairline */}
          <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/50 to-transparent mx-auto mb-3" />

          {/* Blessing Prayer: Pure Upright Cormorant Garamond */}
          <p className="font-serif-title text-sm sm:text-base md:text-lg text-[#FAF7F2] font-normal leading-relaxed tracking-[0.035em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            with your kith and kin,<br />
            Bless them from your hearts as the<br />
            couple go on life&apos;s way by the grace of our
          </p>

          {/* Sacred Dedication: Cinzel Classical Roman Inscriptional */}
          <p className="font-display text-xs sm:text-sm md:text-base text-white font-semibold tracking-[0.28em] uppercase mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)]">
            LORD JESUS CHRIST
          </p>
        </motion.div>
      </div>

      {/* 4. Bottom Editorial Eyebrow */}
      <motion.footer
        initial={{ opacity: 0, y: 12 }}
        animate={
          isRevealed
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={{ duration: 1.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl mx-auto border-t border-[#E6CA85]/25 pt-3.5 px-4 flex items-center justify-center font-functional text-[9px] sm:text-[10px] text-[#FAF7F2]/75 text-center tracking-[0.25em] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
      >
        <span>COIMBATORE · CHRISTIAN NUPTIALS &amp; MUHURTHAM FOLLOWED BY RECEPTION</span>
      </motion.footer>
    </section>
  )
}
