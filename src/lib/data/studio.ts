export type PreviewKind = "box" | "rigid" | "bag" | "flat" | "sticker";
export type StudioFormat = "box" | "bag" | "flat";

export type StudioPack = {
  id: string;
  name: string;
  detail: string;
  format: StudioFormat;
  preview: PreviewKind;
  category: string;
  defaultMaterial: string;
  defaults: { length: number; width: number; height: number };
};

export const studioPacks: StudioPack[] = [
  {
    id: "folding-carton",
    name: "Folding carton",
    detail: "A tuck carton for retail products, kits, and anything that ships flat and folds around the product.",
    format: "box",
    preview: "box",
    category: "custom-boxes",
    defaultMaterial: "bleach-card",
    defaults: { length: 180, width: 80, height: 220 },
  },
  {
    id: "rigid-box",
    name: "Rigid box",
    detail: "A set-up lid and base. The preview shows the thicker proportion of a rigid box.",
    format: "box",
    preview: "rigid",
    category: "cosmetics-packaging",
    defaultMaterial: "rigid",
    defaults: { length: 160, width: 160, height: 70 },
  },
  {
    id: "corrugated-box",
    name: "Corrugated box",
    detail: "A shipping or shelf carton. Share the product weight with the quotation so the board can be judged properly.",
    format: "box",
    preview: "box",
    category: "industrial-packaging",
    defaultMaterial: "corrugated",
    defaults: { length: 350, width: 250, height: 180 },
  },
  {
    id: "food-box",
    name: "Food box",
    detail: "A carton for takeaway, meal kits, or packaged food. Tell us if the food is hot, greasy, chilled, or dry.",
    format: "box",
    preview: "box",
    category: "food-packaging",
    defaultMaterial: "bleach-card",
    defaults: { length: 180, width: 120, height: 70 },
  },
  {
    id: "bakery-box",
    name: "Bakery box",
    detail: "A box for cake, pastry, or confectionery. Die-cutting in the next steps previews a window.",
    format: "box",
    preview: "box",
    category: "food-packaging",
    defaultMaterial: "kraft",
    defaults: { length: 200, width: 200, height: 100 },
  },
  {
    id: "cosmetic-box",
    name: "Cosmetic box",
    detail: "A taller carton for bottles, jars, tubes, and sets.",
    format: "box",
    preview: "box",
    category: "cosmetics-packaging",
    defaultMaterial: "art-paper",
    defaults: { length: 70, width: 70, height: 160 },
  },
  {
    id: "shopping-bag",
    name: "Shopping bag",
    detail: "A carried bag with handles. Dimensions are width, gusset, and height.",
    format: "bag",
    preview: "bag",
    category: "shopping-bags",
    defaultMaterial: "kraft",
    defaults: { length: 320, width: 120, height: 400 },
  },
  {
    id: "paper-bag",
    name: "Paper bag",
    detail: "A paper carrier or counter bag. Dimensions are width, gusset, and height.",
    format: "bag",
    preview: "bag",
    category: "paper-bags",
    defaultMaterial: "kraft",
    defaults: { length: 220, width: 100, height: 280 },
  },
  {
    id: "labels",
    name: "Labels",
    detail: "A flat label. Width and height are the label face. Depth is not used.",
    format: "flat",
    preview: "flat",
    category: "labels",
    defaultMaterial: "coated",
    defaults: { length: 90, width: 50, height: 1 },
  },
  {
    id: "stickers",
    name: "Stickers",
    detail: "A sticker or seal. Width and height describe the cut size.",
    format: "flat",
    preview: "sticker",
    category: "stickers",
    defaultMaterial: "coated",
    defaults: { length: 60, width: 60, height: 1 },
  },
];

export const printingOptions = [
  {
    id: "cmyk",
    label: "CMYK printing",
    detail: "Full-colour process print for photography and multi-colour artwork.",
  },
  {
    id: "single",
    label: "Single-colour printing",
    detail: "One ink. A direct way to print a mark, a line, or a block of type.",
  },
  {
    id: "double",
    label: "Double-sided printing",
    detail: "Print on both faces. Useful for insides of cartons and bags.",
  },
  {
    id: "artwork",
    label: "Custom artwork",
    detail: "Your supplied design. It still needs to be checked against the structure.",
  },
] as const;

export const finishingOptions = [
  { id: "matte", label: "Matte lamination", detail: "A soft, low-glare film." },
  { id: "gloss", label: "Gloss lamination", detail: "A reflective film. Colour looks sharper and the surface shines." },
  { id: "spot-uv", label: "Spot UV", detail: "Gloss on selected areas of an otherwise quieter surface." },
  { id: "foil", label: "Foil stamping", detail: "A metallic stamp. The preview uses a brass foil." },
  { id: "emboss", label: "Embossing", detail: "A raised impression in the board." },
  { id: "deboss", label: "Debossing", detail: "A pressed impression." },
  { id: "die-cut", label: "Die-cutting", detail: "A cut window or a shaped edge. The box preview opens a window." },
  { id: "none", label: "No special finishing", detail: "Print and board only, unless the quotation adds a protective coat." },
] as const;

export function getStudioPack(id: string) {
  return studioPacks.find((pack) => pack.id === id);
}

export function dimensionLabels(format: StudioFormat) {
  if (format === "bag") return { length: "Width", width: "Gusset", height: "Height" };
  if (format === "flat") return { length: "Width", width: "Height", height: "" };
  return { length: "Length", width: "Width", height: "Height" };
}

export type StudioState = {
  packId: string;
  materialId: string;
  length: number;
  width: number;
  height: number;
  printing: string[];
  finishing: string[];
  quantity: number;
  brandColor: string;
};

export const defaultStudioState: StudioState = {
  packId: "folding-carton",
  materialId: "bleach-card",
  length: 180,
  width: 80,
  height: 220,
  printing: ["cmyk"],
  finishing: ["none"],
  quantity: 500,
  brandColor: "#c4452d",
};
