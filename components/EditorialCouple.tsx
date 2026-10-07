'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { POSTERS_CONFIG } from '@/lib/posters.config'

export default function EditorialCouple() {
  const [malliImgErr, setMalliImgErr] = useState(false)
  const [rishmaImgErr, setRishmaImgErr] = useState(false)

  return (
    <section
      id="couple"
      className="relative w-full bg-[#FAF6EE] text-[#1A0A0F] py-20 sm:py-28 px-6 sm:px-12 border-b border-[#C5A059]/30 overflow-hidden"
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
          <p className="font-functional text-[10px] sm:text-xs text-[#9B702A] font-semibold mb-2">
            BEFORE THE WEDDING
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#3D0B1B] font-light tracking-tight">
            Know the Couple
          </h2>
          <p className="font-accent text-2xl sm:text-3xl text-[#C2671A] mt-1">
            Meet the two people causing all this dhamaka!
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto mt-4"
          />
        </motion.div>

        {/* Two Portraits: Open Magazine Layout (NO BOXED CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Groom: MALLI SUMANDHAR */}
          <motion.article
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Photo with delicate gold hairline frame and arched top */}
              <div className="relative aspect-[3/4] w-full max-w-[340px] mx-auto rounded-t-[140px] overflow-hidden shadow-lg border border-[#C5A059]/30 bg-[#360B17]">
                {!malliImgErr && (
                  <img
                    src={POSTERS_CONFIG.couple.malli.src}
                    alt={POSTERS_CONFIG.couple.malli.alt}
                    onError={() => setMalliImgErr(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0510]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-[#FAF6EE]">
                  <span className="font-functional text-[9px] text-[#E6CA85] tracking-[0.25em]">
                    HIS VIBE
                  </span>
                  <span className="font-tamil text-lg text-[#FAF6EE] font-medium">
                    மல்லி
                  </span>
                </div>
              </div>

              {/* Title & Name in Cormorant Garamond */}
              <div className="mt-8 text-center sm:text-left border-b border-[#C5A059]/20 pb-4">
                <h3 className="font-serif-title text-3xl sm:text-4xl text-[#3D0B1B] font-normal tracking-wide">
                  Malli Sumandhar
                </h3>
                <p className="font-tamil text-xs sm:text-sm text-[#9B702A] tracking-[0.2em] mt-1">
                  மல்லி சுமந்தர்
                </p>
              </div>

              {/* Traits List (Verbatim) */}
              <ul className="mt-6 space-y-3 font-functional text-xs sm:text-[13px] text-[#1A0A0F]/85 tracking-[0.1em] lowercase leading-relaxed">
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B702A]" />
                  <span>Calm &amp; composed (most of the time)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B702A]" />
                  <span>Loyal to the core</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B702A]" />
                  <span>Big heart, bigger plans</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B702A]" />
                  <span>Loves adventure &amp; travel</span>
                </li>
              </ul>
            </div>

            {/* Groom Personal Quote in Great Vibes */}
            <div className="pt-4 text-center">
              <p className="font-accent text-3xl sm:text-4xl text-[#3D0B1B] italic">
                &ldquo;My safe place&rdquo;
              </p>
            </div>
          </motion.article>

          {/* Bride: RISHMA JOHN */}
          <motion.article
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Photo with delicate gold hairline frame and arched top */}
              <div className="relative aspect-[3/4] w-full max-w-[340px] mx-auto rounded-t-[140px] overflow-hidden shadow-lg border border-[#C5A059]/30 bg-[#360B17]">
                {!rishmaImgErr && (
                  <img
                    src={POSTERS_CONFIG.couple.rishma.src}
                    alt={POSTERS_CONFIG.couple.rishma.alt}
                    onError={() => setRishmaImgErr(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0510]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-[#FAF6EE]">
                  <span className="font-functional text-[9px] text-[#E6CA85] tracking-[0.25em]">
                    HER VIBE
                  </span>
                  <span className="font-tamil text-lg text-[#FAF6EE] font-medium">
                    ரிஷ்மா
                  </span>
                </div>
              </div>

              {/* Title & Name in Cormorant Garamond */}
              <div className="mt-8 text-center sm:text-left border-b border-[#C5A059]/20 pb-4">
                <h3 className="font-serif-title text-3xl sm:text-4xl text-[#3D0B1B] font-normal tracking-wide">
                  Rishma John
                </h3>
                <p className="font-tamil text-xs sm:text-sm text-[#9B702A] tracking-[0.2em] mt-1">
                  ரிஷ்மா ஜான்
                </p>
              </div>

              {/* Traits List (Verbatim) */}
              <ul className="mt-6 space-y-3 font-functional text-xs sm:text-[13px] text-[#1A0A0F]/85 tracking-[0.1em] lowercase leading-relaxed">
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B702A]" />
                  <span>Daydreamer &amp; overthinker</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B702A]" />
                  <span>Loves good food (always)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B702A]" />
                  <span>Soft heart, strong mind</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B702A]" />
                  <span>Finds joy in little things</span>
                </li>
              </ul>
            </div>

            {/* Bride Personal Quote in Great Vibes */}
            <div className="pt-4 text-center">
              <p className="font-accent text-3xl sm:text-4xl text-[#3D0B1B] italic">
                &ldquo;Believes in love, always&rdquo;
              </p>
            </div>
          </motion.article>
        </div>

        {/* How We Met Story Panel: Pure Editorial Typography with Candlelit Mirror Accent */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 sm:mt-32 max-w-4xl mx-auto pt-10 border-t border-[#C5A059]/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Candlelit Antique Mirror Photograph */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[240px] sm:max-w-[280px]">
                <div className="relative aspect-[3/4] w-full rounded-t-[140px] overflow-hidden shadow-xl border border-[#C5A059]/40 bg-[#160309]">
                  <img
                    src="/editorial/candlelit-antique-mirror.jpg"
                    alt="Warm candlelit reflection of an evening in Bangalore"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160309]/80 via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Thin gold hairline arch border offset */}
                <div
                  className="absolute inset-0 pointer-events-none border border-[#C5A059]/30 rounded-t-[140px] -m-1.5 opacity-60"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Story Text */}
            <div className="md:col-span-7 text-center md:text-left space-y-4">
              <p className="font-functional text-[10px] sm:text-xs text-[#9B702A] font-semibold tracking-[0.3em]">
                THE STORY
              </p>
              <h4 className="font-serif-title text-3xl sm:text-4xl text-[#3D0B1B] font-light">
                How We Met
              </h4>
              <div className="w-12 h-px bg-[#C5A059]/40 mx-auto md:mx-0 my-3" />
              <blockquote className="font-serif-title italic text-xl sm:text-2xl text-[#1A0A0F]/90 font-light leading-relaxed">
                &ldquo;It all started on a fine evening in Bangalore, and the rest is
                history. Bangalore gave us many luxuries, but the finest of them was
                finding each other.&rdquo;
              </blockquote>
              <p className="font-functional text-[10px] text-[#9B702A] tracking-[0.2em] pt-1">
                BANGALORE · WHERE IT ALL BEGAN
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
