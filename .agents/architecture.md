# Architecture

**Purpose:** Tell the agent what exists and roughly where, so it stops inventing structure.

**How to use this file:**
- Treat as a map, not a contract. File paths drift — verify before editing.
- Describe capabilities and module responsibilities, not exhaustive file trees.
- If a section feels stale, flag it; do not silently work around it.

## Stack
- TypeScript 5 (strict mode), JavaScript for middleware/config
- Next.js 15 App Router (React 19)
- Tailwind CSS 3 + styled-components 5
- i18next + next-i18n-router for i18n
- Zustand 5 for client-side state
- Framer Motion for animations
- EmailJS for contact form
- canvas-confetti for confetti effects
- No database, no backend server (static portfolio with client-side EmailJS)

## Top-level layout
- `app/[locale]/` — App Router pages with i18n locale segment
  - `(utils)/` — shared components, constants, functions, i18n TranslationsProvider
    - `(constants)/` — `github-projects.ts` (fetches repos), `technologies.d.tsx` (tech defs), `configuration.tsx` (global config), `nameSpaces.d.tsx` (i18n namespaces), `CardType` interface files
    - `(components)/` — `Toast.tsx` (Zustand toast), `FormSendEmail.tsx`, `Buttons.tsx`, `Carrousel.tsx`, `Card.tsx`, `Icons.tsx`
  - `(global_state)/` — Zustand store for page-stack navigation
  - `(sections)/` — page section components (Header, InfoSection, Projects, etc.)
  - `projects/` — project listing page + `[slug]/` dynamic route + `not-found.tsx` + `others-carousel.tsx` + `ProjectsSearch.tsx` + named interactive project subdirs
  - `page.tsx` — landing page
  - `layout.tsx` — root layout (metadata, ToastContainer, StyledComponentsRegistry)
- `locales/{en,es}/` — i18next namespace JSON files
- `styles/globals.css` — custom CSS, Tailwind directives, loader animations
- `setup/` — `merge.sh` for git workflow, `.portfolio.yaml` template
- `public/assets/icons/tech-white/` — SVG icons for technology badges
- `.agents/skills/` — opencode skills (auto-discovered)

## Boundaries
- `locales/{en,es}/languages.json` — orphaned, not registered in `nameSpaces.d.tsx`
- `setup/merge.sh` — local git automation, no CI usage
- `node_modules/`, `.next/` — generated artifacts, never commit
