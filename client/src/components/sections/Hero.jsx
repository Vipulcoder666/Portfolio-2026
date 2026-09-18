// client/src/components/sections/Hero.jsx
import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, heroInferenceMetrics, marqueeItems } from '../../data/content';
import { mapPerEpoch } from '../../data/training';
import MagneticButton from '../ui/MagneticButton';
import Counter from '../ui/Counter';
import Marquee from '../ui/Marquee';
import styles from './Hero.module.css';

export default function Hero() {
  const hasSparkline = Array.isArray(mapPerEpoch) && mapPerEpoch.length > 1;
  const headlines = personalInfo.headlines || [personalInfo.headline];
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (headlines.length <= 1 || isPaused) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [headlines.length, isPaused]);

  const currentHeadline = headlines[headlineIndex] || headlines[0];
  const currentPanel = currentHeadline.panel || {
    title: 'INSPECTION_TELEMETRY // LIVE',
    tag: 'ACCURACY_BENCHMARKS',
    metrics: heroInferenceMetrics,
    showSparkline: true,
    footerInfo: 'HARDWARE: Raspberry Pi 4 · Linux OS'
  };

  return (
    <section id="hero" className={styles.section} aria-label="Hero Overview">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Dynamic Title, Subtext, CTAs */}
          <div
            className={styles.leftCol}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              <span>{personalInfo.company} · {personalInfo.title}</span>
              {currentHeadline.topic && (
                <span className={styles.topicBadge}>{currentHeadline.topic}</span>
              )}
            </div>

            <div className={styles.headerBlock}>
              <p className={styles.greeting}>
                Hey There! I'm <span className={styles.greetingName}>{personalInfo.name}</span>
                <span className={styles.accentDot}>.</span>
              </p>

              <h1 className={styles.title} aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={headlineIndex}
                    initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.headlineText}
                  >
                    {currentHeadline.prefix}{' '}
                    <span className={styles.italicSerif}>{currentHeadline.emphasis}</span>{' '}
                    {currentHeadline.suffix}
                  </motion.span>
                </AnimatePresence>
              </h1>
            </div>

            {/* Headline discipline pips */}
            {headlines.length > 1 && (
              <div
                className={styles.indicatorsRow}
                role="tablist"
                aria-label="Headline specialization selector"
              >
                {headlines.map((item, idx) => (
                  <button
                    key={item.topic}
                    type="button"
                    role="tab"
                    aria-selected={idx === headlineIndex}
                    aria-label={`Select ${item.topic} headline`}
                    className={`${styles.indicatorPip} ${idx === headlineIndex ? styles.indicatorPipActive : ''}`}
                    onClick={() => setHeadlineIndex(idx)}
                  />
                ))}
              </div>
            )}

            <p className={styles.subparagraph}>
              {personalInfo.subparagraph}
            </p>

            <div className={styles.ctaGroup}>
              <MagneticButton href="#work" variant="primary">
                View Selected Work <ArrowRight size={16} />
              </MagneticButton>

              <MagneticButton
                href={personalInfo.links.resume}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
              >
                Resume / CV <FileText size={16} />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Hero Inference & Discipline Panel (Synchronized with active headline) */}
          <div className={styles.panel} aria-label="Discipline Performance Metrics">
            <AnimatePresence mode="wait">
              <motion.div
                key={headlineIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={styles.panelInner}
              >
                <div className={styles.panelHeader}>
                  <div className={styles.panelTitle}>
                    <span className={styles.liveDot} aria-hidden="true" />
                    <span>{currentPanel.title}</span>
                  </div>
                  <span className="mono-label">{currentPanel.tag}</span>
                </div>

                <div className={styles.metricsGrid}>
                  {currentPanel.metrics.map((item, idx) => {
                    const numMatch = item.value.match(/([\d.]+)/);
                    const suffix = item.value.replace(/[\d.]+/, '');
                    const numericVal = numMatch ? parseFloat(numMatch[1]) : 0;
                    const hasDecimals = item.value.includes('.');

                    return (
                      <div key={idx} className={styles.metricCard}>
                        <span className={styles.metricLabel}>{item.label}</span>
                        <span className={styles.metricValue}>
                          {numericVal > 0 ? (
                            <Counter
                              value={numericVal}
                              decimals={hasDecimals ? 1 : 0}
                              suffix={suffix}
                            />
                          ) : (
                            item.value
                          )}
                        </span>
                        <span className={styles.metricContext}>{item.context}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Optional Sparkline from real training data if enabled */}
                {currentPanel.showSparkline && hasSparkline && (
                  <div className={styles.sparklineArea}>
                    <span className={styles.sparklineLabel}>YOLO TRAINING CONVERGENCE (mAP50)</span>
                    <svg viewBox="0 0 300 40" style={{ width: '100%', height: '40px' }} preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        points={mapPerEpoch
                          .map((val, i) => {
                            const x = (i / (mapPerEpoch.length - 1)) * 300;
                            const y = 40 - (val / 100) * 35;
                            return `${x},${y}`;
                          })
                          .join(' ')}
                      />
                    </svg>
                  </div>
                )}

                {/* Contextual Technical Footer */}
                <div className={styles.panelFooter}>
                  <span>{currentPanel.footerInfo}</span>
                  <span className={styles.statusIndicator}>
                    <span
                      className={styles.liveDot}
                      style={{ width: '5px', height: '5px', backgroundColor: 'var(--status-green)' }}
                    />
                    <span>LIVE</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className={styles.marqueeContainer}>
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
