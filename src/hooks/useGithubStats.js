import { useEffect, useState } from "react";

/**
 * useGithubStats
 * ---------------------------------------------------------------------------
 * Fetches REAL, live data for a GitHub username using the public GitHub
 * REST API (no auth/backend required — works directly from the browser).
 *
 * What this CAN fetch live (and does):
 *  - Avatar, bio, public repo count, followers, location
 *  - Top repositories sorted by stars (name, description, stars, forks)
 *  - Most-used languages, computed by sampling each repo's primary language
 *
 * What this CANNOT fetch from the unauthenticated REST API (GitHub doesn't
 * expose these without GraphQL + a personal access token, which can't be
 * safely embedded in a public frontend):
 *  - Exact contribution graph / total contribution count
 *  - Current daily streak
 *  - Total commit / PR / issue counts across all repos
 *
 * For those four numbers, the component falls back to the curated values
 * in GITHUB_STATS (data/portfolioData.js). Update them by hand occasionally,
 * or wire up github-readme-stats / a small serverless function later if you
 * want those fully live too — see the README for notes on this trade-off.
 *
 * @param {string} username - GitHub username to fetch
 * @returns {{ data: object|null, status: 'loading'|'success'|'error' }}
 */
export default function useGithubStats(username) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!username) {
      setStatus("error");
      return;
    }

    let cancelled = false;

    async function fetchStats() {
      try {
        setStatus("loading");

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("GitHub API request failed");
        }

        const user = await userRes.json();
        const repos = await reposRes.json();

        if (cancelled) return;

        // Top 3 repos by star count
        const topRepos = [...repos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || "No description provided.",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
          }));

        // Language breakdown computed from each repo's primary language
        const languageCounts = {};
        repos.forEach((repo) => {
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
          }
        });
        const totalLangSamples = Object.values(languageCounts).reduce((a, b) => a + b, 0);
        const languages = Object.entries(languageCounts)
          .map(([name, count]) => ({
            name,
            percent: totalLangSamples > 0 ? Math.round((count / totalLangSamples) * 1000) / 10 : 0,
          }))
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 5);

        setData({
          avatarUrl: user.avatar_url,
          name: user.name || user.login,
          bio: user.bio,
          location: user.location,
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          profileUrl: user.html_url,
          topRepos,
          languages,
        });
        setStatus("success");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, status };
}
