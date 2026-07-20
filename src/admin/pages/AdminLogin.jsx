import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { login } from "../api.js";
import { useAdmin } from "../context/AdminContext.jsx";

export default function AdminLogin() {
  const { loginSuccess, isLoggedIn } = useAdmin();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in — go straight to dashboard
  if (isLoggedIn) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(form.email, form.password);
      loginSuccess(res.token);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30">
            <Lock size={28} className="text-primary-light" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Admin Panel
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="glass-card space-y-4 border-primary/20 p-8"
        >
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">
              Email
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 focus-within:border-primary/50 transition-colors">
              <Mail size={16} className="shrink-0 text-muted" />
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@ravishankar.dev"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 focus-within:border-primary/50 transition-colors">
              <Lock size={16} className="shrink-0 text-muted" />
              <input
                type={showPass ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="shrink-0 text-muted hover:text-white"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          This page is not publicly linked — access via{" "}
          <span className="text-primary-light">/admin</span>
        </p>
      </div>
    </div>
  );
}
