'use client'

import { useState, useRef, useEffect } from 'react'

interface EditorialIntroProps {
  onComplete: () => void
}

/**
 * EditorialIntro:
 * Pure, full-bleed cinematic video screen with ZERO button overlays or watermarks.
 * Plays the envelope video cleanly, then transitions automatically into the web designs.
 * Tapping anywhere on the screen gently advances to the web designs.
 */
export default function EditorialIntro({ onComplete }: EditorialIntroProps) {
  const [isFading, setIsFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      })
    }
  }, [])

  const handleFinish = () => {
    if (isFading) return
    setIsFading(true)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 bg-[#1A0A0F] flex items-center justify-center cursor-pointer transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
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
        onEnded={handleFinish}
        onError={handleFinish}
      />
    </div>
  )
}
