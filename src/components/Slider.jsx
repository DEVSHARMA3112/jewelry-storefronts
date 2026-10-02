// Swipeable, auto-sliding carousel built on CSS scroll-snap (used by the hero).
import { useState, useEffect, useRef } from 'react';

export function Slider({ slides, auto, label }) {
  const ref = useRef();
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const go = n => {
    const el = ref.current;
    const k = (n + slides.length) % slides.length;
    el.scrollTo({ left: k * el.clientWidth, behavior: 'smooth' });
  };
  useEffect(() => {
    if (!auto || pause || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => go(i + 1), 5000);
    return () => clearInterval(t);
  });
  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <div
        className="track"
        ref={ref}
        onScroll={e => setI(Math.round(e.target.scrollLeft / e.target.clientWidth))}
      >
        {slides.map((s, k) => (
          <div className="slide" key={k} aria-hidden={k !== i}>
            {s}
          </div>
        ))}
      </div>
      <button className="arrow l" aria-label="Previous slide" onClick={() => go(i - 1)}>
        ‹
      </button>
      <button className="arrow r" aria-label="Next slide" onClick={() => go(i + 1)}>
        ›
      </button>
      <div className="dots">
        {slides.map((_, k) => (
          <button
            key={k}
            aria-label={`Go to slide ${k + 1}`}
            aria-current={k === i}
            onClick={() => go(k)}
          />
        ))}
      </div>
    </div>
  );
}
