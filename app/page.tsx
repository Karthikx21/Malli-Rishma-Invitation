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
  const [introKey, setIntroKey] = useState(0)

  const handleIntroComplete = useCallback(() => {
    setIntroCompleted(true)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const handleReplayIntro = useCallback(() => {
    setIntroCompleted(false)
    setIntroKey((prev) => prev + 1)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative min-h-screen bg-[#F4ECDD] text-[#1A0A0F] overflow-x-hidden selection:bg-[#4A0F20] selection:text-[#F4ECDD]">
      {!introCompleted ? (
        /* STEP 1: Separate Standalone Intro Envelope Video */
        <EditorialIntro key={introKey} onComplete={handleIntroComplete} />
      ) : (
        /* STEP 2: Only after the intro envelope video finishes, display the web designs */
        <div className="relative w-full animate-in fade-in duration-700">
          {/* Only one smoke WebM layer mounted at a time, unmounted when off screen */}
          <EditorialSmokeLayer opacity={0.32} />

          {/* Hero Section */}
          <EditorialHero />

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
      )}
    </main>
  )
}
