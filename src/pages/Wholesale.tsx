import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { LoginModal } from "@/components/LoginModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { Building2, Package, MapPin, Phone, Mail, User, ChevronDown, Send, CheckCircle } from "lucide-react";
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
    // Simulate API call / email notification
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const groupedProducts = productVariants.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, typeof productVariants>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <LoginModal />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-8 w-8 text-brand-200" />
            <p className="text-brand-200 text-sm font-semibold uppercase tracking-widest">B2B & Bulk Orders</p>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
            Wholesale Enquiry
          </h1>
          <p className="text-primary-foreground/70 text-base max-w-xl">
            Partner with Paras-Ji for bulk supply. Fill the form below and our team will contact you within 24 hours.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 opacity-5 flex items-center justify-center pr-12">
          <img src={parasJiLogo} alt="" className="h-48 w-48 object-contain brightness-0 invert" />
        </div>
      </div>

      {submitted ? (
        <div className="container mx-auto px-4 py-24 max-w-lg text-center">
          <div className="bg-brand-50 rounded-3xl p-12 shadow-md">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Requirement Sent!
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your enquiry. Our team will review your requirements and contact you via email & phone within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Contact Details */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-brand-50 rounded-2xl p-6">
                <h2 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Contact Details
                </h2>
                <div className="space-y-4">
                  <InputField
                    icon={<Building2 className="h-4 w-4" />}
                    placeholder="Business / Company Name"
                    value={form.businessName}
                    onChange={(v) => setForm({ ...form, businessName: v })}
                    required
                  />
                  <InputField
                    icon={<User className="h-4 w-4" />}
                    placeholder="Contact Person Name"
                    value={form.contactName}
                    onChange={(v) => setForm({ ...form, contactName: v })}
                    required
                  />
                  <InputField
                    icon={<Phone className="h-4 w-4" />}
                    placeholder="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    required
                  />
                  <InputField
                    icon={<Mail className="h-4 w-4" />}
                    placeholder="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="bg-brand-50 rounded-2xl p-6">
                <h2 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <textarea
                    placeholder="Street Address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                    <input
                      placeholder="State"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                  <input
                    placeholder="PIN Code"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right: Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-brand-50 rounded-2xl p-6">
                <h2 className="font-display font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Order Requirements
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Add each product with desired quantity and packaging size.
                </p>

                <div className="space-y-4">
                  {orderItems.map((item, idx) => (
                    <div key={idx} className="bg-background rounded-xl p-4 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Item #{idx + 1}
                        </span>
                        {orderItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(idx)}
                            className="text-xs text-destructive hover:text-destructive/80 font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Product Select */}
                        <div className="sm:col-span-1 relative">
                          <select
                            value={item.productId}
                            onChange={(e) => updateItem(idx, "productId", e.target.value)}
                            className="w-full appearance-none pl-3 pr-8 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                          >
                            <option value="">Select Product</option>
                            {Object.entries(groupedProducts).map(([cat, prods]) => (
                              <optgroup key={cat} label={`── ${cat} ──`}>
                                {prods.map((p) => (
                                  <option key={p.id} value={p.id}>
                                    {p.name}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* Quantity */}
                        <input
                          placeholder="Qty (e.g. 50)"
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(idx, "quantity", e.target.value)}
                          className="w-full px-3 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        />

                        {/* Packaging */}
                        <div className="relative">
                          <select
                            value={item.packaging}
                            onChange={(e) => updateItem(idx, "packaging", e.target.value)}
                            className="w-full appearance-none pl-3 pr-8 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                          >
                            <option value="">Packaging</option>
                            {packagingSizes.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-primary/40 text-primary hover:border-primary hover:bg-brand-50 text-sm font-semibold transition-all duration-200"
                >
                  + Add Another Product
                </button>
              </div>

              {/* Message */}
              <div className="bg-brand-50 rounded-2xl p-6 mt-6">
                <h2 className="font-display font-bold text-base text-foreground mb-3">
                  Additional Notes
                </h2>
                <textarea
                  placeholder="Any special requirements, delivery instructions, or questions..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-center mt-6 text-base py-4 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Send className="h-5 w-5" />
                {loading ? "Sending Requirement..." : "Send Requirement to Paras-Ji"}
              </button>
              <p className="text-center text-xs text-muted-foreground mt-2">
                You will receive a confirmation email. Our team will call you within 24 hours.
              </p>
            </div>
          </div>
        </form>
      )}

      <footer className="bg-primary text-primary-foreground py-8 px-4 text-center mt-8">
        <p className="text-primary-foreground/70 text-sm">
          © 2024 Paras-Ji Foods · For wholesale queries: +91 98765 43210 · parasji@email.com
        </p>
      </footer>
    </div>
  );
};

const InputField = ({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  required,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full pl-9 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
    />
  </div>
);

export default WholesalePage;
