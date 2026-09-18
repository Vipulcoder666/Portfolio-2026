// client/src/components/layout/Preloader.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/motion';
import styles from './Preloader.module.css';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    const counterObj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(el, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            if (onComplete) onComplete();
            ScrollTrigger.refresh();
          }
        });
      }
    });

    tl.to(counterObj, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPercent(Math.round(counterObj.val));
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const formattedNum = String(percent).padStart(3, '0');

  return (
    <div ref={containerRef} className={styles.preloader} aria-hidden="true">
      <div className={styles.top}>
        <div className={styles.sysTag}>
          <span className={styles.statusDot} />
          <span>VIPUL.DEV // SYS.INIT</span>
        </div>
        <div className={styles.sysTag}>
          <span>EDGE_INFERENCE_READY</span>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.counter}>{formattedNum}</div>
        <div className={styles.loadingBarTrack}>
          <div className={styles.loadingBarFill} style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className={styles.bottom}>
        <span>LOC: NEW DELHI [IST]</span>
        <span>CV_PIPELINE: v11.0</span>
      </div>
    </div>
  );
}
