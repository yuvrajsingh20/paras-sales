import { Link } from "react-router-dom";
import parasJiLogo from "@/assets/paras-ji-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16 px-8 mt-auto">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-border pb-12 mb-12">
          <div className="flex items-center gap-3">
            <img src={parasJiLogo} alt="Paras-Ji" className="h-10 w-10 object-contain" />
            <span className="font-bold text-2xl tracking-tighter text-primary">Paras-Ji</span>
          </div>
          <div className="flex gap-10">
            <Link to="/retail" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
            <Link to="/wholesale" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Wholesale</Link>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-xs font-medium">
          <p>© 2024 Paras-Ji Foods. Crafted with tradition.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
