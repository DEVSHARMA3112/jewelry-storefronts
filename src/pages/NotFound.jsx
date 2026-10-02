// Real 404 page.
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function NotFound({ text = 'This page has moved or never existed.' }) {
  return (
    <div className="app center nf" data-brand="home">
      <Seo
        title="Page not found | Jewelry Storefronts"
        desc="The page you are looking for could not be found. Browse our three fine jewelry brands instead."
        path="/404"
      />
      <meta name="robots" content="noindex" />
      <h1>Page not found</h1>
      <p>{text}</p>
      <Link className="btn" to="/">
        Back to all brands
      </Link>
    </div>
  );
}
