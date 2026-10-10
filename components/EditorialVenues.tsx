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
      highlightTime: 'Ring Exchange: 6:30 PM Sharp',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Jenneys+Residency+Avinashi+Road+Coimbatore',
    },
    {
      day: '20 Nov 2026',
      title: 'Muhurtham',
      name: 'Arulmigu Kalyana Subramaniya Swamy Temple',
      address: 'Kumarankundru, Mettupalayam, Coimbatore District, Tamil Nadu',
      time: '6 AM to 7 AM',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Arulmigu+Kalyana+Subramaniya+Swamy+Temple+Kumarankundru+Mettupalayam',
    },
    {
      day: '20 Nov 2026',
      title: 'Reception',
      name: 'Shri Lakshmi Hall',
      address: 'Mettupalayam – Annur Road, Coimbatore, Tamil Nadu',
      time: '11 AM to 2 PM',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Shri+Lakshmi+Hall+Annur+Road+Mettupalayam',
    },
  ]

  return (
    <section
      id="venues"
      className="relative w-full bg-[#140F1D] text-[#FAF6EE] py-24 sm:py-32 px-6 sm:px-12 border-y border-[#3D2C52]/50 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 50% 30%, #251838 0%, #171122 55%, #110C18 100%)',
      }}
      aria-label="Wedding Venues Location and Maps"
    >
      {/* Ambient Radial Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[680px] h-[360px] sm:h-[480px] rounded-full pointer-events-none blur-[120px] sm:blur-[160px] opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(230,202,133,0.25) 0%, rgba(141,118,168,0.4) 55%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Atmospheric Mist */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(141,118,168,0.1)_0%,transparent_50%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-functional text-[10px] sm:text-xs text-[#E6CA85] font-semibold mb-2 tracking-[0.25em]">
            LOCATION &amp; DIRECTIONS
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#FAF6EE] font-light tracking-tight mb-2">
            Find Us Here
          </h2>
          <p className="font-functional text-xs text-[#D8CEE5]/75 tracking-[0.2em] mt-1">
            CLICK AND COME BE A PART OF OUR BIG DAY
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#E6CA85]/60 to-transparent mx-auto mt-4 mb-16"
          />
        </motion.div>

        {/* 3 Venues: Open Typographic Columns Separated by Delicate Gold/Lavender Hairlines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-left">
          {venues.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 1.1,
                delay: 0.1 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
                y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              }}
              className={`flex flex-col justify-between pt-6 border-t border-[#3D2C52]/70 group ${
                i > 0 ? 'md:border-t-0 md:border-l md:border-[#3D2C52]/70 md:pl-8' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-functional text-[10px] text-[#E6CA85] tracking-[0.25em] font-semibold">
                  <span>{v.day}</span>
                  <span className="text-[#D8CEE5]/80">{v.title}</span>
                </div>

                <h3 className="font-serif-title text-2xl sm:text-3xl text-[#FAF6EE] font-light mt-1 group-hover:text-[#E6CA85] transition-colors duration-300">
                  {v.name}
                </h3>

                <div className="space-y-1">
                  <p className="font-functional text-xs text-[#E6CA85] tracking-[0.1em] font-medium">
                    {v.time}
                  </p>
                  {'highlightTime' in v && v.highlightTime && (
                    <p className="font-functional text-[11px] text-[#FAF6EE]/90 tracking-[0.1em] font-semibold">
                      <span className="text-[#E6CA85]">RING EXCHANGE:</span> 6:30 PM SHARP
                    </p>
                  )}
                </div>

                <p className="font-serif-title text-sm sm:text-base text-[#FAF6EE]/75 font-light leading-relaxed">
                  {v.address}
                </p>
              </div>

              {/* Text link with gold drawing underline */}
              <div className="pt-6">
                <motion.a
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  href={v.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-link text-xs tracking-[0.28em] inline-flex items-center"
                >
                  VIEW ON GOOGLE MAPS ↗
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
