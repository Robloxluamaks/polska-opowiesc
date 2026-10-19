import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/dostawa-i-zwroty")({
  head: () => ({
    meta: [
      { title: "Dostawa i zwroty — BANG BLAZE" },
      { name: "description", content: "Dostawa i zwroty — BANG BLAZE." },
      { property: "og:title", content: "Dostawa i zwroty — BANG BLAZE" },
      { property: "og:description", content: "Dostawa i zwroty — BANG BLAZE." },
    ],
  }),
  component: () => (
    <Page title="Dostawa i zwroty">
      <p>Sprzedaż nie jest obecnie prowadzona. Informacje o dostawie i zwrotach pojawią się po jej uruchomieniu.</p>
    </Page>
  ),
});
