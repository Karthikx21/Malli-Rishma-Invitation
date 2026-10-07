'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import EditorialCardReveal from './EditorialCardReveal'

interface AudioCardProps {
  title: string
  subtitle: string
  src: string
  person: 'him' | 'her'
}

function EditorialAudioCard({ title, subtitle, src, person }: AudioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:35')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const togglePlay = () => {
    if (hasError || !audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      document.querySelectorAll('audio').forEach((el) => {
        if (el !== audioRef.current) el.pause()
      })
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true))
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const cur = audioRef.current.currentTime
    const dur = audioRef.current.duration || 35
    setProgress((cur / dur) * 100)
    setCurrentTime(formatTime(cur))
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(formatTime(audioRef.current.duration))
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime('0:00')
  }

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="editorial-dark-panel rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xl h-full transition-shadow duration-300 hover:shadow-2xl hover:border-[#B8893E]"
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => setHasError(true)}
      />

      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8893E] font-medium font-sans">
            {subtitle}
          </span>
          <h4 className="font-headline text-lg sm:text-xl text-[#F4ECDD] mt-1 font-normal leading-snug">
            {title}
          </h4>
        </div>
        <div className="w-10 h-10 rounded-full border border-[#B8893E]/40 flex items-center justify-center text-[#F2DFB5] text-xs font-headline flex-shrink-0 ml-4">
          {person === 'him' ? 'M' : 'R'}
        </div>
      </div>

      {hasError ? (
        <div className="py-4 px-4 bg-[#4A0F20]/40 border border-[#B8893E]/30 rounded-sm text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#F2DFB5]/75">
            Audio Coming Soon
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="w-full bg-[#1A0A0F] h-1.5 rounded-full overflow-hidden border border-[#B8893E]/30">
            <div
              className="bg-[#B8893E] h-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Time & Play Controls */}
          <div className="flex items-center justify-between text-xs text-[#F4ECDD]/70 font-sans">
            <span>{currentTime}</span>

            <button
              type="button"
              onClick={togglePlay}
              className="w-12 h-12 rounded-full border border-[#B8893E] bg-[#4A0F20] hover:bg-[#B8893E] text-[#F4ECDD] hover:text-[#1A0A0F] flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <span>{duration}</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function EditorialOkKanmani() {
  return (
    <section
      id="soundtrack"
      className="relative w-full bg-[#1A0A0F] text-[#F4ECDD] py-20 px-4 sm:px-8 border-b border-[#B8893E]/40 overflow-hidden"
      aria-label="OK Kanmani Soundtrack and Quote"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <EditorialCardReveal direction="up">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8893E] font-medium font-sans mb-3">
            The Wedding Playlist
          </p>
          <h2 className="font-names text-4xl sm:text-5xl md:text-6xl text-[#F2DFB5] leading-tight mb-2">
            Songs on Loop
          </h2>
          <div className="w-16 h-px bg-[#B8893E]/50 mx-auto my-6" />
        </EditorialCardReveal>

        {/* Audio Cards Grid - Staggered Card Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
          <EditorialCardReveal direction="up" delay={0.1} scale className="h-full">
            <EditorialAudioCard
              person="him"
              subtitle="HIS VIBE"
              title="The song on loop in his head on his wedding day"
              src="/audio/him.mp3"
            />
          </EditorialCardReveal>

          <EditorialCardReveal direction="up" delay={0.25} scale className="h-full">
            <EditorialAudioCard
              person="her"
              subtitle="HER VIBE"
              title="The song that will loop in her head on her big day"
              src="/audio/her.mp3"
            />
          </EditorialCardReveal>
        </div>

        {/* OK Kanmani Editorial Pull-Quote */}
        <EditorialCardReveal direction="up" delay={0.2} scale>
          <div className="editorial-burgundy-panel rounded-sm p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
            <blockquote className="font-headline text-xl sm:text-2xl md:text-3xl text-[#F4ECDD] font-light leading-snug">
              &ldquo;Rishma might be Malli&apos;s <span className="font-semibold text-[#D4A359]">TARA</span>, but Malli has always been Rishma&apos;s <span className="font-semibold text-[#D4A359]">GANAPATHY</span>.&rdquo;
            </blockquote>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#B8893E] font-sans">
              An OK Kanmani reference
            </p>
          </div>
        </EditorialCardReveal>
      </div>
    </section>
  )
}
