import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [archivo, manrope] = await Promise.all([
  readFile(new URL("../public/fonts/archivo-latin.woff2", import.meta.url)),
  readFile(new URL("../public/fonts/manrope-latin.woff2", import.meta.url)),
]);

const createCard = ({ primary, secondary, descriptor, footer }) => `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <style>
    @font-face { font-family: Archivo; src: url(data:font/woff2;base64,${archivo.toString("base64")}) format("woff2"); }
    @font-face { font-family: Manrope; src: url(data:font/woff2;base64,${manrope.toString("base64")}) format("woff2"); }
    .display { font-family: Archivo, sans-serif; font-weight: 700; letter-spacing: -4px; }
    .body { font-family: Manrope, sans-serif; }
  </style>
  <rect width="1200" height="630" fill="#0c141a" />
  <path d="M0 0H1200M0 157.5H1200M0 315H1200M0 472.5H1200M300 0V630M600 0V630M900 0V630" stroke="#283f50" stroke-width="1" opacity="0.7" />
  <circle cx="1055" cy="80" r="270" fill="#ea7f43" opacity="0.07" />
  <g transform="translate(72 68) scale(.8125)" fill="none" stroke="#ea7f43" stroke-linecap="square" stroke-linejoin="miter">
    <circle cx="32" cy="32" r="27" stroke-width="4" />
    <path d="M29 20H17v12h12v12H17" stroke-width="5" />
    <path d="M35 8v48m0-24h12m0-12v24" stroke-width="5" />
  </g>
  <text x="148" y="102" class="body" font-size="20" font-weight="700" fill="#faf8f3">Steven Hagene</text>
  <text x="72" y="258" class="display" font-size="78" fill="#faf8f3">${primary}</text>
  <text x="72" y="346" class="display" font-size="78" fill="#d5cab9">${secondary}</text>
  <text x="72" y="500" class="body" font-size="24" font-weight="650" fill="#fbcba7">${descriptor}</text>
  <text x="72" y="553" class="body" font-size="18" fill="#b2a592">Clayton, North Carolina · stevenhagene.com</text>
  <text x="1128" y="558" text-anchor="end" class="body" font-size="14" font-weight="700" letter-spacing="2" fill="#ea7f43">${footer}</text>
</svg>`;

const cards = [
  {
    file: "../public/og-image.png",
    primary: "Senior Product Engineer:",
    secondary: "Full-Stack, UX &amp; AI Systems",
    descriptor: "Marine veteran. / SDVOSB founder.",
    footer: "PRODUCT / SYSTEMS / TRUST",
  },
  {
    file: "../public/og-semper.png",
    primary: "Building Semper",
    secondary: "Digital Solutions",
    descriptor: "Founder-led delivery · SBA-Certified SDVOSB &amp; VOSB",
    footer: "FOUNDER / ENGINEERING / READINESS",
  },
  {
    file: "../public/og-work.png",
    primary: "Selected Work",
    secondary: "Systems built for trust",
    descriptor: "Financial SaaS · Cross-platform products · Grounded AI",
    footer: "PRODUCT / SYSTEMS / TRUST",
  },
  {
    file: "../public/og-experience.png",
    primary: "Experience &amp; Skills",
    secondary: "Product meets systems",
    descriptor: "Full-stack engineering · UX systems · AI",
    footer: "2006 / PRESENT",
  },
  {
    file: "../public/og-github.png",
    primary: "Private Systems",
    secondary: "GitHub, in context",
    descriptor: "Private engineering · Two accounts · Public source",
    footer: "WORK / CONTEXT / ACTIVITY",
  },
  {
    file: "../public/og-teo.png",
    primary: "TEO",
    secondary: "Trustworthy financial state",
    descriptor: "QuickBooks · Payabli · Ledgers · Design systems",
    footer: "CASE STUDY / 01A",
  },
  {
    file: "../public/og-musterhall.png",
    primary: "Musterhall",
    secondary: "One cross-platform system",
    descriptor: "Next.js · Flutter · Postgres · LiveKit",
    footer: "CASE STUDY / 01B",
  },
  {
    file: "../public/og-crimcaseai.png",
    primary: "CrimCaseAI",
    secondary: "Grounded legal intelligence",
    descriptor: "Local processing · Evidence graphs · Citation-gated AI",
    footer: "CASE STUDY / 01C",
  },
];

await Promise.all(cards.map(({ file, ...content }) =>
  sharp(Buffer.from(createCard(content))).png({ compressionLevel: 9 }).toFile(
    fileURLToPath(new URL(file, import.meta.url)),
  )
));
