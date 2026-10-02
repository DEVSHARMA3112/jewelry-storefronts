// Newsletter form: validates email, POSTs it, shows success/error, disables button while sending.
import { useState } from 'react';
import { subscribe } from '../api/newsletter';

export function Newsletter({ brand }) {
  const [email, setEmail] = useState('');
  const [st, setSt] = useState({ s: 'idle' });
  const go = async e => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setSt({
        s: 'err',
        m: 'Enter a valid email address, like name@example.com.',
      });
    setSt({ s: 'busy' });
    try {
      await subscribe(email);
      setSt({ s: 'ok', m: `You're in. Welcome to ${brand.name}.` });
      setEmail('');
    } catch {
      setSt({ s: 'err', m: 'Sign-up failed. Please try again.' });
    }
  };
  return (
    <section className="sec news">
      <div className="wrap narrow center">
        <h2>Join the {brand.name} list</h2>
        <p>Early access to new designs and 10% off your first order.</p>
        <form onSubmit={go} noValidate className="row">
          <label htmlFor="em" className="sr">
            Email address
          </label>
          <input
            id="em"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={st.s === 'err'}
          />
          <button className="btn" disabled={st.s === 'busy'}>
            {st.s === 'busy' ? 'Sending…' : 'Subscribe'}
          </button>
        </form>
        <p role="status" className={'msg ' + st.s}>
          {st.m}
        </p>
      </div>
    </section>
  );
}
