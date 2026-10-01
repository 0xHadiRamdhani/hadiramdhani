import { Star, GitFork, ExternalLink, Code } from "lucide-react";
import Link from "next/link";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Language color map (GitHub-style)
const LANG_COLORS: Record<string, string> = {
  Dart: "#00B4AB",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Python: "#3572A5",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
};

async function getProjects() {
  // Exact pinned repos from https://github.com/0xHadiRamdhani
  const pinnedRepos = [
    "workshop_manager",
    "CodeCraftersNewVersion",
    "sbm-ticketing-app",
    "imphnen-tools-mobile",
    "imphnen-online-tools",
    "Ai-Manuver-Scanner",
  ];

  try {
    const detailedRepos = await Promise.all(
      pinnedRepos.map(async (repoName) => {
        try {
          const repoRes = await fetch(
            `https://api.github.com/repos/0xHadiRamdhani/${repoName}`,
            {
              next: { revalidate: 3600 },
              headers: { Accept: "application/vnd.github.mercy-preview+json" },
            }
          );
          if (!repoRes.ok) {
            // Return minimal data if API rate-limited
            return {
              repo: repoName,
              description: null,
              language: null,
              stack: [],
              stars: 0,
              forks: 0,
              link: `https://github.com/0xHadiRamdhani/${repoName}`,
            };
          }
          const data = await repoRes.json();

          // Fetch all languages used in the repo
          let languagesList: string[] = [];
          const langRes = await fetch(
            `https://api.github.com/repos/0xHadiRamdhani/${repoName}/languages`,
            { next: { revalidate: 3600 } }
          );
          if (langRes.ok) {
            const langData = await langRes.json();
            languagesList = Object.keys(langData);
          }

          // Combine GitHub topics + languages, deduplicate
          const rawTopics: string[] = data.topics || [];
          const combined = Array.from(
            new Set([...rawTopics, ...languagesList.map((l) => l.toLowerCase())])
          );

          return {
            repo: data.name,
            description: data.description || null,
            language: data.language,
            stack: combined.slice(0, 6),
            stars: data.stargazers_count,
            forks: data.forks_count,
            link: data.html_url,
          };
        } catch {
          return {
            repo: repoName,
            description: null,
            language: null,
            stack: [],
            stars: 0,
            forks: 0,
            link: `https://github.com/0xHadiRamdhani/${repoName}`,
          };
        }
      })
    );

    return detailedRepos;
  } catch {
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="w-full py-16 sm:py-24 bg-muted/30 border-t border-border">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10 sm:mb-16">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Featured <span className="text-primary-gradient">Projects</span>
          </h2>
          <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
            Beberapa project pilihan yang disematkan dari GitHub.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.repo || index}
              className="relative overflow-hidden flex flex-col justify-between bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all group"
            >
              {/* Hover swipe effect */}
              <div className="absolute inset-0 bg-foreground/[0.02] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
              
              <div className="relative z-10 flex-1 flex flex-col">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <GithubIcon size={20} />
                  </div>
                  <Link
                    href={project.link || `https://github.com/0xHadiRamdhani/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={20} />
                  </Link>
                </div>

                {/* Repo name */}
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.repo}
                </h3>

                {/* Description (optional) */}
                {project.description && (
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>
                )}

                {/* Tech Stack badges */}
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary/60 border border-border/60 px-2.5 py-0.5 text-[10px] font-semibold text-foreground/70 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="relative z-10 flex items-center gap-4 text-xs font-medium text-muted-foreground mt-5 pt-4 border-t border-border">
                {project.language && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: LANG_COLORS[project.language] || "#888",
                      }}
                    />
                    <span>{project.language}</span>
                  </div>
                )}
                {project.stars > 0 && (
                  <div className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                    <Star size={13} />
                    <span>{project.stars}</span>
                  </div>
                )}
                {project.forks > 0 && (
                  <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <GitFork size={13} />
                    <span>{project.forks}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="https://github.com/0xHadiRamdhani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted hover:border-primary/30 transition-all shadow-sm"
          >
            <GithubIcon size={16} />
            View all on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
