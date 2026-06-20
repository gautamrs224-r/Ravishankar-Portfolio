import { Github, ArrowRight, Trophy, Loader2 } from "lucide-react";
import { GITHUB_STATS, PROFILE } from "../../data/portfolioData";
import { getIcon } from "../../utils/iconRegistry";
import useGithubStats from "../../hooks/useGithubStats";
import Reveal from "../ui/Reveal";

// Brand colors for common languages GitHub might report — used when live
// language data comes back without a pre-assigned color in our palette.
const LANGUAGE_COLORS = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  HTML: "#F97316",
  CSS: "#8B5CF6",
  Python: "#3776AB",
  Java: "#E76F00",
  "C++": "#00599C",
  Shell: "#89E051",
  EJS: "#A91E50",
};

/**
 * GithubSection
 * ---------------------------------------------------------------------------
 * Dashboard-style GitHub activity overview. Fetches REAL, live data for the
 * configured GitHub username (avatar, bio, public repo count, followers,
 * top repos by stars, language breakdown) via useGithubStats(). Falls back
 * to the curated values in GITHUB_STATS (data/portfolioData.js) for the few
 * metrics the public API can't provide (contribution count, streak, total
 * commits/PRs/issues) — see useGithubStats.js for why.
 */
export default function GithubSection() {
  const { username, profileUrl: fallbackProfileUrl, bio: fallbackBio, location: fallbackLocation, summary, topRepos: fallbackRepos, languages: fallbackLanguages, footerStats } =
    GITHUB_STATS;

  const { data: live, status } = useGithubStats(username);
  const isLive = status === "success" && live;

  // Live values where available, curated fallback otherwise
  const profileUrl = live?.profileUrl || fallbackProfileUrl;
  const bio = live?.bio || fallbackBio;
  const location = live?.location || fallbackLocation;
  const avatarUrl = live?.avatarUrl;
  const topRepos = isLive && live.topRepos.length > 0 ? live.topRepos : fallbackRepos;
  const languages =
    isLive && live.languages.length > 0
      ? live.languages.map((l) => ({ ...l, color: LANGUAGE_COLORS[l.name] || "#8B5CF6" }))
      : fallbackLanguages;

  // Merge live repo count / followers into the summary cards, keep
  // curated values for streak/contributions which the REST API can't give us
  const resolvedSummary = summary.map((stat) => {
    if (isLive && stat.id === "repos") return { ...stat, value: live.publicRepos };
    if (isLive && stat.id === "followers") return { ...stat, value: live.followers };
    return stat;
  });

  return (
    <section id="github" className="section">
      <div className="section-inner">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow">GitHub Stats</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              My <span className="gradient-text">GitHub</span> Activity
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              Consistency, contribution, and continuous learning.
            </p>
          </Reveal>
          {status === "loading" && (
            <p className="mt-2 flex items-center gap-2 text-xs text-muted">
              <Loader2 size={13} className="animate-spin" />
              Fetching live data from GitHub…
            </p>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs text-muted">
              Showing cached stats — live GitHub data is temporarily unavailable.
            </p>
          )}
        </div>

        {/* Summary cards + profile card */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {resolvedSummary.map((stat, idx) => {
            const Icon = getIcon(stat.icon);
            return (
              <Reveal key={stat.id} delay={idx * 0.08} className="lg:col-span-1">
                <div className="glass-card-hover flex h-full flex-col gap-3 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15">
                    <Icon size={20} className="text-primary-light" />
                  </div>
                  <p className="text-sm text-muted">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.sublabel}</p>
                  {/* Decorative mini sparkline */}
                  <svg viewBox="0 0 100 24" className="mt-1 h-6 w-full text-primary/70">
                    <polyline
                      points="0,18 15,12 30,16 45,6 60,10 75,4 100,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </Reveal>
            );
          })}

          {/* Profile card */}
          <Reveal delay={0.3} className="sm:col-span-2 lg:col-span-1">
            <div className="glass-card-hover flex h-full flex-col gap-3 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/10">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={`${username} avatar`} className="h-full w-full object-cover" />
                  ) : (
                    <Github size={22} className="text-white" />
                  )}
                </div>
                <div>
                  <p className="font-display font-semibold text-white">{PROFILE.firstName}</p>
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-secondary"
                  >
                    @{username}
                  </a>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted">{bio}</p>
              {location && <p className="text-xs text-muted">📍 {location}</p>}
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-auto !py-2.5 text-sm"
              >
                Visit GitHub Profile
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Languages + Top repos */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Most used languages */}
          <Reveal delay={0.1}>
            <div className="glass-card h-full p-6">
              <h3 className="font-display text-lg font-semibold text-white">
                Most Used Languages
              </h3>
              <div className="mt-5 space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-white">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        {lang.name}
                      </span>
                      <span className="text-muted">{lang.percent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: lang.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Top repositories */}
          <Reveal delay={0.2}>
            <div className="glass-card h-full p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">
                  Top Repositories
                </h3>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary hover:underline"
                >
                  View all
                </a>
              </div>
              <ul className="mt-5 space-y-3">
                {topRepos.map((repo) => {
                  const RepoIcon = getIcon(repo.icon || "Code2");
                  const repoUrl = repo.url || profileUrl;
                  return (
                    <li key={repo.id}>
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:bg-white/[0.05]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <RepoIcon size={18} className="text-primary-light" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="truncate text-sm font-medium text-secondary">
                            {repo.name}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {repo.description}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-3 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            ⭐ {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            🍴 {repo.forks}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Footer stats strip */}
        <Reveal delay={0.3}>
          <div className="glass-card mt-6 flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Trophy size={22} className="text-primary-light" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Always Improving
                </h3>
                <p className="mt-1.5 max-w-md text-sm text-muted">
                  I believe in consistent learning and shipping better code every
                  day. Every contribution is a step towards becoming a better
                  developer.
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-8 sm:justify-end">
              {footerStats.map((stat) => {
                const Icon = getIcon(stat.icon);
                return (
                  <div key={stat.id} className="flex flex-col items-center gap-1 text-center">
                    <Icon size={18} className="text-primary-light" />
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-muted">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
