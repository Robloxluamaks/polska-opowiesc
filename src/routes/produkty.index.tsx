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
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("az");
  const list = products
    .filter((p) => color === "wszystkie" || (color === "ice") === p.ice)
    .filter((p) => p.flavor.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (sort === "az" ? 1 : -1) * a.flavor.localeCompare(b.flavor));
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-6xl">Kolekcja</h1>
        <p className="mt-3 text-muted-foreground">BANG BLAZE 40K — {products.length} kombinacji smaków 2 w 1.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <input aria-label="Szukaj smaku" placeholder="Szukaj smaku…" value={q} onChange={(e) => setQ(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2" />
          <select aria-label="Filtruj rodzaj" value={color} onChange={(e) => setColor(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2">
            <option value="wszystkie">Wszystkie smaki</option>
            <option value="ice">Chłodzące (ice / mint)</option>
            <option value="bez">Bez chłodzenia</option>
          </select>
          <select aria-label="Sortuj" value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2">
            <option value="az">Smak A–Z</option>
            <option value="za">Smak Z–A</option>
          </select>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.id} to="/produkty/$id" params={{ id: p.id }} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:glow">
              <img src={p.image} alt={`${p.name} — ${p.flavor}`} width={1024} height={1280} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">{p.name}</p>
                <h2 className="mt-1 text-2xl">{p.flavor}</h2>
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
