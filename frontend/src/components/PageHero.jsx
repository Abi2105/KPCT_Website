import { Link } from 'react-router-dom';

/** Compact banner that opens every inner page. */
export default function PageHero({ eyebrow, title, lede, current }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        {eyebrow && <p className="eyebrow eyebrow-light eyebrow-center">{eyebrow}</p>}
        <h1>{title}</h1>
        {lede && <p className="page-hero-lede">{lede}</p>}
        {current && (
          <nav className="page-hero-trail" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{current}</span>
          </nav>
        )}
      </div>
    </section>
  );
}
