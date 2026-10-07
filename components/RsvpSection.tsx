'use client'

import { useState } from 'react'
import StationeryFrame from './StationeryFrame'

/**
 * Bespoke engraved RSVP section:
 * - Double-line frame with L-shaped gold corner ornaments
 * - Underline-only inputs (border-bottom 1px gold, no other borders, transparent bg)
 * - Labels above each in tiny tracked caps
 * - Attendee count with simple underlined select; square event selections
 * - Rectangular submit button with 1px gold border, fills maroon with ivory text on hover (300ms)
 * - Success state: quiet gold shimmer sweep, handwritten thank you in Great Vibes, rectangular outlined WhatsApp share
 */
export default function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    events: 'both',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showShimmer, setShowShimmer] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setShowShimmer(true)
    setTimeout(() => setShowShimmer(false), 2000)
  }

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `💍 Wedding Invitation: Rishma John & Malli Sumandhar (#RishmaFoundHerPavazhaMalli) are getting married on 18 & 20 November 2026 in Coimbatore! Check the details and celebrate with us: ${window.location.href}`
    )
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  return (
    <section id="rsvp" className="relative my-20 sm:my-28 max-w-[640px] mx-auto px-4">
      {/* Bilingual Header */}
      <div className="text-center mb-10">
        <h2 className="font-tamil text-2xl sm:text-3xl text-[#4B1424] font-normal">
          வருவீர்களா?
        </h2>
        <span className="block font-sans text-[11px] uppercase tracking-[0.3em] text-[#B08D57] font-medium mt-1">
          PLEASE RESPOND · RSVP
        </span>
        <div className="w-16 h-[1px] bg-[#B08D57] mx-auto mt-4" />
      </div>

      {/* Main Double-Line Stationery Frame */}
      <StationeryFrame variant="light" className="w-full relative overflow-hidden">
        {/* Quiet Gold Shimmer Sweep across confirmation frame on success */}
        {showShimmer && (
          <div
            className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
            aria-hidden="true"
          >
            <div className="w-2/3 h-full bg-gradient-to-r from-transparent via-[#B08D57]/30 to-transparent animate-shimmer-sweep" />
          </div>
        )}

        {isSubmitted ? (
          /* RSVP Success Confirmation State */
          <div className="text-center py-6 sm:py-8 space-y-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B08D57] font-medium block">
              RESERVATION CONFIRMED
            </span>

            {/* Handwritten-style thank you in Great Vibes */}
            <h3 className="font-script text-4xl sm:text-5xl text-[#4B1424] leading-tight">
              Thank You with All Our Hearts
            </h3>

            <p className="font-cormorant italic text-xl text-[#4B1424]/90 max-w-md mx-auto leading-relaxed">
              “{formData.name || 'Cherished Guest'}, your presence at our celebration is reserved with great joy. We look forward to welcoming you in Coimbatore.”
            </p>

            <div className="w-16 h-[1px] bg-[#B08D57] mx-auto my-6" />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {/* Rectangular outlined WhatsApp share button */}
              <button
                onClick={handleShareWhatsApp}
                className="w-full sm:w-auto px-6 py-3 border border-[#B08D57] bg-transparent text-[#4B1424] hover:bg-[#4B1424] hover:text-[#F6EFE3] hover:border-[#4B1424] font-sans text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-300 cursor-pointer"
              >
                SHARE ON WHATSAPP
              </button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="font-sans text-xs uppercase tracking-[0.25em] text-[#4B1424]/70 hover:text-[#4B1424] border-b border-[#B08D57]/50 pb-1 hover:border-[#4B1424] transition-colors cursor-pointer bg-transparent border-t-0 border-l-0 border-r-0"
              >
                UPDATE RESPONSE
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form State */
          <form onSubmit={handleSubmit} className="space-y-8">
            <p className="text-center font-cormorant italic text-lg text-[#4B1424]/90 mb-4">
              “Kindly let us know if you can join our celebration by 10 November 2026.”
            </p>

            {/* Guest Name - Underline-only */}
            <div>
              <label
                htmlFor="guest-name"
                className="block font-sans text-[11px] uppercase tracking-[0.3em] text-[#4B1424] font-medium mb-1"
              >
                GUEST FULL NAME / குடும்ப பெயர் *
              </label>
              <input
                id="guest-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Anand & Family"
                className="w-full bg-transparent border-0 border-b border-[#B08D57] py-2.5 text-[#4B1424] font-cormorant text-xl outline-none focus:border-[#4B1424] transition-colors placeholder:text-[#4B1424]/30 placeholder:font-cormorant"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Phone / WhatsApp - Underline-only */}
              <div>
                <label
                  htmlFor="guest-phone"
                  className="block font-sans text-[11px] uppercase tracking-[0.3em] text-[#4B1424] font-medium mb-1"
                >
                  PHONE / WHATSAPP
                </label>
                <input
                  id="guest-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-transparent border-0 border-b border-[#B08D57] py-2.5 text-[#4B1424] font-cormorant text-xl outline-none focus:border-[#4B1424] transition-colors placeholder:text-[#4B1424]/30"
                />
              </div>

              {/* Number of Attendees - Simple Underlined Select */}
              <div>
                <label
                  htmlFor="guest-count"
                  className="block font-sans text-[11px] uppercase tracking-[0.3em] text-[#4B1424] font-medium mb-1"
                >
                  NUMBER OF ATTENDEES *
                </label>
                <select
                  id="guest-count"
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-[#B08D57] py-2.5 text-[#4B1424] font-cormorant text-xl outline-none cursor-pointer focus:border-[#4B1424] transition-colors"
                >
                  <option value="1" className="bg-[#F6EFE3] text-[#4B1424]">1 Guest</option>
                  <option value="2" className="bg-[#F6EFE3] text-[#4B1424]">2 Guests</option>
                  <option value="3" className="bg-[#F6EFE3] text-[#4B1424]">3 Guests</option>
                  <option value="4" className="bg-[#F6EFE3] text-[#4B1424]">4 Guests</option>
                  <option value="5" className="bg-[#F6EFE3] text-[#4B1424]">5+ Guests (Family)</option>
                </select>
              </div>
            </div>

            {/* Event Attendance - Square Controls */}
            <div>
              <span className="block font-sans text-[11px] uppercase tracking-[0.3em] text-[#4B1424] font-medium mb-3">
                EVENTS ATTENDING *
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'both', label: 'Both Days (18 & 20 Nov)' },
                  { id: 'ring', label: '18 Nov · Ring Exchange' },
                  { id: 'muhurtham', label: '20 Nov · Hindu Wedding' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-2.5 p-3 border transition-colors cursor-pointer select-none ${
                      formData.events === opt.id
                        ? 'border-[#B08D57] bg-[#4B1424] text-[#F6EFE3]'
                        : 'border-[#B08D57]/40 bg-transparent text-[#4B1424] hover:border-[#B08D57]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="events"
                      value={opt.id}
                      checked={formData.events === opt.id}
                      onChange={(e) => setFormData({ ...formData, events: e.target.value })}
                      className="w-3.5 h-3.5 border border-[#B08D57] accent-[#4B1424]"
                    />
                    <span className="font-sans text-[10px] uppercase tracking-wider font-medium">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Blessings & Wishes - Underline-only */}
            <div>
              <label
                htmlFor="note"
                className="block font-sans text-[11px] uppercase tracking-[0.3em] text-[#4B1424] font-medium mb-1"
              >
                BLESSINGS &amp; WISHES FOR THE COUPLE
              </label>
              <textarea
                id="note"
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your prayers, love, or blessings for Rishma & Malli..."
                className="w-full bg-transparent border-0 border-b border-[#B08D57] py-2.5 text-[#4B1424] font-cormorant text-lg outline-none resize-none focus:border-[#4B1424] transition-colors placeholder:text-[#4B1424]/30 placeholder:font-cormorant"
              />
            </div>

            {/* Submit Button: Rectangular button with 1px gold border, fills maroon with ivory text on hover (300ms) */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="border border-[#B08D57] bg-transparent text-[#4B1424] px-10 py-3.5 font-sans text-xs uppercase tracking-[0.3em] font-medium transition-colors duration-300 hover:bg-[#4B1424] hover:text-[#F6EFE3] hover:border-[#4B1424] cursor-pointer"
              >
                CONFIRM RSVP
              </button>
            </div>
          </form>
        )}
      </StationeryFrame>
    </section>
  )
}
