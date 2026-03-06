import { X, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import productPapad from "@/assets/product-papad.jpg";
import productSevaiyan from "@/assets/product-sevaiyan.jpg";
import productPapadi from "@/assets/product-papadi.jpg";

const imageMap: Record<string, string> = {
  papad: productPapad,
  sevaiyan: productSevaiyan,
  papadi: productPapadi,
};

export const WishlistDrawer = () => {
  const { items, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-foreground/30 backdrop-blur-sm"
        onClick={() => setIsWishlistOpen(false)}
      />
      <div className="w-full max-w-md bg-background shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <h2 className="font-display font-bold text-lg text-primary">Wishlist</h2>
          </div>
          <button onClick={() => setIsWishlistOpen(false)} className="p-2 rounded-full hover:bg-secondary">
            <X className="h-5 w-5 text-primary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <Heart className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">Your wishlist is empty</p>
            </div>
          ) : (
            items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              const category = item.productId.includes("sevaiyan")
                ? "sevaiyan"
                : item.productId.includes("papadi")
                ? "papadi"
                : "papad";
              return (
                <div key={item.productId} className="flex gap-4 bg-muted rounded-xl p-3">
                  <img
                    src={imageMap[category]}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{item.name}</p>
                    <p className="text-primary font-bold text-sm mt-1">
                      from ₹{Math.min(...(product?.variants.map((v) => v.price) || [0]))}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() =>
                        toggleWishlist({ productId: item.productId, name: item.name, price: item.price, image: item.image })
                      }
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {product && (
                      <button
                        onClick={() =>
                          addToCart({
                            productId: product.id,
                            variantId: product.variants[0].id,
                            name: product.name,
                            variantName: product.variants[0].name,
                            price: product.variants[0].price,
                            weight: product.variants[0].weight,
                            image: category,
                          })
                        }
                        className="text-xs btn-primary py-1 px-3"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
