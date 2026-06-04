# RankForge — Marketing Website

A premium, dark, futuristic landing site for **RankForge**, the operating system
for high achievers. Built with **Next.js 14 (App Router) · TypeScript · Tailwind
CSS · Framer Motion**.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build
npm run start    # serves the production build
```

## Structure

```
app/
  layout.tsx        SEO metadata, fonts, <body>
  page.tsx          Composes all sections
  globals.css       Design system: tokens, glass, gradient text, grid bg
components/
  Nav, Hero, Features, DashboardShowcase, AISection, Comparison,
  Testimonials, Roadmap, Pricing, FinalCTA, Footer
  DashboardMockup   The animated product dashboard (hero + showcase)
  ui/               AmbientBackground, Reveal, Counter, SectionHeading
lib/
  content.ts        All structured copy/data (features, pricing, comparison…)
tailwind.config.ts  Brand colors, fonts, keyframes/animations
```

## Sections

Hero · Features (10 modules) · Dashboard showcase · AI mentor · Comparison
table · Testimonials · Roadmap · Pricing · Final CTA · Footer.

## Design notes

- **Dark, futuristic, glass.** Near-black canvas with a faint blue cast, an
  animated masked grid, slow-drifting ambient lights, and film grain to kill
  banding.
- **Type.** Space Grotesk (display) + Inter (body), loaded at runtime via Google
  Fonts so the build stays offline-safe.
- **Motion.** Scroll-reveal (fade + rise + de-blur), animated stat counters,
  chart bar-rise, ring/line draw-in, hover lift + sheen. Respects
  `prefers-reduced-motion`.
- **Brand accents** mirror the desktop app: violet → indigo → cyan.

## Deploy

Optimised for Vercel (`vercel deploy`) or any Node host (`npm run build && npm run start`).
