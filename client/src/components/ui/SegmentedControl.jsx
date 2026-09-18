// client/src/components/ui/SegmentedControl.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './SegmentedControl.module.css';

export default function SegmentedControl({
  options = [],
  value,
  onChange,
  className = '',
  name = 'segmented-control'
}) {
  return (
    <div className={`${styles.container} ${className}`} role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={`${styles.button} ${isSelected ? styles.activeButton : ''}`}
            onClick={() => onChange(option.value)}
          >
            {isSelected && (
              <motion.div
                layoutId={`segment-${name}`}
                className={styles.indicator}
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
