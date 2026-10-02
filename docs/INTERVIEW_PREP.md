# Interview prep: how this project works

## One-minute pitch
"One React 19 + Vite app serves three brands. Three page components (Landing, List, Detail) are shared. Each brand is a config object in brands.js plus CSS variables set by a data-brand attribute from the route. Data is fetched through an API layer from JSON in public/api, with skeleton, error-with-retry and empty states. Cart is Context. SEO tags and JSON-LD render inside each page."

## Request flow
URL → React Router (`App.jsx`) → `BrandLayout` reads `:brand` from `BRANDS` (unknown brand → NotFound) → sets `data-brand` (themes) → renders Header, `<Outlet/>`, Footer, CartDrawer.
Pages: `/:brand` Landing, `/:brand/:category` List, `/:brand/:category/:slug` Detail.

## Key files and what to say
- **brands/*.js:** content per brand (copy, SEO strings, filters, categories). Adding a brand = one file, one import in `brands/index.js`, one theme block.
- **styles/themes.css:** design tokens (spacing scale 4/8/16/24/40/64/96, colors, fonts) as CSS variables; `[data-brand=x]` overrides them. Other CSS files are mobile-first, loaded in order by `styles/index.css`. `prefers-reduced-motion` disables animation.
- **api/products.js:** `getProducts`, `getProductBySlug`, `getRelatedProducts`. **api/newsletter.js:** the POST. **utils/format.js:** `money` (Intl.NumberFormat). Components never import JSON.
- **hooks/useFetch.js:** returns `{data, loading, error, retry}`. An `active` flag ignores stale responses (race condition); an attempt counter powers Retry.
- **context/CartContext.jsx:** items, count, total, add/remove/setQty, drawer open state. `add` merges the same variant id.
- **layouts/BrandLayout.jsx:** reads `:brand`, sets `data-brand`, renders Header, page, Footer, CartDrawer; unknown brand shows NotFound.
- **components/Seo.jsx:** React 19 hoists title/meta/link to the head. **Slider.jsx / ProductGallery.jsx:** CSS scroll-snap plus `scrollTo`. **ProductCard.jsx:** second image on hover.
- **pages/ProductList.jsx:** filters in URL query params (`useSearchParams`), `useMemo` for filter and sort, "Load more" at 12. **pages/ProductDetail.jsx:** variant picked by metal and carat, out-of-stock options disabled, price follows the variant.
- **scripts/:** generate product JSON, SVG art, sitemap, robots.

## Likely questions and short answers
1. **Why Context for the cart?** Small shared state across Header, Detail and drawer; Redux would be overkill (and was out of scope).
2. **Why keys on lists?** Stable `id` keys let React reuse DOM nodes; index keys break when filtering or reordering.
3. **How do you theme per brand without duplicating components?** CSS variables under `[data-brand]`; components only use `var(--x)`.
4. **useEffect cleanup in useFetch?** The `live` flag prevents setting state after unmount or after a newer request.
5. **Why is SEO limited in a Vite SPA?** Content renders with JS; crawlers handle it less reliably. Fix: Next.js or prerendering. I still set all tags correctly.
6. **How do filters survive refresh/share?** They are in the URL.
7. **Accessibility choices?** Semantic landmarks, labels, aria-pressed on toggles, aria-live regions, 44px targets, visible focus, skip link, Esc closes cart.
8. **Performance?** Lazy images below the fold, hero not lazy, width/height set to avoid layout shift, CSS-only sliders, no heavy libraries.
9. **How would you add a 4th brand?** Config object, theme block, JSON, nothing else.
10. **What would you improve?** Real photos, prerendering, tests, persistent cart in localStorage, pagination in URL.

## Be ready to live-edit
Change a brand color token, add a filter option, change items per page, add a field to the product JSON and show it on the card. Practice each once.

## Be honest about
You used AI to build the first version (it's allowed and listed in the README). Know every file above well enough to explain and modify it.
