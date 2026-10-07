'use client'

import { motion } from 'framer-motion'
import EditorialCardReveal from './EditorialCardReveal'

export default function EditorialDressCode() {
  const wineSwatches = [
    { color: '#7A2036', name: 'Rich Wine' },
    { color: '#6B1F3A', name: 'Deep Burgundy' },
    { color: '#5A1A28', name: 'Crimson Plum' },
    { color: '#8A2D3F', name: 'Velvet Maroon' },
  ]

  return (
    <section
      id="dress-code"
      className="relative w-full bg-[#F4ECDD] text-[#1A0A0F] py-20 px-4 sm:px-8 border-b border-[#B8893E]/30 overflow-hidden"
      aria-label="Wedding Dress Code"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <EditorialCardReveal direction="up">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8893E] font-medium font-sans mb-3">
            What to wear
          </p>
          <h2 className="font-names text-5xl sm:text-6xl md:text-7xl text-[#4A0F20] leading-none mb-6">
            Dress code
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-[#B8893E]/50 mx-auto mb-14"
          />
        </EditorialCardReveal>

        {/* Two Days Dress Cards - Card-by-Card Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-14">
          {/* Day 1: Ring Exchange */}
          <EditorialCardReveal direction="up" delay={0.1} scale className="h-full">
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="bg-white/80 border border-[#B8893E]/40 rounded-sm p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8893E] font-sans font-semibold">
                  18 NOVEMBER
                </span>
                <h3 className="font-headline text-xl sm:text-2xl text-[#1A0A0F] mt-1 mb-4">
                  Ring Exchange Ceremony
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#1A0A0F]/85 leading-relaxed">
                  The groom will be in a classic coat suit and the bride in a white gown. We would love for you to join us in shades of wine or maroon.
                </p>
              </div>

              {/* Wine / Maroon Swatches */}
              <div className="mt-6 pt-4 border-t border-[#B8893E]/20">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#1A0A0F]/60 block mb-2 font-sans">
                  Suggested Palette
                </span>
                <div className="flex gap-3 items-center">
                  {wineSwatches.map((swatch, i) => (
                    <motion.div
                      key={swatch.color}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.2 }}
                      className="w-8 h-8 rounded-full border border-[#B8893E]/40 shadow-sm cursor-pointer"
                      style={{ backgroundColor: swatch.color }}
                      title={swatch.name}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </EditorialCardReveal>

          {/* Day 2: Hindu Wedding */}
          <EditorialCardReveal direction="up" delay={0.25} scale className="h-full">
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="bg-white/80 border border-[#B8893E]/40 rounded-sm p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8893E] font-sans font-semibold">
                  20 NOVEMBER
                </span>
                <h3 className="font-headline text-xl sm:text-2xl text-[#1A0A0F] mt-1 mb-4">
                  Hindu Wedding &amp; Reception
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#1A0A0F]/85 leading-relaxed">
                  Wear whatever you love and feel your best in. There are no colour rules, just come ready to look picture perfect.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#B8893E]/20">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#1A0A0F]/60 block mb-2 font-sans">
                  Style Guidance
                </span>
                <p className="text-xs text-[#B8893E] font-sans tracking-wide">
                  Traditional Silk, Festive Formals, or Ethnic Charm
                </p>
              </div>
            </motion.div>
          </EditorialCardReveal>
        </div>

        {/* Editorial Photo Note */}
        <EditorialCardReveal direction="up" delay={0.2} scale className="max-w-xl mx-auto space-y-4">
          <p className="text-base sm:text-lg text-[#1A0A0F]/85 font-sans leading-relaxed italic">
            &ldquo;Malli and Rishma are crazy about making memories with everyone celebrating alongside them, so bring your best smile and your best outfit.&rdquo;
          </p>
          <p className="font-names text-4xl sm:text-5xl text-[#4A0F20] pt-2">
            Be picture perfect.
          </p>
        </EditorialCardReveal>
      </div>
    </section>
  )
}
