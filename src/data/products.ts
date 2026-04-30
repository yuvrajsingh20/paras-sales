export interface ProductVariant {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  weight: string;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sodium: string;
  calcium: string;
  iron: string;
  garlic?: string; // Special field for garlic variants
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
  nutrition?: NutritionInfo;
  ingredients?: string[];
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
      { id: "ms-1", name: "Moong Special", subtitle: "Special Blend", price: 120, weight: "200g" },
      { id: "ms-2", name: "Moong Special", subtitle: "Special Blend", price: 230, weight: "400g" },
      { id: "ms-3", name: "Moong Special", subtitle: "Special Blend", price: 280, weight: "500g" },
      { id: "ms-4", name: "Moong Special", subtitle: "Special Blend", price: 540, weight: "1kg" },
    ],
    nutrition: {
      calories: "330-370 Kcal",
      protein: "23-26g",
      carbs: "55-60g",
      fat: "0.5-1.5g",
      fiber: "8-10g",
      sodium: "900-1300mg",
      calcium: "40-70mg",
      iron: "3-5mg"
    },
    ingredients: ["Moong Dal", "Salt", "Black Pepper", "Asafoetida (Hing)", "Cumin Seeds (Jeera)", "Baking Soda / Papad Khar", "Edible Oil", "Water"]
  },
  {
    id: "moong-punjabi",
    name: "Moong Punjabi Papad",
    hindiName: "मूंग पंजाबी पापड़",
    description: "Spicy and bold Punjabi style papad with a rich black pepper kick.",
    image: "/placeholder.svg",
    category: "moong-papad",
    variants: [
      { id: "mp-1", name: "Moong Punjabi", subtitle: "Spicy Punjabi", price: 132, weight: "200g" },
      { id: "mp-2", name: "Moong Punjabi", subtitle: "Spicy Punjabi", price: 250, weight: "400g" },
      { id: "mp-3", name: "Moong Punjabi", subtitle: "Spicy Punjabi", price: 310, weight: "500g" },
      { id: "mp-4", name: "Moong Punjabi", subtitle: "Spicy Punjabi", price: 600, weight: "1kg" },
    ],
    nutrition: {
      calories: "330-370 Kcal",
      protein: "23-26g",
      carbs: "55-60g",
      fat: "0.5-1.5g",
      fiber: "8-10g",
      sodium: "900-1300mg",
      calcium: "40-70mg",
      iron: "3-5mg"
    },
    ingredients: ["Moong Dal", "Salt", "Extra Black Pepper", "Spicy Punjabi Masala", "Asafoetida (Hing)", "Cumin Seeds (Jeera)", "Baking Soda / Papad Khar", "Edible Oil", "Water"]
  },
  {
    id: "moong-lasun",
    name: "Moong Lasun Papad",
    hindiName: "मूंग लहसुन पापड़",
    description: "Infused with the aromatic flavor of fresh garlic for a savory delight.",
    image: "/placeholder.svg",
    category: "moong-papad",
    variants: [
      { id: "ml-1", name: "Moong Lasun", subtitle: "Garlic Flavor", price: 132, weight: "200g" },
      { id: "ml-2", name: "Moong Lasun", subtitle: "Garlic Flavor", price: 250, weight: "400g" },
      { id: "ml-3", name: "Moong Lasun", subtitle: "Garlic Flavor", price: 310, weight: "500g" },
      { id: "ml-4", name: "Moong Lasun", subtitle: "Garlic Flavor", price: 600, weight: "1kg" },
    ],
    nutrition: {
      calories: "330-370 Kcal",
      protein: "23-26g",
      carbs: "55-60g",
      fat: "0.5-1.5g",
      fiber: "8-10g",
      sodium: "900-1300mg",
      calcium: "40-70mg",
      iron: "3-5mg",
      garlic: "Fresh Garlic Infusion"
    },
    ingredients: ["Moong Dal", "Fresh Garlic", "Salt", "Black Pepper", "Asafoetida (Hing)", "Cumin Seeds (Jeera)", "Baking Soda / Papad Khar", "Edible Oil", "Water"]
  },
  {
    id: "moong-sindhi",
    name: "Moong Sindhi Papad",
    hindiName: "मूंग सिंधी पापड़",
    description: "Traditional Sindhi recipe with a unique mix of digestive spices.",
    image: "/placeholder.svg",
    category: "moong-papad",
    variants: [
      { id: "msi-1", name: "Moong Sindhi", subtitle: "Sindhi Special", price: 120, weight: "200g" },
      { id: "msi-2", name: "Moong Sindhi", subtitle: "Sindhi Special", price: 230, weight: "400g" },
      { id: "msi-3", name: "Moong Sindhi", subtitle: "Sindhi Special", price: 280, weight: "500g" },
      { id: "msi-4", name: "Moong Sindhi", subtitle: "Sindhi Special", price: 540, weight: "1kg" },
    ],
    ingredients: ["Moong Dal", "Sindhi Spice Blend", "Salt", "Black Pepper", "Asafoetida (Hing)", "Cumin Seeds (Jeera)", "Baking Soda / Papad Khar", "Edible Oil", "Water"]
  },
  {
    id: "moong-urad",
    name: "Moong Urad Papad",
    hindiName: "मूंग उड़द पापड़",
    description: "Balanced blend of moong and urad dal for the perfect texture.",
    image: "/placeholder.svg",
    category: "moong-papad",
    variants: [
      { id: "mu-1", name: "Moong Urad", subtitle: "Mixed Dal", price: 120, weight: "200g" },
      { id: "mu-2", name: "Moong Urad", subtitle: "Mixed Dal", price: 230, weight: "400g" },
      { id: "mu-3", name: "Moong Urad", subtitle: "Mixed Dal", price: 280, weight: "500g" },
      { id: "mu-4", name: "Moong Urad", subtitle: "Mixed Dal", price: 540, weight: "1kg" },
    ],
    ingredients: ["Moong Dal", "Urad Dal", "Salt", "Black Pepper", "Asafoetida (Hing)", "Cumin Seeds (Jeera)", "Baking Soda / Papad Khar", "Edible Oil", "Water"]
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
      { id: "cm-1", name: "Chana Masala", subtitle: "Spiced Chickpea", price: 132, weight: "200g" },
      { id: "cm-2", name: "Chana Masala", subtitle: "Spiced Chickpea", price: 250, weight: "400g" },
      { id: "cm-3", name: "Chana Masala", subtitle: "Spiced Chickpea", price: 310, weight: "500g" },
      { id: "cm-4", name: "Chana Masala", subtitle: "Spiced Chickpea", price: 600, weight: "1kg" },
    ],
    nutrition: {
      calories: "360-400 Kcal",
      protein: "18-22g",
      carbs: "55-60g",
      fat: "2-5g",
      fiber: "10-12g",
      sodium: "900-1400mg",
      calcium: "40-70mg",
      iron: "4-6mg"
    },
    ingredients: ["Chana Dal Flour (Besan)", "Salt", "Red Chilli Powder", "Black Pepper", "Cumin Seeds (Jeera)", "Asafoetida (Hing)", "Papad Khar / Baking Soda", "Edible Oil", "Water"]
  },
  {
    id: "chana-lasun",
    name: "Chana Lasun Papad",
    hindiName: "चना लहसुन पापड़",
    description: "Hearty chana dal papad with a punchy garlic aroma.",
    image: "/placeholder.svg",
    category: "chana-papad",
    variants: [
      { id: "cl-1", name: "Chana Lasun", subtitle: "Garlic Chickpea", price: 132, weight: "200g" },
      { id: "cl-2", name: "Chana Lasun", subtitle: "Garlic Chickpea", price: 250, weight: "400g" },
      { id: "cl-3", name: "Chana Lasun", subtitle: "Garlic Chickpea", price: 310, weight: "500g" },
      { id: "cl-4", name: "Chana Lasun", subtitle: "Garlic Chickpea", price: 600, weight: "1kg" },
    ],
    nutrition: {
      calories: "360-400 Kcal",
      protein: "18-22g",
      carbs: "55-60g",
      fat: "2-5g",
      fiber: "10-12g",
      sodium: "900-1400mg",
      calcium: "40-70mg",
      iron: "4-6mg",
      garlic: "Fresh Garlic Infusion"
    },
    ingredients: ["Chana Dal Flour (Besan)", "Fresh Garlic", "Salt", "Red Chilli Powder", "Black Pepper", "Cumin Seeds (Jeera)", "Asafoetida (Hing)", "Papad Khar / Baking Soda", "Edible Oil", "Water"]
  },
  {
    id: "chana-methi",
    name: "Chana Methi Papad",
    hindiName: "चना मेथी पापड़",
    description: "Healthy and flavorful papad with the goodness of dried fenugreek leaves.",
    image: "/placeholder.svg",
    category: "chana-papad",
    variants: [
      { id: "cmt-1", name: "Chana Methi", subtitle: "Fenugreek Chickpea", price: 132, weight: "200g" },
      { id: "cmt-2", name: "Chana Methi", subtitle: "Fenugreek Chickpea", price: 250, weight: "400g" },
      { id: "cmt-3", name: "Chana Methi", subtitle: "Fenugreek Chickpea", price: 310, weight: "500g" },
      { id: "cmt-4", name: "Chana Methi", subtitle: "Fenugreek Chickpea", price: 600, weight: "1kg" },
    ],
    ingredients: ["Chana Dal Flour (Besan)", "Dried Fenugreek Leaves (Methi)", "Salt", "Red Chilli Powder", "Black Pepper", "Cumin Seeds (Jeera)", "Asafoetida (Hing)", "Papad Khar / Baking Soda", "Edible Oil", "Water"]
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
      { id: "cmth-3", name: "Chana Metha", subtitle: "Traditional Chickpea", price: 220, weight: "500g" },
      { id: "cmth-4", name: "Chana Metha", subtitle: "Traditional Chickpea", price: 420, weight: "1kg" },
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
      { id: "mk-1", name: "Makka Keeche", subtitle: "Maize Variety", price: 132, weight: "250g" },
      { id: "mk-2", name: "Makka Keeche", subtitle: "Maize Variety", price: 250, weight: "500g" },
      { id: "mk-3", name: "Makka Keeche", subtitle: "Maize Variety", price: 480, weight: "1kg" },
    ],
    nutrition: {
      calories: "340-360 Kcal",
      protein: "8-10g",
      carbs: "70-75g",
      fat: "1-2g",
      fiber: "5-7g",
      sodium: "800-1100mg",
      calcium: "10-20mg",
      iron: "2-3mg"
    },
    ingredients: ["Maize Flour (Makki Aata)", "Salt", "Papad Khar", "Water", "Traditional Spices"]
  },
  {
    id: "chawal-keeche",
    name: "Chawal Papad (Keeche)",
    hindiName: "चावल खींचे पापड़",
    description: "Light and airy rice papad, melts in your mouth.",
    image: "/placeholder.svg",
    category: "keeche-papad",
    variants: [
      { id: "ck-1", name: "Chawal Keeche", subtitle: "Rice Variety", price: 120, weight: "250g" },
      { id: "ck-2", name: "Chawal Keeche", subtitle: "Rice Variety", price: 230, weight: "500g" },
      { id: "ck-3", name: "Chawal Keeche", subtitle: "Rice Variety", price: 430, weight: "1kg" },
    ],
    ingredients: ["Rice Flour (Chawal Aata)", "Salt", "Papad Khar", "Water", "Traditional Spices"]
  },
  {
    id: "jawar-keeche",
    name: "Jawar Papad (Keeche)",
    hindiName: "ज्वार खींचे पापड़",
    description: "Nutritious sorghum papad with a distinct traditional taste.",
    image: "/placeholder.svg",
    category: "keeche-papad",
    variants: [
      { id: "jk-1", name: "Jawar Keeche", subtitle: "Sorghum Variety", price: 132, weight: "250g" },
      { id: "jk-2", name: "Jawar Keeche", subtitle: "Sorghum Variety", price: 250, weight: "500g" },
      { id: "jk-3", name: "Jawar Keeche", subtitle: "Sorghum Variety", price: 480, weight: "1kg" },
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
      { id: "mdk-3", name: "Maida Keeche", subtitle: "Refined Flour", price: 340, weight: "1kg" },
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
      { id: "mb-1", name: "Moong Badi", subtitle: "Green Gram Nuggets", price: 120, weight: "200g" },
      { id: "mb-2", name: "Moong Badi", subtitle: "Green Gram Nuggets", price: 230, weight: "400g" },
      { id: "mb-3", name: "Moong Badi", subtitle: "Green Gram Nuggets", price: 280, weight: "500g" },
      { id: "mb-4", name: "Moong Badi", subtitle: "Green Gram Nuggets", price: 540, weight: "1kg" },
    ],
    nutrition: {
      calories: "340-360 Kcal",
      protein: "22-24g",
      carbs: "50-55g",
      fat: "1-2g",
      fiber: "10-12g",
      sodium: "20-40mg",
      calcium: "60-80mg",
      iron: "4-6mg"
    },
    ingredients: ["Moong Dal", "Ginger", "Green Chilli", "Salt", "Turmeric Powder", "Asafoetida (Hing)", "Cumin Seeds", "Water"]
  },
  {
    id: "urad-badi",
    name: "Urad Badi",
    hindiName: "उड़द बड़ी",
    description: "High-protein black gram nuggets with a rich, savory taste.",
    image: "/placeholder.svg",
    category: "badi",
    variants: [
      { id: "ub-1", name: "Urad Badi", subtitle: "Black Gram Nuggets", price: 100, weight: "200g" },
      { id: "ub-2", name: "Urad Badi", subtitle: "Black Gram Nuggets", price: 190, weight: "400g" },
      { id: "ub-3", name: "Urad Badi", subtitle: "Black Gram Nuggets", price: 240, weight: "500g" },
      { id: "ub-4", name: "Urad Badi", subtitle: "Black Gram Nuggets", price: 460, weight: "1kg" },
    ],
    ingredients: ["Urad Dal", "Ginger", "Green Chilli", "Salt", "Traditional Spice Blend", "Water"]
  },
  {
    id: "chawla-badi",
    name: "Chawla Badi",
    hindiName: "चावला बड़ी",
    description: "Traditional cowpea nuggets, light and easy to digest.",
    image: "/placeholder.svg",
    category: "badi",
    variants: [
      { id: "cb-1", name: "Chawla Badi", subtitle: "Cowpea Nuggets", price: 100, weight: "200g" },
      { id: "cb-2", name: "Chawla Badi", subtitle: "Cowpea Nuggets", price: 190, weight: "400g" },
      { id: "cb-3", name: "Chawla Badi", subtitle: "Cowpea Nuggets", price: 240, weight: "500g" },
      { id: "cb-4", name: "Chawla Badi", subtitle: "Cowpea Nuggets", price: 460, weight: "1kg" },
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
      { id: "as-1", name: "Aata Sewaiya", subtitle: "Whole Wheat", price: 72, weight: "250g" },
      { id: "as-2", name: "Aata Sewaiya", subtitle: "Whole Wheat", price: 132, weight: "500g" },
      { id: "as-3", name: "Aata Sewaiya", subtitle: "Whole Wheat", price: 240, weight: "1kg" },
    ],
    nutrition: {
      calories: "340-360 Kcal",
      protein: "10-12g",
      carbs: "70-75g",
      fat: "1-2g",
      fiber: "5-7g",
      sodium: "10-20mg",
      calcium: "20-30mg",
      iron: "3-4mg"
    },
    ingredients: ["Whole Wheat Flour (Aata)", "Water", "Salt"]
  },
  {
    id: "maida-sewaiya",
    name: "Maida Sewaiya",
    hindiName: "मैदा सेवइयां",
    description: "Fine refined flour vermicelli, ideal for sweet kheer.",
    image: "/placeholder.svg",
    category: "sewaiya",
    variants: [
      { id: "msw-1", name: "Maida Sewaiya", subtitle: "Refined Flour", price: 66, weight: "250g" },
      { id: "msw-2", name: "Maida Sewaiya", subtitle: "Refined Flour", price: 120, weight: "500g" },
      { id: "msw-3", name: "Maida Sewaiya", subtitle: "Refined Flour", price: 228, weight: "1kg" },
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
      { id: "ss-1", name: "Suji Sewaiya", subtitle: "Semolina", price: 78, weight: "250g" },
      { id: "ss-2", name: "Suji Sewaiya", subtitle: "Semolina", price: 144, weight: "500g" },
      { id: "ss-3", name: "Suji Sewaiya", subtitle: "Semolina", price: 276, weight: "1kg" },
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
      { id: "ckr-1", name: "Chawal Kurlai", subtitle: "Rice Fryums", price: 84, weight: "200g" },
      { id: "ckr-2", name: "Chawal Kurlai", subtitle: "Rice Fryums", price: 156, weight: "400g" },
      { id: "ckr-3", name: "Chawal Kurlai", subtitle: "Rice Fryums", price: 192, weight: "500g" },
      { id: "ckr-4", name: "Chawal Kurlai", subtitle: "Rice Fryums", price: 360, weight: "1kg" },
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
      { id: "mkr-1", name: "Maida Kurlai", subtitle: "Maida Fryums", price: 78, weight: "200g" },
      { id: "mkr-2", name: "Maida Kurlai", subtitle: "Maida Fryums", price: 144, weight: "400g" },
      { id: "mkr-3", name: "Maida Kurlai", subtitle: "Maida Fryums", price: 180, weight: "500g" },
      { id: "mkr-4", name: "Maida Kurlai", subtitle: "Maida Fryums", price: 336, weight: "1kg" },
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
      { id: "mkk-3", name: "Makka Kurlai", subtitle: "Maize Fryums", price: 170, weight: "500g" },
      { id: "mkk-4", name: "Makka Kurlai", subtitle: "Maize Fryums", price: 320, weight: "1kg" },
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
      { id: "ps-1", name: "Pumpkin Seeds", subtitle: "Raw & Natural", price: 180, weight: "100g" },
      { id: "ps-2", name: "Pumpkin Seeds", subtitle: "Raw & Natural", price: 340, weight: "200g" },
      { id: "ps-3", name: "Pumpkin Seeds", subtitle: "Raw & Natural", price: 780, weight: "500g" },
      { id: "ps-4", name: "Pumpkin Seeds", subtitle: "Raw & Natural", price: 1440, weight: "1kg" },
    ],
    nutrition: {
      calories: "550-590 Kcal",
      protein: "25-30g",
      carbs: "10-15g",
      fat: "45-50g",
      fiber: "6-8g",
      sodium: "5-15mg",
      calcium: "40-60mg",
      iron: "8-10mg"
    },
    ingredients: ["100% Raw Pumpkin Seeds"]
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
      { id: "sf-3", name: "Sunflower Seeds", subtitle: "Premium Quality", price: 500, weight: "500g" },
      { id: "sf-4", name: "Sunflower Seeds", subtitle: "Premium Quality", price: 950, weight: "1kg" },
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
      { id: "sb-3", name: "Sabja Seeds", subtitle: "Natural Cooler", price: 350, weight: "500g" },
      { id: "sb-4", name: "Sabja Seeds", subtitle: "Natural Cooler", price: 650, weight: "1kg" },
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
      { id: "cs-3", name: "Chia Seeds", subtitle: "Superfood", price: 600, weight: "500g" },
      { id: "cs-4", name: "Chia Seeds", subtitle: "Superfood", price: 1100, weight: "1kg" },
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
      { id: "ws-3", name: "Watermelon Kernels", subtitle: "Nutty Kernels", price: 450, weight: "500g" },
      { id: "ws-4", name: "Watermelon Kernels", subtitle: "Nutty Kernels", price: 850, weight: "1kg" },
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
