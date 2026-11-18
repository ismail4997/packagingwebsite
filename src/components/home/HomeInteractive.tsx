"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { categories, mainCategories } from "@/lib/data/catalog";
import { industries } from "@/lib/data/industries";
import { faqs, studies } from "@/lib/data/content";
import { materials } from "@/lib/data/materials";
import { categoryPhoto, productPhoto } from "@/lib/data/photos";
import { ProductPhoto } from "@/components/visual/ProductPhoto";
import { PackShot } from "@/components/visual/PackShot";

const PackPreview = dynamic(
  () => import("@/components/studio/PackPreview").then((mod) => mod.PackPreview),
  { ssr: false, loading: () => <div className="grid h-full place-items-center text-sm text-ink-soft">Preparing the preview…</div> },
);

const heroOptions: { id: string; label: string; text: string; href: string; photo: string }[] = [
  { id: "box", label: "Box", text: "A lid box, made to the size you send.", href: "/products/lid-boxes", photo: "/packaging/real-box-yellow.jpg" },
  { id: "bag", label: "Bag", text: "A paper bag for the counter or a delivery.", href: "/products/shopping-bags", photo: "/packaging/kraft-bag.jpg" },
  { id: "pouch", label: "Pouch", text: "A stand-up pouch for snacks, tea, or spices.", href: "/products/food-packaging/stand-up-pouch", photo: "/packaging/pouch-green.jpg" },
];

export function HeroStage() {
  const [activeId, setActiveId] = useState(heroOptions[0].id);
  const active = heroOptions.find((option) => option.id === activeId) ?? heroOptions[0];
  const others = heroOptions.filter((option) => option.id !== active.id);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1.4fr_0.85fr] sm:grid-rows-2 sm:gap-4" role="tablist" aria-label="Box, bag, or pouch">
        <button
          type="button"
          role="tab"
          aria-selected="true"
          className="group relative col-span-2 aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:h-[32rem]"
          onClick={() => setActiveId(active.id)}
        >
          <ProductPhoto src={active.photo} alt="" className="absolute inset-0 h-full transition duration-500 group-hover:scale-[1.03]" />
          <span className="absolute bottom-4 left-4 rounded-full bg-[#f7f3ec]/95 px-3.5 py-1.5 text-sm font-medium text-ink shadow-sm">{active.label}</span>
        </button>
        {others.map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected="false"
            className="group relative aspect-square overflow-hidden rounded-[1.35rem] sm:aspect-auto sm:h-[15.25rem]"
            onClick={() => setActiveId(option.id)}
          >
            <ProductPhoto src={option.photo} alt="" className="absolute inset-0 h-full transition duration-500 group-hover:scale-[1.04]" />
            <span className="absolute bottom-3 left-3 rounded-full bg-[#f7f3ec]/95 px-3 py-1 text-sm font-medium text-ink shadow-sm">{option.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">{active.text}</p>
        <Link href={active.href} className="shrink-0 text-sm font-medium underline decoration-ink/25 underline-offset-4">
          Open
        </Link>
      </div>
    </div>
  );
}

export function ShopCategories() {
  const items = mainCategories();
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <Link key={item.slug} href={`/products/${item.slug}`} className="panel overflow-hidden transition hover:-translate-y-0.5">
          <ProductPhoto src={categoryPhoto(item.slug, item.shape, item.material)} alt="" className="h-36 w-full sm:h-44" />
          <span className="block px-3 py-3 text-sm font-medium sm:text-base">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

const shelves = [
  { slug: "food-packaging", label: "Food boxes" },
  { slug: "cosmetics-packaging", label: "Cosmetic boxes" },
] as const;

export function ProductShelf() {
  const [slug, setSlug] = useState<(typeof shelves)[number]["slug"]>("food-packaging");
  const category = categories.find((item) => item.slug === slug) ?? categories[0];
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Box types">
        {shelves.map((shelf) => (
          <button
            key={shelf.slug}
            type="button"
            role="tab"
            aria-selected={shelf.slug === slug}
            className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${shelf.slug === slug ? "bg-ink text-foam" : "bg-paper-deep"}`}
            onClick={() => setSlug(shelf.slug)}
          >
            {shelf.label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {category.products.map((item) => (
          <Link key={item.slug} href={`/products/${category.slug}/${item.slug}`} className="panel overflow-hidden">
            <ProductPhoto src={productPhoto(item.slug, item.shape, item.material)} alt="" className="h-36 w-full sm:h-44" />
            <span className="block px-3 pt-3 text-sm font-medium sm:text-base">{item.name}</span>
            <span className="block px-3 pt-1 pb-3 text-xs leading-5 text-ink-soft">{item.summary}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CategoryIndex() {
  const [active, setActive] = useState(categories[0].slug);
  const category = categories.find((item) => item.slug === active) ?? categories[0];
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <ul className="divide-y divide-ink/10 border-y border-ink/10">
        {categories.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/products/${item.slug}`}
              className="group flex items-baseline justify-between gap-4 py-4"
              onMouseEnter={() => setActive(item.slug)}
              onFocus={() => setActive(item.slug)}
            >
              <span className="font-serif text-2xl tracking-[-0.03em] group-hover:text-press sm:text-3xl">{item.name}</span>
              <span className="hidden text-sm text-ink-soft sm:inline">{item.short}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="panel hidden p-4 lg:block">
        <ProductPhoto src={categoryPhoto(category.slug, category.shape, category.material)} alt={category.name} className="h-72 w-full" />
        <p className="mt-3 text-sm leading-6 text-ink-soft">{category.short}</p>
      </div>
    </div>
  );
}

export function HomePreview() {
  const [pack, setPack] = useState("folding-carton");
  const [materialId, setMaterialId] = useState("bleach-card");
  const [finish, setFinish] = useState("matte");
  const kind = pack === "shopping-bag" ? "bag" : pack === "labels" ? "flat" : "box";
  const query = new URLSearchParams({ pack, material: materialId, color: "#234c38", finish });
  return (
    <div className="panel overflow-hidden lg:grid lg:grid-cols-2">
      <div className="h-[340px] sm:h-[420px]">
        <PackPreview
          config={{
            kind,
            materialId,
            brandColor: "#234c38",
            length: kind === "bag" ? 320 : kind === "flat" ? 90 : 180,
            width: kind === "bag" ? 120 : kind === "flat" ? 50 : 80,
            height: kind === "flat" ? 8 : kind === "bag" ? 400 : 220,
            finishing: [finish],
            label: "Interactive packaging preview",
          }}
        />
      </div>
      <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
        <div>
          <p className="kicker">Try it</p>
          <h3 className="display mt-3 text-4xl">Turn the box. Change the colour.</h3>
          <p className="mt-4 text-sm leading-6 text-ink-soft">
            Drag to spin it. Pick a material and a finish. When it looks right, continue and ask for a quote.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {[
              ["folding-carton", "Carton"],
              ["shopping-bag", "Bag"],
              ["labels", "Label"],
            ].map(([id, label]) => (
              <button key={id} type="button" className={`rounded-full px-3 py-1.5 text-sm ${pack === id ? "bg-ink text-foam" : "bg-paper-deep"}`} onClick={() => setPack(id)}>
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {materials.slice(0, 4).map((item) => (
              <button key={item.id} type="button" className={`rounded-full px-3 py-1.5 text-sm ${materialId === item.id ? "bg-ink text-foam" : "bg-paper-deep"}`} onClick={() => setMaterialId(item.id)}>
                {item.short}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["matte", "Matte"],
              ["gloss", "Gloss"],
              ["foil", "Foil"],
              ["die-cut", "Window"],
            ].map(([id, label]) => (
              <button key={id} type="button" className={`rounded-full px-3 py-1.5 text-sm ${finish === id ? "bg-ink text-foam" : "bg-paper-deep"}`} onClick={() => setFinish(id)}>
                {label}
              </button>
            ))}
          </div>
          <Link href={`/studio?${query.toString()}`} className="btn btn-press mt-2">
            Continue and get a quote
          </Link>
        </div>
      </div>
    </div>
  );
}

export function IndustrySwitch() {
  const [slug, setSlug] = useState(industries[0].slug);
  const industry = industries.find((item) => item.slug === slug) ?? industries[0];
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible" role="tablist" aria-label="Industries">
        {industries.map((item) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={item.slug === slug}
            className={`rounded-full px-4 py-2 text-left text-sm whitespace-nowrap lg:rounded-2xl lg:whitespace-normal ${item.slug === slug ? "bg-ink text-foam" : "bg-foam"}`}
            onClick={() => setSlug(item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="panel p-6 sm:p-8">
        <p className="kicker">{industry.kicker}</p>
        <h3 className="display mt-3 text-4xl">{industry.name}</h3>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">{industry.summary}</p>
        <Link href={`/industries/${industry.slug}`} className="btn btn-ghost mt-6">
          See the {industry.name.toLowerCase()} brief
        </Link>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const study = studies[0];
  const [value, setValue] = useState(58);
  return (
    <div>
      <div className="relative h-[380px] overflow-hidden rounded-[1.75rem] bg-paper-deep">
        <PackShot shape="bakery" material="kraft" brand="#8d6a3f" decorative className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <PackShot shape="bakery" material="bleach-card" brand="#c4452d" windowed decorative className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-ink" style={{ left: `${value}%` }} />
      </div>
      <label className="mt-4 block text-sm" htmlFor="compare">
        Drag to compare a plain carton and a printed one
        <input
          id="compare"
          className="mt-2 w-full accent-[#c4452d]"
          type="range"
          min={8}
          max={92}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </label>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{study.lesson}</p>
    </div>
  );
}

export function FaqList() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {faqs.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span className="font-serif text-2xl tracking-[-0.03em]">{item.question}</span>
              <span aria-hidden className="text-xl">{expanded ? "–" : "+"}</span>
            </button>
            {expanded ? <p className="max-w-3xl pb-5 text-sm leading-7 text-ink-soft">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
