import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Calendar, User, CheckCircle2, AlertTriangle } from "lucide-react";

/**
 * ProjectDetailModal
 * ---------------------------------------------------------------------------
 * Full case-study popup for a single project, rendered via a portal so it
 * sits above everything regardless of where <ProjectsPage> mounts it in the
 * tree. Closes on: backdrop click, Escape key, or the X button. Body scroll
 * is locked while open.
 *
 * This is the ONLY place Live Demo / GitHub links appear for catalog
 * projects — the cards themselves are click-only per the design.
 *
 * @param {object|null} project - the project to show, or null when closed
 * @param {() => void} onClose
 */
export default function ProjectDetailModal({ project, onClose }) {
  const isOpen = Boolean(project);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project?.title} project details`}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto border-primary/20"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background/70 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <X size={20} />
            </button>

            {project && (
              <>
                {/* Hero image */}
                <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  <span
                    className={`absolute left-5 top-5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${project.categoryColor}`}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {project.title}
                  </h2>

                  {/* Meta row: role, duration, year */}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted">
                    {project.role && (
                      <span className="flex items-center gap-1.5">
                        <User size={14} className="text-primary-light" />
                        {project.role}
                      </span>
                    )}
                    {project.duration && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-primary-light" />
                        {project.duration}
                        {project.year ? ` · ${project.year}` : ""}
                      </span>
                    )}
                  </div>

                  {/* Action links */}
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !py-2.5 text-sm"
                    >
                      Live Demo
                      <ExternalLink size={15} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !py-2.5 text-sm"
                    >
                      <Github size={15} />
                      View on GitHub
                    </a>
                  </div>

                  {/* Long description */}
                  {project.longDescription && (
                    <p className="mt-6 text-sm leading-relaxed text-bodytext sm:text-base">
                      {project.longDescription}
                    </p>
                  )}

                  {/* Tech stack */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                      Tech Stack
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="badge-pill border-white/[0.1] text-violet-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key features */}
                  {project.features?.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                        Key Features
                      </h3>
                      <ul className="mt-3 space-y-2.5">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-bodytext">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Challenges */}
                  {project.challenges && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                        Challenges &amp; Learnings
                      </h3>
                      <div className="glass-card mt-3 flex items-start gap-3 border-primary/15 p-4">
                        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-primary-light" />
                        <p className="text-sm leading-relaxed text-bodytext">
                          {project.challenges}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Gallery */}
                  {project.gallery?.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                        Gallery
                      </h3>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {project.gallery.map((src, idx) => (
                          <div key={idx} className="aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08]">
                            <img
                              src={src}
                              alt={`${project.title} screenshot ${idx + 1}`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}