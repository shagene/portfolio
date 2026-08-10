Your role

You are a senior engineer and designer rebuilding Steven Hagene's personal portfolio at stevenhagene.com. Both of his August 2026 resumes list this URL in the header, so recruiters WILL visit it, and today it contradicts the resumes (says "Computershare 2021 - Present," showcases crypto-faucet hobby apps, wears a dated USMC navy/scarlet/gold theme). The rebuild must be a stellar, one-of-a-kind portfolio: a brand-aligned sister site to semperdigitalsolutions.com that proves, in its own construction, every claim the resumes make about design systems, accessibility, performance, and Astro delivery. The site itself is the case study.

Hard decisions already made (do not relitigate)
FULL REBUILD in Astro (v5+, static output), replacing the Next.js 14 code in this repo. Astro is deliberate: the resumes claim "10+ Astro builds with Lighthouse 95+," so the portfolio becomes living proof.
DEPLOY TARGET: Cloudflare Pages (moving off Vercel, same platform as semperdigitalsolutions.com). Set up the Pages project config; Steven handles the DNS cutover and can walk through it with you at ship time.
HERO HEADLINE: "Senior Product Engineer: Full-Stack, UX & AI Systems"
HEADSHOT: yes, keep a photo in the hero. Use the one Steven provides in the repo (current photo.jpg as placeholder if no new one appears; flag it for replacement if it looks dated).
GITHUB SHOWCASE: BOTH curated and live. Curated repo cards tell the story; a light build-time stats strip proves activity. Details below.
DROP ENTIRELY: all five old projects (crypto faucets, SpellSphere, SI Eclipse, AssessmentSphere), the contact form + API route, emoji skill icons, the USMC color palette, parallax/animated backgrounds, blog plans.
CrimCaseAI is publicly nameable (the business site already names it). Aegis and client work are described at the same level of detail as the resumes, no deeper.
Brand alignment (sister site, not clone)

Match semperdigitalsolutions.com's system: dark-first (dark-only is fine), near-black and graphite ground, metallic copper/brass accent for numbered labels, links, and emphasis, clean sans-serif, generous whitespace, numbered sections ("01 · Selected Work"), direct no-hype voice. The personal site may be one notch warmer than the business site (it has a face and a first-person story) but the two must feel like siblings. Build the whole theme on CSS custom-property design tokens (primitive, semantic, component layers) documented in src/styles/TOKENS.md; the token architecture is itself a portfolio exhibit.

Content structure (single page, numbered sections)
Hero

Name. Headline: "Senior Product Engineer: Full-Stack, UX & AI Systems". Location: Clayton, NC. One quiet differentiator line: Marine veteran. SDVOSB founder. Immediate links: Email, GitHub (github.com/shagene), LinkedIn, Resume. Headshot.

01 · Selected Work (three flagship case studies + one compact row)

Write these as real case studies (problem, role, what was built, what made it hard), not marketing cards. Source facts ONLY from the resume/summary content below; invent nothing.

TEO (property-management financial SaaS): Lead Full-Stack Engineer. Owns payments/AR end to end: QuickBooks invoicing to Payabli hosted checkout, webhooks, background workers, invoice status as a derived projection of the ledger. Hardened the money path with default-deny, fail-closed safeguards. Founded the design system from zero (three-layer tokens, ESLint-enforced). Instituted an adversarial multi-model AI review gate. Led WCAG remediation.
Musterhall (creator learning platform): sole engineer for the entire platform. Next.js + TypeScript web, Flutter mobile, Supabase/Postgres with schema-enforced invariants. Cross-platform token pipeline (one source of truth to web CSS and a generated Dart package), public Storybook, LiveKit real-time room engine with host moderation, feature-flag rollout ladder.
CrimCaseAI portfolio (legal intelligence): Principal Engineer. Live case-management SaaS; gen-2 rebuild with schema-generated forms and in-browser ML so privileged data never leaves the client; evidence-intelligence platform serving paying law firms; and Aegis, an on-prem Docker appliance for restricted environments with multimodal ingestion, local OCR/transcription, vector search, entity graphs, and citation-gated AI chat.
Compact fourth row, "Also built": 10+ Astro marketing/municipal sites with token systems and Lighthouse 95+ scores; a Python site-audit engine; a 24/7 autonomous multi-agent business ops system (Node.js, Claude API).
02 · GitHub (the "both" treatment)
Curated repo cards: at build time, use gh (Steven's shagene account is authenticated) to list public repos on the shagene account and any public Semper org repos. Select the 4-6 that best support the senior positioning (recency, real READMEs, meaningful code). Render as styled cards: name, hand-written one-line description (rewrite; do not dump raw repo descriptions), primary language, link. If the public crop is thin or stale, pick the best available and add an honest line that most current work lives in private client repos; do NOT feature the dropped hobby projects as cards.
Live stats strip: fetch at build time from the public GitHub API (no token needed for public data): contribution/activity signal, public repo count, top languages. Render as a quiet single row. MUST degrade gracefully: if the API is unavailable at build time, the strip is omitted cleanly, never broken. Static fetch at build, no client-side API calls.
03 · Experience (timeline)
Semper Digital Solutions, Founder & Principal Engineer, 2024 - present
Endpoint Clinical, Senior Software Developer, Oct 2024 - Jan 2026 (shown as concurrent with Semper): clinical trial software, SSO frontend, AI-powered bug-resolution workflow, Playwright e2e
Computershare, Senior Software Developer / UX Engineer, Jun 2021 - Jul 2024: Global Design System, Figma/Token Studio/Style Dictionary pipeline
Earlier roles compressed to one line each: Beroe 2018-2021, Judge Consulting 2017-2018, NAVAIR 2015-2017
USMC anchors the end: Sergeant, Communications Specialist, 2006-2011. Combat veteran, MARSOC support, first Marine to deploy G-SWAN satcom in Iraq, held TS/SCI.
Credentials line: SBA-certified SDVOSB/VOSB (2026-2029), registered federal contractor, BS Computer Science (Grantham).
04 · Skills

Grouped exactly as the resumes group them: AI & Agent Systems / Full-Stack Product / Frontend & UX / Cloud, Testing & Delivery. Clean text chips from the design tokens. No emoji, no logos, no proficiency bars.

05 · Contact

Direct email (steven.hagene@gmail.com for the personal site), LinkedIn, GitHub, and BOTH resume PDFs downloadable, labeled by persona ("Full-Stack AI Product Engineer resume", "Senior Frontend / UX Engineer resume"). Steven will drop the two PDFs into the repo; use placeholder links with a build warning until the files exist. No contact form.

Technical requirements
Astro v5+ static output, Tailwind driven by the token layer, TypeScript.
Content lives in a data/content layer (src/content or typed data modules), never hardcoded in components.
SEO: proper title/description, canonical, Open Graph + Twitter cards with a generated OG image, sitemap, robots.txt (INDEXABLE this time; this is his real site), and Person JSON-LD structured data (name, jobTitle, sameAs links to GitHub/LinkedIn).
astro:assets for all imagery, responsive sizes.
WCAG 2.1 AA: landmarks, skip link, visible focus, contrast 4.5:1, keyboard operability, reduced-motion respect. The old site's unfinished accessibility TODO is part of why this rebuild exists; do not repeat it.
Cloudflare Pages: include the correct build config (or wrangler.toml if using direct upload), document the deploy in README, and note the Vercel-to-Cloudflare DNS cutover steps for Steven.
PHASE PLAN
Audit & research → research/FINDINGS.md: inventory the existing repo (what dies, what survives, e.g. the headshot), run gh to inventory public repos and pick the curated set with reasoning, study semperdigitalsolutions.com's live tokens/feel, confirm current Astro version.
Foundation: strip Next.js, scaffold Astro, tokens, Tailwind theme, layouts, content layer.
Build: all five sections with full real copy from this brief.
QA loop (5+ passes): build → Playwright screenshots at 390/768/1280 → critique against qa/RUBRIC.md (does it look like a sibling of the business site? would a recruiter believe "senior" in 5 seconds? does every resume claim it makes hold up?) → axe-core + Lighthouse (95+ all categories, zero axe violations; performance is a resume claim, treat it as a hard gate) → fix → qa/CHANGELOG.md.
Ship: Cloudflare Pages deploy config verified with a preview deploy if credentials allow, README with the DNS cutover runbook, then pause for Steven's final review before anything touches the live domain.
Deliverables
The rebuilt site in this repo, ready to push (commit history clean and logical).
Preview deploy on Cloudflare Pages (or exact runbook if auth is needed from Steven).
README.md: stack, how to edit content (the data layer), deploy + DNS cutover steps.
research/FINDINGS.md and qa/ artifacts showing the Lighthouse and axe results.
Definition of done

A single-page, dark, token-built Astro portfolio that is visually a sibling of semperdigitalsolutions.com; three flagship case studies plus the "also built" row; a GitHub section with curated cards and a gracefully-degrading live stats strip; accurate concurrent-role timeline ending the Computershare-is-current lie; both persona resumes downloadable; indexable with full SEO and Person schema; Lighthouse 95+ on every category and zero axe violations, verified and recorded; Cloudflare Pages deploy ready with a DNS cutover runbook; and not a single claim on the site that the resumes cannot back up.
