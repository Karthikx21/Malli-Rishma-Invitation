'use client'

export default function EditorialMarquee() {
  const tickerText =
    'TWO DAYS · TWO CULTURES · ONE CELEBRATION OF LOVE · #RISHMAFOUNDHERPAVAZHAMALLI · 18 & 20 NOVEMBER 2026 · COIMBATORE · '

  return (
    <div
      className="relative w-full bg-[#160309] text-[#E6CA85] border-y border-[#C5A059]/25 py-3 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-functional text-[10px] sm:text-xs tracking-[0.3em] font-light px-4">
          {tickerText}
        </span>
        <span className="font-functional text-[10px] sm:text-xs tracking-[0.3em] font-light px-4">
          {tickerText}
        </span>
        <span className="font-functional text-[10px] sm:text-xs tracking-[0.3em] font-light px-4">
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
          animation: marquee 40s linear infinite;
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
