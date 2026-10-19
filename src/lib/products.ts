import duo from "@/assets/hero-duo.png.asset.json";
import grape from "@/assets/grape.png.asset.json";
import cherry from "@/assets/cherry.png.asset.json";
import mixed from "@/assets/mixed-fruit.png.asset.json";

const photos: Record<string, string> = {
  "grape-blueberry-grape": grape.url,
  "cherry-cherry-coke": cherry.url,
  "mixed-fruit-triple-berry": mixed.url,
};

export type Product = { id: string; name: string; flavor: string; image: string; description: string; ice: boolean };

// Smaki i parametry według strony producenta (bangvapes.com). Ceny i dostępność do uzupełnienia.
export const manufacturerSpecs = [
  ["Zaciągnięcia", "do 40 000 (wg producenta)"],
  ["Pojemność liquidu", "40 ml"],
  ["Bateria", "650 mAh, ładowanie USB-C"],
  ["Grzałka", "Podwójna grzałka mesh"],
  ["Smaki", "2 w 1 (dwa smaki w jednym urządzeniu)"],
  ["Moc nikotyny", "0%, 2%, 3%, 5%"],
  ["Styl", "MTL (mouth to lung)"],
] as const;

const flavors = [
  "Watermelon & Strawberry Watermelon",
  "Blueberry Ice & Blueberry Raspberry",
  "Mango Ice & Strawberry Mango",
  "Watermelon & Watermelon Bubblegum",
  "Pineapple Ice & Pineapple Coconut",
  "Mixed Fruit & Triple Berry",
  "Peach Ice & Mango Peach",
  "Cherry & Cherry Coke",
  "Grape & Blueberry Grape",
  "Mint & Blueberry Mint",
  "Black Dragon Ice & Red Bull",
  "Strawberry Ice & Strawberry Kiwi",
  "Tropical Fruits & Triple Watermelon",
  "Sour Mango Pineapple & Lemon Lime",
  "Summer Time & Apple Ice",
  "Rainbow Candy & Arctic Freezing",
  "Raspberry Watermelon & Jieshuang",
  "Lemon Romance & California Cherry",
  "Mango Peach Apricot & White Gummies",
  "Mary’s Dream & Aloe Mango Melon Ice",
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const products: Product[] = flavors.map((f) => ({
  id: slug(f),
  name: "BANG BLAZE 40K",
  flavor: f,
  image: photos[slug(f)] ?? duo.url,
  ice: /ice|mint|arctic/i.test(f),
  description: `Dwa smaki w jednym urządzeniu: ${f.replace(" & ", " oraz ")}.`,
}));
