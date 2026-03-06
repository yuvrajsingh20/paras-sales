import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import parasJiLogo from "@/assets/paras-ji-logo.png";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { items: wishlistItems, setIsWishlistOpen } = useWishlist();
  const { user, logout, setIsLoginOpen } = useAuth();
  const location = useLocation();

  const isRetail = location.pathname.startsWith("/retail");

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={parasJiLogo} alt="Paras-Ji" className="h-10 w-10 object-contain" />
          <span className="font-display font-bold text-xl text-primary tracking-wide">Paras-Ji</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/retail" className="nav-link text-sm font-medium">Products</Link>
          <a href="#about" className="nav-link text-sm font-medium">About Us</a>
          <Link to="/wholesale" className="nav-link text-sm font-medium">Wholesale</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isRetail && (
            <>
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5 text-primary" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 text-primary" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:block text-sm font-medium text-primary">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5 text-primary" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-1.5 btn-primary text-sm py-2 px-4"
            >
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Login</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link to="/retail" className="nav-link py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
            <a href="#about" className="nav-link py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
            <Link to="/wholesale" className="nav-link py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Wholesale</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
