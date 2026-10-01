// Base URL of the Express API. Empty in production builds, where the API
// serves the built app and requests are same-origin.
const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

async function request(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(payload?.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.errors = payload?.errors || {};
    throw error;
  }

  return payload;
}

export function sendContactMessage(data) {
  return request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getHealth() {
  return request('/api/health');
}
