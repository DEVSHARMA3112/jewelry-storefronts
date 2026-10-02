// Mock product database for the multi-tenant jewelry storefronts
export const MOCK_PRODUCTS = [
  {
    id: "aurelle-1",
    brand: "aurelle",
    title: "The Classic Halo Ring",
    slug: "classic-halo-ring",
    category: "engagement-rings",
    price: 2450,
    compareAtPrice: 3200,
    tags: ["Bestseller"],
    variants: [{ id: "aurelle-1-yg", metal: "YG" }, { id: "aurelle-1-wg", metal: "WG" }],
    images: [
      { src: "/emerald-lab-grown-diamond-halo-engagement-ring-1.svg", alt: "Classic Halo Ring Top View" },
      { src: "/emerald-lab-grown-diamond-halo-engagement-ring-2.svg", alt: "Classic Halo Ring Side View" }
    ]
  },
  {
    id: "gemma-grove-1",
    brand: "gemma-grove",
    title: "Oval Sapphire Cocktail Ring",
    slug: "oval-sapphire-cocktail-ring",
    category: "gemstone-rings",
    price: 1850,
    compareAtPrice: null,
    tags: ["New Collection"],
    variants: [{ id: "gemma-grove-1-wg", metal: "WG" }],
    images: [
      { src: "/oval-blue-High-sapphire-solitaire-ring-1.svg", alt: "Oval Sapphire Ring" },
      { src: "/oval-blue-High-sapphire-solitaire-ring-2.svg", alt: "Oval Sapphire Ring Angled View" }
    ]
  },
  {
    id: "lustre-1",
    brand: "lustre",
    title: "Moissanite Three-Stone Band",
    slug: "moissanite-three-stone-band",
    category: "gemstone-rings",
    price: 1200,
    compareAtPrice: 1500,
    tags: ["Limited Edition"],
    variants: [{ id: "lustre-1-rg", metal: "RG" }, { id: "lustre-1-wg", metal: "WG" }],
    images: [
      { src: "/pear-moissanite-three-stone-ring-1.svg", alt: "Moissanite Three-Stone Ring Front View" },
      { src: "/pear-moissanite-three-stone-ring-2.svg", alt: "Moissanite Three-Stone Ring Side View" }
    ]
  }
];

// Reusable mock API fetching methods
export async function getProducts(brandSlug) {
  // Simulate network delay like a real API
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (!brandSlug) return MOCK_PRODUCTS;
  return MOCK_PRODUCTS.filter(product => product.brand === brandSlug);
}

export async function getProductBySlug(brandSlug, slug) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_PRODUCTS.find(product => product.brand === brandSlug && product.slug === slug) || null;
}
