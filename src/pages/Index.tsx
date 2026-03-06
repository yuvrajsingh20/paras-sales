import { LandingPage } from "@/components/LandingPage";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { LoginModal } from "@/components/LoginModal";

const Index = () => {
  return (
    <>
      <LandingPage />
      <CartDrawer />
      <WishlistDrawer />
      <LoginModal />
    </>
  );
};

export default Index;
