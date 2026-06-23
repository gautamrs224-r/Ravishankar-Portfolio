import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

/**
 * App
 * ---------------------------------------------------------------------------
 * Top-level router shell. Navbar and Footer are rendered once, outside the
 * <Routes>, so they persist across page changes instead of re-mounting.
 *
 *   "/"          → HomePage   (the original single-page scroll experience)
 *   "/projects"  → ProjectsPage (full project catalog with click-to-expand
 *                  case study modals — reached via "View All Projects")
 *
 * ScrollToTop resets scroll position to the top whenever the route changes,
 * since browsers otherwise preserve scroll position across navigations,
 * which feels broken when jumping between pages.
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}