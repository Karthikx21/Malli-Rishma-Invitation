'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { POSTERS_CONFIG } from '@/lib/posters.config'
import EditorialCardReveal from './EditorialCardReveal'

export default function EditorialCouple() {
  const [malliImgErr, setMalliImgErr] = useState(false)
  const [rishmaImgErr, setRishmaImgErr] = useState(false)

  return (
    <section
      id="couple"
      className="relative w-full bg-[#F4ECDD] text-[#1A0A0F] py-20 px-4 sm:px-8 border-b border-[#B8893E]/30 overflow-hidden"
      aria-label="Know the Couple"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header with Staggered Entrance */}
        <EditorialCardReveal direction="up" className="text-center mb-16">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#B8893E] font-medium font-sans mb-2">
            Before the wedding
          </p>
          <h2 className="font-names text-5xl sm:text-6xl md:text-7xl text-[#4A0F20] leading-none mb-3">
            Know the Couple
          </h2>
          <p className="text-sm sm:text-base text-[#1A0A0F]/80 font-sans tracking-wide">
            Meet the two people causing all this dhamaka!
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-[#B8893E]/50 mx-auto mt-6"
          />
        </EditorialCardReveal>

        {/* Two Portraits Grid - Card by Card Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {/* Groom: MALLI SUMANDHAR (Card 1) */}
          <EditorialCardReveal
            direction="up"
            delay={0.1}
            scale
            className="h-full"
          >
            <motion.article
              whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="editorial-burgundy-panel rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xl h-full transition-shadow duration-300 hover:shadow-2xl hover:border-[#B8893E]"
            >
              <div>
                {/* Photo Frame */}
                <div
                  className="relative aspect-[3/4] w-full rounded-sm overflow-hidden mb-6 border border-[#B8893E]/40"
                  style={{ backgroundColor: POSTERS_CONFIG.couple.malli.fallbackColor }}
                >
                  {!malliImgErr && (
                    <img
                      src={POSTERS_CONFIG.couple.malli.src}
                      alt={POSTERS_CONFIG.couple.malli.alt}
                      onError={() => setMalliImgErr(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0F]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-[#F4ECDD]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8893E]">
                      HIS VIBE
                    </span>
                    <span className="font-tamil text-xl text-[#F2DFB5]">மல்லி</span>
                  </div>
                </div>

                {/* Title & Name */}
                <div className="mb-6">
                  <h3 className="font-headline text-2xl sm:text-3xl tracking-wide text-[#F4ECDD] uppercase">
                    Malli Sumandhar
                  </h3>
                  <p className="font-tamil text-sm text-[#F2DFB5]/80 mt-1">
                    மல்லி சுமந்தர்
                  </p>
                </div>

                {/* Traits List (Verbatim) */}
                <ul className="space-y-3 text-sm sm:text-base text-[#F4ECDD]/90 font-sans">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                    Calm & composed (most of the time)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                    Loyal to the core
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                    Big heart, bigger plans
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                    Loves adventure & travel
                  </li>
                </ul>
              </div>

              {/* Groom Personal Quote */}
              <div className="mt-8 pt-6 border-t border-[#B8893E]/30 text-center">
                <p className="font-names text-3xl text-[#F2DFB5]">
                  &ldquo;My safe place&rdquo;
                </p>
              </div>
            </motion.article>
          </EditorialCardReveal>

          {/* Bride: RISHMA JOHN (Card 2) */}
          <EditorialCardReveal
            direction="up"
            delay={0.25}
            scale
            className="h-full"
          >
            <motion.article
              whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="editorial-burgundy-panel rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xl h-full transition-shadow duration-300 hover:shadow-2xl hover:border-[#B8893E]"
            >
              <div>
                {/* Photo Frame */}
                <div
                  className="relative aspect-[3/4] w-full rounded-sm overflow-hidden mb-6 border border-[#B8893E]/40"
                  style={{ backgroundColor: POSTERS_CONFIG.couple.rishma.fallbackColor }}
                >
                  {!rishmaImgErr && (
                    <img
                      src={POSTERS_CONFIG.couple.rishma.src}
                      alt={POSTERS_CONFIG.couple.rishma.alt}
                      onError={() => setRishmaImgErr(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0F]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-[#F4ECDD]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8893E]">
                      HER VIBE
                    </span>
                    <span className="font-tamil text-xl text-[#F2DFB5]">ரிஷ்மா</span>
                  </div>
                </div>

                {/* Title & Name */}
                <div className="mb-6">
                  <h3 className="font-headline text-2xl sm:text-3xl tracking-wide text-[#F4ECDD] uppercase">
                    Rishma John
                  </h3>
                  <p className="font-tamil text-sm text-[#F2DFB5]/80 mt-1">
                    ரிஷ்மா ஜான்
                  </p>
                </div>

                {/* Traits List (Verbatim) */}
                <ul className="space-y-3 text-sm sm:text-base text-[#F4ECDD]/90 font-sans">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                    Daydreamer & overthinker
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                    Loves good food (always)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                    Soft heart, strong mind
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8893E]" />
                    Finds joy in little things
                  </li>
                </ul>
              </div>

              {/* Bride Personal Quote */}
              <div className="mt-8 pt-6 border-t border-[#B8893E]/30 text-center">
                <p className="font-names text-3xl text-[#F2DFB5]">
                  &ldquo;Believes in love, always&rdquo;
                </p>
              </div>
            </motion.article>
          </EditorialCardReveal>
        </div>

        {/* How We Met Story Panel */}
        <EditorialCardReveal direction="up" delay={0.2} scale className="mt-16">
          <div className="bg-[#F2DFB5]/60 border border-[#B8893E]/40 rounded-sm p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-md">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#4A0F20] font-semibold mb-2">
              The Story
            </p>
            <h3 className="font-headline text-2xl sm:text-3xl text-[#1A0A0F] mb-4">
              How we met
            </h3>
            <p className="text-base sm:text-lg text-[#1A0A0F]/90 font-sans leading-relaxed italic max-w-xl mx-auto">
              &ldquo;It all started on a fine evening in Bangalore, and the rest is history. Bangalore gave us many luxuries, but the finest of them was finding each other.&rdquo;
            </p>
          </div>
        </EditorialCardReveal>
      </div>
    </section>
  )
}
