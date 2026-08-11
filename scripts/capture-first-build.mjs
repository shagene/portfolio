import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const target = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4330";
const phase = process.env.QA_PHASE ?? "presentation-ready";
const outputDirectory = new URL("../qa/screenshots/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 900 },
];
const report = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport, colorScheme: "dark" });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(target, { waitUntil: "networkidle" });
  await page.screenshot({
    path: new URL(`${phase}-hero-${viewport.width}.png`, outputDirectory).pathname,
  });
  await page.screenshot({
    path: new URL(`${phase}-${viewport.width}.png`, outputDirectory).pathname,
    fullPage: true,
  });
  for (const [name, selector] of [
    ["portrait", ".portrait"],
    ["stats", ".stats"],
    ["contact", ".contact-grid"],
    ["semper-home", ".founder-card"],
    ["company-ledger", ".status-ledger"],
    ["claim-boundary", ".claim-boundary"],
  ]) {
    const locator = page.locator(selector);
    if (await locator.count()) {
      await page.evaluate(() => {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      });
      await locator.screenshot({
        path: new URL(`${phase}-${name}-${viewport.width}.png`, outputDirectory).pathname,
        style: ".skip-link { display: none !important; }",
      });
    }
  }

  const measurements = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    heading: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
    sections: [...document.querySelectorAll("main > section")].map((section) => section.id),
    scripts: document.scripts.length,
  }));

  await page.keyboard.press("Tab");
  const firstFocus = await page.evaluate(() => ({
    text: document.activeElement?.textContent?.trim(),
    href: document.activeElement?.getAttribute("href"),
  }));

  report.push({
    viewport,
    ...measurements,
    horizontalOverflow: measurements.scrollWidth > measurements.clientWidth,
    firstFocus,
    consoleErrors,
    pageErrors,
  });
  await page.close();
}

await browser.close();
await writeFile(
  new URL(`../qa/${phase}.json`, import.meta.url),
  `${JSON.stringify(report, null, 2)}\n`,
);

console.log(JSON.stringify(report, null, 2));
