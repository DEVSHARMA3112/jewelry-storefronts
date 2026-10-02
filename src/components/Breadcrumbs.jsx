// Breadcrumb trail. Each item is [label, link]; the last one has no link.
import { Link } from 'react-router-dom';

export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="crumbs">
    <ol>
      {items.map(([t, to], i) => (
        <li key={t}>
          {to ? <Link to={to}>{t}</Link> : <span aria-current="page">{t}</span>}
        </li>
      ))}
    </ol>
  </nav>
);
