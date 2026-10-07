'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    src: '/audio/him.mp3',
    fallbackDuration: '0:27',
  },
}

export default function EditorialOkKanmani() {
  const [activeSide, setActiveSide] = useState<ActiveSide>('rishma')
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:35')
  const [audioError, setAudioError] = useState(false)

  const audioRishmaRef = useRef<HTMLAudioElement | null>(null)
  const audioMalliRef = useRef<HTMLAudioElement | null>(null)

  const activeTrack = TRACKS[activeSide]
  const currentAudioRef = activeSide === 'rishma' ? audioRishmaRef : audioMalliRef

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
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('wedding-secondary-audio-stop', {
          detail: { id: `ok-kanmani-${activeSide}` },
        })
      )
    }
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
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('wedding-secondary-audio-stop', {
            detail: { id: `ok-kanmani-${activeSide}` },
          })
        )
      }
    } else {
      pauseAllOtherAudio()
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('wedding-secondary-audio-start', {
            detail: { id: `ok-kanmani-${activeSide}` },
          })
        )
      }
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
      const nextAudio = side === 'rishma' ? audioRishmaRef.current : audioMalliRef.current
      if (nextAudio && !isNaN(nextAudio.duration)) {
        setDuration(formatTime(nextAudio.duration))
      }

      if (wasPlaying && nextAudio) {
        pauseAllOtherAudio()
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('wedding-secondary-audio-start', {
              detail: { id: `ok-kanmani-${side}` },
            })
          )
        }
        nextAudio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      } else {
        setIsPlaying(false)
        if (wasPlaying && typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('wedding-secondary-audio-stop', {
              detail: { id: `ok-kanmani-${side}` },
            })
          )
        }
      }
    }, 50)
  }

  // Circumference for r = 48.5
  const circumference = 2 * Math.PI * 48.5
  const strokeOffset = circumference - (progress / 100) * circumference

  return (
    <section
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
        preload="metadata"
        onTimeUpdate={(e) => activeSide === 'rishma' && handleTimeUpdate(e.currentTarget)}
        onLoadedMetadata={(e) => activeSide === 'rishma' && handleLoadedMetadata(e.currentTarget)}
        onEnded={handleEnded}
        onError={() => setAudioError(true)}
      />
      <audio
        ref={audioMalliRef}
        src={TRACKS.malli.src}
        preload="metadata"
        onTimeUpdate={(e) => activeSide === 'malli' && handleTimeUpdate(e.currentTarget)}
        onLoadedMetadata={(e) => activeSide === 'malli' && handleLoadedMetadata(e.currentTarget)}
        onEnded={handleEnded}
        onError={() => setAudioError(true)}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/60 to-transparent mx-auto mt-4"
          />
        </motion.div>

        {/* Text-Only Toggle: SIDE A · RISHMA / SIDE B · MALLI */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-12 select-none">
          <motion.button
            type="button"
            onClick={() => switchSide('rishma')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`font-functional text-xs sm:text-sm tracking-[0.25em] transition-all duration-300 pb-1 relative cursor-pointer ${
              activeSide === 'rishma'
                ? 'text-[#E6CA85] font-semibold'
                : 'text-[#FAF6EE]/45 hover:text-[#FAF6EE]/80'
            }`}
          >
            SIDE A · RISHMA
            {activeSide === 'rishma' && (
              <motion.span
                layoutId="vinylToggleActive"
                className="absolute bottom-0 left-0 right-0 h-px bg-[#E6CA85] shadow-[0_0_8px_rgba(230,202,133,0.5)]"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </motion.button>

          <span className="text-[#E6CA85]/40 text-xs">/</span>

          <motion.button
            type="button"
            onClick={() => switchSide('malli')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`font-functional text-xs sm:text-sm tracking-[0.25em] transition-all duration-300 pb-1 relative cursor-pointer ${
              activeSide === 'malli'
                ? 'text-[#E6CA85] font-semibold'
                : 'text-[#FAF6EE]/45 hover:text-[#FAF6EE]/80'
            }`}
          >
            SIDE B · MALLI
            {activeSide === 'malli' && (
              <motion.span
                layoutId="vinylToggleActive"
                className="absolute bottom-0 left-0 right-0 h-px bg-[#E6CA85] shadow-[0_0_8px_rgba(230,202,133,0.5)]"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </motion.button>
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
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
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
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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

        {/* OK Kanmani Editorial Pull-Quote: Pure Typography & Lavender Hairlines */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 sm:mt-28 max-w-3xl mx-auto text-center relative"
        >
          {/* Subtle warm glow behind quote */}
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-32 bg-[#8D76A8]/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/50 to-transparent mx-auto mb-8"
          />

          <blockquote className="font-serif-title italic text-2xl sm:text-3xl md:text-4xl text-[#FAF6EE] font-light leading-relaxed px-4">
            &ldquo;Rishma might be Malli&apos;s{' '}
            <span className="font-semibold text-[#E6CA85] not-italic tracking-wide">
              TARA
            </span>
            , but Malli has always been Rishma&apos;s{' '}
            <span className="font-semibold text-[#E6CA85] not-italic tracking-wide">
              GANAPATHY
            </span>
            .&rdquo;
          </blockquote>

          <p className="mt-5 font-functional text-[10px] sm:text-xs text-[#D8CEE5] tracking-[0.3em] font-medium opacity-85">
            AN OK KANMANI REFERENCE
          </p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/50 to-transparent mx-auto mt-8"
          />
        </motion.div>
      </div>
    </section>
  )
}
