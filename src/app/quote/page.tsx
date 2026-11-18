import { pageMetadata } from "@/lib/site";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata = pageMetadata({
  title: "Request a quotation",
  description:
    "Request a custom packaging quotation from PACKNEXT. Specify the pack, material, size in millimetres, print, finish, and quantity. Prices are confirmed after review, in PKR.",
  path: "/quote",
  keywords: ["custom packaging quotation Pakistan", "custom printed boxes Pakistan"],
});

export default function QuotePage() {
  return (
    <div className="shell py-12">
      <p className="kicker">Quotation</p>
      <h1 className="display mt-3 max-w-4xl text-5xl sm:text-7xl">Send the specification. The price comes back after it is read.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft">
        This form does not estimate a manufacturing cost. It records what you need and, when the server is configured, stores the request. You can also build the same brief visually in the Packaging Studio.
      </p>
      <div className="mt-10">
        <QuoteForm mode="quote" source="Quote page" />
      </div>
    </div>
  );
}
