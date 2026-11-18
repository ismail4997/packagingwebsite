import { pageMetadata } from "@/lib/site";
import { MaterialExplorer } from "@/components/materials/MaterialExplorer";

export const metadata = pageMetadata({
  title: "Materials library",
  description:
    "Compare bleach card, art paper, kraft, corrugated board, duplex, rigid board, and coated papers for custom packaging in Pakistan.",
  path: "/materials",
  keywords: ["kraft packaging", "corrugated packaging", "packaging materials Pakistan"],
});

export default function MaterialsPage() {
  return (
    <div className="shell py-12">
      <p className="kicker">Materials</p>
      <h1 className="display mt-3 max-w-4xl text-5xl sm:text-7xl">Choose the sheet before you choose the decoration.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
        Each material below is described by how it is typically used. The texture previews are illustrations of the surface, not photographs of mill stock. A quotation confirms the actual board.
      </p>
      <div className="mt-12">
        <MaterialExplorer />
      </div>
    </div>
  );
}
