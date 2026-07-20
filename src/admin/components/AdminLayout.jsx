import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, Cpu, MapPin,
  User, MessageSquare, LogOut, Menu, X, ExternalLink,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext.jsx";

const NAV_ITEMS = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/projects",  icon: FolderKanban,    label: "Projects"  },
  { to: "/admin/skills",    icon: Cpu,             label: "Skills"    },
  { to: "/admin/journey",   icon: MapPin,          label: "Journey"   },
  { to: "/admin/hero",      icon: User,            label: "Hero"      },
  { to: "/admin/messages",  icon: MessageSquare,   label: "Messages"  },
];

export default function AdminLayout({ children }) {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const Sidebar = () => (
    <aside className="flex h-full w-64 flex-col border-r border-white/[0.08] bg-surface p-4">
      {/* Brand */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="font-display text-lg font-bold text-white">
            R<span className="text-primary">.</span> Admin
          </p>
          <p className="text-xs text-muted">Portfolio Control Panel</p>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/20 text-white border border-primary/30"
                  : "text-muted hover:bg-white/[0.05] hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer links */}
      <div className="mt-4 space-y-1 border-t border-white/[0.08] pt-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted hover:bg-white/[0.05] hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          View Portfolio
        </a>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 flex h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="flex items-center justify-between border-b border-white/[0.08] bg-surface px-4 py-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <Menu size={22} />
          </button>
          <p className="font-display font-bold text-white">
            R<span className="text-primary">.</span> Admin
          </p>
          <div className="w-6" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
