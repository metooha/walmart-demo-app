---
name: switch-order-card-pattern
description: >-
  Switches which Walmart order card pattern is visible on the Product Detail Page.
  Use when the user asks to show, hide, or switch order card patterns, services cards,
  curbside, auto care, prescriptions, delivery warnings, or any PDP services section variant.
---

# Switch Order Card Pattern

Switch the visible order card on the PDP (`/`) by editing one file:

```
client/components/walmart/purchase-history/activePattern.ts
```

Change `ACTIVE_PATTERN_INDEX` to the matched index (0–9). The app hot-reloads via Vite HMR.

## Pattern Index Table

| Index | Pattern ID | Title |
|-------|-----------|-------|
| 0 | `none` | No services (default) |
| 1 | `curbside-get-it-now` | Active curbside with "Get it now" express upgrade |
| 2 | `auto-care` | Upcoming Auto Care appointment |
| 3 | `combined-bundle` | Oil change + grocery pickup bundled |
| 4 | `delayed-delivery` | Late delivery warning |
| 5 | `services-urgency-focus` | Prescription ready + Auto Care in progress |
| 6 | `services-all-expanded` | All 4 service types, every status variant |
| 7 | `services-single-rx-ready` | Single Rx ready (minimal state) |
| 8 | `services-multi-store` | 3 services across 2 stores |
| 9 | `auto-care-engagement` | Auto center engagement cards |

## Matching Priority

1. Explicit index number (e.g. "show pattern 3")
2. Pattern ID (e.g. `delayed-delivery`)
3. Pattern title or close variation
4. Keywords (see below)
5. If ambiguous, default to **0**

## Keyword Quick Reference

| Keywords | Index |
|----------|-------|
| none, no services, hide services, default, clean, empty | 0 |
| curbside, get it now, express upgrade, countdown to edit | 1 |
| auto care appointment, oil change appointment, check in | 2 |
| bundled, combined, oil change + grocery, bundle total | 3 |
| delayed, late delivery, delivery warning, switch to pickup | 4 |
| urgency, prescription ready + auto care, alert banner | 5 |
| all statuses, expanded, full range, every status variant | 6 |
| single rx, single prescription, minimal state | 7 |
| multi-store, multiple stores, 2 different stores | 8 |
| engagement, auto care engagement, upsell, tire rotation | 9 |

## Procedure

1. Read the user's prompt and match to an index.
2. Read `activePattern.ts`.
3. Edit `ACTIVE_PATTERN_INDEX` to the matched number.
4. Respond: `Switched to pattern [INDEX]: [TITLE]`

## Constraints

- Only edit `activePattern.ts` — no other files.
- Do not modify component code, styles, or pattern data.
- `OrderCardSwitcher` renders on `ProductDetailPage.tsx` below the related products grid.
