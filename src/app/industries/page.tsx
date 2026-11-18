import Link from "next/link";
import { industries } from "@/lib/data/industries";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Packaging for food, bakeries, cosmetics, pharmaceuticals, fashion, e-commerce, hardware, machinery, and wholesale businesses in Pakistan.",
  path: "/industries",
  keywords: ["food packaging boxes", "cosmetic packaging", "pharmaceutical packaging", "hardware packaging"],
});

export default function IndustriesPage() {
  return (
    <div className="shell py-12">
      <p className="kicker">Industries</p>
      <h1 className="display mt-3 max-w-4xl text-5xl sm:text-7xl">The same printer, a different brief.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
        Packaging changes with the product, the journey, and the person who opens it. These pages describe how to brief PACKNEXT. They do not claim that every industry is already a customer.
      </p>
      <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
        {industries.map((industry) => (
          <article key={industry.slug} className="grid gap-4 py-8 md:grid-cols-[220px_minmax(0,1fr)_auto] md:items-center">
            <p className="kicker">{industry.kicker}</p>
            <div>
              <h2 className="font-serif text-4xl tracking-[-0.03em]">{industry.name}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">{industry.summary}</p>
            </div>
            <Link href={`/industries/${industry.slug}`} className="btn btn-ghost">
              Read the brief
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
