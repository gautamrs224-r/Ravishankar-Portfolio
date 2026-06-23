/**
 * portfolioData.js
 * ---------------------------------------------------------------------------
 * Single source of truth for all portfolio content.
 * Editing copy, projects, skills, or links should happen HERE, not inside
 * component files. This keeps components purely presentational and makes
 * the whole site easy to update (e.g. when Ravishankar finishes a new project).
 * ---------------------------------------------------------------------------
 */

export const PROFILE = {
  name: "Ravishankar Gautam",
  firstName: "Ravishankar",
  role: "Aspiring Full Stack MERN Developer",
  tagline:
    "I build beautiful, user-friendly and high-performance web applications using the MERN stack.",
  location: "India",
  education: "B.Tech (CSE)",
  status: "Open to Work",
  email: "ravishankar.dev@gmail.com",
  phone: "+91 98765 43210",
  cityRegion: "Bangalore, Karnataka, India",
  resumeUrl: "/Ravishankar_Gautam_Resume.pdf",
  social: {
    github: "https://github.com/gautamrs224-r/",
    linkedin: "https://linkedin.com/in/ravishankar-dev",
    twitter: "https://twitter.com/ravishankar_dev",
    instagram: "https://instagram.com/ravishankar.dev",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STATS = [
  { id: "projects", label: "Projects", value: "25+", icon: "Code2", color: "#8B5CF6" },
  { id: "contributions", label: "Contributions", value: "800+", icon: "GitBranch", color: "#22C55E" },
  { id: "followers", label: "Followers", value: "18", icon: "Star", color: "#3B82F6" },
  { id: "streak", label: "Day Streak", value: "31", icon: "CalendarCheck", color: "#A855F7" },
];

export const HERO_TECH_STACK = [
  { id: "react", label: "React", icon: "SiReact", color: "#61DAFB" },
  { id: "node", label: "Node.js", icon: "SiNodedotjs", color: "#3C873A" },
  { id: "express", label: "Express.js", icon: "SiExpress", color: "#FFFFFF" },
  { id: "mongodb", label: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { id: "tailwind", label: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8" },
];

export const ABOUT = {
  paragraphs: [
    "I am a self-taught Full Stack MERN Developer who loves building web applications that solve real world problems. I enjoy turning ideas into real products and constantly learning new technologies.",
    "I am passionate about writing clean, efficient code and creating seamless user experiences.",
  ],
  quote: {
    text: "Learning every day, building step by step, and improving 1% at a time.",
    author: "Ravishankar",
  },
  infoCards: [
    { id: "location", label: "Location", value: "India", icon: "MapPin" },
    { id: "education", label: "Education", value: "B.Tech (CSE)", icon: "GraduationCap" },
    { id: "status", label: "Status", value: "Open to Work", icon: "Briefcase", dotColor: "bg-success" },
  ],
  traits: [
    {
      id: "problem-solver",
      title: "Problem Solver",
      description: "I love solving real world problems with code.",
      icon: "Code2",
    },
    {
      id: "fast-learner",
      title: "Fast Learner",
      description: "I enjoy learning new tech and adapting quickly.",
      icon: "Rocket",
    },
    {
      id: "creative-thinker",
      title: "Creative Thinker",
      description: "I build innovative solutions with clean UI/UX.",
      icon: "Lightbulb",
    },
    {
      id: "goal-oriented",
      title: "Goal Oriented",
      description: "Focused on becoming a better developer every day.",
      icon: "Target",
    },
  ],
};

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "Code2",
    accent: "from-primary to-violet-400",
    skills: [
      { name: "HTML", icon: "SiHtml5", color: "#E34F26" },
      { name: "CSS", icon: "SiCss3", color: "#1572B6" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8" },
      { name: "React", icon: "SiReact", color: "#61DAFB" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    accent: "from-emerald-400 to-emerald-600",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs", color: "#3C873A" },
      { name: "Express.js", icon: "SiExpress", color: "#FFFFFF" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: "Database",
    accent: "from-cyan-400 to-blue-500",
    skills: [{ name: "MongoDB", icon: "SiMongodb", color: "#47A248" }],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "Wrench",
    accent: "from-fuchsia-400 to-purple-500",
    skills: [
      { name: "Git", icon: "SiGit", color: "#F05032" },
      { name: "GitHub", icon: "SiGithub", color: "#FFFFFF" },
      { name: "VS Code", icon: "VsCodeIcon", color: "#007ACC" },
      { name: "Postman", icon: "SiPostman", color: "#FF6C37" },
    ],
  },
];

export const CURRENTLY_LEARNING = [
  "Redux",
  "TypeScript",
  "Advanced React Patterns",
  "Next.js",
  "System Design",
];

export const PROJECTS = [
  {
    id: "portfolio-os",
    title: "Portfolio OS Concept",
    category: "Personal",
    categoryColor: "bg-primary/20 text-primary-light border-primary/30",
    description:
      "A futuristic OS-inspired developer portfolio with interactive UI and smooth animations.",
    image:
      "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=800&q=80",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    // --- Extended fields used by the /projects detail modal ---
    role: "Solo Developer",
    duration: "3 weeks",
    year: "2025",
    longDescription:
      "An experimental personal portfolio reimagined as a desktop-style operating system in the browser. Windows, a taskbar, and draggable panels replace the usual scroll-down page, turning the portfolio itself into a small interactive product rather than a static document.",
    features: [
      "Draggable, resizable 'windows' for each portfolio section",
      "Custom taskbar with running-app indicators",
      "Smooth open/close/minimize animations powered by Framer Motion",
      "Fully responsive fallback to a normal scrolling layout on mobile",
    ],
    challenges:
      "Getting drag-and-resize behavior to feel native (not janky) while staying performant on lower-end devices was the hardest part — solved by constraining motion calculations to transform/opacity only and avoiding layout-triggering CSS properties during drags.",
    gallery: [
      "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=1200&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    ],
  },
  {
    id: "weather-app",
    title: "Weather App",
    category: "Web App",
    categoryColor: "bg-secondary/20 text-secondary border-secondary/30",
    description:
      "Real time weather application using the OpenWeather API with location search and 5-day forecast.",
    image:
      "https://images.unsplash.com/photo-1530908295418-a12e326966ba?w=800&q=80",
    tech: ["React", "API", "CSS"],
    liveUrl: "#",
    githubUrl: "#",
    role: "Solo Developer",
    duration: "1 week",
    year: "2025",
    longDescription:
      "A clean, fast weather lookup tool built to practice consuming a third-party REST API and handling real-world async states (loading, error, empty) properly instead of assuming the happy path.",
    features: [
      "City search with debounced input to avoid spamming the API",
      "Current conditions plus a 5-day forecast view",
      "Graceful error states for invalid city names and network failures",
      "Automatic geolocation-based weather on first load (with permission)",
    ],
    challenges:
      "Handling the OpenWeather free-tier rate limits meant adding request debouncing and a small in-memory cache so repeated searches for the same city didn't re-fetch unnecessarily.",
    gallery: [
      "https://images.unsplash.com/photo-1530908295418-a12e326966ba?w=1200&q=80",
      "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=1200&q=80",
    ],
  },
  {
    id: "task-manager",
    title: "Task Manager",
    category: "Full Stack",
    categoryColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    description:
      "A full stack task management app with authentication and CRUD operations.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    tech: ["MERN Stack", "JWT", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    role: "Solo Developer",
    duration: "2 weeks",
    year: "2025",
    longDescription:
      "A complete full-stack task manager built to practice the full MERN loop end to end: a MongoDB schema, an Express REST API, JWT-based auth, and a React frontend that consumes it — covering the whole stack rather than just the frontend half.",
    features: [
      "Email/password signup and login secured with hashed passwords + JWT",
      "Full CRUD for tasks: create, edit, mark complete, delete",
      "Tasks scoped per-user — one account never sees another's data",
      "Priority levels and due-date sorting",
    ],
    challenges:
      "Keeping auth state in sync between the frontend and a stateless JWT backend was the trickiest part — solved with an axios interceptor that attaches the token automatically and redirects to login on a 401, instead of scattering that logic across every API call.",
    gallery: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    ],
  },
  {
    id: "chat-app",
    title: "Chat Application",
    category: "Real-time",
    categoryColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    description:
      "Real time chat application with private rooms and instant messaging.",
    image:
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
    tech: ["MERN Stack", "Socket.io", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    role: "Solo Developer",
    duration: "2 weeks",
    year: "2025",
    longDescription:
      "A real-time chat application built to learn WebSockets in practice — going beyond typical request/response REST work into persistent connections, live events, and presence.",
    features: [
      "Private 1-on-1 rooms plus group rooms",
      "Real-time message delivery via Socket.io (no polling)",
      "Online/offline presence indicators",
      "Message history persisted in MongoDB and loaded on room join",
    ],
    challenges:
      "Reconnecting cleanly after a dropped connection (phone sleep, network switch) without duplicating messages or losing room membership required careful handling of Socket.io's reconnection events and de-duping on the client.",
    gallery: [
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=1200&q=80",
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&q=80",
    ],
  },
];

export const JOURNEY_MILESTONES = [
  {
    id: "started",
    year: "2024",
    title: "Started My Web Development Journey",
    description:
      "I took my first step into the world of coding and discovered my passion for building things on the web.",
    icon: "Rocket",
    side: "left",
  },
  {
    id: "html-css",
    year: "2024",
    title: "Learned HTML & CSS",
    description:
      "Built the foundation by learning HTML and CSS. Created my first few static web pages.",
    icon: "FileCode2",
    side: "right",
  },
  {
    id: "javascript",
    year: "2025",
    title: "Learned JavaScript",
    description:
      "Dived into JavaScript and understood how to make web pages interactive and dynamic.",
    icon: "SiJavascript",
    side: "left",
  },
  {
    id: "react",
    year: "2025",
    title: "Started React",
    description:
      "Began my journey with React and learned components, state, props, and how to build modern UIs.",
    icon: "SiReact",
    side: "right",
  },
  {
    id: "backend",
    year: "2025",
    title: "Exploring Backend with Node.js",
    description:
      "Started learning Node.js and Express.js to understand how backend works and APIs are built.",
    icon: "SiNodedotjs",
    side: "left",
  },
  {
    id: "database",
    year: "2025",
    title: "Diving into Databases",
    description:
      "Learned MongoDB and how databases work. Built CRUD applications and connected with APIs.",
    icon: "SiMongodb",
    side: "right",
  },
  {
    id: "mern",
    year: "2025",
    title: "MERN Stack Developer",
    description:
      "Combined MongoDB, Express, React and Node.js to build full stack applications.",
    icon: "Layers",
    side: "left",
  },
  {
    id: "projects",
    year: "2025",
    title: "Building Projects & Leveling Up",
    description:
      "Building real-world projects, solving problems, and improving my skills every day.",
    icon: "Code2",
    side: "right",
  },
];

export const WHATS_NEXT = ["TypeScript", "Next.js", "DevOps", "System Design"];

export const GITHUB_STATS = {
  username: "gautamrs224-r",
  profileUrl: "https://github.com/gautamrs224-r/",
  // Fallback values shown only if the live GitHub API call fails (offline,
  // rate-limited, etc). Once useGithubStats() succeeds, the live numbers
  // from the real account replace these automatically — see GithubSection.jsx
  bio: "Aspiring Full Stack MERN Developer who loves building modern web applications and solving problems.",
  location: "India",
  summary: [
    { id: "repos", label: "Repositories", sublabel: "Total Repositories", value: 25, icon: "Code2" },
    { id: "contributions", label: "Contributions", sublabel: "Total Contributions", value: 821, icon: "GitBranch" },
    { id: "streak", label: "Current Streak", sublabel: "Days in a row", value: 31, icon: "Calendar" },
    { id: "followers", label: "Followers", sublabel: "Total Followers", value: 18, icon: "Star" },
  ],
  languages: [
    { name: "JavaScript", percent: 43.2, color: "#F7DF1E" },
    { name: "React", percent: 26.7, color: "#22D3EE" },
    { name: "CSS", percent: 12.4, color: "#8B5CF6" },
    { name: "Node.js", percent: 9.3, color: "#3C873A" },
    { name: "HTML", percent: 8.4, color: "#F97316" },
  ],
  topRepos: [
    {
      id: "portfolio-v1",
      name: "portfolio-v1",
      description: "Personal portfolio built with React & Tailwind CSS",
      stars: 23,
      forks: 5,
      icon: "Monitor",
    },
    {
      id: "task-manager",
      name: "task-manager",
      description: "MERN stack task management application",
      stars: 18,
      forks: 7,
      icon: "ClipboardList",
    },
    {
      id: "weather-app",
      name: "weather-app",
      description: "Real time weather app using OpenWeather API",
      stars: 15,
      forks: 3,
      icon: "Cloud",
    },
  ],
  footerStats: [
    { id: "commits", label: "Commits", value: "1,456", icon: "Code2" },
    { id: "prs", label: "Pull Requests", value: "312", icon: "GitBranch" },
    { id: "issues", label: "Issues Solved", value: "126", icon: "Star" },
  ],
};

export const CONTACT_INFO = [
  {
    id: "email",
    label: "Email",
    description: "The best way to reach me.",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: "Mail",
  },
  {
    id: "phone",
    label: "Phone",
    description: "Available for calls (9AM - 8PM IST).",
    value: PROFILE.phone,
    href: `tel:${PROFILE.phone.replace(/\s/g, "")}`,
    icon: "Phone",
  },
  {
    id: "location",
    label: "Location",
    description: "Based in India.",
    value: PROFILE.cityRegion,
    href: null,
    icon: "MapPin",
  },
  {
    id: "availability",
    label: "Availability",
    description: "Open to work and freelance projects.",
    value: "Open to Work",
    href: null,
    icon: "Clock",
    dot: true,
  },
];

export const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];