// Simple home page linking to the three brands.
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function Home() {
  const l = [
    ['aurelle', 'Aurelle', 'Lab-grown diamond engagement rings'],
    ['gemma-grove', 'Gemma & Grove', 'Sapphire, emerald and ruby jewelry'],
    ['lustre', 'Lustre', 'Moissanite rings and earrings'],
  ];
  return (
    <div className="app home" data-brand="home">
      <Seo
        title="Fine Jewelry Brands | Aurelle, Gemma & Grove, Lustre"
        desc="Explore three US fine jewelry brands: Aurelle diamonds, Gemma & Grove gemstones and Lustre moissanite."
        path="/"
      />
      <main id="main" className="wrap">
        <h1>Three houses of fine jewelry</h1>
        <p className="lead">Pick the one that fits your moment.</p>
        <div className="homes">
          {l.map(([s, n, t]) => (
            <Link key={s} to={'/' + s} data-brand={s} className="hb">
              <img
                src={`/images/${s}/hero-1.svg`}
                alt={`${n} featured ring`}
                width="1600"
                height="900"
              />
              <span className="logo">{n}</span>
              <span>{t}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
