import { existsSync } from "node:fs";
import { join } from "node:path";

export type Link = {
  label: string;
  href: string;
  kind?: "primary" | "text";
};

export type CaseStudy = {
  number: string;
  name: string;
  domain: string;
  role: string;
  problem: string;
  built: string;
  difficulty: string;
  technologies: string[];
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
  linkedin: "https://www.linkedin.com/in/steven-hagene-32279531",
  canonical: "https://stevenhagene.com",
  semper: {
    name: "Semper Digital Solutions",
    url: "https://www.semperdigitalsolutions.com/",
    aboutUrl: "https://www.semperdigitalsolutions.com/about/",
  },
} as const;

export const navigation = [
  { label: "Selected Work", href: "#work" },
  { label: "Semper", href: "#semper" },
  { label: "GitHub", href: "#github" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroLinks: Link[] = [
  { label: "Email", href: `mailto:${site.email}`, kind: "primary" },
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Resume", href: "#contact" },
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
    number: "02",
    title: "Founder",
    heading: "Building the company behind the work.",
    intro:
      "Semper Digital Solutions is where product judgment, engineering delivery, and company-building meet, with federal readiness built on verified status rather than borrowed credibility.",
  },
  github: {
    number: "03",
    title: "GitHub",
    heading: "Public code, selected for signal.",
    intro:
      "A deliberately small public crop. Most current product and client work lives in private repositories; these samples show the thinking without pretending otherwise.",
  },
  experience: {
    number: "04",
    title: "Experience",
    heading: "From tactical systems to product systems.",
    intro:
      "A career connecting product engineering and interface systems, with Semper and Endpoint shown honestly as concurrent work.",
  },
  skills: {
    number: "05",
    title: "Skills",
    heading: "Breadth with a reason.",
    intro:
      "The working set behind the case studies, grouped by the part of the product it serves rather than a made-up proficiency score.",
  },
  contact: {
    number: "06",
    title: "Contact",
    heading: "Bring the difficult part.",
    intro: "The shortest route is email. For work history and code, use the links below.",
  },
  footer: {
    identity: "Steven Hagene · Senior Product Engineer",
    build: "Built with Astro, a three-layer token system, and no client-side framework.",
  },
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
    backLink: "← Portfolio / Founder",
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
    secondaryLabel: "Return to selected work",
  },
} as const;

export const caseStudies: CaseStudy[] = [
  {
    number: "01A",
    name: "TEO",
    domain: "Property-management financial SaaS",
    role: "Lead Full-Stack Engineer",
    problem:
      "A financial product has to preserve one trustworthy account of an invoice while QuickBooks, hosted checkout, webhooks, and background jobs all change it.",
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
  },
  {
    number: "01B",
    name: "Musterhall",
    domain: "Creator learning platform",
    role: "Sole Engineer",
    problem:
      "One learning product needed to behave coherently across web, mobile, real-time rooms, and a database with product rules that could not drift by client.",
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
  },
  {
    number: "01C",
    name: "CrimCaseAI",
    domain: "Legal intelligence portfolio",
    role: "Principal Engineer",
    problem:
      "Legal teams need useful intelligence from sensitive case material without weakening privilege, provenance, or the operating boundaries of restricted environments.",
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
  },
  {
    name: "Restaurant Hours API",
    repository: "shagene/hours-interval-engine",
    href: "https://github.com/shagene/hours-interval-engine",
    description:
      "A tested FastAPI service that normalizes messy schedules into a compact week-minute interval engine.",
    language: "Python",
  },
  {
    name: "Python SEO Toolkit",
    repository: "shagene/python_seo",
    href: "https://github.com/shagene/python_seo",
    description:
      "A crawler and sitemap-analysis toolkit for technical SEO checks and site-structure visualization.",
    language: "Python",
  },
  {
    name: "Component System Explorer",
    repository: "shagene/cs-components",
    href: "https://github.com/shagene/cs-components",
    description:
      "A broad TypeScript component catalog spanning controls, navigation, content containers, and system states.",
    language: "TypeScript",
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
      "Combat veteran. MARSOC support. First Marine to deploy G-SWAN satellite communications in Iraq. Held TS/SCI.",
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
