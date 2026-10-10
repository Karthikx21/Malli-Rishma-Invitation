'use client'

import { motion } from 'framer-motion'

export default function EditorialCouple() {
  return (
    <section
      id="couple"
      className="relative w-full bg-[#FAF8FC] text-[#2D2338] py-20 sm:py-28 px-6 sm:px-12 border-b border-[#E5DCF0] overflow-hidden"
      aria-label="Know the Couple"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-functional text-[10px] sm:text-xs text-[#8D76A8] font-semibold mb-2 tracking-[0.25em]">
            BEFORE THE WEDDING
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#2D2338] font-light tracking-tight">
            Know the Couple
          </h2>
          <p className="font-accent text-2xl sm:text-3xl text-[#B8893E] mt-1">
            Two souls who found their forever in each other.
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#8D76A8]/50 to-transparent mx-auto mt-4"
          />
        </motion.div>

        {/* Unified Single Couple Magazine Feature */}
        <motion.article
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#FFFFFF] border border-[#E5DCF0] p-6 sm:p-10 md:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left: The Groom (Malli Sumandhar) */}
            <motion.div
              initial={{ opacity: 0, x: -24, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col justify-between space-y-6 order-2 lg:order-1 text-center lg:text-left rounded-2xl bg-[#FAF8FC]/80 border border-[#E5DCF0] p-6 sm:p-7 shadow-xs"
            >
              <div>
                <div className="border-b border-[#E5DCF0] pb-4">
                  <span className="font-functional text-[10px] text-[#8D76A8] tracking-[0.25em] block mb-1 font-semibold uppercase">
                    THE GROOM
                  </span>
                  <h3 className="font-serif-title text-3xl sm:text-4xl text-[#2D2338] font-normal tracking-wide">
                    Malli Sumandhar
                  </h3>
                </div>

                {/* Parents Giving Away The Groom */}
                <div className="mt-5 space-y-3">
                  <div>
                    <span className="font-functional text-[9px] sm:text-[10px] text-[#8D76A8] tracking-[0.25em] block font-semibold uppercase">
                      THE PARENTS GIVING AWAY THE GROOM
                    </span>
                    <div className="space-y-0.5 font-serif-title text-base sm:text-lg text-[#2D2338] font-normal tracking-wide mt-1">
                      <p className="leading-snug">R.E. RAMESH KUMAR</p>
                      <p className="text-xs font-functional text-[#8D76A8]/70 tracking-[0.2em] font-light uppercase">&amp;</p>
                      <p className="leading-snug">
                        JAYASRI <span className="text-xs font-functional text-[#8D76A8] tracking-[0.18em] font-semibold">(LATE)</span>
                      </p>
                    </div>
                  </div>

                  {/* Uncle & Aunt */}
                  <div className="pt-2.5 border-t border-[#E5DCF0]/60">
                    <span className="font-functional text-[9px] sm:text-[10px] text-[#8D76A8] tracking-[0.25em] block font-semibold uppercase">
                      UNCLE &amp; AUNT
                    </span>
                    <div className="space-y-0.5 font-serif-title text-base sm:text-lg text-[#2D2338] font-normal tracking-wide mt-1">
                      <p className="leading-snug">ARUN KUMAR</p>
                      <p className="text-xs font-functional text-[#8D76A8]/70 tracking-[0.2em] font-light uppercase">&amp;</p>
                      <p className="leading-snug">GEETHA</p>
                    </div>
                  </div>
                </div>

                {/* Groom Personality Traits */}
                <ul className="mt-5 pt-4 border-t border-[#E5DCF0]/80 space-y-2.5 font-functional text-xs sm:text-[13px] text-[#2D2338]/85 tracking-[0.08em] lowercase leading-relaxed text-left max-w-xs mx-auto lg:mx-0">
                  <motion.li
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Big heart, bigger plans</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Loves adventure &amp; travel</span>
                  </motion.li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5DCF0]/80">
                <motion.p
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-accent text-3xl sm:text-4xl text-[#8D76A8] italic inline-block cursor-default"
                >
                  &ldquo;Her calm in every storm&rdquo;
                </motion.p>
              </div>
            </motion.div>

            {/* Elegant Separator between Groom and Bride (Mobile Only) */}
            <div className="lg:hidden col-span-1 order-2 my-1 flex items-center justify-center gap-3 py-3 select-none">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8D76A8]/30 to-[#8D76A8]/60" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E5DCF0] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8]" />
                <span className="font-accent text-2xl text-[#B8893E] leading-none px-0.5">&amp;</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#8D76A8]/30 to-[#8D76A8]/60" />
            </div>

            {/* Center: The Real Couple Portrait in an Arched Editorial Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.25, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col items-center order-1 lg:order-2"
            >
              <motion.div
                whileHover={{ scale: 1.025, y: -4 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[280px] sm:max-w-[320px] cursor-pointer"
              >
                {/* Arch-shaped Frame */}
                <div className="relative aspect-[2/3] w-full rounded-t-[140px] sm:rounded-t-[160px] rounded-b-2xl overflow-hidden shadow-xl border-2 border-[#E6CA85]/70 bg-[#FAF8FC] group">
                  <picture>
                    <source srcSet="/editorial/couple-traditional.webp" type="image/webp" />
                    <img
                      src="/editorial/couple-traditional.jpg"
                      alt="Malli Sumandhar and Rishma John Wedding Portrait"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </picture>
                  {/* Subtle soft vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2338]/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Gold Tracking Caption */}
                <div className="text-center mt-3">
                  <span className="font-functional text-[9px] sm:text-[10px] tracking-[0.35em] text-[#B8893E] font-semibold">
                    MALLI &amp; RISHMA
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: The Bride (Rishma John) */}
            <motion.div
              initial={{ opacity: 0, x: 24, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col justify-between space-y-6 order-3 text-center lg:text-left rounded-2xl bg-[#FAF8FC]/80 border border-[#E5DCF0] p-6 sm:p-7 shadow-xs"
            >
              <div>
                <div className="border-b border-[#E5DCF0] pb-4">
                  <span className="font-functional text-[10px] text-[#8D76A8] tracking-[0.25em] block mb-1 font-semibold uppercase">
                    THE BRIDE
                  </span>
                  <h3 className="font-serif-title text-3xl sm:text-4xl text-[#2D2338] font-normal tracking-wide">
                    Rishma John
                  </h3>
                </div>

                {/* Parents Giving Away The Bride */}
                <div className="mt-5 space-y-2">
                  <span className="font-functional text-[9px] sm:text-[10px] text-[#8D76A8] tracking-[0.25em] block font-semibold uppercase">
                    THE PARENTS GIVING AWAY THE BRIDE
                  </span>
                  <div className="space-y-0.5 font-serif-title text-base sm:text-lg text-[#2D2338] font-normal tracking-wide">
                    <p className="leading-snug">JOHN THAIPARAMBIL</p>
                    <p className="text-xs font-functional text-[#8D76A8]/70 tracking-[0.2em] font-light uppercase">&amp;</p>
                    <p className="leading-snug">CAROLINE JOHN</p>
                  </div>
                </div>

                {/* Bride Personality Traits */}
                <ul className="mt-5 pt-4 border-t border-[#E5DCF0]/80 space-y-2.5 font-functional text-xs sm:text-[13px] text-[#2D2338]/85 tracking-[0.08em] lowercase leading-relaxed text-left max-w-xs mx-auto lg:mx-0">
                  <motion.li
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Soft heart, strong mind</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Finds joy in little things</span>
                  </motion.li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5DCF0]/80">
                <motion.p
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-accent text-3xl sm:text-4xl text-[#8D76A8] italic inline-block cursor-default"
                >
                  &ldquo;Believes in love, always&rdquo;
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Unified "How We Met" Story integrated inside the single couple feature */}
          <motion.div
            initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 pt-10 border-t border-[#E5DCF0] text-center space-y-4 max-w-3xl mx-auto"
          >
            <p className="font-functional text-[10px] sm:text-xs text-[#8D76A8] font-semibold tracking-[0.3em]">
              THE STORY
            </p>
            <div className="w-12 h-px bg-[#8D76A8]/40 mx-auto my-3" />
            <blockquote className="font-serif-title italic text-xl sm:text-2xl text-[#2D2338]/90 font-light leading-relaxed">
              &ldquo;Bangalore gave us many luxuries, but the finest of them was
              finding each other.&rdquo;
            </blockquote>
            <p className="font-functional text-[10px] text-[#8D76A8] tracking-[0.2em] pt-1">
              BANGALORE · WHERE IT ALL BEGAN
            </p>
          </motion.div>
        </motion.article>
      </div>
    </section>
  )
}
