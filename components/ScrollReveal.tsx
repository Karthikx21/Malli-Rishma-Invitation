'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Scroll reveal: fade and rise 14px over 900ms with ease-out,
 * triggered once when entering viewport.
 * Respects prefers-reduced-motion by disabling reveals.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // If user prefers reduced motion, show immediately without motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const element = ref.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '900ms',
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-3.5 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  )
}
