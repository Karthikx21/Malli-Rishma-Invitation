'use client'

import { useState } from 'react'
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
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B8893E', '#F2DFB5', '#4A0F20'],
        })
      } catch {
        // Safe fallback if confetti canvas fails
      }
    }, 600)
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
      className="relative w-full bg-[#F4ECDD] text-[#1A0A0F] py-20 px-4 sm:px-8 border-b border-[#B8893E]/30"
      aria-label="Wedding RSVP Section"
    >
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8893E] font-medium font-sans mb-2">
            வருவீர்களா?
          </p>
          <h2 className="font-names text-5xl sm:text-6xl text-[#4A0F20] leading-none mb-2">
            Will you join us?
          </h2>
          <p className="font-headline text-lg text-[#1A0A0F]/80 uppercase tracking-widest">
            RSVP
          </p>
          <div className="w-16 h-px bg-[#B8893E]/50 mx-auto mt-4" />
        </div>

        {isSubmitted ? (
          <div className="bg-white/90 border border-[#B8893E]/50 rounded-sm p-8 sm:p-10 text-center shadow-lg space-y-6">
            <div className="w-16 h-16 rounded-full border border-[#B8893E] bg-[#4A0F20] text-[#F2DFB5] mx-auto flex items-center justify-center font-names text-2xl shadow-md">
              RM
            </div>
            <h3 className="font-headline text-2xl text-[#4A0F20]">
              Thank you, {name}!
            </h3>
            <p className="text-sm sm:text-base text-[#1A0A0F]/80 font-sans leading-relaxed">
              We cannot wait to celebrate with you in Coimbatore. Your RSVP has been recorded.
            </p>

            <div className="pt-4 border-t border-[#B8893E]/30 space-y-3">
              <a
                href={`https://wa.me/?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-[0.2em] font-sans font-medium rounded-sm inline-flex items-center justify-center gap-2 shadow-md transition-all"
              >
                Send Confirmation via WhatsApp →
              </a>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs uppercase tracking-[0.2em] text-[#B8893E] underline font-sans block mx-auto pt-2"
              >
                Edit RSVP details
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 border border-[#B8893E]/40 rounded-sm p-6 sm:p-10 shadow-md space-y-8"
          >
            {/* Guest Name */}
            <div>
              <label
                htmlFor="guest-name"
                className="block text-xs uppercase tracking-[0.2em] text-[#B8893E] font-medium font-sans mb-2"
              >
                Your name *
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full editorial-input py-2.5 text-base sm:text-lg font-headline text-[#1A0A0F] placeholder:text-[#1A0A0F]/30"
              />
            </div>

            {/* Guest Stepper */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#B8893E] font-medium font-sans mb-3">
                How many of you?
              </label>
              <div className="flex items-center justify-between border-b border-[#B8893E]/40 pb-3">
                <span className="font-headline text-lg sm:text-xl text-[#1A0A0F]">
                  {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-9 h-9 rounded-full border border-[#B8893E]/60 text-[#4A0F20] hover:bg-[#4A0F20] hover:text-[#F4ECDD] flex items-center justify-center font-bold transition-colors cursor-pointer"
                    aria-label="Decrease guest count"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                    className="w-9 h-9 rounded-full border border-[#B8893E]/60 text-[#4A0F20] hover:bg-[#4A0F20] hover:text-[#F4ECDD] flex items-center justify-center font-bold transition-colors cursor-pointer"
                    aria-label="Increase guest count"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Joining Us For Checkboxes */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#B8893E] font-medium font-sans mb-3">
                Joining us for
              </label>
              <div className="space-y-3 font-sans text-sm">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={attending18}
                    onChange={(e) => setAttending18(e.target.checked)}
                    className="w-4 h-4 accent-[#4A0F20] rounded cursor-pointer"
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
                    className="w-4 h-4 accent-[#4A0F20] rounded cursor-pointer"
                  />
                  <span className="text-[#1A0A0F]">
                    20 Nov · Hindu wedding and reception
                  </span>
                </label>
              </div>
            </div>

            {/* A note for the couple */}
            <div>
              <label
                htmlFor="guest-note"
                className="block text-xs uppercase tracking-[0.2em] text-[#B8893E] font-medium font-sans mb-2"
              >
                A note for the couple
              </label>
              <textarea
                id="guest-note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Warm wishes, blessings, or dietary notes..."
                className="w-full editorial-input py-2.5 text-sm sm:text-base font-sans text-[#1A0A0F] placeholder:text-[#1A0A0F]/30 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-8 border border-[#B8893E] bg-[#4A0F20] hover:bg-[#380B17] text-[#F4ECDD] text-xs uppercase tracking-[0.25em] font-sans transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Recording...' : 'Send RSVP'}
              </button>
              <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-[#B8893E] font-sans">
                Kindly reply by 10 November
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
