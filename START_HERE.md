# START HERE (simple version)

## What is this?
A website with 3 jewelry shops (Aurelle, Gemma & Grove, Lustre). The pages are in one project folder.

## Open it on your computer (5 steps)
1. Install **Node.js** from https://nodejs.org (click the big "LTS" button, keep clicking Next).
2. Unzip `jewelry-storefronts.zip` (right-click, Extract All).
3. Open the folder. Click the address bar, type `cmd`, press Enter (Mac: right-click folder, "New Terminal at Folder").
4. Type `npm install` and press Enter. Wait until it finishes.
5. Type `npm run dev` and press Enter. Open the link it shows (http://localhost:5173) in Chrome.

## Where is each thing?
```
jewelry-storefronts/
├── index.html                  page shell (lang="en", fonts)
├── package.json                dependencies and scripts
├── public/
│   ├── api/<brand>/products.json   product data (fetched at runtime)
│   ├── images/<brand>/             ring images
│   ├── sitemap.xml, robots.txt
├── scripts/                    generates product data, images, sitemap
├── docs/                       guides and full source listing
└── src/
    ├── main.jsx                starts the app
    ├── App.jsx                 list of all routes
    ├── layouts/BrandLayout.jsx header + page + footer for a brand
    ├── pages/                  Home, Landing, ProductList, ProductDetail, NotFound
    ├── components/             Header, Footer, ProductCard, ProductGallery, Slider,
    │                           Filters, CartDrawer, Newsletter, Seo, Breadcrumbs, Skeleton, States
    ├── context/CartContext.jsx cart state
    ├── hooks/useFetch.js       loading / error / retry helper
    ├── api/                    products.js, newsletter.js
    ├── brands/                 aurelle.js, gemma-grove.js, lustre.js (text, SEO, filters)
    ├── styles/                 themes.css (colors, fonts) + one CSS file per area
    └── utils/                  format.js (money), links.js, seo.js, site.js
```

| I want to change... | Open this file |
|---|---|
| Shop names, headlines, SEO text | `src/brands/aurelle.js` (or `gemma-grove.js`, `lustre.js`) |
| Brand colors and fonts | `src/styles/themes.css` |
| Animations and gradient text | `src/styles/effects.css` |
| Landing page layout | `src/pages/Landing.jsx` |
| Product page / listing page | `src/pages/ProductDetail.jsx` / `ProductList.jsx` |
| Header, footer, cards | `src/components/Header.jsx`, `Footer.jsx`, `ProductCard.jsx` |
| Products and prices | `public/api/<brand>/products.json` |

Every file starts with a one-line comment that says what it does.

## Put it online (free, about 10 minutes)
1. Create a free account at https://github.com, click **New repository**, name it, create it, then use **uploading an existing file** and drag in the project folder's files (not `node_modules`).
2. Create a free account at https://vercel.com using "Continue with GitHub".
3. Click **Add New, Project**, pick your repository, click **Deploy**.
4. Copy the link Vercel gives you (like `yourname.vercel.app`). That is the link you send.
5. Reply to the assignment email with: the Vercel link, the GitHub link, and a short screen recording. Deadline: Monday, October 5, 2026.

Remember to fill in the "AI tools used" section in `README.md` honestly. The assignment asks for it.
