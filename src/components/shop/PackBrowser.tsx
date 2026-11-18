"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/data/catalog";
import { productPhoto } from "@/lib/data/photos";
import { ProductPhoto } from "@/components/visual/ProductPhoto";

const looks = [
  { id: "all", label: "All" },
  { id: "white", label: "White card" },
  { id: "kraft", label: "Kraft" },
  { id: "window", label: "With window" },
] as const;

export function PackBrowser({ categorySlug, products }: { categorySlug: string; products: Product[] }) {
  const [look, setLook] = useState<(typeof looks)[number]["id"]>("all");
  const shown = useMemo(() => {
    return products.filter((item) => {
      if (look === "white") return item.material === "bleach-card" || item.material === "art-paper" || item.material === "duplex";
      if (look === "kraft") return item.material === "kraft";
      if (look === "window") return Boolean(item.window) || item.name.toLowerCase().includes("window");
      return true;
    });
  }, [look, products]);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Filter boxes">
        {looks.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={look === item.id}
            className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${look === item.id ? "bg-ink text-foam" : "bg-paper-deep"}`}
            onClick={() => setLook(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {shown.map((item) => (
          <Link key={item.slug} href={`/products/${categorySlug}/${item.slug}`} className="panel overflow-hidden">
            <ProductPhoto src={productPhoto(item.slug, item.shape, item.material)} alt="" className="h-40 w-full sm:h-52" />
            <div className="px-3 pt-3 pb-4">
              <h3 className="font-medium">{item.name}</h3>
              {item.fit ? <p className="mt-1 text-xs font-medium text-press">{item.fit}</p> : null}
              <p className="mt-1 text-sm leading-5 text-ink-soft">{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      {shown.length === 0 ? <p className="mt-4 text-sm text-ink-soft">Nothing in this filter. Try All.</p> : null}
    </div>
  );
}
