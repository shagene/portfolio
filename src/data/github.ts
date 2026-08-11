import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import cachedActivity from "./github-activity-cache.json";

export type GitHubContributionDay = {
  date: string;
  count: number;
};

export type GitHubLanguage = {
  name: string;
  bytes: number;
};

export type GitHubAccountActivity = {
  login: string;
  label: string;
  profileUrl: string;
  publicRepos: number;
  visibleContributions: number;
  restrictedContributions: number | null;
  latestPublicPush: string;
};

export type GitHubActivity = {
  schemaVersion: 1;
  dataAsOf: string;
  source: "live" | "committed-cache";
  provenance: string;
  range: { from: string; to: string };
  accounts: GitHubAccountActivity[];
  combined: {
    visibleContributions: number;
    publicContributions: number | null;
    restrictedContributions: number | null;
    publicRepos: number;
    topLanguages: GitHubLanguage[];
    latestPublicActivity: string;
    calendar: GitHubContributionDay[];
  };
};

type GraphLanguageEdge = {
  size: number;
  node: { name: string };
};

type GraphUser = {
  login: string;
  repositories: {
    totalCount: number;
    pageInfo: { hasNextPage: boolean };
    nodes: Array<{
      isFork: boolean;
      isArchived: boolean;
      pushedAt: string | null;
      languages: { edges: GraphLanguageEdge[] };
    } | null>;
  };
  contributionsCollection: {
    hasAnyRestrictedContributions: boolean;
    restrictedContributionsCount: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: GitHubContributionDay[];
      }>;
    };
  };
};

type GraphResponse = {
  data?: {
    personal: GraphUser | null;
    company: GraphUser | null;
  };
  errors?: Array<{ message: string }>;
};

const ACCOUNT_SPECS = [
  { key: "personal", login: "shagene", label: "Personal" },
  {
    key: "company",
    login: "semperdigitalsolutions",
    label: "Semper Digital Solutions",
  },
] as const;

const GRAPHQL_QUERY = `
  query PortfolioActivity(
    $personal: String!
    $company: String!
    $from: DateTime!
    $to: DateTime!
  ) {
    personal: user(login: $personal) {
      ...AccountActivity
    }
    company: user(login: $company) {
      ...AccountActivity
    }
  }

  fragment AccountActivity on User {
    login
    repositories(
      first: 100
      ownerAffiliations: OWNER
      privacy: PUBLIC
      orderBy: { field: PUSHED_AT, direction: DESC }
    ) {
      totalCount
      pageInfo { hasNextPage }
      nodes {
        isFork
        isArchived
        pushedAt
        languages(first: 100, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node { name }
          }
        }
      }
    }
    contributionsCollection(from: $from, to: $to) {
      hasAnyRestrictedContributions
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            count: contributionCount
          }
        }
      }
    }
  }
`;

const toEasternIsoDate = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
};

const shiftIsoDate = (date: string, days: number) => {
  const shifted = new Date(`${date}T12:00:00Z`);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted.toISOString().slice(0, 10);
};

const dateRange = () => {
  const to = toEasternIsoDate(new Date());
  return { from: shiftIsoDate(to, -364), to };
};

const completeCalendar = (
  from: string,
  to: string,
  calendars: GitHubContributionDay[][],
) => {
  const totals = new Map<string, number>();
  for (const calendar of calendars) {
    for (const day of calendar) {
      totals.set(day.date, (totals.get(day.date) ?? 0) + day.count);
    }
  }

  const days: GitHubContributionDay[] = [];
  for (let date = from; date <= to; date = shiftIsoDate(date, 1)) {
    days.push({ date, count: totals.get(date) ?? 0 });
  }
  return days;
};

const isValidActivity = (value: unknown): value is GitHubActivity => {
  if (!value || typeof value !== "object") return false;
  const activity = value as Partial<GitHubActivity>;
  const logins = activity.accounts?.map((account) => account.login).sort();
  const expectedLogins = ACCOUNT_SPECS.map((account) => account.login).sort();
  const calendar = activity.combined?.calendar;
  return activity.schemaVersion === 1
    && Boolean(activity.dataAsOf)
    && logins?.join(",") === expectedLogins.join(",")
    && Array.isArray(calendar)
    && calendar.length >= 365
    && calendar.every((day) => /^\d{4}-\d{2}-\d{2}$/.test(day.date) && day.count >= 0)
    && typeof activity.combined?.publicRepos === "number"
    && Array.isArray(activity.combined?.topLanguages);
};

const loadCache = (): GitHubActivity | null => {
  if (!isValidActivity(cachedActivity)) return null;
  return cachedActivity;
};

const fetchLiveActivity = async (token: string): Promise<GitHubActivity> => {
  const range = dateRange();
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "steven-hagene-portfolio-build",
    },
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
      variables: {
        personal: ACCOUNT_SPECS[0].login,
        company: ACCOUNT_SPECS[1].login,
        from: `${range.from}T00:00:00Z`,
        to: `${range.to}T23:59:59Z`,
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL returned ${response.status}`);
  }

  const payload = await response.json() as GraphResponse;
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }
  if (!payload.data?.personal || !payload.data.company) {
    throw new Error("GitHub GraphQL did not return both configured users");
  }

  const graphUsers = {
    personal: payload.data.personal,
    company: payload.data.company,
  };
  const languages = new Map<string, number>();
  const accountCalendars: GitHubContributionDay[][] = [];
  const accounts = ACCOUNT_SPECS.map((spec) => {
    const user = graphUsers[spec.key];
    if (user.repositories.pageInfo.hasNextPage) {
      throw new Error(`${spec.login} now has more than 100 public repositories; pagination is required`);
    }

    for (const repo of user.repositories.nodes) {
      if (!repo || repo.isFork || repo.isArchived) continue;
      for (const edge of repo.languages.edges) {
        languages.set(edge.node.name, (languages.get(edge.node.name) ?? 0) + edge.size);
      }
    }

    const calendar = user.contributionsCollection.contributionCalendar.weeks
      .flatMap((week) => week.contributionDays)
      .filter((day) => day.date >= range.from && day.date <= range.to);
    accountCalendars.push(calendar);
    const visibleContributions = user.contributionsCollection.contributionCalendar.totalContributions;
    const restrictedContributions = user.contributionsCollection.hasAnyRestrictedContributions
      ? user.contributionsCollection.restrictedContributionsCount
      : 0;
    const latestPublicPush = user.repositories.nodes
      .map((repo) => repo?.pushedAt)
      .filter((date): date is string => Boolean(date))
      .sort()
      .at(-1);
    if (!latestPublicPush) throw new Error(`${spec.login} has no public push date`);

    return {
      login: spec.login,
      label: spec.label,
      profileUrl: `https://github.com/${spec.login}`,
      publicRepos: user.repositories.totalCount,
      visibleContributions,
      restrictedContributions,
      latestPublicPush,
    };
  });

  const calendar = completeCalendar(range.from, range.to, accountCalendars);
  const visibleContributions = accounts.reduce(
    (total, account) => total + account.visibleContributions,
    0,
  );
  const restrictedContributions = accounts.reduce(
    (total, account) => total + (account.restrictedContributions ?? 0),
    0,
  );
  const latestPublicActivity = accounts.map((account) => account.latestPublicPush).sort().at(-1);
  if (!latestPublicActivity) throw new Error("No combined public activity date is available");

  return {
    schemaVersion: 1,
    dataAsOf: range.to,
    source: "live",
    provenance: "Authenticated GitHub GraphQL data captured during the static build.",
    range,
    accounts,
    combined: {
      visibleContributions,
      publicContributions: visibleContributions - restrictedContributions,
      restrictedContributions,
      publicRepos: accounts.reduce((total, account) => total + account.publicRepos, 0),
      topLanguages: [...languages.entries()]
        .sort((left, right) => right[1] - left[1])
        .slice(0, 6)
        .map(([name, bytes]) => ({ name, bytes })),
      latestPublicActivity,
      calendar,
    },
  };
};

const persistCache = async (activity: GitHubActivity) => {
  const snapshot: GitHubActivity = {
    ...activity,
    source: "committed-cache",
    provenance:
      "Authenticated GitHub GraphQL snapshot committed for graceful build fallback.",
  };
  await writeFile(
    resolve(process.cwd(), "src/data/github-activity-cache.json"),
    `${JSON.stringify(snapshot, null, 2)}\n`,
  );
  console.info(`[github] Updated committed activity cache through ${snapshot.dataAsOf}.`);
};

let activityPromise: Promise<GitHubActivity | null> | undefined;

export const getGitHubActivity = () => {
  activityPromise ??= (async () => {
    const token = process.env.GITHUB_TOKEN
      ?? process.env.GH_TOKEN
      ?? process.env.GITHUB_GRAPHQL_TOKEN;
    if (token) {
      try {
        const live = await fetchLiveActivity(token);
        if (process.env.GITHUB_CACHE_WRITE === "1") await persistCache(live);
        return live;
      } catch (error) {
        if (process.env.GITHUB_LIVE_REQUIRED === "1") throw error;
        console.warn(
          `[github] Live activity unavailable; using the committed cache. ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    } else {
      if (process.env.GITHUB_LIVE_REQUIRED === "1") {
        throw new Error("GITHUB_LIVE_REQUIRED=1 but no GitHub API token is available");
      }
      console.warn("[github] GITHUB_TOKEN is not set; using the committed activity cache.");
    }

    const cache = loadCache();
    if (cache) {
      console.info(`[github] Loaded committed activity cache through ${cache.dataAsOf}.`);
      return cache;
    }
    console.warn("[github] No valid activity cache is available; rendering curated repositories only.");
    return null;
  })();

  return activityPromise;
};
