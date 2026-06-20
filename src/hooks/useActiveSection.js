import { useEffect, useState } from "react";

/**
 * useActiveSection
 * ---------------------------------------------------------------------------
 * Tracks which section is currently centered in the viewport so the navbar
 * can highlight the matching link. Uses IntersectionObserver instead of
 * scroll-position math for better performance.
 *
 * @param {string[]} sectionIds - array of element IDs to observe (no '#')
 * @returns {string} the id of the currently active section
 */
export default function useActiveSection(sectionIds = []) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest visible ratio that is intersecting
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when a section occupies the middle band of the screen
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  return activeId;
}
