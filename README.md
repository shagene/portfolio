# Steven Hagene portfolio

A single-page, static Astro portfolio for [stevenhagene.com](https://stevenhagene.com). The site is dark-only, content-driven, indexable, and built as a sister brand to Semper Digital Solutions.

## Stack

- Astro 7 static output with strict TypeScript
- Tailwind CSS 4 through the Vite integration
- Three-layer CSS tokens documented in [`src/styles/TOKENS.md`](src/styles/TOKENS.md)
- `astro:assets` responsive headshot generation
- Build-time public GitHub stats with a fail-clean omission path
- Generated 1200 by 630 Open Graph image
- Cloudflare Pages deployment from `dist`

There is no client-side framework and no contact form.

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
npm run preview
```

The build fetches public GitHub data. If GitHub is unreachable, the stats strip is omitted and the curated repository cards still render.

## Editing content

Portfolio copy, links, case studies, experience, skills, repository curation, credentials, and resume metadata live in [`src/data/portfolio.ts`](src/data/portfolio.ts). Components only define structure and presentation.

Design decisions:

- Primitive, semantic, and component tokens live in [`src/styles/global.css`](src/styles/global.css).
- Token architecture rules live in [`src/styles/TOKENS.md`](src/styles/TOKENS.md).
- GitHub's build-time fetch and graceful degradation live in [`src/data/github.ts`](src/data/github.ts).

## Resume assets

The two current persona resumes use these exact paths:

```text
public/resumes/full-stack-ai-product-engineer.pdf
public/resumes/senior-frontend-ux-engineer.pdf
```

If either file is removed, `npm run build` emits a warning and the site labels that link `PDF pending`.

Replace [`src/assets/photo.jpg`](src/assets/photo.jpg) with a current square or portrait-oriented headshot. Preserve the filename so no component change is required.

The current supplied event photo is presented with a tight shoulders-up crop and dark tonal treatment. It is shippable, but a purpose-shot portrait remains the clearest future visual upgrade.

## Cloudflare Pages

The static build follows Cloudflare's current Astro settings:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22.22.3` or another supported Node 22 release

The repository includes `wrangler.toml` for direct preview uploads. After authenticating Wrangler:

```bash
npx wrangler pages deploy dist --project-name steven-hagene-portfolio
```

Current review deployment: [astro-rebuild.steven-hagene-portfolio.pages.dev](https://astro-rebuild.steven-hagene-portfolio.pages.dev). This is a preview branch only; no custom domain or DNS record has been changed.

For dashboard deployment, create a Pages project, connect `shagene/portfolio`, enter the build values above, and deploy the `main` branch. Pull requests receive separate preview URLs automatically.

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
