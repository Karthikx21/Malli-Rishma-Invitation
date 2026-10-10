'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  playExclusive,
  enterAudioSection,
  leaveAudioSection,
} from '@/lib/audioCoordinator'

type ActiveSide = 'rishma' | 'malli'

const TRACKS = {
  rishma: {
    side: 'SIDE A',
    person: 'RISHMA',
    vibe: 'HER VIBE',
    title: 'The song that will loop in her head on her big day',
    src: '/audio/her.mp3',
    fallbackDuration: '0:35',
  },
  malli: {
    side: 'SIDE B',
    person: 'MALLI',
    vibe: 'HIS VIBE',
    title: 'The song on loop in his head on his wedding day',
    src: '/side%20b%202.mp3',
    fallbackDuration: '0:22',
  },
}

export default function EditorialOkKanmani() {
  const [activeSide, setActiveSide] = useState<ActiveSide>('rishma')
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:35')
  const [audioError, setAudioError] = useState(false)

  const sectionRef = useRef<HTMLElement | null>(null)
  const audioRishmaRef = useRef<HTMLAudioElement | null>(null)
  const audioMalliRef = useRef<HTMLAudioElement | null>(null)

  const activeSideRef = useRef<ActiveSide>(activeSide)
  useEffect(() => {
    activeSideRef.current = activeSide
  }, [activeSide])

  // Initialize both audio elements to balanced 65% volume (60-70% range)
  useEffect(() => {
    if (audioRishmaRef.current) audioRishmaRef.current.volume = 0.65
    if (audioMalliRef.current) audioMalliRef.current.volume = 0.65
  }, [])

  const isInViewRef = useRef(false)
  const userPausedRef = useRef(false)

  const activeTrack = TRACKS[activeSide]

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  // Sync state when active audio updates
  const handleTimeUpdate = (el: HTMLAudioElement) => {
    const cur = el.currentTime
    const dur = el.duration || 35
    setProgress((cur / dur) * 100)
    setCurrentTime(formatTime(cur))
  }

  const handleLoadedMetadata = (el: HTMLAudioElement) => {
    if (!isNaN(el.duration)) {
      setDuration(formatTime(el.duration))
    }
  }

  const handleEnded = () => {
    setProgress(0)
    setCurrentTime('0:00')
  }

  // Play active track helper
  const playActiveTrack = useCallback(() => {
    const audio = activeSideRef.current === 'rishma' ? audioRishmaRef.current : audioMalliRef.current
    if (!audio) return

    audio.muted = false
    audio.volume = 0.65
    playExclusive(audio)
      .then(() => {
        setIsPlaying(true)
        setAudioError(false)
      })
      .catch(() => {
        // Autoplay policy fallback: attach one-shot listener
        const gestureUnlock = () => {
          if (isInViewRef.current && !userPausedRef.current) {
            const target =
              activeSideRef.current === 'rishma' ? audioRishmaRef.current : audioMalliRef.current
            if (target) {
              playExclusive(target)
                .then(() => {
                  setIsPlaying(true)
                  setAudioError(false)
                })
                .catch(() => {})
            }
          }
          window.removeEventListener('scroll', gestureUnlock)
          window.removeEventListener('touchstart', gestureUnlock)
          window.removeEventListener('click', gestureUnlock)
        }
        window.addEventListener('scroll', gestureUnlock, { once: true, passive: true })
        window.addEventListener('touchstart', gestureUnlock, { once: true, passive: true })
        window.addEventListener('click', gestureUnlock, { once: true, passive: true })
      })
  }, [])

  // Manual Toggle Play / Pause button
  const togglePlay = () => {
    const audio = activeSideRef.current === 'rishma' ? audioRishmaRef.current : audioMalliRef.current
    if (!audio) return

    if (isPlaying) {
      userPausedRef.current = true
      audio.pause()
      setIsPlaying(false)
    } else {
      userPausedRef.current = false
      playActiveTrack()
    }
  }

  // Switch between Side A and Side B
  const switchSide = (side: ActiveSide) => {
    if (side === activeSide) return

    // Pause previous audio
    const prevAudio = activeSide === 'rishma' ? audioRishmaRef.current : audioMalliRef.current
    if (prevAudio) {
      prevAudio.pause()
    }

    setActiveSide(side)
    activeSideRef.current = side
    setProgress(0)
    setCurrentTime('0:00')
    userPausedRef.current = false // User explicitly selected this side to listen to it

    const nextAudio = side === 'rishma' ? audioRishmaRef.current : audioMalliRef.current
    if (nextAudio && !isNaN(nextAudio.duration) && nextAudio.duration > 0) {
      setDuration(formatTime(nextAudio.duration))
    } else {
      setDuration(TRACKS[side].fallbackDuration)
    }

    // Play next side immediately if section is currently in view
    if (isInViewRef.current && nextAudio) {
      nextAudio.muted = false
      nextAudio.volume = 0.65
      playExclusive(nextAudio)
        .then(() => {
          setIsPlaying(true)
          setAudioError(false)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    } else {
      setIsPlaying(false)
    }
  }

  // Section Scroll Coordination (IntersectionObserver)
  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User scrolled INTO OK Kanmani section
            isInViewRef.current = true
            enterAudioSection('songs')

            // If user did not manually pause during this viewing, auto-start Side A (or active track)
            if (!userPausedRef.current) {
              playActiveTrack()
            }
          } else {
            // User scrolled OUT OF OK Kanmani section (down to Countdown/Chapters or up to Couple/Hero)
            if (isInViewRef.current) {
              isInViewRef.current = false
              userPausedRef.current = false // Reset manual pause for subsequent visits

              // Stop both Side A and Side B immediately
              if (audioMalliRef.current && !audioMalliRef.current.paused) {
                audioMalliRef.current.pause()
              }
              if (audioRishmaRef.current && !audioRishmaRef.current.paused) {
                audioRishmaRef.current.pause()
              }
              setIsPlaying(false)

              // Notify coordinator that user left this section -> floating background music resumes!
              leaveAudioSection('songs')
            }
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '-15% 0px -15% 0px',
      }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      leaveAudioSection('songs')
    }
  }, [playActiveTrack])

  // Circumference for r = 48.5
  const circumference = 2 * Math.PI * 48.5
  const strokeOffset = circumference - (progress / 100) * circumference

  return (
    <section
      ref={sectionRef}
      id="songs"
      className="relative w-full bg-[#140F1D] text-[#FAF6EE] py-24 sm:py-32 px-5 sm:px-10 border-y border-[#3D2C52]/50 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 90% 80% at 75% 45%, #251838 0%, #171122 50%, #110C18 100%)',
      }}
      aria-label="Songs on Loop"
    >
      {/* Ambient Turntable Glow behind Vinyl */}
      <div
        className="absolute top-1/2 right-0 md:right-16 -translate-y-1/2 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full pointer-events-none blur-[100px] sm:blur-[140px] opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(230,202,133,0.3) 0%, rgba(141,118,168,0.45) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Atmospheric Mist */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(141,118,168,0.12)_0%,transparent_50%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Hidden Audio Elements */}
      <audio
        ref={audioRishmaRef}
        src={TRACKS.rishma.src}
        preload="auto"
        loop
        onPlay={(e) => {
          e.currentTarget.volume = 0.65
          if (activeSideRef.current === 'rishma') setIsPlaying(true)
        }}
        onPause={() => {
          if (activeSideRef.current === 'rishma' && !isInViewRef.current) setIsPlaying(false)
        }}
        onTimeUpdate={(e) => activeSideRef.current === 'rishma' && handleTimeUpdate(e.currentTarget)}
        onLoadedMetadata={(e) => activeSideRef.current === 'rishma' && handleLoadedMetadata(e.currentTarget)}
        onEnded={handleEnded}
        onError={() => setAudioError(true)}
      >
        <source src="/audio/her.mp3" type="audio/mpeg" />
        <source src="/audio/side-b.mp3" type="audio/mpeg" />
        <source src="/side%20b.mpeg" type="audio/mpeg" />
      </audio>
      <audio
        ref={audioMalliRef}
        src={TRACKS.malli.src}
        preload="auto"
        loop
        onPlay={(e) => {
          e.currentTarget.volume = 0.65
          if (activeSideRef.current === 'malli') setIsPlaying(true)
        }}
        onPause={() => {
          if (activeSideRef.current === 'malli' && !isInViewRef.current) setIsPlaying(false)
        }}
        onTimeUpdate={(e) => activeSideRef.current === 'malli' && handleTimeUpdate(e.currentTarget)}
        onLoadedMetadata={(e) => activeSideRef.current === 'malli' && handleLoadedMetadata(e.currentTarget)}
        onEnded={handleEnded}
        onError={() => setAudioError(true)}
      >
        <source src="/side%20b%202.mp3" type="audio/mpeg" />
        <source src="/audio/side-b-2.mp3" type="audio/mpeg" />
        <source src="/audio/him.mp3" type="audio/mpeg" />
      </audio>


      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-functional text-[10px] sm:text-xs text-[#E6CA85] font-semibold mb-2 tracking-[0.25em]">
            THE WEDDING PLAYLIST
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#FAF6EE] font-light tracking-tight">
            Songs on Loop
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/60 to-transparent mx-auto mt-4"
          />
        </motion.div>

        {/* Text-Only Toggle: SIDE A · RISHMA / SIDE B · MALLI */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-12 select-none">
          <motion.button
            type="button"
            onClick={() => switchSide('rishma')}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`font-functional text-xs sm:text-sm tracking-[0.25em] transition-colors duration-300 pb-1 relative cursor-pointer ${
              activeSide === 'rishma'
                ? 'text-[#E6CA85] font-semibold'
                : 'text-[#FAF6EE]/45 hover:text-[#FAF6EE]/80'
            }`}
          >
            SIDE A · RISHMA
            {activeSide === 'rishma' && (
              <motion.span
                layoutId="vinylToggleActive"
                className="absolute bottom-0 left-0 right-0 h-px bg-[#E6CA85] shadow-[0_0_10px_rgba(230,202,133,0.6)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>

          <span className="text-[#E6CA85]/40 text-xs select-none">/</span>

          <motion.button
            type="button"
            onClick={() => switchSide('malli')}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`font-functional text-xs sm:text-sm tracking-[0.25em] transition-colors duration-300 pb-1 relative cursor-pointer ${
              activeSide === 'malli'
                ? 'text-[#E6CA85] font-semibold'
                : 'text-[#FAF6EE]/45 hover:text-[#FAF6EE]/80'
            }`}
          >
            SIDE B · MALLI
            {activeSide === 'malli' && (
              <motion.span
                layoutId="vinylToggleActive"
                className="absolute bottom-0 left-0 right-0 h-px bg-[#E6CA85] shadow-[0_0_10px_rgba(230,202,133,0.6)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        </div>

        {/* Vinyl Player Stage: Disc partly cropped off right edge */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col md:flex-row items-center justify-between min-h-[340px] sm:min-h-[420px] gap-8"
        >
          {/* Left: Track Information & Play Controls with AnimatePresence */}
          <div className="w-full md:w-1/2 z-10 flex flex-col justify-center text-left space-y-4 pr-0 md:pr-8 min-h-[170px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSide}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-functional text-[10px] text-[#E6CA85] tracking-[0.3em] font-semibold">
                    {activeTrack.side} · {activeTrack.vibe}
                  </span>
                  <div className="w-8 h-px bg-[#E6CA85]/40" />
                </div>

                <h3 className="font-serif-title italic text-2xl sm:text-3xl md:text-4xl text-[#FAF6EE] font-light leading-snug drop-shadow-sm">
                  &ldquo;{activeTrack.title}&rdquo;
                </h3>

                {/* Time display in tiny Montserrat functional type */}
                <div className="flex items-center gap-4 font-functional text-[11px] text-[#FAF6EE]/60 pt-2">
                  <span className="text-[#E6CA85] font-semibold tracking-wider">{currentTime}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6CA85]/50" />
                  <span className="tracking-wider">{duration}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Play/Pause Text Link */}
            <motion.div
              whileHover={{ scale: 1.04, x: 2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pt-3 inline-block"
            >
              <button
                type="button"
                onClick={togglePlay}
                className="gold-link text-xs tracking-[0.3em] cursor-pointer"
              >
                {isPlaying ? 'PAUSE TRACK ■' : 'PLAY TRACK ▶'}
              </button>
            </motion.div>
          </div>

          {/* Right: Large Vinyl Record, partly cropped off right edge */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end overflow-visible relative py-4">
            <motion.div
              onClick={togglePlay}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] md:-mr-24 cursor-pointer select-none group"
              title={isPlaying ? 'Click to Pause' : 'Click to Play'}
            >
              {/* Spinning Disc Body with Deep Royal Lavender-Charcoal Grooves */}
              <div
                className={`w-full h-full rounded-full transition-transform duration-700 ease-out shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_50px_rgba(141,118,168,0.22)] ring-1 ring-white/10 ${
                  isPlaying ? 'animate-vinyl-spin' : ''
                }`}
                style={{
                  background: `
                    radial-gradient(circle at center, #2D2338 0%, #251D30 26%, #1F1728 27%, #171120 35%, #251C32 40%, #15101C 48%, #20182B 55%, #130E19 65%, #1C1526 75%, #0F0B14 88%, #0A070E 100%)
                  `,
                }}
              >
                {/* Vinyl Fine Grooves Texture Overlay */}
                <div
                  className="absolute inset-0 rounded-full opacity-65 pointer-events-none"
                  style={{
                    background:
                      'repeating-radial-gradient(circle, transparent 0, transparent 3px, rgba(255,255,255,0.035) 4px, transparent 5px)',
                  }}
                />

                {/* Vinyl Sheen / Light Reflection Lines */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none opacity-20"
                  style={{
                    background:
                      'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.3) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.3) 225deg, transparent 270deg)',
                  }}
                />

                {/* Center Record Label: Deep Royal Amethyst Lavender with Antique Gold Ornament */}
                <div className="absolute inset-0 m-auto w-[110px] h-[110px] xs:w-[130px] xs:h-[130px] sm:w-[150px] sm:h-[150px] rounded-full bg-[#2A1E38] border border-[#E6CA85]/80 flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="font-functional text-[8px] sm:text-[9px] tracking-[0.25em] text-[#E6CA85] opacity-95">
                    {activeTrack.side}
                  </span>
                  <div className="my-1 text-[#E6CA85]">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current mx-auto" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                  <span className="font-functional text-[7px] sm:text-[8px] tracking-[0.2em] text-[#FAF8FC]/90">
                    {activeTrack.person}
                  </span>

                  {/* Tiny Spindle Hole */}
                  <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-[#120D1A] border border-[#E6CA85] shadow-md" />
                </div>
              </div>

              {/* Progress Ring: Thin Gold Ring around the disc */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 100 100"
              >
                {/* Base Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="48.5"
                  fill="none"
                  stroke="rgba(230, 202, 133, 0.2)"
                  strokeWidth="0.8"
                />
                {/* Active Progress Stroke */}
                <circle
                  cx="50"
                  cy="50"
                  r="48.5"
                  fill="none"
                  stroke="#E6CA85"
                  strokeWidth="1.2"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-[stroke-dashoffset] duration-150"
                />
              </svg>

              {/* Center Play/Pause Indicator Icon on Hover or Active */}
              <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#140F1D]/90 backdrop-blur-sm border border-[#E6CA85] flex items-center justify-center text-[#E6CA85] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_15px_rgba(230,202,133,0.3)]">
                {isPlaying ? (
                  <span className="text-xs">❚❚</span>
                ) : (
                  <span className="text-xs ml-0.5">▶</span>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* OK Kanmani Editorial Pavilion: Diptych Gallery & Cinematic Quote */}
        <div className="mt-20 sm:mt-28 max-w-6xl mx-auto relative px-2 sm:px-4">
          {/* Subtle Ambient Glows framing the pavilion */}
          <div
            className="absolute top-1/2 left-4 -translate-y-1/2 w-72 h-72 rounded-full bg-[#8D76A8]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 right-4 -translate-y-1/2 w-72 h-72 rounded-full bg-[#E6CA85]/12 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* DESKTOP LAYOUT (md and up): 3-Column Triptych (Left Card | Center Quote | Right Card) */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-5 lg:gap-8 items-center">
            {/* Left Wing: Tara & Adi Photo Card */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -2, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, rotate: -1.5, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ rotate: 0, y: -8, scale: 1.025 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-3 relative p-2.5 lg:p-3 rounded-2xl bg-[#1A1326]/95 border border-[#E6CA85]/35 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(141,118,168,0.22)] backdrop-blur-md group select-none transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_45px_rgba(141,118,168,0.35)] cursor-pointer"
            >
              {/* Archival Brass Corner Brackets */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#E6CA85]/75 pointer-events-none rounded-tl-sm" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#E6CA85]/75 pointer-events-none rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#E6CA85]/75 pointer-events-none rounded-bl-sm" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E6CA85]/75 pointer-events-none rounded-br-sm" />

              {/* Photo Inset with Fine Gold Hairline */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden ring-1 ring-[#E6CA85]/30 bg-[#120D1C]">
                <img
                  src="https://res.cloudinary.com/drvvekzzm/image/upload/v1791454632/_okkkkkk_%EF%B8%8F___ccugxw.jpg"
                  alt="OK Kanmani - Tara and Adi"
                  className="w-full h-full object-cover object-[center_16%] scale-[1.01] group-hover:scale-106 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = '/images/ok-kanmani-tara-framed.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140F1D]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="pt-2.5 pb-0.5 text-center">
                <p className="font-functional text-[9px] tracking-[0.28em] text-[#E6CA85] font-semibold uppercase">
                  HIS TARA
                </p>
              </div>
            </motion.div>

            {/* Centerpiece: The Cinematic Pull-Quote */}
            <motion.div
              initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 text-center relative flex flex-col items-center justify-center px-4 lg:px-6"
            >
              <blockquote className="font-serif-title italic text-2xl lg:text-3xl xl:text-[34px] text-[#FAF6EE] font-light leading-relaxed drop-shadow-sm">
                &ldquo;Rishma might be Malli&apos;s{' '}
                <span className="font-semibold text-[#E6CA85] not-italic tracking-wide drop-shadow-[0_0_14px_rgba(230,202,133,0.45)]">
                  TARA
                </span>
                ,<br className="hidden lg:inline" /> but Malli has always been Rishma&apos;s{' '}
                <span className="font-semibold text-[#E6CA85] not-italic tracking-wide drop-shadow-[0_0_14px_rgba(230,202,133,0.45)]">
                  GANAPATHY
                </span>
                .&rdquo;
              </blockquote>

              <p className="mt-5 font-serif-title italic text-xs lg:text-sm text-[#D8CEE5]/75">
                Two souls holding both the free spirit and a lifetime of devotion.
              </p>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/60 to-transparent mx-auto mt-6"
              />
            </motion.div>

            {/* Right Wing: Ganapathy & Bhavani Photo Card */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 2, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, rotate: 1.5, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ rotate: 0, y: -8, scale: 1.025 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-3 relative p-2.5 lg:p-3 rounded-2xl bg-[#1A1326]/95 border border-[#E6CA85]/35 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(230,202,133,0.18)] backdrop-blur-md group select-none transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_45px_rgba(230,202,133,0.3)] cursor-pointer"
            >
              {/* Archival Brass Corner Brackets */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#E6CA85]/75 pointer-events-none rounded-tl-sm" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#E6CA85]/75 pointer-events-none rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#E6CA85]/75 pointer-events-none rounded-bl-sm" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E6CA85]/75 pointer-events-none rounded-br-sm" />

              {/* Photo Inset with Fine Gold Hairline */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden ring-1 ring-[#E6CA85]/30 bg-[#120D1C]">
                <img
                  src="https://res.cloudinary.com/drvvekzzm/image/upload/v1791454633/Nostalgic_Portraits_in_Sepia_Light_ky5glv.png"
                  alt="OK Kanmani - Ganapathy and Bhavani"
                  className="w-full h-full object-cover object-[48%_center] scale-[1.01] group-hover:scale-106 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = '/images/ok-kanmani-ganapathy-framed.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140F1D]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="pt-2.5 pb-0.5 text-center">
                <p className="font-functional text-[9px] tracking-[0.28em] text-[#E6CA85] font-semibold uppercase">
                  HER GANAPATHY
                </p>
              </div>
            </motion.div>
          </div>

          {/* MOBILE LAYOUT (< md): Quote on Top + Side-by-Side Photo Diptych */}
          <div className="md:hidden flex flex-col items-center space-y-7">
            {/* 1. Mobile Quote Block */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center relative px-2"
            >
              <blockquote className="font-serif-title italic text-xl xs:text-2xl text-[#FAF6EE] font-light leading-snug px-1">
                &ldquo;Rishma might be Malli&apos;s{' '}
                <span className="font-semibold text-[#E6CA85] not-italic tracking-wide drop-shadow-[0_0_10px_rgba(230,202,133,0.4)]">
                  TARA
                </span>
                , but Malli has always been Rishma&apos;s{' '}
                <span className="font-semibold text-[#E6CA85] not-italic tracking-wide drop-shadow-[0_0_10px_rgba(230,202,133,0.4)]">
                  GANAPATHY
                </span>
                .&rdquo;
              </blockquote>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/50 to-transparent mx-auto mt-4" />
            </motion.div>

            {/* 2. Mobile Side-by-Side Dual Photo Diptych */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm px-1">
              {/* Left Photo: Tara */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
                viewport={{ once: true }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-2 rounded-xl bg-[#1A1326]/95 border border-[#E6CA85]/35 shadow-lg group select-none"
              >
                <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden ring-1 ring-[#E6CA85]/30 bg-[#120D1C]">
                  <img
                    src="https://res.cloudinary.com/drvvekzzm/image/upload/v1791454632/_okkkkkk_%EF%B8%8F___ccugxw.jpg"
                    alt="OK Kanmani - Tara and Adi"
                    className="w-full h-full object-cover object-[center_16%]"
                    onError={(e) => {
                      e.currentTarget.src = '/images/ok-kanmani-tara-framed.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140F1D]/80 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="pt-2 text-center">
                  <p className="font-functional text-[8px] tracking-[0.22em] text-[#E6CA85] font-semibold uppercase">
                    HIS TARA
                  </p>
                </div>
              </motion.div>

              {/* Right Photo: Ganapathy */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
                viewport={{ once: true }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-2 rounded-xl bg-[#1A1326]/95 border border-[#E6CA85]/35 shadow-lg group select-none"
              >
                <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden ring-1 ring-[#E6CA85]/30 bg-[#120D1C]">
                  <img
                    src="https://res.cloudinary.com/drvvekzzm/image/upload/v1791454633/Nostalgic_Portraits_in_Sepia_Light_ky5glv.png"
                    alt="OK Kanmani - Ganapathy and Bhavani"
                    className="w-full h-full object-cover object-[48%_center]"
                    onError={(e) => {
                      e.currentTarget.src = '/images/ok-kanmani-ganapathy-framed.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140F1D]/80 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="pt-2 text-center">
                  <p className="font-functional text-[8px] tracking-[0.22em] text-[#E6CA85] font-semibold uppercase">
                    HER GANAPATHY
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
