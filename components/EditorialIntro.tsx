'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface EditorialIntroProps {
  onStartTransition?: () => void
  onComplete: () => void
}

/**
 * EditorialIntro:
 * Pure, full-bleed cinematic video screen with ZERO button overlays or watermarks.
 * Plays the envelope video at 1.25x speed for a brisk, luxurious pace.
 * Detects the exact moment when the wax seal breaks and smoke plumes billow (currentTime >= 6.35s),
 * instantly triggering a seamless cross-dissolve directly into the wedding invitation.
 * Tapping anywhere on the screen also gracefully dissolves into the invitation.
 */
export default function EditorialIntro({ onStartTransition, onComplete }: EditorialIntroProps) {
  const [isFading, setIsFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hasTriggeredRef = useRef(false)

  // Speed up video playback slightly (1.25x) as requested
  const PLAYBACK_SPEED = 1.25

  const applySpeed = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = PLAYBACK_SPEED
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = PLAYBACK_SPEED
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback
        })
      }
    }
  }, [applySpeed])

  // Trigger the transition in sync with the smoke
  const triggerTransition = useCallback(() => {
    if (hasTriggeredRef.current) return
    hasTriggeredRef.current = true

    // 1. Notify parent immediately so hero elements begin gliding in through the smoke
    onStartTransition?.()

    // 2. Start the smooth visual dissolve
    setIsFading(true)

    // 3. After the 800ms dissolve completes, fully unmount the intro
    setTimeout(() => {
      onComplete()
    }, 800)
  }, [onStartTransition, onComplete])

  // Precise smoke detection:
  // In intro.mp4, the seal cracks and white smoke begins billowing outward at ~6.30s - 6.40s.
  // Starting the dissolve at 6.35s guarantees the video dissolves WHILE the smoke is actively filling the screen.
  const handleTimeUpdate = () => {
    if (hasTriggeredRef.current) return
    const video = videoRef.current
    if (video && video.currentTime >= 6.35) {
      triggerTransition()
    }
  }

  return (
    <div
      onClick={triggerTransition}
      className={`fixed inset-0 z-50 bg-[#1A050D] flex items-center justify-center cursor-pointer select-none transition-all duration-800 ease-out ${
        isFading ? 'opacity-0 scale-[1.04] blur-sm pointer-events-none' : 'opacity-100 scale-100 blur-0'
      }`}
      style={{
        transitionDuration: '800ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      role="region"
      aria-label="Opening Wedding Envelope Video"
    >
      {/* Pure Fullscreen Video with zero button overlays */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        className="w-full h-full object-cover object-center"
        autoPlay
        muted
        playsInline
        onPlay={applySpeed}
        onLoadedMetadata={applySpeed}
        onCanPlay={applySpeed}
        onTimeUpdate={handleTimeUpdate}
        onEnded={triggerTransition}
        onError={triggerTransition}
      />
    </div>
  )
}
