// client/src/components/sections/Experience.jsx
import React from 'react';
import { experience, education, credentials } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className={styles.section} aria-label="Experience and Background">
      <div className="container">
        <div className={styles.layout}>
          {/* Sticky Left Column */}
          <div className={styles.stickyCol}>
            <SectionHeader
              eyebrow="04 / TRACK RECORD"
              title="Work & Background"
              description="Engineering roles, core industrial deployments, formal academic foundations, and verified problem-solving credentials."
            />
          </div>

          {/* Right Column: Timeline nodes */}
          <div className={styles.timeline}>
            {/* SmarDen Role */}
            {experience.map((item, idx) => (
              <div key={idx} className={styles.node}>
                <div className={styles.roleHeader}>
                  <h3 className={styles.roleTitle}>{item.role}</h3>
                  <div className={styles.companyRow}>
                    <span>{item.company}</span>
                    <span>·</span>
                    <span>{item.location}</span>
                  </div>
                  <span className={styles.periodBadge}>{item.period} · {item.type}</span>
                </div>

                <p className={styles.description}>{item.description}</p>

                <ul className={styles.achievementsList} role="list">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className={styles.achievementItem}>
                      <span className={styles.bullet}>▹</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Quieter Education Sub-Block Node */}
            <div className={`${styles.node} ${styles.nodeEducation}`}>
              <div className={styles.roleHeader}>
                <span className="mono-label">ACADEMIC FOUNDATION</span>
                <h3 className={styles.roleTitle}>{education.degree}</h3>
                <div className={styles.companyRow}>
                  <span>{education.institution}</span>
                  <span>·</span>
                  <span>{education.period}</span>
                </div>
              </div>

              <div className={styles.educationCard}>
                <span className="mono-label">CORE COMPUTER SCIENCE CURRICULUM</span>
                <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', lineHeight: '1.6' }}>
                  {education.fundamentals.join(' · ')}
                </p>

                {/* Single Credentials Row in Mono */}
                <div className={styles.credentialsRow}>
                  {credentials.map((cred, cIdx) => (
                    <React.Fragment key={cred.label}>
                      <span>{cred.label} ({cred.detail})</span>
                      {cIdx < credentials.length - 1 && (
                        <span className={styles.credentialSep}>·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
