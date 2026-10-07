'use client'

import { useEffect, useRef, useState } from 'react'

interface Petal {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  rotation: number
  rotationSpeed: number
  opacity: number
  petalCount: number
  oscillationSpeed: number
  oscillationOffset: number
}

/**
 * Bespoke Pavazha Malli (Coral Jasmine) petals canvas:
 * - Reduced to 8-12 slow petals
 * - Zero gold sparkles
 * - Max opacity 0.45 (strictly <= 0.5)
 * - Pauses automatically when tab is hidden
 * - Respects prefers-reduced-motion by disabling entirely
 */
export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        setReducedMotion(true)
        return
      }
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Exactly 10 delicate Pavazha Malli petals (between 8 and 12)
    const petals: Petal[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 6 + Math.random() * 5,
      speedY: 0.25 + Math.random() * 0.35, // slow drift
      speedX: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.008,
      opacity: 0.25 + Math.random() * 0.2, // max 0.45, well under 0.5
      petalCount: 5 + Math.floor(Math.random() * 3), // 5-7 slender white petals
      oscillationSpeed: 0.008 + Math.random() * 0.008,
      oscillationOffset: Math.random() * Math.PI * 2,
    }))

    let time = 0
    let isPaused = false

    const render = () => {
      if (isPaused) return

      time += 0.02
      ctx.clearRect(0, 0, width, height)

      // Draw each Pavazha Malli flower drifting gently downwards
      petals.forEach((p) => {
        p.y += p.speedY
        p.x += p.speedX + Math.sin(time * p.oscillationSpeed * 10 + p.oscillationOffset) * 0.4
        p.rotation += p.rotationSpeed

        // Wrap around smoothly when leaving screen bounds
        if (p.y > height + 25) {
          p.y = -25
          p.x = Math.random() * width
        }
        if (p.x < -25) p.x = width + 25
        if (p.x > width + 25) p.x = -25

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity

        // Slender white petals radiating from center
        const angleStep = (Math.PI * 2) / p.petalCount
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'

        for (let i = 0; i < p.petalCount; i++) {
          ctx.save()
          ctx.rotate(i * angleStep)
          ctx.beginPath()
          ctx.ellipse(0, -p.size * 0.65, p.size * 0.28, p.size * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        // Distinct coral-orange tube center of Pavazha Malli (Parijat)
        ctx.beginPath()
        ctx.arc(0, 0, p.size * 0.24, 0, Math.PI * 2)
        ctx.fillStyle = '#E85D38'
        ctx.fill()

        // Tiny inner antique gold pinhead
        ctx.beginPath()
        ctx.arc(0, 0, p.size * 0.1, 0, Math.PI * 2)
        ctx.fillStyle = '#B08D57'
        ctx.fill()

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    // Handle tab visibility: pause canvas when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true
        cancelAnimationFrame(animationFrameId)
      } else {
        isPaused = false
        animationFrameId = requestAnimationFrame(render)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Start render loop
    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  )
}
