// Complete structural mock data matrix mapped to required assignment parameters
export const MOCK_PRODUCTS = [
  {
    id: "aur-er-1",
    brand: "aurelle",
    title: "The Solitaire Oval Ring",
    slug: "solitaire-oval-ring",
    category: "engagement-rings",
    price: 1950,
    compareAtPrice: 2400,
    tags: ["Bestseller"],
    variants: [
      { id: "aur-er-1-yg", metal: "YG", name: "14K Yellow Gold" },
      { id: "aur-er-1-wg", metal: "WG", name: "14K White Gold" }
    ],
    images: [
      { src: "/cushion-emerald-pave-ring-1.svg", alt: "Oval Solitaire Ring Front View" },
      { src: "/cushion-emerald-pave-ring-2.svg", alt: "Oval Solitaire Ring Angled View" }
    ]
  },
  {
    id: "aur-er-2",
    brand: "aurelle",
    title: "Classic Emerald Cut Ring",
    slug: "classic-emerald-cut-ring",
    category: "engagement-rings",
    price: 2800,
    compareAtPrice: 3500,
    tags: ["Limited Edition"],
    variants: [
      { id: "aur-er-2-wg", metal: "WG", name: "14K White Gold" },
      { id: "aur-er-2-rg", metal: "RG", name: "14K Rose Gold" }
    ],
    images: [
      { src: "/emerald-lab-grown-diamond-halo-engagement-ring-1.svg", alt: "Emerald Cut Ring Front View" },
      { src: "/emerald-lab-grown-diamond-halo-engagement-ring-2.svg", alt: "Emerald Cut Ring Side View" }
    ]
  },
  {
    id: "gemma-gr-1",
    brand: "gemma-grove",
    title: "Oval Blue Sapphire Ring",
    slug: "oval-blue-sapphire-ring",
    category: "gemstone-rings",
    price: 1850,
    compareAtPrice: null,
    tags: ["New Collection"],
    variants: [
      { id: "gemma-gr-1-wg", metal: "WG", name: "14K White Gold" }
    ],
    images: [
      { src: "/oval-blue-sapphire-solitaire-ring-1.svg", alt: "Blue Sapphire Ring Front View" },
      { src: "/oval-blue-sapphire-solitaire-ring-2.svg", alt: "Blue Sapphire Ring Profile" }
    ]
  },
  {
    id: "lust-ms-1",
    brand: "lustre",
    title: "Moissanite Radiant Halo Ring",
    slug: "moissanite-radiant-halo-ring",
    category: "gemstone-rings",
    price: 1350,
    compareAtPrice: 1650,
    tags: ["Bestseller"],
    variants: [
      { id: "lust-ms-1-rg", metal: "RG", name: "14K Rose Gold" },
      { id: "lust-ms-1-yg", metal: "YG", name: "14K Yellow Gold" }
    ],
    images: [
      { src: "/oval-moissanite-halo-ring-1.svg", alt: "Moissanite Radiant Ring Front View" },
      { src: "/oval-moissanite-halo-ring-2.svg", alt: "Moissanite Radiant Ring Side View" }
    ]
  }
];

// Reusable mock API fetching methods running directly off the static code array
export async function getProducts(brandSlug) {
  await new Promise((resolve) => setTimeout(resolve, 150));
  if (!brandSlug) return MOCK_PRODUCTS;
  return MOCK_PRODUCTS.filter(product => product.brand.toLowerCase() === brandSlug.toLowerCase());
}

export async function getProductBySlug(brandSlug, slug) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_PRODUCTS.find(
    product => product.brand.toLowerCase() === brandSlug.toLowerCase() && product.slug === slug
  ) || null;
}

export async function getRelatedProducts(brandSlug, category, excludeId) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_PRODUCTS.filter(
    product => 
      product.brand.toLowerCase() === brandSlug.toLowerCase() && 
      product.category === category && 
      product.id !== excludeId
  ).slice(0, 4);
}
