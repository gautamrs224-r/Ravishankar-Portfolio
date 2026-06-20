import { ExternalLink, Github } from "lucide-react";

/**
 * ProjectCard
 * ---------------------------------------------------------------------------
 * Displays a single project: image, category tag, title, description,
 * tech stack badges, and Live Demo / GitHub buttons. Lifts on hover.
 *
 * @param {object} project - one entry from data/portfolioData.js PROJECTS
 */
export default function ProjectCard({ project }) {
  const { title, category, categoryColor, description, image, tech, liveUrl, githubUrl } =
    project;

  return (
    <div className="group glass-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow">
      {/* Project image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={image}
          alt={`${title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <span
          className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${categoryColor}`}
        >
          {category}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{description}</p>

        {/* Tech badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className="badge-pill border-white/[0.1] text-violet-200">
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex gap-3">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary-light transition-all duration-200 hover:bg-primary/20"
          >
            Live Demo
            <ExternalLink size={14} />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/[0.08]"
          >
            <Github size={14} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
