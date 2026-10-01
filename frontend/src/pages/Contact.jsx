import { useEffect, useRef, useState } from 'react';

import { sendContactMessage } from '../api/client.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { SOCIAL_LINKS } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import '../styles/contact.css';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  interest: '',
  message: '',
};

const INTEREST_OPTIONS = [
  { value: 'volunteer', label: 'Volunteer Opportunities' },
  { value: 'donate', label: 'Donations & Support' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'programs', label: 'Program Information' },
  { value: 'general', label: 'General Inquiry' },
];

const WAYS = [
  {
    icon: '💬',
    title: 'Email',
    text: "Send us a detailed message and we'll respond within 24 hours. Perfect for inquiries and formal communications.",
  },
  {
    icon: '📞',
    title: 'Phone',
    text: 'Call us directly for immediate assistance. Our team is available during office hours for quick conversations.',
  },
  {
    icon: '🤝',
    title: 'Visit Us',
    text: 'Visit our office in Tiruttani to meet the team in person. We welcome visitors and partners interested in our work.',
  },
];

export default function Contact() {
  useDocumentTitle('Contact Us | KPCT - Kandhasamy Public Charitable Trust');

  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearTimeout(timerRef.current);

    // Same client-side check the original page performed before submitting.
    const required = ['name', 'email', 'subject', 'message', 'interest'];
    if (required.some((field) => !form[field].trim())) {
      setStatus({ state: 'error', message: 'Please fill all required fields.' });
      return;
    }

    setStatus({ state: 'sending', message: '' });

    try {
      const result = await sendContactMessage({ ...form, source: 'contact-page' });
      setStatus({ state: 'success', message: result.message });
      setForm(EMPTY_FORM);
      // The original page hid the confirmation again after five seconds.
      timerRef.current = setTimeout(() => setStatus({ state: 'idle', message: '' }), 5000);
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  return (
    <div className="page-contact">
      <PageHero
        eyebrow="Contact"
        title="Get In Touch"
        lede="We'd love to hear from you. Let's connect and explore how we can work together."
        current="Contact"
      />

      <section className="section">
        <div className="container">
          <div className="split contact-grid">
            {/* ------------------------------------------- Contact details */}
            <div className="contact-info">
              <Reveal>
                <p className="eyebrow">Reach Us</p>
                <h2>Contact Information</h2>
                <p className="contact-lede">
                  Reach out to us through any of these channels. We&apos;re here to answer your
                  questions and discuss opportunities to collaborate.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <ul className="contact-details">
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      📍
                    </span>
                    <div>
                      <h4>Address</h4>
                      <p>
                        No.141, Dr. Genguswamy Naidu School Street
                        <br />
                        Tiruttani – 631209
                        <br />
                        Tamil Nadu, India
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      📧
                    </span>
                    <div>
                      <h4>Email</h4>
                      <p>
                        <a href="mailto:kpcttrt@gmail.com">kpcttrt@gmail.com</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      📱
                    </span>
                    <div>
                      <h4>Phone</h4>
                      <p>
                        <a href="tel:+917708162084">+91 7708162084</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      🕐
                    </span>
                    <div>
                      <h4>Office Hours</h4>
                      <p>
                        Monday - Saturday
                        <br />
                        9:00 AM - 5:00 PM IST
                        <br />
                        (Closed on Sundays &amp; Public Holidays)
                      </p>
                    </div>
                  </li>
                </ul>
              </Reveal>

              <Reveal delay={140} className="contact-social">
                <h4>Follow Us</h4>
                <div className="social-row">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`social-link ${social.className}`}
                      target="_blank"
                      rel="noopener"
                      aria-label={social.label}
                      title={social.label}
                    >
                      {social.glyph}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* --------------------------------------------------- Form */}
            <Reveal delay={120}>
              <div className="form-card">
                <h3>Send us a Message</h3>

                {status.state === 'success' && (
                  <p className="alert alert-success" role="status">
                    <span aria-hidden="true">✓</span> {status.message}
                  </p>
                )}
                {status.state === 'error' && (
                  <p className="alert alert-error" role="alert">
                    <span aria-hidden="true">✗</span> {status.message}
                  </p>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="subject">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="interest">Interest *</label>
                    <select
                      id="interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select an option --</option>
                      {INTEREST_OPTIONS.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-block btn-lg"
                    disabled={status.state === 'sending'}
                  >
                    {status.state === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Ways to connect */}
      <section className="section section-muted">
        <div className="container">
          <SectionHead
            eyebrow="Ways to Connect"
            title="Ways to Connect With Us"
            lede="Choose the method that works best for you"
            center
          />
          <div className="grid grid-3">
            {WAYS.map((way, index) => (
              <Reveal key={way.title} delay={index * 90}>
                <article className="card card-interactive way-card">
                  <span className="icon-tile icon-tile-lg" aria-hidden="true">
                    {way.icon}
                  </span>
                  <h3>{way.title}</h3>
                  <p>{way.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
