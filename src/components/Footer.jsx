// Site footer: shop links, brand links, social and legal links.
import { Link } from 'react-router-dom';

export function Footer({ brand }) {
  const base = '/' + brand.slug;
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <div>
          <Link to={base} className="logo">
            {brand.name}
          </Link>
          <p>Fine jewelry, designed in the USA.</p>
        </div>
        <nav aria-label="Shop">
          <h3>Shop</h3>
          <Link to={`${base}/${brand.cat}`}>{brand.catLabel}</Link>
          {brand.cats.map(c => (
            <Link
              key={c[0]}
              to={
                c[1] === 'page'
                  ? `${base}/${c[2]}`
                  : `${base}/${brand.cat}?${c[1]}=${c[2]}`
              }
            >
              {c[0]}
            </Link>
          ))}
        </nav>
        <nav aria-label="Brands">
          <h3>Our brands</h3>
          <Link to="/aurelle">Aurelle</Link>
          <Link to="/gemma-grove">Gemma & Grove</Link>
          <Link to="/lustre">Lustre</Link>
        </nav>
        <nav aria-label="Legal">
          <h3>Follow & legal</h3>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">
            Pinterest
          </a>
          <a
            href="https://www.ftc.gov/business-guidance/privacy-security"
            target="_blank"
            rel="noreferrer"
          >
            Privacy
          </a>
          <a href="https://www.ftc.gov" target="_blank" rel="noreferrer">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
