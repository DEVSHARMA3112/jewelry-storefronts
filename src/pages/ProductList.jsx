// Listing page: breadcrumbs, intro, filters, sort, product grid, load more. Filters live in the URL.
import { useState, useMemo } from 'react';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getProducts } from '../api/products';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Filters, PRICE_RANGES } from '../components/Filters';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { GridSkeleton } from '../components/Skeleton';
import { Empty, ErrorBox } from '../components/States';
import { NotFound } from './NotFound';
import { breadcrumbJsonLd } from '../utils/seo';

export function ProductList() {
  const brand = useOutletContext();
  const { category } = useParams();
  const [p, setP] = useSearchParams();
  const [drawer, setDrawer] = useState(false);
  const [shown, setShown] = useState(12);
  const { data, loading, error, retry } = useFetch(
    () => getProducts(brand.slug),
    [brand.slug],
  );
  const set = (k, v) => {
    const n = new URLSearchParams(p);
    v ? n.set(k, v) : n.delete(k);
    setP(n, { replace: true });
    setShown(12);
  };
  const list = useMemo(() => {
    if (!data) return [];
    let r = data.filter(x => x.category === category);
    if (p.get('metal'))
      r = r.filter(x => x.variants.some(v => v.metal === p.get('metal')));
    if (p.get('gem')) r = r.filter(x => x.gemstone === p.get('gem'));
    if (p.get('shape')) r = r.filter(x => x.specs.cut === p.get('shape'));
    if (p.get('price') && PRICE_RANGES[brand.slug]) {
      const [a, z] = PRICE_RANGES[brand.slug][+p.get('price')];
      r = r.filter(x => x.price >= a && x.price < z);
    }
    const s = p.get('sort');
    if (s === 'low') r = [...r].sort((a, c) => a.price - c.price);
    if (s === 'high') r = [...r].sort((a, c) => c.price - a.price);
    if (s === 'new') r = [...r].sort((a, c) => c.created.localeCompare(a.created));
    return r;
  }, [data, p, category, brand.slug]);
  if (category !== brand.cat) return <NotFound />;
  const crumbs = [['Home', '/'], [brand.name, '/' + brand.slug], [brand.catLabel]];
  const active = [...p.keys()].some(k => k !== 'sort');
  return (
    <>
      <Seo
        title={brand.listTitle}
        desc={brand.listDesc}
        path={`/${brand.slug}/${brand.cat}`}
        image={`/images/${brand.slug}/hero-1.svg`}
        ld={breadcrumbJsonLd(crumbs)}
      />
      <div className="wrap sec-s">
        <Breadcrumbs items={crumbs} />
        <h1>{brand.h1}</h1>
        <p className="intro">{brand.intro}</p>
        <div className="bar">
          <button className="btn ghost filt-btn" onClick={() => setDrawer(true)}>
            Filters
          </button>
          <span aria-live="polite">
            {loading ? 'Loading…' : `${list.length} products`}
          </span>
          <label>
            Sort{' '}
            <select
              value={p.get('sort') || ''}
              onChange={e => set('sort', e.target.value)}
            >
              <option value="">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="new">Newest</option>
            </select>
          </label>
        </div>
        <div className="lay">
          <aside className={'drawer' + (drawer ? ' open' : '')} aria-label="Filters">
            <div className="dh">
              <h2>Filters</h2>
              <button
                className="icon"
                aria-label="Close filters"
                onClick={() => setDrawer(false)}
              >
                ✕
              </button>
            </div>
            {data && <Filters brand={brand} p={p} set={set} all={data} />}
            <button
              className="btn ghost"
              disabled={!active}
              onClick={() => {
                setP(p.get('sort') ? { sort: p.get('sort') } : {});
                setShown(12);
              }}
            >
              Clear filters
            </button>
            <button className="btn done" onClick={() => setDrawer(false)}>
              Show {list.length} results
            </button>
          </aside>
          {drawer && <div className="scrim" onClick={() => setDrawer(false)} />}
          <div>
            {loading ? (
              <GridSkeleton />
            ) : error ? (
              <ErrorBox error={error} retry={retry} />
            ) : !list.length ? (
              <Empty
                title="No rings match those filters"
                text="Try removing a filter to see more designs."
                action="Clear filters"
                onAction={() => setP({})}
              />
            ) : (
              <>
                <div className="grid">
                  {list.slice(0, shown).map(x => (
                    <ProductCard key={x.id} p={x} />
                  ))}
                </div>
                {list.length > shown && (
                  <div className="center">
                    <button className="btn ghost" onClick={() => setShown(shown + 12)}>
                      Load more
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
