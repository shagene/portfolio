import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4330";
const routes = (process.env.PORTFOLIO_PATHS ?? [
  "/",
  "/work/",
  "/work/teo/",
  "/work/musterhall/",
  "/work/crimcaseai/",
  "/experience/",
  "/founder/semper-digital-solutions/",
].join(","))
  .split(",")
  .map((path) => path.trim());
const expectedSchema = (route) => {
  if (route === "/work/") return "CollectionPage";
  if (route.startsWith("/work/") && route !== "/work/") return "Article";
  if (route === "/experience/" || route === "/founder/semper-digital-solutions/") {
    return "ProfilePage";
  }
  return null;
};
const outputDirectory = new URL("../qa/results/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 900 },
];
const results = [];

for (const route of routes) {
for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, colorScheme: "dark" });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "networkidle" });
  const axe = await new AxeBuilder({ page }).analyze();
  const geometry = await page.evaluate(() => {
    const root = document.documentElement;
    const email = document.querySelector(".email-panel > a");
    const stats = [...document.querySelectorAll(".stats > div")];
    const portrait = document.querySelector(".portrait img");
    const emailStyle = email ? getComputedStyle(email) : null;
    const emailRect = email?.getBoundingClientRect();

    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => {
        try {
          return JSON.parse(script.textContent ?? "{}");
        } catch {
          return { "@type": "INVALID_JSON" };
        }
      });

    return {
      clientWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
      sectionIds: [...document.querySelectorAll("main > section")].map((section) => section.id),
      email: emailRect && emailStyle
        ? {
            width: emailRect.width,
            height: emailRect.height,
            scrollWidth: email.scrollWidth,
            lineHeight: Number.parseFloat(emailStyle.lineHeight),
            whiteSpace: emailStyle.whiteSpace,
          }
        : null,
      statsWidths: stats.map((cell) => cell.getBoundingClientRect().width),
      portraitTransform: portrait ? getComputedStyle(portrait).transform : null,
      scripts: [...document.scripts].map((script) => script.type || "text/javascript"),
      metadata: {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content"),
        ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content"),
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
        h1Count: document.querySelectorAll("h1").length,
        schemaTypes: schemas.map((schema) => schema["@type"]),
      },
      oldRepoLinks: [...document.links]
        .map((link) => link.href)
        .filter((href) => href.includes("fde-case-study") || href.includes("line-take-home")),
    };
  });
  const contrastRatios = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    const token = (name) => styles.getPropertyValue(name).trim();
    const rgb = (hex) => [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
    const luminance = (hex) => rgb(hex)
      .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
      .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
    const ratio = (foreground, background) => {
      const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
      return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
    };
    const copper = token("--primitive-copper-400");
    const copperSoft = token("--primitive-copper-200");
    const canvas = token("--primitive-charcoal-975");
    const raised = token("--primitive-steel-925");
    const strong = token("--primitive-steel-900");
    return {
      "copper/canvas": ratio(copper, canvas),
      "copper/raised": ratio(copper, raised),
      "copper/strong": ratio(copper, strong),
      "copper-soft/canvas": ratio(copperSoft, canvas),
    };
  });

  await page.keyboard.press("Tab");
  const skipLink = await page.evaluate(() => {
    const active = document.activeElement;
    if (!(active instanceof HTMLElement)) return null;
    const style = getComputedStyle(active);
    return {
      text: active.textContent?.trim(),
      href: active.getAttribute("href"),
      visible: style.display !== "none" && style.visibility !== "hidden" && active.getBoundingClientRect().height > 0,
      outlineWidth: style.outlineWidth,
    };
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  const reducedMotionScrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );

  const statsWidthDelta = geometry.statsWidths.length > 0
    ? Math.max(...geometry.statsWidths) - Math.min(...geometry.statsWidths)
    : 0;
  const failures = [
    ...(geometry.scrollWidth > geometry.clientWidth ? ["horizontal overflow"] : []),
    ...(geometry.email && geometry.email.scrollWidth > geometry.email.width + 1 ? ["email overflow"] : []),
    ...(geometry.email && geometry.email.height > geometry.email.lineHeight * 1.5 ? ["email wraps"] : []),
    ...(statsWidthDelta > 1 ? [`stats cells differ by ${statsWidthDelta}px`] : []),
    ...(geometry.oldRepoLinks.length > 0 ? ["old repository URL remains"] : []),
    ...(axe.violations.length > 0 ? [`${axe.violations.length} axe violation groups`] : []),
    ...(consoleErrors.length > 0 ? ["console errors"] : []),
    ...(pageErrors.length > 0 ? ["page errors"] : []),
    ...(!geometry.metadata.title ? ["missing page title"] : []),
    ...(!geometry.metadata.description ? ["missing meta description"] : []),
    ...(geometry.metadata.ogTitle !== geometry.metadata.title ? ["Open Graph title differs from page title"] : []),
    ...(geometry.metadata.ogDescription !== geometry.metadata.description
      ? ["Open Graph description differs from meta description"]
      : []),
    ...(!geometry.metadata.ogImage ? ["missing Open Graph image"] : []),
    ...(geometry.metadata.canonical !== new URL(route, "https://stevenhagene.com").toString()
      ? [`incorrect canonical: ${geometry.metadata.canonical}`]
      : []),
    ...(geometry.metadata.h1Count !== 1 ? [`expected one h1, found ${geometry.metadata.h1Count}`] : []),
    ...(geometry.metadata.schemaTypes.includes("INVALID_JSON") ? ["invalid JSON-LD"] : []),
    ...(expectedSchema(route) && !geometry.metadata.schemaTypes.includes(expectedSchema(route))
      ? [`page is missing ${expectedSchema(route)} schema`]
      : []),
    ...(!skipLink?.visible || skipLink.href !== "#main-content" ? ["skip link is not first visible focus"] : []),
    ...(reducedMotionScrollBehavior !== "auto" ? ["reduced-motion scroll behavior is not auto"] : []),
    ...Object.entries(contrastRatios)
      .filter(([, ratio]) => ratio < 4.5)
      .map(([pair, ratio]) => `${pair} contrast is ${ratio}:1`),
  ];

  results.push({
    route,
    viewport,
    geometry,
    statsWidthDelta,
    skipLink,
    reducedMotionScrollBehavior,
    contrastRatios,
    axe: {
      violations: axe.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        nodes: violation.nodes.map((node) => node.target),
      })),
      passes: axe.passes.length,
      incomplete: axe.incomplete.map((item) => ({
        id: item.id,
        impact: item.impact,
        nodeCount: item.nodes.length,
        samples: item.nodes.slice(0, 3).map((node) => node.target),
      })),
    },
    consoleErrors,
    pageErrors,
    failures,
  });
  await context.close();
}
}

const routeTitles = routes.map((route) =>
  results.find((result) => result.route === route)?.geometry.metadata.title,
);
if (new Set(routeTitles).size !== routes.length) {
  for (const result of results) result.failures.push("page titles are not unique across routes");
}

const requestContext = await browser.newContext();
const request = await requestContext.newPage();
const assetChecks = [];
for (const path of [
  "/resumes/full-stack-ai-product-engineer.pdf",
  "/resumes/senior-frontend-ux-engineer.pdf",
  "/robots.txt",
  "/sitemap-index.xml",
  "/og-image.png",
  "/og-semper.png",
  "/og-work.png",
  "/og-experience.png",
  "/og-teo.png",
  "/og-musterhall.png",
  "/og-crimcaseai.png",
]) {
  const response = await request.request.get(new URL(path, baseUrl).toString());
  assetChecks.push({ path, status: response.status(), contentType: response.headers()["content-type"] });
}
await requestContext.close();
await browser.close();

const report = { results, assetChecks };
await writeFile(
  new URL("browser-accessibility.json", outputDirectory),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(report, null, 2));

const failed = results.some((result) => result.failures.length > 0)
  || assetChecks.some((check) => check.status !== 200);
if (failed) process.exitCode = 1;
