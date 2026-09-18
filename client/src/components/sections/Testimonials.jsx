// client/src/components/sections/Testimonials.jsx
// Note: Kept for future real, attributed testimonials ({ quote, name, title, company, avatar? }).
// Not rendered on the live site until verified testimonials are added.

import React from 'react';
import { testimonials } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';

export default function Testimonials() {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" style={{ padding: '100px 0' }} aria-label="Client & Partner Testimonials">
      <div className="container">
        <SectionHeader
          eyebrow="ENDORSEMENTS"
          title="What Engineering Partners Say"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px'
              }}
            >
              <p style={{ fontStyle: 'italic', color: 'var(--fg)', marginBottom: '20px' }}>
                "{t.quote}"
              </p>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--fg)' }}>{t.name}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)' }}>
                  {t.title} · {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
