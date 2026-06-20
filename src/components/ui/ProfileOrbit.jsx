import { motion } from "framer-motion";

/**
 * ProfileOrbit
 * ---------------------------------------------------------------------------
 * The signature visual of the hero section:
 *  - A large soft purple/blue gradient glow halo (circular) sitting behind
 *    the subject
 *  - A scattered dot-grid texture for depth (top-right of the halo)
 *  - A transparent-background cutout portrait (PNG with no background)
 *    floating gently up and down — NOT cropped into a circle, no ring
 *  - A few ambient glowing dots scattered around
 *
 * @param {string} imageSrc - URL to a transparent-background PNG cutout
 */
export default function ProfileOrbit({ imageSrc }) {
  return (
    <div className="relative mx-auto flex h-[360px] w-[300px] items-end justify-center sm:h-[460px] sm:w-[380px] lg:h-[620px] lg:w-[480px]">
      {/* Glow halo */}
      <div
        className="absolute left-1/2 top-[18%] h-[78%] w-[78%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(99,60,200,0.4) 40%, rgba(6,182,212,0.18) 70%, transparent 85%)",
        }}
      />
      <div
        className="absolute left-1/2 top-[20%] h-[60%] w-[60%] -translate-x-1/2 rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.45) 0%, transparent 70%)",
        }}
      />

      {/* Dot-grid texture, top-right of the halo (decorative, matches reference) */}
      <svg
        className="absolute right-0 top-0 h-1/2 w-1/2 opacity-50"
        viewBox="0 0 120 120"
        aria-hidden
      >
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={10 + col * 20}
              cy={10 + row * 20}
              r="1.4"
              fill="rgba(196,181,253,0.6)"
            />
          ))
        )}
      </svg>

      {/* Ambient floating dots */}
      <span className="absolute left-[10%] top-[8%] h-2 w-2 rounded-full bg-primary-light animate-twinkle" />
      <span className="absolute left-[4%] top-[58%] h-1.5 w-1.5 rounded-full bg-violet-300 animate-twinkle [animation-delay:600ms]" />
      <span className="absolute right-[6%] top-[40%] h-2 w-2 rounded-full bg-secondary animate-twinkle [animation-delay:1.2s]" />

      {/* Floating cutout portrait — transparent PNG, no circular crop, no ring */}
      <motion.div
        className="relative z-10 h-[92%] w-[88%]"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Ravishankar Gautam"
            className="h-full w-full object-contain object-bottom drop-shadow-[0_25px_45px_rgba(139,92,246,0.35)]"
          />
        ) : (
          // Fallback if no image is supplied
          <div className="flex h-full w-full items-end justify-center">
            <span className="font-display text-6xl font-bold text-white/15">
              R
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
