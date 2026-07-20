import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

// Admin panel
import { AdminProvider } from "./admin/context/AdminContext.jsx";
import AdminRoute from "./admin/components/AdminRoute.jsx";
import AdminLayout from "./admin/components/AdminLayout.jsx";
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import AdminProjects from "./admin/pages/AdminProjects.jsx";
import AdminSkills from "./admin/pages/AdminSkills.jsx";
import AdminJourney from "./admin/pages/AdminJourney.jsx";
import AdminHero from "./admin/pages/AdminHero.jsx";
import AdminMessages from "./admin/pages/AdminMessages.jsx";

/**
 * App
 * ---------------------------------------------------------------------------
 * Router shell.
 *
 *   PUBLIC
 *   "/"            → HomePage  (single-page scroll experience)
 *   "/projects"    → ProjectsPage (full catalog + case-study modal)
 *
 *   ADMIN (protected — requires login at /admin)
 *   "/admin"             → AdminLogin
 *   "/admin/dashboard"   → AdminDashboard
 *   "/admin/projects"    → AdminProjects
 *   "/admin/skills"      → AdminSkills
 *   "/admin/journey"     → AdminJourney
 *   "/admin/hero"        → AdminHero
 *   "/admin/messages"    → AdminMessages
 */
export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <ScrollToTop />
        <Routes>
          {/* ── Public portfolio ── */}
          <Route
            path="/*"
            element={
              <div className="relative min-h-screen overflow-x-hidden bg-background">
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />

          {/* ── Admin login (public) ── */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ── Admin panel (protected) ── */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="projects"  element={<AdminProjects />}  />
                    <Route path="skills"    element={<AdminSkills />}    />
                    <Route path="journey"   element={<AdminJourney />}   />
                    <Route path="hero"      element={<AdminHero />}      />
                    <Route path="messages"  element={<AdminMessages />}  />
                  </Routes>
                </AdminLayout>
              </AdminRoute>
            }
          />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}
