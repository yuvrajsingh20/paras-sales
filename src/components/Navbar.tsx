import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { ProfilePanel } from "@/components/ProfilePanel";
import { AccountDetailsModal } from "@/components/AccountDetailsModal";
import parasJiLogo from "@/assets/paras-ji-logo.png";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { items: wishlistItems, setIsWishlistOpen } = useWishlist();
  const { user, logout, setIsLoginOpen } = useAuth();
  const location = useLocation();

  const isRetail = location.pathname.startsWith("/retail");

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className={`text-sm font-semibold transition-all duration-200 relative group ${
        location.pathname === to
          ? "text-primary"
          : "text-muted-foreground hover:text-primary"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-primary transition-all duration-200 ${
          location.pathname === to ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#112E0E]/8 shadow-[0_2px_20px_-4px_rgba(3,19,3,0.08)]">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#112E0E] transition-all duration-200 group-hover:scale-105 group-hover:rotate-3 shadow-sm">
              <img
                src={parasJiLogo}
                alt="Paras-Ji"
                className="h-5 w-5 object-contain brightness-0 invert"
              />
            </div>
            <span
              className="font-bold text-[17px] tracking-tight text-[#112E0E]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Paras-Ji
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/retail">Shop Collection</NavLink>
            <a
              href="/#about"
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              Our Story
              <span className="absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-primary w-0 group-hover:w-full transition-all duration-200" />
            </a>
            <NavLink to="/wholesale">Wholesale</NavLink>
          </div>

          {/* ── Actions ── */}
          <div className="flex items-center gap-1.5">

            {/* Cart + Wishlist (visible on all pages except checkout) */}
            {location.pathname !== "/checkout" && (
              <div className="flex items-center bg-[#112E0E]/5 rounded-2xl p-1 mr-1 border border-[#112E0E]/8">
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="relative p-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 group"
                  aria-label="Wishlist"
                >
                  <Heart className={`h-4 w-4 text-[#304F27] transition-transform duration-200 group-hover:scale-110 ${wishlistItems.length > 0 ? "fill-[#304F27]" : ""}`} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-[#112E0E] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 group"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-4 w-4 text-[#304F27] transition-transform duration-200 group-hover:scale-110" />
                  {itemCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-[#304F27] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* User: Avatar → ProfilePanel */}
            {user ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl hover:bg-[#112E0E]/5 transition-all duration-200 group border border-transparent hover:border-[#112E0E]/8"
                aria-label="Open profile"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs transition-all duration-200 group-hover:scale-105 group-hover:rotate-2 shadow-sm"
                  style={{ background: "linear-gradient(135deg, #304F27 0%, #112E0E 100%)" }}
                >
                  {initials}
                </div>
                <span className="hidden sm:block text-[12px] font-semibold text-[#304F27] max-w-[80px] truncate">
                  {user.name?.split(" ")[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 btn-primary py-2 px-5 text-[11px] tracking-wide rounded-xl"
              >
                Sign In
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2.5 rounded-xl bg-[#112E0E]/5 hover:bg-[#112E0E]/10 transition-all duration-200 ml-1 border border-[#112E0E]/8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen
                ? <X className="h-5 w-5 text-[#112E0E]" />
                : <Menu className="h-5 w-5 text-[#112E0E]" />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white/95 backdrop-blur-xl z-50 animate-in flex flex-col px-8 pt-10 pb-12">
            <div className="flex flex-col gap-8">
              {[
                { to: "/retail", label: "Collection" },
                { to: "/wholesale", label: "Wholesale" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-[#112E0E] hover:text-[#304F27] transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {label}
                </Link>
              ))}
              <a
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-bold text-[#112E0E]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our Story
              </a>
            </div>

            <div className="mt-auto space-y-3">
              {user ? (
                <>
                  <button
                    onClick={() => { setIsProfileOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#112E0E]/5 border border-[#112E0E]/8"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg,#304F27,#112E0E)" }}>
                      {initials}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm text-[#112E0E]">{user.name}</p>
                      <p className="text-xs text-[#68875A]">View profile</p>
                    </div>
                  </button>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-red-600 border border-red-100 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setIsLoginOpen(true); setIsMobileMenuOpen(false); }}
                  className="w-full btn-primary py-4 rounded-2xl text-base"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ── Profile Panel ── */}
      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenAccountDetails={() => setIsAccountOpen(true)}
      />

      {/* ── Account Details Modal ── */}
      <AccountDetailsModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </>
  );
};
