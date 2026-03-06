import { useState } from "react";
import { products, categoryMeta } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { LoginModal } from "@/components/LoginModal";
import productPapad from "@/assets/product-papad.jpg";
import productSevaiyan from "@/assets/product-sevaiyan.jpg";
import productPapadi from "@/assets/product-papadi.jpg";

const categoryImages: Record<string, string> = {
  papad: productPapad,
  sevaiyan: productSevaiyan,
  papadi: productPapadi,
};

const categories = ["all", "papad", "sevaiyan", "papadi"] as const;

const RetailPage = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "papad" | "sevaiyan" | "papadi">("all");

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <LoginModal />

      {/* Hero Banner */}
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${productPapad})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 py-14 relative z-10">
          <p className="text-brand-200 text-sm font-semibold uppercase tracking-widest mb-2">
            Fresh from the Kitchen
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
            Our Products
          </h1>
          <p className="text-primary-foreground/70 text-base max-w-lg">
            Explore our authentic range of Papad, Sevaiyan & Papadi — crafted with traditional recipes.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {cat === "all"
                ? "All Products"
                : `${categoryMeta[cat].label} (${categoryMeta[cat].hindiLabel})`}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-12">
        {(activeCategory === "all" ? (["papad", "sevaiyan", "papadi"] as const) : [activeCategory]).map(
          (cat) => {
            const catProducts = products.filter((p) => p.category === cat);
            return (
              <div key={cat} className="mb-14">
                {/* Category Header */}
                <div className="flex items-end gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-1 h-8 bg-primary rounded-full" />
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        {categoryMeta[cat].label}{" "}
                        <span className="text-muted-foreground text-xl font-normal">
                          {categoryMeta[cat].hindiLabel}
                        </span>
                      </h2>
                    </div>
                    <p className="text-muted-foreground text-sm ml-4 pl-3">
                      {categoryMeta[cat].description}
                    </p>
                  </div>
                  <div className="hidden md:block w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
                    <img
                      src={categoryImages[cat]}
                      alt={cat}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {catProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4 text-center">
        <p className="text-primary-foreground/70 text-sm">
          © 2024 Paras-Ji Foods · Pure · Natural · Traditional
        </p>
      </footer>
    </div>
  );
};

export default RetailPage;
