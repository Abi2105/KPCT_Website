import { Link } from 'react-router-dom';

import MediaPanel from '../components/MediaPanel.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import '../styles/about.css';

const SECTIONS = [
  {
    eyebrow: 'Our Purpose',
    heading: 'Our Mission',
    reverse: false,
    media: {
      src: '/images/about-bg.jpg',
      alt: 'KPCT staff and community health trainees outside a training centre',
      caption: '🎯 Our Mission',
    },
    paragraphs: [
      'Kandhasamy Public Charitable Trust exists to uplift underprivileged communities by providing comprehensive support in education, healthcare, and livelihood development. We believe that every person deserves equal opportunity to thrive regardless of their socioeconomic background.',
      'Our mission is built on the foundation of compassion, integrity, and sustainable impact. We work as a bridge between those who have and those who need, creating pathways to self-sufficiency and dignity.',
    ],
    points: [
      'Provide quality education to underprivileged children',
      'Deliver accessible healthcare services to rural communities',
      'Empower women through skill development and financial literacy',
      'Support sustainable community development initiatives',
    ],
  },
  {
    eyebrow: 'Looking Ahead',
    heading: 'Our Vision',
    reverse: true,
    media: { glyph: '🌟', tone: 'emerald', caption: '🌟 Our Vision' },
    paragraphs: [
      'We envision a world where quality education, healthcare, and livelihood opportunities are accessible to all, regardless of their economic circumstances. A world where communities are empowered, voices are heard, and everyone has the chance to reach their full potential.',
      'KPCT strives to create lasting, systemic change that transforms not just individual lives, but entire communities. We believe in the power of collective action and community participation in building sustainable solutions.',
    ],
    points: [
      'Build empowered, self-reliant communities',
      'Ensure educational equity and quality learning',
      'Create accessible healthcare for all',
      'Foster inclusive economic opportunities',
    ],
  },
  {
    eyebrow: 'Our Story',
    heading: 'Our Journey',
    reverse: false,
    media: {
      src: '/images/activities-bg.jpg',
      alt: 'A group of KPCT trainees with their programme coordinator',
      caption: '📈 Our Growth',
    },
    paragraphs: [
      'KPCT was founded with a simple yet powerful belief: that charitable work must create sustainable change. Over the years, we have grown from a small initiative to an organization impacting thousands of lives across multiple communities.',
      'Our journey has been marked by dedication, community partnerships, and a commitment to transparency and accountability. Every milestone represents not just numbers, but real lives changed and communities strengthened.',
    ],
    points: [
      'Expanded reach to 15+ villages and communities',
      'Supported 2500+ students in their educational journey',
      'Impacted 50,000+ lives through healthcare initiatives',
      'Empowered 800+ women through skill development',
    ],
  },
];

const VALUES = [
  {
    icon: '❤️',
    title: 'Compassion',
    text: 'Genuine empathy drives our every action, treating each person with dignity and respect.',
  },
  {
    icon: '🔗',
    title: 'Integrity',
    text: 'Transparency and honesty in all our operations and community interactions.',
  },
  {
    icon: '♻️',
    title: 'Sustainability',
    text: 'Creating lasting solutions that empower communities to thrive independently.',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    text: 'Working together with communities, partners, and stakeholders for greater impact.',
  },
];

const TEAM = [
  {
    icon: '👤',
    title: 'Leadership Team',
    text: "Experienced professionals guiding KPCT's vision and mission",
  },
  {
    icon: '👥',
    title: 'Field Staff',
    text: 'Dedicated team members working directly in communities',
  },
  {
    icon: '📊',
    title: 'Support Services',
    text: 'Administrative and program management professionals',
  },
];

export default function About() {
  useDocumentTitle('About KPCT | Kandhasamy Public Charitable Trust');

  return (
    <div className="page-about">
      <PageHero
        eyebrow="About Us"
        title="About KPCT"
        lede="Understanding our mission, values, and commitment to community development"
        current="About"
      />

      {/* ------------------------------------------ Mission / Vision / Journey */}
      <section className="section about-pillars">
        <div className="container">
          {SECTIONS.map((section) => (
            <div
              className={section.reverse ? 'split split-reverse about-pillar' : 'split about-pillar'}
              key={section.heading}
            >
              <div className="about-pillar-copy">
                <Reveal>
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  <ul className="check-list">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={120}>
                <MediaPanel {...section.media} />
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- Values */}
      <section className="section section-muted">
        <div className="container">
          <SectionHead
            eyebrow="What Guides Us"
            title="Our Core Values"
            lede="Principles that guide every decision and action we take"
            center
          />
          <div className="grid grid-4">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 90}>
                <article className="card card-interactive about-value">
                  <span className="icon-tile icon-tile-lg" aria-hidden="true">
                    {value.icon}
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Team */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Our People"
            title="Meet Our Team"
            lede="Dedicated professionals committed to making a difference"
            center
          />
          <div className="grid grid-3 about-team">
            {TEAM.map((member, index) => (
              <Reveal key={member.title} delay={index * 100}>
                <article className="team-card">
                  <span className="team-avatar" aria-hidden="true">
                    {member.icon}
                  </span>
                  <h3>{member.title}</h3>
                  <p>{member.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="section-tight about-cta-wrap">
        <div className="container">
          <Reveal className="cta-band">
            <div>
              <h2>Ready to Make a Difference?</h2>
              <p>Join us in our mission to empower communities and create lasting change</p>
            </div>
            <Link to="/contact" className="btn btn-gold btn-lg">
              Get In Touch
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
