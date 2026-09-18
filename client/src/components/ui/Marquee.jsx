// client/src/components/ui/Marquee.jsx
import React from 'react';
import styles from './Marquee.module.css';

export default function Marquee({ items = [], className = '' }) {
  if (!items || items.length === 0) return null;

  // Duplicate items to ensure smooth seamless loop
  const displayItems = [...items, ...items];

  return (
    <div className={`${styles.wrapper} ${className}`} aria-hidden="true">
      <div className={styles.track}>
        {displayItems.map((item, idx) => (
          <div key={`${item}-${idx}`} className={styles.item}>
            <span>{item}</span>
            <span className={styles.separator} />
          </div>
        ))}
      </div>
    </div>
  );
}
