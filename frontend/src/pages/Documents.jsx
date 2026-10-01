import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import '../styles/documents.css';

const DOCUMENTS = [
  {
    tag: '12A',
    title: 'Section 12A Certificate',
    text: 'Income Tax exemption certificate under Section 12A of the Income Tax Act. This certifies KPCT as a charitable organization eligible for tax benefits.',
    file: '/reports/12A.pdf',
    label: '📥 Download 12A',
    meta: 'PDF Format • Updated 2024',
  },
  {
    tag: '80G',
    title: 'Section 80G Certificate',
    text: 'Donor benefits certificate under Section 80G of the Income Tax Act. Donors can claim tax deductions for contributions to KPCT.',
    file: '/reports/80G.pdf',
    label: '📥 Download 80G',
    meta: 'PDF Format • Updated 2024',
  },
  {
    tag: 'CSR',
    title: 'CSR Compliance Certificate',
    text: "Corporate Social Responsibility compliance certificate. Verification of KPCT's eligibility as a qualified CSR beneficiary organization.",
    file: '/reports/CSR.PDF',
    label: '📥 Download CSR',
    meta: 'PDF Format • Current Year',
  },
  {
    tag: 'DEED',
    title: 'Organization Deed',
    text: "Trust Deed document establishing KPCT as a registered charitable trust. Contains the foundation's mission, objectives, and governance structure.",
    file: '/reports/DEED.pdf',
    label: '📥 Download Deed',
    meta: 'PDF Format • Official Registration',
  },
];

const INFO_ITEMS = [
  {
    icon: '🛡️',
    title: 'Legal Compliance',
    text: "All documents confirm KPCT's full compliance with Indian charity laws and regulations, ensuring legitimate operations.",
  },
  {
    icon: '💰',
    title: 'Tax Benefits',
    text: 'Donors receive tax deductions under Section 80G, making contributions to KPCT financially beneficial for supporters.',
  },
  {
    icon: '✅',
    title: 'Transparency',
    text: "These certifications demonstrate KPCT's commitment to accountability and transparent operations in all activities.",
  },
];

export default function Documents() {
  useDocumentTitle('Documents | KPCT - Kandhasamy Public Charitable Trust');

  return (
    <div className="page-documents">
      <PageHero
        eyebrow="Accountability"
        title="Compliance & Certifications"
        lede="Documentation and certifications demonstrating KPCT's commitment to transparency and accountability"
        current="Documents"
      />

      <section className="section">
        <div className="container">
          {/* Intro note */}
          <Reveal className="doc-intro">
            <div>
              <h3>📋 Transparency &amp; Accountability</h3>
              <p>
                KPCT is committed to full transparency in all its operations. Below are our official
                certifications and compliance documents that demonstrate our legal registration, tax
                compliance, and organizational integrity. All documents are available for download
                and verification.
              </p>
            </div>
          </Reveal>

          <SectionHead
            eyebrow="Official Certifications"
            title="Legal registrations and compliance certificates"
            center
          />

          <div className="grid grid-2">
            {DOCUMENTS.map((doc, index) => (
              <Reveal key={doc.title} delay={index * 80}>
                <article className="doc-card">
                  <div className="doc-card-top">
                    <span className="doc-badge" aria-hidden="true">
                      <span className="doc-badge-icon">📄</span>
                      <span className="doc-badge-tag">{doc.tag}</span>
                    </span>
                    <span className="doc-meta">{doc.meta}</span>
                  </div>
                  <h3>{doc.title}</h3>
                  <p>{doc.text}</p>
                  <a href={doc.file} className="btn doc-download" download>
                    {doc.label}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section section-muted">
        <div className="container">
          <SectionHead eyebrow="Why It Matters" title="Why These Certifications Matter" center />
          <div className="grid grid-3">
            {INFO_ITEMS.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="card card-interactive doc-info">
                  <span className="icon-tile" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight documents-cta-wrap">
        <div className="container">
          <Reveal className="cta-band">
            <div>
              <h2>Have Questions About Our Certifications?</h2>
              <p>Contact us for more information or verification of any documents</p>
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
