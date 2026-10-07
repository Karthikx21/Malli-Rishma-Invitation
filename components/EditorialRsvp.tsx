'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function EditorialRsvp() {
  const [name, setName] = useState('')
  const [guestCount, setGuestCount] = useState(2)
  const [attending18, setAttending18] = useState(true)
  const [attending20, setAttending20] = useState(true)
  const [note, setNote] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#C5A059', '#E6CA85', '#3D0B1B'],
        })
      } catch {
        // Safe fallback
      }
    }, 500)
  }

  // Pre-filled WhatsApp message
  const getWhatsAppMessage = () => {
    const days = []
    if (attending18) days.push('18 Nov (Ring Exchange)')
    if (attending20) days.push('20 Nov (Hindu Wedding & Reception)')
    const text = `Hi Rishma & Malli! 🎉\n\nI am thrilled to RSVP for your wedding!\n\nName: ${name || 'Guest'}\nGuests: ${guestCount}\nAttending: ${days.join(', ') || 'Both Days'}\nNote: ${note || 'So happy for you both!'}\n\n#RishmaFoundHerPavazhaMalli`
    return encodeURIComponent(text)
  }

  return (
    <section
      id="rsvp"
      className="relative w-full bg-[#FAF6EE] text-[#1A0A0F] py-20 sm:py-28 px-6 sm:px-12 border-b border-[#C5A059]/30 overflow-hidden"
      aria-label="Wedding RSVP Section"
    >
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-tamil text-sm text-[#9B702A] tracking-widest mb-1">
            வருவீர்களா?
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#3D0B1B] font-light tracking-tight mb-2">
            Will You Join Us?
          </h2>
          <p className="font-functional text-xs text-[#1A0A0F]/60 tracking-[0.25em]">
            R S V P
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto mt-4"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            /* Confirmation Screen (NO BOXED CARD) */
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center space-y-6 py-6 border-t border-b border-[#C5A059]/30"
            >
              {/* Confirmation Seal */}
              <div className="w-14 h-14 rounded-full border border-[#9B702A] mx-auto flex items-center justify-center p-0.5">
                <div className="w-full h-full rounded-full border border-[#9B702A]/40 flex items-center justify-center text-[#9B702A]">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </div>

              <h3 className="font-serif-title text-3xl sm:text-4xl text-[#3D0B1B] font-light">
                Thank You, {name}!
              </h3>
              <p className="font-serif-title text-base sm:text-lg text-[#1A0A0F]/80 font-light leading-relaxed max-w-md mx-auto">
                We cannot wait to celebrate with you in Coimbatore. Your RSVP has been recorded.
              </p>

              <div className="pt-4 space-y-4">
                <div>
                  <a
                    href={`https://wa.me/?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-link-dark text-xs tracking-[0.25em]"
                  >
                    SEND CONFIRMATION VIA WHATSAPP →
                  </a>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="gold-link-dark text-[10px] tracking-[0.2em] opacity-70 hover:opacity-100"
                  >
                    EDIT RSVP DETAILS ↺
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* RSVP Form: Pure Open Typography with Underline Hairline Inputs (NO BOXED CARD) */
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
            {/* Guest Name */}
            <div className="space-y-1">
              <label
                htmlFor="guest-name"
                className="block font-functional text-[10px] text-[#9B702A] font-semibold tracking-[0.25em]"
              >
                YOUR NAME *
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full editorial-input py-2.5 text-xl sm:text-2xl font-serif-title text-[#1A0A0F] placeholder:text-[#1A0A0F]/25 placeholder:font-light"
              />
            </div>

            {/* Guest Stepper */}
            <div className="space-y-2">
              <label className="block font-functional text-[10px] text-[#9B702A] font-semibold tracking-[0.25em]">
                HOW MANY OF YOU?
              </label>
              <div className="flex items-center justify-between border-b border-[#C5A059]/40 pb-2.5">
                <span className="font-serif-title text-xl sm:text-2xl text-[#1A0A0F] font-light">
                  {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-full border border-[#C5A059]/60 text-[#3D0B1B] hover:border-[#3D0B1B] flex items-center justify-center font-sans text-base transition-colors cursor-pointer"
                    aria-label="Decrease guest count"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                    className="w-8 h-8 rounded-full border border-[#C5A059]/60 text-[#3D0B1B] hover:border-[#3D0B1B] flex items-center justify-center font-sans text-base transition-colors cursor-pointer"
                    aria-label="Increase guest count"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Joining Us For Checkboxes */}
            <div className="space-y-3">
              <label className="block font-functional text-[10px] text-[#9B702A] font-semibold tracking-[0.25em]">
                JOINING US FOR
              </label>
              <div className="space-y-2.5 font-functional text-xs tracking-[0.1em] lowercase">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={attending18}
                    onChange={(e) => setAttending18(e.target.checked)}
                    className="w-4 h-4 accent-[#3D0B1B] cursor-pointer"
                  />
                  <span className="text-[#1A0A0F]">
                    18 Nov · Ring exchange ceremony
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={attending20}
                    onChange={(e) => setAttending20(e.target.checked)}
                    className="w-4 h-4 accent-[#3D0B1B] cursor-pointer"
                  />
                  <span className="text-[#1A0A0F]">
                    20 Nov · Hindu wedding &amp; reception
                  </span>
                </label>
              </div>
            </div>

            {/* A note for the couple */}
            <div className="space-y-1">
              <label
                htmlFor="guest-note"
                className="block font-functional text-[10px] text-[#9B702A] font-semibold tracking-[0.25em]"
              >
                A NOTE FOR THE COUPLE
              </label>
              <textarea
                id="guest-note"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Warm wishes, blessings, or dietary notes..."
                className="w-full editorial-input py-2 text-base sm:text-lg font-serif-title text-[#1A0A0F] placeholder:text-[#1A0A0F]/25 placeholder:font-light resize-none"
              />
            </div>

            {/* Submit Text Link Action */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-link-dark text-xs tracking-[0.3em]"
              >
                {isSubmitting ? 'RECORDING... ' : 'SUBMIT RSVP →'}
              </button>
            </div>
          </motion.form>
        )}
        </AnimatePresence>
      </div>
    </section>
  )
}
