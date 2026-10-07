'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function EditorialChapters() {
  // Christian Wedding BGM State
  const [isBgmPlaying, setIsBgmPlaying] = useState(false)
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null)


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

  const toggleChristianBgm = () => {
    if (!bgmAudioRef.current) return
    if (isBgmPlaying) {
      bgmAudioRef.current.pause()
      setIsBgmPlaying(false)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('wedding-secondary-audio-stop', {
            detail: { id: 'chapter-01-bgm' },
          })
        )
      }
    } else {
      document.querySelectorAll('audio').forEach((el) => {
        if (el !== bgmAudioRef.current) el.pause()
      })
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('wedding-secondary-audio-start', {
            detail: { id: 'chapter-01-bgm' },
          })
        )
      }
      bgmAudioRef.current
        .play()
        .then(() => setIsBgmPlaying(true))
        .catch(() => {})
    }
  }

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
      'PRODID:-//Rishma and Malli Wedding//EN',
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

        {/* Top Bar: Chapter Tag & Ceremony Soundtrack Link */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3">
            <span className="font-functional text-[10px] sm:text-xs tracking-[0.35em] text-[#D8CEE5] font-semibold">
              CHAPTER 01
            </span>
            <div className="w-8 sm:w-16 h-px bg-[#D8CEE5]/40" />
          </div>

          {/* Ceremony Soundtrack: Tiny play icon + tracked label at the corner, NO BOX */}
          <div className="flex items-center">
            <audio
              ref={bgmAudioRef}
              src="/audio/christian-wedding-bgm.mp3"
              onEnded={() => {
                setIsBgmPlaying(false)
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(
                    new CustomEvent('wedding-secondary-audio-stop', {
                      detail: { id: 'chapter-01-bgm' },
                    })
                  )
                }
              }}
            />
            <motion.button
              type="button"
              onClick={toggleChristianBgm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2.5 font-functional text-[10px] sm:text-[11px] tracking-[0.25em] text-[#E6CA85] hover:text-[#FFFFFF] transition-colors cursor-pointer bg-transparent border-none p-1"
              aria-label={
                isBgmPlaying
                  ? 'Pause Ceremony Soundtrack'
                  : 'Play Ceremony Soundtrack'
              }
            >
              <span className="w-5 h-5 rounded-full border border-[#C5A059]/60 flex items-center justify-center text-[9px] group-hover:border-[#E6CA85]">
                {isBgmPlaying ? '❚❚' : '▶'}
              </span>
              <span>CEREMONY SOUNDTRACK</span>
              {isBgmPlaying && (
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#E6CA85] h-3 animate-pulse" />
                  <span className="w-0.5 bg-[#FAF6EE] h-2 animate-pulse" />
                  <span className="w-0.5 bg-[#C5A059] h-2.5 animate-pulse" />
                </span>
              )}
            </motion.button>
          </div>
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

            {/* Action Links: Text Links with Left-to-Right Drawing Gold Underline */}
            <div className="pt-6 flex flex-wrap items-center gap-6 sm:gap-10">
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
                    'Rishma & Malli - Christian Nuptials Ceremony',
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
          Transition to Warm Ivory, Saffron & Temple Green
          Arch-shaped mask for temple photography, NO rectangular card
      ======================================================== */}
      <section
        id="chapter-02"
        className="relative min-h-[100svh] w-full py-20 sm:py-28 px-6 sm:px-12 text-[#1A0A0F] overflow-hidden bg-[#FAF5EB]"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, #FFF8ED 0%, #FAF5EB 60%, #F5EDE0 100%)',
        }}
        aria-label="Chapter 02 - Hindu Wedding and Reception"
      >
        <div className="max-w-5xl mx-auto">
          {/* Top Header Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-10 sm:mb-14"
          >
            <span className="font-functional text-[10px] sm:text-xs tracking-[0.35em] text-[#C2671A] font-semibold">
              CHAPTER 02
            </span>
            <div className="w-12 sm:w-20 h-px bg-[#C2671A]/35" />
          </motion.div>

          {/* Typographic Details */}
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Very Large Number Date & Month */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-4 sm:gap-6">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif-title text-7xl xs:text-8xl sm:text-9xl md:text-[11rem] font-light text-[#3D0B1B] leading-none tracking-tighter cursor-default inline-block"
                >
                  20
                </motion.span>
                <div className="flex flex-col">
                  <span className="font-functional text-xs sm:text-sm md:text-base tracking-[0.35em] text-[#C2671A] font-semibold">
                    NOVEMBER 2026
                  </span>
                  <span className="font-functional text-[10px] tracking-[0.25em] text-[#1A0A0F]/60 mt-1">
                    FRIDAY · SACRED CEREMONY &amp; FEAST
                  </span>
                </div>
              </div>

              <h3 className="font-serif-title text-3xl sm:text-5xl md:text-6xl text-[#1A0A0F] font-light tracking-tight leading-tight pt-2">
                Hindu Wedding &amp; Reception
              </h3>
            </div>

            {/* Two Typographic Rows (MUHURTHAM & RECEPTION) in 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-[#C5A059]/30">
              {/* Col 1: MUHURTHAM */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-sm sm:text-base tracking-[0.2em] uppercase text-[#3D0B1B] font-semibold">
                    MUHURTHAM
                  </span>
                  <span className="font-tamil text-sm sm:text-base text-[#C2671A] font-medium">
                    முகூர்த்தம்
                  </span>
                </div>
                <p className="font-functional text-xs tracking-[0.2em] text-[#C2671A] font-semibold">
                  6:00 AM TO 7:00 AM
                </p>
                <p className="font-serif-title text-base sm:text-lg text-[#1A0A0F]/90 font-light leading-relaxed">
                  Kumaran Kundra Temple, Mettupalayam
                </p>
                <div className="pt-2">
                  <motion.a
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    href="https://www.google.com/maps/search/?api=1&query=Kumaran+Kundra+Temple+Mettupalayam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-link-dark inline-block"
                  >
                    TEMPLE ON MAPS ↗
                  </motion.a>
                </div>
              </motion.div>

              {/* Col 2: RECEPTION */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 border-t md:border-t-0 md:border-l border-[#C5A059]/30 pt-6 md:pt-0 md:pl-10"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-sm sm:text-base tracking-[0.2em] uppercase text-[#3D0B1B] font-semibold">
                    RECEPTION
                  </span>
                  <span className="font-tamil text-sm sm:text-base text-[#C2671A] font-medium">
                    வரவேற்பு · மதிய விருந்து
                  </span>
                </div>
                <p className="font-functional text-xs tracking-[0.2em] text-[#C2671A] font-semibold">
                  11:00 AM TO 2:00 PM · FOLLOWED BY LUNCH
                </p>
                <p className="font-serif-title text-base sm:text-lg text-[#1A0A0F]/90 font-light leading-relaxed">
                  Shri Lakshmi Hall, Mettupalayam – Annur Road
                </p>
                <div className="pt-2">
                  <motion.a
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    href="https://www.google.com/maps/search/?api=1&query=Shri+Lakshmi+Hall+Annur+Road+Mettupalayam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-link-dark inline-block"
                  >
                    HALL ON MAPS ↗
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Add to Calendar Action */}
            <div className="pt-6 border-t border-[#C5A059]/30 flex flex-wrap items-center gap-6">
              <motion.button
                type="button"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                onClick={() =>
                  downloadIcs(
                    'Rishma & Malli - Hindu Wedding & Reception',
                    'Hindu Wedding Muhurtham at Kumaran Kundra Temple and Reception with Lunch at Shri Lakshmi Hall',
                    'Kumaran Kundra Temple & Shri Lakshmi Hall, Mettupalayam',
                    '20261120T060000',
                    '20261120T140000'
                  )
                }
                className="gold-link-dark"
              >
                + ADD TO CALENDAR
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
