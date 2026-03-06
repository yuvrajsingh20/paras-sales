import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import productPapad from "@/assets/product-papad.jpg";
import productSevaiyan from "@/assets/product-sevaiyan.jpg";
import productPapadi from "@/assets/product-papadi.jpg";

const imageMap: Record<string, string> = {
  papad: productPapad,
  sevaiyan: productSevaiyan,
  papadi: productPapadi,
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
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
    <div className="card-product group">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-brand-50">
        <img
          src={imageMap[product.category]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 badge-green text-xs">{product.tag}</span>
        )}
        <button
          onClick={() =>
            toggleWishlist({
              productId: product.id,
              name: product.name,
              price: selectedVariant.price,
              image: product.category,
            })
          }
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-sm ${
            wishlisted
              ? "bg-primary text-primary-foreground"
              : "bg-background/90 text-muted-foreground hover:text-primary"
          }`}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-0.5">{product.hindiName}</p>
        <h3 className="font-display font-bold text-base text-foreground leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{product.description}</p>

        {/* Star Rating (decorative) */}
        <div className="flex items-center gap-0.5 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
        </div>

        {/* Variant Pills */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {product.variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-200 font-medium ${
                selectedVariant.id === v.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {v.weight}
            </button>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-xl text-primary">₹{selectedVariant.price}</span>
            <span className="text-xs text-muted-foreground ml-1">/ {selectedVariant.weight}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
