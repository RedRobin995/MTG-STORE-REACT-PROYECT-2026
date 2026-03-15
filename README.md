# MTG Card Store

A Magic: The Gathering card store and deck builder built with React. Browse cards via the [Scryfall API](https://scryfall.com/docs/api), view printings and prices, add singles to cart, and (planned) build decks and add deck lists directly to your cart.

## Project status

- **Current:** Frontend-only React app — browse cards, card detail with printings, shopping cart.
- **Planned:** Deck builder, full checkout flow, then a Django backend for auth, orders, and inventory.

See **[ROADMAP.md](./ROADMAP.md)** for the full development path from here to a complete full-stack portfolio project.

## Tech stack

| Layer        | Tech                    |
|-------------|-------------------------|
| Frontend    | React 19, Vite 7        |
| Routing     | React Router v6        |
| State       | React Context (cart)   |
| Data (API)  | Scryfall (public API)   |
| Backend     | *Planned:* Django + DRF |

## Repository structure

```
MTG STORE REACT PROYECT 2026/
├── mtg-card-explorer/     # React app (Vite)
│   ├── src/
│   │   ├── components/    # Navbar, Card, PrintRow, etc.
│   │   ├── contexts/      # CartContext
│   │   ├── pages/         # Landing, Catalog, CardDetail, Cart
│   │   ├── services/      # scryfallApi.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── ROADMAP.md
```

## Getting started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Install and run

```bash
cd mtg-card-explorer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). No API keys are required; the app uses Scryfall’s public API.

### Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |

## GitHub Pages deployment

The app is deployed via **GitHub Actions**: each push to `main`/`master` builds the React app and deploys the built files to GitHub Pages.

**One-time setup:** In the repo on GitHub go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**. After the next push, the workflow will run and your site URL will serve the app (not the README).

**Why it showed the README before:** Pages was likely set to “Deploy from a branch” using the repo root. The repo root has no `index.html` (the app lives in `mtg-card-explorer/` and the real entry is the *built* `dist/index.html`). So GitHub had nothing to serve as the site and fell back to showing the repo (README). The workflow fixes this by building the app and deploying only the `dist/` output so that the site root has `index.html` and the app loads correctly.

## Features (current)

- **Landing:** Random cards, search bar, link to catalog.
- **Catalog:** Search by name/type/oracle text, grid of cards with “from $X” pricing.
- **Card detail:** Full card info, all printings sorted by price, “Add to cart” per printing.
- **Cart:** List of items, subtotal; cart state in React Context.
- **Navbar:** Home, Cards, Deck Builder (placeholder), Cart, Account (placeholder).

## License

Private / portfolio project. Scryfall data and imagery follow [Scryfall’s terms of use](https://scryfall.com/docs/api).
