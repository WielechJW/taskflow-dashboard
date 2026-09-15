# TaskFlow Dashboard

A responsive SaaS-style task management interface built with Next.js, React, and TypeScript. The project demonstrates reusable UI architecture, typed domain models, derived analytics, and interactive client-side workflows across desktop and mobile layouts.

> Portfolio project: data and authentication flows are intentionally simulated in the browser. There is no production backend or persistent database yet.

## Highlights

- Create, edit, delete, filter, and update the status of tasks
- Dashboard metrics calculated from typed task data
- Calendar view for deadlines and upcoming work
- Team workspace with a local chat interaction and presence cards
- Responsive application shell with desktop sidebar and mobile drawer
- Shared authentication layouts for login and registration screens
- Monochrome retro styling with shared typography, borders, and controls
- Static pages generated with the Next.js App Router

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Dashboard overview and task metrics |
| `/tasks` | Interactive task workspace |
| `/calendar` | Deadline and planning view |
| `/analytics` | Sprint KPI and status distribution view |
| `/teams` | Team members and local chat experience |
| `/login`, `/register` | Authentication UI examples |

## Architecture

```text
src/
  app/          # App Router pages and root layout
  components/   # Feature and shared UI components
  constants/    # Navigation and task metadata
  hooks/        # Client-side task state management
  services/     # Typed mock-data access layer
  types/        # Shared TypeScript domain types
  utils/        # Filtering, formatting, calendar, and metrics logic
```

The feature-based component structure keeps presentation separate from task state and data helpers. `useTaskManager` owns local task operations, while utilities handle filtering and derived metrics without coupling them to the UI.

## Design system

The interface uses a white-first, monochrome retro style: black outlines, small corner radii, hard offset shadows, and subtle dotted or hatched patterns. Shared styles live in [`src/app/globals.css`](src/app/globals.css).

- **Colors:** `ink` (`#1c1c1c`) for text and outlines, `muted` (`#626262`) for secondary text, `surface` (`#f5f5f3`) for backgrounds, and `line` (`#d6d6d2`) for subtle dividers.
- **Typography:** native font stacks use Arial/Helvetica for body text, Georgia for headings, and Courier New for labels and metadata. No external fonts are downloaded.
- **Shared classes:** `retro-panel`, `retro-button` (with optional `retro-button-secondary`), `retro-input`, `retro-badge`, `retro-eyebrow`, and `retro-title` keep controls and typography consistent. `retro-progress`, `retro-pattern`, and `retro-window-rule` provide decorative patterns.
- **Responsive behavior:** grids collapse on smaller screens, navigation becomes a mobile drawer, and authentication panels stack vertically. Primary buttons and shared inputs have a 44px minimum height; keyboard focus is visible and reduced-motion preferences are respected.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/WielechJW/taskflow-dashboard.git
cd taskflow-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production check:

```bash
npm run build
```

## Current scope

TaskFlow is a frontend demonstration. State resets after a page refresh, the authentication screens do not create real sessions, and the service layer currently returns mock data. These boundaries are explicit so the repository accurately represents what is implemented today.

