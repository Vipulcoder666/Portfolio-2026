// client/src/components/ui/Counter.jsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from '../../lib/motion';
import styles from './Counter.module.css';

export default function Counter({
  value,
  duration = 1.5,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = ''
}) {
  const spanRef = useRef(null);
  const numericTarget = parseFloat(value) || 0;

  const [displayValue, setDisplayValue] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return numericTarget;
    }
    return 0;
  });

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: numericTarget,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        setDisplayValue(obj.val);
      }
    });

    return () => {
      tween.kill();
    };
  }, [numericTarget, duration]);

  const formatted = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue);

  return (
    <span ref={spanRef} className={`${styles.counter} ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
