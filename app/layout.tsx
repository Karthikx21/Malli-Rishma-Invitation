import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Pinyon_Script, Jost, Noto_Serif_Tamil } from 'next/font/google'
import './globals.css'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bodoni',
})

const pinyon = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pinyon',
})

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
})

const notoTamil = Noto_Serif_Tamil({
  subsets: ['tamil'],
  display: 'swap',
  variable: '--font-tamil',
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
      className={`${bodoni.variable} ${pinyon.variable} ${jost.variable} ${notoTamil.variable} scroll-smooth`}
    >
      <body className="antialiased bg-[#F4ECDD] text-[#1A0A0F] selection:bg-[#4A0F20] selection:text-[#F4ECDD]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

