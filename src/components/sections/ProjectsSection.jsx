import { ArrowRight } from "lucide-react";
import { PROJECTS, PROFILE } from "../../data/portfolioData";
import ProjectCard from "../ui/ProjectCard";
import Reveal from "../ui/Reveal";

/**
 * ProjectsSection
 * ---------------------------------------------------------------------------
 * Most important section per the design brief. Responsive grid:
 *   Desktop (lg+): 3 columns
 *   Tablet (sm-lg): 2 columns
 *   Mobile (<sm): 1 column
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
            <a
              href={PROFILE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary shrink-0 !py-2.5 text-sm"
            >
              View All Projects
              <ArrowRight size={16} />
            </a>
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
