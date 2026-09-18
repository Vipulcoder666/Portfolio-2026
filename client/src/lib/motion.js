// client/src/lib/motion.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins globally once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };

// Framer Motion spring presets
export const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  gentle: { type: 'spring', stiffness: 200, damping: 25 },
  molasses: { type: 'spring', stiffness: 100, damping: 20 },
  overlay: { type: 'spring', stiffness: 350, damping: 35 }
};

// Standard transition timings
export const transitions = {
  fast: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  standard: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  slow: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};
