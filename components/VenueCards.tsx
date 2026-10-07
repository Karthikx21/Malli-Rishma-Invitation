'use client'

import { Navigation } from 'lucide-react'
import BorderBeamCard from './BorderBeamCard'

/**
 * Modern luxury Venue Cards styled with BorderBeamCard:
 * - 3 dark obsidian cards with animated luminous border beams
 * - Smooth rounded corners and pill occasion tags
 * - Large Cinzel titles, Cormorant italic addresses
 * - Glowing rounded pill directions button with arrow icon
 */
export default function VenueCards() {
  const venues = [
    {
      name: 'Jenneys Residency',
      tamilName: 'ஜென்னிஸ் ரெசிடென்சி',
      occasion: '18 Nov · Christian Nuptials & Gala Dinner',
      time: '6:00 PM – 10:00 PM',
      address: '2/2, Avinashi Road, Civil Aerodrome Post, Peelamedu, Coimbatore',
      landmark: 'Near Coimbatore International Airport',
      mapUrl: 'https://maps.google.com/?q=Jenneys+Residency+Coimbatore',
      badgeColor: 'text-[#B08D57]',
    },
    {
      name: 'Kumaran Kundra Temple',
      tamilName: 'குமரன் குன்றா திருக்கோவில்',
      occasion: '20 Nov · Sacred Hindu Muhurtham',
      time: '6:00 AM – 7:00 AM',
      address: 'Kumaran Kundram, Coimbatore, Tamil Nadu',
      landmark: 'Hillside Temple Sanctum',
      mapUrl: 'https://maps.google.com/?q=Kumaran+Kundra+Temple',
      badgeColor: 'text-[#D95C80]',
    },
    {
      name: 'Shri Lakshmi Hall',
      tamilName: 'ஸ்ரீ லக்ஷ்மி மஹால்',
      occasion: '20 Nov · Grand Reception & Feast',
      time: '11:00 AM – 2:00 PM',
      address: 'Mettupalayam – Annur Road, Coimbatore District',
      landmark: 'Spacious Dining & Reception Hall',
      mapUrl: 'https://maps.google.com/?q=Shri+Lakshmi+Hall+Mettupalayam',
      badgeColor: 'text-[#B08D57]',
    },
  ]

  return (
    <section id="venues" className="relative my-20 sm:my-28 max-w-[640px] mx-auto px-4">
      {/* Bilingual Header */}
      <div className="text-center mb-10">
        <h2 className="font-tamil text-2xl sm:text-3xl text-[#F8F4ED] font-normal">
          வழிகாட்டி
        </h2>
        <span className="block font-sans text-[11px] uppercase tracking-[0.3em] text-[#B08D57] font-medium mt-1">
          VENUES &amp; LOCATIONS
        </span>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B08D57] to-transparent mx-auto mt-4" />
      </div>

      <div className="space-y-8">
        {venues.map((v, i) => (
          <BorderBeamCard key={i} duration={i === 1 ? 'slow' : 'normal'}>
            <article className="space-y-4">
              {/* Occasion & Timing Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3 gap-2">
                <span className={`px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-sans text-[10px] tracking-[0.2em] uppercase font-medium ${v.badgeColor}`}>
                  {v.occasion}
                </span>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#BFAEA0]">
                  {v.time}
                </span>
              </div>

              {/* Venue Name in Cinzel & Tamil */}
              <div>
                <h3 className="font-cinzel text-2xl sm:text-3xl text-[#F8F4ED] font-normal leading-snug">
                  {v.name}
                </h3>
                <p className="font-tamil text-base text-[#F5E5C0] mt-0.5">
                  {v.tamilName}
                </p>
              </div>

              {/* Address in Cormorant Italic */}
              <p className="font-cormorant italic text-lg text-[#E6DBD0] leading-relaxed pt-1">
                {v.address}
              </p>

              <div className="inline-block px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 font-cormorant text-sm text-[#BFAEA0]">
                Landmark: {v.landmark}
              </div>

              {/* Pill Directions Button */}
              <div className="pt-3">
                <a
                  href={v.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B08D57]/20 to-[#D95C80]/20 hover:from-[#B08D57]/30 hover:to-[#D95C80]/30 border border-[#B08D57]/50 hover:border-[#F5E5C0] text-[#F5E5C0] font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 group"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#B08D57] group-hover:translate-x-0.5 transition-transform" />
                  <span>GET DIRECTIONS →</span>
                </a>
              </div>
            </article>
          </BorderBeamCard>
        ))}
      </div>
    </section>
  )
}
