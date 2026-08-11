import { existsSync } from "node:fs";
import { join } from "node:path";

export type Link = {
  label: string;
  href: string;
  kind?: "primary" | "text";
};

export type CaseStudy = {
  number: string;
  slug: string;
  path: string;
  name: string;
  domain: string;
  role: string;
  problem: string;
  previewBuilt: string;
  built: string;
  difficulty: string;
  technologies: string[];
  pageTitle: string;
  pageDescription: string;
  eyebrow: string;
  headline: string;
  lead: string;
  scope: { label: string; value: string }[];
  context: string[];
  systemHeading: string;
  systemIntro: string;
  system: { number: string; title: string; body: string }[];
  hardPartHeading: string;
  hardPartIntro: string;
  guardrails: { title: string; body: string }[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  detail?: string;
  concurrent?: boolean;
  compact?: boolean;
};

export const site = {
  name: "Steven Hagene",
  title: "Senior Product Engineer: Full-Stack, UX & AI Systems",
  description:
    "Steven Hagene is a senior product engineer in Clayton, NC building full-stack products, accessible design systems, and grounded AI systems.",
  location: "Clayton, NC",
  email: "steven.hagene@gmail.com",
  github: "https://github.com/shagene",
  githubCompany: "https://github.com/semperdigitalsolutions",
  linkedin: "https://www.linkedin.com/in/steven-hagene-32279531",
  canonical: "https://stevenhagene.com",
  semper: {
    name: "Semper Digital Solutions",
    url: "https://www.semperdigitalsolutions.com/",
    aboutUrl: "https://www.semperdigitalsolutions.com/about/",
  },
} as const;

export const navigation = [
  { label: "Work", href: "/work/" },
  { label: "GitHub", href: "/github/" },
  { label: "Semper", href: "/founder/semper-digital-solutions/" },
  { label: "Experience", href: "/experience/" },
  { label: "Contact", href: "/#contact" },
] as const;

export const heroLinks: Link[] = [
  { label: "View work", href: "/work/", kind: "primary" },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Resume", href: "/#contact" },
];

export const copy = {
  hero: {
    differentiator: ["Marine veteran.", "SDVOSB founder."],
    intro:
      "I build the product and the system behind it: financial workflows, cross-platform experiences, accessible design foundations, and AI that has to earn trust.",
    portraitRole: "Principal engineer",
    portraitLocation: "Clayton, North Carolina",
    proof: ["Product", "Systems", "Trust"],
  },
  work: {
    number: "01",
    title: "Selected Work",
    heading: "Built where trust is part of the architecture.",
    intro:
      "Three systems where the hard part was not the screen. It was keeping money, policy, platforms, and sensitive information coherent.",
    alsoBuiltHeading: "The work between the flagships.",
  },
  semper: {
    number: "03",
    title: "Founder",
    heading: "Building the company behind the work.",
    intro:
      "Semper Digital Solutions is where product judgment, engineering delivery, and company-building meet, with federal readiness built on verified status rather than borrowed credibility.",
  },
  github: {
    number: "02",
    title: "GitHub",
    heading: "Private systems, documented at the decision level.",
    intro:
      "Most current product and client work lives in private repositories. The case studies explain the architecture, constraints, and decisions; public activity follows as supporting evidence.",
  },
  experience: {
    number: "01",
    title: "Experience",
    heading: "From tactical systems to product systems.",
    intro:
      "A career connecting product engineering and interface systems, with Semper and Endpoint shown honestly as concurrent work.",
  },
  skills: {
    number: "02",
    title: "Skills",
    heading: "Breadth with a reason.",
    intro:
      "The working set behind the case studies, grouped by the part of the product it serves rather than a made-up proficiency score.",
  },
  contact: {
    number: "04",
    title: "Contact",
    heading: "Bring the difficult part.",
    intro: "The shortest route is email. For work history and code, use the links below.",
  },
  footer: {
    identity: "Steven Hagene · Senior Product Engineer",
    build: "Built with Astro, a three-layer token system, and no client-side framework.",
  },
} as const;

export const workPage = {
  path: "/work/",
  pageTitle: "Engineering Case Studies | Steven Hagene",
  pageDescription:
    "Engineering case studies from Steven Hagene covering financial SaaS, cross-platform learning products, and grounded legal intelligence systems.",
  eyebrow: "Work · Product engineering",
  headline: "Systems built for the difficult part.",
  lead:
    "The interface matters. These case studies go one layer deeper into the state, policy, platform, and trust problems that made each product difficult to build well.",
} as const;

export const experiencePage = {
  path: "/experience/",
  pageTitle: "Experience & Skills | Steven Hagene",
  pageDescription:
    "Steven Hagene's engineering experience across product systems, accessible design systems, full-stack software, AI, and military communications.",
  eyebrow: "Experience · 2006 to present",
  headline: "A career connecting product and systems.",
  lead:
    "From tactical communications to financial software, clinical platforms, design systems, and founder-led delivery, the throughline is accountable engineering in complicated environments.",
} as const;

export const githubPage = {
  path: "/github/",
  pageTitle: "Private Engineering Work & GitHub Activity | Steven Hagene",
  pageDescription:
    "Private-system case studies from Steven Hagene, plus combined public GitHub activity across his personal and Semper Digital Solutions accounts.",
  eyebrow: "Engineering proof · Private systems, public signal",
  headline: "The strongest work is private. The engineering story is not.",
  lead:
    "TEO, Musterhall, and CrimCaseAI best represent how I design and ship systems. Their repositories stay private, so this page leads with what I built and why it was difficult, then puts public activity from both GitHub accounts in context.",
} as const;

export const semperStory = {
  path: "/founder/semper-digital-solutions/",
  pageTitle: "Building Semper Digital Solutions | Steven Hagene",
  pageDescription:
    "How Steven Hagene is building Semper Digital Solutions, an SBA-certified SDVOSB and VOSB software company grounded in direct senior delivery.",
  organizationDescription:
    "A founder-led software company serving clients nationwide across web, mobile, integrations, automation, AI, and custom software.",
  eyebrow: "Founder case study · 2024 to present",
  headline: "Building the company behind the work.",
  lead:
    "Semper Digital Solutions is the operating model I wanted as an engineer: senior product judgment stays close to the problem, and the same person remains accountable from framing through release.",
  ledgerHeading: "Built to be accountable.",
  status: [
    "SBA-certified SDVOSB & VOSB",
    "Registered federal contractor",
    "Serving clients nationwide",
  ],
  homepage: {
    eyebrow: "Semper Digital Solutions · 2024 to present",
    role: "Founder & Principal Engineer",
    storyLinkLabel: "Read the founder case study",
    companyLinkLabel: "Visit Semper",
    statusLabel: "Company status",
    statusHeading: "Verified ownership. Direct accountability.",
    boundary:
      "Certification creates eligibility to compete. The work still has to prove the company.",
    paragraphs: [
      "I founded Semper to keep strategy, UX, architecture, implementation, and delivery connected. Clients work directly with the senior engineer responsible for the outcome.",
      "The company spans web products, mobile apps, integrations, automation, and AI systems, while its internal operating system turns the same engineering discipline toward running the business itself.",
    ],
    signals: [
      { label: "Delivery", value: "Founder-led" },
      { label: "Market", value: "Commercial + federal" },
      { label: "Standard", value: "Accessible, measurable, shipped" },
    ],
  },
  labels: {
    backLink: "← Home / Founder",
    visitCompany: "Visit Semper Digital Solutions",
    contact: "Contact Steven",
    ledger: "Company ledger",
    workingScope: "Working scope",
    claimBoundary: "Claim boundary",
    certificationDetails: "See Semper's certification details",
  },
  operatingSection: {
    eyebrow: "01 · Operating model",
    heading: "Senior engineering stays close to the problem.",
    intro:
      "Semper is not a layer between a client and the people doing the work. It is the company structure around direct product ownership and disciplined delivery.",
    paragraphs: [
      "I founded the company to keep product strategy, interface decisions, architecture, implementation, and release accountability connected. That continuity matters most when the problem crosses more than one discipline.",
      "The work serves founders, established businesses, and public-sector buyers. The commercial offer lives on Semper's site; this page documents the company-building and engineering story behind it.",
    ],
  },
  systemSection: {
    eyebrow: "02 · Company system",
    heading: "What I built into Semper.",
    intro:
      "The company itself is a product: a delivery model, an operating system, and a set of standards designed to compound rather than reset with every engagement.",
  },
  readinessSection: {
    eyebrow: "03 · Federal readiness",
    heading: "Verified status, stated precisely.",
    intro:
      "Veteran ownership is part of the company's identity and procurement position. It is presented here as verified eligibility, never as an invented performance claim.",
  },
  operatingModel: [
    {
      number: "01",
      title: "Direct senior delivery",
      body:
        "Semper serves founders, businesses, and public-sector buyers without separating product thinking from implementation. I stay directly involved across strategy, interface systems, architecture, engineering, validation, and release.",
    },
    {
      number: "02",
      title: "A company with its own systems",
      body:
        "I built an internal, continuously running multi-agent operations system with Node.js and the Claude API. It supports the recurring research, communication, content, and market-analysis work behind the company.",
    },
    {
      number: "03",
      title: "Delivery standards that compound",
      body:
        "Reusable token systems, accessibility gates, browser QA, and static delivery make each build stronger than a one-off project. The portfolio includes more than ten Astro marketing and municipal builds with Lighthouse scores of 95 or better.",
    },
  ],
  capabilities: [
    "Web development",
    "Mobile apps",
    "Product and UX systems",
    "Integrations",
    "Workflow automation",
    "AI and LLM systems",
    "Custom software",
    "Technical delivery",
  ],
  readiness: [
    {
      label: "SBA-certified SDVOSB",
      detail:
        "Verified service-disabled veteran ownership and control, with eligibility to compete for qualifying federal sole-source and set-aside opportunities.",
    },
    {
      label: "SBA-certified VOSB",
      detail:
        "Verified veteran ownership and control, with eligibility to pursue qualifying opportunities through the Department of Veterans Affairs Vets First program.",
    },
    {
      label: "Federal contractor registration",
      detail:
        "Semper maintains the company foundation required to be evaluated as a federal technology supplier, alongside its commercial delivery work.",
    },
  ],
  certificationBoundary:
    "Certification verifies ownership and control and establishes eligibility to compete. It is not a contract award, an agency endorsement, or a substitute for demonstrated delivery.",
  closing: {
    eyebrow: "04 · Two destinations",
    heading: "The founder story lives here. The company offer lives at Semper.",
    primaryLabel: "Explore Semper's services",
    secondaryLabel: "Explore selected work",
  },
} as const;

export const caseStudies: CaseStudy[] = [
  {
    number: "01A",
    slug: "teo",
    path: "/work/teo/",
    name: "TEO",
    domain: "Property-management financial SaaS",
    role: "Lead Full-Stack Engineer",
    problem:
      "A financial product has to preserve one trustworthy account of an invoice while QuickBooks, hosted checkout, webhooks, and background jobs all change it.",
    previewBuilt:
      "Payments and accounts receivable across QuickBooks, Payabli, webhooks, background workers, and ledger-derived invoice state.",
    built:
      "I own payments and accounts receivable end to end: QuickBooks invoicing through Payabli hosted checkout, webhook processing, background workers, and invoice status derived from the ledger. I also founded the design system from zero with a three-layer token architecture and ESLint enforcement.",
    difficulty:
      "The money path must fail closed. I hardened it with default-deny safeguards, established an adversarial multi-model AI review gate, and led WCAG remediation across the product.",
    technologies: [
      "TypeScript",
      "QuickBooks",
      "Payabli",
      "Webhooks",
      "Background workers",
      "Design tokens",
      "WCAG",
    ],
    pageTitle: "TEO Financial SaaS Case Study | Steven Hagene",
    pageDescription:
      "How Steven Hagene engineers trustworthy invoice and payment state across QuickBooks, Payabli, webhooks, workers, and a ledger-derived financial product.",
    eyebrow: "Case study 01A · Financial SaaS",
    headline: "Keeping financial state trustworthy across systems.",
    lead:
      "At TEO, I own the payments and accounts-receivable path from invoice creation through hosted checkout, asynchronous processing, and the product state users ultimately trust.",
    scope: [
      { label: "Role", value: "Lead Full-Stack Engineer" },
      { label: "Domain", value: "Property-management finance" },
      { label: "Focus", value: "Payments, AR, product systems" },
    ],
    context: [
      "A financial product cannot treat each integration response as its own version of the truth. QuickBooks, Payabli, webhooks, and background workers all observe or change a transaction at different moments.",
      "The engineering problem was to preserve a coherent account of the invoice while keeping the interface useful, the payment path conservative, and the product foundation enforceable across the team.",
    ],
    systemHeading: "One money path, three engineering layers.",
    systemIntro:
      "The product separates external events, durable financial state, and interface behavior so that each layer has a clear responsibility.",
    system: [
      {
        number: "01",
        title: "Invoice and ledger state",
        body:
          "QuickBooks invoicing feeds a product model where invoice status is derived from the ledger rather than maintained as an unrelated flag.",
      },
      {
        number: "02",
        title: "Payment event processing",
        body:
          "Payabli hosted checkout, webhook handlers, and background workers carry payment activity through asynchronous boundaries without treating an early response as final state.",
      },
      {
        number: "03",
        title: "Enforced product foundations",
        body:
          "A three-layer token architecture, ESLint enforcement, and WCAG remediation give the interface system rules that can be checked instead of remembered.",
      },
    ],
    hardPartHeading: "The money path has to fail closed.",
    hardPartIntro:
      "Correctness here is not only about a successful transaction. It is also about refusing unsafe transitions and making discrepancies visible before they become financial state.",
    guardrails: [
      {
        title: "Default-deny safeguards",
        body:
          "Ambiguous or incomplete financial conditions do not earn a permissive fallback. The system protects the boundary before dispatching a money-moving action.",
      },
      {
        title: "Adversarial review",
        body:
          "A multi-model AI review gate challenges assumptions in the payment path and supplements conventional engineering review on high-risk changes.",
      },
      {
        title: "Accessible by construction",
        body:
          "WCAG remediation and enforceable design tokens keep accessibility tied to the product system, not reserved for a cleanup pass after release.",
      },
    ],
  },
  {
    number: "01B",
    slug: "musterhall",
    path: "/work/musterhall/",
    name: "Musterhall",
    domain: "Creator learning platform",
    role: "Sole Engineer",
    problem:
      "One learning product needed to behave coherently across web, mobile, real-time rooms, and a database with product rules that could not drift by client.",
    previewBuilt:
      "A Next.js web app, Flutter mobile app, Supabase/Postgres backend, live classrooms, and one shared design-token pipeline.",
    built:
      "I built the full platform: a Next.js and TypeScript web app, Flutter mobile app, and Supabase/Postgres backend with schema-enforced invariants. A single token source compiles to web CSS and a generated Dart package, with a public Storybook for the system.",
    difficulty:
      "LiveKit rooms required a real-time engine with host moderation. A feature-flag rollout ladder let the platform introduce that capability deliberately across surfaces.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Flutter",
      "Supabase",
      "Postgres",
      "LiveKit",
      "Storybook",
    ],
    pageTitle: "Musterhall Product Engineering Case Study | Steven Hagene",
    pageDescription:
      "How Steven Hagene built Musterhall across Next.js, Flutter, Supabase, Postgres, LiveKit, and a shared cross-platform design-token system.",
    eyebrow: "Case study 01B · Cross-platform product",
    headline: "One product system across every surface.",
    lead:
      "Musterhall is a creator learning platform I built across web, mobile, database, design-system, and real-time room boundaries as the sole engineer.",
    scope: [
      { label: "Role", value: "Sole Engineer" },
      { label: "Domain", value: "Creator learning" },
      { label: "Surfaces", value: "Web, mobile, live rooms" },
    ],
    context: [
      "A cross-platform product can look consistent while quietly implementing different rules in every client. Musterhall needed one coherent product model across a TypeScript web app, Flutter mobile app, and Supabase/Postgres backend.",
      "The hard work was deciding which rules belonged in the database, which foundations should be generated for each interface, and how a real-time capability could enter the product without destabilizing every surface at once.",
    ],
    systemHeading: "Shared rules without pretending the platforms are identical.",
    systemIntro:
      "Each platform keeps its native implementation while receiving product rules and design foundations from deliberate shared sources.",
    system: [
      {
        number: "01",
        title: "Web and mobile products",
        body:
          "Next.js and TypeScript power the web experience while Flutter and Dart provide the mobile surface, with both organized around the same product model.",
      },
      {
        number: "02",
        title: "Schema-enforced invariants",
        body:
          "Supabase and Postgres hold rules that should not drift according to which client happens to write the data.",
      },
      {
        number: "03",
        title: "Compiled design foundations",
        body:
          "A single token source produces web CSS and a generated Dart package, with Storybook making the public component system inspectable.",
      },
    ],
    hardPartHeading: "Real-time rooms change more than the screen.",
    hardPartIntro:
      "Live video introduces authority, moderation, and release risk. The capability needed an operating model as much as it needed an interface.",
    guardrails: [
      {
        title: "Host moderation",
        body:
          "LiveKit rooms include explicit host controls so authority is part of the room model rather than an improvised client-side convention.",
      },
      {
        title: "Feature-flag rollout",
        body:
          "A rollout ladder allows real-time behavior to be introduced deliberately across surfaces instead of forcing one all-or-nothing launch.",
      },
      {
        title: "One visible system",
        body:
          "Generated tokens and public Storybook documentation make cross-platform consistency observable and maintainable.",
      },
    ],
  },
  {
    number: "01C",
    slug: "crimcaseai",
    path: "/work/crimcaseai/",
    name: "CrimCaseAI",
    domain: "Legal intelligence portfolio",
    role: "Principal Engineer",
    problem:
      "Legal teams need useful intelligence from sensitive case material without weakening privilege, provenance, or the operating boundaries of restricted environments.",
    previewBuilt:
      "Case-management and evidence-intelligence systems spanning in-browser ML, local processing, entity graphs, and citation-gated AI.",
    built:
      "The portfolio includes a live case-management SaaS, a generation-two rebuild with schema-generated forms and in-browser ML, and an evidence-intelligence platform serving paying law firms.",
    difficulty:
      "Aegis extends the same work into an on-prem Docker appliance: multimodal ingestion, local OCR and transcription, vector search, entity graphs, and citation-gated AI chat, with privileged data kept on hardware the firm controls.",
    technologies: [
      "In-browser ML",
      "Docker",
      "Local OCR",
      "Transcription",
      "Vector search",
      "Entity graphs",
      "Grounded AI",
    ],
    pageTitle: "CrimCaseAI Legal Intelligence Case Study | Steven Hagene",
    pageDescription:
      "How Steven Hagene builds legal intelligence systems with local processing, multimodal ingestion, vector search, entity graphs, and citation-gated AI.",
    eyebrow: "Case study 01C · Legal intelligence",
    headline: "Useful legal intelligence without losing provenance.",
    lead:
      "CrimCaseAI is a portfolio of case-management and evidence-intelligence systems designed around sensitive material, restricted environments, and answers that must remain traceable to source evidence.",
    scope: [
      { label: "Role", value: "Principal Engineer" },
      { label: "Domain", value: "Legal intelligence" },
      { label: "Boundary", value: "Privileged case material" },
    ],
    context: [
      "Legal teams need software that can make large bodies of case material easier to navigate without weakening privilege, provenance, or control of the underlying evidence.",
      "That creates a different product standard for AI: retrieval must stay connected to source material, processing boundaries must be explicit, and a confident answer without support is a failure state.",
    ],
    systemHeading: "A portfolio built around evidence boundaries.",
    systemIntro:
      "The work moves from case management to evidence intelligence while preserving a consistent emphasis on structured data, local control, and grounded output.",
    system: [
      {
        number: "01",
        title: "Case-management product",
        body:
          "The live SaaS product organizes case work, while a generation-two rebuild uses schema-generated forms and in-browser machine learning to strengthen the application model.",
      },
      {
        number: "02",
        title: "Evidence intelligence",
        body:
          "A separate platform serving paying law firms turns case material into a navigable evidence layer rather than an unstructured document pile.",
      },
      {
        number: "03",
        title: "Aegis on-prem appliance",
        body:
          "Aegis packages multimodal ingestion, local OCR and transcription, vector search, entity graphs, and citation-gated chat into a Docker appliance controlled by the firm.",
      },
    ],
    hardPartHeading: "The answer is only useful if the source survives it.",
    hardPartIntro:
      "The architecture treats provenance, local processing, and citation as product behavior, not implementation details hidden behind the interface.",
    guardrails: [
      {
        title: "Local processing boundary",
        body:
          "The on-prem model keeps privileged material on hardware the firm controls and makes the deployment boundary understandable to the people relying on it.",
      },
      {
        title: "Multimodal provenance",
        body:
          "OCR, transcription, retrieval, and entity relationships remain tied to ingested evidence so analysis can be traced back through the system.",
      },
      {
        title: "Citation-gated output",
        body:
          "AI chat must ground material claims in available evidence rather than turning model confidence into an unsupported product promise.",
      },
    ],
  },
];

export const alsoBuilt = [
  "10+ Astro marketing and municipal sites with token systems and Lighthouse 95+ scores",
  "A Python site-audit engine",
  "A 24/7 autonomous multi-agent business operations system built with Node.js and the Claude API",
] as const;

export const curatedRepos = [
  {
    name: "Quote Extractor",
    repository: "shagene/quote-extractor",
    href: "https://github.com/shagene/quote-extractor",
    description:
      "Schema-enforced LLM quote extraction with deterministic validation and a source-side human review workflow.",
    language: "TypeScript",
    account: "Personal · shagene",
  },
  {
    name: "Restaurant Hours API",
    repository: "shagene/hours-interval-engine",
    href: "https://github.com/shagene/hours-interval-engine",
    description:
      "A tested FastAPI service that normalizes messy schedules into a compact week-minute interval engine.",
    language: "Python",
    account: "Personal · shagene",
  },
  {
    name: "Python SEO Toolkit",
    repository: "shagene/python_seo",
    href: "https://github.com/shagene/python_seo",
    description:
      "A crawler and sitemap-analysis toolkit for technical SEO checks and site-structure visualization.",
    language: "Python",
    account: "Personal · shagene",
  },
  {
    name: "MeetScribe",
    repository: "semperdigitalsolutions/MeetScribe",
    href: "https://github.com/semperdigitalsolutions/MeetScribe",
    description:
      "Local-first macOS transcription tooling built with SwiftUI, ffmpeg, whisper.cpp, structured transcript artifacts, and optional localhost-only Ollama summaries.",
    language: "Swift",
    account: "Semper Digital Solutions · semperdigitalsolutions",
  },
] as const;

export const experiences: Experience[] = [
  {
    company: "Semper Digital Solutions",
    role: "Founder & Principal Engineer",
    period: "2024 – present",
  },
  {
    company: "Endpoint Clinical",
    role: "Senior Software Developer",
    period: "Oct 2024 – Jan 2026",
    detail:
      "Clinical trial software, an SSO frontend, an AI-powered bug-resolution workflow, and Playwright end-to-end testing.",
    concurrent: true,
  },
  {
    company: "Computershare",
    role: "Senior Software Developer / UX Engineer",
    period: "Jun 2021 – Jul 2024",
    detail:
      "Global Design System and a Figma, Token Studio, and Style Dictionary design-to-code pipeline.",
  },
  { company: "Beroe", role: "Software Developer", period: "2018 – 2021", compact: true },
  {
    company: "Judge Consulting",
    role: "Software Developer",
    period: "2017 – 2018",
    compact: true,
  },
  {
    company: "NAVAIR",
    role: "IT Specialist / Web Developer",
    period: "2015 – 2017",
    compact: true,
  },
  {
    company: "United States Marine Corps",
    role: "Sergeant, Communications Specialist",
    period: "2006 – 2011",
    detail:
      "Combat veteran with Marine Corps infantry and MARSOC service. Recipient of multiple Navy and Marine Corps Achievement Medals. First Marine to deploy G-SWAN satellite communications in Iraq. Held TS/SCI clearance.",
  },
];

export const credentials = [
  "SBA-certified SDVOSB/VOSB (2026–2029)",
  "Registered federal contractor",
  "BS Computer Science, Grantham",
] as const;

export const skillGroups = [
  {
    name: "AI & Agent Systems",
    skills: [
      "Multi-agent workflows",
      "Adversarial LLM review",
      "Grounded AI",
      "Local models",
      "Vector search",
      "Entity graphs",
      "OCR & transcription",
      "In-browser ML",
      "Claude API",
    ],
  },
  {
    name: "Full-Stack Product",
    skills: [
      "TypeScript",
      "Node.js",
      "Next.js",
      "Astro",
      "Python",
      "Flutter & Dart",
      "Supabase & Postgres",
      "LiveKit",
      "QuickBooks & Payabli",
    ],
  },
  {
    name: "Frontend & UX",
    skills: [
      "React",
      "Design systems",
      "Design tokens",
      "Figma",
      "Token Studio",
      "Style Dictionary",
      "Storybook",
      "Tailwind CSS",
      "WCAG accessibility",
    ],
  },
  {
    name: "Cloud, Testing & Delivery",
    skills: [
      "Cloudflare Pages",
      "Docker",
      "Playwright",
      "Lighthouse",
      "axe-core",
      "Feature flags",
      "Static delivery",
      "Background workers",
      "Webhooks",
    ],
  },
] as const;

export const resumes = [
  {
    label: "Full-Stack AI Product Engineer resume",
    href: "/resumes/full-stack-ai-product-engineer.pdf",
    available: existsSync(join(process.cwd(), "public/resumes/full-stack-ai-product-engineer.pdf")),
  },
  {
    label: "Senior Frontend / UX Engineer resume",
    href: "/resumes/senior-frontend-ux-engineer.pdf",
    available: existsSync(join(process.cwd(), "public/resumes/senior-frontend-ux-engineer.pdf")),
  },
] as const;
