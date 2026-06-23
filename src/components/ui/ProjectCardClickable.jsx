import { ArrowUpRight } from "lucide-react";

/**
 * ProjectCardClickable
 * ---------------------------------------------------------------------------
 * Used only on the /projects catalog page. Unlike the homepage's
 * <ProjectCard>, this version has NO Live Demo / GitHub buttons — the
 * entire card is one click target that opens the project's detail modal
 * (see ProjectDetailModal.jsx). Live Demo / GitHub links live inside that
 * modal instead.
 *
 * @param {object} project - one entry from data/portfolioData.js PROJECTS
 * @param {() => void} onOpen - called when the card is clicked/activated
 */
export default function ProjectCardClickable({ project, onOpen }) {
  const { title, category, categoryColor, description, image, tech } = project;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group glass-card flex h-full flex-col overflow-hidden text-left transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
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

        {/* "View case study" affordance, appears on hover/focus */}
        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-background/60 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowUpRight size={16} />
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

        <span className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary-light">
          View case study
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </button>
  );
}