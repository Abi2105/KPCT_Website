import { Link } from 'react-router-dom';

import { SOCIAL_LINKS } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-col footer-col-brand">
          <div className="footer-brand">
            <img src="/images/logo.png" alt="" width="48" height="48" />
            <div>
              <h3>KPCT</h3>
              <span>Empowering Communities</span>
            </div>
          </div>
          <h4>About KPCT</h4>
          <p>
            Kandhasamy Public Charitable Trust is dedicated to social development, education,
            healthcare, and community welfare.
          </p>
          <div className="social-row social-row-light footer-social">
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
        </div>

        <nav className="footer-col" aria-label="Footer">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/programs">Programs</Link>
            <Link to="/documents">Documents</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <div className="footer-col">
          <h4>Get In Touch</h4>
          <ul className="footer-contact">
            <li>
              <span aria-hidden="true">📧</span>
              <a href="mailto:kpcttrt@gmail.com">kpcttrt@gmail.com</a>
            </li>
            <li>
              <span aria-hidden="true">📱</span>
              <a href="tel:+917708162084">7708162084</a>
            </li>
            <li>
              <span aria-hidden="true">📍</span>
              <span>Tiruttani, Tamil Nadu</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <p>&copy; 2026 Kandhasamy Public Charitable Trust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
