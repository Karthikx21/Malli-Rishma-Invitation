'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { POSTERS_CONFIG } from '@/lib/posters.config'
import EditorialCardReveal from './EditorialCardReveal'

export default function EditorialChapters() {
  const [chap1ImgErr, setChap1ImgErr] = useState(false)
  const [chap2ImgErr, setChap2ImgErr] = useState(false)

  // Christian Wedding BGM State
  const [isBgmPlaying, setIsBgmPlaying] = useState(false)
  const [bgmProgress, setBgmProgress] = useState(0)
  const [bgmTime, setBgmTime] = useState('0:00')
  const [bgmDuration, setBgmDuration] = useState('3:45')
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null)

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

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

  const handleBgmTimeUpdate = () => {
    if (!bgmAudioRef.current) return
    const cur = bgmAudioRef.current.currentTime
    const dur = bgmAudioRef.current.duration || 225
    setBgmProgress((cur / dur) * 100)
    setBgmTime(formatTime(cur))
  }

  const handleBgmLoaded = () => {
    if (bgmAudioRef.current && !isNaN(bgmAudioRef.current.duration)) {
      setBgmDuration(formatTime(bgmAudioRef.current.duration))
    }
  }

  const downloadIcs = (title: string, desc: string, location: string, start: string, end: string) => {
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
    <section
      id="celebration"
      className="relative w-full bg-[#1A0A0F] text-[#F4ECDD] py-20 px-4 sm:px-8 border-b border-[#B8893E]/40 overflow-hidden"
      aria-label="Two Days Celebration Chapters"
    >
      <div className="max-w-6xl mx-auto">
        {/* Banner Lockup */}
        <EditorialCardReveal direction="up" className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8893E] font-medium font-sans mb-3">
            The Two Chapters
          </p>
          <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl text-[#F2DFB5] tracking-tight uppercase leading-snug">
            Two Days · Two Cultures
          </h2>
          <p className="font-names text-4xl sm:text-5xl text-[#D4A359] mt-2">
            One Celebration of Love
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-20 h-px bg-[#B8893E]/50 mx-auto mt-6"
          />
        </EditorialCardReveal>

        {/* Chapters Grid - Card by Card Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Chapter 01: Christian Ring Exchange */}
          <EditorialCardReveal direction="up" delay={0.1} scale className="h-full">
            <motion.article
              whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="editorial-burgundy-panel rounded-sm overflow-hidden flex flex-col justify-between shadow-2xl h-full transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-[#B8893E]"
            >
              {/* Visual Poster Frame */}
              <div
                className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#B8893E]/40"
                style={{ backgroundColor: POSTERS_CONFIG.christianChapel.fallbackColor }}
              >
                {!chap1ImgErr && (
                  <picture>
                    <source
                      media="(min-width: 640px)"
                      srcSet={POSTERS_CONFIG.christianChapel.desktop}
                    />
                    <img
                      src={POSTERS_CONFIG.christianChapel.mobile}
                      alt={POSTERS_CONFIG.christianChapel.alt}
                      onError={() => setChap1ImgErr(true)}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </picture>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0F]/90 via-[#1A0A0F]/30 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-[#1A0A0F]/80 border border-[#B8893E]/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#B8893E] font-sans">
                  CHAPTER 01
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-[#F4ECDD]">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#B8893E]">
                    18 NOVEMBER 2026
                  </span>
                  <h3 className="font-headline text-2xl sm:text-3xl font-light mt-1">
                    Christian Ring Exchange Ceremony
                  </h3>
                </div>
              </div>

              {/* Chapter 1 Details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                <p className="font-names text-3xl text-[#F2DFB5] italic">
                  &ldquo;Two hearts. One promise.&rdquo;
                </p>

                {/* Christian Wedding Dedicated BGM Audio Player */}
                <div className="bg-[#1A0A0F]/80 border border-[#B8893E]/40 rounded-sm p-4 space-y-3 shadow-inner">
                  <audio
                    ref={bgmAudioRef}
                    src="/audio/christian-wedding-bgm.mp3"
                    preload="metadata"
                    onTimeUpdate={handleBgmTimeUpdate}
                    onLoadedMetadata={handleBgmLoaded}
                    onEnded={() => setIsBgmPlaying(false)}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={toggleChristianBgm}
                        className="w-11 h-11 rounded-full border border-[#B8893E] bg-[#4A0F20] hover:bg-[#B8893E] text-[#F4ECDD] hover:text-[#1A0A0F] flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer flex-shrink-0"
                        aria-label={isBgmPlaying ? 'Pause Christian Wedding BGM' : 'Play Christian Wedding BGM'}
                      >
                        {isBgmPlaying ? (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8893E] font-medium font-sans block">
                          Ceremony Soundtrack
                        </span>
                        <h4 className="font-headline text-sm sm:text-base text-[#F4ECDD] font-normal">
                          Christian Wedding BGM
                        </h4>
                      </div>
                    </div>

                    {/* Visual Equalizer */}
                    {isBgmPlaying ? (
                      <div className="flex items-end gap-1 h-4" aria-hidden="true">
                        <span className="w-1 bg-[#D4A359] animate-pulse h-4" />
                        <span className="w-1 bg-[#F2DFB5] animate-pulse h-2.5" />
                        <span className="w-1 bg-[#B8893E] animate-pulse h-3.5" />
                      </div>
                    ) : (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#F4ECDD]/50 font-sans">
                        Tap to Play
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#1A0A0F] h-1.5 rounded-full overflow-hidden border border-[#B8893E]/20">
                    <div
                      className="bg-[#B8893E] h-full transition-all duration-200"
                      style={{ width: `${bgmProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#F4ECDD]/60 font-sans">
                    <span>{bgmTime}</span>
                    <span>{bgmDuration}</span>
                  </div>
                </div>

                <div className="space-y-3 font-sans text-sm sm:text-base text-[#F4ECDD]/90">
                  <div className="flex items-start gap-2">
                    <span className="text-[#B8893E] font-medium w-16 flex-shrink-0">Date :</span>
                    <span>18 November 2026</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#B8893E] font-medium w-16 flex-shrink-0">Time :</span>
                    <span>6 PM to 10 PM</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#B8893E] font-medium w-16 flex-shrink-0">Venue :</span>
                    <span>Jenneys Residency, Avinashi Road, Coimbatore</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#B8893E]/30 flex flex-wrap gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Jenneys+Residency+Avinashi+Road+Coimbatore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-[#B8893E] bg-[#1A0A0F]/70 hover:bg-[#B8893E] hover:text-[#1A0A0F] text-[#F4ECDD] text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    View on Google Maps
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
                    className="px-4 py-2.5 border border-[#B8893E]/40 hover:border-[#B8893E] text-[#F4ECDD] text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300"
                  >
                    + Add to Calendar
                  </button>
                </div>
              </div>
            </motion.article>
          </EditorialCardReveal>

          {/* Chapter 02: Hindu Wedding & Reception */}
          <EditorialCardReveal direction="up" delay={0.25} scale className="h-full">
            <motion.article
              whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="editorial-burgundy-panel rounded-sm overflow-hidden flex flex-col justify-between shadow-2xl h-full transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-[#B8893E]"
            >
              {/* Visual Poster Frame */}
              <div
                className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#B8893E]/40"
                style={{ backgroundColor: POSTERS_CONFIG.hinduTemple.fallbackColor }}
              >
                {!chap2ImgErr && (
                  <picture>
                    <source
                      media="(min-width: 640px)"
                      srcSet={POSTERS_CONFIG.hinduTemple.desktop}
                    />
                    <img
                      src={POSTERS_CONFIG.hinduTemple.mobile}
                      alt={POSTERS_CONFIG.hinduTemple.alt}
                      onError={() => setChap2ImgErr(true)}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </picture>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0F]/90 via-[#1A0A0F]/30 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-[#1A0A0F]/80 border border-[#B8893E]/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#B8893E] font-sans">
                  CHAPTER 02
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-[#F4ECDD]">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#B8893E]">
                    20 NOVEMBER 2026
                  </span>
                  <h3 className="font-headline text-2xl sm:text-3xl font-light mt-1">
                    Hindu Wedding &amp; Reception
                  </h3>
                </div>
              </div>

              {/* Chapter 2 Details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                <p className="font-names text-3xl text-[#F2DFB5] italic">
                  &ldquo;Two souls. One sacred journey.&rdquo;
                </p>

                <div className="space-y-4 font-sans text-sm sm:text-base text-[#F4ECDD]/90">
                  <div className="flex items-start gap-2">
                    <span className="text-[#B8893E] font-medium w-16 flex-shrink-0">Date :</span>
                    <span>20 November 2026</span>
                  </div>

                  {/* Event 1: Muhurtham */}
                  <div className="p-3.5 bg-[#1A0A0F]/60 border border-[#B8893E]/30 rounded-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-headline text-base text-[#F2DFB5]">
                        Muhurtham
                      </span>
                      <span className="font-tamil text-xs text-[#D4A359]">
                        முகூர்த்தம்
                      </span>
                    </div>
                    <p className="text-xs text-[#B8893E] mt-0.5">6 AM to 7 AM</p>
                    <p className="text-sm text-[#F4ECDD] mt-1">
                      Kumaran Kundra Temple
                    </p>
                  </div>

                  {/* Event 2: Reception */}
                  <div className="p-3.5 bg-[#1A0A0F]/60 border border-[#B8893E]/30 rounded-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-headline text-base text-[#F2DFB5]">
                        Reception
                      </span>
                      <span className="font-tamil text-xs text-[#D4A359]">
                        வரவேற்பு · மதிய விருந்து
                      </span>
                    </div>
                    <p className="text-xs text-[#B8893E] mt-0.5">
                      11 AM to 2 PM, followed by lunch
                    </p>
                    <p className="text-sm text-[#F4ECDD] mt-1">
                      Shri Lakshmi Hall, Mettupalayam – Annur Road
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#B8893E]/30 flex flex-wrap gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Kumaran+Kundra+Temple+Mettupalayam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#B8893E] bg-[#1A0A0F]/70 hover:bg-[#B8893E] hover:text-[#1A0A0F] text-[#F4ECDD] text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    Temple on Maps
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Shri+Lakshmi+Hall+Annur+Road+Mettupalayam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#B8893E] bg-[#1A0A0F]/70 hover:bg-[#B8893E] hover:text-[#1A0A0F] text-[#F4ECDD] text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    Hall on Maps
                  </a>
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
                    className="px-4 py-2 border border-[#B8893E]/40 hover:border-[#B8893E] text-[#F4ECDD] text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300"
                  >
                    + Add to Calendar
                  </button>
                </div>
              </div>
            </motion.article>
          </EditorialCardReveal>
        </div>
      </div>
    </section>
  )
}
