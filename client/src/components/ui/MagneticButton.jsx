// client/src/components/ui/MagneticButton.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from '../../lib/motion';
import styles from './MagneticButton.module.css';

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  target,
  rel,
  disabled = false,
  type = 'button',
  magnetic = true,
  ariaLabel,
  ...props
}) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = buttonRef.current;
    const currentTextEl = textRef.current;
    if (!el || !magnetic || disabled) return;

    // Check if device supports hover and reduced motion is off
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasHover || prefersReducedMotion) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
    const textXTo = currentTextEl ? gsap.quickTo(currentTextEl, 'x', { duration: 0.35, ease: 'power3.out' }) : null;
    const textYTo = currentTextEl ? gsap.quickTo(currentTextEl, 'y', { duration: 0.35, ease: 'power3.out' }) : null;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      xTo(distanceX * 0.25);
      yTo(distanceY * 0.25);
      if (textXTo) textXTo(distanceX * 0.12);
      if (textYTo) textYTo(distanceY * 0.12);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      if (textXTo) textXTo(0);
      if (textYTo) textYTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
      if (currentTextEl) gsap.killTweensOf(currentTextEl);
    };
  }, [magnetic, disabled]);

  const buttonClasses = [
    styles.button,
    styles[variant] || styles.primary,
    className
  ].filter(Boolean).join(' ');

  const content = (
    <span ref={textRef} className={styles.inner}>
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        className={buttonClasses}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </button>
  );
}
