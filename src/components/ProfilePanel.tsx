import { useEffect, useRef, useState } from "react";
import {
  X, User, Mail, Phone, ShoppingBag, Heart,
  LogOut, Shield, ChevronRight, Package
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAccountDetails: () => void;  // ← lifted up to Navbar
}

export const ProfilePanel = ({ isOpen, onClose, onOpenAccountDetails }: ProfilePanelProps) => {
  const { user, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const { items: wishlistItems, setIsWishlistOpen } = useWishlist();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click (but not when AccountDetailsModal backdrop is clicked)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  // Close on Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleAccountDetails = () => {
    onClose();                    // close panel first
    // tiny delay so panel exit animation doesn't clash
    setTimeout(() => onOpenAccountDetails(), 80);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Profile Panel */}
      <div
        ref={panelRef}
        className="fixed top-20 right-4 z-[70] w-[340px] animate-scale-in"
        style={{ transformOrigin: "top right" }}
      >
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid rgba(17,46,14,0.07)",
            boxShadow: "0 24px 64px -12px rgba(3,19,3,0.2), 0 8px 20px -4px rgba(3,19,3,0.1)",
          }}
        >
          {/* ── Header ── */}
          <div
            className="relative px-6 pt-7 pb-6"
            style={{ background: "linear-gradient(135deg, #112E0E 0%, #304F27 60%, #68875A 100%)" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 relative"
                style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)" }}
              >
                {initials}
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                  style={{ background: "#90D580" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-lg leading-tight truncate">{user.name}</h3>
                <p className="text-white/60 text-xs mt-0.5 truncate">
                  {user.auth_provider === "google" ? "Google Account" : "Paras-Ji Member"}
                </p>
                <span
                  className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#C8E6A0" }}
                >
                  <Shield className="h-2.5 w-2.5" />
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* ── User Info ── */}
          <div className="px-6 py-4 space-y-3" style={{ borderBottom: "1px solid rgba(17,46,14,0.06)" }}>
            {user.email && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#112E0E0A" }}>
                  <Mail className="h-3.5 w-3.5" style={{ color: "#304F27" }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#68875A" }}>Email</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                </div>
              </div>
            )}
            {user.phone_number ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#112E0E0A" }}>
                  <Phone className="h-3.5 w-3.5" style={{ color: "#304F27" }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#68875A" }}>Phone</p>
                  <p className="text-sm font-medium text-gray-800">{user.phone_number}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAccountDetails}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all hover:opacity-80"
                style={{ background: "rgba(17,46,14,0.06)", border: "1px dashed rgba(17,46,14,0.2)" }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#112E0E12" }}>
                  <Phone className="h-3.5 w-3.5" style={{ color: "#304F27" }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: "#304F27" }}>+ Add phone number</span>
              </button>
            )}
          </div>

          {/* ── Quick Stats ── */}
          <div className="grid grid-cols-2" style={{ borderBottom: "1px solid rgba(17,46,14,0.06)" }}>
            <button
              onClick={() => { setIsCartOpen(true); onClose(); }}
              className="flex flex-col items-center justify-center py-5 hover:bg-gray-50 transition-colors group"
              style={{ borderRight: "1px solid rgba(17,46,14,0.06)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform" style={{ background: "#112E0E0A" }}>
                <ShoppingBag className="h-4 w-4" style={{ color: "#304F27" }} />
              </div>
              <span className="text-2xl font-black" style={{ color: "#112E0E" }}>{itemCount}</span>
              <span className="text-[10px] font-bold uppercase tracking-wide mt-0.5" style={{ color: "#68875A" }}>In Cart</span>
            </button>
            <button
              onClick={() => { setIsWishlistOpen(true); onClose(); }}
              className="flex flex-col items-center justify-center py-5 hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform" style={{ background: "#112E0E0A" }}>
                <Heart className="h-4 w-4" style={{ color: "#304F27" }} />
              </div>
              <span className="text-2xl font-black" style={{ color: "#112E0E" }}>{wishlistItems.length}</span>
              <span className="text-[10px] font-bold uppercase tracking-wide mt-0.5" style={{ color: "#68875A" }}>Wishlist</span>
            </button>
          </div>

          {/* ── Menu Items ── */}
          <div className="px-3 py-3">
            <MenuItem
              icon={<User className="h-4 w-4" />}
              label="Account Details"
              sub="Edit name, phone & profile info"
              onClick={handleAccountDetails}
            />
            <MenuItem
              icon={<Package className="h-4 w-4" />}
              label="My Orders"
              sub="Track your deliveries"
              onClick={onClose}
              badge="Coming Soon"
            />
            <MenuItem
              icon={<Heart className="h-4 w-4" />}
              label="Saved Items"
              sub={`${wishlistItems.length} item${wishlistItems.length !== 1 ? "s" : ""} in wishlist`}
              onClick={() => { setIsWishlistOpen(true); onClose(); }}
            />
          </div>

          {/* ── Logout ── */}
          <div className="px-4 pb-5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-semibold transition-all hover:bg-red-50 group"
              style={{ color: "#DC2626", border: "1px solid rgba(220,38,38,0.12)" }}
            >
              <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ── Reusable menu item ── */
const MenuItem = ({
  icon, label, sub, onClick, badge,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  onClick?: () => void;
  badge?: string;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all hover:bg-gray-50 group"
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
      style={{ background: "#112E0E08", color: "#304F27" }}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-800 leading-tight">{label}</p>
      {sub && <p className="text-[11px] mt-0.5 truncate" style={{ color: "#68875A" }}>{sub}</p>}
    </div>
    {badge ? (
      <span
        className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0"
        style={{ background: "#112E0E0A", color: "#68875A" }}
      >
        {badge}
      </span>
    ) : (
      <ChevronRight
        className="h-4 w-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
        style={{ color: "#304F27" }}
      />
    )}
  </button>
);
