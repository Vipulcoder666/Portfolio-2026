import React from 'react';
import { GraduationCap, Award, Code2, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Credentials & Education</div>
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-desc">
            Passionate Software Engineer driven by building scalable web applications and high-impact machine vision systems that solve real-world problems.
          </p>
        </div>

        <div className="about-grid">
          <div className="info-box glass-panel">
            <h3 className="info-box-title">
              <GraduationCap className="gradient-text" size={28} /> Education & Foundation
            </h3>

            <div className="info-item">
              <div className="info-icon">
                <GraduationCap size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  B.Tech in Computer Science & Engineering
                </h4>
                <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.95rem' }}>
                  Maharana Pratap Group of Institutions, Kanpur
                </p>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontFamily: 'var(--font-code)', marginTop: '4px' }}>
                  2022 – 2026
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Code2 size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Core Computer Science Fundamentals
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                  Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems, Software Engineering & SDLC.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box glass-panel">
            <h3 className="info-box-title">
              <Award className="gradient-text" size={28} /> Certifications & Competitive Coding
            </h3>

            <div className="info-item">
              <div className="info-icon">
                <Award size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  HackerRank 5-Star Badge
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
                  Verified 5-Star Badge in Problem Solving & SQL.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  GeeksforGeeks MongoDB Basics
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
                  Certified in MongoDB schema design, indexing, and aggregation pipelines.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Code2 size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  LeetCode Problem Solver
                </h4>
                <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>
                  Solved 100+ Data Structures & Algorithms problems (Arrays, Strings, HashMaps, Sliding Window, Two Pointers).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
