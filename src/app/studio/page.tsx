import { pageMetadata } from "@/lib/site";
import { PackagingStudio } from "@/components/studio/PackagingStudio";

export const metadata = pageMetadata({
  title: "Packaging Studio",
  description:
    "Configure a custom box, bag, label, or sticker. Choose material, size in millimetres, printing, and finishing, preview it, and request a PACKNEXT quotation.",
  path: "/studio",
  keywords: ["custom packaging in Pakistan", "packaging configurator", "custom printed boxes Pakistan"],
});

export default function StudioPage() {
  return (
    <div className="shell py-12">
      <p className="kicker">PACKNEXT Packaging Studio</p>
      <h1 className="display mt-3 max-w-4xl text-5xl sm:text-7xl">Build the pack before you ask for the price.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft">
        Eight steps, from the structure to a quotation request. The preview turns with the material, the colour, and the finish. It is a guide to the conversation, not a proof and not a price.
      </p>
      <div className="mt-10">
        <PackagingStudio />
      </div>
    </div>
  );
}
