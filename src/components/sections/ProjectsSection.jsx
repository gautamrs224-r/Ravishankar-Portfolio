import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../../data/portfolioData";
import ProjectCard from "../ui/ProjectCard";
import Reveal from "../ui/Reveal";

/**
 * ProjectsSection
 * ---------------------------------------------------------------------------
 * Homepage "Featured Projects" preview. Responsive grid:
 *   Desktop (lg+): 3 columns
 *   Tablet (sm-lg): 2 columns
 *   Mobile (<sm): 1 column
 *
 * Each card here keeps its own Live Demo / GitHub buttons (unchanged).
 * "View All Projects" routes to the dedicated /projects catalog page,
 * where cards are fully clickable and open a case-study detail modal
 * instead of linking out directly.
 */
export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <Reveal>
              <span className="eyebrow">Featured Projects</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                My Featured <span className="gradient-text">Projects</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
                Here are some of the projects I've worked on. Each project taught
                me something new.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Link to="/projects" className="btn-secondary shrink-0 !py-2.5 text-sm">
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        {/* Responsive project grid: 1 col mobile / 2 col tablet / 3 col desktop */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, idx) => (
            <Reveal key={project.id} delay={(idx % 3) * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}