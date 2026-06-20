import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { PROFILE, FOOTER_LINKS } from "../../data/portfolioData";
import { scrollToId } from "../../utils/scrollToId";

/**
 * Footer
 * ---------------------------------------------------------------------------
 * Simple footer: brand name, quick links, social icons, and copyright line.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { id: "github", label: "GitHub", href: PROFILE.social.github, icon: Github },
    { id: "linkedin", label: "LinkedIn", href: PROFILE.social.linkedin, icon: Linkedin },
    { id: "email", label: "Email", href: `mailto:${PROFILE.email}`, icon: Mail },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 py-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          {/* Brand */}
          <div>
            <p className="text-lg font-display font-bold text-white">
              {PROFILE.name}
            </p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted sm:justify-start">
              Built with
              <Heart size={14} className="text-rose-500 fill-rose-500" />
              using React &amp; Tailwind CSS
            </p>
          </div>

          {/* Quick links */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollToId(link.href.replace("#", ""))}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-3">
            {socials.map(({ id, label, href, icon: Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:text-primary-light hover:shadow-glow"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-muted">
            © {year} {PROFILE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
