import { businessProfile, pageMetadata } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "About",
  description:
    "PACKNEXT specifies custom packaging, printing, labels, stickers, and bags for businesses that want the pack to carry the brand.",
  path: "/about",
});

const chapters = [
  {
    title: "What PACKNEXT does",
    text: "PACKNEXT prepares custom packaging around a product: the carton or bag, the material, the print, and the quantity. The work covers boxes, food and bakery packs, cosmetic and pharmaceutical cartons, retail and industrial outers, shopping bags, paper bags, labels, stickers, and clothing tags. The website is the place to explore that range and send a specification. It is not a checkout for ready-made stock.",
  },
  {
    title: "A packaging philosophy",
    text: "Packaging that moves your brand forward is a practical claim. The pack is part of how a product is recognised, carried, and remembered. It should be specified with the same care as the thing inside it, and it should not pretend to be more finished than the brief allows. A plain kraft bag can be the right answer. So can a rigid box with foil. The philosophy is to choose on purpose.",
  },
  {
    title: "How customisation is approached",
    text: "Customisation starts with the object. Length, width, and height are in millimetres. Materials are named. Print is described as CMYK, a single colour, both sides, or supplied artwork. Finishes are chosen one by one, because each one changes the job. The Packaging Studio lets you look at those choices before you write them down. The preview is a guide. The dieline and the proof come later, with the quotation.",
  },
  {
    title: "A commitment to quality",
    text: "Quality here means the pack matches the specification that was approved: the size, the material that was confirmed, the print that was checked, and the finishes that were requested. It does not mean a certificate this website has not been given. If a job needs a food-contact material, a particular board grade, or regulated artwork, that requirement is written into the brief and confirmed in the quotation.",
  },
  {
    title: "A customer-focused process",
    text: "You describe the product. PACKNEXT helps turn that into a structure and a price. You approve artwork before production. Timing and handover are part of the quotation, because they depend on the job. WhatsApp is the preferred way to continue a conversation once a number is configured. English is the language of this site. The content is organised so an Urdu edition can be added without rebuilding the pages.",
  },
];

export default function AboutPage() {
  return (
    <div className="shell py-12">
      <p className="kicker">About</p>
      <h1 className="display mt-3 max-w-4xl text-5xl sm:text-7xl">A packaging practice, written without a borrowed history.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
        Your product. Your packaging. Your next big impression. The story below is the way PACKNEXT works. Dates, addresses, and registrations are left open until the business adds them.
      </p>
      <div className="mt-14 space-y-16">
        {chapters.map((chapter) => (
          <Reveal key={chapter.title}>
            <article className="grid gap-4 border-t border-ink/15 pt-8 md:grid-cols-[280px_minmax(0,1fr)]">
              <h2 className="font-serif text-3xl tracking-[-0.03em]">{chapter.title}</h2>
              <p className="max-w-2xl text-base leading-8 text-ink-soft">{chapter.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <section className="panel mt-16 p-6 sm:p-8">
        <h2 className="font-serif text-3xl">Business details to complete</h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          These lines are placeholders. They are not facts about PACKNEXT. Replace them in the site configuration when the details are ready to publish.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {Object.entries({
            Established: businessProfile.established,
            "Legal name": businessProfile.legalName,
            Address: businessProfile.address,
            Hours: businessProfile.hours,
            "Delivery or pickup": businessProfile.coverage,
            Registration: businessProfile.registration,
          }).map(([label, value]) => (
            <div key={label} className="border-t border-ink/10 pt-3">
              <dt className="text-xs tracking-wide text-brass uppercase">{label}</dt>
              <dd className="mt-1 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
