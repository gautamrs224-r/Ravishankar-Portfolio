/**
 * Seed Script
 * ---------------------------------------------------------------------------
 * Run once after setting up MongoDB Atlas to populate the database with
 * your existing portfolio content so you don't have to re-enter everything
 * manually through the admin panel.
 *
 * Usage:
 *   npm run seed
 *
 * This is safe to run multiple times — it clears existing data first then
 * re-inserts, so running it again resets everything back to these defaults.
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "../src/models/Project.js";
import Skill from "../src/models/Skill.js";
import Journey from "../src/models/Journey.js";
import Hero from "../src/models/Hero.js";

dotenv.config();

const projects = [
  {
    title: "Portfolio OS Concept",
    category: "Personal",
    categoryColor: "bg-primary/20 text-primary-light border-primary/30",
    description: "A futuristic OS-inspired developer portfolio with interactive UI and smooth animations.",
    longDescription: "An experimental personal portfolio reimagined as a desktop-style operating system in the browser.",
    image: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=800&q=80",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    features: ["Draggable, resizable windows", "Custom taskbar", "Smooth animations", "Responsive fallback"],
    challenges: "Getting drag-and-resize behavior to feel native while staying performant.",
    liveUrl: "#",
    githubUrl: "#",
    role: "Solo Developer",
    duration: "3 weeks",
    year: "2025",
    order: 0,
    featured: true,
    published: true,
  },
  {
    title: "Weather App",
    category: "Web App",
    categoryColor: "bg-secondary/20 text-secondary border-secondary/30",
    description: "Real time weather application using the OpenWeather API with location search and 5-day forecast.",
    longDescription: "A clean, fast weather lookup tool built to practice consuming a third-party REST API.",
    image: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?w=800&q=80",
    tech: ["React", "API", "CSS"],
    features: ["City search with debounced input", "5-day forecast", "Graceful error states", "Geolocation support"],
    challenges: "Handling OpenWeather free-tier rate limits with debouncing and in-memory cache.",
    liveUrl: "#",
    githubUrl: "#",
    role: "Solo Developer",
    duration: "1 week",
    year: "2025",
    order: 1,
    featured: true,
    published: true,
  },
  {
    title: "Task Manager",
    category: "Full Stack",
    categoryColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    description: "A full stack task management app with authentication and CRUD operations.",
    longDescription: "A complete full-stack task manager built to practice the full MERN loop end to end.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    tech: ["MERN Stack", "JWT", "Tailwind"],
    features: ["JWT authentication", "Full CRUD for tasks", "Per-user data scoping", "Priority levels"],
    challenges: "Keeping auth state in sync using an axios interceptor for automatic token attachment.",
    liveUrl: "#",
    githubUrl: "#",
    role: "Solo Developer",
    duration: "2 weeks",
    year: "2025",
    order: 2,
    featured: true,
    published: true,
  },
  {
    title: "Chat Application",
    category: "Real-time",
    categoryColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    description: "Real time chat application with private rooms and instant messaging.",
    longDescription: "A real-time chat application built to learn WebSockets in practice.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
    tech: ["MERN Stack", "Socket.io", "Tailwind"],
    features: ["Private and group rooms", "Real-time delivery via Socket.io", "Presence indicators", "Message history"],
    challenges: "Reconnecting cleanly after a dropped connection without duplicating messages.",
    liveUrl: "#",
    githubUrl: "#",
    role: "Solo Developer",
    duration: "2 weeks",
    year: "2025",
    order: 3,
    featured: true,
    published: true,
  },
];

const skills = [
  // Frontend
  { category: "frontend", name: "HTML", icon: "SiHtml5", color: "#E34F26", order: 0 },
  { category: "frontend", name: "CSS", icon: "SiCss3", color: "#1572B6", order: 1 },
  { category: "frontend", name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", order: 2 },
  { category: "frontend", name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8", order: 3 },
  { category: "frontend", name: "React", icon: "SiReact", color: "#61DAFB", order: 4 },
  // Backend
  { category: "backend", name: "Node.js", icon: "SiNodedotjs", color: "#3C873A", order: 0 },
  { category: "backend", name: "Express.js", icon: "SiExpress", color: "#FFFFFF", order: 1 },
  { category: "backend", name: "Socket.io", icon: "SiSocketdotio", color: "#FFFFFF", order: 2 },
  // Database
  { category: "database", name: "MongoDB", icon: "SiMongodb", color: "#47A248", order: 0 },
  { category: "database", name: "MySQL", icon: "SiMysql", color: "#4479A1", order: 1 },
  { category: "database", name: "SQL", icon: "Database", color: "#06B6D4", order: 2 },
  // Tools
  { category: "tools", name: "Git", icon: "SiGit", color: "#F05032", order: 0 },
  { category: "tools", name: "GitHub", icon: "SiGithub", color: "#FFFFFF", order: 1 },
  { category: "tools", name: "VS Code", icon: "VsCodeIcon", color: "#007ACC", order: 2 },
  { category: "tools", name: "Postman", icon: "SiPostman", color: "#FF6C37", order: 3 },
  // Currently Learning
  { category: "learning", name: "Redux", icon: "Code2", color: "#764ABC", order: 0 },
  { category: "learning", name: "TypeScript", icon: "SiJavascript", color: "#3178C6", order: 1 },
  { category: "learning", name: "Next.js", icon: "SiReact", color: "#FFFFFF", order: 2 },
];

const journeyEntries = [
  { year: "2024", title: "Started My Web Development Journey", description: "I took my first step into the world of coding and discovered my passion for building things on the web.", icon: "Rocket", side: "left", order: 0 },
  { year: "2024", title: "Learned HTML & CSS", description: "Built the foundation by learning HTML and CSS. Created my first few static web pages.", icon: "FileCode2", side: "right", order: 1 },
  { year: "2025", title: "Learned JavaScript", description: "Dived into JavaScript and understood how to make web pages interactive and dynamic.", icon: "SiJavascript", side: "left", order: 2 },
  { year: "2025", title: "Started React", description: "Began my journey with React and learned components, state, props, and how to build modern UIs.", icon: "SiReact", side: "right", order: 3 },
  { year: "2025", title: "Exploring Backend with Node.js", description: "Started learning Node.js and Express.js to understand how backend works and APIs are built.", icon: "SiNodedotjs", side: "left", order: 4 },
  { year: "2025", title: "Diving into Databases", description: "Learned MongoDB and how databases work. Built CRUD applications and connected with APIs.", icon: "SiMongodb", side: "right", order: 5 },
  { year: "2025", title: "MERN Stack Developer", description: "Combined MongoDB, Express, React and Node.js to build full stack applications.", icon: "Layers", side: "left", order: 6 },
  { year: "2025", title: "Building Projects & Leveling Up", description: "Building real-world projects, solving problems, and improving my skills every day.", icon: "Code2", side: "right", order: 7 },
];

const heroData = {
  name: "Ravishankar Gautam",
  firstName: "Ravishankar",
  role: "Aspiring Full Stack MERN Developer",
  tagline: "I build beautiful, user-friendly and high-performance web applications using the MERN stack.",
  availableForWork: true,
  stats: {
    projects: "25+",
    contributions: "800+",
    followers: "18",
    streak: "31",
  },
  floatingImageUrl: "https://res.cloudinary.com/dhgshusfm/image/upload/v1781927299/Dev_f9mwno.png",
  resumeUrl: "/Ravishankar_Gautam_Resume.pdf",
  social: {
    github: "https://github.com/gautamrs224-r/",
    linkedin: "",
    twitter: "",
    instagram: "",
  },
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Journey.deleteMany({}),
      Hero.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing data");

    // Insert fresh data
    await Project.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects`);

    await Skill.insertMany(skills);
    console.log(`✅ Seeded ${skills.length} skills`);

    await Journey.insertMany(journeyEntries);
    console.log(`✅ Seeded ${journeyEntries.length} journey entries`);

    await Hero.create(heroData);
    console.log("✅ Seeded hero content");

    console.log("\n🎉 Database seeded successfully!");
    console.log("You can now start the backend: npm run dev");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
