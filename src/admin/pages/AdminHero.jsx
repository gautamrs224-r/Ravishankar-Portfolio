import { useEffect, useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { getHero, updateHero } from "../api.js";

export default function AdminHero() {
  const [form, setForm]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    getHero()
      .then((res) => setForm(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const setStat = (key, value) =>
    setForm((prev) => ({ ...prev, stats: { ...prev.stats, [key]: value } }));
  const setSocial = (key, value) =>
    setForm((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setError(""); setSaved(false);
    try {
      await updateHero(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary/50 focus:outline-none";

  const Field = ({ label, value, onChange, placeholder = "", textarea = false }) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="glass-card py-16 text-center text-rose-400">
        {error || "Failed to load hero content."}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Hero Content</h1>
        <p className="mt-1 text-sm text-muted">
          Edit the content shown in the hero section of your portfolio.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Info */}
        <div className="glass-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">Basic Info</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={form.name} onChange={(v) => set("name", v)} />
            <Field label="First Name (used in heading)" value={form.firstName} onChange={(v) => set("firstName", v)} />
            <Field
              label="Role / Title"
              value={form.role}
              onChange={(v) => set("role", v)}
              placeholder="Aspiring Full Stack MERN Developer"
            />
            <Field label="Resume / CV URL" value={form.resumeUrl} onChange={(v) => set("resumeUrl", v)} placeholder="/Ravishankar_Gautam_Resume.pdf" />
          </div>
          <div className="mt-4">
            <Field
              label="Tagline (shown below the heading)"
              value={form.tagline}
              onChange={(v) => set("tagline", v)}
              placeholder="I build beautiful, user-friendly web applications..."
              textarea
            />
          </div>
          <div className="mt-4">
            <Field
              label="Floating Portrait URL (transparent PNG)"
              value={form.floatingImageUrl}
              onChange={(v) => set("floatingImageUrl", v)}
              placeholder="https://res.cloudinary.com/..."
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={form.availableForWork ?? true}
                onChange={(e) => set("availableForWork", e.target.checked)}
                className="h-4 w-4 accent-violet-500"
              />
              Show "Available for Work" badge
            </label>
          </div>
        </div>

        {/* Stats */}
        <div className="glass-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">Stats Card</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["projects", "Projects"],
              ["contributions", "Contributions"],
              ["followers", "Followers"],
              ["streak", "Day Streak"],
            ].map(([key, label]) => (
              <Field
                key={key}
                label={label}
                value={form.stats?.[key]}
                onChange={(v) => setStat(key, v)}
                placeholder="25+"
              />
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">Social Links</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {["github", "linkedin", "twitter", "instagram"].map((platform) => (
              <Field
                key={platform}
                label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                value={form.social?.[platform]}
                onChange={(v) => setSocial(platform, v)}
                placeholder={`https://${platform}.com/...`}
              />
            ))}
          </div>
        </div>

        {/* Save bar */}
        {error && (
          <p className="rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-400">{error}</p>
        )}

        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-success">
              <CheckCircle2 size={16} /> Saved successfully
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
