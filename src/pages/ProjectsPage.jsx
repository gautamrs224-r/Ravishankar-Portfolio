import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";
import ProjectCardClickable from "../components/ui/ProjectCardClickable";
import ProjectDetailModal from "../components/ui/ProjectDetailModal";
import Reveal from "../components/ui/Reveal";

/**
 * ProjectsPage
 * ---------------------------------------------------------------------------
 * The full project catalog at /projects. Unlike the homepage's "Featured
 * Projects" preview, every card here is a single click target — clicking
 * anywhere on a card opens <ProjectDetailModal> with the full case study
 * (long description, features, challenges, gallery, and the Live Demo /
 * GitHub links, which live inside the modal rather than on the card).
 */
export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="section pt-32">
      <div className="section-inner">
        {/* Back to home */}
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </Reveal>

        <div className="mt-6 flex flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow">Project Catalog</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
              All <span className="gradient-text">Projects</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              Click any project to see the full case study — problem,
              approach, features, and what I learned building it.
            </p>
          </Reveal>
        </div>

        {/* Responsive project grid: 1 col mobile / 2 col tablet / 3 col desktop */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, idx) => (
            <Reveal key={project.id} delay={(idx % 3) * 0.1}>
              <ProjectCardClickable
                project={project}
                onOpen={() => setActiveProject(project)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}