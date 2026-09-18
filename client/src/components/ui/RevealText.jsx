// client/src/components/ui/RevealText.jsx
import React, { useRef, useEffect } from 'react';
import { gsap, SplitText } from '../../lib/motion';
import styles from './RevealText.module.css';

export default function RevealText({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  triggerOnScroll = true
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Accessibility & Reduced Motion Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let splitInstance = null;
    let animTween = null;

    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      try {
        splitInstance = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            // Re-apply animation whenever resize triggers re-split
            gsap.set(self.lines, { yPercent: 100, opacity: 0 });
            return gsap.to(self.lines, {
              yPercent: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              delay,
              scrollTrigger: triggerOnScroll
                ? {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                  }
                : undefined
            });
          }
        });

        // Set accessibility attributes
        el.setAttribute('aria-label', typeof children === 'string' ? children : el.innerText);
        if (splitInstance.lines) {
          splitInstance.lines.forEach((line) => line.setAttribute('aria-hidden', 'true'));
        }
      } catch {
        // Fallback gracefully if SplitText throws
      }
    });

    return () => {
      if (animTween) animTween.kill();
      if (splitInstance && splitInstance.revert) splitInstance.revert();
    };
  }, [children, delay, triggerOnScroll]);

  return (
    <Component ref={containerRef} className={`${styles.wrapper} ${className}`}>
      {children}
    </Component>
  );
}
