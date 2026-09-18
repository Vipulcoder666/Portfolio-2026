// client/src/components/layout/Cursor.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/motion';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const [cursorMode, setCursorMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isTouch || prefersReducedMotion) return 'hidden';
    }
    return 'default';
  });
  const [label, setLabel] = useState('OPEN');

  useEffect(() => {
    const el = cursorRef.current;
    if (!el || cursorMode === 'hidden') return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.18, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.18, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const mode = target.getAttribute('data-cursor');
        const customLabel = target.getAttribute('data-cursor-label') || 'OPEN';
        setCursorMode(mode);
        setLabel(customLabel);
      } else {
        setCursorMode('default');
      }
    };

    const handleMouseLeaveWindow = () => {
      setCursorMode('hidden');
    };

    const handleMouseEnterWindow = () => {
      setCursorMode('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      gsap.killTweensOf(el);
    };
  }, [cursorMode]);

  if (cursorMode === 'hidden') return null;

  const isCard = cursorMode === 'card';

  return (
    <div ref={cursorRef} className={styles.cursorContainer} aria-hidden="true">
      {/* Default small dot */}
      <div
        className={styles.dot}
        style={{
          opacity: isCard ? 0 : 1,
          transform: isCard ? 'scale(0)' : 'scale(1)'
        }}
      />

      {/* CV Bounding Box Mode */}
      <div className={`${styles.box} ${isCard ? styles.boxActive : ''}`}>
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />

        <div className={styles.boxHeader}>
          <span>CONF: 0.99</span>
          <span>CV // 01</span>
        </div>
        <div className={styles.boxFooter}>
          {label}
        </div>
      </div>
    </div>
  );
}
