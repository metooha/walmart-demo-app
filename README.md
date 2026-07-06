# Walmart Demo App

A Living Design 3.5 design system demo with Walmart purchase history order card patterns on the Product Detail Page.

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080) (Vite picks the next free port if 8080 is taken).

## Order Card Patterns

Switch the visible pattern by editing `client/components/walmart/purchase-history/activePattern.ts` or ask Cursor to switch patterns using the `switch-order-card-pattern` skill.

## GitHub Pages

Pushes to `main` deploy the client SPA to GitHub Pages via `.github/workflows/deploy-pages.yml`.

Live site: `https://metooha.github.io/walmart-demo-app/`

## Build

```bash
pnpm build        # client + server
pnpm build:client # SPA only (used for Pages)
```
