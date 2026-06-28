# Workflow

**Purpose:** Required steps for any change. The agent must not skip these.

**How to use this file:**
- Run these commands as specified. If one fails, stop and report — do not work around it.
- Order matters where indicated.

## Before coding
- `bun install` (if dependencies changed)

## Before commit (in order)
1. `bun run lint` — ESLint (next/core-web-vitals). Must pass.
2. `bun run build` — production build to catch compile/type errors (no separate `tsc` step exists).
3. No tests — none exist in this repo.
4. No typecheck command — rely on `bun run build` + IDE.

## Git: quoting file paths
File paths with `(` or `)` characters (route groups) MUST be double-quoted:
```bash
git add "app/[locale]/(utils)/(constants)/file.tsx"
git diff "app/[locale]/(utils)/(components)/Buttons.tsx"
```
Unquoted paths cause bash syntax errors on commit/add.

## If dev server shows wrong output after build
```bash
rm -rf .next && bun dev
```
Build cache corruption is common — do not waste time debugging rendering.

## Commit / PR
- Commit format: descriptive subject line, imperative mood.
- Branch: `develop` for active work.
- Merge path: `develop` → `main` → push → switch back to `develop`.
- `setup/merge.sh` automates merge (local use only, no CI).

## Never
- Force-push to shared branches.
- Commit `.next/`, `node_modules/`, `.env`, secrets.
- Skip the build step — it's the only type-check gate.
