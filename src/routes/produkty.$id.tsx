import { createFileRoute, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { products, manufacturerSpecs } from "@/lib/products";

export const Route = createFileRoute("/produkty/$id")({
  loader: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} ${loaderData.flavor} — BANG BLAZE` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — ${loaderData.flavor}` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Niedostępne — BANG BLAZE" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();
  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <img src={p.image} alt={p.name} width={1024} height={1280} className="w-full rounded-3xl border border-border object-cover" />
        <div>
          <p className="font-bold uppercase tracking-widest text-primary">{p.name}</p>
          <h1 className="mt-2 text-5xl">{p.flavor}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{p.description}</p>
          <div className="mt-8 rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl">Parametry według producenta</h2>
            <dl className="mt-4 divide-y divide-border text-sm">
              {manufacturerSpecs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="mt-6 rounded-3xl border border-primary/40 bg-card p-6">
            <p className="font-bold text-primary">Sprzedaż chwilowo niedostępna</p>
            <p className="mt-2 text-sm text-muted-foreground">Ceny i dostępność zostaną opublikowane po weryfikacji przez producenta.</p>
          </div>
          <div className="mt-6 rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
            <h2 className="text-xl text-foreground">Informacje prawne i producent</h2>
            <p className="mt-2">Producent: Bang Vapes (bangvapes.com)</p>
            <p>Adres producenta: [uzupełnij]</p>
            <p className="mt-2">Produkt przeznaczony wyłącznie dla osób pełnoletnich (18+). Ostrzeżenia zdrowotne wymagane prawem: [uzupełnij].</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
