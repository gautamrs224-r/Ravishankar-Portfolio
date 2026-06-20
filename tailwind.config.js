/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ---------------------------------------------------------------
        // Exact color system per design spec — do not approximate these.
        // ---------------------------------------------------------------
        background: "#050816", // Deep Space Black — main bg, hero bg
        surfaceAlt: "#0B1023", // Midnight Navy — alternate sections, large containers
        surface: "#10182B", // Dark Glass Navy — skill/project/stats cards, contact form

        primary: {
          DEFAULT: "#8B5CF6", // Primary Purple (violet-500) — buttons, active links, icons
          bright: "#A855F7", // Bright Purple (purple-500) — glows, gradients, hero title
          light: "#A78BFA",
          dark: "#7C3AED",
        },
        secondary: {
          DEFAULT: "#3B82F6", // Neon Blue (blue-500) — buttons, highlights, gradient end
          light: "#60A5FA",
          dark: "#2563EB",
        },
        accent: "#06B6D4", // Cyan Accent (cyan-500) — tech icons, secondary highlights

        text: "#FFFFFF", // Pure White — hero heading, section headings
        bodytext: "#CBD5E1", // Slate 300 — paragraphs, descriptions
        muted: "#94A3B8", // Slate 400 — labels, small text, metadata

        success: "#22C55E", // green-500 — "Available For Work" status dot

        borderlight: "rgba(255,255,255,0.08)",
        borderhover: "rgba(139,92,246,0.4)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        // Purple Glow / Blue Glow exactly as specified
        glow: "0 0 15px rgba(168,85,247,0.35), 0 0 40px rgba(168,85,247,0.15)",
        "glow-blue": "0 0 15px rgba(59,130,246,0.35), 0 0 40px rgba(59,130,246,0.15)",
        "glow-orbit": "0 0 25px rgba(168,85,247,0.5)",
        card: "0 8px 30px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        // Hero "MERN Developer" gradient — purple-500 → violet-500 → blue-500
        "gradient-primary": "linear-gradient(90deg, #A855F7 0%, #8B5CF6 40%, #3B82F6 100%)",
        // Primary button gradient
        "gradient-button": "linear-gradient(90deg, #8B5CF6, #3B82F6)",
        // Hero profile halo behind the portrait
        "gradient-halo":
          "radial-gradient(circle, rgba(139,92,246,0.9) 0%, rgba(59,130,246,0.4) 60%, transparent 100%)",
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",
        "spin-reverse": "spin-reverse 18s linear infinite",
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.7s ease-out forwards",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
