import Link from "next/link";
import { customizationSteps } from "@/lib/data/content";
import { HeroStage, ShopCategories } from "@/components/home/HomeInteractive";

export default function HomePage() {
  return (
    <>
      <section className="shell grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-20">
        <div className="max-w-md pb-2">
          <p className="kicker">Custom packaging in Pakistan</p>
          <h1 className="display mt-4 text-5xl text-balance sm:text-6xl">Packaging that moves your brand forward.</h1>
          <p className="mt-5 text-base leading-7 text-ink-soft">Tell us the size. We send a quote.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="/products" className="btn btn-ink">
              See packaging
            </Link>
            <Link href="/quote" className="text-sm font-medium underline decoration-ink/25 underline-offset-4">
              Get a quote
            </Link>
          </div>
        </div>
        <HeroStage />
      </section>

      <section className="shell pb-14" aria-labelledby="shop-title">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="shop-title" className="display text-3xl sm:text-4xl">
            Shop by category
          </h2>
          <Link href="/products" className="text-sm font-medium underline decoration-ink/30 underline-offset-4">
            All categories
          </Link>
        </div>
        <ShopCategories />
      </section>

      <section className="shell pb-14" aria-labelledby="steps-title">
        <h2 id="steps-title" className="display text-3xl sm:text-4xl">
          How to order
        </h2>
        <ol className="mt-6 grid gap-3 sm:grid-cols-3">
          {customizationSteps.map((step, index) => (
            <li key={step.title}>
              <Link href={step.href} className="panel block h-full p-4 transition hover:-translate-y-0.5">
                <p className="text-sm font-medium text-press">Step {index + 1}</p>
                <h3 className="mt-2 font-medium">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{step.text}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

    </>
  );
}
