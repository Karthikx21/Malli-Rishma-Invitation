'use client'

import BorderBeamCard from './BorderBeamCard'

/**
 * Modern luxury Couple Section inspired by the Border Beam design:
 * - Two glowing BorderBeamCard cards for Groom and Bride
 * - Sleek pill badges with subtle border glow
 * - Glowing orb bullets for traits (inspired by Thinking Orbs)
 * - Cinematic OK Kanmani devotion panel with metallic accents
 */
export default function CoupleSection() {
  return (
    <section id="couple" className="relative my-20 sm:my-28 max-w-[640px] mx-auto px-4">
      {/* Bilingual Header */}
      <div className="text-center mb-10">
        <h2 className="font-tamil text-2xl sm:text-3xl text-[#F8F4ED] font-normal">
          காதலர்கள்
        </h2>
        <span className="block font-sans text-[11px] uppercase tracking-[0.3em] text-[#B08D57] font-medium mt-1">
          CHAPTER II · THE COUPLE
        </span>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B08D57] to-transparent mx-auto mt-4" />
      </div>

      <div className="space-y-8">
        {/* Malli Sumandhar Card */}
        <BorderBeamCard duration="normal">
          <div className="space-y-5">
            {/* Pill Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 font-sans text-[10px] tracking-[0.25em] uppercase text-[#B08D57] font-medium">
                THE GROOM
              </span>
              <span className="font-tamil text-lg text-[#F5E5C0]">
                மல்லி
              </span>
            </div>

            <div>
              <h3 className="font-script text-4xl sm:text-5xl text-[#F8F4ED]">
                Malli Sumandhar
              </h3>
              <p className="font-cormorant italic text-lg text-[#BFAEA0] mt-1">
                “The anchor, the calm, and the safe place.”
              </p>
            </div>

            {/* Parents Giving Away The Groom */}
            <div className="pt-4 border-t border-white/10 space-y-1.5">
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
                THE PARENTS GIVING AWAY THE GROOM
              </span>
              <p className="font-cormorant text-xl text-[#F8F4ED]">
                R.E. RAMESH KUMAR &amp; JAYASRI <span className="text-xs text-[#BFAEA0] font-sans uppercase tracking-[0.15em]">(LATE)</span>
              </p>
            </div>

            {/* Traits */}
            <ul className="space-y-2.5 pt-3 font-cormorant text-lg text-[#E6DBD0] border-t border-white/10">
              {[
                'Big heart, bigger plans',
                'Loves adventure & travel',
                "Rishma's safe place",
              ].map((trait, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#B08D57] shadow-[0_0_8px_rgba(176,141,87,0.8)] shrink-0" />
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>
        </BorderBeamCard>

        {/* Rishma John Card */}
        <BorderBeamCard duration="slow">
          <div className="space-y-5">
            {/* Pill Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 font-sans text-[10px] tracking-[0.25em] uppercase text-[#D95C80] font-medium">
                THE BRIDE
              </span>
              <span className="font-tamil text-lg text-[#F5E5C0]">
                ரிஷ்மா
              </span>
            </div>

            <div>
              <h3 className="font-script text-4xl sm:text-5xl text-[#F8F4ED]">
                Rishma John
              </h3>
              <p className="font-cormorant italic text-lg text-[#BFAEA0] mt-1">
                “The sunshine, the dreamer, and the joy.”
              </p>
            </div>

            {/* Parents Giving Away The Bride */}
            <div className="pt-4 border-t border-white/10 space-y-1.5">
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#D95C80] font-medium block">
                THE PARENTS GIVING AWAY THE BRIDE
              </span>
              <p className="font-cormorant text-xl text-[#F8F4ED]">
                JOHN THAIPARAMBIL &amp; CAROLINE JOHN
              </p>
            </div>

            {/* Traits */}
            <ul className="space-y-2.5 pt-3 font-cormorant text-lg text-[#E6DBD0] border-t border-white/10">
              {[
                'Soft heart, strong mind',
                'Finds joy in little things',
              ].map((trait, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D95C80] shadow-[0_0_8px_rgba(217,92,128,0.8)] shrink-0" />
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>
        </BorderBeamCard>

        {/* OK Kanmani Cinematic Reference Card */}
        <div className="relative rounded-[22px] p-6 sm:p-8 bg-[#12030A] border border-white/10 text-center ambient-glow-card">
          <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-sans text-[9px] tracking-[0.3em] uppercase text-[#B08D57] font-medium inline-block mb-3">
            A CINEMATIC DEVOTION
          </span>
          <blockquote className="font-cormorant italic text-xl sm:text-2xl text-[#F8F4ED] leading-relaxed max-w-lg mx-auto">
            “Rishma might be Malli’s <strong className="font-cinzel not-italic text-[#F5E5C0]">Tara</strong>, but Malli has always been Rishma’s <strong className="font-cinzel not-italic text-[#F5E5C0]">Ganapathy</strong>.”
          </blockquote>
          <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.25em] text-[#BFAEA0]">
            Two souls crafting their timeless story together
          </p>
        </div>
      </div>
    </section>
  )
}
