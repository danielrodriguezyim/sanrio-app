# ★ Sanrio Friends Fan Store

A responsive, multi-page fan web application celebrating the world of Sanrio. Browse beloved characters, explore a categorised product catalogue backed by Firebase, and get in touch through an interactive contact page — all wrapped in a cute-but-professional pastel aesthetic.

> **Disclaimer:** This is a fan-made, non-commercial project created for educational purposes. All Sanrio characters, names, and artwork are the intellectual property of [Sanrio Co., Ltd.](https://www.sanrio.com/) This project is not affiliated with, endorsed by, or connected to Sanrio in any way.

---

## ✦ Pages

| Route | Description |
|---|---|
| `/` | Home — Hero banner, character carousel, and filterable product grid |
| `/characters` | Full character gallery with live search and category filtering |
| `/contact` | Contact form with Firebase persistence and an interactive map |
| `/terms-of-service` | Terms of Service |
| `/privacy-policy` | Privacy Policy |

---

## ♡ Features

- **Character Carousel** — Swiper-powered showcase reading from a static JSON data file
- **Product Catalogue** — Firebase Realtime Database–backed grid with client-side category filtering and loading skeletons
- **Contact Form** — React Hook Form with validation; submissions are saved to Firebase
- **Interactive Map** — React-Leaflet map centred on Sanrio HQ in Tokyo
- **Responsive Layout** — Mobile-first, flexbox throughout; hamburger drawer navigation on small screens
- **Animated UI** — Entrance animations and micro-interactions via Framer Motion
- **404 Page** — Custom not-found screen with navigation back to safety

---

## 🛠 Tech Stack

### Core
| Package | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [React Router DOM v6](https://reactrouter.com/) | Client-side routing |

### Firebase
| Package | Purpose |
|---|---|
| [Firebase JS SDK](https://firebase.google.com/docs/web/setup) | Realtime Database reads/writes |

### Third-Party UI Components
| Package | Purpose |
|---|---|
| [Swiper.js](https://swiperjs.com/) | Touch-friendly character carousel |
| [React-Leaflet](https://react-leaflet.js.org/) + [Leaflet](https://leafletjs.com/) | Interactive map on the contact page |
| [Framer Motion](https://www.framer.com/motion/) | Page entrance animations and transitions |
| [React Hook Form](https://react-hook-form.com/) | Contact form state and validation |
| [React Icons](https://react-icons.github.io/react-icons/) | Social media icons in the footer (Font Awesome 6) |

### Fonts
| Font | Usage | Source |
|---|---|---|
| [Baloo 2](https://fonts.google.com/specimen/Baloo+2) | Headings, logo, buttons | Google Fonts |
| [Nunito](https://fonts.google.com/specimen/Nunito) | Body text | Google Fonts |

### Map Tiles
Map tiles are provided by [OpenStreetMap](https://www.openstreetmap.org/) contributors under the [Open Database Licence (ODbL)](https://opendatacommons.org/licenses/odbl/). Attribution is displayed automatically by Leaflet.

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── category-filter/   # Product category pill buttons
│   ├── character-card/    # Reusable character card (carousel + grid)
│   ├── character-carousel/# Swiper carousel reading from characters.json
│   ├── contact-form/      # React Hook Form with Firebase submission
│   ├── footer/            # Site footer with social links and legal nav
│   ├── header/            # Sticky header with responsive hamburger menu
│   ├── hero/              # Home page hero banner with animations
│   ├── layout/            # Layout wrapper (Header + Outlet + Footer)
│   ├── map-embed/         # React-Leaflet map component
│   ├── product-card/      # Individual product card with badge support
│   └── product-grid/      # Firebase-backed grid with skeleton loader
├── data/
│   └── characters.json    # Static character data for the carousel
├── firebase/
│   ├── firebase-config.ts # Firebase app initialisation
│   └── database-service.ts# All Realtime Database read/write functions
├── hooks/
│   └── use-products.ts    # Custom hook — fetches and filters products
├── pages/
│   ├── characters/        # Full character gallery with search
│   ├── contact/           # Contact form + map layout
│   ├── home/              # Home page composition
│   ├── legal/             # Shared Terms of Service / Privacy Policy page
│   └── not-found/         # 404 page
├── router/
│   ├── app-router.tsx     # Route definitions
│   └── routes.ts          # Centralised route path constants
├── styles/
│   ├── variables.css      # Design tokens (colours, spacing, typography…)
│   └── global.css         # Reset, shared utilities, and animations
├── types/
│   ├── character.ts       # Character and CharacterCategory types
│   └── product.ts         # Product and ProductCategory types
└── main.tsx               # App entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with the **Realtime Database** enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/danielrodriguezyim/sanrio-app.git
cd sanrio-app

# Install dependencies
npm install
```

### Environment Variables

Rename `.env.example` to `.env` and fill in your Firebase project credentials:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.region.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> Vite will not hot-reload `.env` changes — restart the dev server after creating or editing the file.

### Firebase Database Rules

In the Firebase console under **Realtime Database → Rules**, set:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": false
    },
    "contact-messages": {
      ".read": false,
      ".write": true
    }
  }
}
```

### Seed the Database

Import `rtdb-import.json` from the Firebase console:
**Realtime Database → ⋮ menu → Import JSON**

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

---

## 🎨 Design Decisions

- **Colour palette** — Built around Sanrio's iconic pastel pinks with lavender and peach accents, defined entirely through CSS custom properties in `variables.css` for consistency and easy theming.
- **Typography** — Baloo 2 (rounded, friendly) for headings and Nunito (clean, legible) for body text — both chosen to reflect the brand's playful-but-approachable personality.
- **Mobile-first** — Base styles target small screens; `min-width` media queries progressively enhance the layout upward.
- **No CSS Grid** — All layouts are built exclusively with flexbox as a project constraint.
- **Client-side filtering** — Product category filtering is handled in memory via `useMemo` rather than per-filter database queries, eliminating the need for composite indexes and reducing read costs.

---

## 📚 Resources & Inspiration

### Official References
- [Sanrio Official Website](https://www.sanrio.com/) — Character descriptions and brand reference
- [Sanrio Characters](https://www.sanrio.com/pages/characters) — Official character roster

### Documentation
- [React Docs](https://react.dev/reference/react)
- [Vite Docs](https://vitejs.dev/guide/)
- [Firebase Realtime Database Docs](https://firebase.google.com/docs/database/web/start)
- [React Router Docs](https://reactrouter.com/en/main)
- [Swiper.js React Components](https://swiperjs.com/react)
- [React-Leaflet Docs](https://react-leaflet.js.org/docs/start-introduction/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Hook Form Docs](https://react-hook-form.com/get-started)

### Design Inspiration
- [Dribbble — Kawaii UI](https://dribbble.com/search/kawaii-ui) — Pastel interface exploration
- [Sanrio on Pinterest](https://www.pinterest.com/sanrio/) — Official brand imagery and colour references
- [Google Fonts — Baloo 2](https://fonts.google.com/specimen/Baloo+2) — Rounded display typeface
- [CSS-Tricks — A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) — Flexbox reference

---

## 📝 Naming Conventions

| Context | Convention | Example |
|---|---|---|
| Folders | kebab-case | `character-card/` |
| TSX / CSS files | PascalCase | `CharacterCard.tsx` |
| TS utility files | kebab-case | `database-service.ts` |
| CSS classes / IDs | kebab-case | `.character-card__name` |
| Variables / functions | camelCase | `fetchProducts` |
| Booleans | is / has / should prefix | `isLoading`, `hasError` |
| Routes | kebab-case | `/characters`, `/contact` |
| Types / Interfaces | PascalCase | `Product`, `CharacterCategory` |

---

*Made with ♡.*
