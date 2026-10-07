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

  // Pre-filled WhatsApp and Email URL generators
  const getWhatsAppUrl = () => {
    let daysText = 'Both Celebrations (18 Nov Christian Nuptials & 20 Nov Hindu Wedding)'
    if (attending18 && !attending20) {
      daysText = '18 Nov (Christian Nuptials)'
    } else if (!attending18 && attending20) {
      daysText = '20 Nov (Hindu Wedding & Reception)'
    }
    const guestName = name.trim() || 'Guest'
    const noteLine = note.trim() ? `\nNote: ${note.trim()}` : ''
    const text = `Hi Rishma & Malli,\n\nI am delighted to RSVP for your wedding celebrations!\n\nName: ${guestName}\nGuests: ${guestCount}\nAttending: ${daysText}${noteLine}\n\n#RishmaFoundHerPavazhaMalli`
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
  }

  const getEmailUrl = () => {
    let daysText = 'Both Celebrations (18 Nov Christian Nuptials & 20 Nov Hindu Wedding)'
    if (attending18 && !attending20) {
      daysText = '18 Nov (Christian Nuptials)'
    } else if (!attending18 && attending20) {
      daysText = '20 Nov (Hindu Wedding & Reception)'
    }
    const guestName = name.trim() || 'Guest'
    const subject = `Wedding RSVP - ${guestName}`
    const noteLine = note.trim() ? `\nNote: ${note.trim()}` : ''
    const body = `Hi Rishma & Malli,\n\nI would love to RSVP for your wedding celebration!\n\nName: ${guestName}\nGuests: ${guestCount}\nAttending: ${daysText}${noteLine}\n\nWarm regards,\n${guestName}`
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)

    // WhatsApp send on submit
    const waUrl = getWhatsAppUrl()
    try {
      window.open(waUrl, '_blank')
    } catch {
      // Handled if browser restricts popups
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#C5A059', '#E6CA85', '#B8A9C9', '#D8CEE5'],
        })
      } catch {
        // Safe fallback
      }
    }, 400)
  }

  // Date selection helpers
  const selectPreset = (preset: 'both' | '18' | '20') => {
    if (preset === 'both') {
      setAttending18(true)
      setAttending20(true)
    } else if (preset === '18') {
      setAttending18(true)
      setAttending20(false)
    } else if (preset === '20') {
      setAttending18(false)
      setAttending20(true)
    }
  }

  return (
    <section
      id="rsvp"
      className="relative w-full bg-[#FAF8FC] text-[#2D2338] py-20 sm:py-28 px-6 sm:px-12 border-b border-[#E5DCF0] overflow-hidden"
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
          <p className="font-tamil text-sm text-[#8D76A8] tracking-widest mb-1">
            வருவீர்களா?
          </p>
          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#2D2338] font-light tracking-tight mb-2">
            Will You Join Us?
          </h2>
          <p className="font-functional text-xs text-[#8D76A8] tracking-[0.25em] font-medium">
            R S V P
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#8D76A8]/50 to-transparent mx-auto mt-4"
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
              className="text-center space-y-6 py-6 border-t border-b border-[#E5DCF0]"
            >
              {/* Confirmation Seal */}
              <div className="w-14 h-14 rounded-full border border-[#8D76A8] mx-auto flex items-center justify-center p-0.5">
                <div className="w-full h-full rounded-full border border-[#8D76A8]/40 flex items-center justify-center text-[#8D76A8]">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </div>

              <h3 className="font-serif-title text-3xl sm:text-4xl text-[#2D2338] font-light">
                Thank You, {name}!
              </h3>

              <div className="inline-block py-1 px-4 rounded-full bg-[#EFEAF5] border border-[#D8CEE5] text-[11px] font-functional text-[#8D76A8] font-semibold tracking-wider">
                {attending18 && attending20
                  ? 'Attending Both Celebrations (18 & 20 Nov)'
                  : attending18
                  ? 'Attending Christian Nuptials (18 Nov)'
                  : 'Attending Hindu Wedding & Reception (20 Nov)'}
                {' · '}{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
              </div>

              <p className="font-serif-title text-base sm:text-lg text-[#2D2338]/80 font-light leading-relaxed max-w-md mx-auto">
                We cannot wait to celebrate with you in Coimbatore. Your RSVP has been recorded.
              </p>

              <div className="pt-4 space-y-3.5">
                <div>
                  <motion.a
                    whileHover={{ scale: 1.04, x: 2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-link-dark text-xs tracking-[0.25em] inline-block font-semibold"
                  >
                    SEND VIA WHATSAPP →
                  </motion.a>
                </div>

                <div>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    href={getEmailUrl()}
                    className="gold-link-dark text-[10px] tracking-[0.2em] opacity-80 hover:opacity-100 inline-block"
                  >
                    OR SEND VIA EMAIL ✉️
                  </motion.a>
                </div>

                <div className="pt-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsSubmitted(false)}
                    className="gold-link-dark text-[10px] tracking-[0.2em] opacity-60 hover:opacity-100"
                  >
                    EDIT RSVP DETAILS ↺
                  </motion.button>
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
                className="block font-functional text-[10px] text-[#8D76A8] font-semibold tracking-[0.25em]"
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
                className="w-full editorial-input py-2.5 text-xl sm:text-2xl font-serif-title text-[#2D2338] placeholder:text-[#2D2338]/25 placeholder:font-light"
              />
            </div>

            {/* Guest Stepper */}
            <div className="space-y-2">
              <label className="block font-functional text-[10px] text-[#8D76A8] font-semibold tracking-[0.25em]">
                HOW MANY OF YOU?
              </label>
              <div className="flex items-center justify-between border-b border-[#E5DCF0] pb-2.5">
                <span className="font-serif-title text-xl sm:text-2xl text-[#2D2338] font-light">
                  {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                </span>
                <div className="flex items-center gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-full border border-[#D8CEE5] text-[#8D76A8] hover:border-[#8D76A8] flex items-center justify-center font-sans text-base transition-colors cursor-pointer"
                    aria-label="Decrease guest count"
                  >
                    -
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                    className="w-8 h-8 rounded-full border border-[#D8CEE5] text-[#8D76A8] hover:border-[#8D76A8] flex items-center justify-center font-sans text-base transition-colors cursor-pointer"
                    aria-label="Increase guest count"
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Event Date Picking / Selection - Just the dates, clean editorial */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <label className="block font-functional text-[10px] text-[#8D76A8] font-semibold tracking-[0.25em]">
                  WHICH DATES WILL YOU ATTEND? *
                </label>
                <span className="font-functional text-[9px] text-[#8D76A8] font-semibold tracking-wider">
                  {attending18 && attending20
                    ? 'BOTH DATES SELECTED'
                    : attending18
                    ? '18 NOV ONLY'
                    : '20 NOV ONLY'}
                </span>
              </div>

              {/* Date Buttons Only: 18 Nov, 20 Nov, or Both */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => selectPreset('18')}
                  className={`py-2.5 px-1.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    attending18 && !attending20
                      ? 'border-[#8D76A8] bg-[#8D76A8] text-[#FFFFFF] shadow-sm font-semibold'
                      : 'border-[#E5DCF0] bg-[#FFFFFF] text-[#2D2338]/80 hover:border-[#8D76A8]/50'
                  }`}
                >
                  <span className="font-functional text-[11px] sm:text-xs tracking-[0.16em]">
                    {attending18 && !attending20 ? '✓ ' : ''}18 NOV
                  </span>
                  <span
                    className={`font-functional text-[8px] tracking-wider ${
                      attending18 && !attending20 ? 'text-[#FFFFFF]/85' : 'text-[#8D76A8]'
                    }`}
                  >
                    WEDNESDAY
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => selectPreset('20')}
                  className={`py-2.5 px-1.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    !attending18 && attending20
                      ? 'border-[#C2671A] bg-[#C2671A] text-[#FFFFFF] shadow-sm font-semibold'
                      : 'border-[#E5DCF0] bg-[#FFFFFF] text-[#2D2338]/80 hover:border-[#C2671A]/50'
                  }`}
                >
                  <span className="font-functional text-[11px] sm:text-xs tracking-[0.16em]">
                    {!attending18 && attending20 ? '✓ ' : ''}20 NOV
                  </span>
                  <span
                    className={`font-functional text-[8px] tracking-wider ${
                      !attending18 && attending20 ? 'text-[#FFFFFF]/85' : 'text-[#C2671A]'
                    }`}
                  >
                    FRIDAY
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => selectPreset('both')}
                  className={`py-2.5 px-1.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    attending18 && attending20
                      ? 'border-[#8D76A8] bg-[#8D76A8] text-[#FFFFFF] shadow-sm font-semibold'
                      : 'border-[#E5DCF0] bg-[#FFFFFF] text-[#2D2338]/80 hover:border-[#8D76A8]/50'
                  }`}
                >
                  <span className="font-functional text-[11px] sm:text-xs tracking-[0.16em]">
                    {attending18 && attending20 ? '✓ ' : ''}BOTH DAYS
                  </span>
                  <span
                    className={`font-functional text-[8px] tracking-wider ${
                      attending18 && attending20 ? 'text-[#FFFFFF]/85' : 'text-[#8D76A8]'
                    }`}
                  >
                    18 &amp; 20 NOV
                  </span>
                </motion.button>
              </div>

              {/* Minimal Editorial Subtext */}
              <p className="font-functional text-[9px] text-[#8D76A8]/70 tracking-wider text-center pt-0.5">
                18 Nov: Christian Nuptials · 20 Nov: Hindu Wedding
              </p>
            </div>

            {/* A note for the couple */}
            <div className="space-y-1">
              <label
                htmlFor="guest-note"
                className="block font-functional text-[10px] text-[#8D76A8] font-semibold tracking-[0.25em]"
              >
                A NOTE FOR THE COUPLE
              </label>
              <textarea
                id="guest-note"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Warm wishes, blessings, or dietary notes..."
                className="w-full editorial-input py-2 text-base sm:text-lg font-serif-title text-[#2D2338] placeholder:text-[#2D2338]/25 placeholder:font-light resize-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-4 text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="gold-link-dark text-xs tracking-[0.3em]"
              >
                {isSubmitting ? 'SENDING RSVP... ' : 'SUBMIT RSVP VIA WHATSAPP →'}
              </motion.button>
            </div>
          </motion.form>
        )}
        </AnimatePresence>
      </div>
    </section>
  )
}
