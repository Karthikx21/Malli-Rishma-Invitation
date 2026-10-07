# Malli-Rishma-Invitation

Official Luxury Wedding Invitation Web Application for **Rishma John & Malli Sumandhar**.

> *Two Days. Two Cultures. One Celebration of Love.*  
> Coimbatore, Tamil Nadu — 18 & 20 November 2026.  
> `#RishmaFoundHerPavazhaMalli`

---

## 💍 Highlights & Design System

- **Opening Film Experience:** Fullscreen envelope unsealing video with smoke and wax seal.
- **Editorial Typography:** Bodoni Moda (headlines), Pinyon Script (names & cursive accents), Jost (body & labels), and Noto Serif Tamil (Tamil subset with display swap).
- **Cinematic Photography & Poster Worlds:**
  - **Day 1 (18 Nov):** Candlelit chapel aesthetic for the Christian Ring Exchange Ceremony at Jenneys Residency, Avinashi Road, Coimbatore (with ceremony BGM player).
  - **Day 2 (20 Nov):** Sacred dawn temple aesthetic for the Hindu Muhurtham at Kumaran Kundra Temple & Reception with lunch at Shri Lakshmi Hall.
- **Ambient Hero Atmosphere:** Lightweight seamless drifting gold dust and warm candlelit bokeh haze video overlay (`mix-blend-mode: screen`).
- **Interactive Details:**
  - Mechanical countdown timer with day switcher (18 Nov vs 20 Nov).
  - Verbatim couple traits & *"How We Met"* Bangalore story.
  - OK Kanmani pull quote with audio tracks on loop (*"The song on loop in his head"* / *"The song that will loop in her head"*).
  - Dress code guidance with wine & maroon swatches for 18 Nov, and *"Be picture perfect"* for 20 Nov.
  - *"Find us here"* interactive venue cards with direct Google Maps navigation.
  - One-tap Add to Calendar (`.ics` generation) for both events.
  - Responsive RSVP form with guest counter stepper, event checkmarks, celebratory confetti, and instant WhatsApp confirmation link.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Fonts:** `next/font/google` (*Bodoni Moda*, *Pinyon Script*, *Jost*, *Noto Serif Tamil*)
- **Animations:** CSS Keyframes, Hardware-accelerated transforms & Canvas Confetti

---

## 🚀 Getting Started Locally

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the invitation.

---

## 🌐 Deploy to Vercel

1. Push to GitHub (`main` branch).
2. Import repository in [Vercel](https://vercel.com).
3. Framework Preset: **Next.js**
4. Deploy!
