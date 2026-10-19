import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PriceTag } from "@/components/PriceTag";
import { manufacturerSpecs } from "@/lib/products";
import { useProducts } from "@/lib/data";

export const Route = createFileRoute("/produkty/$id")({
  head: () => ({
    meta: [
      { title: "BANG BLAZE 40K — szczegóły smaku" },
      { name: "description", content: "Szczegóły smaku BANG BLAZE 40K, cena i parametry producenta." },
      { property: "og:title", content: "BANG BLAZE 40K — szczegóły smaku" },
      { property: "og:description", content: "Cena i parametry BANG BLAZE 40K." },
    ],
  }),
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  const { data, isLoading } = useProducts();
  const p = data?.find((x) => x.slug === id);
  if (isLoading) return <Layout><p className="px-4 py-16 text-center text-muted-foreground">Ładowanie…</p></Layout>;
  if (!p)
    return (
      <Layout>
        <div className="px-4 py-24 text-center">
          <h1 className="text-5xl">Nie znaleziono produktu</h1>
          <Link to="/produkty" className="mt-6 inline-block font-bold text-primary">← Wróć do kolekcji</Link>
        </div>
      </Layout>
    );
  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        {p.image_url && <img src={p.image_url} alt={`${p.name} — ${p.flavor}`} width={800} height={800} className="w-full rounded-3xl border border-border object-cover" />}
        <div>
          <p className="font-bold uppercase tracking-widest text-primary">{p.name}</p>
          <h1 className="mt-2 text-5xl">{p.flavor}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{p.description}</p>
          <div className="mt-6"><PriceTag p={p} large /></div>
          <div className="mt-8 rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl">Parametry według producenta</h2>
            <dl className="mt-4 divide-y divide-border text-sm">
              {manufacturerSpecs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="mt-6 rounded-3xl border border-primary/40 bg-card p-6">
            <p className="font-bold text-primary">Zamówienia</p>
            <p className="mt-2 text-sm text-muted-foreground">Sprzedaż online nie jest prowadzona. Skontaktuj się z nami, aby zapytać o dostępność.</p>
            <Link to="/kontakt" className="mt-3 inline-block font-bold text-primary">Kontakt →</Link>
          </div>
          <div className="mt-6 rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
            <h2 className="text-xl text-foreground">Informacje prawne i producent</h2>
            <p className="mt-2">Producent: Bang Vapes (bangvapes.com)</p>
            <p className="mt-2">Produkt zawiera nikotynę, która jest substancją silnie uzależniającą. Przeznaczony wyłącznie dla osób pełnoletnich (18+).</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
