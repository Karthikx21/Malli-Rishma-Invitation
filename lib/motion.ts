import { type Transition, type Variants } from 'framer-motion'

// Bespoke editorial luxury easing curve: slow, intentional, velvety deceleration
export const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const LUXURY_EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1]

export const TRANSITION_SLOW: Transition = {
  duration: 1.3,
  ease: LUXURY_EASE,
}

export const TRANSITION_MEDIUM: Transition = {
  duration: 1.0,
  ease: LUXURY_EASE,
}

export const TRANSITION_FAST: Transition = {
  duration: 0.55,
  ease: LUXURY_EASE,
}

// Fade up with soft blur-to-sharp reveal
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: TRANSITION_MEDIUM,
  },
}

// Staggered children container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

// Smooth hairline expansion
export const hairlineVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.3,
      ease: LUXURY_EASE,
    },
  },
}

// Tab crossfade variants for AnimatePresence mode="wait"
export const tabContentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 14,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px)',
    transition: {
      duration: 0.35,
      ease: LUXURY_EASE,
    },
  },
}

// Image arched reveal (gentle scale from 1.04 down to 1.0 with subtle clip reveal)
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: LUXURY_EASE,
    },
  },
}
