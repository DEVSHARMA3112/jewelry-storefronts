// Slide-in cart panel: list of items, quantity buttons, remove, subtotal.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { money } from '../utils/format';

export function CartDrawer() {
  const { items, count, total, setQty, remove, open, setOpen, clear } = useCart();
  const [done, setDone] = useState(false);
  useEffect(() => {
    const k = e => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [setOpen]);
  return (
    <>
      <div className="scrim cs" data-open={open} onClick={() => setOpen(false)} />
      <aside
        className={'cart-d' + (open ? ' open' : '')}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        <div className="dh">
          <h2>Your cart ({count})</h2>
          <button className="icon" aria-label="Close cart" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        {!items.length ? (
          <div className="state">
            <h3>Your cart is empty</h3>
            <p>Find something that sparkles.</p>
            <button className="btn" onClick={() => setOpen(false)}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="ci">
              {items.map(x => (
                <li key={x.id}>
                  <Link to={x.url} onClick={() => setOpen(false)}>
                    <img src={x.img} alt={x.alt} width="80" height="100" />
                  </Link>
                  <div>
                    <Link to={x.url} onClick={() => setOpen(false)}>
                      <strong>{x.title}</strong>
                    </Link>
                    <small>
                      {x.metal} · {x.carat} ct
                    </small>
                    <div className="qty sm">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(x.id, x.qty - 1)}
                      >
                        −
                      </button>
                      <output>{x.qty}</output>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(x.id, x.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="r">
                    <b>{money(x.price * x.qty)}</b>
                    <button className="lnk" onClick={() => remove(x.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cf">
              <p className="tot">
                <span>Subtotal</span>
                <b>{money(total)}</b>
              </p>
              <p className="muted">Free insured US shipping. 30-day returns.</p>
              <button className="btn" onClick={() => setDone(true)}>
                Checkout
              </button>
              {done && (
                <p role="status" className="msg ok">
                  Checkout is outside this demo. Your {count} item
                  {count > 1 ? 's are' : ' is'} saved here.
                </p>
              )}
              <button
                className="btn ghost"
                onClick={() => {
                  clear();
                  setDone(false);
                }}
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
