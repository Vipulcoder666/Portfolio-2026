// client/src/lib/api.js
// Client API utility for form submissions and server communications.

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Sends contact or hiring inquiry to the backend.
 * @param {Object} payload
 * @param {'hiring'|'project'} payload.intent
 * @param {string} payload.name
 * @param {string} payload.email
 * @param {string} [payload.company]
 * @param {string} [payload.roleLink]
 * @param {string} [payload.projectType]
 * @param {string} [payload.budget]
 * @param {string} [payload.timeline]
 * @param {string} payload.message
 * @param {string} [payload.honeypot]
 */
export async function sendContact(payload) {
  // Silent drop for honeypot bot submissions
  if (payload.honeypot && payload.honeypot.trim() !== '') {
    return { success: true, message: 'Message received.' };
  }

  const isHiring = payload.intent === 'hiring';

  const formattedBody = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    projectType: isHiring ? 'Full-Time Job Opportunity' : (payload.projectType || 'General Project Inquiry'),
    budgetRange: isHiring
      ? (payload.company ? `Company: ${payload.company.trim()}` : 'Full-Time Position')
      : (payload.budget || 'Flexible / Open Discussion'),
    message: isHiring
      ? `[HIRING INQUIRY]\nCompany: ${payload.company || 'Not specified'}\nRole / Job Link: ${payload.roleLink || 'Not specified'}\n\nCandidate Message:\n${payload.message.trim()}`
      : `[PROJECT INQUIRY]\nProject Type: ${payload.projectType || 'Custom Solution'}\nBudget: ${payload.budget || 'Flexible'}\nTimeline: ${payload.timeline || 'Flexible'}\n\nProject Scope:\n${payload.message.trim()}`
  };

  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Server returned error (${response.status})`);
  }

  return response.json();
}
