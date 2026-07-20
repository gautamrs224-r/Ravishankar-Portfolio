import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderKanban, Cpu, MapPin, MessageSquare, ArrowRight, User } from "lucide-react";
import { getProjects, getSkills, getJourney, getMessages } from "../api.js";

const STAT_CARDS = [
  { label: "Projects",        icon: FolderKanban,   to: "/admin/projects", color: "text-primary-light",  bg: "bg-primary/15"  },
  { label: "Skills",          icon: Cpu,            to: "/admin/skills",   color: "text-secondary",       bg: "bg-secondary/15"},
  { label: "Journey Entries", icon: MapPin,          to: "/admin/journey",  color: "text-violet-400",      bg: "bg-violet-500/15"},
  { label: "Messages",        icon: MessageSquare,   to: "/admin/messages", color: "text-success",         bg: "bg-success/15"  },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ projects: 0, skills: 0, journey: 0, messages: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getProjects(),
      getSkills(),
      getJourney(),
      getMessages(),
    ]).then(([p, s, j, m]) => {
      setCounts({
        projects: p.value?.data?.length || 0,
        skills:   s.value?.flat?.length || 0,
        journey:  j.value?.data?.length || 0,
        messages: m.value?.data?.length || 0,
        unread:   m.value?.unreadCount  || 0,
      });
    }).finally(() => setLoading(false));
  }, []);

  const values = [counts.projects, counts.skills, counts.journey, counts.messages];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted">
          Welcome back. Here's an overview of your portfolio content.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map(({ label, icon: Icon, to, color, bg }, idx) => (
          <Link
            key={label}
            to={to}
            className="glass-card-hover flex items-center gap-4 p-5"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg}`}>
              <Icon size={22} className={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {loading ? "—" : values[idx]}
                {label === "Messages" && counts.unread > 0 && (
                  <span className="ml-2 rounded-full bg-success/20 px-2 py-0.5 text-xs font-semibold text-success">
                    {counts.unread} new
                  </span>
                )}
              </p>
              <p className="text-sm text-muted">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="mb-4 font-display text-lg font-semibold text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Add New Project",   to: "/admin/projects",  icon: FolderKanban },
            { label: "Add Skill",         to: "/admin/skills",    icon: Cpu          },
            { label: "Add Journey Entry", to: "/admin/journey",   icon: MapPin       },
            { label: "Edit Hero Content", to: "/admin/hero",      icon: User         },
            { label: "View Messages",     to: "/admin/messages",  icon: MessageSquare},
          ].map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white transition-all hover:border-primary/40 hover:bg-white/[0.05]"
            >
              <span className="flex items-center gap-2.5">
                <Icon size={16} className="text-primary-light" />
                {label}
              </span>
              <ArrowRight size={15} className="text-muted" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
