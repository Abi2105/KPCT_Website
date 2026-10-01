import { useEffect, useRef, useState } from 'react';

/**
 * Counts a stat up to its final value when it scrolls into view.
 *
 * `value` is the display string from the content, e.g. "2500+", "50K+".
 * The numeric part is animated and the prefix/suffix are preserved, so the
 * rendered text always matches the original copy exactly. It starts at the
 * final value, so the number is correct before the animation runs, without
 * JavaScript, and when the viewer prefers reduced motion.
 */
export default function CountUp({ value, duration = 1600 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    // Parsed inside the effect so a re-render mid-animation cannot restart it.
    const match = String(value).match(/^(\D*)(\d+)(.*)$/);
    if (!match || !node || typeof IntersectionObserver === 'undefined') return undefined;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    let frame = 0;
    let safety = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease-out cubic, so the number settles rather than stopping dead.
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          setDisplay(`${prefix}0${suffix}`);
          frame = requestAnimationFrame(tick);
          // If rAF never progresses (background tab, throttling, headless
          // rendering), land on the real figure rather than leaving a zero.
          safety = setTimeout(() => setDisplay(value), duration + 400);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(safety);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
