import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import productPapad from "@/assets/product-papad.jpg";
import productSevaiyan from "@/assets/product-sevaiyan.jpg";
import productPapadi from "@/assets/product-papadi.jpg";

const imageMap: Record<string, string> = {
  papad: productPapad,
  sevaiyan: productSevaiyan,
  papadi: productPapadi,
};

export const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, total, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const { user, setIsLoginOpen } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setIsLoginOpen(true);
    } else {
      alert("Order placed successfully! Thank you for shopping with Paras-Ji 🌿");
      clearCart();
      setIsCartOpen(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="flex-1 bg-foreground/30 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      {/* Drawer */}
      <div className="w-full max-w-md bg-background shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-primary">Your Cart</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-secondary">
            <X className="h-5 w-5 text-primary" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <button onClick={() => setIsCartOpen(false)} className="btn-primary text-sm py-2 px-6">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => {
              const category = item.productId.includes("sevaiyan")
                ? "sevaiyan"
                : item.productId.includes("papadi")
                ? "papadi"
                : "papad";
              return (
                <div key={item.variantId} className="flex gap-4 bg-muted rounded-xl p-3">
                  <img
                    src={imageMap[category]}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.variantName} · {item.weight}</p>
                    <p className="text-primary font-bold text-sm mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.variantId)} className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-secondary text-primary flex items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="font-display font-bold text-xl text-primary">₹{total}</span>
            </div>
            <button onClick={handleCheckout} className="btn-primary w-full text-center">
              {user ? "Place Order" : "Login to Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
