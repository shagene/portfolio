import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4330";
const outputDirectory = new URL("../qa/results/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];

for (const viewport of [
  { width: 390, height: 844 },
  { width: 1280, height: 900 },
]) {
  const page = await browser.newPage({ viewport, colorScheme: "dark" });
  const failures = [];

  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  await page.getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Semper" })
    .click();
  await page.waitForURL(/\/#semper$/);

  const founderHeading = page.getByRole("heading", { name: "Building the company behind the work." });
  if (!(await founderHeading.isVisible())) failures.push("homepage founder heading is not visible");

  await page.getByRole("link", { name: /Read the founder case study/ }).click();
  await page.waitForURL(/\/founder\/semper-digital-solutions\/$/);
  const caseStudyHeading = page.getByRole("heading", {
    level: 1,
    name: "Building the company behind the work.",
  });
  if (!(await caseStudyHeading.isVisible())) failures.push("founder page h1 is not visible");

  await page.getByRole("link", { name: /Portfolio \/ Founder/ }).click();
  await page.waitForURL(/\/#semper$/);
  if (!(await founderHeading.isVisible())) failures.push("back link did not return to the founder section");

  results.push({ viewport, finalUrl: page.url(), failures });
  await page.close();
}

await browser.close();
await writeFile(
  new URL("navigation.json", outputDirectory),
  `${JSON.stringify(results, null, 2)}\n`,
);

console.log(JSON.stringify(results, null, 2));
if (results.some((result) => result.failures.length > 0)) process.exitCode = 1;
