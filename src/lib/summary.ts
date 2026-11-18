import { formatMm, formatQuantity } from "@/lib/format";

export type SummaryInput = {
  name: string;
  business?: string;
  phone: string;
  email: string;
  city: string;
  packagingType?: string;
  material?: string;
  lengthMm?: number | null;
  widthMm?: number | null;
  heightMm?: number | null;
  quantity?: number | null;
  printing?: string[];
  finishing?: string[];
  instructions?: string;
  brandColor?: string;
  artworkName?: string;
  reference?: string;
};

export function quoteSummary(input: SummaryInput) {
  const lines = [
    "PACKNEXT quotation request",
    input.reference ? `Reference: ${input.reference}` : "",
    `Name: ${input.name}`,
    `Business: ${input.business || "—"}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    `City: ${input.city}`,
    `Packaging: ${input.packagingType || "—"}`,
    `Material: ${input.material || "—"}`,
    `Dimensions: ${formatMm(input.lengthMm)} × ${formatMm(input.widthMm)} × ${formatMm(input.heightMm)}`,
    `Quantity: ${formatQuantity(input.quantity)}`,
    `Printing: ${input.printing?.length ? input.printing.join(", ") : "—"}`,
    `Finishing: ${input.finishing?.length ? input.finishing.join(", ") : "—"}`,
    `Brand colour: ${input.brandColor || "—"}`,
    `Artwork: ${input.artworkName || "Not uploaded"}`,
    input.instructions ? `Notes: ${input.instructions}` : "Notes: —",
    "Prices are quoted after this specification is reviewed. This message is not a price.",
  ];
  return lines.filter(Boolean).join("\n");
}
