// Builds the BreadcrumbList structured data (JSON-LD) from [label, link] pairs.
import { ORIGIN } from './site';

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, link], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: ORIGIN + (link || location.pathname),
    })),
  };
}
