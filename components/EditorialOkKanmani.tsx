'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ActiveSide = 'him' | 'her'

const TRACKS = {
  him: {
    side: 'SIDE A',
    person: 'MALLI',
    vibe: 'HIS VIBE',
    title: 'The song on loop in his head on his wedding day',
    src: '/audio/him.mp3',
    fallbackDuration: '0:35',
  },
  her: {
    side: 'SIDE B',
    person: 'RISHMA',
    vibe: 'HER VIBE',
    title: 'The song that will loop in her head on her big day',
    src: '/audio/her.mp3',
    fallbackDuration: '0:35',
  },
}

export default function EditorialOkKanmani() {
  const [activeSide, setActiveSide] = useState<ActiveSide>('him')
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:35')
  const [audioError, setAudioError] = useState(false)

  const audioHimRef = useRef<HTMLAudioElement | null>(null)
  const audioHerRef = useRef<HTMLAudioElement | null>(null)

  const activeTrack = TRACKS[activeSide]
  const currentAudioRef = activeSide === 'him' ? audioHimRef : audioHerRef

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
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime('0:00')
  }

  const pauseAllOtherAudio = () => {
    document.querySelectorAll('audio').forEach((el) => {
      if (el !== currentAudioRef.current) {
        el.pause()
      }
    })
  }

  const togglePlay = () => {
    const audio = currentAudioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      pauseAllOtherAudio()
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setAudioError(true))
    }
  }

  // Switch between Side A and Side B
  const switchSide = (side: ActiveSide) => {
    if (side === activeSide) return

    const prevAudio = currentAudioRef.current
    const wasPlaying = isPlaying

    if (prevAudio) {
      prevAudio.pause()
    }

    setActiveSide(side)
    setProgress(0)
    setCurrentTime('0:00')

    // Prepare next audio
    setTimeout(() => {
      const nextAudio = side === 'him' ? audioHimRef.current : audioHerRef.current
      if (nextAudio && !isNaN(nextAudio.duration)) {
        setDuration(formatTime(nextAudio.duration))
      }

      if (wasPlaying && nextAudio) {
        pauseAllOtherAudio()
        nextAudio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      } else {
        setIsPlaying(false)
      }
    }, 50)
  }

  // Circumference for r = 48.5
  const circumference = 2 * Math.PI * 48.5
  const strokeOffset = circumference - (progress / 100) * circumference

  return (
    <section
      id="songs"
      className="relative w-full bg-[#1A050D] text-[#FAF6EE] py-20 sm:py-28 px-5 sm:px-10 border-b border-[#C5A059]/25 overflow-hidden"
      aria-label="Songs on Loop"
    >
      {/* Hidden Audio Elements */}
      <audio
        ref={audioHimRef}
        src={TRACKS.him.src}
        preload="metadata"
        onTimeUpdate={(e) => activeSide === 'him' && handleTimeUpdate(e.currentTarget)}
        onLoadedMetadata={(e) => activeSide === 'him' && handleLoadedMetadata(e.currentTarget)}
        onEnded={handleEnded}
        onError={() => setAudioError(true)}
      />
      <audio
        ref={audioHerRef}
        src={TRACKS.her.src}
        preload="metadata"
        onTimeUpdate={(e) => activeSide === 'her' && handleTimeUpdate(e.currentTarget)}
        onLoadedMetadata={(e) => activeSide === 'her' && handleLoadedMetadata(e.currentTarget)}
        onEnded={handleEnded}
        onError={() => setAudioError(true)}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-functional text-[10px] sm:text-xs text-[#C5A059] font-medium mb-2">
            THE WEDDING PLAYLIST
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#FAF6EE] font-light tracking-tight">
            Songs on Loop
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent mx-auto mt-4"
          />
        </motion.div>

        {/* Text-Only Toggle: SIDE A · MALLI / SIDE B · RISHMA */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-12 select-none">
          <button
            type="button"
            onClick={() => switchSide('him')}
            className={`font-functional text-xs sm:text-sm tracking-[0.25em] transition-all duration-300 pb-1 relative cursor-pointer ${
              activeSide === 'him'
                ? 'text-[#E6CA85] font-semibold'
                : 'text-[#FAF6EE]/45 hover:text-[#FAF6EE]/80'
            }`}
          >
            SIDE A · MALLI
            {activeSide === 'him' && (
              <motion.span
                layoutId="vinylToggleActive"
                className="absolute bottom-0 left-0 right-0 h-px bg-[#E6CA85]"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>

          <span className="text-[#C5A059]/40 text-xs">/</span>

          <button
            type="button"
            onClick={() => switchSide('her')}
            className={`font-functional text-xs sm:text-sm tracking-[0.25em] transition-all duration-300 pb-1 relative cursor-pointer ${
              activeSide === 'her'
                ? 'text-[#E6CA85] font-semibold'
                : 'text-[#FAF6EE]/45 hover:text-[#FAF6EE]/80'
            }`}
          >
            SIDE B · RISHMA
            {activeSide === 'her' && (
              <motion.span
                layoutId="vinylToggleActive"
                className="absolute bottom-0 left-0 right-0 h-px bg-[#E6CA85]"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        </div>

        {/* Vinyl Player Stage: Disc partly cropped off right edge */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col md:flex-row items-center justify-between min-h-[340px] sm:min-h-[420px] gap-8"
        >
          {/* Left: Track Information & Play Controls with AnimatePresence */}
          <div className="w-full md:w-1/2 z-10 flex flex-col justify-center text-left space-y-4 pr-0 md:pr-8 min-h-[170px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSide}
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-functional text-[10px] text-[#C5A059] tracking-[0.3em]">
                    {activeTrack.side} · {activeTrack.vibe}
                  </span>
                  <div className="w-8 h-px bg-[#C5A059]/30" />
                </div>

                <h3 className="font-serif-title italic text-2xl sm:text-3xl md:text-4xl text-[#FAF6EE] font-light leading-snug">
                  &ldquo;{activeTrack.title}&rdquo;
                </h3>

                {/* Time display in tiny Montserrat functional type */}
                <div className="flex items-center gap-4 font-functional text-[11px] text-[#FAF6EE]/60 pt-2">
                  <span className="text-[#E6CA85] font-medium">{currentTime}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/40" />
                  <span>{duration}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Play/Pause Text Link */}
            <div className="pt-3">
              <button
                type="button"
                onClick={togglePlay}
                className="gold-link text-xs tracking-[0.3em]"
              >
                {isPlaying ? 'PAUSE TRACK ■' : 'PLAY TRACK ▶'}
              </button>
            </div>
          </div>

          {/* Right: Large Vinyl Record, partly cropped off right edge */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end overflow-visible relative py-4">
            <div
              onClick={togglePlay}
              className="relative w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] md:-mr-24 cursor-pointer select-none group"
              title={isPlaying ? 'Click to Pause' : 'Click to Play'}
            >
              {/* Spinning Disc Body */}
              <div
                className={`w-full h-full rounded-full transition-transform duration-700 ease-out shadow-[0_20px_60px_rgba(0,0,0,0.85)] ${
                  isPlaying ? 'animate-vinyl-spin' : ''
                }`}
                style={{
                  background: `
                    radial-gradient(circle at center, #2A0510 0%, #2A0510 26%, #121216 27%, #09090c 35%, #18181f 40%, #0a0a0d 48%, #16161c 55%, #08080b 65%, #141419 75%, #050508 88%, #020204 100%)
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

                {/* Center Record Label: Deep Wine with Antique Gold Ornament */}
                <div className="absolute inset-0 m-auto w-[110px] h-[110px] xs:w-[130px] xs:h-[130px] sm:w-[150px] sm:h-[150px] rounded-full bg-[#3A0817] border border-[#C5A059]/60 flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="font-functional text-[8px] sm:text-[9px] tracking-[0.25em] text-[#C5A059] opacity-90">
                    {activeTrack.side}
                  </span>
                  <div className="my-1 text-[#E6CA85]">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current mx-auto" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                  <span className="font-functional text-[7px] sm:text-[8px] tracking-[0.2em] text-[#FAF6EE]/75">
                    {activeTrack.person}
                  </span>

                  {/* Tiny Spindle Hole */}
                  <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-[#120207] border border-[#C5A059]/80 shadow-md" />
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
                  stroke="rgba(197, 160, 89, 0.2)"
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
              <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#1A050D]/80 backdrop-blur-sm border border-[#C5A059] flex items-center justify-center text-[#E6CA85] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {isPlaying ? (
                  <span className="text-xs">❚❚</span>
                ) : (
                  <span className="text-xs ml-0.5">▶</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* OK Kanmani Editorial Pull-Quote: NO BOXED PANEL, Pure Typography & Gold Hairlines */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 sm:mt-28 max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent mx-auto mb-8"
          />

          <blockquote className="font-serif-title italic text-2xl sm:text-3xl md:text-4xl text-[#FAF6EE] font-light leading-relaxed px-4">
            &ldquo;Rishma might be Malli&apos;s{' '}
            <span className="font-normal text-[#E6CA85] not-italic tracking-wide">
              TARA
            </span>
            , but Malli has always been Rishma&apos;s{' '}
            <span className="font-normal text-[#E6CA85] not-italic tracking-wide">
              GANAPATHY
            </span>
            .&rdquo;
          </blockquote>

          <p className="mt-5 font-functional text-[10px] sm:text-xs text-[#C5A059] tracking-[0.3em]">
            AN OK KANMANI REFERENCE
          </p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent mx-auto mt-8"
          />
        </motion.div>
      </div>
    </section>
  )
}
