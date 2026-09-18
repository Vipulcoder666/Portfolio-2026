// client/src/components/sections/Stack.jsx
import React from 'react';
import { stackGroups, workflowSteps } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import styles from './Stack.module.css';

export default function Stack() {
  return (
    <section id="stack" className={styles.section} aria-label="Technical Stack and Workflow">
      <div className="container">
        <SectionHeader
          eyebrow="05 / INSTRUMENTATION"
          title="Technologies & Tools"
          description="A vetted toolkit prioritizing speed, mathematical precision, and rock-solid edge reliability over frontend hype."
        />

        {/* Stack Groups */}
        <div className={styles.groupsGrid}>
          {stackGroups.map((group) => (
            <div key={group.category} className={styles.groupCard}>
              <span className={styles.categoryTitle}>{group.category}</span>
              <ul className={styles.itemsList} role="list">
                {group.items.map((item) => (
                  <li key={item} className={styles.itemTag}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Workflow */}
        <div className={styles.workflowContainer}>
          <SectionHeader
            eyebrow="METHODOLOGY"
            title="How I Build & Deliver"
            description="From hardware constraint analysis and active-learning data annotation to robust factory floor deployment."
          />

          <div className={styles.workflowGrid}>
            {workflowSteps.map((step) => (
              <div key={step.number} className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
