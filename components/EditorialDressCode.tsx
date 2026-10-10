'use client'

import { motion } from 'framer-motion'

export default function EditorialDressCode() {
  const redWineSwatches = [
    { color: '#54111E', name: 'Cabernet' },
    { color: '#721B2C', name: 'Merlot' },
    { color: '#8A1F36', name: 'Rich Wine' },
    { color: '#A32845', name: 'Crimson Wine' },
    { color: '#BA3452', name: 'Velvet Berry' },
  ]

  return (
    <section
      id="dress-code"
      className="relative w-full bg-[#FAF8FC] text-[#2D2338] py-20 sm:py-28 px-6 sm:px-12 border-b border-[#E5DCF0] overflow-hidden"
      aria-label="Wedding Dress Code"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-functional text-[10px] sm:text-xs text-[#8D76A8] font-semibold mb-2 tracking-[0.25em]">
            WHAT TO WEAR
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#2D2338] font-light tracking-tight mb-2">
            Dress Code
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#8D76A8]/50 to-transparent mx-auto mt-3 mb-16"
          />
        </motion.div>

        {/* Two Days Dress Guidance: High-Fashion Editorial Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-left mb-16">
          {/* Day 1: Christian Nuptials (Red Wine Suggested Palette) */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 flex flex-col justify-between border-t border-[#E5DCF0] pt-6"
          >
            <div>
              {/* Baroque Candelabra & Grand Stairs Moodboard Photo */}
              <motion.div
                whileHover={{ scale: 1.025, y: -4 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] w-full max-w-[280px] mx-auto rounded-t-[140px] overflow-hidden shadow-lg border border-[#E5DCF0] bg-[#EFEAF5] mb-6 cursor-pointer group"
              >
                <img
                  src="/editorial/baroque-candelabra-stairs.jpg"
                  alt="Opulent Baroque Candelabra Staircase"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2338]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-[#FAF8FC] font-functional text-[9px] tracking-[0.25em]">
                  FORMAL GALA AESTHETIC
                </div>
              </motion.div>

              <span className="font-functional text-[10px] text-[#8D76A8] font-semibold tracking-[0.25em] block">
                18 NOVEMBER
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl text-[#2D2338] font-light mt-1 mb-3">
                Christian Nuptials Ceremony
              </h3>
              <p className="font-serif-title text-base sm:text-lg text-[#2D2338]/85 font-light leading-relaxed">
                The groom and the bride will be in classic Christian attire. We would love for you to join us in shades of red wine or evening formal elegance.
              </p>
            </div>

            {/* Red Wine Swatches */}
            <div className="pt-4 border-t border-[#E5DCF0]">
              <span className="font-functional text-[9px] text-[#8D76A8] tracking-[0.2em] font-semibold block mb-3 uppercase">
                SUGGESTED PALETTE · RED WINE
              </span>
              <div className="flex gap-2 sm:gap-3 items-start flex-wrap">
                {redWineSwatches.map((swatch, i) => (
                  <div key={swatch.name} className="flex flex-col items-center gap-1.5 text-center w-12 sm:w-14">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.1 + i * 0.07,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                        scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                        y: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      }}
                      className="w-8 h-8 rounded-full border border-black/10 shadow-sm cursor-pointer"
                      style={{ backgroundColor: swatch.color }}
                      title={`${swatch.name} (${swatch.color})`}
                    />
                    <span className="font-functional text-[7.5px] sm:text-[8px] text-[#2D2338]/75 leading-tight tracking-tight uppercase">
                      {swatch.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Day 2: Hindu Wedding (Style Guidance - No Colour Rules) */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 flex flex-col justify-between border-t border-[#C5A059]/30 pt-6"
          >
            <div>
              {/* Crimson Fresco & Floral Brass Urulis Moodboard Photo */}
              <motion.div
                whileHover={{ scale: 1.025, y: -4 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] w-full max-w-[280px] mx-auto rounded-t-[140px] overflow-hidden shadow-lg border border-[#C5A059]/30 bg-[#2A0510] mb-6 cursor-pointer group"
              >
                <img
                  src="/editorial/crimson-urulis-fresco.jpg"
                  alt="Traditional Brass Floral Urulis & Crimson Fresco"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0510]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-[#FAF6EE] font-functional text-[9px] tracking-[0.25em]">
                  TRADITIONAL ATTIRE
                </div>
              </motion.div>

              <span className="font-functional text-[10px] text-[#9B702A] font-semibold tracking-[0.25em] block">
                20 NOVEMBER
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl text-[#3D0B1B] font-light mt-1 mb-3">
                Wedding &amp; Reception
              </h3>
              <p className="font-serif-title text-base sm:text-lg text-[#1A0A0F]/85 font-light leading-relaxed">
                Wear whatever you love and feel your best in — traditional attire is the dress code. There are no colour rules, just come ready to celebrate!
              </p>
            </div>

            {/* Style Guidance Only */}
            <div className="pt-4 border-t border-[#C5A059]/20">
              <span className="font-functional text-[9px] text-[#9B702A] tracking-[0.2em] font-semibold block mb-2 uppercase">
                STYLE GUIDANCE
              </span>
              <p className="font-functional text-xs text-[#3D0B1B] tracking-[0.1em] font-medium">
                Traditional Attire
              </p>
            </div>
          </motion.div>
        </div>

        {/* Editorial Photo Note */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto space-y-3 pt-6 border-t border-[#E5DCF0]"
        >
          <p className="font-serif-title italic text-base sm:text-lg text-[#2D2338]/85 leading-relaxed">
            &ldquo;Malli and Rishma are crazy about making memories with everyone celebrating alongside them, so bring your best smile and your best outfit.&rdquo;
          </p>
          <p className="font-accent text-3xl sm:text-4xl text-[#8D76A8] pt-1">
            Dress like you’re already in the memories.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

