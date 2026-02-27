# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Employee Directory — a React 19 + TypeScript SPA built with Vite, using Redux Toolkit for state management and Tailwind CSS 4 for styling.

## Commands

```bash
npm run dev        # Vite dev server (http://localhost:5173)
npm run mock       # json-server mock API on port 3001 (serves db.json)
npm run build      # TypeScript type-check + Vite production build
npm run lint       # ESLint (flat config, v9+)
npm run preview    # Preview production build locally
```

Development requires two terminals: `npm run dev` and `npm run mock`.

## Architecture

- **src/store/store.ts** — Redux store configured with `configureStore()`. Exports `RootState` and `AppDispatch` types. Feature slices go in the reducer map.
- **src/features/** — Feature-based modules (employees, departments). Each feature should contain its own components, Redux slice, and API logic.
- **src/shared/components/** — Reusable UI components shared across features.
- **src/main.tsx** — Entry point; wraps App with `React.StrictMode` and Redux `Provider`.
- **db.json** — Mock data for json-server with `employees` and `departments` collections.

## Key Libraries & Patterns

- **Forms:** React Hook Form + Zod validation via `@hookform/resolvers`
- **Tables:** TanStack React Table (headless, v8)
- **State:** Redux Toolkit with `createSlice` / `createAsyncThunk`
- **Styling:** Tailwind CSS utility classes (imported via `@import "tailwindcss"` in index.css)
- **No routing library installed yet** — React Router would need to be added for multi-page navigation.

## TypeScript Configuration

Strict mode is enabled with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`. Target is ES2022 with bundler module resolution. JSX uses the new `react-jsx` transform (no React import needed in JSX files).

## Mock API

json-server exposes REST endpoints at `http://localhost:3001`:

- `/employees` — CRUD operations on employee records (fields: id, firstName, lastName, email, position, department, startDate, status)
- `/departments` — department list (id, name)

## apsys Architecture Rules

- All features go inside `src/features/<feature-name>/`
- Each feature must have the following structure:
  - `data/` — RTK Query API slice
  - `domain/` — TypeScript interfaces and types
  - `presentation/` — React components and pages
- Never mix feature concerns — keep each feature self-contained
- Use RTK Query for ALL server state (no useEffect + fetch)
- Use React Hook Form + Zod for ALL forms
- Shared components go in `src/shared/components/`

## Mock API

- JSON Server running on `http://localhost:3001`
- Endpoints: `/employees`, `/departments`
- Use this base URL in all RTK Query API slices during development

## Code Style

- Use comments sparingly. Only comment complex, non-obvious code.
- When creating RTK Query endpoints, always add proper TypeScript types for the response.
- Always use context7 to check up-to-date docs when implementing or modifying code that uses RTK Query, React Hook Form, Zod, TanStack Table, or any third-party library.
