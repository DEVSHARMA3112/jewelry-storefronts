// Product page: gallery, variant picker, price, add to cart, specs, accordion, related products.
import { useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getProductBySlug, getRelatedProducts } from '../api/products';
import { METAL_HEX } from '../brands';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { ProductGallery } from '../components/ProductGallery';
import { Seo } from '../components/Seo';
import { GridSkeleton, Skeleton } from '../components/Skeleton';
import { Empty, ErrorBox } from '../components/States';
import { useCart } from '../context/CartContext';
import { money } from '../utils/format';
import { breadcrumbJsonLd } from '../utils/seo';
import { ORIGIN } from '../utils/site';

export function ProductDetail() {
  const brand = useOutletContext();
  const { category, slug } = useParams();
  const { add } = useCart();
  const {
    data: p,
    loading,
    error,
    retry,
  } = useFetch(() => getProductBySlug(brand.slug, slug), [brand.slug, slug]);
  const rel = useFetch(
    () => getRelatedProducts(brand.slug, category, p?.id),
    [brand.slug, category, p?.id],
  );
  const [sel, setSel] = useState({});
  const [qty, setQty] = useState(1);
  if (loading)
    return (
      <div className="wrap sec-s two">
        <Skeleton h={560} />
        <div>
          <Skeleton h={32} />
          <Skeleton h={24} w="40%" />
          <Skeleton h={160} />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="wrap">
        <ErrorBox error={error} retry={retry} />
      </div>
    );
  if (!p || category !== brand.cat)
    return (
      <div className="wrap center nf">
        <Seo
          title={`Product not found | ${brand.name}`}
          desc="We couldn't find that product."
          path={location.pathname}
        />
        <meta name="robots" content="noindex" />
        <h1>Product not found</h1>
        <p>It may have sold out or the link may be wrong.</p>
        <Link className="btn" to={`/${brand.slug}/${brand.cat}`}>
          Browse {brand.catLabel.toLowerCase()}
        </Link>
      </div>
    );
  const V = p.variants,
    first = V.find(v => v.inStock) || V[0],
    metal = sel.metal || first.metal,
    carat = sel.carat ?? first.carat;
  const cur = V.find(v => v.metal === metal && v.carat === carat) || first;
  const metals = [...new Set(V.map(v => v.metal))],
    carats = [...new Set(V.map(v => v.carat))];
  const ok = (m, c) => V.some(v => v.metal === m && v.carat === c && v.inStock);
  const crumbs = [
    ['Home', '/'],
    [brand.name, '/' + brand.slug],
    [brand.catLabel, `/${brand.slug}/${brand.cat}`],
    [p.title],
  ];
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.title,
      image: p.images.map(i => ORIGIN + i.src),
      description: p.description,
      sku: p.id,
      brand: { '@type': 'Brand', name: brand.name },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: p.rating,
        reviewCount: p.reviewCount,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: cur.price,
        availability: cur.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        url: ORIGIN + location.pathname,
      },
    },
    breadcrumbJsonLd(crumbs),
  ];
  const addCart = () =>
    add(
      {
        id: cur.id,
        title: p.title,
        img: p.images[0].src,
        alt: p.images[0].alt,
        metal,
        carat,
        price: cur.price,
        url: `/${brand.slug}/${brand.cat}/${p.slug}`,
      },
      qty,
    );
  return (
    <>
      <Seo
        title={`${p.title} | ${brand.name}`}
        desc={`${p.description.slice(0, 110)} Free US shipping.`}
        path={`/${brand.slug}/${brand.cat}/${p.slug}`}
        image={p.images[0].src}
        ld={ld}
      />
      <div className="wrap sec-s">
        <Breadcrumbs items={crumbs} />
        <div className="two pd">
          <ProductGallery images={p.images} />
          <div className="buy">
            <h1>{p.title}</h1>
            <p className="rate">
              <span className="stars" aria-hidden="true">
                ★★★★★
              </span>{' '}
              {p.rating} ({p.reviewCount} reviews)
            </p>
            <p className="pr">
              {p.compareAtPrice && cur.price === p.price && (
                <s>{money(p.compareAtPrice)}</s>
              )}{' '}
              <strong>{money(cur.price)}</strong>
            </p>
            <fieldset>
              <legend>Metal: {metal}</legend>
              <div className="opts">
                {metals.map(m => (
                  <button
                    key={m}
                    className="swatch"
                    aria-label={m}
                    aria-pressed={m === metal}
                    disabled={!ok(m, carat)}
                    title={m}
                    onClick={() => setSel({ metal: m, carat })}
                    style={{ '--c': METAL_HEX[m] }}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Carat weight: {carat} ct</legend>
              <div className="opts">
                {carats.map(c => (
                  <button
                    key={c}
                    className="chip"
                    aria-pressed={c === carat}
                    disabled={!ok(metal, c)}
                    onClick={() => setSel({ metal, carat: c })}
                  >
                    {c} ct
                  </button>
                ))}
              </div>
            </fieldset>
            <p className={'stock ' + (cur.inStock ? 'in' : 'out')}>
              {cur.inStock ? 'In stock. Ships in 3 to 5 days.' : 'Out of stock'}
            </p>
            <div className="qrow">
              <div className="qty">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  −
                </button>
                <output aria-live="polite">{qty}</output>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty(Math.min(9, qty + 1))}
                >
                  +
                </button>
              </div>
              <button className="btn grow" disabled={!cur.inStock} onClick={addCart}>
                Add to cart
              </button>
            </div>
            <dl className="specs">
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <details open>
              <summary>Description</summary>
              <p>{p.description}</p>
            </details>
            <details>
              <summary>Materials and care</summary>
              <p>
                Recycled 14K gold. Clean with warm water and mild soap; store separately.
              </p>
            </details>
            <details>
              <summary>Shipping and returns</summary>
              <p>Free insured US shipping. Return within 30 days for a full refund.</p>
            </details>
          </div>
        </div>
        <section className="sec-s">
          <h2>You may also like</h2>
          {rel.loading ? (
            <GridSkeleton n={4} />
          ) : rel.error ? (
            <ErrorBox error={rel.error} retry={rel.retry} />
          ) : !rel.data?.length ? (
            <Empty
              title="No related products"
              text="Browse the full collection instead."
            />
          ) : (
            <div className="grid">
              {rel.data.map(x => (
                <ProductCard key={x.id} p={x} />
              ))}
            </div>
          )}
        </section>
      </div>
      <div className="sticky">
        <span>{money(cur.price)}</span>
        <button className="btn" disabled={!cur.inStock} onClick={addCart}>
          Add to cart
        </button>
      </div>
    </>
  );
}
