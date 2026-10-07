'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EditorialChapters() {
  // Christian Wedding BGM State
  const [isBgmPlaying, setIsBgmPlaying] = useState(false)
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null)

  // Temple view state in Chapter 2: 'carvings' (new sacred carvings) vs 'hillside'
  const [templeView, setTempleView] = useState<'carvings' | 'hillside'>('carvings')

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
    } else {
      document.querySelectorAll('audio').forEach((el) => {
        if (el !== bgmAudioRef.current) el.pause()
      })
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
          CHAPTER 01: CHRISTIAN RING EXCHANGE CEREMONY
          Full-bleed video background with midnight navy + wine gradient
      ======================================================== */}
      <section
        id="chapter-01"
        className="relative min-h-[100svh] w-full flex flex-col justify-between py-16 sm:py-24 px-6 sm:px-12 text-[#FAF6EE] overflow-hidden bg-[#080E1E]"
        aria-label="Chapter 01 - Christian Ring Exchange Ceremony"
      >
        {/* Full-bleed background video / fallback poster */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {shouldUsePoster ? (
            <img
              src="/videos/ring-poster.webp"
              alt="Christian Ring Exchange"
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

          {/* Midnight Navy & Wine Gradient rising from the bottom for strong contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E] via-[#0B132B]/85 to-[#2A0510]/50 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(8,14,30,0.95)_0%,transparent_75%)] pointer-events-none" />
        </div>

        {/* Top Bar: Chapter Tag & Ceremony Soundtrack Link */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3">
            <span className="font-functional text-[10px] sm:text-xs tracking-[0.35em] text-[#C5A059]">
              CHAPTER 01
            </span>
            <div className="w-8 sm:w-16 h-px bg-[#C5A059]/40" />
          </div>

          {/* Ceremony Soundtrack: Tiny play icon + tracked label at the corner, NO BOX */}
          <div className="flex items-center">
            <audio
              ref={bgmAudioRef}
              src="/audio/christian-wedding-bgm.mp3"
              preload="metadata"
              onEnded={() => setIsBgmPlaying(false)}
            />
            <button
              type="button"
              onClick={toggleChristianBgm}
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
            </button>
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
              <span className="font-serif-title text-7xl xs:text-8xl sm:text-9xl md:text-[11rem] font-light text-[#FAF6EE] leading-none tracking-tighter drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
                18
              </span>
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
              Christian Ring Exchange Ceremony
            </h3>

            <div className="pt-3 max-w-xl space-y-1">
              <p className="font-serif-title italic text-base sm:text-xl text-[#FAF6EE]/90 font-light leading-snug">
                &ldquo;And above all these put on love, which binds everything together in perfect harmony.&rdquo;
              </p>
              <span className="font-functional text-[10px] text-[#E6CA85] tracking-[0.25em] block">
                — COLOSSIANS 3:14
              </span>
            </div>
          </div>

          {/* Time & Venue: Separated by Delicate Gold Hairlines */}
          <div className="mt-10 pt-8 border-t border-[#C5A059]/30 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 font-functional text-xs text-[#FAF6EE]/90">
              <div>
                <span className="text-[#C5A059] block text-[10px] tracking-[0.3em] mb-1">
                  TIME
                </span>
                <span className="text-sm sm:text-base tracking-[0.1em] font-light">
                  6:00 PM TO 10:00 PM
                </span>
              </div>

              <div>
                <span className="text-[#C5A059] block text-[10px] tracking-[0.3em] mb-1">
                  VENUE
                </span>
                <span className="text-sm sm:text-base tracking-[0.1em] font-light">
                  Jenneys Residency, Avinashi Road, Coimbatore
                </span>
              </div>
            </div>

            {/* Action Links: Text Links with Left-to-Right Drawing Gold Underline */}
            <div className="pt-6 flex flex-wrap items-center gap-6 sm:gap-10">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Jenneys+Residency+Avinashi+Road+Coimbatore"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-link"
              >
                VIEW ON GOOGLE MAPS ↗
              </a>

              <button
                type="button"
                onClick={() =>
                  downloadIcs(
                    'Rishma & Malli - Christian Ring Exchange Ceremony',
                    'Christian Ring Exchange Ceremony followed by Gala Dinner',
                    'Jenneys Residency, Avinashi Road, Coimbatore',
                    '20261118T180000',
                    '20261118T220000'
                  )
                }
                className="gold-link text-[#FAF6EE]/80"
              >
                + ADD TO CALENDAR
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================
          EDITORIAL INTERLUDE: THE ROYAL PEACOCK OF KUMARAN KUNDRA
          Sacred transition portal from midnight navy to sacred saffron/ivory
      ======================================================== */}
      <section
        className="relative w-full bg-[#1F040C] py-20 sm:py-28 px-6 sm:px-12 border-y border-[#C5A059]/30 overflow-hidden"
        aria-label="Sacred Portal of Kumaran Kundra"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14"
        >
          {/* Royal Peacock in Crimson Archway */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
              <div className="relative aspect-[3/4] w-full rounded-t-[160px] overflow-hidden shadow-2xl border border-[#C5A059]/40 bg-[#2A0510]">
                <img
                  src="/editorial/peacock-crimson-arch.jpg"
                  alt="Royal Peacock in Crimson Arch - Sacred Vahana of Lord Murugan"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F040C]/60 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Outer gold hairline arch outline */}
              <div
                className="absolute inset-0 pointer-events-none border border-[#C5A059]/30 rounded-t-[160px] -m-2 opacity-50"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Interlude Story & Transition */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-4 text-[#FAF6EE]">
            <span className="font-functional text-[10px] tracking-[0.35em] text-[#E6CA85] font-semibold">
              SACRED TRANSITION · பவழ மல்லி
            </span>
            <h3 className="font-serif-title text-3xl sm:text-4xl text-[#FAF6EE] font-light leading-snug">
              From Evening Promise to Sacred Dawn
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent mx-auto md:mx-0 my-3" />
            <p className="font-serif-title italic text-base sm:text-lg text-[#FAF6EE]/85 font-light leading-relaxed">
              &ldquo;The Mayil (மயில்), sacred emblem of Kumaran Kundra, heralds the sacred dawn of November 20 where ancient heritage, holy mantras, and eternal promises unite.&rdquo;
            </p>
            <p className="font-functional text-[10px] text-[#C5A059] tracking-[0.25em] pt-2">
              TWO CULTURES · ONE SACRED CELEBRATION
            </p>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Temple Image in Arch-shaped Mask (NO RECTANGULAR CARD) */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 flex flex-col items-center"
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
                {/* Arch-shaped photograph with crossfade */}
                <div className="relative aspect-[3/4] w-full temple-arch-mask overflow-hidden shadow-2xl bg-[#2A0510]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={templeView}
                      src={
                        templeView === 'carvings'
                          ? '/editorial/temple-sacred-carvings.jpg'
                          : '/day2-temple-bg.jpg'
                      }
                      alt="Kumaran Kundra Sacred Temple"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full object-cover object-center"
                    />
                  </AnimatePresence>
                  {/* Subtle saffron-tinted gradient fade at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5EB] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Delicate gold hairline border around the arch */}
                <div
                  className="absolute inset-0 pointer-events-none border border-[#C5A059]/40 rounded-t-[180px] sm:rounded-t-[260px] -m-1.5 opacity-60"
                  aria-hidden="true"
                />
              </div>

              {/* View Switcher: Sacred Shrine Carvings vs Hillside Temple */}
              <div className="mt-4 flex items-center gap-4 select-none">
                <button
                  type="button"
                  onClick={() => setTempleView('carvings')}
                  className={`font-functional text-[9px] tracking-[0.2em] pb-0.5 cursor-pointer transition-colors ${
                    templeView === 'carvings'
                      ? 'text-[#C2671A] border-b border-[#C2671A] font-semibold'
                      : 'text-[#1A0A0F]/45 hover:text-[#1A0A0F]/80'
                  }`}
                >
                  SACRED SHRINE
                </button>
                <span className="text-[#C5A059]/40 text-xs">/</span>
                <button
                  type="button"
                  onClick={() => setTempleView('hillside')}
                  className={`font-functional text-[9px] tracking-[0.2em] pb-0.5 cursor-pointer transition-colors ${
                    templeView === 'hillside'
                      ? 'text-[#C2671A] border-b border-[#C2671A] font-semibold'
                      : 'text-[#1A0A0F]/45 hover:text-[#1A0A0F]/80'
                  }`}
                >
                  HILLSIDE TEMPLE
                </button>
              </div>
            </motion.div>

            {/* Right Column: Typographic Details */}
            <motion.div
              initial={{ opacity: 0, y: 32, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 flex flex-col justify-center space-y-6"
            >
              {/* Very Large Number Date & Month */}
              <div>
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-serif-title text-7xl xs:text-8xl sm:text-9xl font-light text-[#3D0B1B] leading-none tracking-tighter">
                    20
                  </span>
                  <div className="flex flex-col">
                    <span className="font-functional text-xs sm:text-sm tracking-[0.35em] text-[#C2671A] font-semibold">
                      NOVEMBER 2026
                    </span>
                    <span className="font-functional text-[10px] tracking-[0.25em] text-[#1A0A0F]/60 mt-1">
                      FRIDAY · SACRED CEREMONY &amp; FEAST
                    </span>
                  </div>
                </div>

                <h3 className="font-serif-title text-3xl sm:text-5xl text-[#1A0A0F] font-light tracking-tight leading-tight mt-2">
                  Hindu Wedding &amp; Reception
                </h3>

                <div className="pt-2 max-w-xl">
                  <p className="font-tamil text-sm sm:text-base text-[#3D0B1B] font-normal leading-relaxed">
                    அன்பிற்கும் உண்டோ அடைக்குந்தாழ் ஆர்வலர் புன்கணீர் பூசல் தரும்.
                  </p>
                  <span className="font-tamil text-xs text-[#C2671A] font-medium tracking-wider block mt-0.5">
                    — திருவள்ளுவர்
                  </span>
                </div>
              </div>

              {/* Two Typographic Rows (NO INNER BOXES) */}
              <div className="space-y-6 pt-4">
                {/* Row 1: MUHURTHAM */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-sm sm:text-base tracking-[0.2em] uppercase text-[#3D0B1B] font-semibold">
                      MUHURTHAM
                    </span>
                    <span className="font-tamil text-sm sm:text-base text-[#C2671A] font-medium">
                      முகூர்த்தம்
                    </span>
                  </div>
                  <p className="font-functional text-xs tracking-[0.2em] text-[#C2671A]">
                    6:00 AM TO 7:00 AM
                  </p>
                  <p className="font-serif-title text-base sm:text-lg text-[#1A0A0F]/90 font-light">
                    Kumaran Kundra Temple, Mettupalayam
                  </p>
                  <div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Kumaran+Kundra+Temple+Mettupalayam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gold-link-dark"
                    >
                      TEMPLE ON MAPS ↗
                    </a>
                  </div>
                </div>

                {/* Hairline Divider with Small Lotus / Kolam Ornament */}
                <div className="flex items-center gap-4 py-2" aria-hidden="true">
                  <div className="flex-1 h-px bg-[#C5A059]/30" />
                  {/* Lotus Ornament */}
                  <svg
                    className="w-5 h-5 text-[#C2671A]/70 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3c-.5 2-2 4.5-4 6 1.5 0 3.5.5 4 2 .5-1.5 2.5-2 4-2-2-1.5-3.5-4-4-6zm0 10c-2.5 0-4.5 1-6 2.5 1.5 1 3.5 1.5 6 1.5s4.5-.5 6-1.5c-1.5-1.5-3.5-2.5-6-2.5zm-8 4c2 1 4.5 1.5 8 1.5s6-.5 8-1.5c-1 2-4 3.5-8 3.5s-7-1.5-8-3.5z" />
                  </svg>
                  <div className="flex-1 h-px bg-[#C5A059]/30" />
                </div>

                {/* Row 2: RECEPTION */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-sm sm:text-base tracking-[0.2em] uppercase text-[#3D0B1B] font-semibold">
                      RECEPTION
                    </span>
                    <span className="font-tamil text-sm sm:text-base text-[#C2671A] font-medium">
                      வரவேற்பு · மதிய விருந்து
                    </span>
                  </div>
                  <p className="font-functional text-xs tracking-[0.2em] text-[#C2671A]">
                    11:00 AM TO 2:00 PM · FOLLOWED BY LUNCH
                  </p>
                  <p className="font-serif-title text-base sm:text-lg text-[#1A0A0F]/90 font-light">
                    Shri Lakshmi Hall, Mettupalayam – Annur Road
                  </p>
                  <div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Shri+Lakshmi+Hall+Annur+Road+Mettupalayam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gold-link-dark"
                    >
                      HALL ON MAPS ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Add to Calendar Action */}
              <div className="pt-4 border-t border-[#C5A059]/30">
                <button
                  type="button"
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
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
