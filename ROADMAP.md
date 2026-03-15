# MTG Card Store — Project Roadmap

Path from the current frontend-only app to a complete full-stack MTG store with deck builder and Django backend.

---

## Phase 1 — Fix & polish current frontend

**Goal:** Stable base with no broken links or missing feedback.

- [ ] **Navbar:** Add real routes for Deck Builder and Account (or remove/hide links until ready).
- [ ] **Account page:** Add a simple Account page and route (placeholder or profile UI).
- [ ] **Loading & errors:** Add loading and error states in Catalog and CardDetail.
- [ ] **Cart:** Improve cart (e.g. quantity, remove item, clear cart).
- [ ] **Meta:** Set app title (e.g. "MTG Card Store") and basic meta tags in `index.html`.

**Outcome:** Clean, working store with no dead links.

---

## Phase 2 — Deck builder (frontend-only)

**Goal:** Build decks and add the full list to the cart; still no backend.

- [ ] **Deck Builder page** (`/deck-builder`):
  - Search cards (reuse Scryfall) and add to a deck list (state or context).
  - View deck as maindeck / sideboard with counts (e.g. 60/15).
  - Basic validation: min/max deck size, max copies per card (e.g. 4 in main, 1 in side for Commander).
- [ ] **“Add deck to cart”:**
  - Resolve each card in the deck to a specific printing and price (Scryfall).
  - Add those printings as cart lines (reuse existing cart).
- [ ] **Optional:** Persist deck in `localStorage` so it survives refresh.

**Outcome:** Users can build a deck and add it to the cart in one action.

---

## Phase 3 — Richer store + UX

**Goal:** Feels like a real store; strong portfolio piece.

- [ ] **Catalog:** Filters (set, color, type, format), sort (price, name, set), pagination or “load more”.
- [ ] **Cart:** Quantity controls, remove line, persist cart in `localStorage`, simple “checkout” page (no payment).
- [ ] **Account:** Login/signup UI (mock or “coming soon”) so the flow exists; real auth in Phase 5.
- [ ] **Landing:** Brief feature callouts (deck builder, browse, cart).

**Outcome:** Polished, portfolio-ready frontend with deck builder and cart.

---

## Phase 4 — Django backend (core)

**Goal:** Backend for auth, cart, and orders; frontend stays React.

- [ ] **Django project:** REST API (e.g. Django REST framework).
- [ ] **Auth:** Register, login, logout (JWT or session); protect Account and Cart/Orders on frontend.
- [ ] **Users & profiles:** Link frontend Account page to Django user/profile API.
- [ ] **Cart:** Store cart in DB (per user); API to get/update cart; frontend uses API (and optionally localStorage as cache).
- [ ] **Orders:** Create order from cart (no payment yet), order history in Account.
- [ ] **Optional:** Save “saved decks” in Django so users can load them in the deck builder.

**Outcome:** Full-stack app: React + Django API, auth, persistent cart, orders.

---

## Phase 5 — Store logic & polish

**Goal:** Real inventory and store behavior.

- [ ] **Products/listings:** Django models for what you sell (e.g. link to Scryfall card/printing, condition, price, quantity). Admin to manage stock.
- [ ] **Cart/checkout:** Cart lines reference your products and quantities; checkout creates order and (optionally) decreases stock.
- [ ] **Deck → cart:** “Add deck to cart” resolves deck list to your product IDs and adds them via API.
- [ ] **Account:** Orders list, order detail, saved addresses, saved decks (if implemented in Phase 4).

**Outcome:** MTG store with deck builder, cart, and backend-managed inventory and orders.

---

## Phase 6 — Optional extras

**Goal:** Production-ready and deployable.

- [ ] **Payments:** Integrate Stripe (or similar) for checkout.
- [ ] **Email:** Order confirmation, password reset (Django).
- [ ] **Deploy:** Frontend (e.g. Vercel/Netlify) + Django (e.g. Railway/Render/Fly.io).

---

## Summary

| Phase | Focus |
|-------|--------|
| **1** | Fix routes, loading/errors, cart basics. |
| **2** | Deck builder + “add deck to cart” (frontend-only). |
| **3** | Filters, cart persistence, checkout UI, Account placeholder. |
| **4** | Django API: auth, cart in DB, orders. |
| **5** | Products, inventory, deck → cart via backend. |
| **6** | Payments, email, deploy. |

Current position: **Phase 1**. Work through phases in order; each builds on the previous.
