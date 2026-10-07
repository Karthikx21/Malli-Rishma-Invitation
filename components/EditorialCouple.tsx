'use client'

import { useState } from 'react'
import { POSTERS_CONFIG } from '@/lib/posters.config'

export default function EditorialCouple() {
  const [malliImgErr, setMalliImgErr] = useState(false)
  const [rishmaImgErr, setRishmaImgErr] = useState(false)

  return (
    <section
      id="couple"
      className="relative w-full bg-[#F4ECDD] text-[#1A0A0F] py-20 px-4 sm:px-8 border-b border-[#B8893E]/30"
      aria-label="Know the Couple"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#B8893E] font-medium font-sans mb-2">
            Before the wedding
          </p>
          <h2 className="font-names text-5xl sm:text-6xl md:text-7xl text-[#4A0F20] leading-none mb-3">
            Know the Couple
          </h2>
          <p className="text-sm sm:text-base text-[#1A0A0F]/80 font-sans tracking-wide">
            Meet the two people causing all this dhamaka!
          </p>
          <div className="w-16 h-px bg-[#B8893E]/50 mx-auto mt-6" />
        </div>

        {/* Two Portraits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {/* Groom: MALLI SUMANDHAR */}
          <article className="editorial-burgundy-panel rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xl">
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
          </article>

          {/* Bride: RISHMA JOHN */}
          <article className="editorial-burgundy-panel rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xl">
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
          </article>
        </div>

        {/* How We Met Story Panel */}
        <div className="mt-16 bg-[#F2DFB5]/60 border border-[#B8893E]/40 rounded-sm p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-md">
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
      </div>
    </section>
  )
}
