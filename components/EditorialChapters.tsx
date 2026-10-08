'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function EditorialChapters() {
  // Reduced motion and save-data checks
  const [shouldUsePoster, setShouldUsePoster] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const saveData = (navigator as any).connection?.saveData === true
      setShouldUsePoster(prefersReduced || saveData)
    }
  }, [])

  const downloadIcs = (
    title: string,
    desc: string,
    location: string,
    start: string,
    end: string
  ) => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Malli and Rishma Wedding//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${location}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div id="celebration" className="relative w-full overflow-hidden">
      {/* ========================================================
          CHAPTER 01: CHRISTIAN NUPTIALS CEREMONY
          Full-bleed video background with midnight navy + wine gradient
      ======================================================== */}
      <section
        id="chapter-01"
        className="relative min-h-[100svh] w-full flex flex-col justify-between py-16 sm:py-24 px-6 sm:px-12 text-[#FAF6EE] overflow-hidden bg-[#181324]"
        aria-label="Chapter 01 - Christian Nuptials Ceremony"
      >
        {/* Full-bleed background video / fallback poster */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {shouldUsePoster ? (
            <img
              src="/videos/ring-poster.webp"
              alt="Christian Nuptials"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <video
              className="w-full h-full object-cover object-center scale-105"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/videos/ring-poster.webp"
            >
              <source src="/videos/ring-loop.webm" type="video/webm" />
              <source src="/videos/ring-loop.mp4" type="video/mp4" />
            </video>
          )}

          {/* Soft Lavender Mist & Ambient Lilac Overlay */}
          <div className="absolute inset-0 bg-[#B8A9C9]/15 mix-blend-color pointer-events-none" />

          {/* Twilight Lavender Gradient rising from bottom for contrast (Pure Christian Vibe) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181324] via-[#221B30]/85 to-[#382C4A]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(24,19,36,0.95)_0%,transparent_75%)] pointer-events-none" />
        </div>

        {/* Top Bar: Chapter Tag */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center gap-3">
          <span className="font-functional text-[10px] sm:text-xs tracking-[0.35em] text-[#D8CEE5] font-semibold">
            CHAPTER 01
          </span>
          <div className="w-8 sm:w-16 h-px bg-[#D8CEE5]/40" />
        </div>

        {/* Center/Bottom Typographic Magazine Layout (NO CARD FRAME) */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto my-auto pt-16 pb-8"
        >
          {/* Very Large Number Date & Month */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-4 sm:gap-6">
              <motion.span
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="font-serif-title text-7xl xs:text-8xl sm:text-9xl md:text-[11rem] font-light text-[#FAF6EE] leading-none tracking-tighter drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] cursor-default inline-block"
              >
                18
              </motion.span>
              <div className="flex flex-col">
                <span className="font-functional text-xs sm:text-sm md:text-base tracking-[0.35em] text-[#E6CA85] font-medium">
                  NOVEMBER 2026
                </span>
                <span className="font-functional text-[10px] tracking-[0.25em] text-[#FAF6EE]/60 mt-1">
                  WEDNESDAY · EVENING
                </span>
              </div>
            </div>

            <h3 className="font-serif-title text-3xl sm:text-5xl md:text-6xl text-[#FAF6EE] font-light tracking-tight leading-tight pt-2">
              Christian Nuptials Ceremony
            </h3>
          </div>

          {/* Time & Venue: Separated by Delicate Gold Hairlines */}
          <div className="mt-10 pt-8 border-t border-[#C5A059]/30 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 font-functional text-xs text-[#FAF6EE]/90">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <span className="text-[#C5A059] block text-[10px] tracking-[0.3em] mb-1">
                  TIME
                </span>
                <span className="text-sm sm:text-base tracking-[0.1em] font-light">
                  6:00 PM TO 10:00 PM
                </span>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <span className="text-[#C5A059] block text-[10px] tracking-[0.3em] mb-1">
                  VENUE
                </span>
                <span className="text-sm sm:text-base tracking-[0.1em] font-light">
                  Jenneys Residency, Avinashi Road, Coimbatore
                </span>
              </motion.div>
            </div>

            {/* Catchy Ring Exchange Timing Callout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="p-3 sm:px-4 sm:py-3 rounded-xl bg-gradient-to-r from-[#E6CA85]/15 via-[#E6CA85]/10 to-transparent border border-[#E6CA85]/35 backdrop-blur-md flex items-center gap-2.5 sm:gap-3"
            >
              <span className="text-base sm:text-lg shrink-0" aria-hidden="true">
                💍
              </span>
              <p className="font-functional text-xs sm:text-sm text-[#FAF6EE] tracking-[0.03em] leading-snug">
                <span className="font-semibold text-[#E6CA85]">
                  Dinner can wait, but the rings won’t!
                </span>{' '}
                <span className="text-[#FAF6EE]/90 font-light">
                  Ring exchange is at 6:00 PM sharp — no rewinds!
                </span>
              </p>
            </motion.div>

            {/* Action Links: Text Links with Left-to-Right Drawing Gold Underline */}
            <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-10">
              <motion.a
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                href="https://www.google.com/maps/search/?api=1&query=Jenneys+Residency+Avinashi+Road+Coimbatore"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-link inline-block"
              >
                VIEW ON GOOGLE MAPS ↗
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                onClick={() =>
                  downloadIcs(
                    'Malli & Rishma - Christian Nuptials Ceremony',
                    'Christian Nuptials Ceremony followed by Gala Dinner',
                    'Jenneys Residency, Avinashi Road, Coimbatore',
                    '20261118T180000',
                    '20261118T220000'
                  )
                }
                className="gold-link text-[#FAF6EE]/80"
              >
                + ADD TO CALENDAR
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>



      {/* ========================================================
          CHAPTER 02: HINDU WEDDING & RECEPTION
          Full-bleed Sacred Metti Ritual Background with Temple Warmth & Crimson Gradient
      ======================================================== */}
      <section
        id="chapter-02"
        className="relative min-h-[100svh] w-full flex flex-col justify-between py-16 sm:py-24 px-6 sm:px-12 text-[#FAF6EE] overflow-hidden bg-[#1A0A0F]"
        aria-label="Chapter 02 - Hindu Wedding and Reception"
      >
        {/* Full-bleed background: Sacred Metti Ceremony Ritual with subtle living motion */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <motion.div
            className="relative w-full h-full overflow-hidden"
          >
            {/* Subtle continuous cinematic Ken Burns zoom */}
            <motion.img
              src="/editorial/metti-vertical.jpg"
              alt="Sacred Metti Ceremony - Tamil Wedding Ritual"
              animate={{ scale: [1.02, 1.08, 1.02], y: [0, -12, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-[center_35%]"
            />
            {/* Warm Golden Turmeric & Sacred Kumkum Hue overlay */}
            <div className="absolute inset-0 bg-[#A63C1E]/20 mix-blend-color pointer-events-none" />
            {/* Deep Crimson vignette & gradient for optimal typographic legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120307] via-[#21060E]/85 to-[#2E0914]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(18,3,7,0.95)_0%,transparent_75%)] pointer-events-none" />
          </motion.div>
        </div>

        {/* Top Bar: Chapter Tag */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center gap-3">
          <span className="font-functional text-[10px] sm:text-xs tracking-[0.35em] text-[#E6CA85] font-semibold">
            CHAPTER 02
          </span>
          <div className="w-8 sm:w-16 h-px bg-[#E6CA85]/40" />
        </div>

        {/* Center/Bottom Typographic Magazine Layout (NO CARD FRAME) */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto my-auto pt-16 pb-8"
        >
          {/* Very Large Number Date & Month */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-4 sm:gap-6">
              <motion.span
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="font-serif-title text-7xl xs:text-8xl sm:text-9xl md:text-[11rem] font-light text-[#FAF6EE] leading-none tracking-tighter drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] cursor-default inline-block"
              >
                20
              </motion.span>
              <div className="flex flex-col">
                <span className="font-functional text-xs sm:text-sm md:text-base tracking-[0.35em] text-[#E6CA85] font-medium">
                  NOVEMBER 2026
                </span>
                <span className="font-functional text-[10px] tracking-[0.25em] text-[#FAF6EE]/60 mt-1">
                  FRIDAY · SACRED CEREMONY &amp; RECEPTION
                </span>
              </div>
            </div>

            <h3 className="font-serif-title text-3xl sm:text-5xl md:text-6xl text-[#FAF6EE] font-light tracking-tight leading-tight pt-2">
              Hindu Wedding &amp; Reception
            </h3>
          </div>

          {/* Two Typographic Rows (MUHURTHAM & RECEPTION) in 2-Column Grid */}
          <div className="mt-10 pt-8 border-t border-[#C5A059]/30 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 font-functional text-xs text-[#FAF6EE]/90">
              {/* Col 1: MUHURTHAM */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA85] font-semibold">
                    MUHURTHAM
                  </span>
                  <span className="font-tamil text-xs sm:text-sm text-[#E6CA85]/80 font-medium">
                    முகூர்த்தம்
                  </span>
                </div>
                <p className="text-[#C5A059] text-[10px] sm:text-xs tracking-[0.25em] font-semibold">
                  6:00 AM TO 7:00 AM
                </p>
                <p className="font-serif-title text-base sm:text-lg text-[#FAF6EE]/90 font-light leading-relaxed">
                  Kumarankundru Temple, Mettupalayam
                </p>
                <div className="pt-2">
                  <motion.a
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    href="https://www.google.com/maps/search/?api=1&query=Kumarankundru+Temple+Mettupalayam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-link inline-block"
                  >
                    TEMPLE ON MAPS ↗
                  </motion.a>
                </div>
              </motion.div>

              {/* Col 2: RECEPTION */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 border-t md:border-t-0 md:border-l border-[#C5A059]/30 pt-6 md:pt-0 md:pl-10"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xs sm:text-sm tracking-[0.25em] uppercase text-[#E6CA85] font-semibold">
                    RECEPTION
                  </span>
                  <span className="font-tamil text-xs sm:text-sm text-[#E6CA85]/80 font-medium">
                    வரவேற்பு
                  </span>
                </div>
                <p className="text-[#C5A059] text-[10px] sm:text-xs tracking-[0.25em] font-semibold">
                  11:00 AM TO 2:00 PM
                </p>
                <p className="font-serif-title text-base sm:text-lg text-[#FAF6EE]/90 font-light leading-relaxed">
                  Shri Lakshmi Hall, Mettupalayam – Annur Road
                </p>
                <div className="pt-2">
                  <motion.a
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    href="https://www.google.com/maps/search/?api=1&query=Shri+Lakshmi+Hall+Annur+Road+Mettupalayam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-link inline-block"
                  >
                    HALL ON MAPS ↗
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Add to Calendar Action */}
            <div className="pt-6 flex flex-wrap items-center gap-6 sm:gap-10 border-t border-[#C5A059]/30">
              <motion.button
                type="button"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                onClick={() =>
                  downloadIcs(
                    'Malli & Rishma - Hindu Wedding & Reception',
                    'Hindu Wedding Muhurtham at Kumarankundru Temple and Reception at Shri Lakshmi Hall',
                    'Kumarankundru Temple & Shri Lakshmi Hall, Mettupalayam',
                    '20261120T060000',
                    '20261120T140000'
                  )
                }
                className="gold-link text-[#FAF6EE]/80"
              >
                + ADD TO CALENDAR
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
