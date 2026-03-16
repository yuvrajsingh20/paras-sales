import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
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

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      weight: selectedVariant.weight,
      image: product.category,
    });
  };

  return (
    <div 
      onClick={onClick}
      className="premium-card group bg-background border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer"
    >
      {/* Image Overlay */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
        <img
          src={imageMap[product.category] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Absolute Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.tag && (
            <span className="bg-primary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm animate-in">
              {product.tag}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              productId: product.id,
              name: product.name,
              price: selectedVariant.price,
              image: product.category,
            });
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 shadow-md transform hover:scale-110 active:scale-90 ${
            wishlisted
              ? "bg-primary text-white"
              : "bg-white/90 backdrop-blur-md text-muted-foreground hover:text-primary"
          }`}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <p className="text-[9px] uppercase tracking-[0.1em] font-bold text-primary/60 mb-0.5">
            {product.hindiName}
          </p>
          <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Variants Selection */}
        <div className="mt-auto space-y-4">
          <div className="flex gap-1.5 flex-wrap">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariant(v);
                }}
                className={`text-[10px] px-3 py-1 rounded-full border font-semibold transition-all duration-300 ${
                  selectedVariant.id === v.id
                    ? "border-accent bg-accent text-accent-foreground shadow-sm"
                    : "border-border text-muted-foreground hover:border-accent/40 hover:text-accent"
                }`}
              >
                {v.weight}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-none">
                ₹{selectedVariant.price}
              </span>
              <span className="text-[9px] text-muted-foreground mt-0.5 font-medium">
                Pack of {selectedVariant.weight}
              </span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="btn-primary p-2.5 rounded-full hover:shadow-lg transition-all active:scale-95"
              aria-label="Add to Cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
