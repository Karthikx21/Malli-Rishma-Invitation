'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface EditorialFooterProps {
  onReplayIntro: () => void
}

export default function EditorialFooter({ onReplayIntro }: EditorialFooterProps) {
  return (
    <footer
      className="relative w-full bg-[#160309] text-[#FAF6EE] pt-24 pb-20 sm:pt-32 sm:pb-28 px-6 sm:px-12 border-t border-[#C5A059]/30 text-center overflow-hidden"
      aria-label="Footer and Auspicious Subham Sign-off"
    >
      {/* 1. Atmospheric Peacock Crimson Arch Background - Seamlessly Blended with HTML */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="relative w-full h-full max-w-5xl mx-auto">
          <Image
            src="/editorial/peacock-crimson-arch.jpg"
            alt=""
            fill
            priority
            className="object-cover sm:object-contain object-center opacity-60 sm:opacity-75 scale-105"
          />

          {/* Seamless gradient feathering into HTML #160309 background: No visible image edges */}
          {/* Top & Bottom dissolves */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#160309] via-transparent to-[#160309]" />
          {/* Left & Right lateral dissolves */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#160309] via-transparent to-[#160309]" />
          {/* Radial vignette melting all corners into #160309 */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(22,3,9,0.7)_65%,#160309_95%)]" />
          {/* Ambient crimson warmth tone */}
          <div className="absolute inset-0 bg-[#4A0A16]/25 mix-blend-color-burn" />
        </div>
      </div>

      {/* 2. Foreground Content: Centered inside the Crimson Arch */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-6">
        {/* Sacred Star Flourish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#E6CA85]/60" />
          <span className="text-[#F3DE9C] text-sm sm:text-base animate-pulse">✦</span>
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#E6CA85]/60" />
        </motion.div>

        {/* The Sacred Tamil Word: 'சுபம்' (Only Tamil, Matched with Crimson & Antique Gold Palette) */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="py-1"
        >
          <h2
            className="font-tamil font-bold text-6xl sm:text-7xl md:text-8xl tracking-[0.22em] pl-[0.22em] leading-none select-none bg-gradient-to-b from-[#FFF7E2] via-[#F3DE9C] to-[#C5A059] bg-clip-text text-transparent"
            style={{
              filter:
                'drop-shadow(0 2px 24px rgba(243, 222, 156, 0.7)) drop-shadow(0 8px 45px rgba(139, 30, 46, 0.65))',
            }}
          >
            சுபம்
          </h2>
        </motion.div>

        {/* Best Sacred Auspicious Tamil Blessing Content */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1.5 max-w-lg mx-auto"
        >
          <p className="font-tamil text-base sm:text-lg text-[#F5E8C9] font-normal tracking-wider leading-relaxed">
            என்றும் மங்கலம் பொங்கட்டும்
          </p>
          <p className="font-tamil text-xs sm:text-sm text-[#C5A059] tracking-widest opacity-90">
            இரு குடும்பங்களின் அன்பான நல்வாழ்த்துகளுடன்
          </p>
        </motion.div>

        {/* Thin Gold Hairline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent my-2"
        />

        {/* Names Large in Script */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1 pt-1"
        >
          <h3 className="font-accent text-5xl sm:text-7xl md:text-8xl text-[#FAF6EE] font-normal leading-tight">
            Rishma &amp; Malli
          </h3>

          {/* Tamil Line */}
          <p className="font-tamil text-sm sm:text-base text-[#C5A059] tracking-wider pt-1">
            என்றும் அன்புடன் · With love, always
          </p>
        </motion.div>

        {/* Hashtag on Two Controlled Lines */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center pt-2"
        >
          <span className="font-functional text-[10px] sm:text-xs text-[#FAF6EE]/75 tracking-[0.35em]">
            #RISHMA FOUND HER
          </span>
          <span className="font-accent text-2xl text-[#E6CA85] leading-none mt-1">
            Pavazha Malli
          </span>
        </motion.div>

        {/* Delicate Hairline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent my-2"
        />

        {/* Replay Film Intro as Quiet Underlined Text Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <button
            type="button"
            onClick={onReplayIntro}
            className="gold-link text-[10px] tracking-[0.28em] text-[#C5A059]"
          >
            REPLAY FILM INTRO ↻
          </button>
        </motion.div>

        {/* Tiny Closing Line */}
        <p className="font-functional text-[9px] sm:text-[10px] tracking-[0.35em] text-[#FAF6EE]/45 pt-4">
          TWO DAYS · TWO CULTURES · ONE CELEBRATION
        </p>
      </div>
    </footer>
  )
}

