import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, User, CreditCard, ChevronRight, Package, ArrowLeft } from "lucide-react";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/api";
import { initializeRazorpayPayment } from "@/lib/razorpay";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone_number || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate("/retail");
    }
  }, [items, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      // Update profile with missing details if they are new
      const profileUpdates: any = {};
      if (formData.name !== user?.name) profileUpdates.name = formData.name;
      if (formData.phone !== user?.phone_number) profileUpdates.phone_number = formData.phone;
      if (formData.address !== user?.address) profileUpdates.address = formData.address;
      if (formData.city !== user?.city) profileUpdates.city = formData.city;
      if (formData.state !== user?.state) profileUpdates.state = formData.state;
      if (formData.pincode !== user?.pincode) profileUpdates.pincode = formData.pincode;

      if (Object.keys(profileUpdates).length > 0) {
        await updateProfile(profileUpdates);
      }

      const order = await createRazorpayOrder(total);
      
      await initializeRazorpayPayment({
        amount: order.amount,
        currency: order.currency,
        name: "Paras Sales",
        description: `Order for ${items.length} items`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verification = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            if (verification.success) {
              toast.success("Order placed successfully! 🌿");
              clearCart();
              navigate("/");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error: any) {
            toast.error(error.message || "Payment verification failed");
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
          email: user?.email || "",
        },
        theme: {
          color: "#E21E26",
        },
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="flex items-center gap-2 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary/50 transition-all">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Shipping Form */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-primary/5 border border-border/50">
              <h2 className="text-xl font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6" />
                Shipping Information
              </h2>
              
              <form onSubmit={handlePayment} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold resize-none"
                    placeholder="House No, Street, Landmark..."
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                      placeholder="Jodhpur"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                      placeholder="Rajasthan"
                    />
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                      placeholder="342001"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all group"
                  >
                    <CreditCard className="h-6 w-6 group-hover:animate-bounce" />
                    {loading ? "Processing..." : `Pay ₹${total}`}
                  </button>
                  <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-[0.2em] font-bold">
                    Secure 256-bit SSL Encrypted Payment
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-border/30 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Package className="h-32 w-32" />
              </div>
              
              <h2 className="text-xl font-black uppercase tracking-widest text-foreground mb-8 flex items-center gap-3">
                Order Summary
                <span className="bg-secondary text-primary text-xs px-3 py-1 rounded-full">{items.length} Items</span>
              </h2>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 p-4 rounded-2xl border border-border/30 bg-secondary/10">
                    <div className="w-16 h-16 rounded-xl bg-white border border-border/30 flex items-center justify-center p-2">
                       <span className="text-2xl">🌿</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-sm uppercase leading-tight mb-1">{item.name}</h4>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {item.variantName} · {item.weight}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-bold bg-white px-2 py-0.5 rounded border border-border/30">Qty: {item.quantity}</span>
                        <span className="font-black text-primary">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-dashed border-border space-y-4">
                <div className="flex justify-between items-center text-muted-foreground font-bold uppercase tracking-widest text-xs">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground font-bold uppercase tracking-widest text-xs">
                  <span>Delivery</span>
                  <span className="text-primary-green">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-border/50">
                  <span className="text-lg font-black uppercase tracking-widest">Total Amount</span>
                  <span className="text-2xl font-black text-primary">₹{total}</span>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 p-6 rounded-3xl flex gap-4 items-start">
              <div className="p-2 bg-accent/20 rounded-xl text-accent">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest mb-1">Fast Delivery</h4>
                <p className="text-[11px] text-muted-foreground leading-tight font-medium">Orders are usually dispatched within 24-48 hours. Expect delivery in 4-6 business days.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
