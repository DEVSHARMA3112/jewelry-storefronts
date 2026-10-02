// Filter chips (metal, price, gemstone) shown in the sidebar on desktop and the drawer on mobile.
import { METALS } from '../brands';
import { money } from '../utils/format';

export const PRICE_RANGES = {
  aurelle: [
    [0, 2000],
    [2000, 4000],
    [4000, 1e9],
  ],
  lustre: [
    [0, 800],
    [800, 1600],
    [1600, 1e9],
  ],
};

export const priceLabel = ([a, z]) =>
  z >= 1e9 ? `${money(a)}+` : a ? `${money(a)}–${money(z)}` : `Under ${money(z)}`;

export function Filters({ brand, p, set, all }) {
  const metals = METALS,
    gems = [...new Set(all.map(x => x.gemstone))];
  const t = (k, v) => set(k, p.get(k) === v ? '' : v);
  const Grp = ({ k, t: title, items }) => (
    <fieldset>
      <legend>{title}</legend>
      {items.map(([v, l]) => (
        <button
          key={v}
          type="button"
          className="chip"
          aria-pressed={p.get(k) === v}
          onClick={() => t(k, v)}
        >
          {l}
        </button>
      ))}
    </fieldset>
  );
  return (
    <div>
      {brand.filters.includes('metal') && (
        <Grp k="metal" t="Metal" items={metals.map(m => [m, m])} />
      )}
      {brand.filters.includes('price') && (
        <Grp
          k="price"
          t="Price"
          items={PRICE_RANGES[brand.slug].map((r, i) => [String(i), priceLabel(r)])}
        />
      )}
      {brand.filters.includes('gem') && (
        <Grp
          k="gem"
          t="Gemstone"
          items={gems.map(g => [g, g[0].toUpperCase() + g.slice(1)])}
        />
      )}
    </div>
  );
}
