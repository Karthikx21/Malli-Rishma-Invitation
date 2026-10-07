'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FloatingMusicPlayer:
 * Plays "Church Wedding (Anbil Avan).mp3" starting from the intro video itself.
 * Anchored in the bottom-right corner as a luxury editorial media pill.
 * Features:
 * - Autoplay initiation from site load with fallback to first user interaction.
 * - Dancing gold audio equalizer bars and spinning vinyl disc when playing.
 * - Single-tap toggle to Mute / Play ("Touch to Mute" / "Touch to Play").
 * - High z-index (z-[70]) so it is visible and usable during the intro video as well.
 */
export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const userMutedRef = useRef(false)
  const shouldResumeAfterOtherAudioRef = useRef(false)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = false
    audio.volume = 0.8

    // Pause other audio elements across the page
    document.querySelectorAll('audio').forEach((el) => {
      if (el !== audio) el.pause()
    })

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          // Browser autoplay blocked until user gesture
          setIsPlaying(false)
        })
    }
  }, [])

  // 1. Immediate Autoplay on Mount with Robust Global Interaction Unlocking
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.8
    audio.muted = false

    // Attempt immediately on mount
    attemptPlay()

    // Global listener for tap/click anywhere to immediately unlock and play audio
    const handleGesture = () => {
      setHasInteracted(true)
      const currentAudio = audioRef.current
      if (currentAudio && !userMutedRef.current) {
        currentAudio.muted = false
        currentAudio.volume = 0.8
        const promise = currentAudio.play()
        if (promise !== undefined) {
          promise
            .then(() => {
              setIsPlaying(true)
            })
            .catch(() => {})
        }
      }
    }

    const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown']
    events.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { passive: true })
    })

    window.addEventListener('wedding-play-music', handleGesture)

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleGesture)
      })
      window.removeEventListener('wedding-play-music', handleGesture)
    }
  }, [attemptPlay])

  // 2. Intelligent Auto-Pause & Resume ONLY for secondary audio (Side A, Side B, Ceremony BGM)
  useEffect(() => {
    const handleOtherAudioPlay = (e?: Event) => {
      const target = e?.target as HTMLElement | undefined
      // CRITICAL FIX: ONLY respond to secondary <audio> elements (NEVER <video> elements like intro.mp4 or hero videos!)
      if (target && target.tagName === 'AUDIO' && target !== audioRef.current) {
        if (resumeTimerRef.current) {
          clearTimeout(resumeTimerRef.current)
          resumeTimerRef.current = null
        }
        const mainAudio = audioRef.current
        if (mainAudio) {
          if (!userMutedRef.current) {
            shouldResumeAfterOtherAudioRef.current = true
          }
          if (!mainAudio.paused) {
            mainAudio.pause()
            setIsPlaying(false)
          }
        }
      }
    }

    const checkAndResumeMainAudio = () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
      }
      // Small 150ms buffer to allow seamless track transitions without audio collision
      resumeTimerRef.current = setTimeout(() => {
        const otherAudios = Array.from(document.querySelectorAll('audio')).filter(
          (el) => el !== audioRef.current
        )
        const isAnyOtherAudioPlaying = otherAudios.some((el) => !el.paused)

        if (!isAnyOtherAudioPlaying) {
          const mainAudio = audioRef.current
          if (mainAudio && shouldResumeAfterOtherAudioRef.current && !userMutedRef.current) {
            // Resume from exact timestamp where it was paused
            mainAudio.muted = false
            mainAudio
              .play()
              .then(() => {
                setIsPlaying(true)
                shouldResumeAfterOtherAudioRef.current = false
              })
              .catch(() => {})
          }
        }
      }, 150)
    }

    const handleOtherAudioStop = (e?: Event) => {
      const target = e?.target as HTMLElement | undefined
      // CRITICAL FIX: ONLY respond to secondary <audio> elements (NEVER <video> elements!)
      if (target && target.tagName === 'AUDIO' && target !== audioRef.current) {
        checkAndResumeMainAudio()
      }
    }

    // Capture phase listeners catch all native audio events across the entire DOM
    document.addEventListener('play', handleOtherAudioPlay, true)
    document.addEventListener('pause', handleOtherAudioStop, true)
    document.addEventListener('ended', handleOtherAudioStop, true)

    // Explicit custom events for extra safety
    window.addEventListener('wedding-secondary-audio-start', handleOtherAudioPlay)
    window.addEventListener('wedding-secondary-audio-stop', checkAndResumeMainAudio)

    return () => {
      document.removeEventListener('play', handleOtherAudioPlay, true)
      document.removeEventListener('pause', handleOtherAudioStop, true)
      document.removeEventListener('ended', handleOtherAudioStop, true)
      window.removeEventListener('wedding-secondary-audio-start', handleOtherAudioPlay)
      window.removeEventListener('wedding-secondary-audio-stop', checkAndResumeMainAudio)
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
      shouldResumeAfterOtherAudioRef.current = false
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
      audio.pause()
      setIsPlaying(false)
    } else {
      userMutedRef.current = false
      shouldResumeAfterOtherAudioRef.current = false
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
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[70] select-none"
      >
        <motion.button
          type="button"
          onClick={togglePlay}
          whileHover={{ scale: 1.1, y: -1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.18 }}
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
