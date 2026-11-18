import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, industries } from "@/lib/data/industries";
import { getCategory } from "@/lib/data/catalog";
import { pageMetadata } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.name,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <div className="shell py-12">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
          { name: industry.name },
        ]}
      />
      <p className="kicker mt-8">{industry.kicker}</p>
      <h1 className="display mt-3 max-w-4xl text-5xl sm:text-7xl">{industry.name}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">{industry.description}</p>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">What to tell us</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-soft">
            {industry.considerations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          {industry.directions.map((direction) => (
            <article key={direction.title} className="border-t border-ink/15 pt-4">
              <h3 className="font-medium">{direction.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{direction.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">Relevant packaging</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {industry.categories.map((slug) => (
            <li key={slug}>
              <Link href={`/products/${slug}`} className="btn btn-ghost">
                {getCategory(slug)?.name ?? slug}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={`/studio?pack=${industry.studioPack}`} className="btn btn-press mt-8">
          Start a {industry.name.toLowerCase()} quotation
        </Link>
      </section>
    </div>
  );
}
