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
  category: "papad" | "sevaiyan" | "papadi";
  variants: ProductVariant[];
  tag?: string;
}

export const products: Product[] = [
  // PAPAD
  {
    id: "papad-urad",
    name: "Classic Urad Dal Papad",
    hindiName: "उड़द दाल पापड़",
    description: "Traditional black gram papads, crispy & light — a timeless Indian staple.",
    image: "/placeholder.svg",
    category: "papad",
    tag: "Bestseller",
    variants: [
      { id: "p-u-1", name: "Classic Urad Dal", subtitle: "Black Gram", price: 80, weight: "200g" },
      { id: "p-u-2", name: "Classic Urad Dal", subtitle: "Black Gram", price: 150, weight: "400g" },
    ],
  },
  {
    id: "papad-moong",
    name: "Moong Dal Papad",
    hindiName: "मूंग दाल पापड़",
    description: "Light & delicate green gram papads, perfect with meals or as a crispy snack.",
    image: "/placeholder.svg",
    category: "papad",
    variants: [
      { id: "p-m-1", name: "Moong Dal", subtitle: "Green Gram", price: 85, weight: "200g" },
      { id: "p-m-2", name: "Moong Dal", subtitle: "Green Gram", price: 160, weight: "400g" },
    ],
  },
  {
    id: "papad-chana",
    name: "Chana Dal Papad",
    hindiName: "चना दाल पापड़",
    description: "Protein-rich chickpea papads with a robust earthy flavour.",
    image: "/placeholder.svg",
    category: "papad",
    variants: [
      { id: "p-c-1", name: "Chana", subtitle: "Chickpea", price: 90, weight: "200g" },
      { id: "p-c-2", name: "Chana", subtitle: "Chickpea", price: 170, weight: "400g" },
    ],
  },
  {
    id: "papad-sabudana",
    name: "Sabudana Papad",
    hindiName: "साबूदाना पापड़",
    description: "Crunchy tapioca papads — a festive fasting favourite.",
    image: "/placeholder.svg",
    category: "papad",
    tag: "Festive",
    variants: [
      { id: "p-s-1", name: "Sabudana", subtitle: "Tapioca", price: 95, weight: "200g" },
      { id: "p-s-2", name: "Sabudana", subtitle: "Tapioca", price: 180, weight: "400g" },
    ],
  },
  // SEVAIYAN
  {
    id: "sevaiyan-moong",
    name: "Moong Badi Sevaiyan",
    hindiName: "मूंग बड़ी सेवइयां",
    description: "Thick moong dal vermicelli, ideal for kheer, upma, and savory dishes.",
    image: "/placeholder.svg",
    category: "sevaiyan",
    tag: "Popular",
    variants: [
      { id: "s-m-1", name: "Moong Badi Sevaiyan", subtitle: "Thick Vermicelli", price: 70, weight: "200g" },
      { id: "s-m-2", name: "Moong Badi Sevaiyan", subtitle: "Thick Vermicelli", price: 130, weight: "400g" },
    ],
  },
  {
    id: "sevaiyan-mehandi",
    name: "Mehandi ki Sevaiyan",
    hindiName: "मेहंदी की सेवइयां",
    description: "Fine and aromatic vermicelli with a unique traditional taste.",
    image: "/placeholder.svg",
    category: "sevaiyan",
    variants: [
      { id: "s-h-1", name: "Mehandi Sevaiyan", subtitle: "Fine Vermicelli", price: 75, weight: "200g" },
      { id: "s-h-2", name: "Mehandi Sevaiyan", subtitle: "Fine Vermicelli", price: 140, weight: "400g" },
    ],
  },
  // PAPADI
  {
    id: "papadi-makke-chawal",
    name: "Jawahar Makke Chawal Papadi",
    hindiName: "जवाहर मक्के चावल पापड़ी",
    description: "Special maize & rice papadi with a satisfying crunch.",
    image: "/placeholder.svg",
    category: "papadi",
    tag: "Special",
    variants: [
      { id: "pa-mk-1", name: "Makke Chawal", subtitle: "Maize & Rice", price: 100, weight: "250g" },
      { id: "pa-mk-2", name: "Makke Chawal", subtitle: "Maize & Rice", price: 190, weight: "500g" },
    ],
  },
  {
    id: "papadi-urad",
    name: "Urad Dal Papadi",
    hindiName: "उड़द दाल पापड़ी",
    description: "Classic black gram papadi, crispy and addictive.",
    image: "/placeholder.svg",
    category: "papadi",
    variants: [
      { id: "pa-u-1", name: "Urad Dal", subtitle: "Black Gram", price: 90, weight: "250g" },
      { id: "pa-u-2", name: "Urad Dal", subtitle: "Black Gram", price: 170, weight: "500g" },
    ],
  },
  {
    id: "papadi-moong",
    name: "Moong Dal Papadi",
    hindiName: "मूंग दाल पापड़ी",
    description: "Light green gram papadi, perfect for chaats and snacking.",
    image: "/placeholder.svg",
    category: "papadi",
    variants: [
      { id: "pa-m-1", name: "Moong Dal", subtitle: "Green Gram", price: 95, weight: "250g" },
      { id: "pa-m-2", name: "Moong Dal", subtitle: "Green Gram", price: 180, weight: "500g" },
    ],
  },
  {
    id: "papadi-chana",
    name: "Chana Papadi",
    hindiName: "चना पापड़ी",
    description: "Protein-rich chickpea papadi with a hearty taste.",
    image: "/placeholder.svg",
    category: "papadi",
    variants: [
      { id: "pa-c-1", name: "Chana", subtitle: "Chickpea", price: 100, weight: "250g" },
      { id: "pa-c-2", name: "Chana", subtitle: "Chickpea", price: 190, weight: "500g" },
    ],
  },
];

export const categoryMeta = {
  papad: {
    label: "Papad",
    hindiLabel: "पापड़",
    description: "Sun-dried & handcrafted papads in authentic flavours",
  },
  sevaiyan: {
    label: "Sevaiyan",
    hindiLabel: "सेवइयां",
    description: "Traditional vermicelli for every occasion",
  },
  papadi: {
    label: "Papadi",
    hindiLabel: "पापड़ी",
    description: "Crispy papadi perfect for chaats & snacking",
  },
};
