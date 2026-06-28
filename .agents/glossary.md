# Glossary

**Purpose:** Domain terms specific to this project. Prevents the agent from guessing what your words mean.

**How to use this file:**
- When a term here appears in a task, use this definition — not the generic industry meaning.
- If a term is ambiguous in conversation, ask which one is meant.

## Terms
- **miquel-{color}** — Custom Tailwind color tokens in `tailwind.config.ts` using `oklch()`. Available: `background`, `black` (50–700), `white` (100–500), `blue` (100–900), `purple` (100–900), `green` (700–900), `amber` (700–900).
- **pageStack** — Zustand store in `(global_state)/state.tsx` tracking navigation history (array of page paths) for back-navigation. Not browser history API.
- **Configuration class** — Singleton in `(constants)/configuration.tsx` holding tunable params: project listing/search scoring, art params, SMTP config.
- **namespace (i18n)** — A JSON file under `locales/{locale}/` with grouped translations. 9 registered: header, footer, info-section, experiences, studies, projects, technologies, general, certifications. `languages` is orphaned.
- **`.portfolio.yaml`** — YAML file in each GitHub repo root defining project metadata (title, description, technologies, tags, date). Processed by `github-projects.ts`.
- **`pick(field, locale)`** — Helper in `github-projects.ts` for selecting locale-specific value from `I18nField` (`string | { en, es }`).
- **`TechnologyString`** — Branded string union type in `technologies.d.tsx`. Only valid tech names (e.g., `"react"`, `"pytorch"`) compile.
- **`ProjectType`** — Interface in `project.text.d.tsx` for project card data (title, finished, descriptions, technologies, logo, link, etc.).
- **`GH_TOKEN`** — Environment variable: GitHub fine-grained PAT with public repo read access. Required for `github-projects.ts` to fetch repos.
- **`others-carousel`** — Carousel component at bottom of projects page displaying low-priority "other" tagged projects separately from main list.
- **`CardType`** — Interface used by `Card` component for any card display (experiences, studies, certifications, projects).
