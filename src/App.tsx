import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import RetailPage from "./pages/Retail";
import WholesalePage from "./pages/Wholesale";
import NotFound from "./pages/NotFound";

import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const isGoogleConfigured = googleClientId && googleClientId !== 'your-google-client-id';

if (!isGoogleConfigured) {
  console.warn('Google Login is not configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file.');
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={isGoogleConfigured ? googleClientId : "temp-id"}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/retail" element={<RetailPage />} />
                <Route path="/wholesale" element={<WholesalePage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </GoogleOAuthProvider>
</QueryClientProvider>
);

export default App;
