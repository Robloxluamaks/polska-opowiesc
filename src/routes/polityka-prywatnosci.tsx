import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/polityka-prywatnosci")({
  head: () => ({
    meta: [
      { title: "Polityka prywatności — BANG BLAZE" },
      { name: "description", content: "Polityka prywatności — BANG BLAZE." },
      { property: "og:title", content: "Polityka prywatności — BANG BLAZE" },
      { property: "og:description", content: "Polityka prywatności — BANG BLAZE." },
    ],
  }),
  component: () => (
    <Page title="Polityka prywatności">
      <p>Treść polityki prywatności zostanie uzupełniona. Strona zapisuje w przeglądarce jedynie potwierdzenie pełnoletności.</p>
    </Page>
  ),
});
