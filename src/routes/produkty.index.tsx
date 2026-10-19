import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PriceTag } from "@/components/PriceTag";
import { useProducts } from "@/lib/data";
import flavors from "@/assets/flavors.png.asset.json";

export const Route = createFileRoute("/produkty/")({
  head: () => ({
    meta: [
      { title: "Produkty — BANG BLAZE" },
      { name: "description", content: "Kolekcja smaków BANG BLAZE 40K. Tylko dla osób pełnoletnich." },
      { property: "og:title", content: "Produkty — BANG BLAZE" },
      { property: "og:description", content: "Kolekcja smaków BANG BLAZE 40K." },
    ],
  }),
  component: Products,
});

function Products() {
  const { data = [], isLoading } = useProducts();
  const [kind, setKind] = useState("wszystkie");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("domyslnie");
  const list = data
    .filter((p) => kind === "wszystkie" || (kind === "ice") === p.ice)
    .filter((p) => p.flavor.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) =>
      sort === "az" ? a.flavor.localeCompare(b.flavor)
      : sort === "za" ? b.flavor.localeCompare(a.flavor)
      : sort === "cena-rosnaco" ? Number(a.price_single ?? 0) - Number(b.price_single ?? 0)
      : sort === "cena-malejaco" ? Number(b.price_single ?? 0) - Number(a.price_single ?? 0)
      : a.sort_order - b.sort_order,
    );
  const sel = "rounded-full border border-border bg-card px-4 py-2";
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-6xl">Kolekcja</h1>
        <p className="mt-3 text-muted-foreground">BANG BLAZE 40K — {data.length} kombinacji smaków 2 w 1. Przy zakupie 10+ szt. taniej!</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <input aria-label="Szukaj smaku" placeholder="Szukaj smaku…" value={q} onChange={(e) => setQ(e.target.value)} className={sel} />
          <select aria-label="Filtruj rodzaj" value={kind} onChange={(e) => setKind(e.target.value)} className={sel}>
            <option value="wszystkie">Wszystkie smaki</option>
            <option value="ice">Chłodzące (ice / mint)</option>
            <option value="bez">Bez chłodzenia</option>
          </select>
          <select aria-label="Sortuj" value={sort} onChange={(e) => setSort(e.target.value)} className={sel}>
            <option value="domyslnie">Polecane</option>
            <option value="az">Smak A–Z</option>
            <option value="za">Smak Z–A</option>
            <option value="cena-rosnaco">Cena rosnąco</option>
            <option value="cena-malejaco">Cena malejąco</option>
          </select>
        </div>
        {isLoading && <p className="mt-10 text-muted-foreground">Ładowanie…</p>}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.id} to="/produkty/$id" params={{ id: p.slug }} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary hover:glow">
              {p.image_url && <img src={p.image_url} alt={`${p.name} — ${p.flavor}`} width={800} height={800} loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">{p.name}</p>
                <h2 className="mt-1 text-2xl">{p.flavor}</h2>
                <div className="mt-3"><PriceTag p={p} /></div>
                <span className="mt-4 inline-block font-bold text-primary">Szczegóły →</span>
              </div>
            </Link>
          ))}
          {!isLoading && list.length === 0 && <p className="text-muted-foreground">Brak produktów dla wybranych filtrów.</p>}
        </div>
        <div className="mt-16 overflow-hidden rounded-3xl border border-border">
          <img src={flavors.url} alt="Przegląd smaków BANG BLAZE 40K" width={434} height={700} loading="lazy" className="mx-auto w-full max-w-md" />
        </div>
      </section>
    </Layout>
  );
}
