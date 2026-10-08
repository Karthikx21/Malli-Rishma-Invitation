'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EditorialCountdown() {
  const [targetDate, setTargetDate] = useState<'18' | '20'>('18')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
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

  const timeUnits = [
    { label: 'Days', val: timeLeft.days },
    { label: 'Hours', val: timeLeft.hours },
    { label: 'Minutes', val: timeLeft.minutes },
    { label: 'Seconds', val: timeLeft.seconds },
  ]

  return (
    <section
      id="countdown"
      className="relative w-full bg-[#FAF8FC] text-[#2D2338] py-20 sm:py-28 px-6 sm:px-12 border-b border-[#E5DCF0] overflow-hidden"
      aria-label="Wedding Countdown"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-functional text-[10px] sm:text-xs text-[#8D76A8] font-semibold mb-2 tracking-[0.25em]">
            COUNTING THE DAYS
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#2D2338] font-light tracking-tight mb-2">
            Until We Say Forever
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#8D76A8]/50 to-transparent mx-auto mt-3 mb-10"
          />
        </motion.div>

        {/* Date Selector: Text links only (NO PILL/BOXED TABS) */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-14 select-none">
          <motion.button
            type="button"
            onClick={() => setTargetDate('18')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`font-functional text-xs sm:text-sm tracking-[0.25em] transition-colors duration-300 pb-1 relative cursor-pointer ${
              targetDate === '18'
                ? 'text-[#8D76A8] font-semibold'
                : 'text-[#2D2338]/40 hover:text-[#2D2338]/80'
            }`}
          >
            18 NOV · CHRISTIAN NUPTIALS
            {targetDate === '18' && (
              <motion.span
                layoutId="countdownTabLine"
                className="absolute bottom-0 left-0 right-0 h-px bg-[#8D76A8]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>

          <span className="text-[#8D76A8]/40 text-xs">/</span>

          <motion.button
            type="button"
            onClick={() => setTargetDate('20')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`font-functional text-xs sm:text-sm tracking-[0.25em] transition-colors duration-300 pb-1 relative cursor-pointer ${
              targetDate === '20'
                ? 'text-[#8D76A8] font-semibold'
                : 'text-[#2D2338]/40 hover:text-[#2D2338]/80'
            }`}
          >
            20 NOV · HINDU WEDDING
            {targetDate === '20' && (
              <motion.span
                layoutId="countdownTabLine"
                className="absolute bottom-0 left-0 right-0 h-px bg-[#8D76A8]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        </div>

        {/* 4 Counter Columns with AnimatePresence date transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={targetDate}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto divide-y-0 sm:divide-x sm:divide-[#E5DCF0]"
          >
            {timeUnits.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                  y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                className="flex flex-col items-center justify-center py-4 px-2 cursor-default select-none"
              >
                <motion.span
                  key={item.val}
                  initial={{ opacity: 0.85, y: -1 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif-title text-5xl sm:text-7xl md:text-8xl text-[#2D2338] font-light tracking-tight leading-none"
                >
                  {String(item.val).padStart(2, '0')}
                </motion.span>
                <span className="mt-2.5 font-functional text-[10px] sm:text-xs text-[#8D76A8] tracking-[0.25em]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
