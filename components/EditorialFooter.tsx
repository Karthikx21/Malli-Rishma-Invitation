'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface EditorialFooterProps {
  onReplayIntro: () => void
}

export default function EditorialFooter({ onReplayIntro }: EditorialFooterProps) {
  return (
    <footer
      className="relative w-full bg-[#181324] text-[#FAF6EE] pt-24 pb-20 sm:pt-32 sm:pb-28 px-6 sm:px-12 border-t border-[#8D76A8]/30 text-center overflow-hidden"
      aria-label="Footer and Blessings Sign-off"
    >
      {/* 1. Atmospheric Candlelit Chapel / Candelabra Background */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="relative w-full h-full max-w-5xl mx-auto">
          <Image
            src="/editorial/baroque-candelabra-stairs.jpg"
            alt=""
            fill
            priority
            className="object-cover sm:object-contain object-center opacity-30 sm:opacity-40 scale-105"
          />

          {/* Seamless gradient feathering into HTML #181324 background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#181324] via-transparent to-[#181324]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181324] via-transparent to-[#181324]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(24,19,36,0.85)_65%,#181324_98%)]" />
          <div className="absolute inset-0 bg-[#8D76A8]/20 mix-blend-soft-light" />
        </div>
      </div>

      {/* 2. Foreground Content: Centered inside the Ambient Glow */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-6">
        {/* Star Flourish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#E6CA85]/60" />
          <motion.span
            animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="text-[#E6CA85] text-sm sm:text-base inline-block"
          >
            ✦
          </motion.span>
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#E6CA85]/60" />
        </motion.div>

        {/* The Sacred Tamil Word: 'சுபம்' */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="py-1"
        >
          <motion.h2
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="font-tamil font-bold text-6xl sm:text-7xl md:text-8xl tracking-[0.22em] pl-[0.22em] leading-none select-none bg-gradient-to-b from-[#FFF7E2] via-[#F3DE9C] to-[#C5A059] bg-clip-text text-transparent inline-block"
            style={{
              filter:
                'drop-shadow(0 2px 24px rgba(243, 222, 156, 0.7)) drop-shadow(0 8px 45px rgba(141, 118, 168, 0.65))',
            }}
          >
            சுபம்
          </motion.h2>
        </motion.div>

        {/* Names Large in Script */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1 pt-1"
        >
          <h3 className="font-accent text-5xl sm:text-7xl md:text-8xl text-[#FAF6EE] font-normal leading-tight">
            Malli &amp; Rishma
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
          className="w-20 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/40 to-transparent my-2"
        />

        {/* Replay Film Intro as Quiet Underlined Text Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.06, x: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={onReplayIntro}
            className="gold-link text-[10px] tracking-[0.28em] text-[#E6CA85] cursor-pointer"
          >
            REPLAY ↻
          </motion.button>
        </motion.div>

        {/* Closing Tagline */}
        <p className="font-functional text-[9px] sm:text-[10px] tracking-[0.35em] text-[#D8CEE5]/50 pt-4">
          TWO DAYS · TWO CULTURES · ONE CELEBRATION
        </p>
      </div>
    </footer>
  )
}

