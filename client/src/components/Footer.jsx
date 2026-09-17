import React from 'react';
import { Code2, Globe, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Vipul <span className="gradient-text">Shrivastav</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Software Developer • MERN Stack & Computer Vision Specialist
            </p>
          </div>

          <div className="social-links">
            <a href="https://github.com/Vipulcoder666" target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
              <Terminal size={18} />
            </a>
            <a href="https://linkedin.com/in/vipul-shrivastav-7506a5258" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <Globe size={18} />
            </a>
            <a href="https://leetcode.com/u/vipul_666" target="_blank" rel="noreferrer" className="social-icon" title="LeetCode">
              <Code2 size={18} />
            </a>
          </div>
        </div>

        <div className="copyright">
          © 2026 Vipul Shrivastav. Built with React, Node.js, Express, and MongoDB. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
