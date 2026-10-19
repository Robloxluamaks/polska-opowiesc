import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Product = Tables<"products">;

export const productsKey = ["products"] as const;
export const settingsKey = ["settings"] as const;

export function useProducts() {
  return useQuery({
    queryKey: productsKey,
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

export function useSettings() {
  return useQuery({
    queryKey: settingsKey,
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      return Object.fromEntries(data.map((r) => [r.key, r.value])) as Record<string, string>;
    },
  });
}

export const formatPrice = (v: number | null) =>
  v == null ? "—" : `${Number(v).toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} zł`;

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
