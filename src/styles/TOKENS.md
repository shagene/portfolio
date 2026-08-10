# Portfolio design tokens

The site uses three explicit token layers. Components must consume component tokens or semantic tokens, never primitive values directly.

## 1. Primitive tokens

`--primitive-*` values are the raw palette, type scale, spacing scale, radii, motion, and layout measurements. The mineral, steel, and copper families intentionally share the live Semper Digital Solutions vocabulary so the two sites read as siblings.

## 2. Semantic tokens

`--color-*`, `--font-*`, `--space-*`, and `--layout-*` describe purpose rather than appearance: page surface, raised surface, primary ink, accent, section spacing, and reading width. The portfolio is dark-only, but components remain insulated from palette choices.

## 3. Component tokens

`--card-*`, `--button-*`, `--chip-*`, `--rule-*`, and `--focus-*` are the public contract for UI components. Component styles may combine these with semantic layout and typography tokens.

Tailwind v4 is loaded through the Vite integration. The `@theme inline` block in `global.css` exposes the semantic layer to Tailwind utilities without creating a second source of truth.

## Rules

- Add a primitive only when the underlying scale needs a new value.
- Prefer changing semantic assignments when re-theming.
- Never place one-off hex values in a component.
- Keep visible focus at least as strong as `--focus-ring`.
- Validate text/background combinations against WCAG 2.1 AA before promoting a token.
