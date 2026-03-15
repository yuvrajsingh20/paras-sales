import heroBg from "@/assets/hero-bg.jpg";
import parasJiLogo from "@/assets/paras-ji-logo.png";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Shield, Award } from "lucide-react";

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-16 py-4">
        <div className="flex items-center gap-2">
          <img src={parasJiLogo} alt="Paras-Ji" className="h-10 w-10 object-contain" />
          <span className="font-display font-bold text-xl text-background tracking-wide drop-shadow">Paras-Ji</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#about" className="hidden md:block text-background/80 hover:text-background text-sm font-medium transition-colors">About</a>
          <Link
            to="/wholesale"
            className="hidden md:block text-background/80 hover:text-background text-sm font-medium transition-colors"
          >
            Wholesale
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/60 via-brand-800/40 to-brand-900/70" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm border border-background/30 rounded-full px-4 py-1.5 mb-6">
            <Leaf className="h-4 w-4 text-brand-200" />
            <span className="text-background text-sm font-medium">100% Pure & Natural Products</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-background leading-tight mb-4 drop-shadow-lg">
            Taste the{" "}
            <span className="text-brand-200">Tradition</span>
            <br />of Paras-Ji
          </h1>
          <p className="text-background/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Authentic Indian Papad, Badi, Sewaiya & Seeds — handcrafted with love, delivered to your doorstep.
          </p>

          {/* TWO MAIN BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/retail"
              className="group flex items-center gap-3 bg-background text-primary font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-brand-900/40 hover:-translate-y-1 transition-all duration-300 min-w-[200px] justify-center"
            >
              <span className="text-2xl">🛍️</span>
              <div className="text-left">
                <p className="text-xs text-muted-foreground font-normal leading-tight">For home & family</p>
                <p className="leading-tight">Retail</p>
              </div>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/wholesale"
              className="group flex items-center gap-3 bg-primary text-primary-foreground font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl border-2 border-background/30 hover:-translate-y-1 transition-all duration-300 min-w-[200px] justify-center"
            >
              <span className="text-2xl">🏭</span>
              <div className="text-left">
                <p className="text-xs text-primary-foreground/70 font-normal leading-tight">Bulk orders & B2B</p>
                <p className="leading-tight">Wholesale</p>
              </div>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
            {[
              { icon: "🌿", label: "100% Natural", value: "No Preservatives" },
              { icon: "⭐", label: "4.9 Rating", value: "10,000+ Happy Customers" },
              { icon: "🚚", label: "Fast Delivery", value: "Pan India Shipping" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl">{stat.icon}</p>
                <p className="text-background font-bold text-sm">{stat.label}</p>
                <p className="text-background/60 text-xs">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-background/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-background/60 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* About section */}
      <section id="about" className="py-20 bg-background px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Our Story</p>
            <h2 className="section-title">Pure. Natural. Traditional.</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Paras-Ji brings you the finest quality Indian food products, made with traditional recipes passed down through generations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Leaf className="h-8 w-8 text-primary" />, title: "100% Natural", desc: "No artificial colours, flavours or preservatives. Pure ingredients from trusted farms." },
              { icon: <Shield className="h-8 w-8 text-primary" />, title: "Quality Assured", desc: "Every batch is quality-tested to ensure you receive only the finest products." },
              { icon: <Award className="h-8 w-8 text-primary" />, title: "Award Winning", desc: "Recognized for excellence in traditional food craftsmanship across India." },
            ].map((item) => (
              <div key={item.title} className="bg-brand-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={parasJiLogo} alt="Paras-Ji" className="h-8 w-8 object-contain brightness-0 invert" />
            <span className="font-display font-bold text-lg">Paras-Ji</span>
          </div>
          <p className="text-primary-foreground/70 text-sm text-center">
            © 2024 Paras-Ji Foods. All rights reserved. | Pure · Natural · Traditional
          </p>
          <div className="flex gap-4 text-sm text-primary-foreground/70">
            <span className="cursor-pointer hover:text-primary-foreground">Privacy</span>
            <span className="cursor-pointer hover:text-primary-foreground">Terms</span>
            <span className="cursor-pointer hover:text-primary-foreground">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
