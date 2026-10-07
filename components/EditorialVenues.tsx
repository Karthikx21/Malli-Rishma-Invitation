'use client'

import { motion } from 'framer-motion'

export default function EditorialVenues() {
  const venues = [
    {
      day: '18 Nov 2026',
      title: 'Christian Ceremony',
      name: 'Jenneys Residency',
      address: 'Avinashi Road, Coimbatore, Tamil Nadu',
      time: '6 PM to 10 PM',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Jenneys+Residency+Avinashi+Road+Coimbatore',
    },
    {
      day: '20 Nov 2026',
      title: 'Hindu Muhurtham',
      name: 'Kumaran Kundra Temple',
      address: 'Mettupalayam, Coimbatore District, Tamil Nadu',
      time: '6 AM to 7 AM',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Kumaran+Kundra+Temple+Mettupalayam',
    },
    {
      day: '20 Nov 2026',
      title: 'Reception & Lunch',
      name: 'Shri Lakshmi Hall',
      address: 'Mettupalayam – Annur Road, Coimbatore, Tamil Nadu',
      time: '11 AM to 2 PM, followed by lunch',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Shri+Lakshmi+Hall+Annur+Road+Mettupalayam',
    },
  ]

  return (
    <section
      id="venues"
      className="relative w-full bg-[#1A050D] text-[#FAF6EE] py-20 sm:py-28 px-6 sm:px-12 border-b border-[#C5A059]/30 overflow-hidden"
      aria-label="Wedding Venues Location and Maps"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-functional text-[10px] sm:text-xs text-[#C5A059] font-medium mb-2">
            LOCATION &amp; DIRECTIONS
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#FAF6EE] font-light tracking-tight mb-2">
            Find Us Here
          </h2>
          <p className="font-functional text-xs text-[#FAF6EE]/60 tracking-[0.2em] mt-1">
            SCAN, CLICK, AND COME BE A PART OF OUR BIG DAY
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto mt-4 mb-16"
          />
        </motion.div>

        {/* 3 Venues: Open Typographic Columns Separated by Delicate Gold Hairlines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-left">
          {venues.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, delay: 0.1 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col justify-between pt-6 border-t border-[#C5A059]/30 ${
                i > 0 ? 'md:border-t-0 md:border-l md:border-[#C5A059]/20 md:pl-8' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-functional text-[10px] text-[#C5A059] tracking-[0.25em]">
                  <span>{v.day}</span>
                  <span>{v.title}</span>
                </div>

                <h3 className="font-serif-title text-2xl sm:text-3xl text-[#FAF6EE] font-light mt-1">
                  {v.name}
                </h3>

                <p className="font-functional text-xs text-[#E6CA85] tracking-[0.1em]">
                  {v.time}
                </p>

                <p className="font-serif-title text-sm sm:text-base text-[#FAF6EE]/75 font-light leading-relaxed">
                  {v.address}
                </p>
              </div>

              {/* Text link with gold drawing underline */}
              <div className="pt-6">
                <a
                  href={v.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-link"
                >
                  VIEW ON GOOGLE MAPS ↗
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
