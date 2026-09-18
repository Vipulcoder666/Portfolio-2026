// client/src/components/sections/Capabilities.jsx
import React from 'react';
import { capabilities } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import styles from './Capabilities.module.css';

export default function Capabilities() {
  return (
    <section id="capabilities" className={styles.section} aria-label="Capabilities and Pillars">
      <div className="container">
        <SectionHeader
          eyebrow="02 / CAPABILITIES"
          title="Engineering Core Disciplines"
          description="A rare cross-disciplinary skillset bridging machine learning model training, edge hardware deployment, and scalable backend infrastructure."
        />

        <div className={styles.grid}>
          {capabilities.map((cap) => (
            <div key={cap.index} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.index}>DISCIPLINE // {cap.index}</span>
                <h3 className={styles.title}>{cap.title}</h3>
                <p className={styles.description}>{cap.description}</p>
              </div>

              <ul className={styles.deliverablesList} role="list">
                {cap.deliverables.map((item, idx) => (
                  <li key={idx} className={styles.deliverableItem}>
                    <span className={styles.bullet}>▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
