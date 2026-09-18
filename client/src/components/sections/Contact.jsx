// client/src/components/sections/Contact.jsx
import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, contactFormOptions } from '../../data/content';
import { sendContact } from '../../lib/api';
import SectionHeader from '../ui/SectionHeader';
import SegmentedControl from '../ui/SegmentedControl';
import MagneticButton from '../ui/MagneticButton';
import styles from './Contact.module.css';

export default function Contact() {
  const [intent, setIntent] = useState('hiring'); // 'hiring' | 'project'
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleLink: '',
    projectType: contactFormOptions.clientProjectTypes[0],
    budget: contactFormOptions.budgetRanges[0],
    timeline: '',
    message: '',
    honeypot: ''
  });

  const [errors, setErrors] = useState({});

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please provide a brief message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      await sendContact({ ...formData, intent });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Unable to send message directly to server.');
    }
  };

  const mailtoFallback = `mailto:${personalInfo.links.email}?subject=${encodeURIComponent(
    intent === 'hiring' ? 'Hiring Inquiry for Vipul Shrivastav' : 'Project Inquiry for Vipul Shrivastav'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n${
      intent === 'hiring' ? `Company: ${formData.company}\nRole: ${formData.roleLink}` : `Project: ${formData.projectType}\nBudget: ${formData.budget}`
    }\n\n${formData.message}`
  )}`;

  return (
    <section id="contact" className={styles.section} aria-label="Contact and Inquiries">
      <div className="container">
        <SectionHeader
          eyebrow="07 / CONTACT"
          title="Direct Engineering Inquiry"
          description="Whether you have an open software engineering role, need an industrial vision pipeline, or want to consult on edge automation."
        />

        <div className={styles.layout}>
          {/* Left Column: Fast Copy Email & Socials */}
          <div className={styles.leftCol}>
            <div className={styles.emailCard}>
              <span className="mono-label">PRIMARY INBOX</span>
              <div className={styles.emailDisplay}>{personalInfo.links.email}</div>

              <div className={styles.emailActions}>
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} className={styles.copySuccess} />
                      <span className={styles.copySuccess}>Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.links.email}`}
                  className={styles.copyButton}
                  style={{ textDecoration: 'none' }}
                >
                  <span>Open client</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Social links grid */}
            <div className={styles.socialsGrid}>
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <span>GitHub</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={personalInfo.links.leetcode}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <span>LeetCode</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={personalInfo.links.resume}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <span>Resume (PDF)</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Intent-Split Form */}
          <div className={styles.formContainer}>
            <div className={styles.segmentedWrapper}>
              <SegmentedControl
                name="contact-intent"
                value={intent}
                onChange={(val) => {
                  setIntent(val);
                  setErrors({});
                }}
                options={[
                  { label: 'Hiring me', value: 'hiring' },
                  { label: 'Project inquiry', value: 'project' }
                ]}
              />
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.feedbackCard}
                >
                  <div className={styles.successIcon}>
                    <Check size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--fg)' }}>
                    Message Dispatched
                  </h3>
                  <p style={{ color: 'var(--fg-muted)', fontSize: '0.9375rem', maxWidth: '360px' }}>
                    Thank you! Your inquiry has been logged and delivered directly to Vipul's inbox.
                    Expect a reply within 24 hours.
                  </p>
                  <MagneticButton
                    variant="secondary"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        roleLink: '',
                        projectType: contactFormOptions.clientProjectTypes[0],
                        budget: contactFormOptions.budgetRanges[0],
                        timeline: '',
                        message: '',
                        honeypot: ''
                      });
                    }}
                  >
                    Send Another Message
                  </MagneticButton>
                </motion.div>
              ) : (
                <motion.form
                  key={intent}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="phone_verification"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex="-1"
                    autoComplete="off"
                    className={styles.honeypot}
                    aria-hidden="true"
                  />

                  {/* Name & Email */}
                  <div className={styles.twoCols}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="contact-name" className={styles.label}>
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        placeholder="e.g. Alex Rivera"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="contact-email" className={styles.label}>
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>
                  </div>

                  {/* Intent-specific fields */}
                  {intent === 'hiring' ? (
                    <div className={styles.twoCols}>
                      <div className={styles.fieldGroup}>
                        <label htmlFor="contact-company" className={styles.label}>
                          Company / Organization
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          className={styles.input}
                          placeholder="e.g. Acme Corp"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label htmlFor="contact-role" className={styles.label}>
                          Role Title / Job Link
                        </label>
                        <input
                          id="contact-role"
                          type="text"
                          className={styles.input}
                          placeholder="e.g. Software Engineer (CV)"
                          value={formData.roleLink}
                          onChange={(e) => setFormData({ ...formData, roleLink: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={styles.twoCols}>
                        <div className={styles.fieldGroup}>
                          <label htmlFor="contact-type" className={styles.label}>
                            Project Type
                          </label>
                          <select
                            id="contact-type"
                            className={styles.select}
                            value={formData.projectType}
                            onChange={(e) =>
                              setFormData({ ...formData, projectType: e.target.value })
                            }
                          >
                            {contactFormOptions.clientProjectTypes.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={styles.fieldGroup}>
                          <label htmlFor="contact-budget" className={styles.label}>
                            Budget Tier
                          </label>
                          <select
                            id="contact-budget"
                            className={styles.select}
                            value={formData.budget}
                            onChange={(e) =>
                              setFormData({ ...formData, budget: e.target.value })
                            }
                          >
                            {contactFormOptions.budgetRanges.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className={styles.fieldGroup}>
                        <label htmlFor="contact-timeline" className={styles.label}>
                          Estimated Timeline
                        </label>
                        <input
                          id="contact-timeline"
                          type="text"
                          className={styles.input}
                          placeholder="e.g. 2-4 weeks, or Q4 release"
                          value={formData.timeline}
                          onChange={(e) =>
                            setFormData({ ...formData, timeline: e.target.value })
                          }
                        />
                      </div>
                    </>
                  )}

                  {/* Message textarea */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-message" className={styles.label}>
                      {intent === 'hiring' ? 'Opportunity Overview *' : 'Project Scope & Requirements *'}
                    </label>
                    <textarea
                      id="contact-message"
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                      placeholder={
                        intent === 'hiring'
                          ? 'Describe the team, tech stack, and what problems you need solved...'
                          : 'Describe your camera stream, edge hardware target, accuracy requirements, or application needs...'
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && (
                      <span className={styles.errorText}>{errors.message}</span>
                    )}
                  </div>

                  {/* Error banner with mailto fallback */}
                  {status === 'error' && (
                    <div className={styles.errorBanner}>
                      <span>{errorMessage}</span>
                      <span>
                        Alternatively, you can email directly:{' '}
                        <a href={mailtoFallback}>Click to send via your email client</a>
                      </span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className={styles.submitButton}>
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      disabled={status === 'submitting'}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <span className={styles.spinner} aria-hidden="true" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send size={14} />
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
