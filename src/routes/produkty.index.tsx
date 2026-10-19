import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { products } from "@/lib/products";

export const Route = createFileRoute("/produkty/")({
  head: () => ({
    meta: [
      { title: "Produkty — BANG BLAZE" },
      { name: "description", content: "Kolekcja produktów BANG BLAZE. Tylko dla osób pełnoletnich." },
      { property: "og:title", content: "Produkty — BANG BLAZE" },
      { property: "og:description", content: "Kolekcja produktów BANG BLAZE." },
    ],
  }),
  component: Products,
});

function Products() {
  const [color, setColor] = useState("wszystkie");
  const [sort, setSort] = useState("az");
  const list = products
    .filter((p) => color === "wszystkie" || p.color === color)
    .sort((a, b) => (sort === "az" ? 1 : -1) * a.name.localeCompare(b.name));
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-6xl">Kolekcja</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <select aria-label="Filtruj kolor" value={color} onChange={(e) => setColor(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2">
            <option value="wszystkie">Wszystkie kolory</option>
            <option value="niebieski">Niebieski</option>
            <option value="różowy">Różowy</option>
          </select>
          <select aria-label="Sortuj" value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2">
            <option value="az">Nazwa A–Z</option>
            <option value="za">Nazwa Z–A</option>
          </select>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.id} to="/produkty/$id" params={{ id: p.id }} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:glow">
              <img src={p.image} alt={p.name} width={1024} height={1280} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-6">
                <h2 className="text-2xl">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <span className="mt-4 inline-block font-bold text-primary">Szczegóły →</span>
              </div>
            </Link>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">Brak produktów dla wybranych filtrów.</p>}
        </div>
      </section>
    </Layout>
  );
}
