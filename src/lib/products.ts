import product from "@/assets/product.jpg";

export type Product = { id: string; name: string; image: string; description: string; color: "niebieski" | "różowy" };

// Tylko informacje zweryfikowane. Specyfikacje, ceny i dostępność do uzupełnienia przez producenta.
export const products: Product[] = [
  { id: "bang-blaze-40k", name: "BANG BLAZE 40K", image: product, color: "niebieski", description: "Charakterystyczny design z gradientem niebiesko-różowym i złotymi detalami." },
];
