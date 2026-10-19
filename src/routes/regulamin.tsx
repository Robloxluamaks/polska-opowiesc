import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/regulamin")({
  head: () => ({
    meta: [
      { title: "Regulamin — BANG BLAZE" },
      { name: "description", content: "Regulamin — BANG BLAZE." },
      { property: "og:title", content: "Regulamin — BANG BLAZE" },
      { property: "og:description", content: "Regulamin — BANG BLAZE." },
    ],
  }),
  component: () => (
    <Page title="Regulamin">
      <p>Treść regulaminu zostanie uzupełniona. Strona ma charakter informacyjny i jest przeznaczona wyłącznie dla osób pełnoletnich.</p>
    </Page>
  ),
});
