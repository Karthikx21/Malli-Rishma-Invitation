'use client'

import { useState, useCallback } from 'react'
import EditorialIntro from '@/components/EditorialIntro'
import EditorialHero from '@/components/EditorialHero'
import EditorialSmokeLayer from '@/components/EditorialSmokeLayer'
import EditorialMarquee from '@/components/EditorialMarquee'
import EditorialCouple from '@/components/EditorialCouple'
import EditorialOkKanmani from '@/components/EditorialOkKanmani'
import EditorialCountdown from '@/components/EditorialCountdown'
import EditorialChapters from '@/components/EditorialChapters'
import EditorialDressCode from '@/components/EditorialDressCode'
import EditorialVenues from '@/components/EditorialVenues'
import EditorialRsvp from '@/components/EditorialRsvp'
import EditorialFooter from '@/components/EditorialFooter'

export default function Page() {
  const [introCompleted, setIntroCompleted] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [introKey, setIntroKey] = useState(0)

  // Fires the exact instant the wax seal cracks and smoke billows in the video
  const handleStartTransition = useCallback(() => {
    setIsRevealed(true)
  }, [])

  // Fires once the 800ms smoke cross-dissolve completes, cleanly unmounting the video
  const handleIntroComplete = useCallback(() => {
    setIsRevealed(true)
    setIntroCompleted(true)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const handleReplayIntro = useCallback(() => {
    setIsRevealed(false)
    setIntroCompleted(false)
    setIntroKey((prev) => prev + 1)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative min-h-screen bg-[#1A050D] text-[#FAF6EE] overflow-x-hidden selection:bg-[#E6CA85] selection:text-[#1A050D]">
      {/* 1. Cinematic Full-Bleed Intro Video Overlay */}
      {!introCompleted && (
        <EditorialIntro
          key={`intro-${introKey}`}
          onStartTransition={handleStartTransition}
          onComplete={handleIntroComplete}
        />
      )}

      {/* 2. Main Luxury Wedding Invitation - Mounted ready underneath for zero delay */}
      <div className="relative w-full">
        {/* Subtle ambient atmospheric gradient */}
        <EditorialSmokeLayer opacity={0.32} />

        {/* Hero Section with synchronized reveal as smoke clears */}
        <EditorialHero isRevealed={isRevealed} />

        {/* Marquee Ticker */}
        <EditorialMarquee />

        {/* Know the Couple & How We Met */}
        <EditorialCouple />

        {/* OK Kanmani Soundtrack & Editorial Pull-Quote */}
        <EditorialOkKanmani />

        {/* Countdown Timer with Date Switcher */}
        <EditorialCountdown />

        {/* The Two Chapters (with Christian Wedding BGM in Chapter 01) */}
        <EditorialChapters />

        {/* Dress Code (Wine Tones & Picture Perfect) */}
        <EditorialDressCode />

        {/* Venues ("Find us here" with Google Maps) */}
        <EditorialVenues />

        {/* RSVP Form with Stepper & WhatsApp Confirmation */}
        <EditorialRsvp />

        {/* Editorial Signature Footer */}
        <EditorialFooter onReplayIntro={handleReplayIntro} />
      </div>
    </main>
  )
}
