import { useState, useEffect, useRef } from "react";
import { products, categoryMeta, Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { LoginModal } from "@/components/LoginModal";
import { ProductDetailsModal } from "@/components/ProductDetailsModal";
import { Leaf, Search, SlidersHorizontal } from "lucide-react";

const categories = ["all", "moong-papad", "chana-papad", "keeche-papad", "badi", "sewaiya", "kurlai", "seeds"] as const;

const RetailPage = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isAutomaticScroll = useRef(false);

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    const sections = categories.filter(c => c !== "all");
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Focus on upper-middle of screen
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isAutomaticScroll.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id.replace("section-", "");
          setActiveCategory(categoryId as any);
          
          // Scroll the navigation bar to keep the active button in view
          const navButton = document.getElementById(`nav-btn-${categoryId}`);
          if (navButton && scrollerRef.current) {
            navButton.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }
        }
      });
    }, observerOptions);

    sections.forEach((cat) => {
      const el = document.getElementById(`section-${cat}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCategoryClick = (cat: typeof categories[number]) => {
    setActiveCategory(cat);
    
    if (cat === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(`section-${cat}`);
    if (element) {
      isAutomaticScroll.current = true;
      const yOffset = -140; // Offset for sticky headers
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: "smooth" });
      
      // Re-enable scroll spy after animation
      setTimeout(() => {
        isAutomaticScroll.current = false;
      }, 1000);

      // Scroll nav button into view
      const navButton = document.getElementById(`nav-btn-${cat}`);
      if (navButton && scrollerRef.current) {
        navButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background transition-page">
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <LoginModal />
      <ProductDetailsModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Modern Page Header */}
      <section className="bg-secondary/20 pt-16 pb-12 border-b border-border/50">
        <div className="container mx-auto px-6 mt-3">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                <Leaf className="h-4 w-4" />
                Pure Tradition
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Our Collection
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Explore the artisanal range of premium Indian foods by Paras-Ji. From sun-dried papads to nutritious seeds, crafted for those who value authenticity.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-background p-2 rounded-2xl border border-border/50 shadow-sm max-w-sm w-full md:w-auto">
              <Search className="h-5 w-5 text-muted-foreground ml-2" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none outline-none text-sm py-2 flex-grow min-w-0"
              />
              <button className="p-2 bg-secondary rounded-xl text-primary hover:bg-primary hover:text-white transition-all">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Scroll-Spy Navigation */}
      <div className="sticky top-[64px] z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div 
            ref={scrollerRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                id={`nav-btn-${cat}`}
                onClick={() => handleCategoryClick(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-[#FAFAF5] shadow-md shadow-primary/20 translate-y-[-1px]"
                    : "bg-background border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat === "all" ? "All Products" : categoryMeta[cat].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-16">
        {categories.filter(c => c !== "all").map((cat) => {
          const catProducts = products.filter((p) => p.category === cat);
          if (catProducts.length === 0) return null;
          
          return (
            <div 
              key={cat} 
              id={`section-${cat}`} 
              className="mb-24 scroll-mt-32 animate-in"
            >
              {/* Category Group Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-border/30 pb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    {categoryMeta[cat].label}
                    <span className="text-[10px] font-medium text-muted-foreground uppercase py-0.5 px-2 bg-secondary rounded-md">
                      {categoryMeta[cat].hindiLabel}
                    </span>
                  </h2>
                  <p className="mt-1 text-muted-foreground max-w-xl text-xs leading-relaxed">
                    {categoryMeta[cat].description}
                  </p>
                </div>
                <div className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                  {catProducts.length} Products
                </div>
              </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {catProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
                </div>
            </div>
          );
        })}
      </main>

      <footer className="bg-secondary/10 border-t border-border/50 py-12 text-center">
        <p className="text-muted-foreground text-sm font-medium">
          © 2024 Paras-Ji Foods · Pure · Natural · Traditional
        </p>
      </footer>
    </div>
  );
};

export default RetailPage;
