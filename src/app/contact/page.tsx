import { businessProfile, pageMetadata, site } from "@/lib/site";
import { whatsappConfigured, whatsappLink } from "@/lib/whatsapp";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact PACKNEXT about custom packaging, or send a message. Quotations are prepared from your specification.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsapp = whatsappLink("Hello PACKNEXT. I would like to enquire about custom packaging.");
  return (
    <div className="shell grid gap-12 py-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div>
        <p className="kicker">Contact</p>
        <h1 className="display mt-3 text-5xl sm:text-6xl">Write with the product in mind.</h1>
        <p className="mt-5 text-base leading-7 text-ink-soft">
          Use this form for a general message. If you already know the pack, the studio is the faster brief. International enquiries can choose Other / International and a phone number starting with +.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-ink-soft">Email</dt>
            <dd>{site.email || "Add NEXT_PUBLIC_CONTACT_EMAIL"}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Phone</dt>
            <dd>{site.phoneDisplay || "Add NEXT_PUBLIC_PHONE_DISPLAY. Use the Pakistan country code +92 when you publish a local number."}</dd>
          </div>
          <div id="whatsapp">
            <dt className="text-ink-soft">WhatsApp</dt>
            <dd>
              {whatsappConfigured() && whatsapp ? (
                <a className="underline decoration-ink/30 underline-offset-4" href={whatsapp} target="_blank" rel="noreferrer">
                  Message PACKNEXT
                </a>
              ) : (
                "Add NEXT_PUBLIC_WHATSAPP_NUMBER, digits only, starting with 92."
              )}
            </dd>
          </div>
          <div>
            <dt className="text-ink-soft">Address</dt>
            <dd>{businessProfile.address}</dd>
          </div>
        </dl>
      </div>
      <QuoteForm mode="contact" source="Contact page" />
    </div>
  );
}
