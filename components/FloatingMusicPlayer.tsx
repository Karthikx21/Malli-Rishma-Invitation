'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  playExclusive,
  isAnyOtherAudioPlaying,
  isAudioSectionActive,
} from '@/lib/audioCoordinator'

/**
 * FloatingMusicPlayer:
 * Minimal, elegant invitation-matching music button.
 * - 44x44px circular frosted glass button at bottom-4 right-4 (sm:bottom-6 sm:right-6).
 * - Thin-stroke gold Play and Pause icons with 200ms crossfade.
 * - Gentle 2.4s breathing pulse on load, expanding gold ring when playing.
 * - "Tap for music" Cormorant Garamond tooltip on first load (fades after 4s or first tap).
 * - Full audio coordinator integration preserved.
 * - Plays soundtrack once through (no loop).
 */
export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const [isBreathing, setIsBreathing] = useState(false)

  const shouldReduceMotion = useReducedMotion()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const userMutedRef = useRef(false)
  const pausedBySectionRef = useRef(false)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (userMutedRef.current) return
    if (audio.ended) return
    // Never clash if an audio section (e.g. OK Kanmani) is active or any other audio is playing
    if (isAudioSectionActive() || isAnyOtherAudioPlaying(audio)) return

    audio.muted = false
    audio.volume = 0.65

    playExclusive(audio)
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
      })
  }, [])

  // 1. Immediate Autoplay on Mount with Clean One-Shot Interaction Unlock
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.65
    audio.muted = false

    // Attempt immediately on mount
    attemptPlay()

    // Global listener for the FIRST user gesture to unlock browser autoplay policy.
    let unlocked = false
    const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown']

    const removeGestureListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture)
      })
      window.removeEventListener('wedding-play-music', handleFirstGesture)
    }

    const handleFirstGesture = (e?: Event) => {
      // If the user tapped on a media control for another audio element, don't hijack it!
      const target = e?.target
      if (target instanceof Element && target.closest('#songs, [data-audio-control]')) {
        return
      }

      setHasInteracted(true)
      const currentAudio = audioRef.current

      if (
        currentAudio &&
        !userMutedRef.current &&
        !currentAudio.ended &&
        !isAudioSectionActive() &&
        !isAnyOtherAudioPlaying(currentAudio)
      ) {
        currentAudio.muted = false
        currentAudio.volume = 0.65
        currentAudio
          .play()
          .then(() => {
            setIsPlaying(true)
            unlocked = true
            removeGestureListeners()
          })
          .catch(() => {})
      } else {
        unlocked = true
        removeGestureListeners()
      }
    }

    events.forEach((evt) => {
      window.addEventListener(evt, handleFirstGesture, { passive: true })
    })

    window.addEventListener('wedding-play-music', handleFirstGesture)

    return () => {
      removeGestureListeners()
    }
  }, [attemptPlay])

  // 2. Intelligent Auto-Pause & Resume with Section Audio Coordination (Side A, Side B)
  useEffect(() => {
    const handleSectionEnter = () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = null
      }
      const mainAudio = audioRef.current
      if (mainAudio) {
        if (!mainAudio.paused) {
          pausedBySectionRef.current = true
          mainAudio.pause()
          setIsPlaying(false)
        } else if (!userMutedRef.current) {
          pausedBySectionRef.current = true
        }
      }
    }

    const handleSectionLeave = () => {
      if (isAudioSectionActive()) return

      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
      }

      resumeTimerRef.current = setTimeout(() => {
        if (isAudioSectionActive()) return

        const otherAudios = Array.from(document.querySelectorAll('audio')).filter(
          (el) => el !== audioRef.current
        )
        const isAnyOtherAudioPlaying = otherAudios.some((el) => !el.paused)
        if (isAnyOtherAudioPlaying) return

        const mainAudio = audioRef.current
        if (mainAudio && pausedBySectionRef.current && !userMutedRef.current) {
          if (mainAudio.ended) return
          mainAudio.muted = false
          mainAudio.volume = 0.65
          mainAudio
            .play()
            .then(() => {
              setIsPlaying(true)
              pausedBySectionRef.current = false
            })
            .catch(() => {})
        }
      }, 100)
    }

    const handleOtherAudioPlay = (e?: Event) => {
      const target = e?.target
      if (target instanceof HTMLAudioElement && target !== audioRef.current) {
        if (resumeTimerRef.current) {
          clearTimeout(resumeTimerRef.current)
          resumeTimerRef.current = null
        }
        const mainAudio = audioRef.current
        if (mainAudio) {
          if (!userMutedRef.current) {
            pausedBySectionRef.current = true
          }
          if (!mainAudio.paused) {
            mainAudio.pause()
            setIsPlaying(false)
          }
        }
      }
    }

    const handleOtherAudioStop = (e?: Event) => {
      const target = e?.target
      if (target instanceof HTMLAudioElement && target !== audioRef.current) {
        if (isAudioSectionActive()) return

        if (resumeTimerRef.current) {
          clearTimeout(resumeTimerRef.current)
        }
        resumeTimerRef.current = setTimeout(() => {
          if (isAudioSectionActive()) return

          const otherAudios = Array.from(document.querySelectorAll('audio')).filter(
            (el) => el !== audioRef.current
          )
          const isAnyOtherAudioPlaying = otherAudios.some((el) => !el.paused)

          if (!isAnyOtherAudioPlaying) {
            const mainAudio = audioRef.current
            if (mainAudio && pausedBySectionRef.current && !userMutedRef.current) {
              if (mainAudio.ended) return
              mainAudio.muted = false
              mainAudio.volume = 0.65
              mainAudio
                .play()
                .then(() => {
                  setIsPlaying(true)
                  pausedBySectionRef.current = false
                })
                .catch(() => {})
            }
          }
        }, 150)
      }
    }

    document.addEventListener('play', handleOtherAudioPlay, true)
    document.addEventListener('pause', handleOtherAudioStop, true)
    document.addEventListener('ended', handleOtherAudioStop, true)

    window.addEventListener('wedding-section-audio-enter', handleSectionEnter)
    window.addEventListener('wedding-section-audio-leave', handleSectionLeave)

    return () => {
      document.removeEventListener('play', handleOtherAudioPlay, true)
      document.removeEventListener('pause', handleOtherAudioStop, true)
      document.removeEventListener('ended', handleOtherAudioStop, true)
      window.removeEventListener('wedding-section-audio-enter', handleSectionEnter)
      window.removeEventListener('wedding-section-audio-leave', handleSectionLeave)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  // 3. Tooltip: Fades out after 4 seconds on first load or on first tap
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      setShowTooltip(false)
      setIsBreathing(false)
    }
  }, [isPlaying])

  // 4. Paused State Breathing Pulse:
  // After 2 seconds on page load, shows gentle breathing scale pulse a few times (3 cycles * 2.4s), then stops
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsBreathing(true)
    }, 2000)

    const stopTimer = setTimeout(() => {
      setIsBreathing(false)
    }, 2000 + 3 * 2400)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(stopTimer)
    }
  }, [])

  // 5. Manual Toggle Play / Pause
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowTooltip(false)
    setIsBreathing(false)
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      userMutedRef.current = true
      pausedBySectionRef.current = false
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
      audio.pause()
      setIsPlaying(false)
    } else {
      userMutedRef.current = false
      pausedBySectionRef.current = false
      if (audio.ended || (audio.duration && audio.currentTime >= audio.duration)) {
        audio.currentTime = 0
      }
      attemptPlay()
    }
  }

  const isPulseActive = isBreathing && !isPlaying && !shouldReduceMotion

  return (
    <>
      {/* Background Audio Element - One-time playback (no loop) */}
      <audio
        ref={audioRef}
        src="/audio/anbil-avan.mp3"
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false)
          pausedBySectionRef.current = false
        }}
      >
        <source src="/audio/anbil-avan.mp3" type="audio/mpeg" />
        <source src="/Church%20Wedding%20(Anbil%20Avan).mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Bottom-Right 44x44px Minimal Music Control */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[70] select-none">
        {/* Optional Tiny Tooltip on First Load Only */}
        <AnimatePresence>
          {showTooltip && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute bottom-full right-0 mb-2 whitespace-nowrap pointer-events-none select-none"
            >
              <span
                className="text-[11px] sm:text-xs italic tracking-wider text-[#D4AF37]/70 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                style={{ fontFamily: 'var(--font-serif-var, "Cormorant Garamond", Georgia, serif)' }}
              >
                Tap for music
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 44x44px Circular Frosted Glass Button */}
        <motion.button
          type="button"
          onClick={togglePlay}
          animate={
            isPulseActive
              ? { scale: [1, 1.06, 1] }
              : { scale: 1 }
          }
          transition={
            isPulseActive
              ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
          whileHover={{
            scale: 1.05,
            borderColor: 'rgba(212, 175, 55, 1)',
          }}
          whileTap={{ scale: 0.95 }}
          className="relative w-[44px] h-[44px] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-[rgba(212,175,55,0.5)] shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-colors cursor-pointer group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Expanding Gold Ring when Playing (scale 1 -> 1.5, opacity 0.5 -> 0, 2.4s, infinite) */}
          {isPlaying && !shouldReduceMotion && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-[#D4AF37] pointer-events-none"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}

          {/* Crossfade between Play & Pause Icons (opacity + slight scale, 200ms) */}
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.div
                key="pause-icon"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="5" x2="8" y2="19" />
                  <line x1="16" y1="5" x2="16" y2="19" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="play-icon"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="translate-x-[1px]"
                >
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
