# Rebuild findings

Audit date: August 10, 2026

## Verdict

The existing Next.js site undermined the August 2026 resumes. It presented Computershare as current, centered five retired hobby projects, used the dated navy/scarlet/gold theme, and shipped client-side animation and theme code that did not support the new positioning. The initial rebuild preserved only the supplied headshot and favicon until stronger replacements were available.

## Legacy inventory

Removed:

- Next.js 14, React, `next-themes`, and the contact API route.
- Animated background, rotating title, dark-mode toggle, and mobile drawer JavaScript.
- AssessmentSphere, SpellSphere, SI Eclipse, CoinFaucet Suite, and Crypto Faucet Hub content and images.
- The old Marine palette and emoji skill treatment.
- The stale experience copy that showed Computershare as `2021 - Present`.

Preserved:

- The original `public/photo.jpg`, initially moved into Astro's asset pipeline and later replaced by `src/assets/stevenprofile.png`.
- The original favicon concept, rebuilt as a correctly sized `public/favicon.png`.
- Repository history and the new `BRIEF.md`.

The initial 800 by 800 event photo was technically usable but visually dated. It was replaced before launch by a professional 1122 by 1402 portrait with a quiet, naturally blurred background and a native near-4:5 composition.

## Public GitHub crop

The authenticated `shagene` account exposed 39 public repositories and no public organization memberships through the account API at audit time. Most recent client and product work is private. The public section therefore needs an explicit limitation statement.

Selected:

1. [`quote-extractor`](https://github.com/shagene/quote-extractor): the strongest recent public sample. Its README documents schema-enforced LLM extraction, nullable anti-hallucination choices, deterministic validation, human review, and an honest AI-assisted workflow. Renamed from `fde-case-study` on August 10, 2026 so the public profile names the product rather than the hiring context.
2. [`hours-interval-engine`](https://github.com/shagene/hours-interval-engine): a recent, unusually complete Python API sample with a clear parser/interval design, Docker instructions, boundary semantics, and broad tests. Renamed from `line-take-home` on August 10, 2026 for the same reason.
3. [`python_seo`](https://github.com/shagene/python_seo): older, but directly supports the resume's Python site-audit claim with crawler, analysis, sitemap, and visualization modules.
4. [`cs-components`](https://github.com/shagene/cs-components): older, but its source tree shows a broad TypeScript component catalog across controls, navigation, containers, and system states.

Not selected:

- The retired hobby projects named in the brief.
- Repositories with default starter READMEs or no meaningful documentation.
- `accessabilitySiteTesting`: relevant subject, but the repository is dominated by committed build output and a binary, so featuring it would weaken rather than support the senior positioning.
- Forks and small learning demos.

The build-time stats strip calls the public GitHub API for public repo count, top languages, and latest public push. If either request fails or times out, the complete strip is omitted and the curated cards remain intact. There are no browser-side GitHub calls.

## Live Semper brand study

The live site at [semperdigitalsolutions.com](https://semperdigitalsolutions.com) was inspected directly, including its deployed CSS assets.

Brand signatures carried forward:

- Mineral, steel, and copper primitive families.
- Archivo for display type, Manrope for body type, and a restrained mono face for labels.
- Near-black steel surfaces, copper emphasis, thin borders, generous section spacing, compact uppercase labels, and large compressed headings.
- Three layers of CSS custom properties: primitive, semantic, and component.

The portfolio differs intentionally by staying dark-only, using a slightly warmer charcoal canvas, making the editorial grid more visible, and letting the headshot create a personal focal point. It is a sibling, not a duplicate.

## Semper founder-page source boundary

The personal portfolio now documents Steven's founder and company-building story without copying Semper's commercial pages. Current public Semper material supports the founder-led delivery model, nationwide service, software/mobile/integration/AI breadth, and SBA-certified SDVOSB and VOSB status. The portfolio does not infer awards, agency endorsement, or federal past performance from those credentials.

SBA guidance supports the narrower procurement wording used on the page: SDVOSB certification establishes eligibility to compete for qualifying federal sole-source and set-aside opportunities, while VOSB certification creates qualifying VA Vets First opportunities. Sources: [SBA veteran contracting programs](https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs), [Semper Digital Solutions](https://www.semperdigitalsolutions.com/), and [Semper about and certifications](https://www.semperdigitalsolutions.com/about/).

## Current technical baseline

- Astro registry version checked on August 10, 2026: `7.2.0`. The brief permits Astro 5+, so the rebuild uses the current major.
- Astro's current install guide requires Node `22.12.0` or newer. The local runtime is Node `22.22.3`. See [Astro installation](https://docs.astro.build/en/install-and-setup/).
- Tailwind CSS and `@tailwindcss/vite` registry versions: `4.3.3`.
- Cloudflare's Astro Pages guide specifies `npm run build` and output directory `dist` for a static Astro site. See [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/).
- The Pages Wrangler reference requires `name`, `pages_build_output_dir`, and `compatibility_date`. See [Pages Wrangler configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/).

## Known launch dependencies

- Both August 9, 2026 persona resume PDFs are present under `public/resumes/` and were visually checked after rendering both pages of each file.
- The professional replacement headshot is present and verified at all target widths.
- Cloudflare preview deployment depends on authenticated account access and is deferred to the ship phase after first-build review.
- DNS is intentionally untouched. The cutover runbook lives in `README.md`.
