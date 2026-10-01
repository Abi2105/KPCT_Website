import { Link } from 'react-router-dom';

import MediaPanel from '../components/MediaPanel.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import '../styles/programs.css';

const PROGRAMS = [
  {
    id: 'education',
    glyph: '📚',
    heading: '📚 Educational Programs',
    label: 'Education',
    reverse: false,
    tone: 'green',
    caption: '📚 Students Learning',
    paragraphs: [
      "Education is the foundation for breaking the cycle of poverty. KPCT's educational initiatives ensure that underprivileged children have access to quality learning opportunities, mentorship, and academic support.",
      'Our comprehensive educational support includes scholarship distribution, free coaching classes, digital literacy, and career guidance to help students reach their full potential.',
    ],
    highlights: [
      'Free coaching classes in core subjects',
      'Educational scholarships for meritorious students',
      'Digital literacy and computer training',
      'Career guidance and mentorship programs',
      'School supplies and book distribution',
      'Teacher training and infrastructure support',
    ],
    impact:
      'Over 2,500 students supported, 95% improvement in exam performance, 300+ scholarships distributed annually.',
  },
  {
    id: 'healthcare',
    glyph: '⚕️',
    heading: '⚕️ Healthcare Services',
    label: 'Healthcare',
    reverse: true,
    tone: 'emerald',
    caption: '⚕️ Healthcare Camp',
    paragraphs: [
      'Access to quality healthcare is a basic right. KPCT conducts regular health camps, awareness programs, and emergency medical assistance to ensure that communities receive preventive and curative healthcare services.',
      'We work with medical professionals to bring healthcare directly to villages and underserved communities, addressing the critical gap in rural health infrastructure.',
    ],
    highlights: [
      'Regular health check-up camps in villages',
      'Immunization and vaccination drives',
      'Health awareness programs on nutrition and hygiene',
      'Emergency medical assistance',
      'Support for chronic disease management',
      "Women's health and maternal health programs",
    ],
    impact:
      '50,000+ lives impacted, 100+ health camps conducted, free medical services worth ₹25+ lakhs provided.',
  },
  {
    id: 'women',
    glyph: '👩‍💼',
    heading: '👩‍💼 Women Empowerment',
    label: 'Women',
    reverse: false,
    tone: 'brass',
    caption: '👩‍💼 Women Training',
    paragraphs: [
      'Empowering women is central to community development. KPCT provides skill training, financial literacy, and entrepreneurship support to enable women to become economically independent and self-reliant.',
      'Through self-help groups and focused training programs, we help women acquire income-generating skills and build sustainable livelihoods for themselves and their families.',
    ],
    highlights: [
      'Tailoring and handicraft skill training',
      'Self-help groups and microfinance support',
      'Financial literacy and banking awareness',
      'Entrepreneurship and business plan development',
      "Legal awareness and women's rights education",
      'Health and nutrition programs for women',
    ],
    impact:
      '800+ women trained, 120+ self-help groups formed, ₹50+ lakhs in collective savings created.',
  },
  {
    id: 'youth',
    glyph: '🎯',
    heading: '🎯 Youth Skills Development',
    label: 'Youth',
    reverse: true,
    tone: 'deep',
    caption: '🎯 Youth Training',
    paragraphs: [
      "Young people are our future leaders and changemakers. KPCT's youth development programs focus on building employment-ready skills, soft skills training, and fostering entrepreneurial mindset among rural youth.",
      'We bridge the gap between education and employment through vocational training, internship opportunities, and mentorship from industry professionals.',
    ],
    highlights: [
      'Vocational and technical skills training',
      'Soft skills and communication training',
      'Digital skills and IT training',
      'Internship and job placement support',
      'Entrepreneurship and start-up mentoring',
      'Leadership development programs',
    ],
    impact: '500+ youth trained, 200+ placed in employment, 50+ start-ups supported.',
  },
];

export default function Programs() {
  useDocumentTitle('Programs | KPCT - Kandhasamy Public Charitable Trust');

  return (
    <div className="page-programs">
      <PageHero
        eyebrow="What We Do"
        title="Our Programs"
        lede="Transforming lives through education, healthcare, and community development"
        current="Programs"
      />

      {/* Jump links to each programme */}
      <div className="program-nav">
        <div className="container">
          <ul>
            {PROGRAMS.map((program) => (
              <li key={program.id}>
                <a href={`#${program.id}`}>
                  <span aria-hidden="true">{program.glyph}</span>
                  {program.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {PROGRAMS.map((program) => (
            <article className="program-item" id={program.id} key={program.id}>
              <div className={program.reverse ? 'split split-reverse' : 'split'}>
                <div className="program-copy">
                  <Reveal>
                    <h2>{program.heading}</h2>
                    {program.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}

                    <div className="highlight-box">
                      <h4>Key Initiatives</h4>
                      <ul className="arrow-list">
                        {program.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="impact-line">
                      <strong>Impact:</strong> {program.impact}
                    </p>
                  </Reveal>
                </div>

                <Reveal delay={120}>
                  <MediaPanel
                    glyph={program.glyph}
                    tone={program.tone}
                    caption={program.caption}
                  />
                </Reveal>
              </div>
            </article>
          ))}

          <Reveal className="cta-band programs-cta">
            <div>
              <h2>Ready to Support Our Programs?</h2>
              <p>
                Your contribution can transform lives and build stronger communities. Get involved
                today.
              </p>
            </div>
            <Link to="/contact" className="btn btn-gold btn-lg">
              Connect With Us
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
