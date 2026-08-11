# Portfolio presentation rubric

Every QA pass records its viewport, evidence, critique, and change in `qa/CHANGELOG.md`.

## Hard gates

- Production build succeeds with no type errors.
- Lighthouse scores are 95 or higher for Performance, Accessibility, Best Practices, and SEO.
- axe-core reports zero violations at 390, 768, and 1280 pixel widths.
- No horizontal overflow at 390, 768, or 1280 pixels.
- All page content is available without client-side JavaScript.
- Keyboard order follows the visual order; skip link and focus states are visible.
- Reduced-motion mode removes nonessential smooth movement.
- GitHub API failure leaves a complete, intentional section with no empty shell.
- Resume absence produces a build warning and an honest UI label.

## Five-second recruiter test

- Steven's name, exact target headline, location, and seniority are visible immediately.
- The first screen feels like a senior product engineer, not a generic template or freelance landing page.
- The portfolio leads with TEO, Musterhall, and CrimCaseAI, never the retired hobby projects.
- The page makes full-stack, UX/design systems, AI, and delivery breadth legible without a wall of logos.

## Sister-site test

- Near-black and graphite surfaces, mineral text, copper labels, and generous spacing visibly relate to the current Semper system.
- Archivo/Manrope typography and numbered editorial labels create family resemblance.
- The portfolio has its own warmer, personal composition around the portrait.
- No USMC navy/scarlet/gold throwback, animated background, or ornamental parallax remains.

## Claim integrity

- Every project statement traces to `BRIEF.md`.
- Public GitHub descriptions trace to inspected repository source or README content.
- Private-work limitations are explicit.
- Experience dates match the brief and concurrent roles are unambiguous.
- The site never claims that placeholder PDFs exist.
- The professional portrait is source-controlled, responsive, and framed without an artificial crop that compromises the composition.

## Responsive composition

- 390: headline, portrait, links, case-study labels, timelines, and email wrap without clipping.
- 768: grids use the additional width without leaving awkward single-word columns.
- 1280: line lengths stay controlled and the visual rhythm has intentional negative space.
- Section anchors land below the header and no navigation target is obscured.

## Finish quality

- Borders, radii, type rhythm, and spacing consume documented tokens.
- Hover and focus feedback are coherent and do not move layout.
- Social image is 1200 by 630 and matches the page identity.
- Canonical, Open Graph, Twitter, sitemap, robots, and Person JSON-LD are present in built output.
- Cloudflare Pages configuration and DNS runbook agree with current official documentation.
