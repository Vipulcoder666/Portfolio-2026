// client/src/components/ui/SectionHeader.jsx
import React from 'react';
import styles from './SectionHeader.module.css';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = ''
}) {
  return (
    <div className={`${styles.header} ${className}`}>
      {eyebrow && (
        <div className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
