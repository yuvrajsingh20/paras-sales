import { useState, useEffect, useRef } from "react";
import {
  X, User, Mail, Phone, CheckCircle2, AlertCircle,
  Loader2, ChevronLeft, Shield, Edit3,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "view" | "edit-name" | "edit-phone" | "success";

export const AccountDetailsModal = ({ isOpen, onClose }: AccountDetailsModalProps) => {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState<Step>("view");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone_number || "");

  const overlayRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Sync with user on open
  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || "");
      setPhone(user.phone_number || "");
      setStep("view");
      setError("");
    }
  }, [isOpen, user]);

  // Focus phone input when step changes
  useEffect(() => {
    if (step === "edit-phone" && phoneInputRef.current) {
      setTimeout(() => phoneInputRef.current?.focus(), 100);
    }
  }, [step]);

  // Esc key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (step !== "view") setStep("view");
        else onClose();
      }
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, step, onClose]);

  if (!isOpen || !user) return null;

  const handleSaveName = async () => {
    const trimmed = name.trim();
    if (!trimmed) { setError("Name cannot be empty"); return; }
    if (trimmed === user.name) { setStep("view"); return; }
    setLoading(true);
    setError("");
    const ok = await updateProfile({ name: trimmed });
    setLoading(false);
    if (ok) setStep("success");
  };

  const handleSavePhone = async () => {
    const trimmed = phone.trim().replace(/\s/g, "");
    if (!trimmed) { setError("Phone number cannot be empty"); return; }
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!phoneRegex.test(trimmed)) {
      setError("Enter a valid phone number (10–15 digits)");
      return;
    }
    if (trimmed === user.phone_number) { setStep("view"); return; }
    setLoading(true);
    setError("");
    const ok = await updateProfile({ phone_number: trimmed });
    setLoading(false);
    if (ok) setStep("success");
  };

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md rounded-3xl overflow-hidden animate-scale-in"
          style={{
            background: "#fff",
            boxShadow: "0 32px 80px -16px rgba(3,19,3,0.25), 0 12px 32px -8px rgba(3,19,3,0.15)",
          }}
        >
          {/* ══════════════════════════════════
               STEP: VIEW (profile overview)
              ══════════════════════════════════ */}
          {step === "view" && (
            <>
              {/* Header */}
              <div
                className="relative px-7 pt-8 pb-7"
                style={{ background: "linear-gradient(135deg,#112E0E 0%,#304F27 70%,#68875A 100%)" }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl flex-shrink-0 relative"
                    style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)" }}
                  >
                    {(user.name || "U").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                    {/* Verified dot */}
                    <span
                      className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full border-2 border-[#112E0E] flex items-center justify-center"
                      style={{ background: "#90D580" }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">{user.name}</h2>
                    <p className="text-white/60 text-sm mt-0.5">
                      {user.auth_provider === "google" ? "Google Account" : "Paras-Ji Account"}
                    </p>
                    {memberSince && (
                      <p className="text-white/40 text-[11px] mt-1.5">Member since {memberSince}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="px-6 py-5 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#68875A" }}>
                  Account Information
                </p>

                {/* Name row */}
                <FieldRow
                  icon={<User className="h-4 w-4" />}
                  label="Full Name"
                  value={user.name}
                  onEdit={() => { setError(""); setStep("edit-name"); }}
                  canEdit
                />

                {/* Email row */}
                <FieldRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={user.email}
                  note={user.auth_provider === "google" ? "Managed by Google" : undefined}
                />

                {/* Phone row */}
                <FieldRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone Number"
                  value={user.phone_number}
                  placeholder="Add phone number"
                  onEdit={() => { setError(""); setStep("edit-phone"); }}
                  canEdit
                  highlight={!user.phone_number}
                />

                {/* Provider */}
                <FieldRow
                  icon={<Shield className="h-4 w-4" />}
                  label="Sign-in Method"
                  value={
                    user.auth_provider === "google" ? "Google OAuth"
                    : user.auth_provider === "phone" ? "Phone OTP"
                    : "Email & Password"
                  }
                />
              </div>

              {/* Phone CTA if missing */}
              {!user.phone_number && (
                <div className="mx-6 mb-5 px-5 py-4 rounded-2xl" style={{ background: "#112E0E08", border: "1px solid rgba(17,46,14,0.10)" }}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "#304F27" }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#112E0E" }}>Add your phone number</p>
                      <p className="text-[12px] mt-0.5" style={{ color: "#68875A" }}>
                        Required to receive delivery updates and for account recovery.
                      </p>
                      <button
                        onClick={() => { setError(""); setStep("edit-phone"); }}
                        className="mt-3 text-[12px] font-bold uppercase tracking-wide px-4 py-2 rounded-xl transition-all duration-150 hover:opacity-80"
                        style={{ background: "#112E0E", color: "#fff" }}
                      >
                        + Add Phone
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-6 pb-6">
                <button onClick={onClose} className="w-full py-3 rounded-2xl text-sm font-semibold transition-all hover:opacity-80" style={{ background: "#112E0E0A", color: "#304F27" }}>
                  Close
                </button>
              </div>
            </>
          )}

          {/* ══════════════════════════════════
               STEP: EDIT NAME
              ══════════════════════════════════ */}
          {step === "edit-name" && (
            <EditForm
              title="Update Name"
              description="This is how you'll appear across Paras-Ji."
              onBack={() => { setStep("view"); setError(""); setName(user.name); }}
              onSave={handleSaveName}
              loading={loading}
              error={error}
            >
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#68875A" }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#68875A" }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(""); }}
                    placeholder="Your full name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium outline-none transition-all"
                    style={{
                      background: "#112E0E08",
                      border: "1.5px solid rgba(17,46,14,0.12)",
                      color: "#112E0E",
                    }}
                    onFocus={(e) => e.target.style.border = "1.5px solid rgba(17,46,14,0.35)"}
                    onBlur={(e) => e.target.style.border = "1.5px solid rgba(17,46,14,0.12)"}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSaveName(); }}
                    autoFocus
                  />
                </div>
              </div>
            </EditForm>
          )}

          {/* ══════════════════════════════════
               STEP: EDIT PHONE
              ══════════════════════════════════ */}
          {step === "edit-phone" && (
            <EditForm
              title={user.phone_number ? "Update Phone Number" : "Add Phone Number"}
              description="Used for delivery updates and account security. We'll never share it."
              onBack={() => { setStep("view"); setError(""); setPhone(user.phone_number || ""); }}
              onSave={handleSavePhone}
              loading={loading}
              error={error}
              saveBtnLabel={user.phone_number ? "Save Number" : "Add Number"}
            >
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#68875A" }}>
                  Mobile Number
                </label>
                <div className="relative">
                  {/* Country code prefix */}
                  <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
                  >
                    <span className="text-lg leading-none">🇮🇳</span>
                    <span className="text-sm font-bold" style={{ color: "#304F27" }}>+91</span>
                    <div className="w-px h-5 ml-1" style={{ background: "rgba(17,46,14,0.15)" }} />
                  </div>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    value={phone.replace(/^\+91/, "").replace(/^91/, "")}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhone(val);
                      setError("");
                    }}
                    placeholder="98765 43210"
                    maxLength={10}
                    className="w-full pl-24 pr-4 py-3.5 rounded-2xl text-sm font-medium outline-none transition-all tracking-wider"
                    style={{
                      background: "#112E0E08",
                      border: "1.5px solid rgba(17,46,14,0.12)",
                      color: "#112E0E",
                    }}
                    onFocus={(e) => e.target.style.border = "1.5px solid rgba(17,46,14,0.35)"}
                    onBlur={(e) => e.target.style.border = "1.5px solid rgba(17,46,14,0.12)"}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSavePhone(); }}
                  />
                </div>
                <p className="mt-2 text-[11px]" style={{ color: "#68875A" }}>
                  Enter your 10-digit mobile number (India)
                </p>
              </div>
            </EditForm>
          )}

          {/* ══════════════════════════════════
               STEP: SUCCESS
              ══════════════════════════════════ */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 animate-scale-in"
                style={{ background: "linear-gradient(135deg,#304F27,#112E0E)" }}
              >
                <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: "#112E0E", fontFamily: "'Playfair Display', serif" }}>
                All Saved!
              </h3>
              <p className="text-sm mb-10" style={{ color: "#68875A" }}>
                Your profile has been updated successfully.
              </p>
              <button
                onClick={() => setStep("view")}
                className="btn-primary px-10 py-3 rounded-2xl text-sm"
              >
                Back to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

/* ── Helper sub-components ── */

const FieldRow = ({
  icon, label, value, placeholder, onEdit, canEdit, note, highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
  placeholder?: string;
  onEdit?: () => void;
  canEdit?: boolean;
  note?: string;
  highlight?: boolean;
}) => (
  <div
    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-150"
    style={{ background: highlight ? "rgba(17,46,14,0.04)" : "transparent" }}
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: "#112E0E08", color: "#304F27" }}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#68875A" }}>{label}</p>
      <p
        className="text-sm font-medium mt-0.5 truncate"
        style={{ color: value ? "#112E0E" : "#68875A", fontStyle: value ? "normal" : "italic" }}
      >
        {value || placeholder || "—"}
      </p>
      {note && <p className="text-[10px] mt-0.5" style={{ color: "#68875A" }}>{note}</p>}
    </div>
    {canEdit && (
      <button
        onClick={onEdit}
        className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 hover:scale-105"
        style={{ background: highlight ? "#112E0E" : "#112E0E0A", color: highlight ? "#fff" : "#304F27" }}
        title={`Edit ${label}`}
      >
        <Edit3 className="h-3.5 w-3.5" />
      </button>
    )}
  </div>
);

const EditForm = ({
  title, description, onBack, onSave, loading, error, children, saveBtnLabel = "Save Changes",
}: {
  title: string;
  description?: string;
  onBack: () => void;
  onSave: () => void;
  loading: boolean;
  error: string;
  children: React.ReactNode;
  saveBtnLabel?: string;
}) => (
  <>
    {/* Header */}
    <div className="flex items-center gap-3 px-6 pt-7 pb-5" style={{ borderBottom: "1px solid rgba(17,46,14,0.06)" }}>
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 hover:bg-gray-100 flex-shrink-0"
        style={{ color: "#304F27" }}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div>
        <h3 className="font-bold text-lg leading-tight" style={{ color: "#112E0E" }}>{title}</h3>
        {description && <p className="text-[12px] mt-0.5" style={{ color: "#68875A" }}>{description}</p>}
      </div>
    </div>

    {/* Body */}
    <div className="px-6 py-6 space-y-5">
      {children}

      {error && (
        <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl" style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.12)" }}>
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="px-6 pb-7 flex gap-3">
      <button onClick={onBack} className="btn-secondary flex-1 py-3 rounded-2xl text-sm">
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={loading}
        className="btn-primary flex-1 py-3 rounded-2xl text-sm disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Saving…" : saveBtnLabel}
      </button>
    </div>
  </>
);
