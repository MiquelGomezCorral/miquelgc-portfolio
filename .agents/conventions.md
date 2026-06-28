# Conventions

**Purpose:** Make the agent's output indistinguishable from code a regular contributor would write.

**How to use this file:**
- These are rules, not suggestions. Match them exactly.
- When code in the repo contradicts a rule here, follow the rule and flag the inconsistency — do not propagate the drift.

## Naming
- Components: PascalCase (`Header.tsx`, `InfoSection.tsx`)
- Hooks / functions: camelCase (`usePageStackStore`, `initTranslations`)
- Files: PascalCase for components, kebab-case for config (`postcss.config.mjs`, `i18nConfig.js`)
- Route groups: kebab-case in parentheses (`(utils)`, `(global_state)`, `(sections)`)
- Color tokens: `miquel-{color}-{weight}` with optional `-a` alpha suffix (e.g. `miquel-blue-400-a`)

## Style
- Mix Tailwind utility classes and styled-components v5 freely in the same component
- Use custom `oklch()` color tokens from `tailwind.config.ts` — prefer over arbitrary hex/rgb colors
- Use `.miquel-opacity`, `.miquel-transition`, `.bg-miquel-gradient` from `styles/globals.css` for common hover/gradient patterns
- Framer Motion for page transitions and reveal-on-scroll effects
- Toast notifications via Zustand `useToastStore` — not inline state

## Imports / structure
- Absolute imports via `@/*` alias (no relative `../../`)
- `js-yaml`: use `import { load } from 'js-yaml'` — named import, not default
- React 19: `useRef<T>(null!)` for mutable refs assigned later (in `useEffect`)
- Server components: `initTranslations(locale, namespaces)` from `@/app/i18n`
- Client components: `useTranslation(namespace)` from `react-i18next` via `TranslationsProvider`
- Always pass `locale` explicitly to functions — never infer from `t.language`

## Component patterns
- Reuse existing components with boolean/string parameters; do NOT create new component variants for minor layout changes
- Cards use a flexible `CardType` interface — add fields to the type, not new card components
- Line breaks in card descriptions: use `\n` in locale strings; `- ` prefix renders as bullet point in the card component
- SVG tech icons must share consistent `viewBox` (currently `"0 0 48 48"`) for uniform sizing
- `not-found.tsx` inside a route group handles 404 — use Next.js `notFound()` to trigger it

## Locale / i18n
- Locale files are `.json` — use proper UTF-8 characters, not HTML entities (é not `&eacute;`)
- When adding a new field to cards (experience, study, certification), add the string to both `locales/en/` and `locales/es/` JSONs
- Place/company fields varying by locale must be in i18n JSON, not hardcoded in `.d.tsx` files

## Git commands with special characters
- File paths with `(` or `)` need double-quoting: `git add "app/[locale]/(utils)/..."`
