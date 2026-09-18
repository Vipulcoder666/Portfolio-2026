// client/src/components/sections/Services.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { services } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import MagneticButton from '../ui/MagneticButton';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section id="services" className={styles.section} aria-label="Services & Engagement Models">
      <div className="container">
        <SectionHeader
          eyebrow="06 / SERVICES"
          title="Engagement & Deliverables"
          description="Available for select contract, consulting, and full-time software engineering engagements. No hidden retainers—direct engineering collaboration."
        />

        <div className={styles.grid}>
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`${styles.card} ${service.featured ? styles.featuredCard : ''}`}
            >
              {service.featured && (
                <div className={styles.featuredBadge}>MOST SOUGHT</div>
              )}

              <div className={styles.cardTop}>
                <span className={styles.tagline}>{service.tagline}</span>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.description}>{service.description}</p>
              </div>

              <ul className={styles.featuresList} role="list">
                {service.features.map((feat, fIdx) => (
                  <li key={fIdx} className={styles.featureItem}>
                    <span className={styles.bullet}>▹</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <MagneticButton
                href="#contact"
                variant={service.featured ? 'primary' : 'secondary'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Inquire About Service <ArrowRight size={14} />
              </MagneticButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
