'use client'

import { useState, useEffect } from 'react'

export default function EditorialCountdown() {
  const [targetDate, setTargetDate] = useState<'18' | '20'>('18')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Target times in IST (UTC + 5:30)
    // 18 Nov 2026 18:00 IST -> 12:30 UTC
    // 20 Nov 2026 06:00 IST -> 00:30 UTC
    const target =
      targetDate === '18'
        ? new Date('2026-11-18T18:00:00+05:30').getTime()
        : new Date('2026-11-20T06:00:00+05:30').getTime()

    const calculate = () => {
      const now = new Date().getTime()
      const diff = Math.max(0, target - now)

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <section
      id="countdown"
      className="relative w-full bg-[#F4ECDD] text-[#1A0A0F] py-20 px-4 sm:px-8 border-b border-[#B8893E]/30"
      aria-label="Wedding Countdown"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8893E] font-medium font-sans mb-3">
          Counting Down The Moments
        </p>
        <h2 className="font-names text-4xl sm:text-5xl md:text-6xl text-[#4A0F20] leading-none mb-6">
          Until We Say Forever
        </h2>

        {/* Date Selector Tabs */}
        <div className="inline-flex p-1 bg-[#4A0F20]/10 border border-[#B8893E]/40 rounded-sm mb-12">
          <button
            type="button"
            onClick={() => setTargetDate('18')}
            className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 ${
              targetDate === '18'
                ? 'bg-[#4A0F20] text-[#F4ECDD] shadow-md'
                : 'text-[#1A0A0F]/70 hover:text-[#1A0A0F]'
            }`}
          >
            18 Nov · Ring Exchange
          </button>
          <button
            type="button"
            onClick={() => setTargetDate('20')}
            className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 ${
              targetDate === '20'
                ? 'bg-[#4A0F20] text-[#F4ECDD] shadow-md'
                : 'text-[#1A0A0F]/70 hover:text-[#1A0A0F]'
            }`}
          >
            20 Nov · Hindu Wedding
          </button>
        </div>

        {/* 4 Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Minutes', val: timeLeft.minutes },
            { label: 'Seconds', val: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/80 border border-[#B8893E]/40 rounded-sm p-5 sm:p-6 shadow-sm flex flex-col items-center justify-center"
            >
              <span className="font-headline text-3xl sm:text-5xl text-[#4A0F20] font-normal tracking-tight">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B8893E] font-sans">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
