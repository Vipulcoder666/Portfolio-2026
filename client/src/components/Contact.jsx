import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, ExternalLink, Copy, Check, Globe, Terminal, Code2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'MERN Web Application',
    budgetRange: 'Flexible / Open Discussion',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, message: '' });
  const [copiedLink, setCopiedLink] = useState('');

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(''), 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setStatus({
          loading: false,
          success: true,
          message: data.message || "Message sent successfully! Vipul will contact you shortly."
        });
        setFormData({
          name: '',
          email: '',
          projectType: 'MERN Web Application',
          budgetRange: 'Flexible / Open Discussion',
          message: ''
        });
      } else {
        setStatus({
          loading: false,
          success: false,
          message: data.message || "Failed to send message. Please try again."
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        success: false,
        message: "Network error sending message. Please try again."
      });
    }
  };

  const socialLinks = [
    {
      key: 'linkedin',
      name: 'LinkedIn Profile',
      handle: 'linkedin.com/in/vipul-shrivastav-7506a5258',
      url: 'https://linkedin.com/in/vipul-shrivastav-7506a5258',
      icon: <Globe size={20} className="gradient-text" />,
      badge: 'Professional Network'
    },
    {
      key: 'github',
      name: 'GitHub Profile',
      handle: 'github.com/Vipulcoder666',
      url: 'https://github.com/Vipulcoder666',
      icon: <Terminal size={20} className="gradient-text" />,
      badge: 'Source Code Repositories'
    },
    {
      key: 'leetcode',
      name: 'LeetCode Profile',
      handle: 'leetcode.com/u/vipul_666',
      url: 'https://leetcode.com/u/vipul_666',
      icon: <Code2 size={20} className="gradient-text" />,
      badge: '100+ Problems Solved'
    },
    {
      key: 'email',
      name: 'Direct Email',
      handle: 'shrivastav.vipul252@gmail.com',
      url: 'mailto:shrivastav.vipul252@gmail.com',
      icon: <Mail size={20} className="gradient-text" />,
      badge: 'Instant Response'
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Let's Connect</div>
          <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
          <p className="section-desc">
            Interested in hiring me for a full-time engineering role or starting a freelance project? Connect via profile links or drop a message below!
          </p>
        </div>

        {/* Interactive Social Links Grid */}
        <div className="social-interactive-grid" style={{ marginBottom: '40px' }}>
          {socialLinks.map((item) => (
            <div key={item.key} className="social-card glass-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div className="social-card-icon">
                  {item.icon}
                </div>
                <span className="social-badge">{item.badge}</span>
              </div>

              <h4 className="social-card-title">{item.name}</h4>
              <p className="social-card-handle">{item.handle}</p>

              <div className="social-card-actions">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  Visit <ExternalLink size={14} />
                </a>

                <button
                  onClick={() => handleCopy(item.url, item.key)}
                  className="btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                  title="Copy link to clipboard"
                >
                  {copiedLink === item.key ? (
                    <>
                      <Check size={14} style={{ color: 'var(--accent-green)' }} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-grid">
          <div className="glass-panel" style={{ padding: '36px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '20px' }}>
              Direct Contact Details
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
              I respond promptly within 2-4 hours. Feel free to reach out directly via email, phone, or WhatsApp.
            </p>

            <div className="info-item">
              <div className="info-icon">
                <Mail size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Primary Email</span>
                <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>shrivastav.vipul252@gmail.com</p>
              </div>
              <button onClick={() => handleCopy('shrivastav.vipul252@gmail.com', 'email_direct')} className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                {copiedLink === 'email_direct' ? <Check size={14} style={{ color: 'var(--accent-green)' }} /> : <Copy size={14} />}
              </button>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Phone size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Phone / WhatsApp</span>
                <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>+91-7897516265</p>
              </div>
              <button onClick={() => handleCopy('+91-7897516265', 'phone_direct')} className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                {copiedLink === 'phone_direct' ? <Check size={14} style={{ color: 'var(--accent-green)' }} /> : <Copy size={14} />}
              </button>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <MapPin size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Location</span>
                <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>New Delhi, India</p>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '36px' }}>
            {status.success && (
              <div className="alert-success">
                <CheckCircle size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                {status.message}
              </div>
            )}

            {!status.success && status.message && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                <AlertCircle size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@company.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Project / Offer Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Full-Time Job Opportunity">Full-Time Job Opportunity</option>
                    <option value="MERN Web Application">MERN Web Application</option>
                    <option value="Computer Vision Model">Computer Vision Model</option>
                    <option value="Python API Backend">Python API Backend</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Budget</label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Full-Time Employment Salary">Full-Time Employment Salary</option>
                    <option value="Flexible / Open Discussion">Flexible / Open Discussion</option>
                    <option value="Starter MVP Project">Starter MVP Project</option>
                    <option value="Medium Custom Solution">Medium Custom Solution</option>
                    <option value="Large Enterprise System">Large Enterprise System</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Details / Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or job opening details..."
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px 24px', fontSize: '1rem' }}
              >
                {status.loading ? 'Sending Submission...' : (
                  <>
                    <Send size={18} /> Send Inquiry to Vipul
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
