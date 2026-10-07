'use client'

export default function EditorialMarquee() {
  const tickerText =
    'TWO DAYS. TWO CULTURES. ONE CELEBRATION OF LOVE. · #RISHMAFOUNDHERPAVAZHAMALLI · 18 & 20 NOVEMBER 2026 · COIMBATORE · '

  return (
    <div
      className="relative w-full bg-[#1A0A0F] text-[#F2DFB5] border-y border-[#B8893E]/40 py-3 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-headline text-xs sm:text-sm tracking-[0.25em] uppercase font-light px-4">
          {tickerText}
        </span>
        <span className="font-headline text-xs sm:text-sm tracking-[0.25em] uppercase font-light px-4">
          {tickerText}
        </span>
        <span className="font-headline text-xs sm:text-sm tracking-[0.25em] uppercase font-light px-4">
          {tickerText}
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 35s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
