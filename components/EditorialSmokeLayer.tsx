'use client'

/**
 * EditorialSmokeLayer:
 * Previously mounted a slice of the intro video which caused the envelope to loop in the background.
 * Now replaced with a subtle, non-intrusive ambient atmospheric gradient overlay,
 * ensuring no video artifact loops over the content.
 */
interface EditorialSmokeLayerProps {
  opacity?: number
}

export default function EditorialSmokeLayer({ opacity }: EditorialSmokeLayerProps = {}) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,rgba(184,137,62,0.06)_0%,transparent_70%)]"
      style={opacity !== undefined ? { opacity } : undefined}
      aria-hidden="true"
    />
  )
}
