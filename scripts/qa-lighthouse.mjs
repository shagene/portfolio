import { mkdir, writeFile } from "node:fs/promises";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4330";
const routes = (process.env.PORTFOLIO_PATHS ?? [
  "/",
  "/work/",
  "/work/teo/",
  "/work/musterhall/",
  "/work/crimcaseai/",
  "/experience/",
  "/founder/semper-digital-solutions/",
  "/github/",
].join(","))
  .split(",")
  .map((path) => path.trim());
const outputDirectory = new URL("../qa/results/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const chrome = await launch({
  chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
});
const results = [];

try {
  const audits = [
    { route: "/", formFactor: "desktop" },
    ...routes.map((route) => ({ route, formFactor: "mobile" })),
    {
      route: "/404.html",
      formFactor: "mobile",
      categories: ["performance", "accessibility", "best-practices"],
    },
  ];

  for (const audit of audits) {
    const runner = await lighthouse(
      new URL(audit.route, baseUrl).toString(),
      {
        port: chrome.port,
        logLevel: "error",
        output: "json",
        onlyCategories: audit.categories
          ?? ["performance", "accessibility", "best-practices", "seo"],
      },
      audit.formFactor === "desktop" ? desktopConfig : undefined,
    );

    if (!runner) throw new Error(`Lighthouse returned no result for ${audit.route}`);
    const scores = Object.fromEntries(
      Object.entries(runner.lhr.categories).map(([key, category]) => [
        key,
        Math.round((category.score ?? 0) * 100),
      ]),
    );
    const result = {
      route: audit.route,
      formFactor: audit.formFactor,
      finalUrl: runner.lhr.finalDisplayedUrl,
      scores,
      warnings: runner.lhr.runWarnings,
      indexable: audit.route !== "/404.html",
    };
    results.push(result);
    console.log(JSON.stringify(result));
  }
} finally {
  chrome.kill();
}

await writeFile(
  new URL("lighthouse-multipage-summary.json", outputDirectory),
  `${JSON.stringify(results, null, 2)}\n`,
);

const failed = results.some((result) =>
  Object.values(result.scores).some((score) => score < 95) || result.warnings.length > 0,
);
if (failed) process.exitCode = 1;
