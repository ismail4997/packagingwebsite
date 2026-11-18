import Link from "next/link";
import { mainCategories } from "@/lib/data/catalog";
import { businessProfile, site } from "@/lib/site";
import { whatsappConfigured, whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const whatsapp = whatsappLink("Hello PACKNEXT. I would like to enquire about custom packaging.");
  return (
    <footer className="mt-20 border-t border-line bg-ink text-foam">
      <div className="shell grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-serif text-3xl tracking-[-0.04em]">
            PACK<span className="text-brass-bright">NEXT</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-foam/75">{site.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-foam/60">{site.altTagline}</p>
        </div>
        <div className="md:col-span-4">
          <p className="kicker text-brass-bright">Packaging</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-foam/75">
            {mainCategories().map((category) => (
              <li key={category.slug}>
                <Link href={`/products/${category.slug}`} className="hover:text-foam">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="kicker text-brass-bright">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/studio" className="hover:text-brass-bright">Packaging Studio</Link></li>
            <li><Link href="/materials" className="hover:text-brass-bright">Materials</Link></li>
            <li><Link href="/industries" className="hover:text-brass-bright">Industries</Link></li>
            <li><Link href="/about" className="hover:text-brass-bright">About</Link></li>
            <li><Link href="/quote" className="hover:text-brass-bright">Request a quotation</Link></li>
            <li><Link href="/contact" className="hover:text-brass-bright">Contact</Link></li>
          </ul>
          <div className="mt-6 space-y-2 text-sm text-foam/70">
            <p>{site.email || businessProfile.address}</p>
            <p>{site.phoneDisplay || "Add a public phone number in the environment settings."}</p>
            {whatsappConfigured() && whatsapp ? (
              <a href={whatsapp} className="inline-block text-foam underline decoration-brass-bright/60 underline-offset-4">
                WhatsApp
              </a>
            ) : (
              <p>WhatsApp is ready once NEXT_PUBLIC_WHATSAPP_NUMBER is set.</p>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-foam/50 sm:flex-row sm:justify-between">
          <p>© 2026 PACKNEXT. Custom packaging enquiries.</p>
          <p>English site. The structure can carry an Urdu edition later.</p>
        </div>
      </div>
    </footer>
  );
}
