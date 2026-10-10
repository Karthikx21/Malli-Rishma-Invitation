'use client'

import { motion } from 'framer-motion'

export default function EditorialMarquee() {
  const tickerText =
    'TWO DAYS · TWO CULTURES · ONE CELEBRATION OF LOVE · #RISHMAFOUNDHERPAVAZHAMALLI · 18 & 20 NOVEMBER 2026 · COIMBATORE | METTUPALAYAM · '

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[#FAF8FC] text-[#8D76A8] border-y border-[#D8CEE5]/60 py-3 overflow-hidden select-none cursor-default"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-functional text-[10px] sm:text-xs tracking-[0.3em] font-medium px-4 text-[#8D76A8]">
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
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </motion.div>
  )
}
