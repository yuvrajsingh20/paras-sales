export interface ProductVariant {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  weight: string;
}

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  image: string;
  category: "moong-papad" | "chana-papad" | "keeche-papad" | "badi" | "sewaiya" | "kurlai" | "seeds";
  variants: ProductVariant[];
  tag?: string;
}

export const products: Product[] = [
  // MOONG PAPAD
  {
    id: "moong-special",
    name: "Moong Special Papad",
    hindiName: "मूंग स्पेशल पापड़",
    description: "Our signature moong dal papad, extra crispy and perfectly seasoned.",
    image: "/placeholder.svg",
    category: "moong-papad",
    tag: "Bestseller",
    variants: [
      { id: "ms-1", name: "Moong Special", subtitle: "Special Blend", price: 90, weight: "200g" },
      { id: "ms-2", name: "Moong Special", subtitle: "Special Blend", price: 170, weight: "400g" },
    ],
  },
  {
    id: "moong-punjabi",
    name: "Moong Punjabi Papad",
    hindiName: "मूंग पंजाबी पापड़",
    description: "Spicy and bold Punjabi style papad with a rich black pepper kick.",
    image: "/placeholder.svg",
    category: "moong-papad",
    variants: [
      { id: "mp-1", name: "Moong Punjabi", subtitle: "Spicy Punjabi", price: 95, weight: "200g" },
      { id: "mp-2", name: "Moong Punjabi", subtitle: "Spicy Punjabi", price: 180, weight: "400g" },
    ],
  },
  {
    id: "moong-lasun",
    name: "Moong Lasun Papad",
    hindiName: "मूंग लहसुन पापड़",
    description: "Infused with the aromatic flavor of fresh garlic for a savory delight.",
    image: "/placeholder.svg",
    category: "moong-papad",
    variants: [
      { id: "ml-1", name: "Moong Lasun", subtitle: "Garlic Flavor", price: 95, weight: "200g" },
      { id: "ml-2", name: "Moong Lasun", subtitle: "Garlic Flavor", price: 180, weight: "400g" },
    ],
  },
  {
    id: "moong-sindhi",
    name: "Moong Sindhi Papad",
    hindiName: "मूंग सिंधी पापड़",
    description: "Traditional Sindhi recipe with a unique mix of digestive spices.",
    image: "/placeholder.svg",
    category: "moong-papad",
    variants: [
      { id: "msi-1", name: "Moong Sindhi", subtitle: "Sindhi Special", price: 95, weight: "200g" },
      { id: "msi-2", name: "Moong Sindhi", subtitle: "Sindhi Special", price: 180, weight: "400g" },
    ],
  },
  {
    id: "moong-urad",
    name: "Moong Urad Papad",
    hindiName: "मूंग उड़द पापड़",
    description: "Balanced blend of moong and urad dal for the perfect texture.",
    image: "/placeholder.svg",
    category: "moong-papad",
    variants: [
      { id: "mu-1", name: "Moong Urad", subtitle: "Mixed Dal", price: 85, weight: "200g" },
      { id: "mu-2", name: "Moong Urad", subtitle: "Mixed Dal", price: 160, weight: "400g" },
    ],
  },

  // CHANA PAPAD
  {
    id: "chana-masala",
    name: "Chana Masala Papad",
    hindiName: "चना मसाला पापड़",
    description: "Zesty chickpea papad loaded with traditional Indian spices.",
    image: "/placeholder.svg",
    category: "chana-papad",
    tag: "Spicy",
    variants: [
      { id: "cm-1", name: "Chana Masala", subtitle: "Spiced Chickpea", price: 90, weight: "200g" },
      { id: "cm-2", name: "Chana Masala", subtitle: "Spiced Chickpea", price: 170, weight: "400g" },
    ],
  },
  {
    id: "chana-lasun",
    name: "Chana Lasun Papad",
    hindiName: "चना लहसुन पापड़",
    description: "Hearty chana dal papad with a punchy garlic aroma.",
    image: "/placeholder.svg",
    category: "chana-papad",
    variants: [
      { id: "cl-1", name: "Chana Lasun", subtitle: "Garlic Chickpea", price: 95, weight: "200g" },
      { id: "cl-2", name: "Chana Lasun", subtitle: "Garlic Chickpea", price: 180, weight: "400g" },
    ],
  },
  {
    id: "chana-methi",
    name: "Chana Methi Papad",
    hindiName: "चना मेथी पापड़",
    description: "Healthy and flavorful papad with the goodness of dried fenugreek leaves.",
    image: "/placeholder.svg",
    category: "chana-papad",
    variants: [
      { id: "cmt-1", name: "Chana Methi", subtitle: "Fenugreek Chickpea", price: 95, weight: "200g" },
      { id: "cmt-2", name: "Chana Methi", subtitle: "Fenugreek Chickpea", price: 180, weight: "400g" },
    ],
  },
  {
    id: "chana-metha",
    name: "Chana Metha Papad",
    hindiName: "चना मेथा पापड़",
    description: "A unique traditional variant of chickpea papad with special spices.",
    image: "/placeholder.svg",
    category: "chana-papad",
    variants: [
      { id: "cmth-1", name: "Chana Metha", subtitle: "Traditional Chickpea", price: 95, weight: "200g" },
      { id: "cmth-2", name: "Chana Metha", subtitle: "Traditional Chickpea", price: 180, weight: "400g" },
    ],
  },

  // KEECHE PAPAD
  {
    id: "makka-keeche",
    name: "Makka Papad (Keeche)",
    hindiName: "मक्का खींचे पापड़",
    description: "Traditional hand-pressed maize papad, rustic and crunchy.",
    image: "/placeholder.svg",
    category: "keeche-papad",
    variants: [
      { id: "mk-1", name: "Makka Keeche", subtitle: "Maize Variety", price: 100, weight: "250g" },
      { id: "mk-2", name: "Makka Keeche", subtitle: "Maize Variety", price: 190, weight: "500g" },
    ],
  },
  {
    id: "chawal-keeche",
    name: "Chawal Papad (Keeche)",
    hindiName: "चावल खींचे पापड़",
    description: "Light and airy rice papad, melts in your mouth.",
    image: "/placeholder.svg",
    category: "keeche-papad",
    variants: [
      { id: "ck-1", name: "Chawal Keeche", subtitle: "Rice Variety", price: 100, weight: "250g" },
      { id: "ck-2", name: "Chawal Keeche", subtitle: "Rice Variety", price: 190, weight: "500g" },
    ],
  },
  {
    id: "jawar-keeche",
    name: "Jawar Papad (Keeche)",
    hindiName: "ज्वार खींचे पापड़",
    description: "Nutritious sorghum papad with a distinct traditional taste.",
    image: "/placeholder.svg",
    category: "keeche-papad",
    variants: [
      { id: "jk-1", name: "Jawar Keeche", subtitle: "Sorghum Variety", price: 110, weight: "250g" },
      { id: "jk-2", name: "Jawar Keeche", subtitle: "Sorghum Variety", price: 210, weight: "500g" },
    ],
  },
  {
    id: "maida-keeche",
    name: "Maida Papad (Keeche)",
    hindiName: "मैदा खींचे पापड़",
    description: "Classic refined flour papad, ultra-thin and crispy.",
    image: "/placeholder.svg",
    category: "keeche-papad",
    variants: [
      { id: "mdk-1", name: "Maida Keeche", subtitle: "Refined Flour", price: 95, weight: "250g" },
      { id: "mdk-2", name: "Maida Keeche", subtitle: "Refined Flour", price: 180, weight: "500g" },
    ],
  },

  // BADI
  {
    id: "moong-badi",
    name: "Moong Badi",
    hindiName: "मूंग बड़ी",
    description: "Sun-dried moong dal nuggets, perfect for traditional Rajasthani curries.",
    image: "/placeholder.svg",
    category: "badi",
    tag: "Popular",
    variants: [
      { id: "mb-1", name: "Moong Badi", subtitle: "Green Gram Nuggets", price: 80, weight: "200g" },
      { id: "mb-2", name: "Moong Badi", subtitle: "Green Gram Nuggets", price: 150, weight: "400g" },
    ],
  },
  {
    id: "urad-badi",
    name: "Urad Badi",
    hindiName: "उड़द बड़ी",
    description: "High-protein black gram nuggets with a rich, savory taste.",
    image: "/placeholder.svg",
    category: "badi",
    variants: [
      { id: "ub-1", name: "Urad Badi", subtitle: "Black Gram Nuggets", price: 85, weight: "200g" },
      { id: "ub-2", name: "Urad Badi", subtitle: "Black Gram Nuggets", price: 160, weight: "400g" },
    ],
  },
  {
    id: "chawla-badi",
    name: "Chawla Badi",
    hindiName: "चावला बड़ी",
    description: "Traditional cowpea nuggets, light and easy to digest.",
    image: "/placeholder.svg",
    category: "badi",
    variants: [
      { id: "cb-1", name: "Chawla Badi", subtitle: "Cowpea Nuggets", price: 85, weight: "200g" },
      { id: "cb-2", name: "Chawla Badi", subtitle: "Cowpea Nuggets", price: 160, weight: "400g" },
    ],
  },

  // SEWAIYA
  {
    id: "aata-sewaiya",
    name: "Aata Sewaiya",
    hindiName: "आटा सेवइयां",
    description: "Healthy whole wheat vermicelli for a nutritious meal.",
    image: "/placeholder.svg",
    category: "sewaiya",
    variants: [
      { id: "as-1", name: "Aata Sewaiya", subtitle: "Whole Wheat", price: 60, weight: "250g" },
      { id: "as-2", name: "Aata Sewaiya", subtitle: "Whole Wheat", price: 110, weight: "500g" },
    ],
  },
  {
    id: "maida-sewaiya",
    name: "Maida Sewaiya",
    hindiName: "मैदा सेवइयां",
    description: "Fine refined flour vermicelli, ideal for sweet kheer.",
    image: "/placeholder.svg",
    category: "sewaiya",
    variants: [
      { id: "msw-1", name: "Maida Sewaiya", subtitle: "Refined Flour", price: 55, weight: "250g" },
      { id: "msw-2", name: "Maida Sewaiya", subtitle: "Refined Flour", price: 100, weight: "500g" },
    ],
  },
  {
    id: "suji-sewaiya",
    name: "Suji Sewaiya",
    hindiName: "सूजी सेवइयां",
    description: "Non-sticky semolina vermicelli for the perfect upma or pulao.",
    image: "/placeholder.svg",
    category: "sewaiya",
    variants: [
      { id: "ss-1", name: "Suji Sewaiya", subtitle: "Semolina", price: 65, weight: "250g" },
      { id: "ss-2", name: "Suji Sewaiya", subtitle: "Semolina", price: 120, weight: "500g" },
    ],
  },

  // KURLAI
  {
    id: "chawal-kurlai",
    name: "Chawal Kurlai",
    hindiName: "चावल कुरलई",
    description: "Crunchy rice fryums, a favorite tea-time snack.",
    image: "/placeholder.svg",
    category: "kurlai",
    variants: [
      { id: "ckr-1", name: "Chawal Kurlai", subtitle: "Rice Fryums", price: 70, weight: "200g" },
      { id: "ckr-2", name: "Chawal Kurlai", subtitle: "Rice Fryums", price: 130, weight: "400g" },
    ],
  },
  {
    id: "maida-kurlai",
    name: "Maida Kurlai",
    hindiName: "मैदा कुरलई",
    description: "Light and crispy refined flour fryums in traditional shapes.",
    image: "/placeholder.svg",
    category: "kurlai",
    variants: [
      { id: "mkr-1", name: "Maida Kurlai", subtitle: "Maida Fryums", price: 65, weight: "200g" },
      { id: "mkr-2", name: "Maida Kurlai", subtitle: "Maida Fryums", price: 120, weight: "400g" },
    ],
  },
  {
    id: "makka-kurlai",
    name: "Makka Kurlai",
    hindiName: "मक्का कुरलई",
    description: "Flavorful maize fryums with a satisfying crunch.",
    image: "/placeholder.svg",
    category: "kurlai",
    variants: [
      { id: "mkk-1", name: "Makka Kurlai", subtitle: "Maize Fryums", price: 75, weight: "200g" },
      { id: "mkk-2", name: "Makka Kurlai", subtitle: "Maize Fryums", price: 140, weight: "400g" },
    ],
  },

  // SEEDS
  {
    id: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    hindiName: "कद्दू के बीज",
    description: "Nutrient-dense pumpkin seeds, great for snacking or salads.",
    image: "/placeholder.svg",
    category: "seeds",
    tag: "Healthy",
    variants: [
      { id: "ps-1", name: "Pumpkin Seeds", subtitle: "Raw & Natural", price: 150, weight: "100g" },
      { id: "ps-2", name: "Pumpkin Seeds", subtitle: "Raw & Natural", price: 280, weight: "200g" },
    ],
  },
  {
    id: "sunflower-seeds",
    name: "Sunflower Seeds",
    hindiName: "सूरजमुखी के बीज",
    description: "Rich in Vitamin E and minerals, a perfect health booster.",
    image: "/placeholder.svg",
    category: "seeds",
    variants: [
      { id: "sf-1", name: "Sunflower Seeds", subtitle: "Premium Quality", price: 120, weight: "100g" },
      { id: "sf-2", name: "Sunflower Seeds", subtitle: "Premium Quality", price: 220, weight: "200g" },
    ],
  },
  {
    id: "sabja-seeds",
    name: "Sweet Basil Seeds (Sabja)",
    hindiName: "सब्जा के बीज",
    description: "Cooling basil seeds, ideal for sharbat and falooda.",
    image: "/placeholder.svg",
    category: "seeds",
    variants: [
      { id: "sb-1", name: "Sabja Seeds", subtitle: "Natural Cooler", price: 80, weight: "100g" },
      { id: "sb-2", name: "Sabja Seeds", subtitle: "Natural Cooler", price: 150, weight: "200g" },
    ],
  },
  {
    id: "chia-seeds",
    name: "Chia Seeds",
    hindiName: "चिया के बीज",
    description: "Superfood chia seeds, rich in Omega-3 and fiber.",
    image: "/placeholder.svg",
    category: "seeds",
    variants: [
      { id: "cs-1", name: "Chia Seeds", subtitle: "Superfood", price: 140, weight: "100g" },
      { id: "cs-2", name: "Chia Seeds", subtitle: "Superfood", price: 260, weight: "200g" },
    ],
  },
  {
    id: "watermelon-seeds",
    name: "Watermelon Seed / Kernels",
    hindiName: "तरबूज के बीज",
    description: "Crispy watermelon kernels, perfect for garnishing and snacking.",
    image: "/placeholder.svg",
    category: "seeds",
    variants: [
      { id: "ws-1", name: "Watermelon Kernels", subtitle: "Nutty Kernels", price: 110, weight: "100g" },
      { id: "ws-2", name: "Watermelon Kernels", subtitle: "Nutty Kernels", price: 200, weight: "200g" },
    ],
  },
];

export const categoryMeta = {
  "moong-papad": {
    label: "Moong Papad",
    hindiLabel: "मूंग पापड़",
    description: "Premium moong dal papads with authentic spice blends",
  },
  "chana-papad": {
    label: "Chana Papad",
    hindiLabel: "चना पापड़",
    description: "Robust and protein-rich chickpea flour papads",
  },
  "keeche-papad": {
    label: "Keeche Papad",
    hindiLabel: "खींचे पापड़",
    description: "Traditional hand-pressed varieties from Rajasthan",
  },
  badi: {
    label: "Badi",
    hindiLabel: "बड़ी",
    description: "Sun-dried lentil nuggets for authentic curries",
  },
  sewaiya: {
    label: "Sewaiya",
    hindiLabel: "सेवई",
    description: "Traditional vermicelli for sweet and savory dishes",
  },
  kurlai: {
    label: "Kurlai",
    hindiLabel: "कुरलई",
    description: "Crispy fryums style traditional snacks",
  },
  seeds: {
    label: "Seeds",
    hindiLabel: "बीज",
    description: "Nutritious and healthy seeds for your daily diet",
  },
};
