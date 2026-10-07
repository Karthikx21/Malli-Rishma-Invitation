'use client'

import React from 'react'

interface StationeryFrameProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  variant?: 'light' | 'maroon'
}

/**
 * Bespoke luxury engraved stationery double-line frame:
 * 1px gold outer line, 6px gap, 1px gold inner line,
 * with small L-shaped gold corner ornaments drawn in SVG.
 */
export default function StationeryFrame({
  children,
  className = '',
  innerClassName = '',
  variant = 'light',
}: StationeryFrameProps) {
  const isMaroon = variant === 'maroon'

  return (
    <div
      className={`relative border border-[#B08D57] p-[6px] ${
        isMaroon ? 'bg-[#4B1424] text-[#F6EFE3]' : 'bg-[#F6EFE3] text-[#4B1424]'
      } ${className}`}
    >
      <div
        className={`relative border border-[#B08D57] p-6 sm:p-10 ${innerClassName}`}
      >
        {/* L-shaped gold corner ornament: Top-Left */}
        <svg
          className="absolute -top-[1px] -left-[1px] w-3.5 h-3.5 pointer-events-none"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 0 L14 0 M0 0 L0 14" stroke="#B08D57" strokeWidth="1.5" />
        </svg>

        {/* L-shaped gold corner ornament: Top-Right */}
        <svg
          className="absolute -top-[1px] -right-[1px] w-3.5 h-3.5 pointer-events-none"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="M14 0 L0 0 M14 0 L14 14" stroke="#B08D57" strokeWidth="1.5" />
        </svg>

        {/* L-shaped gold corner ornament: Bottom-Left */}
        <svg
          className="absolute -bottom-[1px] -left-[1px] w-3.5 h-3.5 pointer-events-none"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 14 L14 14 M0 14 L0 0" stroke="#B08D57" strokeWidth="1.5" />
        </svg>

        {/* L-shaped gold corner ornament: Bottom-Right */}
        <svg
          className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 pointer-events-none"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="M14 14 L0 14 M14 14 L14 0" stroke="#B08D57" strokeWidth="1.5" />
        </svg>

        {children}
      </div>
    </div>
  )
}
