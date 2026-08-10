type GitHubUser = {
  public_repos: number;
};

type GitHubRepo = {
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

export type GitHubStats = {
  publicRepos: number;
  topLanguages: string[];
  latestPublicPush: string;
};

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "steven-hagene-portfolio-build",
};

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(3000),
  });

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getGitHubStats(): Promise<GitHubStats | null> {
  try {
    const [user, repos] = await Promise.all([
      getJson<GitHubUser>("https://api.github.com/users/shagene"),
      getJson<GitHubRepo[]>(
        "https://api.github.com/users/shagene/repos?per_page=100&sort=pushed",
      ),
    ]);

    const originalRepos = repos.filter((repo) => !repo.fork);
    const languages = originalRepos.reduce<Map<string, number>>((counts, repo) => {
      if (repo.language) {
        counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
      }
      return counts;
    }, new Map());

    const topLanguages = [...languages.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 3)
      .map(([language]) => language);
    const latestPush = originalRepos
      .map((repo) => repo.pushed_at)
      .sort()
      .at(-1);

    if (!latestPush || topLanguages.length === 0) {
      return null;
    }

    return {
      publicRepos: user.public_repos,
      topLanguages,
      latestPublicPush: new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(latestPush)),
    };
  } catch (error) {
    console.warn(
      `[github] Public stats unavailable; omitting the strip. ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
}
