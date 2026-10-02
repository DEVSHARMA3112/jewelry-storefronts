// Product image gallery: big swipeable image plus thumbnails and arrows.
import { useState, useRef } from 'react';

export function ProductGallery({ images }) {
  const ref = useRef();
  const [i, setI] = useState(0);
  const go = n => {
    const el = ref.current;
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' });
  };
  return (
    <div className="gallery">
      <div className="slider">
        <div
          className="track"
          ref={ref}
          onScroll={e => setI(Math.round(e.target.scrollLeft / e.target.clientWidth))}
        >
          {images.map((im, k) => (
            <div className="slide" key={im.src}>
              <img
                src={im.src}
                alt={im.alt}
                width="800"
                height="1000"
                fetchPriority={k ? undefined : 'high'}
              />
            </div>
          ))}
        </div>
        <button
          className="arrow l"
          aria-label="Previous image"
          onClick={() => go(Math.max(0, i - 1))}
        >
          ‹
        </button>
        <button
          className="arrow r"
          aria-label="Next image"
          onClick={() => go(Math.min(images.length - 1, i + 1))}
        >
          ›
        </button>
      </div>
      <div className="thumbs">
        {images.map((im, k) => (
          <button
            key={im.src}
            aria-label={`Show image ${k + 1}`}
            aria-current={k === i}
            onClick={() => go(k)}
          >
            <img src={im.src} alt="" width="80" height="100" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
