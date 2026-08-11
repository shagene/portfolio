# Steven Hagene portfolio

A small, static Astro portfolio for [stevenhagene.com](https://stevenhagene.com). The site is dark-only, content-driven, indexable, and built as a sister brand to Semper Digital Solutions.

## Stack

- Astro 7 static output with strict TypeScript
- Tailwind CSS 4 through the Vite integration
- Three-layer CSS tokens documented in [`src/styles/TOKENS.md`](src/styles/TOKENS.md)
- `astro:assets` responsive headshot generation
- Build-time GitHub GraphQL activity across two accounts with a committed fallback snapshot
- Generated 1200 by 630 Open Graph images for each search intent
- Vercel production deployment from `main`, with a weekly GitHub activity-cache refresh that triggers the same deployment path

There is no client-side framework and no contact form.

## Page structure

- `/` is the focused recruiter landing page with selected-work and Semper previews plus contact details.
- `/work/` is the engineering-work hub.
- `/github/` leads with owner-controlled private engineering summaries, then provides combined public activity across `shagene` and `semperdigitalsolutions` plus the public source for this site.
- `/work/teo/`, `/work/musterhall/`, and `/work/crimcaseai/` are full engineering case studies.
- `/experience/` owns the timeline, credentials, and skills taxonomy.
- `/founder/semper-digital-solutions/` owns Steven's company-building story while Semper's website remains the destination for services and procurement inquiries.

Each public route has its own title, description, canonical URL, Open Graph card, breadcrumb path, and appropriate structured data. The work hub uses `CollectionPage`, project pages use `Article`, and the GitHub, experience, and founder pages use `ProfilePage` relationships around the shared `Person` entity. `src/pages/404.astro` emits a real, branded `404.html` with `noindex, nofollow`; no SPA catch-all redirect is present.

## Local development

Node 22.12 or newer is required.

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run check
npm run build
PORT=4331 npm run serve:dist
PORTFOLIO_URL=http://127.0.0.1:4331 npm run qa:browser
PORTFOLIO_URL=http://127.0.0.1:4331 npm run qa:navigation
PORTFOLIO_URL=http://127.0.0.1:4331 npm run qa:screenshots
PORTFOLIO_URL=http://127.0.0.1:4331 npm run qa:lighthouse
```

The static QA server mirrors production route resolution, including serving `404.html` with an actual 404 status for unknown paths.

The build reads public repository metadata, language byte counts, and contribution calendars for `shagene` and `semperdigitalsolutions` through GitHub GraphQL when `GITHUB_TOKEN`, `GH_TOKEN`, or `GITHUB_GRAPHQL_TOKEN` is available. It merges both calendars and repository datasets at build time; there are no browser-side GitHub requests.

If the token is absent, GitHub rate-limits, or the API fails, the build logs the failure and loads `src/data/github-activity-cache.json`. If both live data and the cache are unavailable, the private-engineering summaries and public source for this site remain visible with a static status message rather than an empty component. The UI distinguishes public-profile contribution totals from public-repository activity because GitHub can include anonymized private contributions in a profile calendar.

To refresh the committed snapshot deliberately, authenticate with a GitHub token and run:

```bash
GITHUB_TOKEN=your-token npm run refresh:github
```

Do not commit or print the token. `GITHUB_LIVE_REQUIRED=1` is reserved for the scheduled refresh so a freshness failure stops the process instead of silently publishing an older snapshot.

## Editing content

Portfolio copy, links, case studies, private-engineering curation, the Semper founder story, experience, skills, credentials, and resume metadata live in [`src/data/portfolio.ts`](src/data/portfolio.ts). Components only define structure and presentation.

Design decisions:

- Primitive, semantic, and component tokens live in [`src/styles/global.css`](src/styles/global.css).
- Token architecture rules live in [`src/styles/TOKENS.md`](src/styles/TOKENS.md).
- GitHub's build-time merge, restricted-contribution boundary, cache validation, and graceful degradation live in [`src/data/github.ts`](src/data/github.ts).
- The selected B2 Axis Ring mark is inline through [`src/components/LogoMark.astro`](src/components/LogoMark.astro). Its standalone dark and light sources are [`public/logo-mark.svg`](public/logo-mark.svg) and [`public/logo-mark-inverted.svg`](public/logo-mark-inverted.svg); generated favicon and Apple assets come from `scripts/generate-brand-assets.mjs`.

## Resume assets

The two current persona resumes use these exact paths:

```text
public/resumes/full-stack-ai-product-engineer.pdf
public/resumes/senior-frontend-ux-engineer.pdf
```

If either file is removed, `npm run build` emits a warning and the site labels that link `PDF pending`.

The current professional portrait lives at [`src/assets/stevenprofile.png`](src/assets/stevenprofile.png). Preserve that filename when replacing it so no component change is required.

## Production deployment and weekly refresh

Vercel is the production host. It deploys from `main` using [`vercel.json`](vercel.json), and [`www.stevenhagene.com`](https://www.stevenhagene.com) is the canonical production host.

`.github/workflows/weekly-github-activity-refresh.yml` runs at 6:17 a.m. Eastern every Monday and can also be started manually. It type-checks the site, fetches current two-account GitHub activity with the repository `GITHUB_TOKEN`, and fails if the live fetch is unavailable. When the activity cache changes, the workflow commits only `src/data/github-activity-cache.json` to `main`; Vercel then deploys that commit through its existing Git integration. A cache that has not changed creates no commit and no deployment.

The workflow does not require a Vercel token or deploy hook. It also does not deploy to Cloudflare Pages. Cloudflare migration is deferred and must be treated as a separate hosting and DNS decision, not as a routine portfolio deployment.

## Evidence

- Audit and repo curation: [`research/FINDINGS.md`](research/FINDINGS.md)
- Presentation rubric: [`qa/RUBRIC.md`](qa/RUBRIC.md)
- QA passes and measured results: [`qa/CHANGELOG.md`](qa/CHANGELOG.md)
