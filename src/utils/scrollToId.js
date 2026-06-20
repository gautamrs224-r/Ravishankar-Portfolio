/**
 * scrollToId
 * ---------------------------------------------------------------------------
 * Smoothly scrolls to an element by ID, accounting for the sticky navbar
 * height so the section title isn't hidden underneath it.
 *
 * @param {string} id - target element id (no '#')
 */
export const NAVBAR_OFFSET = 80;

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
