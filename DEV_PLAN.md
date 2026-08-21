# Dev Plan — Superbyte UI for Laravel + Livewire (a "Flux-style" component library)

**Status:** Proposed
**Target:** Reusable Composer package (comparable to `livewire/flux`)
**Stack:** Laravel 12, Livewire 4, Tailwind CSS 4, Alpine.js, Blade anonymous components
**Version:** v0.1.0 (initial package release)

This plan describes how to build a hand-crafted, zero-dependency, composable UI component
library for Laravel + Livewire apps — modeled on the architecture, syntax, and design
philosophy of [Flux UI](https://fluxui.dev) (`livewire/flux`), built by the creators of Livewire.

---

## 1. Goals & Non-Goals

### Goals
- A Composer package (`vendor/superbyte/ui` or `superbyte/ui`) installable via `composer require`.
- Components usable from Blade as `<sb:button>`, `<sb:input>`, `<sb:dropdown>`, etc.
- Native Livewire integration: `wire:model`, `wire:click`, `wire:submit` work out of the box.
- Zero required JS dependencies beyond what Livewire already ships (Alpine.js).
- Dark mode + responsive out of the box; themable via CSS variables.
- Accessible and keyboard-driven components.
- Published components (developer can `php artisan vendor:publish` and override any Blade file).

### Non-Goals (for now)
- No build step required by consumers beyond standard Laravel + Tailwind v4 setup.
- No server-side business logic (no auth, no ORM integration).
- No Pro-tier paid components — those become a separate effort (see §12).

---

## 2. Design Principles (copied from Flux, made our own)

These principles drive every API decision. They are the contract we hold the library to.

1. **Simplicity first** — `<sb:input wire:model="email" label="Email" />` should be the common case.
2. **Composability** — every "smart" component decomposes into primitives (`<sb:field>`,
   `<sb:label>`, `<sb:input>`, `<sb:error>`).
3. **Brevity + consistent naming** — single-word names (`input`, not `text-input`),
   `heading` everywhere (never "title"), `.group` for groupable wrappers, `.item` for children
   that cannot stand alone.
4. **Use the browser** — native `<dialog>`, the Popover API, `<select>`, `<details>` before
   hand-rolled JS.
5. **Use CSS** — `:has()`, `:not()`, `:where()`, modern Tailwind utilities replace JS wherever possible.
6. **We style, you space** — components provide padding/styling; consumers provide margins/layout.
7. **Props vs attributes** — library props (e.g. `variant`) are consumed by the component;
   anything else is forwarded to the underlying element(s).
8. **Livewire-native** — components must feel like native form controls to `wire:*` attributes.

---

## 3. Technical Decisions (with rationale)

| Decision | Choice | Why |
|---|---|---|
| Package format | Composer package + `ServiceProvider` | Installable, publishable, testable in isolation |
| Component implementation | Blade anonymous components (`resources/views/components/*.blade.php`) | Zero PHP per component when possible; publishable |
| CSS framework | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) | Same as Flux v2; tokens live in CSS; easy consumer theming |
| Interactivity | Alpine.js (bundled with Livewire) + native browser APIs | No new JS deps; `x-data`, `x-on`, `x-model` compose with Livewire |
| Icons | Heroicons-style inline SVGs, vendored as Blade components | No icon font, no runtime deps; matches Flux approach |
| Dark mode | `.dark` class on `<html>` driven by `@sbAppearance` directive | Mirrors Flux v2; respects system/light/dark |
| Forms | Native elements wrapped, `wire:model` forwarded to the real input | Keeps Livewire's rich validation/loading behavior |
| Accessibility | Native semantics first + ARIA where needed, axe-audited | Non-negotiable quality bar |
| Testing | Pest + Livewire component tests; Playwright for a11y/browser matrix | Fast unit + real-browser confidence |

### Package layout

```
tailwind/  (or this repo root becomes the package, see §12)
├── composer.json
├── config/superbyte-ui.php
├── src/
│   ├── SuperbyteUiServiceProvider.php
│   ├── View/Components/... (only where PHP logic is unavoidable)
│   ├── Directives/ (blade directives: @sbStyles, @sbScripts, @sbAppearance)
│   └── Support/ (class-merging, wire:model extraction, etc.)
├── resources/
│   ├── views/
│   │   ├── components/      # the library — anonymous Blade components
│   │   ├── icons/           # inline SVG icon set
│   │   └── layouts/         # starter app layouts
│   ├── css/superbyte.css    # design tokens + @theme + component base styles
│   └── js/superbyte.js      # tiny Alpine plugin / helpers (optional, minimal)
├── stubs/                   # publishable overrides
├── tests/                   # Pest suite + component fixtures
└── docs/                    # docs site source
```

---

## 4. Core Architecture

### 4.1 Component registration
Map the `sb` prefix to the package views in the `ServiceProvider`:

```php
Blade::anonymousComponentNamespace('superbyte-ui::components', 'sb');
```

Consumer usage:
```blade
<sb:button variant="primary">Save</sb:button>
```

### 4.2 Attribute handling (the hard 20%)
This is the most technically delicate area — budget real time here.

- **Prop consumption:** `@props([...])` in the Blade template extracts library props.
- **Forwarding:** everything else flows through `{{ $attributes }}` to the underlying element.
- **Split forwarding:** when a component renders a wrapper + inner element (e.g.
  `<sb:input>` renders `<div class="..."><input .../></div>`), split attributes:
  - Styling attributes (`class`) → wrapper.
  - Behavioral attributes (`autofocus`, `wire:model`, `x-model`, `name`, `type`, `disabled`) → inner element.
  - Implement via a small `Support\Attributes` helper that classifies attribute keys by allow/deny list.
- **Class merging:** merge consumer `class` with component classes, last-in-CSS wins;
  consumers can escalate with Tailwind `!` (documented, same as Flux).
- **wire:model passthrough:** `wire:model` must land on the *native* input. Because
  `{{ $attributes }}` renders onto the inner element when using split forwarding, this
  mostly "just works" — but test every form control explicitly (see §8).

### 4.3 Common props every component supports (where meaningful)
- `variant` — alternate visual style (`primary`, `ghost`, `filled`, `solid`, `subtle`, …)
- `size` — `sm`, default, `lg`
- `icon` / `icon:trailing` — shortcut to embed an icon
- `kbd` — keyboard-hint chip
- `inset` — negative-margin helper (`top`, `bottom`, `left`, `right`)
- `tooltip` — shortcut that wraps the component in a tooltip (shorthand composition)
- `:current="false"` style opt-out props via dynamic attribute syntax

### 4.4 Shorthand / long-form (both must work, long-form wins on specificity)
```blade
{{-- shorthand --}}
<sb:input wire:model="email" type="email" label="Email" />

{{-- long form --}}
<sb:field>
    <sb:label>Email</sb:label>
    <sb:input wire:model="email" type="email" />
    <sb:error name="email" />
</sb:field>
```
Implementation: `input.blade.php` detects `$label`/`$name` props and delegates to
`field/label/error` internally.

### 4.5 Grouping conventions
- `.group` suffix when children can also stand alone: `sb:button.group`, `sb:input.group`, `sb:radio.group`.
- `.item` suffix when children cannot stand alone: `sb:accordion` + `sb:accordion.item`,
  `sb:menu` + `sb:menu.item`, `sb:navlist` + `sb:navlist.item`.
- Root-primitive names for compound forms: `sb:field`, `sb:label`, `sb:error`, `sb:table`
  (no overly long dotted hierarchies).

---

## 5. Design System & Theming

### 5.1 Tokens (Tailwind v4 `@theme`)
Define semantic tokens as CSS variables in the package CSS:

```css
@theme {
  --color-primary-*: ...;
  --color-surface-*: ...;
  --color-border-*: ...;
  --radius-*: ...;
  --font-sans: ...;
}
```
Tokens double as Tailwind utilities (`bg-surface-1`, `text-primary-600`) and as raw CSS vars
for consumers who don't use Tailwind utilities.

### 5.2 Appearance (light / dark / system)
- `@sbAppearance` Blade directive emits the HTML + small script that sets `dark` class from
  `localStorage` → system preference, pre-paint (same pattern as this repo's
  `theme-bootstrap.js`: no FOUC, no scroll jump).
- `@sbStyles` / `@sbScripts` directives output the package CSS and any Alpine plugin scripts.
- Components must be checked in **both** themes in the demo suite.

### 5.3 Design language source
The existing **superbyte-ui Bootstrap dashboard** (this repo) is the design-language
reference: spacing rhythm, type scale, color palette. The package will re-implement that
look in Tailwind tokens. Keep the two in sync deliberately — the static preview pages stay
as the visual spec and a living screenshot suite.

---

## 6. Interactivity Patterns

Prefer, in order: **native HTML → CSS → Alpine → Livewire → JS.**

| Pattern | Implementation |
|---|---|
| Dropdown / popover / flyout | Popover API (`popover`, `popovertarget`) with Alpine for content mounting |
| Modal / confirm | Native `<dialog>` with `showModal()`, focus trap built in |
| Accordion | `<details>`/`<summary>` (open/close from CSS), Alpine only if animations needed |
| Tabs | `role="tablist"` + Alpine `x-model` on active tab; CSS for underline/segmented variants |
| Tooltip | Alpine or `data-tooltip` + CSS `:hover/:focus-visible`; `kbd` hint slot |
| Toasts | Alpine store + injected HTML; Livewire events (`Livewire.on`) to trigger server-side |
| Command palette / combobox | Alpine + filtered content; keyboard nav; fallback to native `<select>` in no-JS mode |

Everything that must stay server-side (data loading, saves) is a Livewire event /
`wire:*` binding — the library never owns business logic.

---

## 7. Component Roadmap

Tiers below are **delivery phases**, roughly in dependency order. Each component ships with:
Blade template, props table, accessibility notes, unit tests, and a demo page in the docs site.

### Tier 0 — Foundation (skeleton)
- Composer package scaffold, `ServiceProvider`, prefix registration
- `@sbStyles` / `@sbScripts` / `@sbAppearance` directives
- Design tokens, base CSS, Tailwind v4 wiring
- Icon system (Heroicons-style inline SVGs, ~40 core icons)
- `Support\Attributes` (split forwarding + class merge) — **proven with unit tests first**
- Docs site shell + component catalog page

### Tier 1 — Core primitives (free tier "essentials")
- `button` (+ `.group`), `icon`, `text`, `heading`, `badge`, `separator`
- `card` (+ `card.header`, `card.footer`), `skeleton`, `spinner`
- `tooltip`, `kbd`/keyboard-hint plumbing
- `brand`, `avatar` (initials, image, fallback)
- First Playwright + axe pass

### Tier 2 — Forms (the biggest value + risk)
- `field`, `label`, `description`, `error`
- `input`, `textarea`, `select`, `checkbox` (+ `.group`), `radio` (+ `.group`), `switch`
- Shorthand `label=`/`name=` composition on all of the above
- `wire:model` passthrough verified for every control + Livewire validation errors
- `file-upload` (drag & drop, preview, progress via Livewire `upload`)
- `input.group` (leading/trailing addons, `icon`, `icon:trailing`, slots)

### Tier 3 — Overlays & menus
- `dropdown`, `menu` (+ `.item`, `.submenu`, checkable items), `popover`, `context`
- `modal` (+ `flyout` variant, form-in-modal pattern), `toast`
- Focus management, Escape handling, `role`/`aria` audit

### Tier 4 — Navigation & layout
- `tabs` (+ `tab.panel`, segmented variant), `accordion` (+ `.item`)
- `navlist` (+ `.item`), `navbar` (+ `.item`, `current` state), `breadcrumbs` (+ `.item`)
- `heading`, `text` polish; starter app layouts (sidebar app layout like Flux's)

### Tier 5 — Data display
- `table` (+ `table.header`, `table.row`, sortable header pattern), `pagination`
- `progress`, `timeline`, `callout`, `profile`

### Tier 6 — Advanced ("Pro-flavored", shipped free but marked experimental)
- `command` (palette), `autocomplete`, `date-picker`, `calendar`
- `otp-input`, `pillbox`, `slider`, `time-picker`
- Charts (zero-dependency SVG composables like Flux Charts) — *separate spike, see §12*

### Tier 7 — Hardening & release
- Publish flows (`vendor:publish --tag=superbyte-ui-*`), upgrade guide
- Full docs + copy-paste demos, changelog, semantic versioning (`0.x` → `1.0`)
- Cross-browser matrix, reduced-motion, high-contrast pass
- Performance budget: no JS for static components, no layout thrash, lazy Alpine where possible

### Future features (post-1.0)
- **`color` prop on colored components** — `<sb:button variant="primary" color="red">Red</sb:button>`
  on `button`, `alert`, `badge`, etc. Either a semantic token map (`red`/`green`/`yellow`/`sky`/…) or
  full Tailwind hue support. Today colors are fixed to `variant`; a per-instance hue needs the
  `class="bg-red-500"` escape hatch.

---

## 8. Testing Strategy

### 8.1 Unit / component (Pest, runs in CI)
- Render test for every component + prop combination (snapshot via `view()` assertions).
- Attribute-forwarding matrix: prop vs attribute vs split-forwarding cases.
- Class-merge precedence cases (including `!` override).
- Shorthand→long-form equivalence tests.
- `wire:model` lands on the native element for every form control.

### 8.2 Livewire integration tests
- Form controls with a test Livewire component: submit, validation errors render in
  `<sb:error name="...">`, loading states (`wire:loading`) don't break structure.

### 8.3 Browser tests (Playwright)
- Keyboard navigation: Tab order, Enter/Space on buttons, ArrowKeys on menus/tabs/command.
- `<dialog>`/popover open-close + focus return.
- Dark mode toggle + persistence + no FOUC (assert no visible flash, class applied pre-paint).
- Mobile viewport: nav drawers, responsive tables, tap targets ≥ 44px.
- axe-core scan on every demo page (no critical violations).

### 8.4 Visual regression
- Screenshot suite comparing the Bootstrap superbyte-ui preview pages (design spec) against
  the package demos to keep the design language in sync.

---

## 9. Documentation Site

Included in the package `docs/`, served as a static page (this repo already has the harness
experience for static previews).

- Component pages: props table, usage examples (copy-paste), variant gallery, dark-mode toggle.
- **Interactive playground** per component (editable props → rendered output).
- **Principles + patterns guide** (mirror §2 and §4 above — teach the mental model).
- Theming/customization guide: tokens, publishing overrides, adding variants.
- Upgrade guide + changelog.

---

## 10. Milestones & Effort Estimate

Rough sizing for a 1–2 person effort. (T-shirt sizing; re-estimate after Tier 0.)

| # | Milestone | Deliverable | Est. |
|---|---|---|---|
| M1 | Foundation | Package scaffold, directives, tokens, icons, `Support\Attributes`, docs shell | 1–2 wks |
| M2 | Core primitives | Tier 1 components + tests + demos | 1–2 wks |
| M3 | Forms | Tier 2 components + Livewire integration tests | 2–3 wks |
| M4 | Overlays & menus | Tier 3 components + a11y + browser tests | 2–3 wks |
| M5 | Navigation & layout | Tier 4 components + starter layouts | 1–2 wks |
| M6 | Data display | Tier 5 components | 1–2 wks |
| M7 | Advanced components | Tier 6 (start with command + autocomplete) | 3–4 wks |
| M8 | Hardening + 1.0 | docs complete, CI, publishing, cross-browser | 2 wks |

**Total: ~13–20 weeks part-time intensive; 1.0 release after M8.**

Sequence rationale: forms (M3) are the riskiest (wire:model + validation interplay), so the
attribute-helper is proven in M1 and fully exercised in M3 before overlays are built on top.

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| `wire:model` on wrapper components silently breaks | Extract-and-forward helper with dedicated Livewire tests in M1/M3 |
| Class-merge conflicts frustrate consumers | Document `!` override, publishable variants, `data-*` customization hooks |
| Native `<dialog>`/popover browser gaps | Feature-detect + documented fallback (progressive enhancement, no polyfill bloat) |
| Scope creep on charts/date-pickers | Gate behind explicit spikes; keep them separate experimental components |
| Dark-mode FOUC | Pre-paint appearance script (proven pattern from this repo's `theme-bootstrap.js`) |
| Dependency drift (Livewire/Tailwind majors) | Pin min versions, test matrix in CI, small internal surface area |
| Design drift vs superbyte-ui Bootstrap spec | Visual-regression screenshots against existing preview pages (M1 tooling) |

---

## 12. Out of Scope (future)

- **Pro-tier**: paid-only advanced components (editor, kanban, full chart suite) and a
  licensing/payment path — separate product decision.
- **React/Vue ports**: the existing repo has already split React into its own repository;
  keep this package Livewire-only.
- **Admin panel framework**: building a Filament competitor is explicitly out of scope;
  we ship components, not an app framework.

---

## 13. Decisions (resolved 2026-08-07)

| # | Question | Decision |
|---|---|---|
| 1 | Package vendor/name | **`superbyte/ui`** (namespace `SuperbyteUi\`) |
| 2 | Where does the package live | **`tailwind/` subdirectory of this repo** for now — the static Bootstrap preview stays the design spec and lives alongside it. Spin out to a sibling repo before the first tagged release. |
| 3 | Icon scope | **Curated inline-SVG set first** (Heroicons-style, ~30 icons + aliases) in `src/Icons.php`. Expand on demand. |
| 4 | Charts | **Deferred** — separate spike (Tier 6), zero-dependency SVG composables only if pursued. |
| 5 | Min versions | Laravel 12, PHP 8.3+, Livewire 4+, evergreen browsers. |
| 6 | CSS delivery (new) | **No build step.** `@sbStyles`/`@sbScripts` inline package CSS/JS (config flag `inline_assets`); design tokens as plain CSS custom properties. Tailwind v4 is optional for consumers (mapped via `@theme`). |
| 7 | Dark mode | `.dark` class pre-paint via `@sbAppearance` (same no-FOUC pattern as `theme-bootstrap.js`); `localStorage['sb-theme']` key, configurable. |
| 8 | **Bootstrap edition (resolved 2026-08-07, supersedes §13#6–7 for the new package)** | **New package `package-bootstrap/`** (composer `superbyte/ui-bootstrap`, namespace `SuperbyteUi\`) built on **Bootstrap 5.3.3**, vendored with the package (no CDN, no build step). Bootstrap-native dark mode via `data-bs-theme`. Existing `tailwind/` (Tailwind v4) stays as a parallel package, untouched. |

## 15. Bootstrap Edition Status (package-bootstrap/)

Decision §13#8: the UI library ships as **two parallel packages** — the original Tailwind
edition under `tailwind/` and a new **Bootstrap 5.3 edition** under `package-bootstrap/`.

Implemented under `package-bootstrap/` (composer `superbyte/ui-bootstrap`), full rework of
templates/CSS/dark-mode/tests — all 38 Pest tests green (132 assertions):

- **Vendored Bootstrap 5.3.3** dist (`bootstrap.min.css` + `bootstrap.bundle.min.js`,
  sourceMappingURL comments stripped) shipped with the package; `@sbStyles`/`@sbScripts`
  inline them by default or emit links when `assets.inline` is false + assets published.
- **Theming:** superbyte design tokens as `--bs-*` overrides (indigo primary `#4f46e5`,
  zinc neutrals) for `:root` and `[data-bs-theme="dark"]`; dark mode is Bootstrap-native
  `data-bs-theme` set pre-paint by `@sbAppearance` (key `sb-theme`).
- **Components:** 25 Blade templates rewritten with native Bootstrap classes (`.btn`,
  `.card`, `.form-control`, `.form-select`, `.form-check`, `.form-switch`, `.spinner-border`…),
  custom `sb-`-prefixed CSS only where Bootstrap has no equivalent (`.sb-avatar-*`,
  `.sb-tooltip*`, `.sb-dropzone`, `.sb-spinner-lg`, `.sb-btn-ghost`, `.sb-btn-kbd`,
  `.sb-min-w-0`).
- **`Support\ClassMerge`** simplified for Bootstrap (dedupe exact duplicates, preserve order,
  variant conflicts resolved by CSS source order — no `!` escalation needed).
- **Docs:** static catalog `package-bootstrap/docs/` with 22 component reference pages.
- Tests run with `vendor/bin/pest` in `package-bootstrap/`.

**Next:** overlays (`dropdown`, `menu`, `modal`, `toast`) once tiers align, or consumer
feedback on the Bootstrap edition.

## 14. Scaffold Status (Tier 0 → Tier 2)

Implemented under `tailwind/` — installable skeleton, no build step, working primitives and
forms, full Pest suite green (45 tests, 132 assertions):

- Composer package (`composer.json`), `SuperbyteUiServiceProvider` (`sb` component prefix,
  `superbyte-ui` view namespace, publish tags for views/assets/config).
- **Custom tag compiler** (`SuperbyteTagCompiler`, registered as a Blade precompiler): makes
  `<sb:button>` / `<sb:input>` / `<sb:card.header>` syntax render. Laravel's stock compiler
  only matches `x-` tags, so the compiler extends `ComponentTagCompiler` and re-implements
  the opening/self-closing/closing tag regexes with the `sb` prefix (prefix configurable via
  `config/superbyte-ui.php`). The `x-sb::button` syntax also keeps working.
- Directives: `@sbAppearance` (pre-paint theme), `@sbStyles` (inlined CSS), `@sbScripts`
  (inlined JS with `window.SuperbyteUi` theme helper).
- `Support\Attributes` (split styling/behavioral forwarding) + `Support\ClassMerge`
  (dependency-free "tailwind-merge lite", conflicts resolved, variants + `!` respected).
- Design tokens mirroring the Bootstrap dashboard 1:1 (light + `.dark`), radius/type/status
  scale, focus ring, reduced-motion guards.
- **Tier 1 primitives:** `sb:button` (+ `.group`, 5 variants × 3 sizes, icon, kbd, class
  merge), `sb:icon` (~60 Heroicons-style inline SVGs + aliases), `sb:heading`, `sb:text`,
  `sb:badge`, `sb:separator`, `sb:skeleton`, `sb:spinner`, `sb:card` (+ `.header`, `.footer`),
  `sb:tooltip`, `sb:kbd`, `sb:brand`, `sb:avatar`.
- **Tier 2 forms:** `sb:field`, `sb:label`, `sb:description`, `sb:error`, `sb:input`,
  `sb:textarea`, `sb:select`, `sb:checkbox` (+ `.group`), `sb:radio` (+ `.group`), `sb:switch`,
  `sb:file-upload`. `name` is auto-derived from `wire:model`; `label=`/`name=` shorthand
  composes `field/label/error` internally; validation errors render into `sb:error` from
  the Livewire bag.
- Pest suite: ClassMerge, Attributes split/merge, component rendering, directive output,
  and Livewire integration (wire:model forwarding, validation errors, value persistence) —
  run with `vendor/bin/pest` in `tailwind/`.
- Docs catalog: `tailwind/docs/index.html` static component catalog.

**Next (M3/M4):** overlays (`dropdown`, `menu`, `modal`, `toast`), then navigation & layout.

---

## 16. Fix Log

Running log of defects found in the Tailwind edition / demo-app and how they were fixed.
The Bootstrap edition (`package-bootstrap/`) is intentionally **not** touched by these
fixes — it stays a parallel package (see §15).

### 2026-08-09

- **Button group: flush, equal-height buttons** (`package-tailwind/resources/views/components/button/group.blade.php`)
  — the group was `flex items-center gap-2`, so buttons kept natural (unequal) sizes with an 8px
  gap. Now `inline-flex items-stretch` (all buttons equal height), no gap, seams collapsed
  (`[&>*+*]:-ms-px`), inner corners flattened (`rounded-s-none`/`rounded-e-none`). `variant`/`size`
  are accepted as props so they no longer leak as bogus DOM attributes (the group can't apply them
  to slot children — variants belong on each button).
- **`active` attribute now maps to the `active` class** (`package-tailwind/resources/views/components/button.blade.php`)
  — `<sb:button active>` previously forwarded `active` as a DOM attribute only, so `.btn-ghost.active`
  / `.btn-outline-secondary.active` never matched. The component now also adds the `active` class;
  `aria-pressed="true"` keeps working as before.
- **Missing outline active state** (`package-tailwind/resources/views/css/superbyte-ui.css`)
  — `.btn-outline-secondary.active` / `[aria-pressed="true"]` did not exist (ghost had one). Added
  (accent bg + border) so active items in outline button groups are visible. CSS re-published to the
  demo-app (`vendor:publish --tag=superbyte-ui-css --force`) + rebuilt.
- **Button-group docs example corrected** (`demo-app/resources/views/docs/buttons.blade.php`)
  — the group demo passed `variant` to the group (which never applied it); moved variants onto each
  child button (Flux-style usage).
- **Button slot alignment** (`package-tailwind/resources/views/components/button.blade.php`)
  — `<sb:spinner size="sm" /> Saving…` inside a button sat baseline-aligned (floated high):
  the slot was wrapped in a plain `<span>`, so nested inline-block content wasn't centered by
  the button's `items-center`. Fixed by making the slot wrapper `inline-flex items-center
  gap-2`. Verified headless (spinner / text / button share one vertical center); all 53 Pest
  tests pass.
- **Docs code block rendering** (`demo-app/resources/views/components/docs/demo.blade.php`)
  — Blade component source passed as a named slot (an `Htmlable`) bypassed `e()` and rendered
  as live markup; the first attempt (`e(htmlspecialchars(...))`) double-escaped. Correct fix:
  `{{ (string) $code }}` — casting forces `e()` to actually escape. Verified 0 raw tags, 0
  double-escapes.
- **Colors page `@endverbatim` typos** — three code slots in `docs/colors.blade.php` were
  closed with `@verbatim` instead of `@endverbatim`; corrected so the slots render literally.
- **Colors palette swatches transparent** (`docs/colors.blade.php`) — swatch classes were
  templated (`bg-{{ $hue }}-500`), so Tailwind's scanner never generated them; only shades
  that also appeared literally in the code slots existed. Rewrote the 17-hue grid + blue
  50→950 ramp as literal class markup. Verified every swatch computes its color.
- **Prism highlight theme** (`demo-app/resources/css/app.css`) — token colors now use the
  VSCode default theme (dark `#569cd6`/`#9cdcfe`/`#ce9178`/…, light Light+ overrides under
  `html.light`) instead of app tokens; verified in both appearances.
- **`square` prop for icon-only buttons** (`package-tailwind/resources/views/components/button.blade.php` + `superbyte-ui.css`)
  — icon-only buttons were 31px tall × ~52px wide because `.lucide { width:1em; height:1em }`
  sizes the icon to font-size (13px) while the button kept 15px horizontal padding. The new
  `square` bool adds `btn-square` (36px md / 28px sm / 44px lg, `padding:0`) so the button is a
  clean square and its height matches sibling text buttons. Docs demo + props table updated.
  Verified headless: Delete/Notifications buttons are exactly 36×36px, aligned with the 36.2px
  text buttons in the row. 56 Pest tests pass.
- **Icon centering in square buttons** (`package-tailwind/resources/views/components/button.blade.php`)
  — after `square`, the icon was still ~4px off-center:
  1. The slot wrapper `<span class="inline-flex items-center gap-2">` always rendered, so for an
     icon-only button it became a **0-width flex item** and the button's `gap-2` (8px) inserted
     itself between icon and phantom span. The wrapper now only renders when `! $slot->isEmpty()`
     and is `class="contents"` (`display: contents`), so it never contributes a box or gap — slot
     children become direct flex items spaced by the button's own `gap-2`.
  2. A floating badge in the default slot (e.g. `<span class="ping">3</span>`) used to sit inside
     the wrapper → same phantom gap. With `display: contents` an absolute badge drops out of the
     flex line and the icon stays dead-center. A dedicated **`badge` slot** (rendered as a direct,
     unwrapped child) is also available for floating content.
  Verified headless with the docs' exact snippet: Notifications 36×36, icon offset (0,0); spinner
  + text buttons still vertically centered (both yoff 0). 59 Pest tests pass.
- **Group icon-only members use `square`** (`demo-app/resources/views/docs/buttons.blade.php`)
  — in the active-state button-group demo the Previous/Next icon buttons were 45×36.2 rectangles
  (icon centered, but wide). Added `square` to both (live demo + code sample): 36×36 with the icon
  dead-center, seams/height still flush. Docs-only, no package change.
- **Active group member's border overlapped by neighbours** (`package-tailwind/resources/views/components/button/group.blade.php`)
  — with `-ms-px` seams collapsed, the later DOM button painted over the previous one, so the
  active member's border vanished behind its neighbours. Group now sets `[&>*]:relative` and
  `z-index:1` on hover / focus-visible / :active / `.active` members (Bootstrap's approach), so the
  active/hovered button paints its full border above the seams. Verified headless via
  `elementFromPoint`: both seams of the active button resolve to the active button itself. 60 Pest
  tests pass.
- **Primary/accent switched from blue to charcoal** (`package-tailwind/resources/css/tokens.css` +
  `tokens-static.css` + `superbyte-ui.css`, demo-app docs) — the accent is now a neutral dark
  `#18181b` in both appearances (dark hover `#26262b`, light hover `#27272a`; `--accent-rgb: 24,24,27`;
  ring white-based in dark / charcoal in light). Accent-**tinted** surfaces became high-contrast
  chips: in **dark** mode `--accent-bg` is solid warm ivory `#F2F0EA` with charcoal `#18181b` text
  (soft buttons, badges, active states, alerts, modal icons, dropzone hover); in **light** mode it
  stays a translucent charcoal tint `rgba(24,24,27,.08)`. The on-tint text token **`--accent-soft`**
  is charcoal in both modes. A new **`--accent-ink`** token covers accent-colored text/icons that sit
  on *plain* surfaces (link buttons, card-title icons, spinner ring) — light gray `#d4d4d8` in dark,
  charcoal in light — so they stay readable on the dark canvas. `text-accent-hi` (the
  `--color-accent-hi` inline alias) maps to `--accent-ink` for standalone use; text on a tint uses
  `text-accent`. The tinted-surface rules in `superbyte-ui.css` were switched from `var(--accent-h)`
  to `var(--accent-soft)` / `var(--accent-ink)` (`--accent-h` is now only the `.btn-primary:hover`
  shade). CSS re-published + rebuilt; verified headless in both themes (`btn-primary` bg =
  `rgb(24,24,27)`, dark soft/badge = ivory `rgb(242,240,234)` + charcoal text, link/ink =
  `#d4d4d8` dark / `#18181b` light).
- **Anchor buttons (`a.btn`) lost their color** (`package-tailwind/resources/css/tokens.css` +
  `tokens-static.css`) — both token files declared an unlayered `a { text-decoration:none;
  color:inherit }`. In the demo-app the static copy is inlined via `@sbStyles` after the built CSS,
  and unlayered rules beat the layered `.btn-*` component rules, so any `.btn` on an `<a>` (e.g.
  the docs header "Docs"/"Demo" links, or `a.btn-primary` CTAs) computed `inherit` instead of the
  button's own color — `a.btn-primary` would have been near-invisible text on the charcoal fill.
  Scoped both resets to `a:not(.btn)`. Verified headless: `a.btn-soft` now resolves `#d4d4d8` dark /
  `#18181b` light instead of `--text`.
- **Dark theme primary/accent inversion** (`package-tailwind/resources/css/tokens.css` +
  `tokens-static.css` + `superbyte-ui.css`, demo-app docs) — in **dark** mode the accent is now a
  warm ivory `#F2F0EA` (hover `#E5E2DA`) with charcoal `#18181b` text, so `.btn-primary` becomes an
  ivory chip with dark text instead of a dark-gray chip that vanished against the dark canvas.
  Ripple fixes that fell out of the flip:
  1. **`.light` block was missing `--accent-text`** — it had previously inherited `#ffffff` from
     `:root`; once `:root` (dark) carried `#18181b`, light-mode primary buttons became
     charcoal-on-charcoal. Added `--accent-text: #ffffff` to the `.light` block in both token files
     (probe caught it: light `.btn-primary` was `rgb(24,24,27)` on `rgb(24,24,27)`).
  2. **`.btn-soft:hover` legibility** — in dark, hover used `rgba(var(--accent-rgb), .18)` (now
     charcoal on the ivory chip). Dark hover is now `rgba(var(--accent-rgb), .85)` + `var(--accent-bg)`
     text, with a `.light` override back to `.18` / `--accent-soft`.
  3. **On-tint borders** (`.btn-ghost.active`, `.btn-outline-secondary.active`/[aria-pressed],
     dropzone hover) were `var(--accent)` → ivory-on-ivory in dark; now `rgba(var(--accent-rgb), .35)`.
  4. **`::selection`** in both token files now `background:var(--accent); color:var(--accent-text)`.
  5. **Checkbox checkmark / switch knob** were hardcoded `#fff`; now `var(--accent-text)`
     (charcoal knob on the ivory fill in dark, white on charcoal in light).
  New **`--color-accent-soft: var(--accent-soft)`** `@theme inline` alias; demo-app on-tint usages
  switched to `text-accent-soft` (`docs.blade.php`, `docs/colors.blade.php`). CSS re-published +
  rebuilt; verified headless in both themes (`cdp_primary.js`, port 9251): dark `.btn-primary`
  `rgb(242,240,234)`/`rgb(24,24,27)`, hover `rgb(229,226,218)`; `.btn-soft:hover` dark
  `rgba(24,24,27,.85)` + ivory text; light `.btn-primary` charcoal/`#fff`; ghost/outline active
   borders `rgba(24,24,27,.35)`; colors page solid/tint swatches correct in both.
- **Demo-app SPA navigation switched to the Livewire v4 canonical pattern** (`demo-app/resources/views/welcome.blade.php`,
  `demo-app/resources/views/layouts/docs.blade.php`, `package-tailwind/src/Directives/SbScripts.php`,
  `SbAppearance.php`) — the demo was enabling `wire:navigate` on `<body>` (v3-style cascade). Livewire
  v4 (installed v4.3.5) ships per-link `wire:navigate`; its own test views never use the body-level
  form. Adopted the v4 conventions:
  1. `wire:navigate` moved from `<body>` onto each nav link (header Demo/Docs, brand logo, docs
     sidebar items) — body-level was dropped.
  2. Inline scripts that must run only once are now marked `data-navigate-once`: the package's
     `@sbScripts` runtime + both `@sbAppearance` head scripts (v4 re-clones any body script without
     `data-navigate-once` on every SPA swap — the runtime's `livewire:navigated` listener already
     handles re-binding, so re-executing the whole runtime per swap was wasteful), plus the docs
     layout's copy-handler script (its listener is document-level; the TOC builder is intentionally
     left to re-run so the On-this-page list rebuilds per page).
  Verified headless (real mouse clicks via CDP): welcome → `/docs`, `/docs` → `/docs/buttons`, and
  brand → `/` all SPA (navigation entry count stays 1), theme toggle + persistence OK, TOC builds
  (5 entries), 0 console errors; `verify.cjs` ALL CHECKS PASSED.

### Earlier (previous session)

- **Font size default raised 14px → 15px** — package change (both `tokens.css` and
  `tokens-static.css` must stay in sync), re-published into the demo-app
  (`vendor:publish --tag=superbyte-ui-css --force`) and Vite rebuild. Not a defect, recorded
  for reference.

### Docs infrastructure (not fixes)

- **Section title/description moved out of the demo card** (`demo-app/resources/views/components/docs/demo.blade.php`)
  — the heading + description used to live in a `border-b` header bar inside the card; now they
  render as a standalone header block (`mb-3`) above the card, and the card only wraps the live
  demo + code block. The section wrapper still carries `id`/`data-doc-section`/`scroll-mt-24`, so
  the On-this-page TOC keeps working. Applies to every docs page (all use `<x-docs.demo>`).

- **Livewire demo wiring** (`demo-app`) — Livewire v4 requires Alpine separately (no longer
  bundled); installed `alpinejs` via npm and started it in `resources/js/app.js` (Vite bundle,
  no CDN). Layout gained `@livewireStyles` + `@livewireScripts` (Alpine loads before
  Livewire's core). Added `App\Livewire\Docs\ButtonsDemo` to demonstrate `wire:click`,
  `wire:loading`, `wire:target`, `wire:loading.attr`, `wire:confirm` on buttons.

---

## References
- Flux docs — principles: https://fluxui.dev/docs/principles
- Flux docs — patterns: https://fluxui.dev/docs/patterns
- livewire/flux GitHub: https://github.com/livewire/flux
- MDN Popover API, `<dialog>` element
- Tailwind CSS v4 (`@theme`, CSS-first config)
