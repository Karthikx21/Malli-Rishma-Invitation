'use client'

import React from 'react'

interface BorderBeamCardProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  duration?: 'normal' | 'slow' | 'fast'
  activeBeam?: boolean
}

/**
 * Modern luxury dark card inspired by Jakub Antalik's Border Beam:
 * - Smooth rounded corners (rounded-[26px])
 * - Rotating luminous Border Beam (champagne gold, rose-wine, warm white)
 * - Deep velvet obsidian surface with subtle top specular highlight
 * - Ambient drop shadow and inner luster
 */
export default function BorderBeamCard({
  children,
  className = '',
  innerClassName = '',
  duration = 'normal',
  activeBeam = true,
}: BorderBeamCardProps) {
  const durationClass =
    duration === 'slow'
      ? 'animate-border-beam-slow'
      : duration === 'fast'
      ? 'animate-border-beam-fast'
      : 'animate-border-beam'

  return (
    <div
      className={`relative rounded-[26px] p-[1px] overflow-hidden group transition-all duration-500 bg-[#14030B] border border-white/5 ambient-glow-card ambient-glow-hover ${className}`}
    >
      {/* Animated Rotating Border Beam */}
      {activeBeam && (
        <div
          className={`absolute -inset-[180%] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500 ${durationClass}`}
          aria-hidden="true"
        >
          <div className="w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,#B08D57_305deg,#FFF2D6_330deg,#D95C80_350deg,#B08D57_360deg)]" />
        </div>
      )}

      {/* Inner Card Body */}
      <div
        className={`relative z-10 rounded-[25px] bg-gradient-to-b from-[#1C0612]/95 via-[#13030B]/98 to-[#0C0207] p-6 sm:p-10 text-[#F8F4ED] ${innerClassName}`}
      >
        {/* Subtle Top Specular Sheen */}
        <div
          className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#E8D09E]/35 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {children}
      </div>
    </div>
  )
}
