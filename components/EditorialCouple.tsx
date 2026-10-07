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
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#8D76A8]/50 to-transparent mx-auto mt-4"
          />
        </motion.div>

        {/* Unified Single Couple Magazine Feature */}
        <motion.article
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-[#FFFFFF] border border-[#E5DCF0] p-6 sm:p-10 md:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left: The Bride (Rishma John) - Matches her left position in the photo */}
            <motion.div
              initial={{ opacity: 0, x: -24, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex flex-col justify-between space-y-6 order-2 lg:order-1 text-center lg:text-left"
            >
              <div>
                <div className="border-b border-[#E5DCF0] pb-4">
                  <span className="font-functional text-[10px] text-[#8D76A8] tracking-[0.25em] block mb-1 font-semibold">
                    THE BRIDE
                  </span>
                  <h3 className="font-serif-title text-3xl sm:text-4xl text-[#2D2338] font-normal tracking-wide">
                    Rishma John
                  </h3>
                </div>

                <ul className="mt-6 space-y-3 font-functional text-xs sm:text-[13px] text-[#2D2338]/85 tracking-[0.08em] lowercase leading-relaxed text-left max-w-xs mx-auto lg:mx-0">
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Daydreamer &amp; overthinker</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Loves good food (always)</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Soft heart, strong mind</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Finds joy in little things</span>
                  </motion.li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5DCF0]/80">
                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="font-accent text-3xl sm:text-4xl text-[#8D76A8] italic inline-block cursor-default"
                >
                  &ldquo;Believes in love, always&rdquo;
                </motion.p>
              </div>
            </motion.div>

            {/* Center: The Real Couple Portrait in an Arched Editorial Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.25, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex flex-col items-center order-1 lg:order-2"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[280px] sm:max-w-[320px] cursor-pointer"
              >
                {/* Arch-shaped Frame */}
                <div className="relative aspect-[4/5] w-full rounded-t-[140px] sm:rounded-t-[160px] rounded-b-2xl overflow-hidden shadow-xl border-2 border-[#E6CA85]/70 bg-[#FAF8FC] group">
                  <img
                    src="/editorial/couple-real.jpg"
                    alt="Rishma John and Malli Sumandhar"
                    className="w-full h-full object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle vignette gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2338]/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Gold Tracking Caption */}
                <div className="text-center mt-3">
                  <span className="font-functional text-[9px] sm:text-[10px] tracking-[0.35em] text-[#B8893E] font-semibold">
                    RISHMA &amp; MALLI
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: The Groom (Malli Sumandhar) - Matches his right position in the photo */}
            <motion.div
              initial={{ opacity: 0, x: 24, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex flex-col justify-between space-y-6 order-3 text-center lg:text-left"
            >
              <div>
                <div className="border-b border-[#E5DCF0] pb-4">
                  <span className="font-functional text-[10px] text-[#8D76A8] tracking-[0.25em] block mb-1 font-semibold">
                    THE GROOM
                  </span>
                  <h3 className="font-serif-title text-3xl sm:text-4xl text-[#2D2338] font-normal tracking-wide">
                    Malli Sumandhar
                  </h3>
                </div>

                <ul className="mt-6 space-y-3 font-functional text-xs sm:text-[13px] text-[#2D2338]/85 tracking-[0.08em] lowercase leading-relaxed text-left max-w-xs mx-auto lg:mx-0">
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Calm &amp; composed</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Loyal to the core</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Big heart, bigger plans</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Loves adventure &amp; travel</span>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D76A8] shrink-0" />
                    <span>Rishma&apos;s safe place</span>
                  </motion.li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5DCF0]/80">
                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="font-accent text-3xl sm:text-4xl text-[#8D76A8] italic inline-block cursor-default"
                >
                  &ldquo;Her calm in every storm&rdquo;
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Unified "How We Met" Story integrated inside the single couple feature */}
          <motion.div
            initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 pt-10 border-t border-[#E5DCF0] text-center space-y-4 max-w-3xl mx-auto"
          >
            <p className="font-functional text-[10px] sm:text-xs text-[#8D76A8] font-semibold tracking-[0.3em]">
              THE STORY
            </p>
            <h4 className="font-serif-title text-3xl sm:text-4xl text-[#2D2338] font-light">
              How We Met
            </h4>
            <div className="w-12 h-px bg-[#8D76A8]/40 mx-auto my-3" />
            <blockquote className="font-serif-title italic text-xl sm:text-2xl text-[#2D2338]/90 font-light leading-relaxed">
              &ldquo;It all started on a fine evening in Bangalore, and the rest is
              history. Bangalore gave us many luxuries, but the finest of them was
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
