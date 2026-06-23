import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * ---------------------------------------------------------------------------
 * React Router does not reset scroll position on navigation by default
 * (unlike a full page load). Without this, navigating from the bottom of
 * the homepage to /projects would land you scrolled halfway down the new
 * page, which looks broken. This renders nothing — it just watches the
 * route and scrolls to top whenever the pathname changes.
 *
 * Skips the scroll-reset for in-page hash navigation (e.g. "/#contact")
 * so the navbar's smooth-scroll-to-section behavior on the homepage isn't
 * fought by this effect.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // let scrollToId handle hash-based in-page scrolling
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}