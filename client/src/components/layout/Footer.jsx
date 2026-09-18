// client/src/components/layout/Footer.jsx
import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/content';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.content}`}>
        <div className={styles.topRow}>
          <div className={styles.statusWrapper}>
            <span className={styles.pulseDot} aria-hidden="true" />
            <span>{personalInfo.availability}</span>
          </div>

          <ul className={styles.linksList} role="list">
            <li>
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noreferrer"
                className={styles.linkItem}
              >
                GitHub <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className={styles.linkItem}
              >
                LinkedIn <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a
                href={personalInfo.links.leetcode}
                target="_blank"
                rel="noreferrer"
                className={styles.linkItem}
              >
                LeetCode <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a
                href={personalInfo.links.resume}
                target="_blank"
                rel="noreferrer"
                className={styles.linkItem}
              >
                Resume <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${personalInfo.links.email}`}
                className={styles.linkItem}
              >
                Email <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.legal}>
            © 2026 {personalInfo.name} · {personalInfo.location} · All rights reserved
          </div>

          <button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
