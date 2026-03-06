import { createContext, useContext, useState, ReactNode } from "react";

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleWishlist = (item: WishlistItem) => {
    setItems((prev) =>
      prev.find((i) => i.productId === item.productId)
        ? prev.filter((i) => i.productId !== item.productId)
        : [...prev, item]
    );
  };

  const isWishlisted = (productId: string) =>
    items.some((i) => i.productId === productId);

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, isWishlisted, isWishlistOpen, setIsWishlistOpen }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
