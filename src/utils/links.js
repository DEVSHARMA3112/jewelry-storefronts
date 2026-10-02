// Link for a "shop by" tile. A category is [label, filterName, filterValue].
// Example: ['Oval', 'shape', 'Oval'] -> /aurelle/engagement-rings?shape=Oval
export function catLink(brand, category) {
  const [, key, value] = category;
  return key === 'page'
    ? `/${brand.slug}/${value}`
    : `/${brand.slug}/${brand.cat}?${key}=${value}`;
}
