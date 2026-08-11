import { mkdir, writeFile } from "node:fs/promises";
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
const phase = process.env.QA_PHASE ?? "presentation-ready";
const outputDirectory = new URL("../qa/screenshots/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const routeName = (route) => route === "/"
  ? "home"
  : route.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", "-");

const browser = await chromium.launch({ channel: "chrome", headless: true });
const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 900 },
];
const report = [];

for (const route of routes) {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport, colorScheme: "dark" });
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "networkidle" });
    const initialFocus = await page.evaluate(() => {
      const active = document.activeElement;
      const skipLink = document.querySelector(".skip-link");
      const style = skipLink ? getComputedStyle(skipLink) : null;
      const rect = skipLink?.getBoundingClientRect();
      return {
        tag: active?.tagName,
        text: active?.textContent?.trim().slice(0, 80),
        skipLink: rect && style
          ? {
              top: rect.top,
              bottom: rect.bottom,
              transform: style.transform,
              focused: active === skipLink,
            }
          : null,
      };
    });
    const prefix = `${phase}-${routeName(route)}`;
    const firstRegion = page.locator("main > section:first-child, main > article > header:first-child").first();
    if (await firstRegion.count()) {
      await firstRegion.screenshot({
        path: new URL(`${prefix}-opening-${viewport.width}.png`, outputDirectory).pathname,
        style: ".skip-link { display: none !important; }",
      });
    }
    await page.screenshot({
      path: new URL(`${prefix}-${viewport.width}.png`, outputDirectory).pathname,
      fullPage: true,
      style: ".skip-link { display: none !important; }",
    });

    const measurements = await page.evaluate(() => {
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };
      const clippedText = [...document.querySelectorAll("a, p, h1, h2, h3, dd")]
        .filter((element) => visible(element) && element.scrollWidth > element.clientWidth + 1)
        .map((element) => ({
          tag: element.tagName,
          text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 80),
          width: element.clientWidth,
          scrollWidth: element.scrollWidth,
        }));
      const navLinks = [...document.querySelectorAll('nav[aria-label="Primary navigation"] a')]
        .filter(visible)
        .map((link) => {
          const rect = link.getBoundingClientRect();
          return { label: link.textContent?.trim(), width: rect.width, height: rect.height };
        });
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        heading: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
        h1Rect: (() => {
          const rect = document.querySelector("h1")?.getBoundingClientRect();
          return rect ? { width: rect.width, height: rect.height, top: rect.top } : null;
        })(),
        sections: [...document.querySelectorAll("main section")].map((section) => section.id),
        navLinks,
        clippedText,
      };
    });

    await page.keyboard.press("Tab");
    const firstFocus = await page.evaluate(() => ({
      text: document.activeElement?.textContent?.trim(),
      href: document.activeElement?.getAttribute("href"),
    }));

    const failures = [
      ...(measurements.scrollWidth > measurements.clientWidth ? ["horizontal overflow"] : []),
      ...(measurements.clippedText.length > 0 ? ["clipped text"] : []),
      ...(measurements.navLinks.some((link) => link.height < 44) ? ["primary navigation target below 44px"] : []),
      ...(consoleErrors.length > 0 ? ["console errors"] : []),
      ...(pageErrors.length > 0 ? ["page errors"] : []),
    ];

    report.push({
      route,
      viewport,
      ...measurements,
      horizontalOverflow: measurements.scrollWidth > measurements.clientWidth,
      firstFocus,
      initialFocus,
      consoleErrors,
      pageErrors,
      failures,
    });
    await page.close();
  }
}

await browser.close();
await writeFile(
  new URL(`../qa/${phase}-site.json`, import.meta.url),
  `${JSON.stringify(report, null, 2)}\n`,
);

console.log(JSON.stringify(report, null, 2));
if (report.some((result) => result.failures.length > 0)) process.exitCode = 1;
