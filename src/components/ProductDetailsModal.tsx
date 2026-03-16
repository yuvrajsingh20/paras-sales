import { useState } from "react";
import { X, ShoppingCart, Heart, Leaf, ShieldCheck, Award, Info, ChefHat } from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import productPapad from "@/assets/product-papad.jpg";
import productSevaiyan from "@/assets/product-sevaiyan.jpg";
import productPapadi from "@/assets/product-papadi.jpg";

const imageMap: Record<string, string> = {
  "moong-papad": productPapad,
  "chana-papad": productPapad,
  "keeche-papad": productPapad,
  badi: productSevaiyan,
  sewaiya: productSevaiyan,
  kurlai: productPapadi,
  seeds: productPapadi,
};

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] || null
  );
  const [activeTab, setActiveTab] = useState<"cooking" | "nutrition">("cooking");
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product || !isOpen) return null;

  // Sync variant when product changes
  if (selectedVariant && !product.variants.find(v => v.id === selectedVariant.id)) {
      setSelectedVariant(product.variants[0]);
  }

  const currentVariant = selectedVariant || product.variants[0];
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: currentVariant.id,
      name: product.name,
      variantName: currentVariant.name,
      price: currentVariant.price,
      weight: currentVariant.weight,
      image: product.category,
    });
    // Optional: close on add or show feedback
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-[#FAFAF5] w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col md:flex-row animate-in border border-border/50">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all group"
        >
          <X className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
        </button>

        {/* Left: Product Image & Trust Badges */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-secondary/10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border/30 overflow-y-auto">
          <div className="relative w-full aspect-square max-w-[400px] mb-12">
            <img 
              src={imageMap[product.category] || "/placeholder.svg"} 
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-w-[450px]">
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Leaf className="h-7 w-7" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">100%<br/>Natural</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">No Artificial<br/>Colors</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Award className="h-7 w-7" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Premium<br/>Quality</span>
            </div>
          </div>
        </div>

        {/* Right: Content & Interaction */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto bg-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
               <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] border-b-2 border-primary/20 pb-0.5">
                  {product.category.replace('-', ' ')}
               </span>
               <span className="text-muted-foreground/40 font-bold text-[10px] uppercase">
                  {product.hindiName}
               </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-[1.1] mb-4">
              {product.name}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              {product.description} Handcrafted with tradition, bringing the soulful essence of Indian farmland to your table.
            </p>
          </div>

          {/* Variants */}
          <div className="mb-10">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 block mb-4">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-5 py-2.5 rounded-full border-2 font-black text-xs uppercase transition-all duration-300 ${
                    currentVariant.id === v.id
                      ? "border-accent bg-accent text-accent-foreground shadow-md scale-105"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary bg-background/50"
                  }`}
                >
                  {v.weight}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Button - Nicely Visible Words */}
          <div className="flex items-center gap-4 mb-10 pt-6 border-t border-border/50">
            <div className="flex-1">
               <button
                 onClick={handleAddToCart}
                 className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
               >
                 <ShoppingCart className="h-6 w-6" />
                 Add to Cart — ₹{currentVariant.price}
               </button>
            </div>
            <button
               onClick={() => toggleWishlist({ productId: product.id, name: product.name, price: currentVariant.price, image: product.category })}
               className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                 wishlisted ? "bg-primary border-primary text-white shadow-lg" : "border-border text-muted-foreground hover:border-primary/30"
               }`}
            >
              <Heart className={`h-6 w-6 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Info Tabs */}
          <div className="mt-auto">
            <div className="flex gap-8 border-b border-border/50 mb-6">
              <button 
                onClick={() => setActiveTab("cooking")}
                className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative ${
                  activeTab === "cooking" ? "text-primary" : "text-muted-foreground hover:text-primary/60"
                }`}
              >
                Cooking Info
                {activeTab === "cooking" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab("nutrition")}
                className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative ${
                  activeTab === "nutrition" ? "text-primary" : "text-muted-foreground hover:text-primary/60"
                }`}
              >
                Nutritional Info
                {activeTab === "nutrition" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
              </button>
            </div>

            <div className="animate-in" key={activeTab}>
              {activeTab === "cooking" ? (
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-accent/20 rounded-lg text-accent">
                      <ChefHat className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-widest mb-1">To Roast</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">Roast for a few seconds over an open fire until ready and crispy.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Info className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-widest mb-1">To Microwave</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">Brush lightly with oil, place in microwave for 45 seconds until ready.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                   {[
                      { label: "Energy Value", value: "319.2 Kcal" },
                      { label: "Protein", value: "11.80g" },
                      { label: "Carbohydrate", value: "63.15g" },
                      { label: "Total Fat", value: "2.15g" },
                      { label: "Sugar", value: "0.0g" },
                      { label: "Fiber", value: "14.40g" },
                   ].map(item => (
                     <div key={item.label} className="flex justify-between items-center text-[11px] border-b border-border/30 pb-1.5 last:border-0">
                        <span className="text-muted-foreground font-bold">{item.label}</span>
                        <span className="text-foreground font-black">{item.value}</span>
                     </div>
                   ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
