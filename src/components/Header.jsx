// Site header: logo, nav, mobile hamburger menu and cart button with item count.
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Header({ brand }) {
  const [open, setOpen] = useState(false);
  const { count, setOpen: openCart } = useCart();
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname, loc.search]);
  const base = '/' + brand.slug;
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <button
          className="icon burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to={base} className="logo">
          {brand.name}
        </Link>
        <nav className={'nav' + (open ? ' open' : '')} aria-label="Main">
          <NavLink to={`${base}/${brand.cat}`} end>
            {brand.catLabel}
          </NavLink>
          {brand.cats.slice(0, 2).map(c => (
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
          <Link to="/">All brands</Link>
        </nav>
        <button
          className="icon cart"
          aria-label={`Open cart, ${count} items`}
          onClick={() => openCart(true)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M6 7h12l-1 13H7L6 7zM9 7a3 3 0 016 0" />
          </svg>
          <b key={count}>{count}</b>
        </button>
      </div>
    </header>
  );
}
