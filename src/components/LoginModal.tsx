import { useState } from "react";
import { X, Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import parasJiLogo from "@/assets/paras-ji-logo.png";

export const LoginModal = () => {
  const { login, signup, isLoginOpen, setIsLoginOpen } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });

  if (!isLoginOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "login") {
      await login(form.email, form.password);
    } else {
      await signup(form.name, form.email, form.password, form.phone);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={() => setIsLoginOpen(false)}
      />
      <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Green accent top */}
        <div className="h-2 bg-gradient-to-r from-brand-700 to-brand-400" />

        <div className="p-8">
          {/* Logo & close */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={parasJiLogo} alt="Paras-Ji" className="h-10 w-10 object-contain" />
              <div>
                <p className="font-display font-bold text-lg text-primary leading-tight">Paras-Ji</p>
                <p className="text-xs text-muted-foreground">Pure · Natural · Traditional</p>
              </div>
            </div>
            <button
              onClick={() => setIsLoginOpen(false)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-1">
            {mode === "login" ? "Welcome back!" : "Create account"}
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            {mode === "login"
              ? "Login to continue your order"
              : "Sign up to start shopping"}
          </p>

          {/* Tabs */}
          <div className="flex bg-muted rounded-xl p-1 mb-6">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === m
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                required
              />
            </div>

            {mode === "signup" && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">
            By continuing, you agree to our{" "}
            <span className="text-primary cursor-pointer">Terms</span> &{" "}
            <span className="text-primary cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};
