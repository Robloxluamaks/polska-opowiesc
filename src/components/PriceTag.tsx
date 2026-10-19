import { formatPrice, type Product } from "@/lib/data";

export function PriceTag({ p, large }: { p: Product; large?: boolean }) {
  return (
    <div className={large ? "space-y-1" : "flex flex-wrap items-baseline gap-x-3"}>
      <span className={`font-display text-primary ${large ? "text-5xl" : "text-2xl"}`}>{formatPrice(p.price_single)}</span>
      {p.price_bulk != null && (
        <span className="text-sm text-muted-foreground">
          {formatPrice(p.price_bulk)} / szt. przy {p.bulk_qty}+ szt.
        </span>
      )}
    </div>
  );
}
