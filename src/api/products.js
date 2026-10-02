// The product "API" layer. Components call these functions and never import JSON directly.
// On the live site the data is static JSON served from /public/api/<brand>/products.json.

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

// All products for one brand.
export const getProducts = brand => request(`/api/${brand}/products.json`);

// One product by its URL slug, or null if it does not exist.
export async function getProductBySlug(brand, slug) {
  const products = await getProducts(brand);
  return products.find(product => product.slug === slug) || null;
}

// Up to 4 other products from the same category.
export async function getRelatedProducts(brand, category, excludeId) {
  const products = await getProducts(brand);
  return products
    .filter(product => product.category === category && product.id !== excludeId)
    .slice(0, 4);
}
