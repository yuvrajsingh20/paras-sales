import parasJiLogo from "@/assets/paras-ji-logo.png";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Shield, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { LoginModal } from "@/components/LoginModal";
import { Footer } from "@/components/Footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground transition-page">
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <LoginModal />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Video Background with Atmospheric Grading */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            className="w-full h-full object-cover grayscale-[0.2] sepia-[0.1]"
          >
            <source src="/hero.webm" type="video/webm" />
          </video>
          
          {/* Earthy Agricultural Gradient Overlay */}
          <div className="absolute inset-0 hero-gradient-overlay mix-blend-multiply" />
          
          {/* Organic Grain Texture */}
          <div className="absolute inset-0 grain-texture z-10" />
          
          {/* Subtle Sun Flare Glow */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-amber-200/20 to-transparent pointer-events-none" />
        </div>
        
        <div className="container mx-auto max-w-5xl text-center relative z-20">
          <div className="inline-flex items-center gap-2 bg-[#FAFAF5]/30 backdrop-blur-md border border-[#F5E6B3]/40 rounded-full px-4 py-1.5 mb-8 animate-in shadow-lg">
            <Leaf className="h-4 w-4 text-[#E6B94C]" />
            <span className="text-[#FAFAF5] text-[10px] font-black uppercase tracking-[0.2em] text-shadow-premium">Authentic Heritage</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1] text-[#FAFAF5] animate-in text-shadow-premium" style={{ animationDelay: '0.1s' }}>
            Traditional taste, <br />
            <span className="text-[#E6B94C] text-shadow-gold">refined for today.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#FAFAF5] max-w-2xl mx-auto mb-12 animate-in font-semibold leading-relaxed text-shadow-premium opacity-90" style={{ animationDelay: '0.2s' }}>
            Experience the soulful essence of Paras-Ji. Handcrafted varieties delivered with the warmth of Indian farmland tradition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/retail" className="btn-primary text-base px-10 py-4 group bg-[#4F7F52] hover:bg-[#5F9463] text-[#FAFAF5] shadow-2xl shadow-black/30 border border-white/10">
              Shop Retail
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/wholesale" className="btn-outline text-base px-10 py-4 group border-white/80 text-white hover:bg-white/20 backdrop-blur-lg shadow-2xl text-shadow-premium font-black">
              Wholesale Inquiry
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-24 bg-secondary/30 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Our Philosophy</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built on trust, <br />rooted in tradition.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                For generations, Paras-Ji has stood for purity. We believe that the best flavors come from nature, which is why we meticulously source every ingredient and follow time-honored recipes that honor our heritage.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-2xl mb-1">100%</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Natural Ingredients</p>
                </div>
                <div>
                  <h4 className="font-bold text-2xl mb-1">40+</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Years of Excellence</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: <Leaf className="h-6 w-6" />, title: "Zero Additives", desc: "No artificial colors or preservatives. Just pure, wholesome food." },
                { icon: <Shield className="h-6 w-6" />, title: "Rigorous Quality", desc: "Every batch undergoes strict quality checks before it leaves our kitchen." },
                { icon: <Award className="h-6 w-6" />, title: "Authentic Recipes", desc: "Recipes passed down through generations, preserved with care." },
              ].map((item) => (
                <div key={item.title} className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-primary mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
