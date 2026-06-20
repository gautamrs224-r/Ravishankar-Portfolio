import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import JourneyTimeline from "./components/sections/JourneyTimeline";
import GithubSection from "./components/sections/GithubSection";
import ContactSection from "./components/sections/ContactSection";

/**
 * App
 * ---------------------------------------------------------------------------
 * Top-level page composition. Each section is a self-contained component
 * under src/components/sections/, all driven by content in
 * src/data/portfolioData.js. To reorder sections, just reorder them here.
 */
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneyTimeline />
        <GithubSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
