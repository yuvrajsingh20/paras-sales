import { useState } from "react";
import { X, Eye, EyeOff, User, Mail, Phone, Lock, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import parasJiLogo from "@/assets/paras-ji-logo.png";
import { GoogleLogin } from "@react-oauth/google";

type AuthMode = "options" | "email-login" | "email-signup" | "phone-entry" | "phone-otp";

export const LoginModal = () => {
  const { login, signup, googleLogin, sendOtp, verifyOtp, isLoginOpen, setIsLoginOpen } = useAuth();
  const [mode, setMode] = useState<AuthMode>("options");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", otp: "" });

  if (!isLoginOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "email-login") {
      await login(form.email, form.password);
    } else {
      await signup(form.name, form.email, form.password, form.phone);
    }
    setLoading(false);
  };

  const handlePhoneSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await sendOtp(form.phone);
    if (success) setMode("phone-otp");
    setLoading(false);
  };

  const handlePhoneVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await verifyOtp(form.phone, form.otp);
    setLoading(false);
  };

  const handleGoogleSuccess = async (response: any) => {
    setLoading(true);
    await googleLogin(response.credential);
    setLoading(false);
  };

  const isGoogleConfigured = import.meta.env.VITE_GOOGLE_CLIENT_ID && 
                            import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'your-google-client-id';

  const resetMode = () => setMode("options");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={() => setIsLoginOpen(false)}
      />
      <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl animate-scale-in overflow-hidden border border-border">
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

          {/* Header text changes based on mode */}
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              {mode === "options" && "Get Started"}
              {mode === "email-login" && "Welcome back!"}
              {mode === "email-signup" && "Create account"}
              {mode === "phone-entry" && "Login with Phone"}
              {mode === "phone-otp" && "Verify Phone"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {mode === "options" && "Choose your preferred method to continue"}
              {mode === "email-login" && "Enter your email and password"}
              {mode === "email-signup" && "Join us today for exclusive benefits"}
              {mode === "phone-entry" && "We'll send you a verification code"}
              {mode === "phone-otp" && `Enter the code sent to ${form.phone}`}
            </p>
          </div>

          <div className="space-y-4">
            {mode === "options" && (
              <>
                <div className="w-full relative">
                  {!isGoogleConfigured && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-[1px] rounded-xl border border-dashed border-muted-foreground/30 p-2 text-center">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Config Required</p>
                      <p className="text-[9px] text-muted-foreground leading-tight px-4 font-medium">Set VITE_GOOGLE_CLIENT_ID in .env to enable Google Login</p>
                    </div>
                  )}
                  <div className={`w-full flex justify-center ${!isGoogleConfigured ? 'opacity-20 grayscale pointer-events-none' : ''}`}>
                    <GoogleLogin 
                      onSuccess={handleGoogleSuccess} 
                      onError={() => console.log('Login Failed')}
                      useOneTap
                      theme="outline"
                      shape="pill"
                      width="400"
                    />
                  </div>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <button
                  onClick={() => setMode("phone-entry")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-input bg-background hover:bg-muted transition-all font-medium"
                >
                  <Phone className="h-5 w-5 text-brand-600" />
                  <span>Phone Number</span>
                </button>

                <button
                  onClick={() => setMode("email-login")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-input bg-background hover:bg-muted transition-all font-medium"
                >
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>Email Address</span>
                </button>
              </>
            )}

            {(mode === "email-login" || mode === "email-signup") && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {mode === "email-signup" && (
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
                  className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-lg transition-all disabled:opacity-70"
                >
                  {loading ? "Processing..." : mode === "email-login" ? "Login" : "Create Account"}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setMode(mode === "email-login" ? "email-signup" : "email-login")}
                    className="text-sm text-brand-600 font-semibold hover:underline"
                  >
                    {mode === "email-login" ? "Need an account? Sign up" : "Already have an account? Login"}
                  </button>
                </div>
              </form>
            )}

            {mode === "phone-entry" && (
              <form onSubmit={handlePhoneSend} className="space-y-4 animate-in">
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand-600 transition-colors" />
                  <input
                    type="tel"
                    placeholder="Phone Number (e.g. +91...)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all disabled:opacity-70 active:scale-[0.98]"
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </button>
              </form>
            )}

            {mode === "phone-otp" && (
              <form onSubmit={handlePhoneVerify} className="space-y-4 animate-in">
                <div className="relative group">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="6-digit Code"
                    value={form.otp}
                    onChange={(e) => setForm({ ...form, otp: e.target.value })}
                    className="w-full pl-10 pr-4 py-4 rounded-xl border border-input bg-card text-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all tracking-[0.5em] text-center font-bold"
                    maxLength={6}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all disabled:opacity-70 active:scale-[0.98]"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setMode("phone-entry")}
                    className="text-sm text-brand-600 font-semibold hover:text-brand-700 hover:underline transition-colors"
                  >
                    Resend Code
                  </button>
                </div>
              </form>
            )}

            {mode !== "options" && (
              <button
                onClick={resetMode}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to options
              </button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            By continuing, you agree to our{" "}
            <span className="text-primary cursor-pointer hover:underline">Terms</span> &{" "}
            <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};
