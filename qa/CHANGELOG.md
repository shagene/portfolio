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
- Cloudflare preview deployment completed at `https://astro-rebuild.steven-hagene-portfolio.pages.dev`; immutable deployment URL: `https://caa30d7d.steven-hagene-portfolio.pages.dev`.
- The full browser and axe gate passes against the immutable HTTPS deployment, and the 390/1280 cross-route navigation journeys pass there as well.

Presentation verdict: ready for review. The live `stevenhagene.com` domain and DNS remain untouched.

## Pass 9: punch-list closeout, unified GitHub proof, and B2 identity

Status: presentation-ready and deployed for review

Changes:

- Restored GitHub as a homepage proof point and added `/github/` as the canonical combined view across `shagene` and `semperdigitalsolutions`.
- Added a build-time merged 365-day calendar, combined repository and language statistics, current-activity date, source attribution, explicit restricted-contribution boundary, a committed fallback cache, and strict scheduled-build freshness behavior.
- Kept the curated repository crop, used the renamed `quote-extractor` and `hours-interval-engine` slugs, and added the evidence-backed `semperdigitalsolutions/MeetScribe` snapshot with account labels on every card.
- Added a branded `src/pages/404.astro`; unknown Cloudflare URLs now return HTTP 404 with a distinct noindex page instead of a duplicate homepage.
- Added a concise `What I built` line to every homepage work card and restored genuine anchors for primary navigation and case-study actions.
- Confirmed unique titles, descriptions, canonicals, Open Graph and Twitter cards across all eight public routes; Person JSON-LD, sitemap, and robots coverage are present and verified.
- Integrated the selected B2 Axis Ring as the inline navigation lockup and 404 mark, standalone dark and inverted SVGs, adaptive SVG/ICO favicons, a 180-pixel Apple icon, and every 1200 by 630 Open Graph card. The 2rem mark and 0.75rem wordmark gap are documented in `TOKENS.md`.
- Added a Monday scheduled GitHub Action with live-data strict mode, Cloudflare direct upload, and post-deploy smoke checks. The one-account Pages Edit token and account variable are provisioned in GitHub; the schedule begins when the workflow reaches `main`.

Measured evidence:

- `npm run check`: 0 errors, 0 warnings, 0 hints across 35 files.
- `npm run build`: 9 static pages, 4 responsive portrait variants, sitemap, brand assets, and all route-specific Open Graph images generated successfully.
- Fallback proof: a deliberately invalid GitHub token logged the live failure and completed from the committed cache; `GITHUB_LIVE_REQUIRED=1` stopped the same build before deployment.
- `npm run qa:browser`: 27 route and viewport checks across 390, 768, and 1280 pixels; 0 axe violations, 0 incomplete keyboard traversals, 0 focus failures, 0 route failures, 0 asset failures, and 0 sitemap or robots failures.
- Every keyboard target has a visible 2-pixel focus indicator. Every nav and case-study destination is a genuine `<a href>` element.
- Copper contrast: 6.74:1 on canvas, 5.81:1 on raised surfaces, 5.13:1 on strong surfaces, and 12.56:1 for soft copper on canvas. Logo contrast is 6.74:1 on the dark canvas and 17.5:1 for the inverted mark on the mineral light surface.
- `npm run qa:screenshots`: 27 full-page captures with no failures. The 390-pixel GitHub heatmap stays inside a 308-pixel scroll region, starts at the current-month edge, and never creates root overflow.
- Launch-mode Lighthouse: homepage and GitHub mobile Performance 99; every other audited public route 100. Accessibility, Best Practices, and SEO are 100 on all eight public routes. Desktop homepage is 100 in all four categories. The rendered noindex 404 is 100 for Performance, Accessibility, and Best Practices.
- Cloudflare preview Lighthouse: Performance 99 or 100, Accessibility 100, and Best Practices 100. Raw SEO is 66 to 69 because Cloudflare adds `X-Robots-Tag: noindex` to branch previews; the separate launch-mode report verifies SEO 100 without that provider protection.
- `npm audit --audit-level=high`: 0 vulnerabilities. `actionlint`: clean.

Deployment evidence:

- Review alias: `https://astro-rebuild.steven-hagene-portfolio.pages.dev`.
- Immutable review: `https://ee090520.steven-hagene-portfolio.pages.dev`.
- Deployed homepage, GitHub page, sitemap, and favicon return 200. A nonsense path returns 404.
- The full deployed browser gate passes all 27 checks with zero axe, keyboard, route, asset, sitemap, or robots failures. Deployed 390 and 1280 navigation journeys also pass.

Presentation verdict: ready for review. The live `stevenhagene.com` domain and DNS remain untouched.

## Pass 10: private-first engineering proof and service record

Status: presentation-ready and deployed for review

Changes:

- Reframed `/github/` around the three private systems that best represent the work: TEO, Musterhall, and CrimCaseAI. Each now carries a private-repository boundary, role, build summary, hard problem, and genuine link to its full case study.
- Kept the combined two-account calendar and statistics as supporting signal, then reduced the four public repositories to compact, explicitly secondary code snapshots.
- Updated the homepage GitHub preview, route metadata, breadcrumb, and 1200 by 630 Open Graph card to match the private-first hierarchy.
- Replaced “MARSOC support” with: “Combat veteran with Marine Corps infantry and MARSOC service. Recipient of multiple Navy and Marine Corps Achievement Medals. First Marine to deploy G-SWAN satellite communications in Iraq. Held TS/SCI clearance.”
- Corrected the browser harness so a route-scoped run still validates the sitemap against the complete public route set.

Measured evidence:

- `npm run check`: 0 errors, 0 warnings, 0 hints across 35 files.
- `npm run build`: 9 static pages, sitemap, brand assets, responsive portrait variants, and route-specific Open Graph images generated successfully. GitHub data loaded from the committed fallback through August 10, 2026.
- Focused screenshots: `/`, `/github/`, and `/experience/` captured at 390, 768, and 1280 pixels with no screenshot, console, page, clipped-text, or root-overflow failures. The 390-pixel heatmap remains contained in its horizontal region.
- Full `npm run qa:browser`: 27 route and viewport checks; 0 axe violations, 0 incomplete keyboard traversals, 0 focus failures, 0 route failures, 0 asset failures, and 0 sitemap or robots failures.
- `npm run qa:navigation`: complete cross-route journeys pass at 390 and 1280 pixels; every expected navigation and case-study destination is a genuine anchor.
- Launch-mode Lighthouse: homepage and GitHub mobile Performance 99; every other audited public route 100. Accessibility, Best Practices, and SEO are 100 on every public route. Desktop homepage is 100 in all four categories, and the noindex 404 is 100 for Performance, Accessibility, and Best Practices.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- Deployed full browser gate: all 27 checks pass on the immutable HTTPS deployment with 0 axe, keyboard, focus, route, asset, sitemap, or robots failures. The 390 and 1280 deployed navigation journeys also pass.

Deployment evidence:

- Review alias: `https://astro-rebuild.steven-hagene-portfolio.pages.dev`.
- Immutable review: `https://c4ea397d.steven-hagene-portfolio.pages.dev`.
- Homepage, GitHub, experience, sitemap, and GitHub Open Graph asset return 200. A nonsense path returns 404.
- The stable review alias serves the new private-first headline.

Presentation verdict: ready for review. The live `stevenhagene.com` domain and DNS remain untouched.

## Pass 11: main promotion and production release

Status: production

Changes and evidence:

- Fast-forwarded `main` from the legacy Next.js portfolio at `3d0aab2` to the reviewed Astro build at `74aa2e0`; no independent mainline commits were overwritten.
- The first Vercel production attempt failed under the existing project configuration. Added repository-owned Vercel settings for the Astro framework, `npm ci`, `npm run build`, the `dist` output directory, trailing-slash routing, Node 22, and the same security/cache headers used by the Cloudflare build.
- The corrected Vercel deployment completed successfully at `dd4b0e2`, and `stevenhagene.com` began serving the Astro build with the private-first GitHub page and a real 404.
- Promoted the final canonical-host build to the Cloudflare Pages `main` branch at `https://831dbfc2.steven-hagene-portfolio.pages.dev` so the scheduled deployment path and repository production branch are aligned.
- Aligned canonical URLs, generated sitemap URLs, and the robots sitemap declaration with Vercel's 200-serving primary hostname, `https://www.stevenhagene.com`, rather than the redirecting apex.
- Rebuilt from `main`: 0 Astro errors, warnings, or hints; 9 static pages generated successfully.
- Re-ran the complete local browser gate after the canonical-host correction: 27 route and viewport checks, 0 axe violations, 0 keyboard or focus failures, and 0 route, asset, sitemap, or robots failures.
- Live production browser gate: all 27 checks pass at 390, 768, and 1280 pixels with 0 axe, keyboard, focus, route, asset, sitemap, or robots failures.
- Live production navigation journeys pass at 390 and 1280 pixels; every expected primary and case-study destination remains a genuine anchor.
- Live production Lighthouse: Performance, Accessibility, Best Practices, and SEO are 100 on every public route, with no warnings. The 404 scores 100 for Performance, Accessibility, and Best Practices.
- `https://stevenhagene.com` redirects to the primary `www` hostname, which returns 200 with the Astro portfolio. `/github/` returns 200 with the private-first proof, and a nonsense path returns 404.

Production verdict: shipped. The legacy Next.js portfolio has been replaced on the custom domain.

## Pass 12: owner-controlled private engineering curation

Status: production

Changes and evidence:

- Decoupled the GitHub route from the general case-study array so TEO and Musterhall remain valid Work pages without being presented as Steven-owned private repositories.
- Replaced the GitHub route's private cards with Aegis, Semper Command Center, and VolumeGuard. Every card states its private-source boundary, Steven's role, the implemented system, and the hard constraint; none implies repository access.
- Removed the four arbitrary public-repository cards. The only curated public code link is now the genuine `shagene/portfolio` source for this site.
- Replaced the unverified autonomous-operations wording with evidence-backed, human-controlled sourcing-system language.
- Updated the homepage GitHub preview, GitHub metadata, 404 link copy, generated Open Graph card, README, rubric, and research findings to match the new evidence model.
- Added browser assertions for the exact private-project set, zero repository links inside private cards, one genuine portfolio-source anchor, and the absence of all rejected repository slugs.
- Astro check: 35 files, 0 errors, 0 warnings, 0 hints.
- Static build: 9 pages generated successfully using the committed GitHub activity fallback.
- Browser and accessibility gate: 27 checks across 9 routes at 390, 768, and 1280 pixels; 0 axe violations, 0 incomplete keyboard traversals, 0 focus failures, and 0 route, asset, sitemap, or robots failures.
- Navigation journeys pass at 390 and 1280 pixels with genuine anchors and no navigation overflow.
- Responsive GitHub captures at 390, 768, and 1280 pixels report no overflow, clipped text, console errors, or page errors. The private cards and public-source panel were also inspected visually at all three widths.
- Lighthouse: 100 Accessibility, Best Practices, and SEO on every public route; Performance is 99 on the mobile homepage and GitHub route and 100 elsewhere. The 404 scores 100 for Performance, Accessibility, and Best Practices and remains non-indexable.
- Pushed commit `e64a3d7` to `main`; Vercel reported a successful production deployment. The live GitHub route returns 200 with Aegis, Semper Command Center, VolumeGuard, and the `shagene/portfolio` source link, while all four rejected repository cards are absent.
- Live production browser gate: all 27 checks pass at 390, 768, and 1280 pixels with 0 axe, keyboard, focus, route, asset, sitemap, or robots failures. Live navigation journeys pass at 390 and 1280 pixels, and the nonsense route still returns 404.

Production verdict: shipped and verified.

## Pass 13: independent live-site verification and final accessibility polish

Status: production verified

Production target:

- URL: `https://www.stevenhagene.com`
- Verified site commit: `00e9bd5`
- Vercel status: successful production deployment on August 11, 2026

Changes:

- Removed a redundant `aria-label` from the visual contribution legend. This clears axe's `aria-prohibited-attr` manual-review result without changing the visible GitHub design.
- Added a hard navigation-overflow assertion to the 390 and 1280 pixel cross-route journey.

Live HTTP, semantics, and accessibility evidence:

- `GET /zzz-does-not-exist/` returns HTTP 404 with no redirects, `noindex, nofollow`, the branded `This path ends here.` page, and genuine anchors to Home, Work, and GitHub. It does not return the homepage.
- The five primary destinations, all three homepage `Read case study` actions, and `Explore all selected work` are genuine `<a href>` elements. No div, button, fake `role="link"`, or click-handler substitute was found.
- A full keyboard traversal across the eight public routes reached 112 focusable elements: 111 anchors and the intentionally focusable GitHub calendar scroll region. Every stop displayed a 2-pixel outline and copper focus halo.
- Post-deploy `npm run qa:browser`: 27 checks across nine routes at 390, 768, and 1280 pixels; 0 axe violations, 0 `aria-prohibited-attr` incomplete results, 0 incomplete keyboard traversals, 0 focus failures, 0 route failures, 0 asset failures, and 0 sitemap or robots failures.
- Post-deploy `npm run qa:navigation`: 390 and 1280 pixel journeys pass. At 390 pixels, the five-item nav measures 275 pixels for both client and scroll width, so it has no horizontal overflow.

Live responsive evidence:

- Captured and visually reviewed all eight public routes plus the nonsense-path 404 at 390, 768, and 1280 pixels under `qa/screenshots/live-review-*`; 27 route-width captures report no failures, root overflow, clipped text, console errors, or page errors.
- The 390-pixel GitHub calendar remains inside its panel: a 308-pixel scroll region contains a 768-pixel SVG with `overflow-x: auto`, while the root remains exactly 390 pixels wide. The most recent months are visible first and the full year remains keyboard-scrollable.
- The homepage, Work hub, all three case studies, GitHub private-work cards, Experience timeline, Semper founder page, calls to action, previous/next controls, footers, and branded 404 retain their intended composition at every tested width.

Live Lighthouse scores:

| Route | Form factor | Performance | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| `/` | Desktop | 100 | 100 | 100 | 100 |
| `/` | Mobile | 100 | 100 | 100 | 100 |
| `/work/` | Mobile | 100 | 100 | 100 | 100 |
| `/work/teo/` | Mobile | 100 | 100 | 100 | 100 |
| `/work/musterhall/` | Mobile | 100 | 100 | 100 | 100 |
| `/work/crimcaseai/` | Mobile | 100 | 100 | 100 | 100 |
| `/github/` | Mobile | 100 | 100 | 100 | 100 |
| `/experience/` | Mobile | 100 | 100 | 100 | 100 |
| `/founder/semper-digital-solutions/` | Mobile | 100 | 100 | 100 | 100 |
| `/404.html` | Mobile | 100 | 100 | 100 | Not applicable; intentionally noindex |

SEO, identity, and contrast evidence:

- All eight indexable routes have unique titles, descriptions, canonical URLs, Open Graph images, and complete Twitter metadata. Every canonical and `og:url` matches its live URL, every OG asset is a real 1200 by 630 PNG, and the sitemap contains exactly those eight routes.
- `robots.txt` allows indexing and points to the live sitemap. Homepage Person JSON-LD includes Steven Hagene, the current job title, Semper Digital Solutions, GitHub, and LinkedIn.
- The rejected interview-exercise repository slugs and their renamed replacements are absent from the rendered site. `/github/` continues to lead with Aegis, Semper Command Center, and VolumeGuard, with `shagene/portfolio` as the single curated public-source link.
- Production serves `favicon.svg`, a multi-frame `favicon.ico` containing 16, 32, and 48 pixel entries, and a 180 by 180 Apple touch icon. After releasing the browser-control overlay, a native Chromium tab-strip capture at `qa/screenshots/live-review-favicon-tab-16.png` confirms the SH mark remains distinguishable at the real 16-pixel tab size.
- Copper contrast measures 6.74:1 on canvas, 5.81:1 on raised surfaces, 5.13:1 on strong surfaces, and 12.56:1 for soft copper on canvas. The dark and inverted marks exceed the 3:1 non-text requirement.
- `npm run check`: 35 files, 0 errors, 0 warnings, 0 hints. `npm run build`: 9 static pages and sitemap generated successfully from the committed GitHub activity cache.

Production verdict: verified with no blockers. The current design, private-first GitHub hierarchy, founder framing, case-study structure, and logo were preserved.

## Pass 14: production automation alignment

Status: production verified

- Confirmed that Vercel, not Cloudflare Pages, is the live production host for `www.stevenhagene.com`.
- Replaced the inactive Cloudflare Pages deployment workflow with `weekly-github-activity-refresh.yml`. It runs every Monday at 6:17 a.m. Eastern or on demand, type-checks the site, requires a live authenticated GitHub activity fetch, and can commit only `src/data/github-activity-cache.json`.
- The refresh uses Astro's static build directly so generated Open Graph images cannot appear as unrelated changes. The cache-only guard now has a narrow, verifiable scope.
- Removed the unused `wrangler.toml` and the obsolete Cloudflare Pages and DNS-cutover runbook. The README now documents Vercel's `main`-branch deployment and the cache-refresh path. Cloudflare migration remains explicitly deferred as a separate hosting and DNS decision.
- `actionlint` passes for the new workflow. Local `npm run check` reports 35 files with 0 errors, 0 warnings, and 0 hints; `npm run build` generates all 9 static pages successfully.
- Manual workflow proof: [run 31512034025](https://github.com/shagene/portfolio/actions/runs/31512034025) completed successfully on August 11, 2026. It fetched live data, updated the committed cache through 2026-08-11, and created `fdcb039` containing only the cache update.
- Vercel reported `fdcb039` as a successful production deployment. `https://www.stevenhagene.com/github/` returned HTTP 200 after that deployment.

Production verdict: weekly GitHub activity freshness now follows the actual Vercel production path end to end.
