# Portfolio design tokens

The site uses three explicit token layers. Components must consume component tokens or semantic tokens, never primitive values directly.

## 1. Primitive tokens

`--primitive-*` values are the raw palette, type scale, spacing scale, radii, motion, and layout measurements. The mineral, steel, and copper families intentionally share the live Semper Digital Solutions vocabulary so the two sites read as siblings.

## 2. Semantic tokens

`--color-*`, `--font-*`, `--space-*`, and `--layout-*` describe purpose rather than appearance: page surface, raised surface, primary ink, accent, section spacing, and reading width. The portfolio is dark-only, but components remain insulated from palette choices.

## 3. Component tokens

`--card-*`, `--button-*`, `--chip-*`, `--rule-*`, `--focus-*`, and `--logo-*` are the public contract for UI components. Component styles may combine these with semantic layout and typography tokens.

The navigation logo lockup uses a `2rem` mark and `--logo-lockup-gap`, currently `0.75rem`. The gap is three-eighths of the mark width, keeping the wordmark optically separate without turning it into a second navigation item. The dark-context mark consumes `--logo-mark-dark`; the inverted light-context variant consumes `--logo-mark-light` because copper does not meet the 3:1 non-text threshold on the mineral surface. `public/logo-mark.svg` is the dark-ground standalone asset, while `public/logo-mark-inverted.svg` is the explicit light-ground asset.

Tailwind v4 is loaded through the Vite integration. The `@theme inline` block in `global.css` exposes the semantic layer to Tailwind utilities without creating a second source of truth.

## Rules

- Add a primitive only when the underlying scale needs a new value.
- Prefer changing semantic assignments when re-theming.
- Never place one-off hex values in a component.
- Keep visible focus at least as strong as `--focus-ring`.
- Validate text/background combinations against WCAG 2.1 AA before promoting a token.
