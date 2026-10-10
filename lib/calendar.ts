/**
 * Utility functions and event definitions for Google Calendar & iCal (.ics) integration.
 * Tailored for Malli Sumandhar & Rishma John Wedding Celebrations.
 */

export interface CalendarEvent {
  title: string
  description: string
  location: string
  startDateUtc: string // e.g. '20261118T123000Z'
  endDateUtc: string // e.g. '20261118T163000Z'
  startDateLocal?: string // e.g. '20261118T180000'
  endDateLocal?: string // e.g. '20261118T220000'
}

export const WEDDING_CALENDAR_EVENTS = {
  christianNuptials: {
    title: 'Malli & Rishma · Christian Nuptials Ceremony',
    description:
      'Christian Nuptials Ceremony followed by Gala Dinner for Malli Sumandhar & Rishma John.\n\nDate: Wednesday, 18 November 2026\nTime: 6:00 PM to 10:00 PM IST\nVenue: Jenneys Residency, Avinashi Road, Coimbatore\n\n#RishmaFoundHerPavazhaMalli',
    location: 'Jenneys Residency, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641014',
    startDateUtc: '20261118T123000Z', // 6:00 PM IST
    endDateUtc: '20261118T163000Z', // 10:00 PM IST
    startDateLocal: '20261118T180000',
    endDateLocal: '20261118T220000',
  },
  hinduWeddingFull: {
    title: 'Malli & Rishma · Wedding & Reception',
    description:
      'Wedding Celebrations of Malli Sumandhar & Rishma John.\n\nDate: Friday, 20 November 2026\n• Muhurtham: 6:00 AM – 7:00 AM at Kumarankundru Temple, Mettupalayam\n• Reception: 11:00 AM – 2:00 PM at Shri Lakshmi Hall, Mettupalayam\n\n#RishmaFoundHerPavazhaMalli',
    location: 'Kumarankundru Temple & Shri Lakshmi Hall, Mettupalayam, Coimbatore, Tamil Nadu',
    startDateUtc: '20261120T003000Z', // 6:00 AM IST
    endDateUtc: '20261120T083000Z', // 2:00 PM IST
    startDateLocal: '20261120T060000',
    endDateLocal: '20261120T140000',
  },
  hinduMuhurtham: {
    title: 'Malli & Rishma · Muhurtham',
    description:
      'Sacred Muhurtham Ceremony of Malli Sumandhar & Rishma John at Kumarankundru Temple, Mettupalayam.\nTime: 6:00 AM to 7:00 AM IST.\n\n#RishmaFoundHerPavazhaMalli',
    location: 'Kumarankundru Temple, Mettupalayam, Coimbatore, Tamil Nadu',
    startDateUtc: '20261120T003000Z',
    endDateUtc: '20261120T013000Z',
    startDateLocal: '20261120T060000',
    endDateLocal: '20261120T070000',
  },
  hinduReception: {
    title: 'Malli & Rishma · Wedding Reception',
    description:
      'Wedding Reception for Malli Sumandhar & Rishma John at Shri Lakshmi Hall, Mettupalayam.\nTime: 11:00 AM to 2:00 PM IST.\n\n#RishmaFoundHerPavazhaMalli',
    location: 'Shri Lakshmi Hall, Mettupalayam – Annur Road, Coimbatore, Tamil Nadu',
    startDateUtc: '20261120T053000Z',
    endDateUtc: '20261120T083000Z',
    startDateLocal: '20261120T110000',
    endDateLocal: '20261120T140000',
  },
} as const

/**
 * Builds a 1-click Google Calendar web URL that pre-fills event title, dates/times,
 * details, location, and timezone.
 */
export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  const params = new URLSearchParams({
    text: event.title,
    dates: `${event.startDateUtc}/${event.endDateUtc}`,
    details: event.description,
    location: event.location,
    ctz: 'Asia/Kolkata',
  })
  return `${base}&${params.toString()}`
}

/**
 * Generates and triggers download of an RFC 5545 .ics file for Apple Calendar, Outlook, and other desktop/mobile calendar apps.
 */
export function downloadIcsFile(event: CalendarEvent): void {
  if (typeof window === 'undefined') return

  const start = event.startDateLocal || event.startDateUtc.replace('Z', '')
  const end = event.endDateLocal || event.endDateUtc.replace('Z', '')

  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Malli and Rishma Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\r?\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(link.href)
}
