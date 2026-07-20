import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { getJourney, createJourneyEntry, updateJourneyEntry, deleteJourneyEntry } from "../api.js";

const EMPTY = { year: "", title: "", description: "", icon: "Code2", side: "left", order: 0 };

export default function AdminJourney() {
  const [entries, setEntries]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  const fetchEntries = async () => {
    try {
      const res = await getJourney();
      setEntries(res.data || []);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchEntries(); }, []);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setFormOpen(true); setError(""); };
  const openEdit = (e) => { setEditing(e._id); setForm({ ...e }); setFormOpen(true); setError(""); };

  const handleSave = async (ev) => {
    ev.preventDefault();
    setSaving(true); setError("");
    try {
      if (editing) { await updateJourneyEntry(editing, form); }
      else { await createJourneyEntry(form); }
      setFormOpen(false);
      fetchEntries();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this timeline entry?")) return;
    await deleteJourneyEntry(id);
    fetchEntries();
  };

  const field = (key, label, placeholder = "") => (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted">{label}</label>
      <input
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
          <h1 className="font-display text-2xl font-bold text-white">Journey Timeline</h1>
          <p className="mt-1 text-sm text-muted">{entries.length} entries</p>
        </div>
        <button onClick={openAdd} className="btn-primary !py-2.5 text-sm">
          <Plus size={16} /> Add Entry
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry._id} className="glass-card flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <span className="text-sm font-bold text-primary-light">{entry.year.slice(-2)}</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-white truncate">{entry.title}</p>
                <p className="text-xs text-muted truncate">{entry.description}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openEdit(entry)} className="rounded-lg p-2 text-muted hover:bg-white/[0.06] hover:text-white">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(entry._id)} className="rounded-lg p-2 text-muted hover:bg-rose-500/10 hover:text-rose-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="glass-card py-16 text-center text-muted">No entries yet.</div>
          )}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md border-primary/20 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">
                {editing ? "Edit Entry" : "Add Timeline Entry"}
              </h2>
              <button onClick={() => setFormOpen(false)} className="text-muted hover:text-white"><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {field("year", "Year *", "2025")}
                {field("icon", "Icon Key", "Code2")}
              </div>
              {field("title", "Title *", "Started React")}

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Side (desktop layout)</label>
                <select
                  value={form.side || "left"}
                  onChange={(e) => setForm({ ...form, side: e.target.value })}
                  className="w-full rounded-lg border border-white/[0.08] bg-surface px-3 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              {error && <p className="rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-400">{error}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setFormOpen(false)} className="btn-secondary !py-2.5 text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary !py-2.5 text-sm disabled:opacity-60">
                  <Save size={15} /> {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
