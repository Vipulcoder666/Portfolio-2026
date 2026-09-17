import React from 'react';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Professional History</div>
          <h2 className="section-title">Industry <span className="gradient-text">Experience</span></h2>
          <p className="section-desc">
            Proven track record of engineering production-grade software solutions for enterprise clients.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-card glass-panel">
            <div className="timeline-badge">
              <Building2 size={20} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <h3 className="exp-role">Software Engineer</h3>
                <div className="exp-company">SmarDen Automation — Haryana, India</div>
              </div>
              <div className="exp-period" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} /> June 2026 – Present
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.95rem' }}>
              Full-ownership software engineering position responsible for real-time backends, computer vision pipelines, and production API design for marquee enterprise clients.
            </p>

            <ul className="exp-list">
              <li>
                <strong>Automated Industrial Detection Pipeline:</strong> Engineered an end-to-end vision detection pipeline (data collection, Roboflow annotation, model integration, inference) achieving <strong>91.9% mAP</strong> and <strong>99% precision</strong> for a premier automotive manufacturing client — driving full project ownership from architectural design to factory deployment.
              </li>
              <li>
                <strong>High-Speed Product Counting Backend:</strong> Built a real-time Python backend system for a product-counting pipeline deployed for a leading quick-commerce fulfillment network, handling dynamic real-world environment conditions with robust error handling and modular design.
              </li>
              <li>
                <strong>Production API & Systems Optimization:</strong> Developed clean, testable code for REST APIs and integrated edge vision models with local database layers for continuous audit tracking.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
