import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from "lucide-react";
import { getProjects, createProject, updateProject, deleteProject } from "../api.js";

const EMPTY = {
  title: "", category: "", categoryColor: "bg-primary/20 text-primary-light border-primary/30",
  description: "", longDescription: "", image: "", tech: "",
  features: "", challenges: "", liveUrl: "#", githubUrl: "#",
  role: "Solo Developer", duration: "", year: "", featured: false, published: true,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing]   = useState(null); // null = adding new
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError]       = useState("");

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data || []);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setFormOpen(true); setError(""); };
  const openEdit = (p) => {
    setEditing(p._id);
    setForm({ ...p, tech: p.tech?.join(", ") || "", features: p.features?.join("\n") || "" });
    setFormOpen(true);
    setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      const payload = {
        ...form,
        tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
        features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      };
      if (editing) { await updateProject(editing, payload); }
      else { await createProject(payload); }
      setFormOpen(false);
      fetchProjects();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteProject(deleteId);
    setDeleteId(null);
    fetchProjects();
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key] || ""}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary/50 focus:outline-none"
      />
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-muted">{projects.length} total</p>
        </div>
        <button onClick={openAdd} className="btn-primary !py-2.5 text-sm">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Project list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p._id} className="glass-card flex items-center gap-4 p-4">
              <img src={p.image} alt={p.title} className="h-14 w-20 shrink-0 rounded-lg object-cover" />
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-white truncate">{p.title}</p>
                <p className="text-xs text-muted truncate">{p.description}</p>
                <div className="mt-1 flex gap-2">
                  <span className="badge-pill text-xs">{p.category}</span>
                  {p.featured && <span className="badge-pill border-primary/30 text-primary-light text-xs">Featured</span>}
                  {!p.published && <span className="badge-pill border-rose-500/30 text-rose-400 text-xs">Draft</span>}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openEdit(p)} className="rounded-lg p-2 text-muted hover:bg-white/[0.06] hover:text-white">
                  <Pencil size={16} />
                </button>
                <button onClick={() => setDeleteId(p._id)} className="rounded-lg p-2 text-muted hover:bg-rose-500/10 hover:text-rose-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="glass-card py-16 text-center text-muted">
              No projects yet. Click "Add Project" to get started.
            </div>
          )}
        </div>
      )}

      {/* Add/Edit form modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-10 backdrop-blur-sm">
          <div className="glass-card w-full max-w-2xl border-primary/20 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">
                {editing ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={() => setFormOpen(false)} className="text-muted hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {field("title", "Title *")}
                {field("category", "Category")}
                {field("image", "Image URL *")}
                {field("liveUrl", "Live URL")}
                {field("githubUrl", "GitHub URL")}
                {field("role", "Your Role")}
                {field("duration", "Duration", "text", "e.g. 2 weeks")}
                {field("year", "Year", "text", "e.g. 2025")}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Short Description *</label>
                <textarea
                  rows={2}
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary/50 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Long Description (case study)</label>
                <textarea
                  rows={3}
                  value={form.longDescription || ""}
                  onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Tech Stack (comma separated)</label>
                <input
                  value={form.tech || ""}
                  onChange={(e) => setForm({ ...form, tech: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Features (one per line)</label>
                <textarea
                  rows={3}
                  value={form.features || ""}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  placeholder={"JWT Authentication\nFull CRUD operations\nResponsive design"}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary/50 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Challenges & Learnings</label>
                <textarea
                  rows={2}
                  value={form.challenges || ""}
                  onChange={(e) => setForm({ ...form, challenges: e.target.value })}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
                  <input type="checkbox" checked={form.featured || false}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="h-4 w-4 accent-violet-500"
                  />
                  Featured on homepage
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
                  <input type="checkbox" checked={form.published ?? true}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="h-4 w-4 accent-violet-500"
                  />
                  Published
                </label>
              </div>

              {error && <p className="rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-400">{error}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setFormOpen(false)} className="btn-secondary !py-2.5 text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary !py-2.5 text-sm disabled:opacity-60">
                  <Save size={15} /> {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm border-rose-500/30 p-6 text-center">
            <Trash2 size={32} className="mx-auto mb-3 text-rose-400" />
            <h3 className="font-display text-lg font-bold text-white">Delete Project?</h3>
            <p className="mt-1 text-sm text-muted">This action cannot be undone.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1 !py-2.5 text-sm">Cancel</button>
              <button onClick={handleDelete} className="flex-1 rounded-xl bg-rose-500 py-2.5 text-sm font-semibold text-white hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
