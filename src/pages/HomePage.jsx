import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import JourneyTimeline from "../components/sections/JourneyTimeline";
import GithubSection from "../components/sections/GithubSection";
import ContactSection from "../components/sections/ContactSection";

/**
 * HomePage
 * ---------------------------------------------------------------------------
 * The main single-page scroll experience (Hero → About → Skills → Projects
 * preview → Journey → GitHub → Contact). This is everything that used to
 * live directly in App.jsx before routing was introduced — it's been moved
 * here unchanged so the homepage behaves exactly as before.
 *
 * The Projects section here is just a 4-card PREVIEW ("Featured Projects")
 * with Live Demo / GitHub buttons on each card, same as always. The full
 * project catalog with click-to-expand case studies lives at /projects
 * (see src/pages/ProjectsPage.jsx) — that page is reached via the
 * "View All Projects" button inside <ProjectsSection />.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneyTimeline />
      <GithubSection />
      <ContactSection />
    </>
  );
}