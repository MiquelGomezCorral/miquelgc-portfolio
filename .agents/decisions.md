# Decisions

**Purpose:** Record choices that are CLOSED. The agent must not reopen them.

**How to use this file:**
- Each entry is final. Do not propose alternatives unless explicitly asked.
- If a decision genuinely needs revisiting, surface it as a question — do not silently deviate.

## Format
Each decision: date, what was decided, what was rejected, why.

## Entries
### 2026-06-20 — Technologies use category-based grouping, not star ratings
- **Chosen:** Tech categories: `languages`, `tools`, `data`, `ai`, `others`. Each technology belongs to one or more categories.
- **Rejected:** Per-tech star rating system, single-category assignment.
- **Why:** Multi-category enables cross-cutting grouping; `others` absorbs low-priority tech so they don't clutter main categories.
- **Locked.** Do not reinstate star ratings.

### 2026-06-20 — Only "languages" category gets color on tech icons
- **Chosen:** Color coding applied only to `languages` category (keyed by tech name). Other categories render in default/neutral.
- **Rejected:** Per-category colors, all categories colored.
- **Why:** User explicitly requested "Only those under Lenguajes de Programación get the color."
- **Locked.** Do not add colors to other tech categories without owner approval.

### 2026-06-19 — Toast notifications replace alert()
- **Chosen:** Zustand `useToastStore` with `ToastContainer` mounted in root layout. Call `useToastStore.getState().addToast(msg, 'success'|'error'|'info')`.
- **Rejected:** `alert()`, custom modal library, per-component toast state.
- **Why:** Centralized, accessible, non-blocking. User explicitly requested replacement of all `alert()` calls.
- **Locked.** Do not use `alert()` for user feedback.

### 2026-06-19 — Reuse existing Card/Carousel components with params
- **Chosen:** Pass boolean/string parameters to existing `Card` and `Carrousel` components for variant behavior (e.g., `descriptionStyle="below"`). Keep card data in `CardType` interface.
- **Rejected:** Creating separate card/carousel component variants per use case.
- **Why:** User explicitly stated "try not to change the cards or the carrousel code... make it compatible with current usage" and "try to use the same component, just add a parameter."
- **Locked.** Do not fork card/carousel for minor layout differences.

### 2026-06-19 — Card description bullet points use '-' prefix
- **Chosen:** Bullet points in card descriptions rendered from `\n- ` in locale strings. Card component splits on `\n` and renders `- ` lines as `<li>`.
- **Rejected:** HTML markup in locale JSON, separate bullet-list field on CardType.
- **Why:** Keeps locale data plain text, reuses existing card rendering logic.
- **Locked.**

### 2026-06-25 — Projects filtered: main list vs "others" carousel
- **Chosen:** `getGithubProjects` accepts a filter parameter (`"main"` / `"other"`). Main list shows non-other tagged projects. "Other" tagged projects appear in a separate carousel at page bottom.
- **Rejected:** Single unified list, separate API call for others.
- **Why:** Clean separation — main projects get focused display, low-priority projects get scrollable carousel.
- **Locked.**

### 2026-06-25 — Locale is passed explicitly, not inferred
- **Chosen:** All functions that need locale accept it as a parameter. `pick()` helper in `github-projects.ts` handles `I18nField` selection.
- **Rejected:** Inferring locale from `t.language`, `i18n.language`, or URL parsing inside data-fetch functions.
- **Why:** `t.language` unreliable in server context; explicit parameter is deterministic and testable.
- **Locked.**
