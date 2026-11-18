export const materialIds = [
  "bleach-card",
  "art-paper",
  "kraft",
  "corrugated",
  "duplex",
  "rigid",
  "coated",
  "specialty",
] as const;

export type MaterialId = (typeof materialIds)[number];

export type Material = {
  id: MaterialId;
  name: string;
  short: string;
  description: string;
  surface: string;
  structure: string;
  printCharacter: string;
  watchouts: string;
  advantages: string[];
  applications: string[];
  recommended: string[];
  colors: { face: string; side: string; top: string; ink: string };
};

export const materials: Material[] = [
  {
    id: "bleach-card",
    name: "Bleached cardboard",
    short: "Bleach card",
    description:
      "A white board used widely for folding cartons. The bright face gives printed colour a clean ground and suits food, retail, and bakery packs when a white interior or exterior is wanted.",
    surface: "Smooth white face",
    structure: "Solid board, folded into cartons",
    printCharacter: "Strong ground for CMYK and single-colour work",
    watchouts: "Confirm board thickness and any food-contact requirement in the quotation.",
    advantages: [
      "Bright print surface",
      "Familiar carton construction",
      "Can be specified with or without a window",
    ],
    applications: ["Retail cartons", "Bakery boxes", "Cosmetic sleeves", "Product labels on board"],
    recommended: ["custom-boxes", "food-packaging", "cosmetics-packaging"],
    colors: { face: "#F7F4EE", side: "#E4DDD2", top: "#FFFcf8", ink: "#161410" },
  },
  {
    id: "art-paper",
    name: "Art paper",
    short: "Art paper",
    description:
      "A coated paper chosen when the print itself is the product: labels, tags, sleeves, and lighter cartons that need fine detail and even colour.",
    surface: "Coated and even",
    structure: "Sheet, used for labels, tags, and lighter cartons",
    printCharacter: "Fine detail, photography, and small type",
    watchouts: "Less rigid than board. Pair it with the right thickness for the pack.",
    advantages: ["Crisp small text", "Even colour", "Useful for labels and swing tags"],
    applications: ["Labels", "Stickers on coated stock", "Swing tags", "Wraps and sleeves"],
    recommended: ["labels", "stickers", "clothing-tags", "custom-printed-packaging"],
    colors: { face: "#FFFEFB", side: "#F1EEE8", top: "#FFFFFF", ink: "#161410" },
  },
  {
    id: "kraft",
    name: "Kraft paper",
    short: "Kraft",
    description:
      "Brown kraft carries a natural fibre look. It is a strong choice for bags, sleeves, and cartons when the material is part of the brand, not something to hide.",
    surface: "Natural brown fibre",
    structure: "Paper or board, depending on the job",
    printCharacter: "Ink sits on a warm ground. Colour will not look the same as on white board.",
    watchouts: "Expect a shift in printed colour compared with a white sheet. Ask for a proof when colour is critical.",
    advantages: ["Distinctive natural colour", "Works well for bags and bakery packs", "Single-colour print can look deliberate and strong"],
    applications: ["Paper bags", "Shopping bags", "Bakery boxes", "Food sleeves"],
    recommended: ["paper-bags", "shopping-bags", "food-packaging"],
    colors: { face: "#C6A36A", side: "#A8844E", top: "#D7B888", ink: "#2A2118" },
  },
  {
    id: "corrugated",
    name: "Corrugated board",
    short: "Corrugated",
    description:
      "Fluted board for packs that have to travel. Use it for master cartons, mailers, hardware, and machinery parts. Flute and ply should follow the weight and route of the product.",
    surface: "Fluted, with a printable liner",
    structure: "Liner and flute. Grade is confirmed against the product you describe.",
    printCharacter: "Direct print or a printed sheet, depending on the run and artwork.",
    watchouts: "Do not guess a flute from a picture. Share product weight and how the pack will be stacked or shipped.",
    advantages: ["Protects heavier goods", "Can be plain or printed", "Scales from mailers to master cartons"],
    applications: ["E-commerce mailers", "Hardware cartons", "Industrial outers", "Machinery parts"],
    recommended: ["hardware-packaging", "machinery-packaging", "industrial-packaging", "retail-packaging"],
    colors: { face: "#D7B56D", side: "#C49A52", top: "#E4C88A", ink: "#2A2118" },
  },
  {
    id: "duplex",
    name: "Duplex board",
    short: "Duplex",
    description:
      "A board with a printable white face and a grey back. It is a practical carton board when the inside of the pack does not need to be bright white.",
    surface: "White coated face, grey back",
    structure: "Folding board",
    printCharacter: "Reliable for line work and product photography on the face",
    watchouts: "The grey back will show on the inside unless an inner print or liner is specified.",
    advantages: ["Useful carton board", "White face for branding", "A clear inside-versus-outside decision"],
    applications: ["Retail cartons", "Medicine cartons", "Household product boxes"],
    recommended: ["custom-boxes", "pharmaceutical-packaging", "retail-packaging"],
    colors: { face: "#EFE8DC", side: "#D5CBBC", top: "#F7F2EA", ink: "#161410" },
  },
  {
    id: "rigid",
    name: "Rigid board",
    short: "Rigid board",
    description:
      "A thick wrapped board for set-up boxes. The lid and base keep their shape. It is the direction to discuss for cosmetics, gifts, and other packs that should feel substantial in the hand.",
    surface: "Wrapped sheet over a thick board",
    structure: "Set-up box, not a folding carton",
    printCharacter: "The wrap can be printed, foiled, or kept plain.",
    watchouts: "Rigid boxes are a different build from folding cartons. Share the product and the unboxing you want.",
    advantages: ["Holds its shape", "Room for foil, texture, and a fitted interior", "A more ceremonial unboxing"],
    applications: ["Cosmetic sets", "Gift boxes", "Premium retail", "Product kits"],
    recommended: ["cosmetics-packaging", "retail-packaging", "custom-boxes"],
    colors: { face: "#2C2824", side: "#1A1714", top: "#3C362F", ink: "#F3EEE6" },
  },
  {
    id: "coated",
    name: "Coated paper",
    short: "Coated paper",
    description:
      "A smooth coated sheet for labels, stickers, and wraps where ink needs to sit evenly. Pair the coating with the adhesive and the surface the label will live on.",
    surface: "Smooth coated face",
    structure: "Label and sticker sheet",
    printCharacter: "Even solids and small type",
    watchouts: "Adhesive, face stock, and the product surface all change the specification. Name the surface the sticker will be applied to.",
    advantages: ["Clean colour", "Suitable for product labels", "Can be gloss or matte in feel"],
    applications: ["Product labels", "Jar labels", "Stickers", "Printed wraps"],
    recommended: ["labels", "stickers", "custom-printed-packaging"],
    colors: { face: "#FBF9F6", side: "#E7E1D8", top: "#FFFFFF", ink: "#161410" },
  },
  {
    id: "specialty",
    name: "Other packaging materials",
    short: "Other materials",
    description:
      "Some products need a board, film, adhesive, or liner that is not in the standard list. Describe the product and the condition it travels through, and the quotation can name a material instead of forcing a catalogue choice.",
    surface: "Specified per job",
    structure: "Depends on the product",
    printCharacter: "Confirmed once the material is chosen",
    watchouts: "This option is a request, not a promise that every substrate is held in stock.",
    advantages: ["Room for an unusual product", "The brief leads the material", "Avoids pretending one board fits every job"],
    applications: ["Speciality retail", "Protective outers", "Custom label stocks"],
    recommended: ["custom-printed-packaging", "industrial-packaging", "pharmaceutical-packaging"],
    colors: { face: "#E4E0F1", side: "#CFC8E0", top: "#F4F1F8", ink: "#241E33" },
  },
];

export function getMaterial(id: string) {
  return materials.find((material) => material.id === id);
}
