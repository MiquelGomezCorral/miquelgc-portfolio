# Known Errors

**Purpose:** Traps already discovered. The agent must not trip them again.

**How to use this file:**
- Before debugging a symptom, scan this file — the answer may already be here.
- When you encounter a new recurring trap, add it.

## Format
Each entry: symptom → cause → fix.

## Entries
### .next cache corruption after restart
- **Cause:** `.next/` build cache stale or corrupt across restarts, especially after abrupt shutdowns.
- **Fix:** `rm -rf .next && bun dev`
- **Do NOT:** Reinstall `node_modules` or clear `bun.lock` — only `.next/` is corrupt.

### React 19: useRef<T>() TypeScript error
- **Cause:** React 19 removed the `MutableRefObject<T>` overload that accepted no arguments. `useRef<T>()` is now a type error.
- **Fix:** `useRef<T>(null!)` for mutable refs assigned imperatively (e.g., in `useEffect`). Use `useRef<T | null>(null)` + narrowing if the value can truly be null at read time.
- **Do NOT:** Use `useRef(null as any)` or `// @ts-ignore` — use the `null!` pattern.

### styled-components v5 `React.Children.only` error (React 19)
- **Cause:** styled-components v5 internally calls `React.Children.only()` which fails with React 19's stricter child handling.
- **Fix:** Wrap children in `<StyleSheetManager shouldForwardProp={...}>` from `@/app/lib/styled-components-registry`. If error persists, wrap the styled component's children in a fragment `<>...</>`.
- **Seen in:** `FormSendEmail.tsx` — fixed in commit `6135fd8`.

### `import yaml from 'js-yaml'` — no default export
- **Cause:** `js-yaml` v5 uses named exports. `import yaml from 'js-yaml'` fails with "does not contain a default export".
- **Fix:** `import { load } from 'js-yaml'` then call `load(yamlString)`.
- **Do NOT:** `import yaml from 'js-yaml'` or `yaml.load()` — fails at build time.

### `t.language` does not return current locale
- **Cause:** `TFunction` from i18next — in server-side `initTranslations()` context, `t.language` may not be reliable.
- **Fix:** Always pass `locale` explicitly as a function parameter; never infer it from `t.language`.
- **Seen in:** `github-projects.ts` — `t.language` returned empty/wrong value for locale.

### Git commit fails: syntax error near `(`
- **Cause:** File paths with `(` e.g., `app/[locale]/(utils)/(constants)/...` confuse bash when not quoted.
- **Fix:** Quote the full path in double quotes: `git add "app/[locale]/(utils)/(constants)/file.tsx"`.
- **Do NOT:** Use unquoted paths with parentheses in `git add` or `git diff`.

### YAML parse errors from `.portfolio.yaml` files
- **Cause:** Some repos in `/home/turbotowerlnx/Documents/Code/all_repos/` have broken `.portfolio.yaml` files (bad indentation, mismatched quotes).
- **Fix:** The `github-projects.ts` function catches parse errors per-repo — a broken YAML only skips that repo, not all of them.
- **Do NOT:** Assume all repos have valid `.portfolio.yaml`; the code already handles `null` returns.

### SVG tech icons break uniform box sizing
- **Cause:** SVG files with different `viewBox` values render at inconsistent sizes when used as `Icon` components, making some technology boxes taller/wider than others.
- **Fix:** Ensure all tech SVG icons use the same `viewBox` (e.g., `"0 0 24 24"` or `"0 0 48 48"`) and `width/height="100%"`. Match the pattern in existing icons.
- **Do NOT:** Create new SVGs from scratch — check `public/assets/icons/tech-white/` first.

### HTML entities in locale JSON (é, &Aacute;, etc.)
- **Cause:** Some locale `.json` files use HTML entities like `&eacute;`, `&Aacute;`, `&ntilde;` instead of proper Unicode.
- **Fix:** Replace with actual Unicode characters: `é`, `Á`, `ñ`, `ü`, `¿`, `¡`. JSON is UTF-8 natively.
- **Seen in:** `locales/es/` files had `&Eacute;xito` etc. — replaced with `Éxito`.

### `bun run build` succeeds but `.next` cache causes broken dev
- **Cause:** Build succeeds but dev server picks up stale `.next/` cache.
- **Fix:** Always `rm -rf .next && bun dev` when dev server shows wrong or broken output after a build.
- **Do NOT:** Clear `node_modules/` or reinstall — cache is in `.next/` only.
