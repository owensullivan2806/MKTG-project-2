# Lace Your Own Way

A student marketing campaign for Google Checkered Shoelaces White. Built with
React 19, TypeScript, Vite, Tailwind CSS, GSAP/ScrollTrigger, and Lenis.

## Run

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

## Design and motion

The palette repeats the laces’ blue, red, yellow, and green on white. Darker blue
and green variants maintain readable text and button contrast.

A generated transparent sneaker cutout follows the page between four measured
DOM slots. `src/components/ShoeStage.tsx` interpolates position, scale, and angle
on desktop; on narrow screens it docks to in-flow slots so it stays clear of copy.
Reduced-motion preferences disable smooth scrolling, ticker movement, and rotation.
The static content, native navigation, and FAQs remain accessible without animation.

The copy targets students and sneaker fans, focusing on personal expression and a
small, affordable style change. Shopping links go to the actual Google Merch Shop;
this site does not take payments or pretend to be the official store.

## Product facts and images

Official product listing, verified October 6, 2026:
https://shop.merch.google/product/google-checkered-shoelaces-white-ggoegcba186299

Listed price: $5 USD. Dimensions: 0.5 inches wide by 45 inches long. Made in USA.
Price, inventory, and shipping are confirmed by the official store at purchase time.
See ASSETS.md for image provenance and the exact generation prompt.

## Deployment

Repository: https://github.com/owensullivan2806/MKTG-project-2
Website: https://owensullivan2806.github.io/MKTG-project-2/

Vite uses `/MKTG-project-2/` as the base path. `.github/workflows/deploy.yml` runs
npm ci, TypeScript validation, and the production build before deploying to Pages.
A push to main triggers deployment; the workflow can also be run manually.
The original wine template is preserved in commit 5b674107ceed189c0e5aaf73dc0d0a528730981b.
