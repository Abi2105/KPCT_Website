import Reveal from './Reveal.jsx';

/** Eyebrow + heading + optional lede, used to open every major section. */
export default function SectionHead({ eyebrow, title, lede, center = false, light = false }) {
  return (
    <Reveal className={center ? 'section-head section-head-center' : 'section-head'}>
      {eyebrow && (
        <p
          className={[
            'eyebrow',
            center ? 'eyebrow-center' : '',
            light ? 'eyebrow-light' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {lede && <p className="section-lede">{lede}</p>}
    </Reveal>
  );
}
