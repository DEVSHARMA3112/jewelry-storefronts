// Sets the page title, meta description, canonical, Open Graph, Twitter tags and JSON-LD. React 19 moves these into <head> automatically.
import { ORIGIN } from '../utils/site';

export function Seo({ title, desc, path, image, ld }) {
  const img = ORIGIN + (image || '/images/aurelle/hero-1.svg');
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={ORIGIN + path} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      )}
    </>
  );
}
