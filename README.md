# Ravishankar Gautam — Developer Portfolio

A premium, dark-themed, fully responsive MERN developer portfolio built with **React + Tailwind CSS** (no UI framework like Bootstrap/MUI/Chakra). Subtle motion via **Framer Motion**.

---

## ✨ Features

- Sticky glass navbar with scroll-spy active states + mobile hamburger menu
- Full-viewport hero with floating, glowing profile portrait
- Animated tech-stack badges and a glass stats card
- About, Skills, Projects, Journey Timeline, GitHub dashboard, and Contact sections
- **Dedicated `/projects` catalog page** — every card is clickable and opens a full case-study modal (long description, key features, challenges, gallery, Live Demo/GitHub links). The homepage's "Featured Projects" preview keeps inline Live Demo/GitHub buttons as before; only the full catalog uses the click-to-expand pattern.
- Live GitHub stats (avatar, bio, repo count, followers, top repos, languages) fetched from the public GitHub REST API at runtime
- Contact form with real client-side validation (name / email / message)
- Scroll-triggered fade-up reveals on every section (`prefers-reduced-motion` respected)
- Fully responsive: 320px mobile → 1440px+ desktop
- Clean, centralized content file (`src/data/portfolioData.js`) — edit copy without touching components

---

## 🗂 Folder Structure

```
ravishankar-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Sticky nav, hamburger menu, scroll-spy, route-aware links
│   │   │   ├── Footer.jsx          # Brand, links, socials, copyright, route-aware links
│   │   │   └── ScrollToTop.jsx     # Resets scroll position on route change
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   ├── ProjectsSection.jsx       # Homepage "Featured Projects" preview (4 cards)
│   │   │   ├── JourneyTimeline.jsx
│   │   │   ├── GithubSection.jsx
│   │   │   └── ContactSection.jsx
│   │   └── ui/
│   │       ├── ProfileOrbit.jsx          # Floating portrait + glow halo
│   │       ├── ProjectCard.jsx           # Homepage card (has Live Demo/GitHub buttons)
│   │       ├── ProjectCardClickable.jsx  # /projects catalog card (click-only, opens modal)
│   │       ├── ProjectDetailModal.jsx    # Full case-study popup (Live Demo/GitHub live here)
│   │       └── Reveal.jsx                # Scroll-reveal animation wrapper
│   ├── pages/
│   │   ├── HomePage.jsx            # "/" — the original single-page scroll experience
│   │   └── ProjectsPage.jsx        # "/projects" — full clickable project catalog
│   ├── data/
│   │   └── portfolioData.js        # ALL site content lives here, including case-study fields
│   ├── hooks/
│   │   ├── useActiveSection.js     # IntersectionObserver-based nav highlighting
│   │   ├── useContactForm.js       # Form state + validation logic
│   │   └── useGithubStats.js       # Live GitHub REST API fetch + fallback logic
│   ├── utils/
│   │   ├── iconRegistry.js         # string-name → icon component resolver
│   │   └── scrollToId.js           # smooth-scroll helper (navbar offset aware)
│   ├── App.jsx                     # Router shell: BrowserRouter + Routes ("/" and "/projects")
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind layers + reusable utility classes
├── index.html
├── tailwind.config.js               # Custom color tokens, animations, fonts
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

**Requirements:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → opens http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 🎨 Design Tokens (Tailwind)

Defined in `tailwind.config.js`, matching the design brief exactly:

| Token        | Value                  | Tailwind class            |
|--------------|-------------------------|----------------------------|
| Background   | `#0F172A`               | `bg-background`            |
| Card         | `#1E293B`               | `bg-surface`                |
| Primary      | `#8B5CF6`               | `text-primary` / `bg-primary` |
| Secondary    | `#06B6D4`               | `text-secondary` / `bg-secondary` |
| Text         | `#FFFFFF`               | `text-white`                |
| Muted        | `#94A3B8`               | `text-muted`                |
| Border       | `rgba(255,255,255,0.08)`| `border-white/[0.08]`       |

Reusable component classes (in `src/index.css`):
- `.glass-card` / `.glass-card-hover` — glassmorphism panels
- `.gradient-text` — purple → blue gradient text
- `.btn-primary` / `.btn-secondary` — CTA buttons
- `.eyebrow` — small uppercase section label with side rules
- `.badge-pill` — pill-shaped tag/chip

---

## ✏️ Customizing Content

**You will almost never need to touch a component file to update content.**
Everything lives in `src/data/portfolioData.js`:

- `PROFILE` — name, role, tagline, resume path, social links, contact details
- `HERO_STATS` / `HERO_TECH_STACK` — hero stats card + tech badges
- `ABOUT` — about paragraphs, quote, info cards, trait cards
- `SKILL_CATEGORIES` / `CURRENTLY_LEARNING` — skills section
- `PROJECTS` — add/edit/remove project cards (title, image, tech, links)
- `JOURNEY_MILESTONES` / `WHATS_NEXT` — timeline entries
- `GITHUB_STATS` — GitHub dashboard numbers, languages, top repos
- `CONTACT_INFO` — contact info cards (email, phone, location, availability)

### Adding a new project
Just append an object to the `PROJECTS` array:

```js
{
  id: "my-new-project",
  title: "My New Project",
  category: "Web App",
  categoryColor: "bg-secondary/20 text-secondary border-secondary/30",
  description: "One or two sentence summary.",
  image: "https://your-image-url.com/preview.png",
  tech: ["React", "Node.js"],
  liveUrl: "https://your-demo-link.com",
  githubUrl: "https://github.com/you/repo",
}
```

### Replacing the profile photo
Open `src/components/ui/ProfileOrbit.jsx` and pass a real image:
```jsx
<ProfileOrbit imageSrc="/your-photo.jpg" />
```
(used inside `HeroSection.jsx`). Place the image file in `public/` and reference it
with a root-relative path, e.g. `/your-photo.jpg`.

### Connecting the contact form to a real backend
`src/hooks/useContactForm.js` currently simulates a network request
(`simulateSubmit`). Replace it with a real `fetch()` call to your Express/Node
API endpoint, e.g.:

```js
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});
if (!res.ok) throw new Error("Failed to send");
```

### Resume / CV file
Drop your PDF into `public/` and update `PROFILE.resumeUrl` in
`portfolioData.js` to match the filename, e.g. `/Ravishankar_Gautam_Resume.pdf`.

---

## 📱 Responsive Behavior

- **Mobile (< 768px):** hero stacks (image above text), single-column projects,
  full-width buttons, hamburger nav.
- **Tablet (≥ 768px):** 2-column projects/skills grids.
- **Laptop (≥ 1024px):** full desktop nav, 2-column hero, 3-column projects,
  alternating timeline.
- **Desktop (≥ 1440px):** content is centered with a `max-w-7xl` container so
  it never feels overly stretched.

---

## 🧩 Tech Stack

- React 18
- Tailwind CSS 3
- Framer Motion (animations)
- React Router DOM 6 (routing for the `/projects` catalog page)
- lucide-react + react-icons (icons)
- Vite (build tool)

---

## 📁 Adding a project to the catalog

The `/projects` page and its detail modal read from the same `PROJECTS`
array in `src/data/portfolioData.js` as the homepage preview — there's
nothing extra to wire up. Each project supports these optional case-study
fields, shown in the modal when present:

```js
{
  // ...existing fields (id, title, category, description, image, tech, liveUrl, githubUrl)
  role: "Solo Developer",
  duration: "2 weeks",
  year: "2025",
  longDescription: "A longer paragraph for the detail modal...",
  features: ["Feature one", "Feature two"],
  challenges: "What was hard and how you solved it.",
  gallery: ["https://...screenshot-1.png", "https://...screenshot-2.png"],
}
```

Any field you omit is simply skipped in the modal — none of them are required.