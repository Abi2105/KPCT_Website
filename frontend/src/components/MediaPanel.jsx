/**
 * The framed visual used beside content blocks.
 *
 * With `src` it shows a photograph; without one it renders a decorative
 * gradient panel carrying the section's glyph. Both variants share the same
 * frame, radius, scrim and caption treatment so mixing them stays consistent.
 */
export default function MediaPanel({ src, alt = '', caption, glyph, tone = 'green', framed = true }) {
  const TONES = {
    green: ['#1b5c3a', '#0c3423'],
    emerald: ['#26754a', '#11462e'],
    deep: ['#11462e', '#072318'],
    brass: ['#8f6a2c', '#11462e'],
  };
  const [from, to] = TONES[tone] || TONES.green;

  return (
    <div className={framed ? 'media-frame' : undefined}>
      <div className={src ? 'media-panel' : 'media-panel media-panel-figure'}>
        {src ? (
          <img src={src} alt={alt} loading="lazy" />
        ) : (
          <>
            <svg
              className="panel-motif"
              viewBox="0 0 600 450"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`grad-${tone}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={from} />
                  <stop offset="100%" stopColor={to} />
                </linearGradient>
              </defs>
              <rect width="600" height="450" fill={`url(#grad-${tone})`} />
              <g fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5">
                <circle cx="300" cy="225" r="80" />
                <circle cx="300" cy="225" r="130" />
                <circle cx="300" cy="225" r="180" />
              </g>
              <g fill="rgba(255,255,255,0.08)">
                <circle cx="90" cy="80" r="46" />
                <circle cx="520" cy="110" r="34" />
                <circle cx="470" cy="370" r="54" />
                <circle cx="110" cy="360" r="28" />
              </g>
              <path
                d="M0 360 Q 150 300 300 340 T 600 310 L600 450 L0 450 Z"
                fill="rgba(255,255,255,0.07)"
              />
            </svg>
            {glyph && (
              <span className="panel-glyph" aria-hidden="true">
                {glyph}
              </span>
            )}
          </>
        )}
        {caption && <span className="media-caption">{caption}</span>}
      </div>
    </div>
  );
}
