# AGENTS.md — miquelgc-portfolio

## Quick start

```bash
bun install       # Bun is the package manager (bun.lock)
bun dev           # → http://localhost:3000
bun run build     # production build
bun run lint      # ESLint (next/core-web-vitals)
```

Also `bun run start` to serve production build.

**No tests, no CI, no pre-commit hooks** in this repo.

## React 19 gotcha: `useRef<T>()` requires an initial value

In React 19, `useRef<Worker>()` (no argument) is a type error. Use `useRef<Worker>(null!)` for mutable refs assigned later (e.g. in `useEffect`).

## Known quirk: corrupted `.next`

`.next` cache sometimes corrupts after restart, causing build failures.

```bash
rm -rf .next && bun dev   # full wipe + restart (Linux)
```

## Architecture

- **Next.js 15 App Router** with `[locale]` dynamic segment for i18n.
- **English (`en`)** is default locale — URLs omit `/en/` prefix (`prefixDefault: false`). Spanish (`es`) uses `/es/` prefix.
- **Locales** in `locales/{en,es}/*.json` as i18next namespace JSON files.
- **Route groups**: `(utils)` for shared components/constants/functions, `(global_state)` for Zustand store, `(sections)` for page section components.
- **Projects page**: `app/[locale]/projects/page.tsx` lists projects; `[slug]/page.tsx` renders individual project pages; several named subdirs (`string_art/`, `boids_simulator/`, etc.) have their own `page.tsx` entries as interactive canvases/visualizations.
- **Path alias** `@/*` → project root (tsconfig.json).

### Key files

| File | Role |
|---|---|
| `middleware.js` | i18n routing via `next-i18n-router` |
| `i18nConfig.js` | locale list + default |
| `app/i18n.js` | i18next init helper (server-side) |
| `next.config.ts` | image remotePatterns (raw.githubusercontent.com) |
| `app/[locale]/(utils)/TranslationsProvider.js` | client-side provider wrapper |
| `app/[locale]/(global_state)/state.tsx` | Zustand store for page-stack navigation |
| `app/[locale]/(utils)/(constants)/configuration.tsx` | Global config (version, art params, search scoring) |
| `app/[locale]/(utils)/(constants)/nameSpaces.d.tsx` | i18n namespace arrays |

## UI stack

- **Tailwind CSS 3** with custom `oklch()` color tokens (`miquel-background`, `miquel-black-*`, `miquel-white-*`, `miquel-blue-*`, `miquel-purple-*`, `miquel-green-*`, `miquel-amber-*`).
- **styled-components** v5 also used — components may mix Tailwind + styled-components.
- Custom CSS in `styles/globals.css`: `.miquel-opacity`, `.miquel-transition`, `.bg-miquel-gradient`, loader animations (`.loader-blob`, `.loader-circle`), `.animate-float`.
- **Framer Motion** for animations, **canvas-confetti** for confetti, **EmailJS** for contact form.
- **Toast notifications** via `useToastStore` (Zustand) — use `useToastStore.getState().addToast(msg, 'success'|'error'|'info')`. `<ToastContainer />` mounted in root layout.

## Git workflow

- `main` = production, `develop` = active development.
- Merge: `develop` → `main` → push → switch back to `develop`.
- `setup/merge.sh` automates this (local use only, no CI).

## Adding a new locale string

1. Add the key to the relevant namespace JSONs in both `locales/en/` and `locales/es/`.
2. If the namespace is new, add it to the arrays in `nameSpaces.d.tsx`.
3. Components use `useTranslation(namespace)` from `react-i18next` client-side, or `t` from `initTranslations()` server-side.

**Note:** `locales/{en,es}/languages.json` exists but is NOT listed in `nameSpaces.d.tsx` — it's an orphaned namespace file. Do not add keys to it; remove it or register it if needed.
