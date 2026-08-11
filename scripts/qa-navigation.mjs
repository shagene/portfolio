import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4330";
const outputDirectory = new URL("../qa/results/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of [
  { width: 390, height: 844 },
  { width: 1280, height: 900 },
]) {
  const page = await browser.newPage({ viewport, colorScheme: "dark" });
  const failures = [];
  const primaryNavigation = () => page.getByRole("navigation", { name: "Primary navigation" });

  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  const semanticLinks = await page.evaluate(() => {
    const expected = [
      "/work/",
      "/github/",
      "/founder/semper-digital-solutions/",
      "/experience/",
      "/#contact",
      "/work/teo/",
      "/work/musterhall/",
      "/work/crimcaseai/",
    ];
    return expected.map((href) => {
      const element = document.querySelector(`a[href="${href}"]`);
      return {
        href,
        exists: Boolean(element),
        isAnchor: element instanceof HTMLAnchorElement,
        resolvedHref: element instanceof HTMLAnchorElement ? element.href : null,
      };
    });
  });
  if (semanticLinks.some((link) => !link.exists || !link.isAnchor || !link.resolvedHref)) {
    failures.push("one or more primary or case-study destinations are not genuine anchors");
  }
  await primaryNavigation().getByRole("link", { name: "Work", exact: true }).click();
  await page.waitForURL(/\/work\/$/);
  if (!(await page.getByRole("heading", { level: 1, name: "Systems built for the difficult part." }).isVisible())) {
    failures.push("work hub h1 is not visible");
  }

  await page.getByRole("link", { name: "Read the TEO case study" }).click();
  await page.waitForURL(/\/work\/teo\/$/);
  if (!(await page.getByRole("heading", { level: 1, name: "Keeping financial state trustworthy across systems." }).isVisible())) {
    failures.push("TEO case-study h1 is not visible");
  }

  await page.getByRole("navigation", { name: "Case study navigation" })
    .getByRole("link", { name: /Next case study Musterhall/ })
    .click();
  await page.waitForURL(/\/work\/musterhall\/$/);

  await primaryNavigation().getByRole("link", { name: "Experience", exact: true }).click();
  await page.waitForURL(/\/experience\/$/);
  if (!(await page.getByRole("heading", { level: 1, name: "A career connecting product and systems." }).isVisible())) {
    failures.push("experience h1 is not visible");
  }

  await primaryNavigation().getByRole("link", { name: "Semper", exact: true }).click();
  await page.waitForURL(/\/founder\/semper-digital-solutions\/$/);
  if (!(await page.getByRole("heading", { level: 1, name: "Building the company behind the work." }).isVisible())) {
    failures.push("Semper founder h1 is not visible");
  }

  await primaryNavigation().getByRole("link", { name: "GitHub", exact: true }).click();
  await page.waitForURL(/\/github\/$/);
  if (!(await page.getByRole("heading", { level: 1, name: "The strongest work is private. The engineering story is not." }).isVisible())) {
    failures.push("GitHub h1 is not visible");
  }

  await primaryNavigation().getByRole("link", { name: "Contact", exact: true }).click();
  await page.waitForURL(/\/#contact$/);
  if (!(await page.getByRole("heading", { name: "Bring the difficult part." }).isVisible())) {
    failures.push("contact heading is not visible after cross-page navigation");
  }

  const navState = await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label="Primary navigation"]');
    return nav
      ? {
          clientWidth: nav.clientWidth,
          scrollWidth: nav.scrollWidth,
          labels: [...nav.querySelectorAll("a")].map((link) => link.textContent?.trim()),
        }
      : null;
  });
  const expectedLabels = ["Work", "GitHub", "Semper", "Experience", "Contact"];
  if (!navState || JSON.stringify(navState.labels) !== JSON.stringify(expectedLabels)) {
    failures.push("all five primary destinations are not reachable in the expected order");
  }
  if (navState && navState.scrollWidth > navState.clientWidth) {
    failures.push(`primary navigation overflows horizontally (${navState.scrollWidth}px > ${navState.clientWidth}px)`);
  }

  results.push({ viewport, finalUrl: page.url(), semanticLinks, navState, failures });
  await page.close();
}

await browser.close();
await writeFile(
  new URL("navigation.json", outputDirectory),
  `${JSON.stringify(results, null, 2)}\n`,
);

console.log(JSON.stringify(results, null, 2));
if (results.some((result) => result.failures.length > 0)) process.exitCode = 1;
