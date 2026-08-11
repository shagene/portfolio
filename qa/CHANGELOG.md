# QA changelog

## Pass 0: first full build

Status: complete, awaiting first-build review

Scope:

- Complete Astro migration and all five numbered sections.
- Responsive image generation and generated social card.
- Typed content and build-time GitHub stats.
- Baseline screenshots at 390, 768, and 1280 pixels before the review checkpoint.

Evidence:

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: complete static output, sitemap generated, responsive image variants generated, and the expected missing-resume warning emitted.
- `npm audit`: 0 vulnerabilities after moving Sharp to 0.35.3 and overriding the vulnerable Picomatch 2.x range to 2.3.2.
- Playwright captures: `qa/screenshots/first-build-{390,768,1280}.png` and review-sized hero captures at the same widths.
- Browser measurements: no horizontal overflow at any target width; all six sections present; no console errors; no page errors; first keyboard focus is the skip link.
- Manual visual correction: reduced desktop hero density so the full headline, portrait, differentiator, intro, and immediate links fit together in the 1280-pixel first viewport.

Known first-build dependencies:

- Both resume PDFs are still absent and labeled `PDF pending`.
- The supplied event photo remains a dated placeholder and needs a current portrait before launch.
- Lighthouse and axe hard gates have not been run yet. They belong to the five-pass presentation loop after this review checkpoint.

The five-pass presentation and hard-gate loop begins after first-build review.

## Pass 1: review corrections

Status: complete

Changes:

- Tightened the supplied event photo to a shoulders-up crop and added restrained tonal treatment so the background recedes.
- Prevented the direct email address from wrapping inside its domain at every target width.
- Renamed the two interview-style public repository slugs to `quote-extractor` and `hours-interval-engine`, then updated the curated cards to their canonical URLs.
- Added both August 2026 persona PDFs and removed the pending-state labels.
- Gave the compressed Beroe, Judge Consulting, and NAVAIR entries concise resume-backed role labels.
- Corrected the statistics strip to three equal columns.

## Pass 2: responsive composition

Status: complete

Evidence:

- Playwright recaptured full-page, hero, portrait, stats, and contact views at 390, 768, and 1280 pixels under `qa/screenshots/presentation-ready-*`.
- `qa/presentation-ready.json` records all six section IDs, one JSON-LD script, no horizontal overflow, no console errors, no page errors, and the skip link as first focus.
- The 390-pixel email is one line with `white-space: nowrap`; all three statistics cells have equal measured widths.

## Pass 3: accessibility and interaction

Status: complete

Evidence:

- `npm run qa:browser`: zero axe violations at 390, 768, and 1280 pixels; 39 axe rules passed at each width.
- axe marked color contrast incomplete because decorative gradients prevent deterministic background sampling. Direct computed token checks cover the relevant copper combinations: 6.74:1 on canvas, 5.81:1 on raised surfaces, 5.13:1 on strong surfaces, and 12.56:1 for soft copper on canvas.
- Keyboard order begins with a visible, outlined skip link and follows the document order.
- Reduced-motion emulation changes smooth scrolling to `auto`.

## Pass 4: performance and technical integrity

Status: complete

Evidence:

- Mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 2.0 seconds, FCP 1.1 seconds, CLS 0, TBT 0 milliseconds.
- Desktop Lighthouse: 100 in all four categories; LCP 0.4 seconds, FCP 0.3 seconds, CLS 0, TBT 0 milliseconds.
- Replacing an accidental 867 KB, 1024-pixel PNG favicon with a proper 32-pixel, 2.2 KB asset raised simulated mobile Performance from 78 to 99.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm audit`: 0 vulnerabilities.
- A network-blocked build cleanly omitted the live statistics strip; a network-enabled production build restored it without changing the curated section.

## Pass 5: assets, SEO, and preview deployment

Status: complete

Evidence:

- Browser asset checks return 200 for both resume PDFs, `robots.txt`, `sitemap-index.xml`, and the generated Open Graph PNG, with the expected content types.
- Built output contains canonical, Open Graph, Twitter, indexable robots, sitemap, and Person JSON-LD metadata.
- Cloudflare Pages project `steven-hagene-portfolio` was created without custom domains or DNS changes.
- Preview branch deployment completed at `https://astro-rebuild.steven-hagene-portfolio.pages.dev`; immutable deployment URL: `https://65d5d6df.steven-hagene-portfolio.pages.dev`.

Presentation verdict: ready for final review. Nothing has touched the live `stevenhagene.com` domain.

## Pass 6: professional portrait replacement

Status: complete

Changes and evidence:

- Moved the supplied 1122 by 1402 professional portrait into `src/assets/stevenprofile.png` and removed the superseded event photo.
- Removed the event-photo-specific 1.62x crop. The replacement's native near-4:5 composition now fills the frame without transform-based cropping.
- Retained only a restrained saturation, contrast, and edge treatment so the photograph belongs to the sister-site palette without looking processed.
- Refreshed the presentation-ready screenshots at 390, 768, and 1280 pixels.
- Re-ran the full browser gate: zero horizontal overflow, console errors, page errors, or axe violations at all three widths.

## Pass 7: Semper founder story and second indexable route

Status: complete

Changes and evidence:

- Added `02 · Founder` to the homepage and renumbered the remaining chapters through `06 · Contact`.
- Added `/founder/semper-digital-solutions/` with a source-backed operating model, company-system narrative, federal-readiness explanation, and explicit certification claim boundary.
- Kept commercial services and procurement conversion on Semper's website to avoid duplicating or competing with the company site's search intent.
- Added a unique title, description, canonical URL, 1200 by 630 social card, Person-to-Organization relationship, `ProfilePage`, and `BreadcrumbList` structured data.
- Expanded the browser gate across both routes and all three target widths. Result: zero horizontal overflow, console errors, page errors, or axe violations.
- Added a navigation journey at 390 and 1280 pixels covering homepage section navigation, entry into the founder case study, and return to the Semper chapter; both journeys pass.
- Homepage mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100.
- Semper founder mobile and desktop Lighthouse: 100 in all four categories.
- Static build contains both routes in `sitemap-0.xml`; both social images and both resume PDFs return 200 with expected content types.
- `npm run check` reports zero errors, warnings, or hints; `npm audit` reports zero vulnerabilities.

## Pass 8: selective multipage architecture and visual polish

Status: presentation-ready

Changes:

- Reduced `/` to a focused landing page with concise work and Semper previews plus the existing contact destination.
- Added `/work/`, `/work/teo/`, `/work/musterhall/`, `/work/crimcaseai/`, and `/experience/`; retained the Semper founder route for seven indexable pages total.
- Rebuilt primary navigation around Work, Semper, Experience, and Contact. All four destinations remain visible and reachable at 390 pixels, with active-route state on the three dedicated destinations.
- Added page-specific titles, descriptions, canonicals, Open Graph cards, breadcrumbs, and `CollectionPage`, `Article`, or `ProfilePage` structured data as appropriate.
- Added previous and next project navigation, recruiter-oriented system narratives, and explicit problem, system, and hard-part sections to each engineering case study.
- Kept GitHub within the Work hub so the public-code proof has context without becoming a thin standalone page.

Playwright evidence:

- Captured all seven routes at 390, 768, and 1280 pixels in `qa/screenshots/presentation-ready-multipage-*`.
- Visual review found and corrected a full-page screenshot artifact that painted the offscreen skip link. The measured initial state confirms `BODY` owns focus and the skip link is entirely above the viewport until keyboard focus.
- No route has horizontal overflow, clipped text, console errors, or page errors. Primary navigation targets measure 44 pixels high at every tested width.
- The complete 390-pixel set confirms the email stays on one line, all timeline roles remain legible, project navigation is reachable, and all four primary routes fit without horizontal scrolling.
- Cross-route journeys pass at 390 and 1280 pixels from Home to Work to TEO to Musterhall to Experience to Semper to Contact.

Hard-gate evidence:

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: seven static pages, sitemap generated, responsive portrait variants generated, and current public GitHub statistics included.
- `npm run qa:browser`: zero axe violations across 21 route and viewport combinations; unique titles, correct canonicals, one H1 per route, valid JSON-LD, expected schemas, and all required assets pass.
- The three GitHub statistics cells measure equally at 390, 768, and 1280 pixels.
- Direct copper-token contrast checks remain 6.74:1 on canvas, 5.81:1 on raised surfaces, 5.13:1 on strong surfaces, and 12.56:1 for soft copper on canvas.
- `npm run qa:lighthouse`: every mobile route and the desktop homepage score 100 for Performance, Accessibility, Best Practices, and SEO, with no run warnings.
- `npm audit --audit-level=high`: 0 vulnerabilities.

Presentation verdict: ready for review. The live `stevenhagene.com` domain and DNS remain untouched.
