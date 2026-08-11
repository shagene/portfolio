# Steven Hagene portfolio

A small, static Astro portfolio for [stevenhagene.com](https://stevenhagene.com). The site is dark-only, content-driven, indexable, and built as a sister brand to Semper Digital Solutions.

## Stack

- Astro 7 static output with strict TypeScript
- Tailwind CSS 4 through the Vite integration
- Three-layer CSS tokens documented in [`src/styles/TOKENS.md`](src/styles/TOKENS.md)
- `astro:assets` responsive headshot generation
- Build-time GitHub GraphQL activity across two accounts with a committed fallback snapshot
- Generated 1200 by 630 Open Graph images for each search intent
- Cloudflare Pages deployment from `dist`

There is no client-side framework and no contact form.

## Page structure

- `/` is the focused recruiter landing page with selected-work and Semper previews plus contact details.
- `/work/` is the engineering-work hub.
- `/github/` leads with private-system case studies, then provides combined public activity and compact code snapshots across `shagene` and `semperdigitalsolutions`.
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

The static QA server mirrors Pages route resolution, including serving `404.html` with an actual 404 status for unknown paths.

The build reads public repository metadata, language byte counts, and contribution calendars for `shagene` and `semperdigitalsolutions` through GitHub GraphQL when `GITHUB_TOKEN`, `GH_TOKEN`, or `GITHUB_GRAPHQL_TOKEN` is available. It merges both calendars and repository datasets at build time; there are no browser-side GitHub requests.

If the token is absent, GitHub rate-limits, or the API fails, the build logs the failure and loads `src/data/github-activity-cache.json`. If both live data and the cache are unavailable, the private-system case studies and public code snapshots remain visible with a static status message rather than an empty component. The UI distinguishes public-profile contribution totals from public-repository activity because GitHub can include anonymized private contributions in a profile calendar.

To refresh the committed snapshot deliberately, authenticate with a GitHub token and run:

```bash
GITHUB_TOKEN=your-token npm run refresh:github
```

Do not commit or print the token. `GITHUB_LIVE_REQUIRED=1` is reserved for the scheduled deployment so a freshness failure stops the deploy instead of silently publishing an older snapshot.

## Editing content

Portfolio copy, links, case studies, the Semper founder story, experience, skills, repository curation, credentials, and resume metadata live in [`src/data/portfolio.ts`](src/data/portfolio.ts). Components only define structure and presentation.

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

## Cloudflare Pages

The static build follows Cloudflare's current Astro settings:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22.22.3` or another supported Node 22 release

The repository includes `wrangler.toml` for direct uploads. After authenticating Wrangler:

```bash
npx wrangler pages deploy dist --project-name steven-hagene-portfolio
```

Current review deployment: [astro-rebuild.steven-hagene-portfolio.pages.dev](https://astro-rebuild.steven-hagene-portfolio.pages.dev). Immutable deployment: [ee090520.steven-hagene-portfolio.pages.dev](https://ee090520.steven-hagene-portfolio.pages.dev). This is a preview branch only; no custom domain or DNS record has been changed.

The existing Cloudflare Pages project is a Direct Upload project, so it cannot use a Pages deploy hook or be converted in place to Git integration. `.github/workflows/weekly-pages-rebuild.yml` is the weekly rebuild path: every Monday it checks, builds with current GitHub activity, deploys `dist` to the Pages `main` branch, and verifies the homepage, GitHub route, sitemap, and a real 404 response.

The workflow becomes active when it reaches the default branch. These repository settings were provisioned on August 11, 2026:

- Secret `CLOUDFLARE_API_TOKEN`, scoped to `Account > Cloudflare Pages > Edit` for the correct account.
- Variable `CLOUDFLARE_ACCOUNT_ID` containing the Pages account ID.

The workflow maps GitHub's automatic repository token into the build as `GITHUB_TOKEN`; a separate GitHub PAT is not required for the public and publicly visible aggregate activity used here. The scoped Pages token is stored only in GitHub Actions, and the local Wrangler OAuth session is not copied into Actions because it is broader and refresh-based.

## Vercel to Cloudflare DNS cutover

Do not change DNS until the Pages preview has passed final QA and both resume files are present.

1. Create the Pages project and verify the generated `*.pages.dev` production URL.
2. In Pages, open **Custom domains** and add `stevenhagene.com` before changing DNS. Add `www.stevenhagene.com` as well if it should resolve.
3. If the apex domain is not already a Cloudflare zone, add it to Cloudflare and update the registrar nameservers to the assigned Cloudflare nameservers. Cloudflare requires the apex to be a zone on the same account as the Pages project.
4. If DNS is already hosted by Cloudflare, accept the automatically created Pages records. For a separately hosted subdomain, create the requested CNAME to the project `*.pages.dev` hostname only after associating the domain in Pages.
5. Wait for Pages to show the custom domains as active and for certificates to issue.
6. Verify both apex and `www`, canonical URLs, resume downloads, robots, sitemap, and social metadata over HTTPS.
7. Choose one canonical hostname and add the corresponding redirect for the other.
8. After at least one successful live verification, remove the old Vercel project/domain association. Keep the last Vercel deployment available until rollback is no longer needed.

Cloudflare references: [Astro on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), and [Wrangler configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/).

## Evidence

- Audit and repo curation: [`research/FINDINGS.md`](research/FINDINGS.md)
- Presentation rubric: [`qa/RUBRIC.md`](qa/RUBRIC.md)
- QA passes and measured results: [`qa/CHANGELOG.md`](qa/CHANGELOG.md)
