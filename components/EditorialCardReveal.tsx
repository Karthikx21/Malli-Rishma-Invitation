'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface EditorialCardRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  scale?: boolean
}

/**
 * EditorialCardReveal:
 * Luxury Framer Motion wrapper for silky, card-by-card scroll reveals.
 * Uses high-end editorial cubic-bezier easing ([0.16, 1, 0.3, 1]).
 * Automatically respects prefers-reduced-motion.
 */
export default function EditorialCardReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  direction = 'up',
  scale = false,
}: EditorialCardRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 40, x: 0 }
      case 'down':
        return { y: -40, x: 0 }
      case 'left':
        return { x: 40, y: 0 }
      case 'right':
        return { x: -40, y: 0 }
      default:
        return { x: 0, y: 0 }
    }
  }

  const offset = getOffset()

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: scale ? 0.96 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
