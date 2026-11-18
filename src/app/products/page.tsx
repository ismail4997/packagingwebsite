import Link from "next/link";
import { mainCategories } from "@/lib/data/catalog";
import { pageMetadata } from "@/lib/site";
import { categoryPhoto } from "@/lib/data/photos";
import { ProductPhoto } from "@/components/visual/ProductPhoto";

export const metadata = pageMetadata({
  title: "Custom packaging",
  description:
    "Explore custom boxes, food and bakery packaging, bags, labels, stickers, and industrial packs from PACKNEXT. Each category opens into specifications and a quotation.",
  path: "/products",
  keywords: ["custom packaging in Pakistan", "custom printed boxes Pakistan", "product packaging solutions"],
});

export default function ProductsPage() {
  return (
    <div className="shell py-12">
      <p className="kicker">Packaging</p>
      <h1 className="display mt-3 max-w-4xl text-5xl sm:text-7xl">Pick a pack.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
        Seven kinds of packaging. Open one, choose the box or bag, and send the size for a quote.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mainCategories().map((category) => (
          <Link key={category.slug} href={`/products/${category.slug}`} className="panel group overflow-hidden">
            <ProductPhoto src={categoryPhoto(category.slug, category.shape, category.material)} alt="" className="h-56 w-full transition duration-300 group-hover:scale-[1.02]" />
            <div className="px-5 pb-5">
              <h2 className="font-serif text-3xl tracking-[-0.03em]">{category.name}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{category.short}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
