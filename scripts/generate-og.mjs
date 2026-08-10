import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [archivo, manrope] = await Promise.all([
  readFile(new URL("../public/fonts/archivo-latin.woff2", import.meta.url)),
  readFile(new URL("../public/fonts/manrope-latin.woff2", import.meta.url)),
]);

const svg = `
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
  <rect x="72" y="68" width="52" height="52" rx="26" fill="none" stroke="#ea7f43" stroke-width="2" />
  <text x="98" y="101" text-anchor="middle" class="body" font-size="14" font-weight="800" letter-spacing="1.5" fill="#ea7f43">SH</text>
  <text x="148" y="102" class="body" font-size="20" font-weight="700" fill="#faf8f3">Steven Hagene</text>
  <text x="72" y="258" class="display" font-size="78" fill="#faf8f3">Senior Product Engineer:</text>
  <text x="72" y="346" class="display" font-size="78" fill="#d5cab9">Full-Stack, UX &amp; AI Systems</text>
  <text x="72" y="500" class="body" font-size="24" font-weight="650" fill="#fbcba7">Marine veteran. / SDVOSB founder.</text>
  <text x="72" y="553" class="body" font-size="18" fill="#b2a592">Clayton, North Carolina · stevenhagene.com</text>
  <text x="1128" y="558" text-anchor="end" class="body" font-size="14" font-weight="700" letter-spacing="2" fill="#ea7f43">PRODUCT / SYSTEMS / TRUST</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(
  fileURLToPath(new URL("../public/og-image.png", import.meta.url)),
);
