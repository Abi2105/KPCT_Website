import { useEffect, useState } from 'react';

/**
 * A MediaPanel that cycles through several photographs.
 *
 * Shares the panel's frame, scrim and caption so it drops in wherever a
 * single MediaPanel sat. Slides are stacked and cross-faded; the arrows wrap
 * around at either end. A slide with `fit: 'contain'` is shown whole, pinned
 * to the top of the panel's background, instead of being cropped to its shape.
 * With `natural`, the panel takes the active slide's own proportions from its
 * `width` and `height`, which also reserves that space before it loads.
 * With `interval` (ms) it advances on its own in a loop, pausing while hovered;
 * `controls={false}` hides the arrows. A slide with `captionLow` (or shown
 * whole) flags the panel so its caption can move clear of faces on phones.
 */
export default function MediaCarousel({
  slides,
  caption,
  framed = true,
  natural = false,
  interval = 0,
  controls = true,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const current = slides[index];

  const go = (step) => setIndex((current) => (current + step + count) % count);

  useEffect(() => {
    if (!interval || count < 2 || paused) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), interval);
    return () => clearInterval(timer);
  }, [interval, count, paused]);

  return (
    <div className={framed ? 'media-frame' : undefined}>
      <div
        className={`media-panel media-carousel${
          current.fit === 'contain' || current.captionLow ? ' caption-low' : ''
        }`}
        style={natural ? { aspectRatio: `${current.width} / ${current.height}` } : undefined}
        role="group"
        aria-roledescription="carousel"
        onMouseEnter={interval ? () => setPaused(true) : undefined}
        onMouseLeave={interval ? () => setPaused(false) : undefined}
      >
        {slides.map((slide, slideIndex) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            loading="lazy"
            className={
              [slide.fit === 'contain' && 'is-contain', slideIndex === index && 'is-active']
                .filter(Boolean)
                .join(' ') || undefined
            }
            aria-hidden={slideIndex !== index}
          />
        ))}
        {caption && <span className="media-caption">{caption}</span>}
        {controls && count > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow carousel-prev"
              onClick={() => go(-1)}
              aria-label="Previous photo"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              className="carousel-arrow carousel-next"
              onClick={() => go(1)}
              aria-label="Next photo"
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
