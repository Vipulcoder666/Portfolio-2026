// client/src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalTime } from '../../hooks/useLocalTime';
import { personalInfo } from '../../data/content';
import MagneticButton from '../ui/MagneticButton';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('work');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentTime = useLocalTime('Asia/Kolkata');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(NAV_LINKS[i].id);
        if (sectionEl && sectionEl.offsetTop <= scrollY) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main Navigation">
        {/* Monogram Brand */}
        <a href="#main-content" className={styles.brand} aria-label="Vipul Shrivastav Home">
          <span>{personalInfo.initials}</span>
          <span className={styles.brandDot} aria-hidden="true" />
        </a>

        {/* Desktop Navigation Links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`${styles.link} ${isActive ? styles.activeLink : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Group: IST Clock + CTA */}
        <div className={styles.rightGroup}>
          {currentTime && (
            <div className={styles.timeBadge} aria-label={`Current time in India: ${currentTime}`}>
              <span>IST</span>
              <span>{currentTime}</span>
            </div>
          )}

          <MagneticButton
            href="#contact"
            variant="primary"
            style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
          >
            Let's talk
          </MagneticButton>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={styles.mobileDrawer}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`${styles.mobileLink} ${isActive ? styles.mobileActiveLink : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
