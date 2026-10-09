// lib/audioCoordinator.ts
// Global Audio Coordinator ensuring strictly ONE audio source can play at any given moment.

let activeSectionId: string | null = null

if (typeof window !== 'undefined') {
  // Capture-phase listener on document: Whenever ANY audio begins playing,
  // instantly pause all other <audio> elements across the entire page.
  document.addEventListener(
    'play',
    (event: Event) => {
      const playingTarget = event.target as HTMLAudioElement | null
      if (!playingTarget || playingTarget.tagName !== 'AUDIO') return

      // Enforce balanced 65% volume ceiling across all audio sources (60-70% range)
      if (playingTarget.volume > 0.65) {
        playingTarget.volume = 0.65
      }

      const allAudios = document.querySelectorAll('audio')
      allAudios.forEach((audio) => {
        if (audio !== playingTarget && !audio.paused) {
          audio.pause()
        }
      })
    },
    true
  )
}

/**
 * Safely plays a target audio element while ensuring every other audio element is paused.
 */
export function playExclusive(targetAudio: HTMLAudioElement): Promise<void> {
  // Enforce balanced 65% volume ceiling across all audio sources (60-70% range)
  if (targetAudio.volume > 0.65) {
    targetAudio.volume = 0.65
  }

  if (typeof document !== 'undefined') {
    const allAudios = document.querySelectorAll('audio')
    allAudios.forEach((audio) => {
      if (audio !== targetAudio && !audio.paused) {
        audio.pause()
      }
    })
  }
  return targetAudio.play()
}

/**
 * Checks if any secondary audio (e.g. OK Kanmani tracks) is actively playing.
 */
export function isAnyOtherAudioPlaying(excludeAudio?: HTMLAudioElement | null): boolean {
  if (typeof document === 'undefined') return false
  const allAudios = Array.from(document.querySelectorAll('audio'))
  return allAudios.some((audio) => audio !== excludeAudio && !audio.paused)
}

/**
 * Notifies the coordinator that a specific section audio has become active (e.g. user scrolled into Songs on Loop).
 */
export function enterAudioSection(sectionId: string): void {
  activeSectionId = sectionId
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('wedding-section-audio-enter', {
        detail: { sectionId },
      })
    )
  }
}

/**
 * Notifies the coordinator that a specific section audio has become inactive (e.g. user scrolled out).
 */
export function leaveAudioSection(sectionId: string): void {
  if (activeSectionId === sectionId) {
    activeSectionId = null
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('wedding-section-audio-leave', {
        detail: { sectionId },
      })
    )
  }
}

/**
 * Returns whether any audio section is currently active in the viewport.
 */
export function isAudioSectionActive(): boolean {
  return activeSectionId !== null
}

/**
 * Returns the currently active audio section ID, if any.
 */
export function getActiveAudioSection(): string | null {
  return activeSectionId
}

