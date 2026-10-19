import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import mascot from "@/assets/mascot.png";
import product from "@/assets/product.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BANG BLAZE — Wyrazisty design. Charakterystyczny styl." },
      { name: "description", content: "Oficjalna strona marki BANG BLAZE. Poznaj markę z koronowaną małpą. Tylko dla osób 18+." },
      { property: "og:title", content: "BANG BLAZE" },
      { property: "og:description", content: "Wyrazisty design. Charakterystyczny styl." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      <section className="smoke-bg relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <img src={mascot} alt="Maskotka BANG BLAZE — małpa w koronie i okularach" width={1024} height={1024} className="h-32 w-32 animate-floaty" />
            <h1 className="mt-4 text-7xl leading-none sm:text-8xl">
              BANG <span className="text-primary">BLAZE</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">Wyrazisty design. Charakterystyczny styl.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/produkty" className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition hover:scale-105 glow">Zobacz produkty</Link>
              <Link to="/o-marce" className="rounded-full border border-border px-8 py-4 font-bold transition hover:border-primary hover:text-primary">Poznaj markę</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-3xl" />
            <img src={product} alt="BANG BLAZE 40K" width={1024} height={1280} className="relative mx-auto max-h-[560px] rounded-3xl object-cover" />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-3">
        {[
          ["Odważny styl", "Czerń, żółć i neonowe akcenty."],
          ["Ikoniczna maskotka", "Małpa w koronie — król ulicy."],
          ["Tylko 18+", "Treści wyłącznie dla pełnoletnich."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-primary">
            <h2 className="text-2xl text-primary">{t}</h2>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
