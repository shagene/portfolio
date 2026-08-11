import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4330";
const canonicalOrigin = "https://stevenhagene.com";
const defaultPublicRoutes = [
  "/",
  "/work/",
  "/work/teo/",
  "/work/musterhall/",
  "/work/crimcaseai/",
  "/github/",
  "/experience/",
  "/founder/semper-digital-solutions/",
];
const publicRoutes = (process.env.PORTFOLIO_PATHS ?? defaultPublicRoutes.join(","))
  .split(",")
  .map((path) => path.trim())
  .filter(Boolean);
const notFoundRoute = "/zzz-does-not-exist/";
const routes = [...new Set([...publicRoutes, notFoundRoute])];
const expectedNavigation = [
  ["Work", "/work/"],
  ["GitHub", "/github/"],
  ["Semper", "/founder/semper-digital-solutions/"],
  ["Experience", "/experience/"],
  ["Contact", "/#contact"],
];
const expectedCaseStudyRoutes = ["/work/teo/", "/work/musterhall/", "/work/crimcaseai/"];
const expectedSchema = (route) => {
  if (route === "/work/") return "CollectionPage";
  if (route.startsWith("/work/") && route !== "/work/") return "Article";
  if (route === "/github/" || route === "/experience/" || route === "/founder/semper-digital-solutions/") {
    return "ProfilePage";
  }
  return null;
};
const expectedOgType = (route) => {
  if (route === notFoundRoute || route === "/work/") return "website";
  if (route.startsWith("/work/") || route === "/founder/semper-digital-solutions/") return "article";
  return "profile";
};
const expectedOgImage = (route) => ({
  "/": "/og-image.png",
  "/work/": "/og-work.png",
  "/work/teo/": "/og-teo.png",
  "/work/musterhall/": "/og-musterhall.png",
  "/work/crimcaseai/": "/og-crimcaseai.png",
  "/github/": "/og-github.png",
  "/experience/": "/og-experience.png",
  "/founder/semper-digital-solutions/": "/og-semper.png",
  [notFoundRoute]: "/og-image.png",
}[route]);
const expectedCanonical = (route) => new URL(
  route === notFoundRoute ? "/404/" : route,
  canonicalOrigin,
).toString();
const outputDirectory = new URL("../qa/results/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 900 },
];
const results = [];

const inspectKeyboardTraversal = async (page) => {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo(0, 0);
  });

  const expectedCount = await page.evaluate(() => {
    const selector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");
    return [...new Set(document.querySelectorAll(selector))].filter((element) => {
      if (!(element instanceof HTMLElement || element instanceof SVGElement)) return false;
      const style = getComputedStyle(element);
      return element.tabIndex >= 0
        && style.display !== "none"
        && style.visibility !== "hidden"
        && element.getClientRects().length > 0;
    }).length;
  });

  const traversal = [];
  const visited = new Set();
  let cycledToStart = false;
  let firstIndex = null;
  for (let step = 0; step < expectedCount + 4; step += 1) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(75);
    const focus = await page.evaluate(() => {
      const selector = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",");
      const eligible = [...new Set(document.querySelectorAll(selector))].filter((element) => {
        if (!(element instanceof HTMLElement || element instanceof SVGElement)) return false;
        const style = getComputedStyle(element);
        return element.tabIndex >= 0
          && style.display !== "none"
          && style.visibility !== "hidden"
          && element.getClientRects().length > 0;
      });
      const active = document.activeElement;
      if (!(active instanceof HTMLElement || active instanceof SVGElement)) return null;
      const style = getComputedStyle(active);
      const rect = active.getBoundingClientRect();
      const outlineWidth = Number.parseFloat(style.outlineWidth) || 0;
      const visibleInViewport = rect.width > 0
        && rect.height > 0
        && rect.right > 0
        && rect.bottom > 0
        && rect.left < innerWidth
        && rect.top < innerHeight;
      return {
        index: eligible.indexOf(active),
        tag: active.tagName,
        text: active.textContent?.replace(/\s+/g, " ").trim().slice(0, 100) ?? "",
        href: active instanceof HTMLAnchorElement ? active.getAttribute("href") : null,
        outlineWidth,
        outlineStyle: style.outlineStyle,
        outlineColor: style.outlineColor,
        visibleInViewport,
      };
    });

    if (!focus || focus.index < 0) continue;
    if (firstIndex === null) firstIndex = focus.index;
    else if (focus.index === firstIndex) {
      cycledToStart = true;
      break;
    }
    traversal.push(focus);
    visited.add(focus.index);
    if (visited.size === expectedCount) break;
  }

  return {
    expectedCount,
    visitedCount: visited.size,
    complete: expectedCount > 0 && visited.size === expectedCount,
    cycledToStart,
    first: traversal[0] ?? null,
    focusFailures: traversal
      .filter((item) => item.outlineWidth < 2
        || item.outlineStyle === "none"
        || item.outlineColor === "rgba(0, 0, 0, 0)"
        || !item.visibleInViewport)
      .map((item) => ({
        tag: item.tag,
        text: item.text,
        href: item.href,
        outlineWidth: item.outlineWidth,
        outlineStyle: item.outlineStyle,
        outlineColor: item.outlineColor,
        visibleInViewport: item.visibleInViewport,
      })),
    traversal,
  };
};

for (const route of routes) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport,
      colorScheme: "dark",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const navigationResponse = await page.goto(new URL(route, baseUrl).toString(), {
      waitUntil: "networkidle",
    });
    const status = navigationResponse?.status() ?? null;
    const axe = await new AxeBuilder({ page }).analyze();
    const geometry = await page.evaluate(({ route, notFoundRoute }) => {
      const root = document.documentElement;
      const email = document.querySelector(".email-panel > a");
      const stats = [...document.querySelectorAll(".stats > div")];
      const portrait = document.querySelector(".portrait img");
      const emailStyle = email ? getComputedStyle(email) : null;
      const emailRect = email?.getBoundingClientRect();
      const heatmapPanel = document.querySelector(".heatmap-panel");
      const heatmapScroll = document.querySelector(".heatmap-scroll");
      const heatmap = document.querySelector(".heatmap");
      const headerLogo = document.querySelector("header .logo-mark");
      const panelRect = heatmapPanel?.getBoundingClientRect();
      const wrapperRect = heatmapScroll?.getBoundingClientRect();
      const heatmapRect = heatmap?.getBoundingClientRect();

      const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((script) => {
          try {
            return JSON.parse(script.textContent ?? "{}");
          } catch {
            return { "@type": "INVALID_JSON" };
          }
        });
      const person = schemas.find((schema) => schema["@type"] === "Person");
      const readCaseStudy = [...document.querySelectorAll("a")]
        .filter((element) => element.textContent?.includes("Read case study"))
        .map((element) => ({ tag: element.tagName, href: element.getAttribute("href") }));
      const exploreAll = [...document.querySelectorAll("a")]
        .filter((element) => element.textContent?.includes("Explore all selected work"))
        .map((element) => ({ tag: element.tagName, href: element.getAttribute("href") }));
      const navItems = [...document.querySelectorAll("header nav li > *")].map((element) => ({
        tag: element.tagName,
        text: element.textContent?.replace(/\s+/g, " ").trim() ?? "",
        href: element.getAttribute("href"),
      }));
      const metadataValue = (selector, attribute = "content") =>
        document.querySelector(selector)?.getAttribute(attribute) ?? null;

      return {
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        sectionIds: [...document.querySelectorAll("main > section")].map((section) => section.id),
        mainText: document.querySelector("main")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
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
        headerLogo: headerLogo ? {
          width: headerLogo.getBoundingClientRect().width,
          height: headerLogo.getBoundingClientRect().height,
          role: headerLogo.getAttribute("role"),
          accessibleNameReference: headerLogo.getAttribute("aria-labelledby"),
          hasTitle: Boolean(headerLogo.querySelector("title")),
        } : null,
        scripts: [...document.scripts].map((script) => script.type || "text/javascript"),
        heatmap: heatmapPanel && heatmapScroll && heatmap && panelRect && wrapperRect && heatmapRect
          ? {
              panelLeft: panelRect.left,
              panelRight: panelRect.right,
              wrapperLeft: wrapperRect.left,
              wrapperRight: wrapperRect.right,
              wrapperClientWidth: heatmapScroll.clientWidth,
              wrapperScrollWidth: heatmapScroll.scrollWidth,
              wrapperOverflowX: getComputedStyle(heatmapScroll).overflowX,
              svgWidth: heatmapRect.width,
              containedByPanel: wrapperRect.left >= panelRect.left - 1
                && wrapperRect.right <= panelRect.right + 1,
              containedByViewport: wrapperRect.left >= -1 && wrapperRect.right <= root.clientWidth + 1,
            }
          : null,
        metadata: {
          title: document.title,
          description: metadataValue('meta[name="description"]'),
          robots: metadataValue('meta[name="robots"]'),
          canonical: metadataValue('link[rel="canonical"]', "href"),
          ogType: metadataValue('meta[property="og:type"]'),
          ogTitle: metadataValue('meta[property="og:title"]'),
          ogDescription: metadataValue('meta[property="og:description"]'),
          ogUrl: metadataValue('meta[property="og:url"]'),
          ogImage: metadataValue('meta[property="og:image"]'),
          ogImageWidth: metadataValue('meta[property="og:image:width"]'),
          ogImageHeight: metadataValue('meta[property="og:image:height"]'),
          ogImageAlt: metadataValue('meta[property="og:image:alt"]'),
          twitterCard: metadataValue('meta[name="twitter:card"]'),
          twitterTitle: metadataValue('meta[name="twitter:title"]'),
          twitterDescription: metadataValue('meta[name="twitter:description"]'),
          twitterImage: metadataValue('meta[name="twitter:image"]'),
          twitterImageAlt: metadataValue('meta[name="twitter:image:alt"]'),
          faviconSvg: metadataValue('link[rel="icon"][type="image/svg+xml"]', "href"),
          faviconIco: metadataValue('link[rel="alternate icon"]', "href"),
          appleTouchIcon: metadataValue('link[rel="apple-touch-icon"]', "href"),
          h1Count: document.querySelectorAll("h1").length,
          schemaTypes: schemas.map((schema) => schema["@type"]),
          person: person ? {
            id: person["@id"],
            name: person.name,
            url: person.url,
            image: person.image,
            jobTitle: person.jobTitle,
            sameAs: person.sameAs,
            worksFor: person.worksFor?.name,
          } : null,
        },
        semantics: {
          navItems,
          readCaseStudy,
          exploreAll,
          anchorsWithoutHref: [...document.querySelectorAll("a:not([href])")].length,
          nonAnchorLinkControls: [...document.querySelectorAll(
            '[role="link"]:not(a), button[data-href], [onclick]:not(a)',
          )].map((element) => ({
            tag: element.tagName,
            text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 100) ?? "",
          })),
        },
        oldRepoReferences: (document.documentElement.innerHTML.match(
          /fde-case-study|line-take-home/gi,
        ) ?? []),
        notFound: route === notFoundRoute ? {
          heading: document.querySelector("h1")?.textContent?.trim() ?? "",
          hasBrandMark: Boolean(document.querySelector(".error-mark .logo-mark")),
          hasHomeLink: Boolean(document.querySelector('main a[href="/"]')),
          hasWorkLink: Boolean(document.querySelector('main a[href="/work/"]')),
        } : null,
      };
    }, { route, notFoundRoute });

    const contrast = await page.evaluate(() => {
      const resolvedColor = (tokenName) => {
        const probe = document.createElement("span");
        probe.style.color = `var(${tokenName})`;
        document.body.append(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return color;
      };
      const channels = (color) => {
        const match = color.match(/[\d.]+/g);
        if (!match || match.length < 3) return null;
        return match.slice(0, 3).map((value) => Number(value) / 255);
      };
      const luminance = (color) => {
        const rgb = channels(color);
        if (!rgb) return null;
        return rgb
          .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
          .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
      };
      const ratio = (foreground, background) => {
        const foregroundLuminance = luminance(foreground);
        const backgroundLuminance = luminance(background);
        if (foregroundLuminance === null || backgroundLuminance === null) return null;
        const [lighter, darker] = [foregroundLuminance, backgroundLuminance].sort((a, b) => b - a);
        return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
      };
      const definitions = [
        ["copper/canvas", "--primitive-copper-400", "--primitive-charcoal-975", 4.5],
        ["copper/raised", "--primitive-copper-400", "--primitive-steel-925", 4.5],
        ["copper/strong", "--primitive-copper-400", "--primitive-steel-900", 4.5],
        ["copper-soft/canvas", "--primitive-copper-200", "--primitive-charcoal-975", 4.5],
        ["logo-dark/canvas", "--logo-mark-dark", "--primitive-charcoal-975", 3],
        ["logo-dark/raised", "--logo-mark-dark", "--primitive-steel-925", 3],
        ["logo-light/mineral", "--logo-mark-light", "--primitive-mineral-50", 3],
      ];
      return Object.fromEntries(definitions.map(([name, foregroundToken, backgroundToken, threshold]) => {
        const foreground = resolvedColor(foregroundToken);
        const background = resolvedColor(backgroundToken);
        return [name, { foreground, background, ratio: ratio(foreground, background), threshold }];
      }));
    });

    const keyboard = await inspectKeyboardTraversal(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const reducedMotionScrollBehavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );

    const statsWidthDelta = geometry.statsWidths.length > 0
      ? Math.max(...geometry.statsWidths) - Math.min(...geometry.statsWidths)
      : 0;
    const expectedNav = JSON.stringify(expectedNavigation.map(([text, href]) => ({
      tag: "A",
      text,
      href,
    })));
    const actualNav = JSON.stringify(geometry.semantics.navItems);
    const robotsTokens = (geometry.metadata.robots ?? "")
      .toLowerCase()
      .split(/[\s,]+/)
      .filter(Boolean);
    const isNotFound = route === notFoundRoute;
    const failures = [
      ...(status !== (isNotFound ? 404 : 200) ? [`HTTP status is ${status}, expected ${isNotFound ? 404 : 200}`] : []),
      ...(geometry.scrollWidth > geometry.clientWidth + 1 ? ["root horizontal overflow"] : []),
      ...(geometry.email && geometry.email.scrollWidth > geometry.email.width + 1 ? ["email overflow"] : []),
      ...(geometry.email && geometry.email.height > geometry.email.lineHeight * 1.5 ? ["email wraps"] : []),
      ...(statsWidthDelta > 1 ? [`stats cells differ by ${statsWidthDelta}px`] : []),
      ...(geometry.oldRepoReferences.length > 0 ? ["old repository URL remains"] : []),
      ...(axe.violations.length > 0 ? [`${axe.violations.length} axe violation groups`] : []),
      ...(consoleErrors.length > 0 && !(
        isNotFound
        && consoleErrors.every((message) => message.includes("status of 404"))
      ) ? ["unexpected console errors"] : []),
      ...(pageErrors.length > 0 ? ["page errors"] : []),
      ...(!geometry.metadata.title ? ["missing page title"] : []),
      ...(!geometry.metadata.description ? ["missing meta description"] : []),
      ...(!geometry.metadata.robots ? ["missing robots metadata"] : []),
      ...(geometry.metadata.ogTitle !== geometry.metadata.title ? ["Open Graph title differs from page title"] : []),
      ...(geometry.metadata.ogDescription !== geometry.metadata.description
        ? ["Open Graph description differs from meta description"]
        : []),
      ...(geometry.metadata.ogType !== expectedOgType(route)
        ? [`Open Graph type is ${geometry.metadata.ogType}, expected ${expectedOgType(route)}`]
        : []),
      ...(geometry.metadata.ogUrl !== geometry.metadata.canonical
        ? ["Open Graph URL differs from canonical"]
        : []),
      ...(!geometry.metadata.ogImage ? ["missing Open Graph image"] : []),
      ...(geometry.metadata.ogImage !== new URL(expectedOgImage(route), canonicalOrigin).toString()
        ? [`incorrect Open Graph image: ${geometry.metadata.ogImage}`]
        : []),
      ...(geometry.metadata.ogImageWidth !== "1200" || geometry.metadata.ogImageHeight !== "630"
        ? ["Open Graph image dimensions metadata is not 1200x630"]
        : []),
      ...(!geometry.metadata.ogImageAlt ? ["missing Open Graph image alt"] : []),
      ...(geometry.metadata.twitterCard !== "summary_large_image" ? ["incorrect Twitter card"] : []),
      ...(geometry.metadata.twitterTitle !== geometry.metadata.title ? ["Twitter title differs from page title"] : []),
      ...(geometry.metadata.twitterDescription !== geometry.metadata.description
        ? ["Twitter description differs from meta description"]
        : []),
      ...(geometry.metadata.twitterImage !== geometry.metadata.ogImage
        ? ["Twitter image differs from Open Graph image"]
        : []),
      ...(geometry.metadata.twitterImageAlt !== geometry.metadata.ogImageAlt
        ? ["Twitter image alt differs from Open Graph image alt"]
        : []),
      ...(geometry.metadata.canonical !== expectedCanonical(route)
        ? [`incorrect canonical: ${geometry.metadata.canonical}`]
        : []),
      ...(geometry.metadata.faviconSvg !== "/favicon.svg" ? ["missing SVG favicon link"] : []),
      ...(geometry.metadata.faviconIco !== "/favicon.ico" ? ["missing ICO favicon fallback link"] : []),
      ...(geometry.metadata.appleTouchIcon !== "/apple-touch-icon.png" ? ["missing Apple touch icon link"] : []),
      ...(!geometry.headerLogo
        || Math.abs(geometry.headerLogo.width - 32) > 0.5
        || Math.abs(geometry.headerLogo.height - 32) > 0.5
        || geometry.headerLogo.role !== "img"
        || !geometry.headerLogo.accessibleNameReference
        || !geometry.headerLogo.hasTitle
        ? ["navigation logo is not an accessible 32px SVG"]
        : []),
      ...(geometry.metadata.h1Count !== 1 ? [`expected one h1, found ${geometry.metadata.h1Count}`] : []),
      ...(geometry.metadata.schemaTypes.includes("INVALID_JSON") ? ["invalid JSON-LD"] : []),
      ...(expectedSchema(route) && !geometry.metadata.schemaTypes.includes(expectedSchema(route))
        ? [`page is missing ${expectedSchema(route)} schema`]
        : []),
      ...(actualNav !== expectedNav ? ["primary navigation is not the expected set of genuine anchors"] : []),
      ...(geometry.semantics.anchorsWithoutHref > 0 ? ["anchor without href"] : []),
      ...(geometry.semantics.nonAnchorLinkControls.length > 0 ? ["non-anchor link control found"] : []),
      ...(route === "/" && (
        geometry.semantics.readCaseStudy.length !== 3
        || JSON.stringify(geometry.semantics.readCaseStudy.map((item) => item.href).sort())
          !== JSON.stringify([...expectedCaseStudyRoutes].sort())
        || geometry.semantics.readCaseStudy.some((item) => item.tag !== "A")
      ) ? ["homepage case-study links are not three genuine anchors"] : []),
      ...(route === "/" && (
        geometry.semantics.exploreAll.length !== 1
        || geometry.semantics.exploreAll[0]?.tag !== "A"
        || geometry.semantics.exploreAll[0]?.href !== "/work/"
      ) ? ["homepage all-work link is not a genuine anchor"] : []),
      ...(!keyboard.complete
        ? [`keyboard traversal reached ${keyboard.visitedCount} of ${keyboard.expectedCount} focusable elements`]
        : []),
      ...(keyboard.first?.href !== "#main-content" ? ["skip link is not first in keyboard order"] : []),
      ...(keyboard.focusFailures.length > 0
        ? [`${keyboard.focusFailures.length} keyboard targets lack a visible 2px focus indicator`]
        : []),
      ...(reducedMotionScrollBehavior !== "auto" ? ["reduced-motion scroll behavior is not auto"] : []),
      ...(geometry.scripts.some((type) => type !== "application/ld+json")
        ? ["unexpected client-side script is present"]
        : []),
      ...Object.entries(contrast)
        .filter(([, check]) => check.ratio === null || check.ratio < check.threshold)
        .map(([pair, check]) => `${pair} contrast is ${check.ratio}:1; expected ${check.threshold}:1`),
      ...(isNotFound && !robotsTokens.includes("noindex") ? ["404 page is not noindex"] : []),
      ...(isNotFound && !robotsTokens.includes("nofollow") ? ["404 page is not nofollow"] : []),
      ...(!isNotFound && (
        robotsTokens.includes("noindex")
        || !robotsTokens.includes("index")
        || !robotsTokens.includes("follow")
      )
        ? ["public route is not indexable and followable"]
        : []),
      ...(isNotFound && (
        geometry.notFound?.heading !== "This path ends here."
        || !geometry.notFound.hasBrandMark
        || !geometry.notFound.hasHomeLink
        || !geometry.notFound.hasWorkLink
        || geometry.mainText.includes("Built where trust is part of the architecture")
      ) ? ["404 body is not the distinct branded error page"] : []),
      ...(route === "/github/" && !geometry.heatmap ? ["GitHub contribution heatmap is missing"] : []),
      ...(route === "/github/" && geometry.heatmap && (
        !geometry.heatmap.containedByPanel || !geometry.heatmap.containedByViewport
      ) ? ["GitHub heatmap wrapper is not contained"] : []),
      ...(route === "/github/" && viewport.width <= 768 && geometry.heatmap && (
        geometry.heatmap.wrapperScrollWidth <= geometry.heatmap.wrapperClientWidth + 1
        || !["auto", "scroll"].includes(geometry.heatmap.wrapperOverflowX)
      ) ? ["GitHub heatmap does not provide contained horizontal scrolling at narrow width"] : []),
    ];

    if (route === "/") {
      const person = geometry.metadata.person;
      const sameAs = Array.isArray(person?.sameAs) ? person.sameAs : [];
      if (!person
        || person.name !== "Steven Hagene"
        || ![canonicalOrigin, `${canonicalOrigin}/`].includes(person.url)
        || !person.jobTitle
        || !person.id
        || !person.image
        || !person.worksFor
        || !sameAs.includes("https://github.com/shagene")
        || !sameAs.some((url) => url.includes("linkedin.com/in/steven-hagene"))) {
        failures.push("homepage Person schema is incomplete or missing required sameAs profiles");
      }
    }

    results.push({
      route,
      viewport,
      status,
      geometry,
      statsWidthDelta,
      keyboard,
      reducedMotionScrollBehavior,
      contrast,
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

const metadataByRoute = publicRoutes.map((route) => ({
  route,
  metadata: results.find((result) => result.route === route)?.geometry.metadata,
}));
const uniqueMetadataChecks = [
  ["titles", metadataByRoute.map(({ metadata }) => metadata?.title)],
  ["descriptions", metadataByRoute.map(({ metadata }) => metadata?.description)],
  ["canonicals", metadataByRoute.map(({ metadata }) => metadata?.canonical)],
];
for (const [label, values] of uniqueMetadataChecks) {
  if (values.some((value) => !value) || new Set(values).size !== publicRoutes.length) {
    for (const result of results.filter((item) => item.route !== notFoundRoute)) {
      result.failures.push(`public route ${label} are not complete and unique`);
    }
  }
}

const requestContext = await browser.newContext();
const request = requestContext.request;
const assetChecks = [];
const pngDimensions = (body) => {
  if (body.length < 24 || body.toString("hex", 0, 8) !== "89504e470d0a1a0a") return null;
  return { width: body.readUInt32BE(16), height: body.readUInt32BE(20) };
};
const icoDimensions = (body) => {
  if (body.length < 6 || body.readUInt16LE(0) !== 0 || body.readUInt16LE(2) !== 1) return [];
  const count = body.readUInt16LE(4);
  return Array.from({ length: count }, (_, index) => {
    const offset = 6 + (index * 16);
    if (offset + 16 > body.length) return null;
    return {
      width: body[offset] === 0 ? 256 : body[offset],
      height: body[offset + 1] === 0 ? 256 : body[offset + 1],
    };
  }).filter(Boolean);
};

const assetExpectations = [
  { path: "/logo-mark.svg", type: "svg" },
  { path: "/logo-mark-inverted.svg", type: "svg" },
  { path: "/favicon.svg", type: "svg" },
  { path: "/favicon.ico", type: "ico" },
  { path: "/apple-touch-icon.png", type: "png", dimensions: { width: 180, height: 180 } },
  { path: "/resumes/full-stack-ai-product-engineer.pdf", type: "pdf" },
  { path: "/resumes/senior-frontend-ux-engineer.pdf", type: "pdf" },
  ...[
    "/og-image.png",
    "/og-work.png",
    "/og-teo.png",
    "/og-musterhall.png",
    "/og-crimcaseai.png",
    "/og-github.png",
    "/og-experience.png",
    "/og-semper.png",
  ].map((path) => ({ path, type: "png", dimensions: { width: 1200, height: 630 } })),
];

for (const expectation of assetExpectations) {
  const response = await request.get(new URL(expectation.path, baseUrl).toString());
  const body = await response.body();
  const contentType = response.headers()["content-type"] ?? "";
  const dimensions = expectation.type === "png"
    ? pngDimensions(body)
    : expectation.type === "ico"
      ? icoDimensions(body)
      : null;
  const text = expectation.type === "svg" ? body.toString("utf8") : "";
  const failures = [
    ...(response.status() !== 200 ? [`HTTP status is ${response.status()}`] : []),
    ...(expectation.type === "png" && !contentType.includes("image/png") ? [`content type is ${contentType}`] : []),
    ...(expectation.type === "svg" && !contentType.includes("image/svg+xml") ? [`content type is ${contentType}`] : []),
    ...(expectation.type === "ico" && !/(image\/x-icon|image\/vnd\.microsoft\.icon)/.test(contentType)
      ? [`content type is ${contentType}`]
      : []),
    ...(expectation.type === "pdf" && !contentType.includes("application/pdf") ? [`content type is ${contentType}`] : []),
    ...(expectation.type === "pdf" && body.subarray(0, 4).toString() !== "%PDF" ? ["missing PDF signature"] : []),
    ...(expectation.type === "pdf" && body.length < 1_000 ? ["PDF asset is unexpectedly small"] : []),
    ...(expectation.type === "svg" && (!/<title(?:\s|>)/.test(text) || !/role=["']img["']/.test(text))
      ? ["SVG lacks title or image role"]
      : []),
    ...(expectation.type === "svg" && !/(aria-label|aria-labelledby)=/.test(text)
      ? ["SVG lacks an accessible name"]
      : []),
    ...(expectation.type === "png" && (
      !dimensions
      || dimensions.width !== expectation.dimensions.width
      || dimensions.height !== expectation.dimensions.height
    ) ? [`dimensions are ${dimensions ? `${dimensions.width}x${dimensions.height}` : "unreadable"}`] : []),
    ...(expectation.type === "ico" && (
      ![16, 32].every((size) => dimensions.some((item) => item.width === size && item.height === size))
    ) ? ["ICO does not contain both 16px and 32px square images"] : []),
  ];
  assetChecks.push({
    path: expectation.path,
    status: response.status(),
    contentType,
    bytes: body.length,
    dimensions,
    failures,
  });
}

const siteChecks = {
  sitemap: { indexStatus: null, sitemapStatuses: [], urls: [], failures: [] },
  robots: { status: null, body: "", failures: [] },
};
const sitemapIndexResponse = await request.get(new URL("/sitemap-index.xml", baseUrl).toString());
siteChecks.sitemap.indexStatus = sitemapIndexResponse.status();
const sitemapIndexBody = await sitemapIndexResponse.text();
if (sitemapIndexResponse.status() !== 200) {
  siteChecks.sitemap.failures.push(`sitemap index status is ${sitemapIndexResponse.status()}`);
} else {
  const sitemapLocations = [...sitemapIndexBody.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].replaceAll("&amp;", "&"));
  const routeUrls = [];
  for (const location of sitemapLocations) {
    const sitemapPath = new URL(location).pathname;
    const response = await request.get(new URL(sitemapPath, baseUrl).toString());
    const body = await response.text();
    siteChecks.sitemap.sitemapStatuses.push({ path: sitemapPath, status: response.status() });
    if (response.status() !== 200) {
      siteChecks.sitemap.failures.push(`${sitemapPath} status is ${response.status()}`);
      continue;
    }
    routeUrls.push(...[...body.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => match[1].replaceAll("&amp;", "&")));
  }
  siteChecks.sitemap.urls = [...new Set(routeUrls)].sort();
  const expectedUrls = defaultPublicRoutes
    .map((route) => new URL(route, canonicalOrigin).toString())
    .sort();
  if (JSON.stringify(siteChecks.sitemap.urls) !== JSON.stringify(expectedUrls)) {
    siteChecks.sitemap.failures.push("sitemap route set does not exactly match public routes");
  }
  if (siteChecks.sitemap.urls.some((url) => url.includes("/404") || url.includes("zzz-does-not-exist"))) {
    siteChecks.sitemap.failures.push("404 route is present in sitemap");
  }
}

const robotsResponse = await request.get(new URL("/robots.txt", baseUrl).toString());
siteChecks.robots.status = robotsResponse.status();
siteChecks.robots.body = await robotsResponse.text();
if (robotsResponse.status() !== 200) siteChecks.robots.failures.push(`robots status is ${robotsResponse.status()}`);
if (!/^User-agent:\s*\*$/im.test(siteChecks.robots.body)) siteChecks.robots.failures.push("robots lacks wildcard user agent");
if (!/^Allow:\s*\/$/im.test(siteChecks.robots.body)) siteChecks.robots.failures.push("robots does not explicitly allow root");
if (/^Disallow:\s*\/$/im.test(siteChecks.robots.body)) siteChecks.robots.failures.push("robots blocks the site root");
if (!/^Sitemap:\s*https:\/\/stevenhagene\.com\/sitemap-index\.xml$/im.test(siteChecks.robots.body)) {
  siteChecks.robots.failures.push("robots lacks the canonical sitemap declaration");
}

await requestContext.close();
await browser.close();

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  publicRoutes,
  notFoundRoute,
  results,
  assetChecks,
  siteChecks,
};
await writeFile(
  new URL("browser-accessibility.json", outputDirectory),
  `${JSON.stringify(report, null, 2)}\n`,
);
const failedResults = results.filter((result) => result.failures.length > 0);
const failedAssets = assetChecks.filter((check) => check.failures.length > 0);
console.log(JSON.stringify({
  generatedAt: report.generatedAt,
  baseUrl,
  routes: routes.length,
  viewportChecks: results.length,
  axeViolations: results.reduce((total, result) => total + result.axe.violations.length, 0),
  incompleteKeyboardTraversals: results.filter((result) => !result.keyboard.complete).length,
  focusFailures: results.reduce((total, result) => total + result.keyboard.focusFailures.length, 0),
  routeFailures: failedResults.map((result) => ({
    route: result.route,
    width: result.viewport.width,
    failures: result.failures,
  })),
  assetFailures: failedAssets.map((check) => ({ path: check.path, failures: check.failures })),
  sitemapFailures: siteChecks.sitemap.failures,
  robotsFailures: siteChecks.robots.failures,
}, null, 2));

const failed = failedResults.length > 0
  || assetChecks.some((check) => check.failures.length > 0)
  || siteChecks.sitemap.failures.length > 0
  || siteChecks.robots.failures.length > 0;
if (failed) process.exitCode = 1;
