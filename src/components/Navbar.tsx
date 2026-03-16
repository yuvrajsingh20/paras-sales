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

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link 
      to={to} 
      className={`text-sm font-semibold transition-all duration-300 ${
        location.pathname === to 
          ? "text-primary scale-105" 
          : "text-muted-foreground hover:text-primary hover:scale-105"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-border/40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-xl bg-primary/5 p-1 transition-transform duration-500 group-hover:scale-110">
            <img src={parasJiLogo} alt="Paras-Ji" className="h-8 w-8 object-contain" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-primary">Paras-Ji</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/retail">Products</NavLink>
          <a href="/#about" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-all">Our Story</a>
          <NavLink to="/wholesale">Wholesale</NavLink>
        </div>

        {/* Global Action Icons */}
        <div className="flex items-center gap-2">
          {isRetail && (
            <div className="flex items-center bg-secondary/50 rounded-full p-1 mr-2 border border-border/30">
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 rounded-full hover:bg-white hover:shadow-sm transition-all duration-300"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4 text-primary/80" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-white hover:shadow-sm transition-all duration-300"
                aria-label="Cart"
              >
                <ShoppingCart className="h-4 w-4 text-primary/80" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-3 ml-2 group">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                {user.name.charAt(0)}
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-primary transition-all"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="btn-primary py-2 px-6 rounded-full text-xs"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-all ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-50 animate-in pt-10 px-8">
          <div className="flex flex-col gap-8">
            <Link to="/retail" className="text-2xl font-bold tracking-tight text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Collection</Link>
            <a href="/#about" className="text-2xl font-bold tracking-tight text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Our Legacy</a>
            <Link to="/wholesale" className="text-2xl font-bold tracking-tight text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Partnership</Link>
            
            <div className="mt-auto pb-12">
               {!user && (
                 <button onClick={() => { setIsLoginOpen(true); setIsMobileMenuOpen(false); }} className="w-full btn-primary py-4 text-lg">
                   Sign In
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
