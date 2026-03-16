import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { LoginModal } from "@/components/LoginModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { Building2, Package, MapPin, Phone, Mail, User, ChevronDown, Send, CheckCircle, ArrowRight } from "lucide-react";
import parasJiLogo from "@/assets/paras-ji-logo.png";

const productVariants = [
  // MOONG PAPAD
  { id: "moong-special", category: "Moong Papad", name: "Moong Special Papad" },
  { id: "moong-punjabi", category: "Moong Papad", name: "Moong Punjabi Papad" },
  { id: "moong-lasun", category: "Moong Papad", name: "Moong Lasun Papad" },
  { id: "moong-sindhi", category: "Moong Papad", name: "Moong Sindhi Papad" },
  { id: "moong-urad", category: "Moong Papad", name: "Moong Urad Papad" },
  // CHANA PAPAD
  { id: "chana-masala", category: "Chana Papad", name: "Chana Masala Papad" },
  { id: "chana-lasun", category: "Chana Papad", name: "Chana Lasun Papad" },
  { id: "chana-methi", category: "Chana Papad", name: "Chana Methi Papad" },
  { id: "chana-metha", category: "Chana Papad", name: "Chana Metha Papad" },
  // KEECHE PAPAD
  { id: "makka-keeche", category: "Keeche Papad", name: "Makka Papad (Keeche)" },
  { id: "chawal-keeche", category: "Keeche Papad", name: "Chawal Papad (Keeche)" },
  { id: "jawar-keeche", category: "Keeche Papad", name: "Jawar Papad (Keeche)" },
  { id: "maida-keeche", category: "Keeche Papad", name: "Maida Papad (Keeche)" },
  // BADI
  { id: "moong-badi", category: "Badi", name: "Moong Badi" },
  { id: "urad-badi", category: "Badi", name: "Urad Badi" },
  { id: "chawla-badi", category: "Badi", name: "Chawla Badi" },
  // SEWAIYA
  { id: "aata-sewaiya", category: "Sewaiya", name: "Aata Sewaiya" },
  { id: "maida-sewaiya", category: "Sewaiya", name: "Maida Sewaiya" },
  { id: "suji-sewaiya", category: "Sewaiya", name: "Suji Sewaiya" },
  // KURLAI
  { id: "chawal-kurlai", category: "Kurlai", name: "Chawal Kurlai" },
  { id: "maida-kurlai", category: "Kurlai", name: "Maida Kurlai" },
  { id: "makka-kurlai", category: "Kurlai", name: "Makka Kurlai" },
  // SEEDS
  { id: "pumpkin-seeds", category: "Seeds", name: "Pumpkin Seeds" },
  { id: "sunflower-seeds", category: "Seeds", name: "Sunflower Seeds" },
  { id: "sabja-seeds", category: "Seeds", name: "Sweet Basil Seeds (Sabja)" },
  { id: "chia-seeds", category: "Seeds", name: "Chia Seeds" },
  { id: "watermelon-seeds", category: "Seeds", name: "Watermelon Seed / Kernels" },
];

const packagingSizes = ["500g", "1 kg", "2 kg", "5 kg", "10 kg", "25 kg", "50 kg", "100 kg"];

interface OrderItem {
  productId: string;
  quantity: string;
  packaging: string;
}

const WholesalePage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    message: "",
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { productId: "", quantity: "", packaging: "" },
  ]);

  const addItem = () =>
    setOrderItems((prev) => [...prev, { productId: "", quantity: "", packaging: "" }]);

  const removeItem = (idx: number) =>
    setOrderItems((prev) => prev.filter((_, i) => i !== idx));

  const updateItem = (idx: number, key: keyof OrderItem, value: string) =>
    setOrderItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [key]: value } : item))
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  const groupedProducts = productVariants.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, typeof productVariants>);

  return (
    <div className="min-h-screen bg-background transition-page">
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <LoginModal />

      {/* Hero Overlay */}
      <section className="relative pt-24 pb-16 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-left animate-in">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                <Building2 className="h-4 w-4" />
                Global B2B Partner
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Wholesale <br />Collaborations.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
                Empower your business with the authentic taste of Paras-Ji. We offer customized bulk solutions, export-quality packaging, and consistent supply chains.
              </p>
              <div className="flex items-center gap-6 text-sm font-semibold text-primary">
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Export Quality</div>
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Global Delivery</div>
              </div>
            </div>
            <div className="hidden md:block w-48 h-48 opacity-10 grayscale invert">
               <img src={parasJiLogo} alt="" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-20 max-w-6xl">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-20 animate-in">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 shadow-inner">
               <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Inquiry Received</h2>
            <p className="text-muted-foreground text-center max-w-md mb-10 leading-relaxed">
              Our B2B relations team will review your requirements and reach out within 1 business day. Thank you for choosing Paras-Ji.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary"
            >
              Start New Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Form Left Side: Business Info */}
            <div className="lg:col-span-5 space-y-12 animate-in" style={{ animationDelay: '0.1s' }}>
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-8 pb-4 border-b border-border/50">Business Identity</h2>
                <div className="space-y-6">
                  <InputField label="Company Name" placeholder="e.g. Parasji Distributors" icon={<Building2 className="h-4 w-4" />} />
                  <InputField label="Contact Person" placeholder="Full Name" icon={<User className="h-4 w-4" />} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField label="Email" type="email" placeholder="business@email.com" icon={<Mail className="h-4 w-4" />} />
                    <InputField label="Phone" type="tel" placeholder="+91 ..." icon={<Phone className="h-4 w-4" />} />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-8 pb-4 border-b border-border/50">Logistics</h2>
                <div className="space-y-6">
                   <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Street Address</label>
                    <div className="relative">
                      <span className="absolute left-4 top-4 text-muted-foreground"><MapPin className="h-4 w-4" /></span>
                      <textarea 
                        className="w-full bg-secondary/30 border border-transparent focus:border-primary/20 focus:bg-background h-24 rounded-2xl p-4 pl-12 text-sm outline-none transition-all resize-none" 
                        placeholder="Warehouse or Office address"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="City" placeholder="City" />
                    <InputField label="ZIP Code" placeholder="000000" />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Right Side: Requirements */}
            <div className="lg:col-span-7 animate-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-background rounded-[40px] border border-border/50 p-8 md:p-12 shadow-2xl shadow-primary/5">
                <h2 className="text-2xl font-bold tracking-tight mb-2">Requirements</h2>
                <p className="text-sm text-muted-foreground mb-10">Select products and approximate bulk quantities.</p>
                
                <div className="space-y-6">
                   {orderItems.map((item, idx) => (
                    <div key={idx} className="group relative bg-secondary/20 p-6 rounded-2xl border border-transparent hover:border-primary/10 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Product #{idx + 1}</span>
                        {orderItems.length > 1 && (
                          <button onClick={() => removeItem(idx)} className="text-[10px] font-bold text-destructive hover:underline uppercase">Discard</button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <select 
                            className="w-full bg-white border border-border/50 rounded-xl px-4 py-3 text-sm font-medium outline-none appearance-none cursor-pointer focus:border-primary transition-all"
                            value={item.productId}
                            onChange={(e) => updateItem(idx, "productId", e.target.value)}
                          >
                            <option value="">Select Product</option>
                            {Object.entries(groupedProducts).map(([cat, prods]) => (
                               <optgroup key={cat} label={cat}>
                                 {prods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                               </optgroup>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                        </div>
                        <div className="flex gap-2">
                          <input 
                            className="flex-grow bg-white border border-border/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all" 
                            placeholder="Qty (Kg)"
                            value={item.quantity}
                            onChange={(e) => updateItem(idx, "quantity", e.target.value)}
                          />
                           <div className="relative">
                            <select 
                              className="w-40 bg-white border border-border/50 rounded-xl px-4 py-3 text-sm font-medium outline-none appearance-none cursor-pointer focus:border-primary transition-all"
                              value={item.packaging}
                              onChange={(e) => updateItem(idx, "packaging", e.target.value)}
                            >
                               <option value="">Packaging</option>
                               {packagingSizes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                   ))}

                   <button 
                     type="button" 
                     onClick={addItem}
                     className="w-full py-4 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-sm font-bold flex items-center justify-center gap-2"
                   >
                     + Add Product to Inquiry
                   </button>
                </div>

                <div className="mt-12">
                   <InputField label="Additional Notes" placeholder="Any specific requirements or export targets..." />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary py-5 mt-10 rounded-2xl text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Submit Proposal"}
                  <ArrowRight className="h-5 w-5" />
                </button>
                <p className="text-center text-[10px] text-muted-foreground mt-4 font-medium uppercase tracking-widest">Confidential & Direct Submission</p>
              </div>
            </div>
          </form>
        )}
      </main>

      <footer className="bg-background border-t border-border py-12 text-center">
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em]">Crafted For Business · Paras-Ji Foods B2B</p>
      </footer>
    </div>
  );
};

const InputField = ({ label, placeholder, icon, type = "text" }: { label: string; placeholder: string; icon?: React.ReactNode; type?: string }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1 transition-colors group-focus-within:text-primary">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">{icon}</span>}
      <input 
        type={type}
        className={`w-full bg-secondary/30 border border-transparent focus:border-primary/20 focus:bg-background rounded-2xl p-4 ${icon ? 'pl-12' : 'pl-6'} text-sm outline-none transition-all placeholder:text-muted-foreground/50`} 
        placeholder={placeholder} 
      />
    </div>
  </div>
);

export default WholesalePage;
