import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { NAV_LINKS, PROFILE } from "../../data/portfolioData";
import useActiveSection from "../../hooks/useActiveSection";
import { scrollToId } from "../../utils/scrollToId";

/**
 * Navbar
 * ---------------------------------------------------------------------------
 * Sticky, blurred navbar with:
 *  - Logo mark ("R.")
 *  - Center nav links with active-section highlighting
 *  - Download CV button
 *  - Mobile hamburger menu with slide-down panel
 *
 * Nav links point at sections that only exist on the homepage ("/"). If
 * you're on another route (e.g. /projects) when a link is clicked, we
 * navigate home first and then scroll once the homepage has mounted,
 * instead of silently failing to find the target element.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sectionIds = useMemo(
    () => NAV_LINKS.map((link) => link.href.replace("#", "")),
    []
  );
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href) => {
    const id = href.replace("#", "");
    setIsOpen(false);

    const scrollAfterPaint = () => {
      // Wait a tick so the body-scroll-lock effect actually clears before we
      // try to scroll — calling scrollToId synchronously while overflow:hidden
      // is still applied silently does nothing on mobile.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToId(id));
      });
    };

    if (location.pathname !== "/") {
      // Section doesn't exist on this route — go home first, then scroll
      // once HomePage has mounted and rendered its sections.
      navigate("/");
      setTimeout(scrollAfterPaint, 120);
    } else {
      scrollAfterPaint();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-16 py-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#home")}
          className="flex items-center text-2xl font-display font-bold text-white"
          aria-label="Go to home"
        >
          R
          <span className="text-primary">.</span>
        </button>

        {/* Center nav links — desktop only */}
        <ul className="hidden lg:flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-1.5">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = location.pathname === "/" && activeId === id;
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActivePill"
                      className="absolute inset-0 rounded-full bg-primary/20 border border-primary/40"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right side: CV download (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <a
            href={PROFILE.resumeUrl}
            download
            className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 text-sm"
          >
            Download CV
            <Download size={16} />
          </a>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-white"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/[0.08] bg-background/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col gap-1 px-5 py-5">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = location.pathname === "/" && activeId === id;
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${
                        isActive
                          ? "bg-primary/15 text-white border border-primary/30"
                          : "text-muted hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
              <li className="pt-2">
                <a
                  href={PROFILE.resumeUrl}
                  download
                  className="btn-primary w-full"
                >
                  Download CV
                  <Download size={16} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}