# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # serve dist/ locally to test the build
```

There are no tests. Lint with `npm run lint` (ESLint only, no auto-fix).

## Architecture

Single-page React app built with Vite. No React Router — routing is done via `window.location.hash` and a `hashchange` event listener in `App.jsx`.

**Two "pages":**
- `#` / anything not starting with `#/catalog` → main landing page (all sections in `App.jsx`)
- `#/catalog`, `#/catalog/<CategoryName>`, `#/catalog/group/<GroupName>` → renders `<CatalogPage />`

The `isCatalogPage` boolean in `App.jsx` controls which view renders. Navigation between them uses `window.location.hash` directly; no `pushState`.

## Data files

There are **two separate catalogs** — this distinction is critical:

| File | Purpose | Category naming |
|---|---|---|
| `src/products.js` | 6 curated products shown on the homepage Products section | Broad keys: `'Drive & Motion'`, `'PLCs & HMIs'`, etc. |
| `src/catalog.js` | ~1200 full product lines used in CatalogPage | Granular: `'AC Drives'`, `'Variable Frequency Drive'`, `'PLC'`, etc. |

These category namespaces **do not overlap**. `PRODUCT_GROUP_CATS` in `CatalogPage.jsx` is the explicit mapping from `products.js` broad categories → `catalog.js` granular categories. If you add a new broad category to `products.js`, add a corresponding entry in `PRODUCT_GROUP_CATS`.

`products.js` also exports `CATEGORY_ORDER` (display order) and `CATEGORY_META` (human label + blurb per category).

## Routing from Products section → Catalog

Clicking a catcard on the homepage calls `goToCatalogGroup(category)` which sets the hash to `#/catalog/group/<products.js key>`. `App.jsx` parses this into `catalogInitialGroup`, passes it to `<CatalogPage initialGroup={...} />`, and CatalogPage uses `PRODUCT_GROUP_CATS` to restrict results to the relevant catalog categories.

Nav dropdowns (header + mobile drawer) call `goToCatalogCategory(cat)` which sets `#/catalog/<catalog.js category name>` — these go straight to a single catalog category without the group mapping.

## CSS design tokens

Defined in `src/index.css`. Key variables:

```
--ink        dark text
--steel      secondary/muted text
--paper      white background
--mist       light grey background (alternate sections)
--accent     #d6510a  burnt orange (primary CTA colour)
--accent-deep darker orange (hover)
--line       subtle border
--line-strong stronger border
--font-mono  IBM Plex Mono
--font-display Space Grotesk
--font-body  Inter
```

## WhatsApp integration

All WhatsApp links use `https://wa.me/919781921116?text=...`. The number constant is `WHATSAPP = '919781921116'` at the top of `App.jsx`. Always pass a **complete sentence** as the pre-filled text — never a trailing colon or incomplete fragment.

## Enquiry cart

State lives entirely in `App.jsx` (`cartItems`, `cartOpen`). `addToCart` / `removeFromCart` are passed as props down to `CatalogPage`. Cart is in-memory only — it clears on page reload.

## Static files

`public/_redirects` — Cloudflare/Netlify SPA fallback (`/* /index.html 200`)  
`public/404.html` — copy of `index.html` for CDN 404 fallback  
`public/logo.png` — transparent-background PNG (6014×1311 RGBA), used in header  
`public/favicon-badge.png` — red M badge, used as favicon  
`public/images/hero/slide-1.jpg` … `slide-5.jpg` — hero slider images  
`public/images/brands/` — brand logo files referenced in `brandMarquee` array  

## SEO

All structured data is in `index.html` as JSON-LD: `LocalBusiness`, `FAQPage`, `ItemList` (top products), `Service` (drive repair), `WebSite` with `SearchAction`. The `<noscript>` block in `<body>` provides a readable fallback for non-JS crawlers. Do not remove it.
