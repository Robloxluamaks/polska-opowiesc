import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import mascot from "@/assets/mascot.png";
import banner from "@/assets/raspberry.png.asset.json";

export const Route = createFileRoute("/o-marce")({
  head: () => ({
    meta: [
      { title: "O marce — BANG BLAZE" },
      { name: "description", content: "Historia marki BANG BLAZE i koronowanej małpy." },
      { property: "og:title", content: "O marce — BANG BLAZE" },
      { property: "og:description", content: "Poznaj tożsamość BANG BLAZE." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="smoke-bg mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <img src={mascot} alt="Maskotka BANG BLAZE" width={1024} height={1024} className="mx-auto w-full max-w-md animate-floaty" />
        <div>
          <h1 className="text-6xl">Król <span className="text-primary">ulicy</span></h1>
          <p className="mt-6 text-lg text-muted-foreground">
            BANG BLAZE to marka zbudowana na odwadze i wyrazistym stylu. Czerń, intensywna żółć i neonowe akcenty tworzą tożsamość, której nie da się pomylić z żadną inną.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Nasza maskotka — małpa w złotej koronie i czarnych okularach — to symbol pewności siebie i miejskiego luzu. Korona mówi o ambicji, okulary o stylu, a uśmiech o tym, że nie bierzemy się zbyt poważnie.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4">
        <img src={banner.url} alt="BANG BLAZE 40K — grafika produktowa" width={800} height={800} loading="lazy" className="w-full rounded-3xl border border-border" />
      </section>
    </Layout>
  );
}
