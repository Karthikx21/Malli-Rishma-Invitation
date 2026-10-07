'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Modern luxury audio controller:
 * - Rounded pill toggle fixed in bottom corner
 * - 3-bar animated equalizer next to label when playing
 * - Gentle fade-in over 3s to 28% volume; 1s fade-out
 * - /audio/theme.mp3 with Web Audio harp synth fallback
 */
export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [mode, setMode] = useState<'audio-element' | 'synth'>('audio-element')

  const audioElementRef = useRef<HTMLAudioElement | null>(null)
  const fadeTimerRef = useRef<number | null>(null)

  // Web Audio Synth Fallback References
  const audioCtxRef = useRef<AudioContext | null>(null)
  const synthMasterGainRef = useRef<GainNode | null>(null)
  const synthIntervalRef = useRef<number | null>(null)
  const synthActiveRef = useRef(false)

  // Soft romantic ambient frequencies (F# Major / D# minor harp & flute tones)
  const chordNotes = [
    [185.0, 277.18, 369.99, 466.16], // F# major 9
    [155.56, 233.08, 311.13, 369.99], // D# minor 7
    [164.81, 246.94, 329.63, 415.3],  // E major 9
    [185.0, 277.18, 369.99, 554.37], // F# resolve
  ]

  const clearFadeTimer = () => {
    if (fadeTimerRef.current !== null) {
      window.clearInterval(fadeTimerRef.current)
      fadeTimerRef.current = null
    }
  }

  const fadeInAudioElement = (audio: HTMLAudioElement) => {
    clearFadeTimer()
    audio.volume = 0
    const targetVolume = 0.28
    const stepTime = 50
    const steps = 3000 / stepTime
    const increment = targetVolume / steps

    fadeTimerRef.current = window.setInterval(() => {
      if (audio.volume + increment >= targetVolume) {
        audio.volume = targetVolume
        clearFadeTimer()
      } else {
        audio.volume = Math.min(targetVolume, audio.volume + increment)
      }
    }, stepTime)
  }

  const fadeOutAudioElement = (audio: HTMLAudioElement, callback?: () => void) => {
    clearFadeTimer()
    const startVolume = audio.volume
    const stepTime = 50
    const steps = 1000 / stepTime
    const decrement = startVolume / steps

    fadeTimerRef.current = window.setInterval(() => {
      if (audio.volume - decrement <= 0.01) {
        audio.volume = 0
        audio.pause()
        clearFadeTimer()
        if (callback) callback()
      } else {
        audio.volume = Math.max(0, audio.volume - decrement)
      }
    }, stepTime)
  }

  const startSynthFallback = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0, ctx.currentTime)
      masterGain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 3.0)
      masterGain.connect(ctx.destination)
      synthMasterGainRef.current = masterGain
      synthActiveRef.current = true

      let chordIndex = 0

      const playSynthChord = () => {
        if (!synthActiveRef.current || !ctx || !synthMasterGainRef.current) return
        const now = ctx.currentTime
        const notes = chordNotes[chordIndex % chordNotes.length]
        chordIndex++

        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator()
          const noteGain = ctx.createGain()
          const filter = ctx.createBiquadFilter()

          filter.type = 'lowpass'
          filter.frequency.setValueAtTime(600 + idx * 200, now)

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
          osc.frequency.setValueAtTime(freq, now)

          noteGain.gain.setValueAtTime(0, now)
          noteGain.gain.linearRampToValueAtTime(0.04 / (idx + 1), now + 1.8)
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 6.5)

          osc.connect(filter)
          filter.connect(noteGain)
          noteGain.connect(synthMasterGainRef.current!)

          osc.start(now + idx * 0.2)
          osc.stop(now + 7.0)
        })
      }

      playSynthChord()
      synthIntervalRef.current = window.setInterval(playSynthChord, 5400)
      setMode('synth')
      setIsPlaying(true)
    } catch {
      // Audio context safeguard
    }
  }

  const stopSynthFallback = () => {
    synthActiveRef.current = false
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current)
      synthIntervalRef.current = null
    }

    if (audioCtxRef.current && synthMasterGainRef.current) {
      const ctx = audioCtxRef.current
      const gain = synthMasterGainRef.current
      gain.gain.cancelScheduledValues(ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.0)
    }
    setIsPlaying(false)
  }

  const handleToggle = async () => {
    if (isPlaying) {
      if (mode === 'audio-element' && audioElementRef.current) {
        fadeOutAudioElement(audioElementRef.current, () => {
          setIsPlaying(false)
        })
      } else {
        stopSynthFallback()
      }
    } else {
      const audio = audioElementRef.current
      if (audio) {
        try {
          audio.currentTime = 0
          await audio.play()
          setMode('audio-element')
          setIsPlaying(true)
          fadeInAudioElement(audio)
          return
        } catch {
          startSynthFallback()
        }
      } else {
        startSynthFallback()
      }
    }
  }

  useEffect(() => {
    return () => {
      clearFadeTimer()
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current)
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => { })
      }
    }
  }, [])

  return (
    <>
      <audio
        ref={audioElementRef}
        src="/audio/theme.mp3"
        loop
        preload="none"
        onError={() => {
          if (isPlaying && mode === 'audio-element') {
            startSynthFallback()
          }
        }}
      />

      <aside className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={handleToggle}
          aria-label={isPlaying ? 'Pause melody' : 'Play melody'}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#14030B]/90 hover:bg-[#1C0612] border border-white/10 hover:border-[#B08D57]/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md text-[#F8F4ED] transition-all duration-300 cursor-pointer select-none"
        >
          <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#F5E5C0]">
            ♪ MUSIC
          </span>

          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5 w-3" aria-hidden="true">
              <span className="w-[1.5px] bg-[#B08D57] animate-eq-1" />
              <span className="w-[1.5px] bg-[#D95C80] animate-eq-2" />
              <span className="w-[1.5px] bg-[#B08D57] animate-eq-3" />
            </div>
          ) : (
            <span className="text-[10px] text-[#BFAEA0]/60 group-hover:text-[#BFAEA0] transition-colors">
              OFF
            </span>
          )}
        </button>
      </aside>
    </>
  )
}
