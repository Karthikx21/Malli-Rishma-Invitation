'use client'

import { useState, useEffect, useCallback } from 'react'
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
import FloatingMusicPlayer from '@/components/FloatingMusicPlayer'

export default function Page() {
  const [introCompleted, setIntroCompleted] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [introKey, setIntroKey] = useState(0)

  // 1. Immediately on page load and reload: enforce manual scroll restoration and pin to Hero
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      document.getElementById('hero')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
  }, [])

  // 2. While intro is active, lock scrolling strictly so viewport cannot drift away from Hero
  useEffect(() => {
    if (!introCompleted) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.scrollBehavior = 'auto'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.documentElement.style.scrollBehavior = 'smooth'
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.documentElement.style.scrollBehavior = ''
    }
  }, [introCompleted])

  // Fires the exact instant the intro begins dissolving into the wedding invitation
  const handleStartTransition = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    document.getElementById('hero')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    setIsRevealed(true)
  }, [])

  // Fires once the 1000ms cross-dissolve completes, cleanly unmounting the video
  const handleIntroComplete = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    document.getElementById('hero')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    setIsRevealed(true)
    setIntroCompleted(true)
  }, [])

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    setIsRevealed(false)
    setIntroCompleted(false)
    setIntroKey((prev) => prev + 1)
  }, [])

  return (
    <main className="relative min-h-screen bg-[#FAF8FC] text-[#2D2338] overflow-x-hidden selection:bg-[#E6CA85] selection:text-[#2D2338]">
      {/* 1. Cinematic Full-Bleed Intro Video Overlay */}
      {!introCompleted && (
        <EditorialIntro
          key={`intro-${introKey}`}
          onStartTransition={handleStartTransition}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Floating Bottom-Right Soundtrack Player (Plays Anbil Avan starting from Intro) */}
      <FloatingMusicPlayer />

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
