import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/data/catalog";
import { pageMetadata } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { categoryPhoto } from "@/lib/data/photos";
import { ProductPhoto } from "@/components/visual/ProductPhoto";
import { PackBrowser } from "@/components/shop/PackBrowser";
import { SizeGuide } from "@/components/shop/SizeGuide";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata({
    title: category.name,
    description: category.seoDescription,
    path: `/products/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <div className="shell py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Packaging", path: "/products" },
          { name: category.name, path: `/products/${category.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Packaging", href: "/products" },
          { name: category.name },
        ]}
      />
      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="kicker">Packaging</p>
          <h1 className="display mt-3 text-5xl sm:text-7xl">{category.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">{category.description}</p>
        </div>
        <ProductPhoto src={categoryPhoto(category.slug, category.shape, category.material)} alt={category.name} className="h-72 w-full rounded-[1.25rem]" />
      </div>

      {category.slug === "food-packaging" ? (
        <section className="mt-12">
          <h2 className="font-serif text-4xl">Sizes people usually ask for</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">Cake inches, cupcake counts, and common meal boxes. You can still change the millimetres on the quote.</p>
          <div className="mt-5">
            <SizeGuide compact={false} />
          </div>
        </section>
      ) : null}

      <section className="mt-14">
        <h2 className="font-serif text-4xl">Choose one</h2>
        <p className="mt-2 text-ink-soft">
          {category.slug === "food-packaging"
            ? "Pick a cake, donut, meal box, or pouch—then send the size and quantity."
            : "Open a pack, then send the size and quantity."}
        </p>
        <div className="mt-6">
          <PackBrowser categorySlug={category.slug} products={category.products} />
        </div>
      </section>

      <div className="mt-12">
        <Link href={`/studio?pack=${category.studioPack}&material=${category.material}`} className="btn btn-press">
          Get a quote for {category.name.toLowerCase()}
        </Link>
      </div>
    </div>
  );
}
