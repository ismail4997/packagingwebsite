"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product, ProductFamily } from "@/lib/data/catalog";
import { productPhoto } from "@/lib/data/photos";
import { ProductPhoto } from "@/components/visual/ProductPhoto";

const looks = [
  { id: "all", label: "All" },
  { id: "white", label: "White card" },
  { id: "kraft", label: "Kraft" },
  { id: "window", label: "With window" },
] as const;

const foodFamilies = [
  { id: "all", label: "All types" },
  { id: "meals", label: "Meals" },
  { id: "cakes", label: "Cakes" },
  { id: "cupcakes", label: "Cupcakes" },
  { id: "donuts", label: "Donuts" },
  { id: "pastries", label: "Pastries" },
  { id: "sweets", label: "Mithai and gifting" },
  { id: "snacks", label: "Snacks and pouches" },
  { id: "carry", label: "Bags and boards" },
] as const;

const foodFamilySections: { id: ProductFamily; title: string }[] = [
  { id: "meals", title: "Meals and delivery" },
  { id: "snacks", title: "Snacks and pouches" },
  { id: "cakes", title: "Cake boxes" },
  { id: "cupcakes", title: "Cupcake boxes" },
  { id: "donuts", title: "Donut boxes" },
  { id: "pastries", title: "Pastries and slices" },
  { id: "sweets", title: "Mithai and wedding favours" },
  { id: "carry", title: "Bags and cake boards" },
];

function matchesLook(item: Product, look: (typeof looks)[number]["id"]) {
  if (look === "white") return item.material === "bleach-card" || item.material === "art-paper" || item.material === "duplex";
  if (look === "kraft") return item.material === "kraft";
  if (look === "window") return Boolean(item.window) || item.name.toLowerCase().includes("window");
  return true;
}

function ProductCard({ categorySlug, item }: { categorySlug: string; item: Product }) {
  return (
    <Link href={`/products/${categorySlug}/${item.slug}`} className="panel overflow-hidden">
      <ProductPhoto src={productPhoto(item.slug, item.shape, item.material)} alt="" className="h-40 w-full sm:h-52" />
      <div className="px-3 pt-3 pb-4">
        <h3 className="font-medium">{item.name}</h3>
        {item.fit ? <p className="mt-1 text-xs font-medium text-press">{item.fit}</p> : null}
        <p className="mt-1 text-sm leading-5 text-ink-soft">{item.summary}</p>
      </div>
    </Link>
  );
}

export function PackBrowser({ categorySlug, products }: { categorySlug: string; products: Product[] }) {
  const isFood = categorySlug === "food-packaging";
  const [look, setLook] = useState<(typeof looks)[number]["id"]>("all");
  const [family, setFamily] = useState<(typeof foodFamilies)[number]["id"]>("all");

  const shown = useMemo(() => {
    return products.filter((item) => {
      if (!matchesLook(item, look)) return false;
      if (isFood && family !== "all" && item.family !== family) return false;
      return true;
    });
  }, [family, isFood, look, products]);

  const showGrouped = isFood && family === "all";

  return (
    <div>
      {isFood ? (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Food packaging type">
            {foodFamilies.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={family === item.id}
                className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${family === item.id ? "bg-press text-foam" : "bg-paper-deep"}`}
                onClick={() => setFamily(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
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
        </div>
      ) : (
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
      )}

      {showGrouped ? (
        <div className="mt-5 space-y-10">
          {foodFamilySections.map((section) => {
            const items = shown.filter((item) => item.family === section.id);
            if (items.length === 0) return null;
            return (
              <div key={section.id}>
                <h3 className="font-serif text-2xl text-ink">{section.title}</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {items.map((item) => (
                    <ProductCard key={item.slug} categorySlug={categorySlug} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {shown.map((item) => (
            <ProductCard key={item.slug} categorySlug={categorySlug} item={item} />
          ))}
        </div>
      )}

      {shown.length === 0 ? <p className="mt-4 text-sm text-ink-soft">Nothing in this filter. Try All.</p> : null}
    </div>
  );
}