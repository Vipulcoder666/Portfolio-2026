// client/src/components/layout/ScrollProgress.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/motion';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const anim = gsap.to(el, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1
      }
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'var(--accent)',
        transformOrigin: '0% 50%',
        transform: 'scaleX(0)',
        zIndex: 10001,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  );
}
