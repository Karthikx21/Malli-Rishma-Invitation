import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Cormorant_Garamond,
  Cinzel,
  Great_Vibes,
  Montserrat,
  Noto_Serif_Tamil,
} from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700', '800'],
})

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
})

const notoTamil = Noto_Serif_Tamil({
  subsets: ['tamil'],
  display: 'swap',
  variable: '--font-tamil',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rishma-found-her-pavazha-malli.vercel.app'),
  title: 'Rishma John & Malli Sumandhar · Wedding Invitation',
  description:
    'Two Days. Two Cultures. One Celebration of Love. Official Wedding Invitation of Rishma John & Malli Sumandhar — Coimbatore, November 18 & 20, 2026.',
  keywords: [
    'Wedding Invitation',
    'Rishma John',
    'Malli Sumandhar',
    'Pavazha Malli',
    'Coimbatore Wedding',
    'Christian Ring Exchange',
    'Hindu Wedding',
  ],
  openGraph: {
    title: 'Rishma John & Malli Sumandhar · Wedding Invitation',
    description: '#RishmaFoundHerPavazhaMalli — Celebrating Two Cultures, One Eternal Love in Coimbatore.',
    images: [
      {
        url: '/editorial-poster-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Rishma & Malli Wedding Invitation Editorial Poster',
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F4ECDD',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${greatVibes.variable} ${montserrat.variable} ${notoTamil.variable} scroll-smooth`}
    >
      <body className="antialiased bg-[#F4ECDD] text-[#1A0A0F] selection:bg-[#4A0F20] selection:text-[#F4ECDD]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

