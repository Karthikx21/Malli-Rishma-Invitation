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

  // Natural cinematic playback pace
  const PLAYBACK_SPEED = 1.0

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

  // Trigger the transition directly to Hero
  const triggerTransition = useCallback(() => {
    if (hasTriggeredRef.current) return
    hasTriggeredRef.current = true

    // Unmute & play floating background soundtrack immediately on interaction
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('wedding-play-music'))
      } catch {
        // Safe fallback
      }
    }

    // 1. Immediately pin scroll position strictly to Hero before starting any fade
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      document.getElementById('hero')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }

    // 2. Notify parent immediately so hero elements begin gliding into view
    onStartTransition?.()

    // 3. Start smooth cinematic cross-dissolve
    setIsFading(true)

    // 4. After the 1000ms cross-dissolve completes, cleanly unmount the intro
    setTimeout(() => {
      onComplete()
    }, 1000)
  }, [onStartTransition, onComplete])

  // Smooth detection: trigger dissolve when envelope opens and invitation card centers (>= 7.8s) or on ended
  const handleTimeUpdate = () => {
    if (hasTriggeredRef.current) return
    const video = videoRef.current
    if (video && (video.currentTime >= 7.8 || video.ended)) {
      triggerTransition()
    }
  }

  return (
    <div
      onClick={triggerTransition}
      onPointerDown={() => {
        if (typeof window !== 'undefined') {
          try {
            window.dispatchEvent(new CustomEvent('wedding-play-music'))
          } catch {
            // Safe fallback
          }
        }
      }}
      className={`fixed inset-0 z-50 bg-[#181324] flex items-center justify-center cursor-pointer select-none transition-opacity duration-1000 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="region"
      aria-label="Opening Wedding Envelope Video"
    >
      {/* Pure Fullscreen Video with zero button overlays */}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/drvvekzzm/video/upload/v1791453046/Wedding_invitation_opening_film_1080p_20261008151626_nrg1qy.mp4"
        poster="/intro-poster.jpg"
        className="w-full h-full object-cover object-center"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={applySpeed}
        onLoadedMetadata={applySpeed}
        onCanPlay={applySpeed}
        onTimeUpdate={handleTimeUpdate}
        onEnded={triggerTransition}
        onError={triggerTransition}
      >
        <source
          src="https://res.cloudinary.com/drvvekzzm/video/upload/v1791453046/Wedding_invitation_opening_film_1080p_20261008151626_nrg1qy.mp4"
          type="video/mp4"
        />
        <source src="/intro.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
