'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface EnvelopeIntroProps {
  onOpen?: () => void
  onStartTransition?: () => void
  onComplete?: () => void
  lead?: string
  a?: string
  b?: string
  mono?: string
  cta?: string
  logo?: string
}

export default function EnvelopeIntro({
  onOpen,
  onStartTransition,
  onComplete,
  lead = 'You are lovingly invited to witness',
  a = 'RISHMA',
  b = 'MALLI',
  mono = 'RishmaMalli',
  cta = 'Tap Seal to Open',
  logo = '/MR-logo-gold.png',
}: EnvelopeIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isEnding, setIsEnding] = useState(false)
  const [sparksActive, setSparksActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hasTriggeredTransitionRef = useRef(false)
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
    }
  }, [])

  // Complete and transition into the wedding invitation
  const completeIntro = useCallback(() => {
    if (isEnding) return
    setIsEnding(true)

    // Trigger hero reveal
    onStartTransition?.()

    // Smooth 900ms dissolve before unmounting
    setTimeout(() => {
      onOpen?.()
      onComplete?.()
    }, 900)
  }, [isEnding, onStartTransition, onOpen, onComplete])

  // Start video playback when user clicks seal or open button
  const handleOpenSeal = useCallback(() => {
    if (isPlaying || isEnding) return

    setSparksActive(true)
    setTimeout(() => setSparksActive(false), 1200)

    // Haptic vibration feedback on mobile
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(35)
      } catch {}
    }

    // Trigger background wedding music via custom event
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('wedding-play-music'))
      } catch {}
    }

    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video.muted = false
      video.volume = 0.85

      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // If browser blocks unmuted play, fallback to muted play
            if (video) {
              video.muted = true
              video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true))
            }
          })
      } else {
        setIsPlaying(true)
      }
    } else {
      setIsPlaying(true)
    }

    // Safety fallback: if video doesn't end naturally in 9s, finish intro
    fallbackTimerRef.current = setTimeout(() => {
      completeIntro()
    }, 9000)
  }, [isPlaying, isEnding, completeIntro])

  // Track video progress to begin transition right as card is fully visible
  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return

    // Near the end (at 7.0s of 8.0s video), begin dissolving into Hero underneath
    if (video.currentTime >= 7.0 && !hasTriggeredTransitionRef.current) {
      hasTriggeredTransitionRef.current = true
      onStartTransition?.()
    }
  }

  // When video playback finishes
  const handleVideoEnded = () => {
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
    completeIntro()
  }

  return (
    <div
      className={`fixed inset-0 z-[100] w-full h-full bg-[#140B1A] flex items-center justify-center overflow-hidden select-none transition-opacity duration-1000 ease-in-out ${
        isEnding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation envelope intro"
    >
      {/* 1. Ambient Blurred Backdrop - Matches candlelit lavender silk glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="/envelope-video-poster.jpg"
          alt=""
          className="w-full h-full object-cover blur-3xl scale-110 opacity-35"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#140B1A]/40 to-[#140B1A]/95" />
      </div>

      {/* 2. Top-Right Discreet Skip Button */}
      <motion.button
        type="button"
        onClick={completeIntro}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 font-functional text-[9px] sm:text-[10px] tracking-[0.25em] text-[#E6CA85]/90 border border-[#E6CA85]/35 rounded-full px-3.5 py-1.5 bg-[#140B1A]/70 backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-[#E6CA85] hover:text-[#FAF0D7] hover:bg-[#140B1A]/90"
      >
        SKIP TO INVITATION ↗
      </motion.button>

      {/* 3. Center Video Stage (9:16 aspect ratio matching 1080x1920 video) */}
      <div className="relative z-10 w-full max-w-[480px] sm:max-w-[520px] md:max-w-[560px] h-full max-h-[100svh] aspect-[9/16] flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.85)]">
        {/* The 1080p Video - watermark permanently removed, pointer-events-none prevents accidental skip */}
        <div className="relative w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            src="/Envelope_opening_with_card_1080p_20261011200501.mp4"
            poster="/envelope-video-poster.jpg"
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover pointer-events-none scale-[1.02] transform-gpu"
          >
            <source src="/Envelope_opening_with_card_1080p_20261011200501.mp4" type="video/mp4" />
          </video>

          {/* Couture Filmic Vignette & Bottom-Edge Shadow - completely envelopes edges with silk glow */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_70px_rgba(20,11,26,0.7)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none bg-gradient-to-t from-[#140B1A]/85 via-[#140B1A]/30 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-[#140B1A]/70 via-[#140B1A]/20 to-transparent" />
        </div>

        {/* 4. Bespoke Royal "Touch to Open" Interaction (Visible only prior to unsealing) */}
        <AnimatePresence>
          {!isPlaying && !isEnding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-between pointer-events-auto p-5 sm:p-7 select-none"
            >
              {/* Top Royal Monogram & Headline */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="text-center pt-6 sm:pt-10 flex flex-col items-center"
              >
                <div className="flex items-center gap-2 mb-1.5 opacity-85">
                  <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#E6CA85]" />
                  <span className="font-functional text-[8.5px] sm:text-[9.5px] tracking-[0.4em] text-[#E6CA85] uppercase">
                    THE WEDDING OF
                  </span>
                  <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#E6CA85]" />
                </div>

                <h1 className="font-serif-title text-2xl sm:text-3xl text-[#FAF8FC] font-light tracking-wide drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                  Malli &amp; Rishma
                </h1>

                <p className="font-functional text-[8px] sm:text-[9px] tracking-[0.3em] text-[#D8CEE5]/70 mt-1 uppercase">
                  CHIDAMBARAM · NOVEMBER 2026
                </p>
              </motion.div>

              {/* Exact Physical Wax Seal Touch Target (Located precisely at 60.2% X, 56.0% Y over video's MR wax seal) */}
              <div
                className="absolute left-[60.2%] top-[56.0%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onClick={handleOpenSeal}
                role="button"
                tabIndex={0}
                aria-label="Touch royal wax seal to open invitation"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleOpenSeal()
                }}
              >
                {/* 1. Subtle, Breathing Candlelight Aura - Replaces tacky neon ping */}
                <motion.div
                  animate={{
                    scale: [1, 1.14, 1],
                    opacity: [0.35, 0.65, 0.35],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-[-14px] sm:inset-[-18px] rounded-full bg-gradient-to-tr from-[#E6CA85]/25 via-[#FAF0D7]/30 to-transparent blur-md pointer-events-none"
                />

                {/* 2. Delicate 24K Gold Hairline Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.45, 0.85, 0.45],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-[-6px] rounded-full border border-[#E6CA85]/60 shadow-[0_0_18px_rgba(230,202,133,0.45)] pointer-events-none"
                />

                {/* 3. Direct Seal Hotspot circle with tactile press feedback */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-95 group-hover:scale-105">
                  {/* Frosted golden sheen on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#FAF0D7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Elegant floating callout above the seal */}
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                  >
                    <span className="font-serif-title italic text-[11px] sm:text-xs text-[#FAF0D7] tracking-wider bg-[#140B1A]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#E6CA85]/40 shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      Touch Seal
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Haute Horlogerie Style Cartouche Plaque */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="pb-4 sm:pb-7 text-center flex flex-col items-center gap-2.5 w-full max-w-xs"
              >
                {/* Royal Smoked-Amethyst & Gold Cartouche Button */}
                <button
                  type="button"
                  onClick={handleOpenSeal}
                  className="relative group w-full px-6 py-3.5 rounded-xl bg-gradient-to-b from-[#1E0D2B]/90 via-[#180A23]/95 to-[#12061A]/95 border border-[#E6CA85]/50 shadow-[0_12px_32px_rgba(0,0,0,0.85),0_0_24px_rgba(230,202,133,0.18)] cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#E6CA85] hover:shadow-[0_14px_40px_rgba(0,0,0,0.9),0_0_32px_rgba(230,202,133,0.32)] active:scale-[0.98]"
                >
                  {/* Subtle Inner Gold Hairline Frame */}
                  <div className="absolute inset-1 rounded-lg border border-[#E6CA85]/20 pointer-events-none" />

                  {/* Soft Light Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

                  <div className="relative flex flex-col items-center justify-center gap-0.5">
                    <span className="font-functional text-[8.5px] sm:text-[9px] tracking-[0.32em] text-[#E6CA85] uppercase">
                      ROYAL INVITATION
                    </span>
                    <span className="font-serif-title italic text-base sm:text-lg text-[#FAF0D7] tracking-wide font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] flex items-center gap-2">
                      <span className="text-[#E6CA85]/60 text-xs">❦</span>
                      Touch to Unseal
                      <span className="text-[#E6CA85]/60 text-xs">❧</span>
                    </span>
                  </div>
                </button>

                <p className="font-serif-title italic text-[11px] sm:text-xs text-[#D8CEE5]/75 tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {lead}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Delicate Gold Foil Dust dissolving upon unsealing */}
        {sparksActive && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0.9, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0.9, 0.7, 0],
                  x: Math.cos((i * 25.7 * Math.PI) / 180) * (70 + (i % 3) * 25),
                  y: Math.sin((i * 25.7 * Math.PI) / 180) * (70 + (i % 3) * 25),
                }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#FAF0D7] shadow-[0_0_10px_#E6CA85]"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
