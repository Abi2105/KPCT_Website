const express = require('express');
const crypto = require('crypto');

const { adminApiKey } = require('../config');
const { addSubmission, readSubmissions } = require('../store');

const router = express.Router();

const REQUIRED_FIELDS = ['name', 'email', 'subject', 'message'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 2000;

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

function validate(body) {
  const errors = {};

  REQUIRED_FIELDS.forEach((field) => {
    if (!clean(body[field])) errors[field] = `${field} is required`;
  });

  const email = clean(body.email);
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = 'A valid email address is required';
  }

  Object.entries(body || {}).forEach(([field, value]) => {
    if (typeof value === 'string' && value.length > MAX_LENGTH) {
      errors[field] = `${field} must be ${MAX_LENGTH} characters or fewer`;
    }
  });

  return errors;
}

router.post('/', async (req, res, next) => {
  try {
    const errors = validate(req.body || {});

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.',
        errors,
      });
    }

    const submission = {
      id: crypto.randomUUID(),
      name: clean(req.body.name),
      email: clean(req.body.email),
      phone: clean(req.body.phone),
      subject: clean(req.body.subject),
      interest: clean(req.body.interest),
      message: clean(req.body.message),
      source: clean(req.body.source) || 'website',
      receivedAt: new Date().toISOString(),
    };

    const saved = await addSubmission(submission);
    console.log('Contact submission stored:', { id: saved.id, source: saved.source });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
      id: saved.id,
    });
  } catch (error) {
    return next(error);
  }
});

/**
 * Reads stored submissions back out of Supabase.
 *
 * Submissions contain personal data (names, emails, phone numbers), so this is
 * never public: it requires the ADMIN_API_KEY from backend/.env, sent as an
 * `x-admin-key` header. With no key configured the endpoint stays disabled.
 */
router.get('/', async (req, res, next) => {
  try {
    if (!adminApiKey) {
      return res.status(503).json({
        success: false,
        message: 'Reading submissions is disabled. Set ADMIN_API_KEY in backend/.env to enable it.',
      });
    }

    const provided = req.get('x-admin-key') || '';
    const expected = Buffer.from(adminApiKey);
    const actual = Buffer.from(provided);
    const authorised =
      expected.length === actual.length && crypto.timingSafeEqual(expected, actual);

    if (!authorised) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);
    const submissions = await readSubmissions({ limit });

    return res.json({ success: true, count: submissions.length, submissions });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
