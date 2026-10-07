'use client'

import { motion } from 'framer-motion'

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
      className="relative w-full bg-[#FAF6EE] text-[#1A0A0F] py-20 sm:py-28 px-6 sm:px-12 border-b border-[#C5A059]/30 overflow-hidden"
      aria-label="Wedding Dress Code"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-functional text-[10px] sm:text-xs text-[#9B702A] font-semibold mb-2">
            WHAT TO WEAR
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#3D0B1B] font-light tracking-tight mb-2">
            Dress Code
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto mt-3 mb-16"
          />
        </motion.div>

        {/* Two Days Dress Guidance: High-Fashion Editorial Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-left mb-16">
          {/* Day 1: Ring Exchange */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 flex flex-col justify-between border-t border-[#C5A059]/30 pt-6"
          >
            <div>
              {/* Baroque Candelabra & Grand Stairs Moodboard Photo */}
              <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto rounded-t-[140px] overflow-hidden shadow-lg border border-[#C5A059]/30 bg-[#2A0510] mb-6">
                <img
                  src="/editorial/baroque-candelabra-stairs.jpg"
                  alt="Opulent Baroque Candelabra Staircase"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0510]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-[#FAF6EE] font-functional text-[9px] tracking-[0.25em]">
                  FORMAL GALA AESTHETIC
                </div>
              </div>

              <span className="font-functional text-[10px] text-[#9B702A] font-semibold tracking-[0.25em] block">
                18 NOVEMBER
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl text-[#3D0B1B] font-light mt-1 mb-3">
                Ring Exchange Ceremony
              </h3>
              <p className="font-serif-title text-base sm:text-lg text-[#1A0A0F]/85 font-light leading-relaxed">
                The groom will be in a classic coat suit and the bride in a white gown. We would love for you to join us in shades of wine or maroon.
              </p>
            </div>

            {/* Wine / Maroon Swatches */}
            <div className="pt-4 border-t border-[#C5A059]/20">
              <span className="font-functional text-[9px] text-[#9B702A] tracking-[0.2em] block mb-3">
                SUGGESTED PALETTE
              </span>
              <div className="flex gap-3 items-center">
                {wineSwatches.map((swatch, i) => (
                  <motion.div
                    key={swatch.color}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-8 h-8 rounded-full border border-[#C5A059]/50 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Day 2: Hindu Wedding */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 flex flex-col justify-between border-t border-[#C5A059]/30 pt-6"
          >
            <div>
              {/* Crimson Fresco & Floral Brass Urulis Moodboard Photo */}
              <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto rounded-t-[140px] overflow-hidden shadow-lg border border-[#C5A059]/30 bg-[#2A0510] mb-6">
                <img
                  src="/editorial/crimson-urulis-fresco.jpg"
                  alt="Traditional Brass Floral Urulis & Crimson Fresco"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0510]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-[#FAF6EE] font-functional text-[9px] tracking-[0.25em]">
                  TRADITIONAL ETHNIC CHARM
                </div>
              </div>

              <span className="font-functional text-[10px] text-[#9B702A] font-semibold tracking-[0.25em] block">
                20 NOVEMBER
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl text-[#3D0B1B] font-light mt-1 mb-3">
                Hindu Wedding &amp; Reception
              </h3>
              <p className="font-serif-title text-base sm:text-lg text-[#1A0A0F]/85 font-light leading-relaxed">
                Wear whatever you love and feel your best in. There are no colour rules, just come ready to look picture perfect.
              </p>
            </div>

            <div className="pt-4 border-t border-[#C5A059]/20">
              <span className="font-functional text-[9px] text-[#9B702A] tracking-[0.2em] block mb-2">
                STYLE GUIDANCE
              </span>
              <p className="font-functional text-xs text-[#3D0B1B] tracking-[0.1em] font-medium lowercase">
                Traditional Silk, Festive Formals, or Ethnic Charm
              </p>
            </div>
          </motion.div>
        </div>

        {/* Editorial Photo Note */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto space-y-3 pt-6 border-t border-[#C5A059]/20"
        >
          <p className="font-serif-title italic text-base sm:text-lg text-[#1A0A0F]/85 leading-relaxed">
            &ldquo;Malli and Rishma are crazy about making memories with everyone celebrating alongside them, so bring your best smile and your best outfit.&rdquo;
          </p>
          <p className="font-accent text-3xl sm:text-4xl text-[#3D0B1B] pt-1">
            Be picture perfect.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
