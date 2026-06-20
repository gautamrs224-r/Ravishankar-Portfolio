import { ABOUT } from "../../data/portfolioData";
import { getIcon } from "../../utils/iconRegistry";
import Reveal from "../ui/Reveal";

/**
 * AboutSection
 * ---------------------------------------------------------------------------
 * Two-column layout (text left, portrait + quote right on desktop),
 * info cards (Location / Education / Status), and a 4-up trait grid below.
 */
export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <Reveal className="flex justify-center">
          <span className="eyebrow">About Me</span>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading + summary + info cards */}
          <div>
            <Reveal>
              <h2 className="text-4xl font-bold sm:text-5xl">
                <span className="gradient-text">About Me</span>
              </h2>
              <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
            </Reveal>

            <Reveal delay={0.1} className="mt-6 space-y-5">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted sm:text-lg">
                  {p}
                </p>
              ))}
            </Reveal>

            {/* Info cards: Location / Education / Status */}
            <Reveal delay={0.2}>
              <div className="glass-card mt-8 grid grid-cols-3 divide-x divide-white/[0.06] p-6">
                {ABOUT.infoCards.map((card) => {
                  const Icon = getIcon(card.icon);
                  return (
                    <div key={card.id} className="flex flex-col items-center gap-2 px-2 text-center">
                      <Icon size={22} className="text-primary-light" />
                      <p className="text-xs text-muted">{card.label}</p>
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                        {card.value}
                        {card.dotColor && (
                          <span className={`h-2 w-2 rounded-full ${card.dotColor}`} />
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right: portrait + quote card */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.15}>
              <div className="glass-card overflow-hidden border-primary/20 p-1">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-surface to-secondary/10">
                  <img
                    src="https://res.cloudinary.com/dhgshusfm/image/upload/v1781923738/WhatsApp_Image_2025-07-14_at_04.58.57_1837cbbb_ouencc.jpg"
                    alt="Ravishankar working at his desk"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="glass-card p-6">
                <span className="text-3xl text-primary-light">&ldquo;</span>
                <p className="mt-1 text-lg italic leading-relaxed text-white">
                  {ABOUT.quote.text}
                </p>
                <p className="mt-3 text-sm font-semibold text-primary-light">
                  — {ABOUT.quote.author}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Trait cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.traits.map((trait, idx) => {
            const Icon = getIcon(trait.icon);
            return (
              <Reveal key={trait.id} delay={idx * 0.08}>
                <div className="glass-card-hover flex h-full flex-col gap-3 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                    <Icon size={22} className="text-primary-light" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {trait.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {trait.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
