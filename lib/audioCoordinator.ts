// lib/audioCoordinator.ts
// Global Audio Coordinator ensuring strictly ONE audio source can play at any given moment.

if (typeof window !== 'undefined') {
  // Capture-phase listener on document: Whenever ANY audio begins playing,
  // instantly pause all other <audio> elements across the entire page.
  document.addEventListener(
    'play',
    (event: Event) => {
      const playingTarget = event.target as HTMLAudioElement | null
      if (!playingTarget || playingTarget.tagName !== 'AUDIO') return

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
