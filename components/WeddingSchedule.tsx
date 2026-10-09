'use client'

import { useState } from 'react'
import { Calendar, Navigation } from 'lucide-react'
import BorderBeamCard from './BorderBeamCard'

/**
 * Modern luxury Wedding Schedule with Border Beam card styling:
 * - Rounded pill switch for 18 Nov & 20 Nov
 * - BorderBeamCard with dark obsidian velvet glass
 * - Glowing timeline nodes and pill time badges
 * - Full calendar (.ics) and Google Maps navigation preserved
 */
export default function WeddingSchedule() {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1')

  const downloadIcs = (
    title: string,
    details: string,
    location: string,
    startIso: string,
    endIso: string,
    filename: string
  ) => {
    const start = startIso.replace(/[-:]/g, '').split('.')[0] + 'Z'
    const end = endIso.replace(/[-:]/g, '').split('.')[0] + 'Z'
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Malli & Rishma Wedding//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${location}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', `${filename}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const day1Timeline = [
    {
      time: '06:00 PM',
      title: 'Welcome & Fellowship',
      desc: 'Welcoming family and cherished guests to Jenneys Residency with warm greetings and fellowship.',
    },
    {
      time: '06:30 PM',
      title: 'Solemn Exchange of Rings',
      desc: 'Exchange of vows, blessed rings, and eternal promises in the presence of loved ones.',
    },
    {
      time: '06:45 PM',
      title: 'Lighting of the Unity Candle',
      desc: 'Two families united in shared faith, grace, and enduring love.',
    },
    {
      time: '07:00 PM Onwards',
      title: 'Gala Dinner, Toasts & Joy',
      desc: 'An evening of celebration, banquet dining, toasts, and lifelong memories.',
    },
  ]

  const day2Timeline = [
    {
      time: '06:00 AM – 07:00 AM',
      title: 'Sacred Muhurtham & Thali Kettu',
      location: 'Kumarankundru Temple',
      desc: 'Auspicious Vedic chants, Mangala Vaathiyam, Thali tying ceremony, and divine blessings at the hillside sanctum.',
    },
    {
      time: '11:00 AM – 02:00 PM',
      title: 'Grand Reception',
      location: 'Shri Lakshmi Hall, Mettupalayam',
      desc: 'Welcoming the newlyweds on the ceremonial stage at Shri Lakshmi Hall.',
    },
  ]

  return (
    <section id="schedule" className="relative my-20 sm:my-28 max-w-[640px] mx-auto px-4">
      {/* Bilingual Header */}
      <div className="text-center mb-10">
        <h2 className="font-tamil text-2xl sm:text-3xl text-[#F8F4ED] font-normal">
          திருக்கல்யாண வைபவம்
        </h2>
        <span className="block font-sans text-[11px] uppercase tracking-[0.3em] text-[#B08D57] font-medium mt-1">
          THE SACRED CELEBRATIONS
        </span>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B08D57] to-transparent mx-auto mt-4" />
      </div>

      {/* Day Selector Pill Switch */}
      <div className="flex justify-center mb-8">
        <div className="relative inline-flex items-center p-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveDay('day1')}
            className={`px-5 sm:px-6 py-2 rounded-full font-sans text-[11px] sm:text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer ${
              activeDay === 'day1'
                ? 'bg-gradient-to-r from-[#B08D57] via-[#C99E63] to-[#D95C80] text-[#0C0207] font-semibold shadow-[0_0_20px_rgba(176,141,87,0.4)]'
                : 'text-[#BFAEA0] hover:text-[#F8F4ED]'
            }`}
          >
            18 NOVEMBER
          </button>

          <button
            onClick={() => setActiveDay('day2')}
            className={`px-5 sm:px-6 py-2 rounded-full font-sans text-[11px] sm:text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer ${
              activeDay === 'day2'
                ? 'bg-gradient-to-r from-[#B08D57] via-[#C99E63] to-[#D95C80] text-[#0C0207] font-semibold shadow-[0_0_20px_rgba(176,141,87,0.4)]'
                : 'text-[#BFAEA0] hover:text-[#F8F4ED]'
            }`}
          >
            20 NOVEMBER
          </button>
        </div>
      </div>

      {/* Main Schedule Border Beam Card */}
      <BorderBeamCard duration="slow">
        {activeDay === 'day1' ? (
          <div className="space-y-6">
            {/* Header info */}
            <div className="text-center pb-6 border-b border-white/10">
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-sans text-[9px] tracking-[0.3em] uppercase text-[#B08D57] font-medium inline-block mb-3">
                CHAPTER I · CHRISTIAN CEREMONY
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-[#F8F4ED] font-normal">
                Christian Nuptials &amp; Gala Dinner
              </h3>
              <p className="font-cormorant italic text-lg text-[#F5E5C0] mt-1">
                Jenneys Residency, Avinashi Road, Peelamedu, Coimbatore
              </p>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#BFAEA0] mt-1">
                WEDNESDAY, 18 NOVEMBER 2026 · 6:00 PM TO 10:00 PM IST
              </p>
            </div>

            {/* Glowing Hairline Timeline */}
            <div className="relative my-8 pl-4 sm:pl-6 space-y-7 before:absolute before:top-2 before:bottom-2 before:left-[7px] sm:before:left-[9px] before:w-[1.5px] before:bg-gradient-to-b before:from-[#B08D57] before:via-[#D95C80] before:to-[#B08D57]">
              {day1Timeline.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Glowing Node on Timeline */}
                  <div
                    className="w-3 h-3 rounded-full bg-[#B08D57] shadow-[0_0_10px_rgba(176,141,87,0.9)] border-2 border-[#12030A] shrink-0 mt-1 -ml-[14px] sm:-ml-[16px]"
                    aria-hidden="true"
                  />

                  <div className="flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 font-sans text-[9px] uppercase tracking-[0.2em] text-[#B08D57] font-medium">
                      {item.time}
                    </span>
                    <h4 className="font-cormorant text-xl text-[#F8F4ED] font-semibold mt-1">
                      {item.title}
                    </h4>
                    <p className="font-cormorant text-base text-[#BFAEA0] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons with Pill Styling */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href="https://maps.google.com/?q=Jenneys+Residency+Coimbatore"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-[#F8F4ED] font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300"
              >
                <Navigation className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>GET DIRECTIONS →</span>
              </a>

              <button
                onClick={() =>
                  downloadIcs(
                    'Malli & Rishma · Christian Nuptials',
                    'Christian Nuptials and Gala Dinner of Malli Sumandhar & Rishma John.',
                    'Jenneys Residency, Avinashi Road, Coimbatore',
                    '2026-11-18T12:30:00.000Z',
                    '2026-11-18T16:30:00.000Z',
                    'Malli_Rishma_Christian_Nuptials'
                  )
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B08D57]/20 to-[#D95C80]/20 hover:from-[#B08D57]/30 hover:to-[#D95C80]/30 border border-[#B08D57]/50 text-[#F5E5C0] font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>ADD TO CALENDAR</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header info */}
            <div className="text-center pb-6 border-b border-white/10">
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-sans text-[9px] tracking-[0.3em] uppercase text-[#D95C80] font-medium inline-block mb-3">
                CHAPTER II · HINDU CEREMONY
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-[#F8F4ED] font-normal">
                Sacred Muhurtham &amp; Reception
              </h3>
              <p className="font-tamil text-lg text-[#F5E5C0] mt-1">
                முகூர்த்தம் · வரவேற்பு
              </p>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#BFAEA0] mt-1">
                FRIDAY, 20 NOVEMBER 2026 · COIMBATORE DISTRICT
              </p>
            </div>

            {/* Glowing Hairline Timeline */}
            <div className="relative my-8 pl-4 sm:pl-6 space-y-7 before:absolute before:top-2 before:bottom-2 before:left-[7px] sm:before:left-[9px] before:w-[1.5px] before:bg-gradient-to-b before:from-[#B08D57] before:via-[#D95C80] before:to-[#B08D57]">
              {day2Timeline.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Glowing Node on Timeline */}
                  <div
                    className="w-3 h-3 rounded-full bg-[#D95C80] shadow-[0_0_10px_rgba(217,92,128,0.9)] border-2 border-[#12030A] shrink-0 mt-1 -ml-[14px] sm:-ml-[16px]"
                    aria-hidden="true"
                  />

                  <div className="flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 font-sans text-[9px] uppercase tracking-[0.2em] text-[#D95C80] font-medium">
                      {item.time}
                    </span>
                    <h4 className="font-cormorant text-xl text-[#F8F4ED] font-semibold mt-1">
                      {item.title}
                    </h4>
                    <p className="font-cormorant italic text-base text-[#F5E5C0]">
                      {item.location}
                    </p>
                    <p className="font-cormorant text-base text-[#BFAEA0] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <a
                  href="https://maps.google.com/?q=Kumarankundru+Temple"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-[#F8F4ED] font-sans text-xs uppercase tracking-[0.18em] transition-all"
                >
                  <Navigation className="w-3 h-3 text-[#B08D57]" />
                  <span>TEMPLE MAP</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Shri+Lakshmi+Hall+Mettupalayam"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-[#F8F4ED] font-sans text-xs uppercase tracking-[0.18em] transition-all"
                >
                  <Navigation className="w-3 h-3 text-[#B08D57]" />
                  <span>RECEPTION MAP</span>
                </a>
              </div>

              <button
                onClick={() =>
                  downloadIcs(
                    'Malli & Rishma · Muhurtham & Reception',
                    'Traditional Muhurtham at Kumarankundru Temple followed by Reception at Shri Lakshmi Hall, Mettupalayam.',
                    'Kumarankundru Temple & Shri Lakshmi Hall, Coimbatore',
                    '2026-11-20T00:30:00.000Z',
                    '2026-11-20T08:30:00.000Z',
                    'Malli_Rishma_Hindu_Wedding'
                  )
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B08D57]/20 to-[#D95C80]/20 hover:from-[#B08D57]/30 hover:to-[#D95C80]/30 border border-[#B08D57]/50 text-[#F5E5C0] font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>ADD TO CALENDAR</span>
              </button>
            </div>
          </div>
        )}
      </BorderBeamCard>
    </section>
  )
}
