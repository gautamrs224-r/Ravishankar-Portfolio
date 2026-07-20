import { useEffect, useState } from "react";
import { Plus, Trash2, X, Save } from "lucide-react";
import { getSkills, createSkill, deleteSkill } from "../api.js";

const CATEGORIES = ["frontend", "backend", "database", "tools", "learning"];

const EMPTY = { category: "frontend", name: "", icon: "", color: "#FFFFFF", order: 0 };

export default function AdminSkills() {
  const [grouped, setGrouped]   = useState({});
  const [loading, setLoading]   = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  const fetchSkills = async () => {
    try {
      const res = await getSkills();
      setGrouped(res.data || {});
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      await createSkill(form);
      setFormOpen(false);
      setForm(EMPTY);
      fetchSkills();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    await deleteSkill(id);
    fetchSkills();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Skills</h1>
          <p className="mt-1 text-sm text-muted">Manage your tech stack categories</p>
        </div>
        <button onClick={() => { setFormOpen(true); setError(""); setForm(EMPTY); }} className="btn-primary !py-2.5 text-sm">
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-6">
          {CATEGORIES.map((cat) => {
            const skills = grouped[cat] || [];
            if (skills.length === 0) return null;
            return (
              <div key={cat} className="glass-card p-5">
                <h2 className="mb-4 font-display text-lg font-semibold capitalize text-white">
                  {cat === "learning" ? "Currently Learning" : cat}
                  <span className="ml-2 text-sm font-normal text-muted">({skills.length})</span>
                </h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill._id} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: skill.color }} />
                        <span className="text-sm font-medium text-white">{skill.name}</span>
                        <span className="text-xs text-muted">{skill.icon}</span>
                      </div>
                      <button onClick={() => handleDelete(skill._id)} className="rounded-lg p-1.5 text-muted hover:bg-rose-500/10 hover:text-rose-400">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add skill form */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md border-primary/20 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">Add Skill</h2>
              <button onClick={() => setFormOpen(false)} className="text-muted hover:text-white"><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-white/[0.08] bg-surface px-3 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="capitalize">{c === "learning" ? "Currently Learning" : c}</option>
                  ))}
                </select>
              </div>

              {[
                ["name", "Skill Name *", "e.g. React"],
                ["icon", "Icon Key", "e.g. SiReact, Code2"],
                ["color", "Brand Color", "#61DAFB"],
              ].map(([key, label, placeholder]) => (
                <div key={key}>
                  <label className="mb-1 block text-xs font-medium text-muted">{label}</label>
                  <input
                    required={key === "name"}
                    placeholder={placeholder}
                    value={form[key] || ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary/50 focus:outline-none"
                  />
                </div>
              ))}

              <p className="text-xs text-muted">
                💡 Icon key examples: <code className="text-primary-light">SiReact</code>, <code className="text-primary-light">SiNodedotjs</code>, <code className="text-primary-light">Code2</code>, <code className="text-primary-light">Database</code>
              </p>

              {error && <p className="rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-400">{error}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setFormOpen(false)} className="btn-secondary !py-2.5 text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary !py-2.5 text-sm disabled:opacity-60">
                  <Save size={15} /> {saving ? "Saving..." : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
