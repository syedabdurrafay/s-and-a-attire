# S & A Attire — Website

A Next.js (App Router) storefront for **S & A Attire**, a Karachi-based clothing brand for men,
women and kids. Built with Tailwind CSS. Editorial, high-contrast layout inspired by your
reference design, restyled around a Karachi/Sindh-textile color and typography system.

## What's included

- **Home** — oversized wordmark hero, category tiles (Men/Women/Kids), new-season banner,
  feature bar, best-sellers grid, newsletter band.
- **Shop** (`/shop`) — full catalog with category filtering (`?category=Men|Women|Kids`).
- **Product detail** (`/product/[slug]`) — size selection, add to bag, related products.
- **About** (`/about`) — brand story.
- **Contact** (`/contact`) — WhatsApp/Instagram/email details + contact form.
- **Cart drawer** — slide-out bag with quantity controls, persisted in the browser
  (`localStorage`), checkout hands off to WhatsApp (no payment gateway wired up yet).
- Fully responsive, keyboard-accessible focus states, reduced-motion respected.

## Getting started

Requires **Node.js 18.18+** (or 20+) and npm.

```bash
cd s-and-a-attire
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

## Swapping in real product photos

All images currently use `picsum.photos/seed/...` placeholders (rendered in grayscale to match
the editorial look) so the site works out of the box with zero setup. To use real photography:

1. Add your images to `public/images/`.
2. In `data/products.js`, replace each product's `seed` field with your own image path, and
   update the `<Image src="https://picsum.photos/seed/...">` calls in `components/ProductCard.jsx`,
   `components/Hero.jsx`, `components/CategoryTiles.jsx`, `components/SeasonBanner.jsx`,
   `components/CartDrawer.jsx`, and `app/product/[slug]/page.jsx`, `app/about/page.jsx` to point
   at `/images/your-file.jpg` instead.
3. Remove the `grayscale` Tailwind class anywhere you want the original color to show.

## Editing the catalog

All products live in `data/products.js` as a plain array — add, remove, or edit objects there.
Each product needs: `slug`, `name`, `category` (`Men` | `Women` | `Kids`), `price` (in PKR),
`seed` (placeholder image seed), `blurb`, `details` (array of bullet strings), and `sizes`.

## Design system

- **Colors**: warm paper (`#F1ECE1`), ink (`#14110E`), deep indigo (`#1F2A44`), rust/madder
  (`#9C3B26`) — drawn from Sindhi ajrak block-print palettes.
- **Type**: Archivo Black for display/wordmarks, Inter for body copy, Space Mono for
  labels/eyebrows — loaded via `next/font/google` in `app/layout.jsx`.
- **Signature motif**: a small repeating diamond-lattice pattern (`.motif-strip` in
  `app/globals.css`) referencing ajrak geometry, used once as a divider above the footer.

## Deploying

This is a standard Next.js app — deploy to [Vercel](https://vercel.com) (recommended, zero
config), Netlify, or any Node host. For Vercel: push this folder to a GitHub repo and import it
at vercel.com/new.

## Next steps you may want

- Hook up a real payment gateway (e.g. local options like Easypaisa/JazzCash, or Stripe) instead
  of the WhatsApp checkout handoff.
- Connect a CMS or database (e.g. Sanity, Shopify headless, or a simple Postgres + Prisma setup)
  if you'll be managing inventory beyond a static list.
- Add real product photography and an Instagram feed embed.
