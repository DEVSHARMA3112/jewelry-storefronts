// Brand landing page: hero, categories, bestsellers, story, lookbook, trust strip, reviews, newsletter.
import { Link, useOutletContext } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getProducts } from '../api/products';
import { Newsletter } from '../components/Newsletter';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { GridSkeleton } from '../components/Skeleton';
import { Slider } from '../components/Slider';
import { Empty, ErrorBox } from '../components/States';
import { catLink } from '../utils/links';
import { ORIGIN } from '../utils/site';

export function Landing() {
  const brand = useOutletContext();
  const { data, loading, error, retry } = useFetch(
    () => getProducts(brand.slug),
    [brand.slug],
  );
  const reps = data && data.length < 8 ? 4 : 2;
  const best = data
    ? data
        .filter(p => p.tags.includes('bestseller'))
        .concat(data)
        .filter((p, i, a) => a.indexOf(p) === i)
        .slice(0, 8)
    : [];
  const slides = [0, 1, 2].map(i => (
    <div className="hero" key={i}>
      <img
        src={`/images/${brand.slug}/hero-${i + 1}.svg`}
        alt={`${brand.name} featured ring ${i + 1}`}
        width="1600"
        height="900"
        fetchPriority={i ? undefined : 'high'}
      />
      <div className="hero-t wrap">
        {i === 0 ? (
          <h1>{brand.hero[0]}</h1>
        ) : (
          <p className="h1like">
            {
              [
                'Made to be worn every day',
                'Free resizing for life',
                'Insured delivery across the US',
              ][i]
            }
          </p>
        )}
        <p>{brand.hero[1]}</p>
        <Link className="btn" to={`/${brand.slug}/${brand.cat}`}>
          Shop {brand.catLabel.toLowerCase()}
        </Link>
      </div>
    </div>
  ));
  return (
    <>
      <Seo
        title={brand.landingTitle}
        desc={brand.landingDesc}
        path={'/' + brand.slug}
        image={`/images/${brand.slug}/hero-1.svg`}
        ld={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: brand.name,
          url: ORIGIN + '/' + brand.slug,
          logo: ORIGIN + `/images/${brand.slug}/hero-1.svg`,
        }}
      />
      {/* Hero: auto-sliding images */}
      <Slider slides={slides} auto label={`${brand.name} featured`} />
      {/* Category tiles with images */}
      <section className="sec wrap">
        <h2>Shop by {brand.slug === 'gemma-grove' ? 'gemstone' : 'shape'}</h2>
        <div className="cats">
          {brand.cats.map(c => {
            const m =
              data &&
              (data.find(x => x.specs.cut === c[2] || x.gemstone === c[2]) || data[0]);
            return (
              <Link key={c[0]} to={catLink(brand, c)} className="cat">
                {m && (
                  <img
                    src={m.images[0].src}
                    alt={m.images[0].alt}
                    loading="lazy"
                    width="800"
                    height="1000"
                  />
                )}
                <span>
                  {c[3] && <i style={{ background: c[3] }} />}
                  {c[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      {/* Bestsellers (API data) */}
      <section className="sec wrap">
        <h2>Bestsellers</h2>
        {loading ? (
          <GridSkeleton n={4} />
        ) : error ? (
          <ErrorBox error={error} retry={retry} />
        ) : !best.length ? (
          <Empty title="No products yet" text="Check back soon for new designs." />
        ) : (
          <div className="rail">
            {best.map(p => (
              <div key={p.id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Brand story */}
      <section className="sec story">
        <div className="wrap two">
          <img
            src={`/images/${brand.slug}/hero-2.svg`}
            alt={`Craftsmanship at ${brand.name}`}
            loading="lazy"
            width="1600"
            height="900"
          />
          <div>
            <h2>{brand.story[0]}</h2>
            <p>{brand.story[1]}</p>
            <Link className="btn ghost" to={`/${brand.slug}/${brand.cat}`}>
              Explore the collection
            </Link>
          </div>
        </div>
      </section>
      {data && (
        <section className="sec look">
          <div className="wrap">
            <h2>The lookbook</h2>
          </div>
          <div className="marq">
            <div className="marq-in" style={{ '--n': reps }}>
              {Array.from({ length: reps }).flatMap((_, r) =>
                data.map((x, i) => (
                  <img
                    key={`${r}-${x.id}`}
                    src={x.images[(i + r) % 2].src}
                    alt={r ? '' : x.images[(i + r) % 2].alt}
                    aria-hidden={r ? true : undefined}
                    loading="lazy"
                    width="800"
                    height="1000"
                  />
                )),
              )}
            </div>
          </div>
        </section>
      )}
      {brand.compare && (
        <section className="sec wrap">
          <h2>Moissanite vs. diamond</h2>
          <div className="scroll">
            <table className="cmp">
              <tbody>
                {brand.compare.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) =>
                      i ? (
                        j ? (
                          <td key={j}>{c}</td>
                        ) : (
                          <th key={j} scope="row">
                            {c}
                          </th>
                        )
                      ) : (
                        <th key={j} scope="col">
                          {c}
                        </th>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {/* Trust strip */}
      <section className="sec trust">
        <ul className="wrap trust-in">
          {brand.trust.map(t => (
            <li key={t[0]}>
              <strong>{t[0]}</strong>
              <span>{t[1]}</span>
            </li>
          ))}
        </ul>
      </section>
      {/* Customer reviews */}
      <section className="sec wrap">
        <h2>Loved by customers</h2>
        <div className="revs">
          {brand.reviews.map(r => (
            <figure key={r[0]}>
              <div aria-label="5 out of 5 stars" className="stars">
                ★★★★★
              </div>
              <blockquote>{r[1]}</blockquote>
              <figcaption>{r[0]}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Newsletter brand={brand} />
    </>
  );
}
