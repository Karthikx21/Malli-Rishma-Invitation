'use client'

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
      className="relative w-full bg-[#1A0A0F] text-[#F4ECDD] py-20 px-4 sm:px-8 border-b border-[#B8893E]/40"
      aria-label="Wedding Venues Location and Maps"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8893E] font-medium font-sans mb-3">
          Location &amp; Directions
        </p>
        <h2 className="font-names text-4xl sm:text-5xl md:text-6xl text-[#F2DFB5] leading-none mb-3">
          Find us here
        </h2>
        <p className="text-sm sm:text-base text-[#F4ECDD]/80 font-sans tracking-wide">
          Scan, click, and come be a part of our big day!
        </p>
        <div className="w-16 h-px bg-[#B8893E]/50 mx-auto mt-6 mb-14" />

        {/* 3 Venue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {venues.map((v) => (
            <div
              key={v.name}
              className="editorial-dark-panel rounded-sm p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#B8893E]"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#B8893E] font-sans mb-3">
                  <span>{v.day}</span>
                  <span>{v.title}</span>
                </div>

                <h3 className="font-headline text-xl text-[#F4ECDD] mb-2 font-normal">
                  {v.name}
                </h3>

                <p className="text-xs text-[#F2DFB5]/80 font-sans mb-3">
                  {v.time}
                </p>

                <p className="text-xs text-[#F4ECDD]/70 font-sans leading-relaxed">
                  {v.address}
                </p>
              </div>

              {/* Google Maps Button */}
              <div className="mt-6 pt-4 border-t border-[#B8893E]/30">
                <a
                  href={v.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 border border-[#B8893E] bg-[#4A0F20]/60 hover:bg-[#B8893E] hover:text-[#1A0A0F] text-[#F4ECDD] text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
