import { motion } from "framer-motion";

/**
 * Reveal
 * ---------------------------------------------------------------------------
 * Wraps any children in a fade-up scroll-triggered animation. Centralizing
 * this means every section gets identical, consistent motion timing instead
 * of each component hand-rolling its own variants.
 *
 * Usage:
 *   <Reveal><h2>Heading</h2></Reveal>
 *   <Reveal delay={0.2} y={40}><Card /></Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  className = "",
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
