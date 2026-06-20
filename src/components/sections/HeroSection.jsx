import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { PROFILE, HERO_STATS, HERO_TECH_STACK } from "../../data/portfolioData";
import { getIcon } from "../../utils/iconRegistry";
import { scrollToId } from "../../utils/scrollToId";
import ProfileOrbit from "../ui/ProfileOrbit";

/**
 * HeroSection
 * ---------------------------------------------------------------------------
 * Full-viewport-height landing section.
 * Desktop: text left, floating profile image right.
 * Mobile: profile image on top, text stacked below.
 */
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden pt-28 pb-12 lg:pt-24"
    >
      {/* Decorative ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="section-inner grid grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-16">
        {/* Profile image — shown first on mobile, second on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-1 lg:order-2"
        >
          <ProfileOrbit imageSrc="https://res.cloudinary.com/dhgshusfm/image/upload/v1781927299/Dev_f9mwno.png" />
        </motion.div>

        {/* Text content */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge-pill"
            style={{
              backgroundColor: "rgba(34,197,94,0.12)",
              borderColor: "rgba(34,197,94,0.25)",
              color: "#4ADE80",
            }}
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#22C55E" }}
            />
            Available For Work
          </motion.div>

          {/* Greeting */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-2xl font-semibold text-white sm:text-3xl"
          >
            Hi, I'm <span className="text-primary-light">{PROFILE.firstName}</span>{" "}
            <span aria-hidden>👋</span>
          </motion.h2>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            Full Stack
            <br />
            <span className="gradient-text">MERN Developer</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 max-w-md text-base text-muted sm:text-lg"
          >
            {PROFILE.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            <button
              onClick={() => scrollToId("projects")}
              className="btn-primary w-full sm:w-auto"
            >
              View My Work
              <ArrowRight size={18} />
            </button>
            <a href={PROFILE.resumeUrl} download className="btn-secondary w-full sm:w-auto">
              Download CV
              <Download size={18} />
            </a>
          </motion.div>

          {/* Tech stack row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 w-full"
          >
            <p className="eyebrow mb-4 justify-center lg:justify-start">Tech Stack</p>
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              {HERO_TECH_STACK.map((tech) => {
                const Icon = getIcon(tech.icon);
                return (
                  <div
                    key={tech.id}
                    className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.06] hover:shadow-glow"
                  >
                    <Icon size={18} style={{ color: tech.color }} />
                    <span className="text-sm font-medium text-white">
                      {tech.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card mt-8 grid w-full grid-cols-2 gap-4 p-5 sm:grid-cols-4 sm:gap-2 sm:p-6"
          >
            {HERO_STATS.map((stat) => {
              const Icon = getIcon(stat.icon);
              return (
                <div
                  key={stat.id}
                  className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-2.5 sm:border-r sm:border-white/[0.06] sm:last:border-r-0"
                >
                  <Icon size={20} style={{ color: stat.color }} />
                  <div className="leading-tight">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-muted">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
