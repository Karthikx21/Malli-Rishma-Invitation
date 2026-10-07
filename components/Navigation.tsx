'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  onReplayVideo?: () => void
}

export default function Navigation({ onReplayVideo }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#story', label: 'Our Story' },
    { href: '#couple', label: 'The Couple' },
    { href: '#schedule', label: 'Schedule' },
    { href: '#venues', label: 'Venues' },
    { href: '#dress-code', label: 'Dress Code' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0A0206]/90 border-b border-white/10 backdrop-blur-md'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-[640px] mx-auto px-4 flex items-center justify-between">
        {/* Monogram Brand */}
        <a
          href="#invitation"
          className="flex items-center gap-2.5 text-[#F8F4ED]"
        >
          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-[#B08D57]/40 flex items-center justify-center font-cinzel text-xs text-[#F5E5C0]">
            RM
          </div>
          <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#F8F4ED]">
            Rishma &amp; Malli
          </span>
        </a>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {onReplayVideo && (
            <button
              onClick={onReplayVideo}
              className="hidden sm:inline-block px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[10px] font-sans uppercase tracking-[0.2em] text-[#BFAEA0] hover:text-[#F8F4ED] transition-colors"
            >
              Replay Intro
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F8F4ED] bg-transparent border-0"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="bg-[#0A0206]/98 border-b border-white/10 px-6 py-6 space-y-3 backdrop-blur-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-sans text-xs uppercase tracking-[0.25em] text-[#F8F4ED] py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          {onReplayVideo && (
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onReplayVideo()
              }}
              className="w-full text-left font-sans text-xs uppercase tracking-[0.25em] text-[#B08D57] py-2 bg-transparent border-0"
            >
              Replay Opening
            </button>
          )}
        </div>
      )}
    </header>
  )
}
