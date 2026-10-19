import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — BANG BLAZE" },
      { name: "description", content: "Kontakt — BANG BLAZE." },
      { property: "og:title", content: "Kontakt — BANG BLAZE" },
      { property: "og:description", content: "Kontakt — BANG BLAZE." },
    ],
  }),
  component: () => (
    <Page title="Kontakt">
      <p>Napisz do nas: kontakt@[uzupełnij].pl · Telefon: [uzupełnij] · Adres: [uzupełnij].</p>
    </Page>
  ),
});
