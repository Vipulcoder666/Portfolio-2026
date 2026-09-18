// client/src/components/sections/Work.jsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/content';
import { gsap, ScrollTrigger } from '../../lib/motion';
import { useLenis } from '../../hooks/useLenis';
import SectionHeader from '../ui/SectionHeader';
import MagneticButton from '../ui/MagneticButton';
import styles from './Work.module.css';

export default function Work() {
  const [activeProject, setActiveProject] = useState(null);
  const cardsRef = useRef([]);
  const lenis = useLenis();

  function openModal(project) {
    setActiveProject(project);
    window.history.pushState(null, '', `#work/${project.id}`);
  }

  function closeModal() {
    setActiveProject(null);
    if (window.location.hash.startsWith('#work/')) {
      window.history.pushState(null, '', '#work');
    }
  }

  function handleInquiryClick(e) {
    if (e) e.preventDefault();
    setActiveProject(null);
    window.history.pushState(null, '', '#contact');
    setTimeout(() => {
      if (lenis && lenis.scrollTo) {
        lenis.scrollTo('#contact', { duration: 1.2 });
      } else {
        const targetEl = document.querySelector('#contact');
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 60);
  }

  // Handle URL hash routing (#work/:id)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#work/')) {
        const id = hash.replace('#work/', '');
        const match = projects.find((p) => p.id === id);
        if (match) {
          setActiveProject(match);
        } else {
          setActiveProject(null);
        }
      } else {
        setActiveProject(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Manage scroll locking, navbar visibility, and ScrollTrigger refresh
  useEffect(() => {
    const navHeader = document.querySelector('header');

    if (activeProject) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      if (navHeader) {
        navHeader.style.opacity = '0';
        navHeader.style.pointerEvents = 'none';
        navHeader.style.transition = 'opacity 0.2s ease';
      }
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      if (navHeader) {
        navHeader.style.opacity = '1';
        navHeader.style.pointerEvents = 'auto';
      }
      ScrollTrigger.refresh();
    }

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      if (navHeader) {
        navHeader.style.opacity = '1';
        navHeader.style.pointerEvents = 'auto';
      }
    };
  }, [activeProject, lenis]);

  // Handle keyboard Escape to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeProject) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  // Stacking card scrub animation using GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = cardsRef.current.filter(Boolean);
    const triggers = [];

    cards.forEach((card, idx) => {
      if (idx === cards.length - 1) return; // Last card does not shrink

      const nextCard = cards[idx + 1];
      const overlay = card.querySelector(`.${styles.darkStackOverlay}`);

      const anim = gsap.to(card, {
        scale: 0.92,
        ease: 'none',
        scrollTrigger: {
          trigger: nextCard,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true
        }
      });
      triggers.push(anim.scrollTrigger);

      if (overlay) {
        const overlayAnim = gsap.to(overlay, {
          opacity: 0.8,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true
          }
        });
        triggers.push(overlayAnim.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((st) => st && st.kill());
    };
  }, []);

  return (
    <section id="work" className={styles.section} aria-label="Selected Work">
      <div className="container">
        <SectionHeader
          eyebrow="01 / WORK"
          title="Selected Engineering Work"
          description="Production computer vision pipelines, edge inference deployments, and industrial automation tools delivered for automotive and fulfillment operations."
        />

        <div className={styles.cardsContainer}>
          {projects.map((project, idx) => {
            // Filter metrics: show max 3, hide unverified
            const displayMetrics = (project.metrics || [])
              .filter((m) => m.verified !== false)
              .slice(0, 3);

            const displayClient = project.clientIsPublic ? project.title : project.clientDisplayName;

            return (
              <article
                key={project.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={styles.card}
                style={{ top: `calc(84px + ${idx} * 16px)` }}
                onClick={() => openModal(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open case study for ${project.title}`}
                data-cursor="card"
                data-cursor-label="OPEN"
              >
                {/* Dark stack overlay for depth scrubbing */}
                <div className={styles.darkStackOverlay} aria-hidden="true" />

                {/* Left: Media Column */}
                <div className={styles.mediaWrapper}>
                  <picture>
                    <source srcSet={project.media.src} type="image/jpeg" />
                    <img
                      src={project.media.src}
                      alt={project.title}
                      className={styles.image}
                      width={800}
                      height={500}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      fetchPriority={idx === 0 ? 'high' : 'auto'}
                    />
                  </picture>
                  <div className={styles.mediaOverlay} />
                </div>

                {/* Right: Rich Details Column */}
                <div className={styles.contentWrapper}>
                  {/* Top Meta: Index, Client Descriptor & Status */}
                  <div className={styles.topMeta}>
                    <div className={styles.metaLeft}>
                      <span className={styles.indexLabel}>PROJ // {project.index}</span>
                      <span className={styles.clientLabel}>{displayClient}</span>
                    </div>
                    <span className={styles.statusBadge}>{project.status}</span>
                  </div>

                  {/* Title & Outcome */}
                  <div className={styles.mainInfo}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.outcome}>{project.outcome}</p>
                  </div>

                  {/* Technologies Used */}
                  <div className={styles.techTagsRow}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Engineering Highlights / Bullet Points */}
                  {project.approach && project.approach.length > 0 && (
                    <div className={styles.highlightsBlock}>
                      <span className={styles.highlightsHeading}>KEY ENGINEERING HIGHLIGHTS:</span>
                      <ul className={styles.highlightsList} role="list">
                        {project.approach.slice(0, 3).map((bullet, bIdx) => (
                          <li key={bIdx} className={styles.highlightItem}>
                            <span className={styles.bulletSymbol}>▹</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Bottom Row: Metrics & Case Study Action */}
                  <div className={styles.bottomCardRow}>
                    <div className={styles.metricsRow}>
                      {displayMetrics.map((m, mIdx) => (
                        <div key={mIdx} className={styles.metricItem}>
                          <span className={styles.metricItemLabel}>{m.label}</span>
                          <span className={styles.metricItemValue}>{m.value}</span>
                          {m.context && (
                            <span className={styles.metricItemContext}>{m.context}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <span className={styles.openLinkBadge}>
                      Case Study <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Full-Screen Modal Overlay (Rendered in Portal at document.body) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeProject && (
              <motion.div
                className={styles.overlayBackdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeModal}
                role="dialog"
                aria-modal="true"
                aria-label={`${activeProject.title} Case Study`}
                data-lenis-prevent="true"
              >
                <motion.div
                  className={styles.modalContent}
                  initial={{ scale: 0.96, y: 24 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.96, y: 24 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  onClick={(e) => e.stopPropagation()}
                  data-lenis-prevent="true"
                >
                  {/* Sticky Modal Header */}
                  <div className={styles.modalHeader}>
                    <div className={styles.modalHeaderLeft}>
                      <div className={styles.modalHeaderMeta}>
                        <span className="mono-label">CASE STUDY // {activeProject.index}</span>
                        <span className={styles.clientLabel}>
                          {activeProject.clientIsPublic
                            ? activeProject.title
                            : activeProject.clientDisplayName}
                        </span>
                        <span className={styles.statusBadge}>{activeProject.status}</span>
                      </div>
                      <h2 className={styles.modalTitle}>{activeProject.title}</h2>
                    </div>

                    <button
                      type="button"
                      className={styles.closeButton}
                      onClick={closeModal}
                      aria-label="Close case study modal"
                    >
                      <span>ESC</span>
                      <X size={14} />
                    </button>
                  </div>

                  {/* Modal Body - 2-Column Responsive Layout */}
                  <div className={styles.modalBody} data-lenis-prevent="true">
                    {/* Left Column: Media + Metrics + Tech Stack */}
                    <div className={styles.modalLeftCol}>
                      <div className={styles.modalHeroMedia}>
                        <img src={activeProject.media.src} alt={activeProject.title} />
                      </div>

                      {/* Verified Metrics Cards */}
                      {activeProject.metrics && activeProject.metrics.length > 0 && (
                        <div className={styles.modalMetricsGrid}>
                          {activeProject.metrics.map((m, mIdx) => (
                            <div key={mIdx} className={styles.metricCard}>
                              <span className={styles.metricItemLabel}>{m.label}</span>
                              <span className={styles.metricItemValue}>{m.value}</span>
                              {m.context && (
                                <span className={styles.metricItemContext}>{m.context}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className={styles.modalTechGroup}>
                        <span className={styles.modalSectionTitle}>04 // Technologies Deployed</span>
                        <div className={styles.techTags}>
                          {activeProject.technologies.map((tech) => (
                            <span key={tech} className={styles.techTag}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Problem, Approach Highlights, Results, and CTA */}
                    <div className={styles.modalRightCol}>
                      {/* Section 01: Problem & Constraints */}
                      <div className={styles.modalSection}>
                        <span className={styles.modalSectionTitle}>01 // Problem & Constraints</span>
                        <p className={styles.modalSectionContent}>{activeProject.problem}</p>
                      </div>

                      {/* Section 02: Technical Approach */}
                      <div className={styles.modalSection}>
                        <span className={styles.modalSectionTitle}>02 // Technical Approach & Highlights</span>
                        <ul className={styles.modalList}>
                          {activeProject.approach.map((point, pIdx) => (
                            <li key={pIdx} className={styles.modalListItem}>
                              <span className={styles.modalBullet}>▹</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Section 03: Production Results & Benchmarks */}
                      <div className={styles.modalSection}>
                        <span className={styles.modalSectionTitle}>03 // Production Results & Benchmarks</span>
                        <ul className={styles.modalList}>
                          {activeProject.results.map((res, rIdx) => (
                            <li key={rIdx} className={styles.modalListItem}>
                              <span className={styles.modalBullet}>▹</span>
                              <span>{res}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Modal Footer CTA */}
                      <div className={styles.modalFooterRow}>
                        <span className="mono-label">READY TO DISCUSS A SIMILAR SOLUTION?</span>
                        <MagneticButton href="#contact" variant="primary" onClick={handleInquiryClick}>
                          Start Inquiry <ArrowUpRight size={14} />
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
