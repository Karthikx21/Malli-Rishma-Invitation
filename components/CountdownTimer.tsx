'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * Modern luxury countdown timer matching the Border Beam dark aesthetic:
 * - Rounded pill switch for 18 Nov / 20 Nov
 * - Sleek recessed dark counter tiles with glowing Cinzel numerals
 * - Subtle metallic gold & rose-wine accents
 */
export default function CountdownTimer() {
  const [selectedEvent, setSelectedEvent] = useState<'ring' | 'muhurtham'>('ring')

  // Ring Exchange: Nov 18, 2026 18:00:00 GMT+0530
  const ringDate = new Date('2026-11-18T18:00:00+05:30').getTime()
  // Hindu Muhurtham: Nov 20, 2026 06:00:00 GMT+0530
  const muhurthamDate = new Date('2026-11-20T06:00:00+05:30').getTime()

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = selectedEvent === 'ring' ? ringDate : muhurthamDate

    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [selectedEvent, ringDate, muhurthamDate])

  return (
    <div className="w-full max-w-xl mx-auto my-8 px-2">
      {/* 18 Nov / 20 Nov Pill Switch */}
      <div className="flex justify-center mb-8">
        <div className="relative inline-flex items-center p-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setSelectedEvent('ring')}
            className={`relative z-10 px-5 sm:px-6 py-2 rounded-full font-sans text-[11px] sm:text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer ${
              selectedEvent === 'ring'
                ? 'bg-gradient-to-r from-[#B08D57] via-[#C99E63] to-[#D95C80] text-[#0C0207] font-semibold shadow-[0_0_20px_rgba(176,141,87,0.4)]'
                : 'text-[#BFAEA0] hover:text-[#F8F4ED]'
            }`}
          >
            18 NOVEMBER
          </button>

          <button
            onClick={() => setSelectedEvent('muhurtham')}
            className={`relative z-10 px-5 sm:px-6 py-2 rounded-full font-sans text-[11px] sm:text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer ${
              selectedEvent === 'muhurtham'
                ? 'bg-gradient-to-r from-[#B08D57] via-[#C99E63] to-[#D95C80] text-[#0C0207] font-semibold shadow-[0_0_20px_rgba(176,141,87,0.4)]'
                : 'text-[#BFAEA0] hover:text-[#F8F4ED]'
            }`}
          >
            20 NOVEMBER
          </button>
        </div>
      </div>

      {/* Countdown Digits: 4 Sleek Dark Recessed Tiles */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
          { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
          { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
        ].map((unit, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#B08D57]/40 transition-colors group"
          >
            {/* Top specular reflection */}
            <div className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-[#E8D09E]/20 to-transparent" />

            <span className="font-cinzel text-2xl sm:text-4xl lg:text-5xl text-[#F8F4ED] font-light leading-none group-hover:text-[#F5E5C0] transition-colors">
              {unit.value}
            </span>
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#B08D57] mt-2.5 font-medium">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center font-cormorant italic text-base text-[#BFAEA0]">
        {selectedEvent === 'ring'
          ? 'Until the Christian Nuptials & Gala Dinner at Jenneys Residency'
          : 'Until the sacred Muhurtham at Kumarankundru Temple'}
      </p>
    </div>
  )
}
