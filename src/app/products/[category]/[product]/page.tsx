import Link from "next/link";
import { notFound } from "next/navigation";
import { allProductPaths, getProduct, relatedProducts } from "@/lib/data/catalog";
import { getMaterial } from "@/lib/data/materials";
import { pageMetadata } from "@/lib/site";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGallery } from "@/components/products/ProductGallery";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { productPhoto } from "@/lib/data/photos";
import { ProductPhoto } from "@/components/visual/ProductPhoto";

export function generateStaticParams() {
  return allProductPaths();
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product } = await params;
  const match = getProduct(category, product);
  if (!match) return {};
  return pageMetadata({
    title: match.product.name,
    description: match.product.summary,
    path: `/products/${category}/${product}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category: categorySlug, product: productSlug } = await params;
  const match = getProduct(categorySlug, productSlug);
  if (!match) notFound();
  const { category, product } = match;
  const path = `/products/${category.slug}/${product.slug}`;
  const related = relatedProducts(category.slug, product.slug);

  return (
    <div className="shell py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Packaging", path: "/products" },
          { name: category.name, path: `/products/${category.slug}` },
          { name: product.name, path },
        ])}
      />
      <JsonLd
        data={productJsonLd({
          name: product.name,
          description: product.description,
          path,
          category: category.name,
          material: getMaterial(product.material)?.name ?? product.material,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Packaging", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
          { name: product.name },
        ]}
      />
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
        <ProductGallery slug={product.slug} shape={product.shape} material={product.material} name={product.name} />
        <div>
          <p className="kicker">{category.name}</p>
          <h1 className="display mt-3 text-5xl sm:text-6xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-ink-soft">{product.description}</p>
          <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            {product.specs.map((spec) => (
              <div key={spec.label} className="grid gap-1 py-3 sm:grid-cols-[160px_minmax(0,1fr)]">
                <dt className="text-sm text-ink-soft">{spec.label}</dt>
                <dd className="text-sm">{spec.value}</dd>
              </div>
            ))}
            <div className="grid gap-1 py-3 sm:grid-cols-[160px_minmax(0,1fr)]">
              <dt className="text-sm text-ink-soft">Minimum quantity</dt>
              <dd className="text-sm">No fixed minimum is published. Enter the quantity you need and the quotation will confirm it.</dd>
            </div>
          </dl>
          <div className="mt-6">
            <h2 className="text-sm font-medium">Printing</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{product.printing.join(" · ")}</p>
            <h2 className="mt-4 text-sm font-medium">Finishing</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{product.finishing.join(" · ")}</p>
          </div>
          <Link href={`/studio?pack=${product.studioPack}&material=${product.material}`} className="btn btn-ghost mt-6">
            Preview in the studio
          </Link>
        </div>
      </div>

      <section className="mt-16" aria-labelledby="quote-title">
        <h2 id="quote-title" className="display text-4xl">Request a quotation for this structure</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
          Dimensions are in millimetres. Prices are not calculated on this page. When a price is issued, it can be given in PKR.
        </p>
        <div className="mt-6">
          <QuoteForm
            mode="product"
            source={`${category.name} / ${product.name}`}
            initial={{
              packagingType: product.name,
              material: getMaterial(product.material)?.name,
              materialChoices: product.materials.map((id) => ({ id, name: getMaterial(id)?.name ?? id })),
              printingChoices: product.printing,
              finishingChoices: product.finishing,
              hideHeight: product.shape === "label" || product.shape === "sticker" || product.shape === "tag",
            }}
          />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">Related specifications</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map(({ category: relatedCategory, product: relatedProduct }) => (
            <Link key={`${relatedCategory.slug}-${relatedProduct.slug}`} href={`/products/${relatedCategory.slug}/${relatedProduct.slug}`} className="panel overflow-hidden">
              <ProductPhoto src={productPhoto(relatedProduct.slug, relatedProduct.shape, relatedProduct.material)} alt="" className="h-40 w-full" />
              <div className="px-4 pb-4">
                <p className="text-xs text-ink-soft">{relatedCategory.name}</p>
                <h3 className="mt-1 font-serif text-2xl">{relatedProduct.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
