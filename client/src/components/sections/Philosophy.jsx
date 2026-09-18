// client/src/components/sections/Philosophy.jsx
import React, { useEffect, useRef } from 'react';
import { personalInfo } from '../../data/content';
import { gsap } from '../../lib/motion';
import styles from './Philosophy.module.css';

export default function Philosophy() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  const words = personalInfo.philosophy.statement.split(' ');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      wordsRef.current.forEach((el) => {
        if (el) el.style.color = 'var(--fg)';
      });
      return;
    }

    const elements = wordsRef.current.filter(Boolean);
    if (elements.length === 0) return;

    const anim = gsap.to(elements, {
      color: '#EDEDED',
      stagger: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'center 45%',
        scrub: true
      }
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className={styles.section} aria-label="Engineering Philosophy">
      <div className={styles.contentWrapper}>
        <div className="mono-label" style={{ marginBottom: '16px' }}>
          03 // ENGINEERING ETHOS
        </div>

        <p className={styles.statement} aria-label={personalInfo.philosophy.statement}>
          {words.map((word, idx) => (
            <span
              key={idx}
              ref={(el) => (wordsRef.current[idx] = el)}
              className={styles.word}
            >
              {word}
            </span>
          ))}
        </p>

        <p className={styles.subtext}>
          {personalInfo.philosophy.subtext}
        </p>
      </div>
    </section>
  );
}
