import { GraduationCap } from "lucide-react";
import { SKILL_CATEGORIES, CURRENTLY_LEARNING } from "../../data/portfolioData";
import { getIcon } from "../../utils/iconRegistry";
import Reveal from "../ui/Reveal";

/**
 * SkillsSection
 * ---------------------------------------------------------------------------
 * Renders skill categories (Frontend / Backend / Database / Tools) as cards,
 * each listing the relevant technologies with their brand icons. No fake
 * progress percentages — just clear, honest badges per the design brief.
 * Below the grid: a "Currently Learning" strip.
 */
export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow">My Skills</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Skills &amp; <span className="gradient-text">Technologies</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              Here are the technologies and tools I work with to bring ideas to life.
            </p>
          </Reveal>
        </div>

        {/* Category cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category, idx) => {
            const CategoryIcon = getIcon(category.icon);
            return (
              <Reveal key={category.id} delay={idx * 0.1}>
                <div className="glass-card-hover flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(6,182,212,0.15))",
                      }}
                    >
                      <CategoryIcon size={20} className="text-primary-light" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {category.title}
                      </h3>
                      <span className="mt-0.5 block h-0.5 w-8 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    </div>
                  </div>

                  <ul className="mt-5 flex flex-1 flex-col gap-3.5 divide-y divide-white/[0.05]">
                    {category.skills.map((skill) => {
                      const SkillIcon = getIcon(skill.icon);
                      return (
                        <li
                          key={skill.name}
                          className="flex items-center gap-3 pt-3.5 first:pt-0"
                        >
                          <SkillIcon size={18} style={{ color: skill.color }} />
                          <span className="text-sm text-white">{skill.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Currently Learning strip */}
        <Reveal delay={0.3}>
          <div className="glass-card mt-8 flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15">
                  <GraduationCap size={20} className="text-primary-light" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Currently Learning
                  </h3>
                  <span className="mt-0.5 block h-0.5 w-8 rounded-full bg-gradient-to-r from-primary to-secondary" />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {CURRENTLY_LEARNING.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-sm text-violet-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-5 border-l-2 border-primary/40 pl-4 text-sm italic text-muted">
                I'm continuously learning and exploring new technologies to improve
                my skills and build better applications.
              </p>
            </div>

            <GraduationCap
              size={88}
              className="hidden shrink-0 text-primary/20 lg:block"
              strokeWidth={1.2}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
