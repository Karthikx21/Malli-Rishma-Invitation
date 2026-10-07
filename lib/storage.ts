/**
 * Safe localStorage wrapper with try/catch
 * Protects against iOS Safari private browsing / in-app browsers (Instagram, WhatsApp, Facebook)
 * that throw SecurityError on localStorage access.
 */

export function safeGetLocalStorage(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key)
    }
  } catch {
    // In-app browsers or privacy restrictions can throw
  }
  return null
}

export function safeSetLocalStorage(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value)
    }
  } catch {
    // Gracefully ignore storage quota or permission errors
  }
}
