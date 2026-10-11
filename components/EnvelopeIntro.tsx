'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import './envelope-intro.css'

const PETALS = ['14%', '34%', '55%', '74%', '90%']
const DUST = ['10%', '22%', '31%', '46%', '58%', '67%', '80%', '92%']
const SPARKS = Array.from({ length: 16 }, (_, i) => i * 22.5)
const FLAP_PATH = 'M0,0 H860 L430,342 Z'

function Defs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {/* Soft Lilac & Pearl Petal Gradient */}
        <radialGradient id="ei-pet" cx=".5" cy=".85" r=".9">
          <stop offset="0" stopColor="#ebdff4" />
          <stop offset=".6" stopColor="#faf7fc" />
          <stop offset="1" stopColor="#ffffff" />
        </radialGradient>

        {/* Royal Lavender Wax Seal */}
        <radialGradient id="ei-waxlavender" cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor="#8E5EAA" />
          <stop offset=".5" stopColor="#532D6A" />
          <stop offset="1" stopColor="#241033" />
        </radialGradient>

        {/* Antique Gold Metallic Accent */}
        <radialGradient id="ei-gold" cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#f7e4a8" />
          <stop offset=".45" stopColor="#cfa650" />
          <stop offset="1" stopColor="#7d581a" />
        </radialGradient>

        {/* Pearl Ivory Deckle Envelope Flap */}
        <linearGradient id="ei-ivory" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FAF7FC" />
          <stop offset="1" stopColor="#EFEAF5" />
        </linearGradient>

        {/* Textured Soft Lilac Body Paper */}
        <linearGradient id="ei-ivory2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7F3FB" />
          <stop offset="1" stopColor="#E5DCF0" />
        </linearGradient>

        {/* Elegant Liner Tone */}
        <linearGradient id="ei-liner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D8CEE5" />
          <stop offset="1" stopColor="#EFEAF5" />
        </linearGradient>

        {/* Handmade Cotton Paper Texture Filter */}
        <filter id="ei-paper" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" result="n" />
          <feDiffuseLighting in="n" lightingColor="#fff" surfaceScale="1.4" result="l">
            <feDistantLight azimuth="225" elevation="62" />
          </feDiffuseLighting>
          <feComposite in="SourceGraphic" in2="l" operator="arithmetic" k1="1.15" k2="0" k3="0" k4="0" />
        </filter>

        {/* Organic Wax Edge Displacement */}
        <filter id="ei-wax" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="3" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="7" />
        </filter>

        {/* Vintage Floral Damask Watermark */}
        <pattern id="ei-damask" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M20 4Q28 12 20 20Q12 12 20 4ZM20 20Q28 28 20 36Q12 28 20 20ZM4 20Q12 12 20 20Q12 28 4 20ZM20 20Q28 12 36 20Q28 28 20 20Z"
            fill="none"
            stroke="#C5A059"
            strokeWidth=".7"
            opacity=".3"
          />
        </pattern>
      </defs>
    </svg>
  )
}

export interface EnvelopeIntroProps {
  onOpen?: () => void
  onStartTransition?: () => void
  onComplete?: () => void
  lead?: string
  a?: string
  b?: string
  mono?: string
  cta?: string
  logo?: string
}

export default function EnvelopeIntro({
  onOpen,
  onStartTransition,
  onComplete,
  lead = 'You are lovingly invited to witness',
  a = 'RISHMA',
  b = 'MALLI',
  mono = 'RishmaMalli',
  cta = 'Open Invitation',
  logo = '/MR-logo-gold.png',
}: EnvelopeIntroProps) {
  const [stage, setStage] = useState(0) // 0 idle · 1 flap · 2 rise · 3 reveal · 4 done
  const [leave, setLeave] = useState(false)
  const timers = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout)
    }
  }, [])

  const start = useCallback(() => {
    if (stage > 0) return

    // Trigger floating background soundtrack immediately on interaction
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('wedding-play-music'))
      } catch {
        // Safe fallback
      }
    }

    setStage(1)
    const steps: [number, number][] = [
      [900, 2],
      [2400, 3],
      [4000, 4],
    ]
    steps.forEach(([t, s]) => {
      timers.current.push(
        setTimeout(() => {
          setStage(s)
        }, t)
      )
    })
  }, [stage])

  const finish = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      if (leave) return

      if (typeof window !== 'undefined') {
        try {
          window.dispatchEvent(new CustomEvent('wedding-play-music'))
        } catch {
          // Safe fallback
        }
      }

      setLeave(true)
      onStartTransition?.()

      timers.current.push(
        setTimeout(() => {
          onOpen?.()
          onComplete?.()
        }, 900)
      )
    },
    [leave, onStartTransition, onOpen, onComplete]
  )

  const handleStageClick = () => {
    if (stage === 0) {
      start()
    } else if (stage >= 4) {
      finish()
    }
  }

  const cls = [
    'ei-root',
    stage >= 1 && 'is-flap',
    stage >= 2 && 'is-rise',
    stage >= 3 && 'is-reveal',
    stage >= 4 && 'is-done',
    leave && 'is-leave',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={cls}
      role="region"
      aria-label="Wedding invitation envelope"
      onClick={handleStageClick}
    >
      <Defs />
      <div className="ei-stage">
        {/* 1. Photorealistic Lavender Silk & Candlelight Background */}
        <img
          src="/lavender-envelope-bg.jpg"
          alt="Lavender silk and candlelit wedding setting"
          className="ei-photo-bg"
        />
        <div className="ei-photo-scrim" />

        {/* 2. Floating Ivory Petals & Golden Candlelight Dust */}
        {PETALS.map((x, i) => (
          <i
            key={'p' + i}
            className="ei-petal"
            style={
              {
                '--x': x,
                '--d': `${11 + i * 1.7}s`,
                '--w': `${i * -2.6}s`,
              } as React.CSSProperties
            }
          />
        ))}
        {DUST.map((x, i) => (
          <i
            key={'d' + i}
            className="ei-dust"
            style={
              {
                '--x': x,
                '--d': `${7 + (i % 4) * 2}s`,
                '--w': `${i * -1.4}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* 3. Luxury 3D Envelope */}
        <div
          className="ei-env"
          onClick={(e) => {
            if (stage === 0) {
              e.stopPropagation()
              start()
            } else if (stage >= 4) {
              e.stopPropagation()
              finish(e)
            }
          }}
        >
          {/* Back Paper Layer */}
          <svg className="ei-layer ei-back" viewBox="0 0 860 590" preserveAspectRatio="none">
            <rect width="860" height="590" rx="12" fill="url(#ei-liner)" filter="url(#ei-paper)" />
          </svg>

          {/* Invitation Card Rising Up */}
          <div className="ei-card">
            <div className="ei-frame">
              <i className="ei-c ei-c1" />
              <i className="ei-c ei-c2" />
              <i className="ei-c ei-c3" />
              <i className="ei-c ei-c4" />
              <p className="ei-lead">{lead}</p>
              <p className="ei-name ei-foil">{a}</p>
              <p className="ei-plus ei-foil">+</p>
              <p className="ei-name ei-foil">{b}</p>
              <div className="ei-orn">
                <span />
                <b>◆</b>
                <span />
              </div>
              <p className="ei-eq ei-foil">=</p>
              <p className="ei-mono ei-foil">{mono}</p>
            </div>
          </div>

          {/* Front Envelope Pocket Layer */}
          <svg className="ei-layer ei-front" viewBox="0 0 860 590" preserveAspectRatio="none">
            <path
              d="M0,0 L430,342 L860,0 V578 Q860,590 848,590 H12 Q0,590 0,578 Z"
              fill="url(#ei-ivory2)"
              filter="url(#ei-paper)"
            />
            <path
              d="M0,0 L430,342 L860,0 V578 Q860,590 848,590 H12 Q0,590 0,578 Z"
              fill="url(#ei-damask)"
            />
            <path
              d="M2,588 L420,300 M858,588 L440,300"
              stroke="#8D76A8"
              strokeOpacity=".25"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* 3D Folding Flap */}
          <div className="ei-flapw">
            <svg className="ei-layer ei-flap-out" viewBox="0 0 860 342" preserveAspectRatio="none">
              <path d={FLAP_PATH} fill="url(#ei-ivory)" filter="url(#ei-paper)" />
              <path d={FLAP_PATH} fill="url(#ei-damask)" />
              <path
                d="M16,10 L430,316 L844,10"
                fill="none"
                stroke="#C5A059"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="0 9"
              />
            </svg>
            <svg className="ei-layer ei-flap-in" viewBox="0 0 860 342" preserveAspectRatio="none">
              <path d={FLAP_PATH} fill="url(#ei-liner)" filter="url(#ei-paper)" />
              <path d={FLAP_PATH} fill="url(#ei-damask)" opacity=".7" />
            </svg>
          </div>

          {/* Royal Lavender Wax Seal with Embossed Gold Monogram */}
          <div className="ei-seal">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="url(#ei-waxlavender)" filter="url(#ei-wax)" />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#E6CA85"
                strokeOpacity=".65"
                strokeWidth="1.2"
              />
            </svg>
            <img className="ei-logo" src={logo} alt="MR monogram" />
            <span className="ei-sheen" />
          </div>
        </div>

        {/* Bursting Golden Sparkles */}
        {SPARKS.map((d) => (
          <i
            key={d}
            className="ei-spark"
            style={{ '--a': `${d}deg` } as React.CSSProperties}
          />
        ))}

        {/* Interactive Prompt & Reveal Button */}
        <p className="ei-hint">Tap the seal to open</p>
        <button
          className="ei-cta"
          onClick={finish}
          type="button"
          aria-label={cta}
        >
          <span className="ei-cta-frame">
            <i className="ei-cta-corner ei-cta-tl" />
            <i className="ei-cta-corner ei-cta-tr" />
            <i className="ei-cta-corner ei-cta-bl" />
            <i className="ei-cta-corner ei-cta-br" />
          </span>
          <span className="ei-cta-sheen" />
          <span className="ei-cta-body">
            <span className="ei-cta-gem" aria-hidden="true">✦</span>
            <span className="ei-cta-text">{cta}</span>
            <span className="ei-cta-gem" aria-hidden="true">✦</span>
          </span>
        </button>
      </div>
    </div>
  )
}
