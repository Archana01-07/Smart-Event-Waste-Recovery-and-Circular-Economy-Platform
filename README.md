# EcoLoop  — Smart Event Waste Recovery Platform

Production-level React frontend for a circular economy SaaS platform connecting event organizers, NGOs/recyclers, and city admins.

## Tech Stack

- **React 19** + Vite
- **Tailwind CSS v4** (glassmorphism, dark/light mode)
- **React Router v7**
- **Framer Motion** — page & UI animations
- **Recharts** — analytics dashboards
- **Leaflet / react-leaflet** — GIS maps & routes
- **Axios** — API layer (mock services)
- **Context API** — auth & theme

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Event Organizer | organizer@ecoloop | Demo1234 |
| NGO / Recycler | ngo@ecoloop | Demo1234 |
| Admin | admin@ecoloop | Demo1234 |

## Features

### Public
- Landing page (hero, workflow, features, stats, map preview, testimonials, FAQ)
- Auth: login, signup, forgot password, role selection

### Event Organizer (`/organizer`)
- Dashboard KPIs, charts, AI match preview
- Event registration, waste reporting, pickup requests
- Live tracking with timeline & map
- Sustainability analytics

### NGO / Recycler (`/ngo`)
- AI recommendations, waste marketplace (filters/search/sort)
- Organization profile, pickup management
- Recovery analytics

### Admin (`/admin`)
- Smart-city overview, event & org verification
- Waste analytics, hotspot GIS map
- Collection fleet analytics, sustainability metrics

## Project Structure

```
src/
  components/   # UI, charts, maps, AI cards, layout
  pages/        # landing, auth, organizer, ngo, admin
  layouts/      # Dashboard, Auth
  context/      # Auth, Theme
  data/         # Mock JSON
  services/     # Mock API
  routes/       # Router & nav config
  hooks/        # useFetch
  utils/        # formatters, validators, cn
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview production build

Frontend only — no backend. Replace mock services in `src/services/api.js` with real API endpoints when ready.
