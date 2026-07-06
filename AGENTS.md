# AGENT INSTRUCTIONS — ORDER CARD SWITCHER

> **YOUR SOLE PURPOSE**: Switch which order card pattern is visible on the Product Detail Page (PDP) at `/`.
> You have NO other job. Do NOT explore the codebase. Do NOT create files. Do NOT modify any file other than `activePattern.ts`.

---

## HOW TO SWITCH THE ACTIVE PATTERN

You control the visible order card by editing **one number** in this file:

```
client/components/walmart/purchase-history/activePattern.ts
```

The file looks like this:

```ts
export const ACTIVE_PATTERN_INDEX = 0;
```

To switch patterns, use the **Edit** tool to change the number. Example — switching from pattern `0` to pattern `3`:

```
old_str: export const ACTIVE_PATTERN_INDEX = 0;
new_str: export const ACTIVE_PATTERN_INDEX = 3;
```

That's it. The app will hot-reload and show the new pattern instantly on the PDP page (`/`).

---

## PROMPT → PATTERN MAPPING

When you receive a prompt, match it to the correct **index** below and edit `activePattern.ts` to that index.

| Index | Pattern ID | Title | Canonical Prompt |
|-------|-----------|-------|-----------------|
| **0** | `none` | No services (default) | Hide the services section entirely. Clean PDP with no order cards. |
| **1** | `curbside-get-it-now` | Active curbside with "Get it now" express upgrade | Show an active curbside order with a countdown to edit and a "Get it now" button to upgrade to express delivery. |
| **2** | `auto-care` | Upcoming Auto Care appointment | Show a scheduled oil change appointment card with Check in, Reschedule, and View details actions. |
| **3** | `combined-bundle` | Oil change + grocery pickup bundled | Show a combined card pairing a same-day oil change with a curbside pickup, with a merged bundle total. |
| **4** | `delayed-delivery` | Late delivery warning | Show a delayed delivery warning card with options to reschedule, switch to pickup, or cancel. |
| **5** | `services-urgency-focus` | Services: Prescription ready + Auto Care in progress (urgency focus) | Show a "Your Services" card highlighting an urgent Prescription ready for pickup (with Alert banner) and Auto Care in progress. |
| **6** | `services-all-expanded` | Services: All statuses expanded (full range) | Show an expanded "Your Services" card with all 4 service types showing every status variant — Ready (green), In Progress (blue), Scheduled (gray), and Canceled (red). |
| **7** | `services-single-rx-ready` | Services: Single Rx ready (minimal state) | Show a minimal "Your Services" card with a single Prescription ready for pickup and an urgency Alert banner. |
| **8** | `services-multi-store` | Services: Multi-store services | Show a "Your Services" card with 3 services across 2 different stores, demonstrating store context in each row microcopy. |
| **9** | `auto-care-engagement` | Auto center engagement cards | Show 2 ways to improve Auto Care engagement. |

---

## KEYWORD MATCHING RULES

If the user's prompt does not exactly match a canonical prompt, use these keywords to determine the correct index:

| Keywords / Phrases | → Index |
|---|---|
| "none", "no services", "hide services", "default", "clean", "empty" | **0** |
| "curbside", "get it now", "express upgrade", "countdown to edit" | **1** |
| "auto care appointment", "oil change appointment", "check in", "reschedule appointment" | **2** |
| "bundled", "combined", "oil change + grocery", "bundle total", "paired" | **3** |
| "delayed", "late delivery", "delivery warning", "switch to pickup" | **4** |
| "urgency", "prescription ready + auto care", "alert banner", "in progress", "urgency focus" | **5** |
| "all statuses", "expanded", "full range", "every status variant", "4 service types" | **6** |
| "single rx", "single prescription", "minimal state", "minimal services" | **7** |
| "multi-store", "multiple stores", "2 different stores", "3 services across" | **8** |
| "engagement", "auto care engagement", "upsell", "maintenance health", "tire rotation offer" | **9** |

### Matching priority

1. If the prompt contains an explicit **index number** (e.g. "show pattern 3"), use that index directly.
2. If the prompt contains a **pattern ID** (e.g. "delayed-delivery"), use the matching index.
3. If the prompt contains a **pattern title** or close variation, use the matching index.
4. Otherwise, scan for **keywords** from the table above. Pick the best match.
5. If truly ambiguous, default to index **0**.

---

## STEP-BY-STEP PROCEDURE

Every time you receive a message:

1. **Read the user's prompt.**
2. **Match it** to a pattern index (0–9) using the tables above.
3. **Read** the file `client/components/walmart/purchase-history/activePattern.ts`.
4. **Edit** the file — change the number to the matched index.
5. **Respond** with: "Switched to pattern [INDEX]: [TITLE]"

That is the entire workflow. Nothing else.

---

## FORBIDDEN ACTIONS

You must **NEVER** do any of the following:

- Do NOT create new files
- Do NOT delete files
- Do NOT modify any file other than `client/components/walmart/purchase-history/activePattern.ts`
- Do NOT explore the codebase (no Glob, no Grep, no Agent explorer)
- Do NOT install packages
- Do NOT run shell commands
- Do NOT modify component code, styles, or page files
- Do NOT add new patterns or change existing pattern data
- Do NOT touch `OrderCardSwitcher.tsx` or any other `.tsx` file
- Do NOT ask clarifying questions — just pick the best match and switch

---

## WHERE THE SWITCHER RENDERS

The `OrderCardSwitcher` component is rendered on the **Product Detail Page (PDP)** at route `/`, inside `client/pages/ProductDetailPage.tsx`. It appears in the services section below the "You Might Also Like" related products grid. Changing the index in `activePattern.ts` updates the visible card via Vite HMR — no page reload needed.

---

## FILE LOCATION (repeated for emphasis)

```
client/components/walmart/purchase-history/activePattern.ts
```

This is the **only** file you edit. This is the **only** file that matters.
