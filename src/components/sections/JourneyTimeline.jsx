import { Target } from "lucide-react";
import { JOURNEY_MILESTONES, WHATS_NEXT } from "../../data/portfolioData";
import { getIcon } from "../../utils/iconRegistry";
import Reveal from "../ui/Reveal";

/**
 * MilestoneCard
 * ---------------------------------------------------------------------------
 * One entry in the timeline. `side` controls which side of the central
 * line it renders on for desktop (left/right alternating layout).
 */
function MilestoneCard({ milestone, align }) {
  const Icon = getIcon(milestone.icon);

  return (
    <div className={`glass-card-hover flex gap-4 p-5 ${align === "right" ? "lg:flex-row-reverse lg:text-right" : ""}`}>
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
        <Icon size={24} className="text-primary-light" />
      </div>
      <div>
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-white lg:justify-start">
          {align === "right" && <span className="hidden h-1.5 w-1.5 rounded-full bg-primary-light lg:inline" />}
          {milestone.title}
          {align !== "right" && <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {milestone.description}
        </p>
      </div>
    </div>
  );
}

/**
 * JourneyTimeline
 * ---------------------------------------------------------------------------
 * Vertical timeline with a central year-marker spine. On desktop, cards
 * alternate left/right of the spine; on mobile, the spine collapses and
 * cards stack in a single column for readability.
 */
export default function JourneyTimeline() {
  return (
    <section id="journey" className="section">
      <div className="section-inner">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow">My Journey</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              My <span className="gradient-text">Learning Journey</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              Every step I've taken has led me to where I am today.
            </p>
          </Reveal>
        </div>

        {/* Timeline body */}
        <div className="relative mt-14">
          {/* Central spine — visible from lg breakpoint up */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary/60 to-secondary lg:block" />
          {/* Mobile spine */}
          <div className="absolute left-7 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/60 to-secondary lg:hidden" />

          <div className="flex flex-col gap-8 lg:gap-10">
            {JOURNEY_MILESTONES.map((milestone, idx) => (
              <div key={milestone.id} className="relative lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
                {/* Mobile layout: dot + card side by side */}
                <div className="flex gap-5 lg:hidden">
                  <div className="relative z-10 flex shrink-0 flex-col items-center pt-1">
                    <span className="h-4 w-4 rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary shadow-glow" />
                  </div>
                  <Reveal delay={idx * 0.05} className="flex-1 -mt-2">
                    <span className="mb-2 inline-block rounded-md bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary-light">
                      {milestone.year}
                    </span>
                    <MilestoneCard milestone={milestone} align="left" />
                  </Reveal>
                </div>

                {/* Desktop layout: alternating left/right */}
                {milestone.side === "left" ? (
                  <>
                    <Reveal delay={idx * 0.05} y={20} className="hidden lg:block">
                      <MilestoneCard milestone={milestone} align="right" />
                    </Reveal>
                    <div className="relative z-10 hidden flex-col items-center lg:flex">
                      <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1.5 text-sm font-bold text-white shadow-glow">
                        {milestone.year}
                      </span>
                      <span className="mt-2 h-3 w-3 rounded-full border-2 border-background bg-white" />
                    </div>
                    <div className="hidden lg:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block" />
                    <div className="relative z-10 hidden flex-col items-center lg:flex">
                      <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1.5 text-sm font-bold text-white shadow-glow">
                        {milestone.year}
                      </span>
                      <span className="mt-2 h-3 w-3 rounded-full border-2 border-background bg-white" />
                    </div>
                    <Reveal delay={idx * 0.05} y={20} className="hidden lg:block">
                      <MilestoneCard milestone={milestone} align="left" />
                    </Reveal>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What's Next */}
        <Reveal delay={0.2}>
          <div className="glass-card mt-12 flex flex-col gap-6 border-primary/25 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Target size={22} className="text-primary-light" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  What's Next?
                </h3>
                <p className="mt-1.5 max-w-md text-sm text-muted">
                  I'm constantly learning and exploring new technologies to build
                  better, scalable and impactful applications.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 lg:justify-end">
              {WHATS_NEXT.map((item) => (
                <span
                  key={item}
                  className="badge-pill border-primary/20 bg-primary/10 text-violet-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
