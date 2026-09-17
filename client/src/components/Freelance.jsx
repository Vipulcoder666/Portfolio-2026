import React from 'react';
import { DollarSign, Zap, Shield, Check, ArrowRight } from 'lucide-react';

export default function Freelance() {
  const packages = [
    {
      name: "REST API & Backend MVP",
      tagline: "Tailored Architecture",
      popular: false,
      description: "Custom Node.js / Express backend with MongoDB database models, JWT authentication, and high-performance REST API endpoints.",
      features: [
        "Node.js & Express RESTful API",
        "MongoDB Schema Design & Mongoose Setup",
        "Secure JWT Authentication & Middleware",
        "Complete Postman Documentation",
        "Fast Agile Delivery"
      ]
    },
    {
      name: "Custom Computer Vision Pipeline",
      tagline: "Industrial Grade AI",
      popular: true,
      description: "End-to-end Machine Vision detection or counting pipeline tailored for factory, warehouse, or retail camera feeds.",
      features: [
        "YOLOv11 / OpenCV Object Detection Model",
        "Dataset Annotation & Augmentation (Roboflow)",
        "Real-Time Camera Stream / Video Inference",
        "Raspberry Pi / Edge Device Optimization",
        "Python API & Live Dashboard Interface"
      ]
    },
    {
      name: "Full-Stack MERN Web Application",
      tagline: "Complete Digital Product",
      popular: false,
      description: "Turnkey React frontend + Express backend + MongoDB database full-stack platform with high-converting glassmorphism UI.",
      features: [
        "React Frontend with Custom Glassmorphism UI",
        "Express Backend & MongoDB Integration",
        "Responsive Mobile & Desktop Layout",
        "Deployment Support (Vercel / Render / AWS)",
        "Post-Launch Maintenance Support"
      ]
    }
  ];

  return (
    <section id="freelance" className="freelance-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Hire For Projects</div>
          <h2 className="section-title">Freelance <span className="gradient-text">Services</span></h2>
          <p className="section-desc">
            Looking for a custom software solution, Computer Vision model, or Full-Stack web application? I deliver fast, production-ready code.
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, idx) => (
            <div key={idx} className={`package-card glass-panel ${pkg.popular ? 'popular' : ''}`}>
              {pkg.popular && <span className="package-badge">Featured Solution</span>}
              <h3 className="package-name">{pkg.name}</h3>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontFamily: 'var(--font-code)' }}>
                {pkg.tagline}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>{pkg.description}</p>

              <ul className="package-features">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx}>{feat}</li>
                ))}
              </ul>

              <a 
                href="#contact" 
                className={pkg.popular ? 'btn-primary' : 'btn-secondary'}
                style={{ justifyContent: 'center', width: '100%', marginTop: 'auto' }}
              >
                Inquire Project <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
