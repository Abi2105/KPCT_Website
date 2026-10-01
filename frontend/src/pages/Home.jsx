import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { sendContactMessage } from '../api/client.js';
import CountUp from '../components/CountUp.jsx';
import MediaPanel from '../components/MediaPanel.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { SOCIAL_LINKS } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import '../styles/home.css';

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
};

const IMPACT_STATS = [
  {
    number: '2500+',
    title: 'Students Supported',
    text: 'Educational scholarships and tuition support provided',
    icon: '🎓',
  },
  {
    number: '50K+',
    title: 'Lives Impacted',
    text: 'Community members reached through healthcare initiatives',
    icon: '💚',
  },
  {
    number: '15+',
    title: 'Villages Served',
    text: 'Rural communities benefiting from our programs',
    icon: '🏘️',
  },
  {
    number: '800+',
    title: 'Women Empowered',
    text: 'Skill training and livelihood opportunity programs',
    icon: '✊',
  },
];

const PROGRAMS = [
  {
    icon: '📚',
    title: 'Educational Programs',
    text: 'Free coaching classes, scholarship distribution, digital literacy, computer training, and mentorship programs for underprivileged children.',
  },
  {
    icon: '⚕️',
    title: 'Healthcare Services',
    text: 'Medical camps, health check-ups, awareness programs on nutrition, hygiene, preventive healthcare, and emergency medical support.',
  },
  {
    icon: '👩‍💼',
    title: 'Women Empowerment',
    text: 'Skill development training, self-help groups, financial literacy, and entrepreneurship support programs for women.',
  },
];

const CONTACT_FACTS = [
  { icon: '📍', label: 'Location', value: 'Tiruttani, Tamil Nadu 631209' },
  { icon: '📧', label: 'Email', value: 'kpcttrt@gmail.com' },
  { icon: '📱', label: 'Phone', value: '7708162084' },
  { icon: '🕐', label: 'Hours', value: 'Monday - Saturday, 9 AM - 5 PM IST' },
];

export default function Home() {
  useDocumentTitle('KPCT | Kandhasamy Public Charitable Trust');

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
    setStatus({ state: 'sending', message: '' });

    try {
      const result = await sendContactMessage({ ...form, source: 'home-quick-contact' });
      setStatus({ state: 'success', message: result.message });
      setForm(EMPTY_FORM);
      // The original page hid the confirmation again after five seconds.
      timerRef.current = setTimeout(() => setStatus({ state: 'idle', message: '' }), 5000);
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  return (
    <div className="page-home">
      {/* ---------------------------------------------------------- HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <Reveal>
              <p className="hero-badge">
                <span className="dot" aria-hidden="true" />
                Registered Charitable Trust
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1>
                Empowering Communities Through <span className="accent">Education</span> &amp;
                Healthcare
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="hero-lede">
                Kandhasamy Public Charitable Trust is dedicated to uplifting underprivileged
                communities through quality education, healthcare services, and sustainable
                development initiatives.
              </p>
            </Reveal>

            <Reveal delay={240} className="hero-actions">
              <Link to="/contact" className="btn btn-gold btn-lg">
                Get In Touch
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link to="/programs" className="btn btn-ghost-light btn-lg">
                Our Programs
              </Link>
            </Reveal>

            <Reveal delay={320} className="hero-meta">
              {IMPACT_STATS.slice(0, 3).map((stat) => (
                <div className="hero-meta-item" key={stat.title}>
                  <strong>
                    <CountUp value={stat.number} />
                  </strong>
                  <span>{stat.title}</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={200} className="hero-media">
            <span className="hero-ring" aria-hidden="true" />
            <MediaPanel
              src="/images/activities-bg.jpg"
              alt="KPCT team with community health trainees in Tiruttani"
              caption="🌍 Community Impact"
              framed={false}
            />
            <div className="hero-float">
              <span className="icon-tile" aria-hidden="true">
                ✊
              </span>
              <div>
                <strong>800+</strong>
                <span>Women Empowered</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- ABOUT */}
      <section className="section">
        <div className="container">
          <div className="split home-about">
            <div>
              <SectionHead
                eyebrow="About Our Foundation"
                title="KPCT - Making a Difference"
                lede="Building a better future through compassion, commitment, and concrete action"
              />
              <Reveal delay={80}>
                <p>
                  Kandhasamy Public Charitable Trust (KPCT) is committed to bridging the gap between
                  privilege and underprivilege by providing equitable access to education,
                  healthcare, and livelihood opportunities.
                </p>
                <p>
                  Since our establishment, we have touched the lives of thousands through our
                  focused initiatives in education, healthcare, community development, and women
                  empowerment.
                </p>
                <Link to="/about" className="btn btn-outline home-about-btn">
                  Learn More
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <MediaPanel
                src="/images/about-bg.jpg"
                alt="KPCT staff and trainees gathered outside a community centre"
                caption="👥 Our Community"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- IMPACT */}
      <section className="section section-dark home-impact">
        <div className="container">
          <SectionHead
            eyebrow="Our Impact"
            title="Measurable change across the communities we serve"
            center
            light
          />
          <div className="grid grid-4">
            {IMPACT_STATS.map((stat, index) => (
              <Reveal key={stat.title} delay={index * 90}>
                <article className="stat-card">
                  <span className="stat-icon" aria-hidden="true">
                    {stat.icon}
                  </span>
                  <p className="stat-number">
                    <CountUp value={stat.number} />
                  </p>
                  <h4>{stat.title}</h4>
                  <p className="stat-text">{stat.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ PROGRAMS */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Our Programs"
            title="Diverse initiatives making a real difference"
            center
          />
          <div className="grid grid-3">
            {PROGRAMS.map((program, index) => (
              <Reveal key={program.title} delay={index * 90}>
                <article className="card card-interactive home-program">
                  <span className="icon-tile" aria-hidden="true">
                    {program.icon}
                  </span>
                  <h3>{program.title}</h3>
                  <p>{program.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="home-programs-cta">
            <Link to="/programs" className="btn btn-outline">
              View All Programs
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- CONTACT */}
      <section className="section section-cream home-contact">
        <div className="container">
          <div className="split home-contact-grid">
            <div>
              <SectionHead
                eyebrow="Contact"
                title="Quick Contact"
                lede="Have questions or want to learn more about our work? Get in touch with us today."
              />
              <Reveal delay={80}>
                <ul className="fact-list">
                  {CONTACT_FACTS.map((fact) => (
                    <li key={fact.label}>
                      <span className="fact-icon" aria-hidden="true">
                        {fact.icon}
                      </span>
                      <span>
                        <strong>{`${fact.label}:`}</strong> {fact.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="form-card">
                <h3>Send Inquiry</h3>
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

                <form onSubmit={handleSubmit} noValidate={false}>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="home-name">Name *</label>
                      <input
                        type="text"
                        id="home-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="home-phone">Phone *</label>
                      <input
                        type="tel"
                        id="home-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="home-email">Email *</label>
                    <input
                      type="email"
                      id="home-email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="home-subject">Subject *</label>
                    <input
                      type="text"
                      id="home-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="home-message">Message *</label>
                    <textarea
                      id="home-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
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

      {/* -------------------------------------------------------- SOCIAL */}
      <section className="section-tight section-muted home-social">
        <div className="container">
          <SectionHead
            eyebrow="Social"
            title="Follow Us"
            lede="Stay connected for updates, stories, and impact news"
            center
          />
          <Reveal className="social-row home-social-row">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className={`social-link social-lg ${social.className}`}
                target="_blank"
                rel="noopener"
                aria-label={social.label}
                title={social.label}
              >
                {social.glyph}
              </a>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
