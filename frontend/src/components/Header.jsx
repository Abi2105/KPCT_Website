import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/documents', label: 'Documents' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const { pathname } = useLocation();

  // Hairline + shadow appear only after the page scrolls.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll and allow Escape to dismiss while the drawer is open.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const linkClass = ({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link');

  return (
    <header className={stuck ? 'site-header is-stuck' : 'site-header'}>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="KPCT home">
          <img src="/images/logo.png" alt="KPCT Logo" className="brand-img" width="44" height="44" />
          <span className="brand-text">
            <h2>KPCT</h2>
            <p>Empowering Communities</p>
          </span>
        </Link>

        <nav
          id="primary-navigation"
          className={open ? 'primary-nav is-open' : 'primary-nav'}
          aria-label="Primary"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-gold nav-drawer-cta btn-block">
            Get In Touch
          </Link>
        </nav>

        <Link to="/contact" className="btn btn-gold header-cta">
          Get In Touch
        </Link>

        <button
          type="button"
          className={open ? 'nav-toggle is-open' : 'nav-toggle'}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={open ? 'nav-backdrop is-open' : 'nav-backdrop'}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </header>
  );
}
