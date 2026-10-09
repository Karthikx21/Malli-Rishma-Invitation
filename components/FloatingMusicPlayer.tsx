'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  playExclusive,
  isAnyOtherAudioPlaying,
  isAudioSectionActive,
} from '@/lib/audioCoordinator'

/**
 * FloatingMusicPlayer:
 * Plays "Church Wedding (Anbil Avan).mp3" starting from the intro video itself.
 * Anchored in the bottom-right corner as a luxury editorial media pill.
 * Features:
 * - Autoplay initiation from site load with fallback to first user interaction.
 * - Dancing gold audio equalizer bars and spinning vinyl disc when playing.
 * - Single-tap toggle to Mute / Play ("Touch to Mute" / "Touch to Play").
 * - High z-index (z-[70]) so it is visible and usable during the intro video as well.
 * - Intelligent cross-section coordination: automatically yields to section audio (Side A/B)
 *   when in view, and automatically resumes when the user scrolls away.
 */
export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const userMutedRef = useRef(false)
  const pausedBySectionRef = useRef(false)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (userMutedRef.current) return
    // Never clash if an audio section (e.g. OK Kanmani) is active or any other audio is playing
    if (isAudioSectionActive() || isAnyOtherAudioPlaying(audio)) return

    audio.muted = false
    audio.volume = 0.8

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

    audio.volume = 0.8
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
        !isAudioSectionActive() &&
        !isAnyOtherAudioPlaying(currentAudio)
      ) {
        currentAudio.muted = false
        currentAudio.volume = 0.8
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
    // Fired when user scrolls INTO an audio section (like OK Kanmani)
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
          // Main audio was unmuted/intended to play
          pausedBySectionRef.current = true
        }
      }
    }

    // Fired when user scrolls OUT OF an audio section
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
          mainAudio.muted = false
          mainAudio.volume = 0.8
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

    // Fallback: whenever another audio element starts playing anywhere
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

    // Fallback: whenever an audio pauses, only resume if NO audio section is active
    const handleOtherAudioStop = (e?: Event) => {
      const target = e?.target
      if (target instanceof HTMLAudioElement && target !== audioRef.current) {
        // If an audio section is active, strictly do NOT resume!
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
              mainAudio.muted = false
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

  // 3. Manual Toggle Play / Mute
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
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
      attemptPlay()
    }
  }

  return (
    <>
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/anbil-avan.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/audio/anbil-avan.mp3" type="audio/mpeg" />
        <source src="/Church%20Wedding%20(Anbil%20Avan).mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Bottom-Right Luxury Music Control (Compact & Icon-Only) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[70] select-none"
      >
        <motion.button
          type="button"
          onClick={togglePlay}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(0,0,0,0.55),0_0_12px_rgba(230,202,133,0.22)] border cursor-pointer group ${
            isPlaying
              ? 'bg-[#181324]/90 border-[#E6CA85]/80 text-[#E6CA85]'
              : 'bg-[#181324]/80 border-[#E6CA85]/40 text-[#E6CA85]/60 hover:border-[#E6CA85] hover:text-[#E6CA85]'
          }`}
          aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
          title={isPlaying ? 'Mute Music' : 'Play Music'}
        >
          {/* Subtle Outer Pulsing Halo when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#E6CA85]/25 animate-ping pointer-events-none" />
          )}

          {/* Dancing Sound Bars when playing, Clean Play Glyph when paused */}
          {isPlaying ? (
            <div className="flex items-end justify-center gap-[2.5px] h-4 px-1" aria-hidden="true">
              <span className="w-[2.5px] bg-[#E6CA85] rounded-full eq-bar-1" />
              <span className="w-[2.5px] bg-[#FAF6EE] rounded-full eq-bar-2" />
              <span className="w-[2.5px] bg-[#E6CA85] rounded-full eq-bar-3" />
              <span className="w-[2.5px] bg-[#C5A059] rounded-full eq-bar-4" />
            </div>
          ) : (
            <div className="relative flex items-center justify-center" aria-hidden="true">
              <svg
                className="w-4 h-4 ml-0.5 fill-current text-[#E6CA85] transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </motion.button>
      </motion.div>

      {/* Pure Equalizer Keyframe Styles */}
      <style jsx global>{`
        @keyframes eq1 {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
        @keyframes eq2 {
          0%, 100% { height: 12px; }
          50% { height: 5px; }
        }
        @keyframes eq3 {
          0%, 100% { height: 6px; }
          50% { height: 15px; }
        }
        @keyframes eq4 {
          0%, 100% { height: 10px; }
          50% { height: 4px; }
        }
        .eq-bar-1 {
          animation: eq1 0.8s ease-in-out infinite;
        }
        .eq-bar-2 {
          animation: eq2 0.7s ease-in-out infinite;
        }
        .eq-bar-3 {
          animation: eq3 0.9s ease-in-out infinite;
        }
        .eq-bar-4 {
          animation: eq4 0.65s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
