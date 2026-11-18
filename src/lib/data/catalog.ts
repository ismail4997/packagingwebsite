export type PackShape =
  | "carton"
  | "rigid"
  | "mailer"
  | "food"
  | "bakery"
  | "cosmetic"
  | "bag"
  | "paperbag"
  | "label"
  | "sticker"
  | "tag"
  | "hardware"
  | "machinery"
  | "industrial"
  | "printed";

export type ProductFamily =
  | "meals"
  | "snacks"
  | "cakes"
  | "cupcakes"
  | "donuts"
  | "pastries"
  | "sweets"
  | "carry";

export type Product = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  shape: PackShape;
  accent: string;
  material: string;
  studioPack: string;
  specs: { label: string; value: string }[];
  materials: string[];
  printing: string[];
  finishing: string[];
  /** What this starting size usually holds. The customer can still change it. */
  fit?: string;
  /** Starting artwork shows a window. The customer can still remove it. */
  window?: boolean;
  family?: ProductFamily;
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  seoDescription: string;
  shape: PackShape;
  accent: string;
  material: string;
  studioPack: string;
  materials: string[];
  customizations: string[];
  products: Product[];
};

const printStandard = ["CMYK printing", "Single-colour printing", "Custom artwork"];
const finishCarton = ["Matte lamination", "Gloss lamination", "Spot UV", "Foil stamping", "Embossing", "Debossing", "Die-cutting", "No special finishing"];

function product(input: Product): Product {
  return input;
}

function listed(input: {
  slug: string;
  name: string;
  summary: string;
  shape: PackShape;
  material: string;
  accent: string;
  studioPack: string;
  fit: string;
  family: ProductFamily;
  windowed?: boolean;
}): Product {
  const { windowed, ...rest } = input;
  return {
    ...rest,
    description: `${input.summary} This is a size people in Pakistan often ask for. You can change the millimetres, the print, and whether it has a window. It is quoted. It is not a fixed shop price.`,
    specs: [
      { label: "Usually fits", value: input.fit },
      { label: "You can change", value: "Size, colours, kraft or white board, window or no window" },
      { label: "Price", value: "Quoted after your quantity" },
    ],
    materials: input.material === "kraft" ? ["kraft", "bleach-card"] : ["bleach-card", "kraft"],
    printing: printStandard,
    finishing: windowed ? ["Die-cutting", "No special finishing", "Matte lamination"] : ["No special finishing", "Die-cutting"],
    window: Boolean(windowed),
  };
}

export const categories: Category[] = [
  {
    slug: "custom-boxes",
    name: "Custom Boxes",
    short: "Cartons built around the product",
    description:
      "Folding cartons, mailers, and sleeves made to a size you specify. Custom boxes in Pakistan are quoted from the board, the print, and the quantity, not from a single shelf price.",
    seoDescription:
      "Custom boxes and custom printed boxes in Pakistan. Specify the size, board, print, and quantity, then request a PACKNEXT quotation.",
    shape: "carton",
    accent: "#c4452d",
    material: "bleach-card",
    studioPack: "folding-carton",
    materials: ["bleach-card", "art-paper", "duplex", "kraft", "rigid"],
    customizations: ["Length, width, and height in millimetres", "Tuck, sleeve, or mailer structure", "Inside and outside print", "Windows and shaped edges"],
    products: [
      product({
        slug: "tuck-end-carton",
        name: "Tuck-end carton",
        summary: "A folding carton with a tuck closure, sized to the unit you sell.",
        description:
          "The tuck-end carton is the working structure for retail products, kits, and refills. The face can carry full-colour print or a single ink. Inside print is a separate decision. Share the product dimensions, including anything that sticks out, so the carton is not tight in the wrong place.",
        shape: "carton",
        accent: "#c4452d",
        material: "bleach-card",
        studioPack: "folding-carton",
        specs: [
          { label: "Structure", value: "Straight or reverse tuck, confirmed on the dieline" },
          { label: "Size", value: "Your length, width, and height in millimetres" },
          { label: "Pricing", value: "Quoted in PKR after specification. No list price." },
        ],
        materials: ["bleach-card", "duplex", "art-paper", "kraft"],
        printing: printStandard,
        finishing: finishCarton,
      }),
      product({
        slug: "mailer-box",
        name: "Mailer box",
        summary: "A folding mailer for parcels that should arrive looking considered.",
        description:
          "A mailer is both the shipper and the first impression. It can be corrugated for the journey or a lighter board when the contents are already protected. Inside print, a branded tape replacement, or a plain kraft face are all specifiable. Courier rules are not assumed here.",
        shape: "mailer",
        accent: "#8d6a3f",
        material: "kraft",
        studioPack: "corrugated-box",
        specs: [
          { label: "Structure", value: "Folding mailer, board confirmed against the contents" },
          { label: "Print", value: "Outside, inside, or a seal sticker instead of full print" },
          { label: "Pricing", value: "Quoted from size, board, and quantity" },
        ],
        materials: ["corrugated", "kraft", "duplex"],
        printing: [...printStandard, "Double-sided printing"],
        finishing: ["Matte lamination", "No special finishing", "Die-cutting"],
      }),
      product({
        slug: "sleeve-and-tray",
        name: "Sleeve and tray",
        summary: "A tray that holds the product and a sleeve that carries the brand.",
        description:
          "Use a sleeve when the brand wraps a simple tray, or when a seasonal design should change without rebuilding the whole pack. Specify both pieces. They are quoted as a pair because one without the other is a different job.",
        shape: "printed",
        accent: "#234c38",
        material: "art-paper",
        studioPack: "folding-carton",
        specs: [
          { label: "Pieces", value: "Sleeve and tray specified together" },
          { label: "Use", value: "Retail units, kits, and campaigns that change artwork" },
          { label: "Pricing", value: "Two components, one quotation" },
        ],
        materials: ["art-paper", "bleach-card", "duplex", "kraft"],
        printing: printStandard,
        finishing: finishCarton,
      }),
    ],
  },
  {
    slug: "lid-boxes",
    name: "Lid Boxes",
    short: "A base and a separate lid",
    description:
      "Two-piece lid boxes for cakes, gifts, soap, and sets. The lid lifts off. Size the base to the product, then the lid to the base.",
    seoDescription:
      "Lid boxes in Pakistan: two-piece base and lid cartons for cakes, gifts, and sets. Quoted from size and quantity.",
    shape: "rigid",
    accent: "#8d6a3f",
    material: "kraft",
    studioPack: "rigid-box",
    materials: ["kraft", "bleach-card", "rigid", "art-paper"],
    customizations: ["Separate lid and base", "White or kraft board", "Optional clear window in the lid", "Print on the lid face"],
    products: [
      product({
        slug: "two-piece-lid-box",
        name: "Two-piece lid box",
        summary: "A base and a lid that lifts off, the box shops use for gifts and cakes.",
        description:
          "Measure what sits in the base. The lid is a separate piece, so it can be printed on its own. White card or kraft. A window in the lid is a separate choice.",
        shape: "rigid",
        accent: "#8d6a3f",
        material: "kraft",
        studioPack: "rigid-box",
        specs: [
          { label: "Structure", value: "Base plus a separate lid" },
          { label: "Good for", value: "Cakes, gifts, soap, and small sets" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["kraft", "bleach-card", "rigid"],
        printing: printStandard,
        finishing: ["No special finishing", "Matte lamination", "Die-cutting"],
      }),
      product({
        slug: "kraft-lid-box",
        name: "Kraft lid box",
        summary: "A brown two-piece box with a plain kraft lid.",
        description:
          "The same lid-and-base build in kraft board. Useful when the pack should look plain and the print stays on a sticker or a small logo.",
        shape: "rigid",
        accent: "#6b4a2b",
        material: "kraft",
        studioPack: "rigid-box",
        specs: [
          { label: "Board", value: "Kraft" },
          { label: "Structure", value: "Lid and base" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["kraft", "bleach-card"],
        printing: printStandard,
        finishing: ["No special finishing", "Die-cutting"],
      }),
    ],
  },
  {
    slug: "medicine-boxes",
    name: "Medicine Boxes",
    short: "Cartons for tablets, bottles, and blisters",
    description:
      "Folding cartons for medicine: tablets, blisters, and small bottles. You supply the approved text. This page does not claim a pharmaceutical licence.",
    seoDescription:
      "Medicine boxes in Pakistan: folding cartons for tablets, blisters, and bottles. Printed to your approved artwork. Quotation only.",
    shape: "carton",
    accent: "#234c38",
    material: "duplex",
    studioPack: "folding-carton",
    materials: ["duplex", "bleach-card", "art-paper"],
    customizations: ["Fit to the blister, bottle, or tube", "Panels for your approved text", "Matte or gloss", "No medical claims written by us"],
    products: [
      product({
        slug: "tablet-medicine-box",
        name: "Tablet carton",
        summary: "A small folding carton for a blister, strip, or tablet bottle.",
        description:
          "Share the blister or bottle size with the cap on. The carton is printed from artwork you approve. Batch and expiry marks are only included if you ask for them.",
        shape: "carton",
        accent: "#234c38",
        material: "duplex",
        studioPack: "folding-carton",
        specs: [
          { label: "Structure", value: "Tuck-end medicine carton" },
          { label: "Artwork", value: "Your approved text" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["duplex", "bleach-card"],
        printing: printStandard,
        finishing: ["No special finishing", "Matte lamination", "Gloss lamination"],
      }),
      product({
        slug: "pharmacy-shelf-box",
        name: "Pharmacy shelf carton",
        summary: "The unit carton a pharmacy puts on the shelf.",
        description:
          "A straight carton with a front face and side panels. Tell us the product inside and send the text. We print it. We do not write the medical wording.",
        shape: "carton",
        accent: "#1f6f8b",
        material: "duplex",
        studioPack: "folding-carton",
        specs: [
          { label: "Good for", value: "Tablets, capsules, and small kits" },
          { label: "You supply", value: "Size and approved artwork" },
          { label: "Price", value: "Quoted after quantity" },
        ],
        materials: ["duplex", "bleach-card", "art-paper"],
        printing: printStandard,
        finishing: ["No special finishing", "Gloss lamination"],
      }),
    ],
  },
  {
    slug: "syrup-boxes",
    name: "Syrup Boxes",
    short: "Tall cartons for syrup and tonic bottles",
    description:
      "Tall cartons for cough syrup, tonic, and other liquid bottles. Measure the bottle with the cap. The carton is quoted to that height.",
    seoDescription:
      "Syrup boxes in Pakistan: tall cartons for cough syrup and tonic bottles. Quoted from bottle size and quantity.",
    shape: "carton",
    accent: "#1f6f8b",
    material: "duplex",
    studioPack: "folding-carton",
    materials: ["duplex", "bleach-card"],
    customizations: ["Height set to the bottle and cap", "Front and side panels", "Your approved bottle text", "Optional insert if the bottle should not rattle"],
    products: [
      product({
        slug: "syrup-carton",
        name: "Syrup carton",
        summary: "A tall box for a syrup, tonic, or vitamin bottle.",
        description:
          "These cartons are taller than a tablet box because the bottle is tall. Send the bottle height with the cap, and the diameter. Print comes from your artwork.",
        shape: "carton",
        accent: "#1f6f8b",
        material: "duplex",
        studioPack: "folding-carton",
        specs: [
          { label: "Structure", value: "Tall tuck carton" },
          { label: "Fit", value: "Bottle height including the cap" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["duplex", "bleach-card"],
        printing: printStandard,
        finishing: ["No special finishing", "Gloss lamination", "Matte lamination"],
      }),
      product({
        slug: "syrup-bottle-pack",
        name: "Syrup bottle pack",
        summary: "The carton around an amber or clear syrup bottle.",
        description:
          "Amber and clear syrup bottles need a carton that is snug and tall. If you also need a label on the bottle, that is a separate line in the quote.",
        shape: "carton",
        accent: "#c47b2d",
        material: "duplex",
        studioPack: "folding-carton",
        specs: [
          { label: "Good for", value: "Cough syrup, tonic, and liquid vitamins" },
          { label: "Also available", value: "A bottle label, quoted separately" },
          { label: "Price", value: "Quoted after the bottle size" },
        ],
        materials: ["duplex", "bleach-card", "coated"],
        printing: printStandard,
        finishing: ["No special finishing", "Gloss lamination"],
      }),
    ],
  },
  {
    slug: "window-boxes",
    name: "Window Boxes",
    short: "Boxes with a clear window",
    description:
      "Window boxes and window feeder boxes for cakes, pastries, donuts, and sweets. A clear panel shows the food. The board can be white or kraft.",
    seoDescription:
      "Window boxes in Pakistan for cakes, pastries, and sweets, including window feeder boxes. Quoted from size and quantity.",
    shape: "bakery",
    accent: "#c4452d",
    material: "bleach-card",
    studioPack: "bakery-box",
    materials: ["bleach-card", "kraft", "art-paper"],
    customizations: ["Window shape and size", "White or kraft board", "Lid or tuck closure", "Print around the window"],
    products: [
      product({
        slug: "window-lid-box",
        name: "Window lid box",
        summary: "A lid box with a clear window so the cake or pastry shows.",
        description:
          "The lid has a die-cut window and a clear sheet. Share the cake or pastry size. The window can be square, round, or a wide panel.",
        shape: "bakery",
        accent: "#c4452d",
        material: "bleach-card",
        studioPack: "bakery-box",
        window: true,
        specs: [
          { label: "Structure", value: "Lid and base with a window" },
          { label: "Window", value: "Clear sheet, shape confirmed with you" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["bleach-card", "kraft"],
        printing: printStandard,
        finishing: ["Die-cutting", "No special finishing", "Matte lamination"],
      }),
      product({
        slug: "window-feeder-box",
        name: "Window feeder box",
        summary: "A counter box with a window, for pastries people pick from the display.",
        description:
          "Bakeries use this when the box sits on the counter and the food should be seen before it is opened. Tell us how many pieces it holds and whether the window is on the lid or the front.",
        shape: "bakery",
        accent: "#8d6a3f",
        material: "bleach-card",
        studioPack: "bakery-box",
        window: true,
        specs: [
          { label: "Good for", value: "Pastries, donuts, brownies, and sweets" },
          { label: "Window", value: "Lid or front panel" },
          { label: "Price", value: "Quoted after the piece count" },
        ],
        materials: ["bleach-card", "kraft"],
        printing: printStandard,
        finishing: ["Die-cutting", "No special finishing"],
      }),
    ],
  },
  {
    slug: "food-packaging",
    name: "Food Packaging",
    short: "Meals, cakes, donuts, cupcakes, and mithai packs",
    description:
      "Restaurant boxes, cake cartons by the inch, donut and cupcake packs, mithai boxes, and snack pouches for shops in Pakistan. Grease, heat, and frosting height change the board you need.",
    seoDescription:
      "Food and bakery packaging in Pakistan: burger and biryani boxes, cake boxes by inch, donuts, cupcakes, mithai, and pouches. Custom print and sizes, quoted to order.",
    shape: "food",
    accent: "#c4452d",
    material: "bleach-card",
    studioPack: "food-box",
    materials: ["bleach-card", "kraft", "coated", "duplex", "corrugated", "art-paper"],
    customizations: [
      "Portion or cake size in millimetres or inches",
      "Hot, greasy, or chilled food; height including frosting",
      "Window or solid lid on cakes and pastries",
      "White board or kraft",
      "Stand-up pouches for dry snacks and tea",
    ],
    products: [
      product({
        slug: "takeaway-carton",
        name: "Takeaway carton",
        summary: "A printed carton for food that leaves the counter.",
        description:
          "Size it to the portion, not to a generic takeaway photo. Say whether the food is sauced, fried, or dry, and whether the carton needs to be food-contact suitable. That requirement is confirmed in the quotation. It is not claimed as a certificate on this page.",
        shape: "food",
        accent: "#c4452d",
        material: "bleach-card",
        studioPack: "food-box",
        family: "meals",
        specs: [
          { label: "Structure", value: "Folding food carton" },
          { label: "Must tell us", value: "Portion size and whether the food is hot, greasy, or chilled" },
          { label: "Pricing", value: "Quoted per specification and quantity" },
        ],
        materials: ["bleach-card", "kraft", "duplex"],
        printing: printStandard,
        finishing: ["No special finishing", "Gloss lamination", "Matte lamination", "Die-cutting"],
      }),
      product({
        slug: "food-sleeve",
        name: "Food sleeve",
        summary: "A wrap for cups, trays, or products that already have a container.",
        description:
          "A sleeve adds a brand face without rebuilding the container. It is a good direction for cups, meal trays, and limited editions. Specify the thing it wraps, including the circumference or the tray footprint.",
        shape: "printed",
        accent: "#8d6a3f",
        material: "kraft",
        studioPack: "folding-carton",
        family: "snacks",
        specs: [
          { label: "Structure", value: "Printed sleeve" },
          { label: "Fit", value: "Measured to the container you already use" },
          { label: "Pricing", value: "Quoted from size, paper, and quantity" },
        ],
        materials: ["kraft", "art-paper", "coated"],
        printing: printStandard,
        finishing: ["No special finishing", "Matte lamination"],
      }),
      product({
        slug: "meal-kit-box",
        name: "Meal kit box",
        summary: "A carton for several components that should arrive as one meal.",
        description:
          "Meal kits need a carton that organises the contents and a print face that explains them. Inserts are optional and should be requested, not assumed. Share the component list so the internal space is designed rather than padded with guesswork.",
        shape: "food",
        accent: "#234c38",
        material: "duplex",
        studioPack: "food-box",
        family: "meals",
        specs: [
          { label: "Structure", value: "Outer carton, inserts only if requested" },
          { label: "Contents", value: "List each component in the quotation notes" },
          { label: "Pricing", value: "Outer and any insert are itemised" },
        ],
        materials: ["duplex", "bleach-card", "corrugated"],
        printing: [...printStandard, "Double-sided printing"],
        finishing: finishCarton,
      }),
      product({
        slug: "burger-box",
        name: "Burger box",
        summary: "A printed box for a burger, shawarma, or loaded sandwich.",
        description: "Tell us the burger size and whether it is saucy. White board or kraft, with your logo on the lid. The price is quoted from the size and quantity.",
        shape: "food",
        accent: "#c4452d",
        material: "bleach-card",
        studioPack: "food-box",
        family: "meals",
        specs: [
          { label: "Good for", value: "Burgers, shawarma, sandwiches" },
          { label: "You choose", value: "Size, board colour, and logo" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["bleach-card", "kraft"],
        printing: printStandard,
        finishing: ["No special finishing", "Gloss lamination"],
      }),
      product({
        slug: "pizza-box",
        name: "Pizza box",
        summary: "A square box for a whole pizza or slices.",
        description: "Share the inch size you sell, from a personal pizza to a large. Print can be a simple logo or a full lid design. Board strength is confirmed with the quotation.",
        shape: "food",
        accent: "#8d2f1c",
        material: "corrugated",
        studioPack: "food-box",
        family: "meals",
        specs: [
          { label: "Good for", value: "Whole pizzas and slice boxes" },
          { label: "You choose", value: "Inch size and lid print" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["corrugated", "kraft"],
        printing: printStandard,
        finishing: ["No special finishing"],
      }),
      product({
        slug: "fries-box",
        name: "Fries box",
        summary: "An open-top box for fries, wedges, or loaded fries.",
        description: "A small food box with your brand on the front. Tell us if you need a regular or a large portion. This is a custom print, not a blank stock box.",
        shape: "food",
        accent: "#c4452d",
        material: "bleach-card",
        studioPack: "food-box",
        family: "meals",
        specs: [
          { label: "Good for", value: "Fries, wedges, nuggets" },
          { label: "You choose", value: "Portion size and print" },
          { label: "Price", value: "Quoted after quantity" },
        ],
        materials: ["bleach-card", "kraft"],
        printing: printStandard,
        finishing: ["No special finishing"],
      }),
      product({
        slug: "biryani-box",
        name: "Biryani and rice box",
        summary: "A deeper box for biryani, pulao, and rice meals.",
        description: "Rice meals need more height than a burger. Share how many grams you serve. We quote the box to that size, in kraft or white board, with your name on the lid.",
        shape: "food",
        accent: "#8d6a3f",
        material: "kraft",
        studioPack: "food-box",
        family: "meals",
        specs: [
          { label: "Good for", value: "Biryani, pulao, rice bowls" },
          { label: "You choose", value: "Portion height and board" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["kraft", "bleach-card", "corrugated"],
        printing: printStandard,
        finishing: ["No special finishing", "Matte lamination"],
      }),
      product({
        slug: "snack-box",
        name: "Snack box",
        summary: "A small carton for nimco, chips, dates, or dry snacks.",
        description: "Useful for brands that pack snacks to sell online or in shops. Send the weight you want in one box. Print can be full colour or one colour.",
        shape: "food",
        accent: "#234c38",
        material: "duplex",
        studioPack: "food-box",
        family: "snacks",
        specs: [
          { label: "Good for", value: "Nimco, dry fruit, packed snacks" },
          { label: "You choose", value: "Weight, print, and board" },
          { label: "Price", value: "Quoted after quantity" },
        ],
        materials: ["duplex", "bleach-card", "kraft"],
        printing: printStandard,
        finishing: ["Matte lamination", "Gloss lamination", "No special finishing"],
      }),
      listed({
        slug: "stand-up-pouch",
        name: "Stand-up pouch",
        summary: "A pouch for snacks, tea, spices, or dry food.",
        shape: "printed",
        material: "kraft",
        accent: "#8d6a3f",
        studioPack: "paper-bag",
        fit: "Snacks, nimco, tea, or spices you weigh yourself",
        family: "snacks",
      }),
      listed({
        slug: "sandwich-box",
        name: "Sandwich box",
        summary: "A flat box for a sandwich, wrap, or paratha roll.",
        shape: "food",
        material: "bleach-card",
        accent: "#c4452d",
        studioPack: "food-box",
        fit: "One sandwich, wrap, or roll",
        family: "meals",
        windowed: true,
      }),
      product({
        slug: "cake-box",
        name: "Cake box",
        summary: "A carton sized to the cake, with or without a window.",
        description:
          "A cake box fails when the height is copied from a photograph. Measure the cake as it leaves the bench. A window is a die-cut and is previewed in the studio when die-cutting is selected. Board colour, white or kraft, changes the printed result.",
        shape: "bakery",
        accent: "#c4452d",
        material: "bleach-card",
        studioPack: "bakery-box",
        family: "cakes",
        specs: [
          { label: "Structure", value: "Carton, window optional" },
          { label: "Critical measure", value: "Height of the finished cake" },
          { label: "Pricing", value: "No fixed box price is published" },
        ],
        materials: ["bleach-card", "kraft", "duplex"],
        printing: printStandard,
        finishing: ["Die-cutting", "Matte lamination", "Gloss lamination", "No special finishing"],
      }),
      product({
        slug: "pastry-box",
        name: "Pastry box",
        summary: "A lower carton for pastries, cookies, and confectionery.",
        description:
          "Pastry boxes are usually wider than they are tall. Specify how many pieces sit in one layer and whether a window, a sleeve, or a closing sticker is part of the presentation. Grease resistance should be mentioned if the product needs it.",
        shape: "bakery",
        accent: "#8d6a3f",
        material: "kraft",
        studioPack: "bakery-box",
        family: "pastries",
        specs: [
          { label: "Structure", value: "Low folding carton" },
          { label: "Pieces", value: "Tell us the count and arrangement" },
          { label: "Pricing", value: "Quoted from board, print, and quantity" },
        ],
        materials: ["kraft", "bleach-card", "art-paper"],
        printing: printStandard,
        finishing: ["Die-cutting", "No special finishing", "Matte lamination"],
      }),
      product({
        slug: "bakery-bag",
        name: "Bakery carry bag",
        summary: "A paper bag for loaves and items that do not need a rigid box.",
        description:
          "Not every bakery item wants a box. A printed paper bag is the right brief for bread, cookies by weight, and counter handovers. Specify width, gusset, and height, and say if the bag needs a window patch. The patch is a separate material.",
        shape: "paperbag",
        accent: "#234c38",
        material: "kraft",
        studioPack: "paper-bag",
        family: "carry",
        specs: [
          { label: "Structure", value: "Paper bag" },
          { label: "Dimensions", value: "Width, gusset, and height" },
          { label: "Pricing", value: "Quoted with the handle or closure you choose" },
        ],
        materials: ["kraft", "bleach-card", "art-paper"],
        printing: printStandard,
        finishing: ["No special finishing", "Die-cutting"],
      }),
      product({
        slug: "cupcake-box",
        name: "Cupcake box",
        summary: "A box for 1, 2, 4, 6, or 12 cupcakes. You set the count.",
        description: "Tell us how many cupcakes you sell in one order and whether you want a window. The box is printed with your bakery name. Quantity and size decide the quote.",
        shape: "bakery",
        accent: "#c4452d",
        material: "bleach-card",
        studioPack: "bakery-box",
        family: "cupcakes",
        specs: [
          { label: "Good for", value: "Cupcakes, by the count you sell" },
          { label: "You choose", value: "Count, window, white or kraft" },
          { label: "Price", value: "Quoted after count and quantity" },
        ],
        materials: ["bleach-card", "kraft"],
        printing: printStandard,
        finishing: ["Die-cutting", "No special finishing"],
      }),
      product({
        slug: "brownie-box",
        name: "Brownie box",
        summary: "A low box for brownies, bars, and cookie slabs.",
        description: "A simple custom box for one brownie or a row of them. Add a window if the bake should be seen. Share the tray size you already use.",
        shape: "bakery",
        accent: "#8d6a3f",
        material: "kraft",
        studioPack: "bakery-box",
        family: "pastries",
        specs: [
          { label: "Good for", value: "Brownies, bars, slabs" },
          { label: "You choose", value: "How many pieces, and a window or not" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["kraft", "bleach-card"],
        printing: printStandard,
        finishing: ["Die-cutting", "No special finishing"],
      }),
      product({
        slug: "donut-box",
        name: "Donut box",
        summary: "A box for 2, 4, or 6 donuts.",
        description: "Printed for your shop, sized to the donuts you actually make. A window is optional. Send a photo of the donut if the height is unusual.",
        shape: "bakery",
        accent: "#c4452d",
        material: "bleach-card",
        studioPack: "bakery-box",
        family: "donuts",
        specs: [
          { label: "Good for", value: "Donuts and filled doughnuts" },
          { label: "You choose", value: "2, 4, 6, or your own count" },
          { label: "Price", value: "Quoted after quantity" },
        ],
        materials: ["bleach-card", "kraft"],
        printing: printStandard,
        finishing: ["Die-cutting", "Gloss lamination", "No special finishing"],
      }),
      product({
        slug: "cookie-box",
        name: "Cookie box",
        summary: "A gift-style box for cookies, biscuits, and bakery packs.",
        description: "Works for a shop counter or an online order. Choose kraft for a simple look or white board for brighter print. Tell us the cookie count.",
        shape: "bakery",
        accent: "#234c38",
        material: "kraft",
        studioPack: "bakery-box",
        family: "pastries",
        specs: [
          { label: "Good for", value: "Cookies, biscuits, gift packs" },
          { label: "You choose", value: "Count, kraft or white, window" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["kraft", "bleach-card", "art-paper"],
        printing: printStandard,
        finishing: ["Die-cutting", "Matte lamination", "No special finishing"],
      }),
      product({
        slug: "mithai-box",
        name: "Mithai box",
        summary: "A box for traditional sweets, with your own print.",
        description: "For bakeries and sweet shops that want their name on the box, not a blank carton. Share the kilogram or the piece count. A window and a sticker seal can be added.",
        shape: "bakery",
        accent: "#8d2f1c",
        material: "bleach-card",
        studioPack: "bakery-box",
        family: "sweets",
        specs: [
          { label: "Good for", value: "Mithai, barfi, laddu, mixed sweets" },
          { label: "You choose", value: "Weight or piece count, and print" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["bleach-card", "art-paper", "kraft"],
        printing: printStandard,
        finishing: ["Die-cutting", "Foil stamping", "Matte lamination", "No special finishing"],
      }),
      product({
        slug: "cake-slice-box",
        name: "Cake slice box",
        summary: "A slim box for one slice, a pastry, or a small cake.",
        description: "Useful for delivery of a single slice. Measure the slice height with the frosting. The box can be plain white with a logo or fully printed.",
        shape: "bakery",
        accent: "#c4452d",
        material: "bleach-card",
        studioPack: "bakery-box",
        family: "pastries",
        specs: [
          { label: "Good for", value: "Cake slices and single pastries" },
          { label: "You choose", value: "Slice height and logo or full print" },
          { label: "Price", value: "Quoted after quantity" },
        ],
        materials: ["bleach-card", "kraft"],
        printing: printStandard,
        finishing: ["Die-cutting", "No special finishing"],
      }),
      listed({
        slug: "cake-box-6-inch",
        name: "6 inch cake box",
        summary: "A small cake box, often used for a half-pound cake.",
        shape: "bakery",
        material: "bleach-card",
        accent: "#c4452d",
        studioPack: "bakery-box",
        fit: "About a 6 inch / half-pound cake",
        family: "cakes",
        windowed: true,
      }),
      listed({
        slug: "cake-box-8-inch",
        name: "8 inch cake box",
        summary: "The size most shops use for a 1 pound cake.",
        shape: "bakery",
        material: "bleach-card",
        accent: "#c4452d",
        studioPack: "bakery-box",
        fit: "About an 8 inch / 1 pound cake",
        family: "cakes",
        windowed: true,
      }),
      listed({
        slug: "cake-box-10-inch",
        name: "10 inch cake box",
        summary: "A larger cake box, often for a 2 to 3 pound cake.",
        shape: "bakery",
        material: "bleach-card",
        accent: "#8d2f1c",
        studioPack: "bakery-box",
        fit: "About a 10 inch / 2–3 pound cake",
        family: "cakes",
        windowed: true,
      }),
      listed({
        slug: "cake-box-12-inch",
        name: "12 inch cake box",
        summary: "A wide cake box for a 3 to 4 pound cake.",
        shape: "bakery",
        material: "bleach-card",
        accent: "#161410",
        studioPack: "bakery-box",
        fit: "About a 12 inch / 3–4 pound cake",
        family: "cakes",
        windowed: true,
      }),
      listed({
        slug: "kraft-cake-box",
        name: "Kraft cake box",
        summary: "The same cake box in brown kraft, with your logo.",
        shape: "bakery",
        material: "kraft",
        accent: "#8d6a3f",
        studioPack: "bakery-box",
        fit: "A cake, in a kraft box instead of white",
        family: "cakes",
        windowed: true,
      }),
      listed({
        slug: "cupcake-box-4",
        name: "4 cupcake box",
        summary: "Holds four cupcakes. Add a window if you want them seen.",
        shape: "bakery",
        material: "bleach-card",
        accent: "#c4452d",
        studioPack: "bakery-box",
        fit: "4 cupcakes",
        family: "cupcakes",
        windowed: true,
      }),
      listed({
        slug: "cupcake-box-6",
        name: "6 cupcake box",
        summary: "Holds six cupcakes for a small order or a gift.",
        shape: "bakery",
        material: "bleach-card",
        accent: "#234c38",
        studioPack: "bakery-box",
        fit: "6 cupcakes",
        family: "cupcakes",
        windowed: true,
      }),
      listed({
        slug: "cupcake-box-12",
        name: "12 cupcake box",
        summary: "A larger box for a dozen cupcakes.",
        shape: "bakery",
        material: "bleach-card",
        accent: "#8d2f1c",
        studioPack: "bakery-box",
        fit: "12 cupcakes",
        family: "cupcakes",
        windowed: true,
      }),
      listed({
        slug: "cake-board",
        name: "Cake board",
        summary: "A printed or plain board under the cake, sized to the cake.",
        shape: "printed",
        material: "duplex",
        accent: "#8d6a3f",
        studioPack: "labels",
        fit: "The cake diameter you already use, plus a little extra",
        family: "carry",
      }),
      listed({
        slug: "wedding-favour-box",
        name: "Wedding favour box",
        summary: "A small printed box for mehndi, baraat, or wedding favours.",
        shape: "bakery",
        material: "art-paper",
        accent: "#8d2f1c",
        studioPack: "bakery-box",
        fit: "One favour: sweets, dates, or a small gift",
        family: "sweets",
      }),
    ],
  },
  {
    slug: "cosmetics-packaging",
    name: "Cosmetics Packaging",
    short: "Cartons and rigid boxes for beauty products",
    description:
      "Cosmetic packaging for skincare, fragrance, and colour cosmetics. Folding cartons and rigid boxes are specified around the container, including the cap.",
    seoDescription:
      "Cosmetic packaging in Pakistan: folding cartons, rigid boxes, and labels for skincare and beauty brands. Request a quotation.",
    shape: "cosmetic",
    accent: "#8d2f1c",
    material: "art-paper",
    studioPack: "cosmetic-box",
    materials: ["art-paper", "rigid", "bleach-card", "coated"],
    customizations: ["Fit to the container and cap", "Rigid or folding structure", "Foil, emboss, and lamination", "Labels if there is no outer carton"],
    products: [
      product({
        slug: "cosmetic-carton",
        name: "Cosmetic carton",
        summary: "A tall folding carton for bottles, tubes, and jars.",
        description:
          "Measure the container with the cap on. Cosmetic cartons often include a finish: matte lamination, a spot gloss, or a foil stamp. The studio previews those choices so the quotation can name them. Screen colour is not a press approval.",
        shape: "cosmetic",
        accent: "#c4452d",
        material: "art-paper",
        studioPack: "cosmetic-box",
        specs: [
          { label: "Structure", value: "Folding carton" },
          { label: "Fit", value: "Container plus cap" },
          { label: "Pricing", value: "Finishes are itemised in the quotation" },
        ],
        materials: ["art-paper", "bleach-card", "duplex"],
        printing: printStandard,
        finishing: finishCarton,
      }),
      product({
        slug: "rigid-beauty-box",
        name: "Rigid beauty box",
        summary: "A lid-and-base box for sets and products that should feel weighty.",
        description:
          "Rigid board is a different build from a folding carton. The wrap can be printed or plain, and the lid can carry foil or an emboss. Tell us if the interior needs a fitment. A fitment is part of the specification, not a surprise.",
        shape: "rigid",
        accent: "#2c2824",
        material: "rigid",
        studioPack: "rigid-box",
        specs: [
          { label: "Structure", value: "Set-up lid and base" },
          { label: "Interior", value: "Request a fitment if the product should not move" },
          { label: "Pricing", value: "Quoted as a rigid build, not as a folding carton" },
        ],
        materials: ["rigid", "art-paper", "specialty"],
        printing: printStandard,
        finishing: ["Foil stamping", "Embossing", "Debossing", "Matte lamination", "No special finishing"],
      }),
      product({
        slug: "jar-label-set",
        name: "Jar and bottle labels",
        summary: "Labels for cosmetics that live on the container itself.",
        description:
          "Some products should not have an outer carton. A coated label, a seal sticker, and clear type can be the whole pack. Name the container material so the adhesive can be discussed. Adhesive is confirmed in the quotation.",
        shape: "label",
        accent: "#8d6a3f",
        material: "coated",
        studioPack: "labels",
        specs: [
          { label: "Structure", value: "Cut label" },
          { label: "Surface", value: "Tell us what the label sticks to" },
          { label: "Pricing", value: "Quoted from size, material, and quantity" },
        ],
        materials: ["coated", "art-paper", "specialty"],
        printing: printStandard,
        finishing: ["Gloss lamination", "Matte lamination", "Spot UV", "Foil stamping", "No special finishing"],
      }),
      product({
        slug: "soap-box",
        name: "Soap box",
        summary: "A small carton for a soap bar, with your brand on the face.",
        description: "Measure the bar. The box can be a simple tuck carton in white or kraft, printed with the soap name and scent. A good starting pack for a new skincare brand.",
        shape: "cosmetic",
        accent: "#234c38",
        material: "art-paper",
        studioPack: "cosmetic-box",
        specs: [
          { label: "Good for", value: "Soap bars and small bars" },
          { label: "You choose", value: "Bar size and print" },
          { label: "Price", value: "Quoted after quantity" },
        ],
        materials: ["art-paper", "bleach-card", "kraft"],
        printing: printStandard,
        finishing: ["Matte lamination", "No special finishing"],
      }),
      product({
        slug: "perfume-box",
        name: "Perfume box",
        summary: "A tall box for a perfume or attar bottle.",
        description: "Measure the bottle with the cap. The carton can stay simple or add a matte finish or a foil logo. Send the bottle size and we quote the box.",
        shape: "cosmetic",
        accent: "#161410",
        material: "art-paper",
        studioPack: "cosmetic-box",
        specs: [
          { label: "Good for", value: "Perfume, attar, and body mist bottles" },
          { label: "You choose", value: "Bottle size, matte or foil" },
          { label: "Price", value: "Quoted after finish and quantity" },
        ],
        materials: ["art-paper", "rigid", "bleach-card"],
        printing: printStandard,
        finishing: ["Matte lamination", "Foil stamping", "Embossing", "No special finishing"],
      }),
      product({
        slug: "lipstick-box",
        name: "Lipstick box",
        summary: "A slim carton for lipstick, lip balm, or a lip tint.",
        description: "A small custom box for colour cosmetics. Share the tube size. Print can be one strong colour or a full design.",
        shape: "cosmetic",
        accent: "#c4452d",
        material: "art-paper",
        studioPack: "cosmetic-box",
        specs: [
          { label: "Good for", value: "Lipstick, lip balm, tints" },
          { label: "You choose", value: "Tube size and colours" },
          { label: "Price", value: "Quoted after quantity" },
        ],
        materials: ["art-paper", "bleach-card"],
        printing: printStandard,
        finishing: ["Matte lamination", "Gloss lamination", "Foil stamping", "No special finishing"],
      }),
      product({
        slug: "cream-box",
        name: "Cream and serum box",
        summary: "A carton for a jar, tube, or dropper bottle.",
        description: "For face cream, serum, or lotion. Measure the container with the lid. Most brands start with a folding carton. A rigid box is a separate choice if the product is a gift set.",
        shape: "cosmetic",
        accent: "#8d6a3f",
        material: "art-paper",
        studioPack: "cosmetic-box",
        specs: [
          { label: "Good for", value: "Creams, serums, lotions" },
          { label: "You choose", value: "Jar or bottle size, and finish" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["art-paper", "bleach-card", "duplex"],
        printing: printStandard,
        finishing: finishCarton,
      }),
      product({
        slug: "skincare-set-box",
        name: "Skincare set box",
        summary: "One box for two or three products sold together.",
        description: "List what goes inside, such as a cleanser and a cream. The box can be a folding carton or a rigid lid-and-base. We quote them as different builds.",
        shape: "rigid",
        accent: "#2c2824",
        material: "rigid",
        studioPack: "rigid-box",
        specs: [
          { label: "Good for", value: "Sets and gift kits" },
          { label: "You choose", value: "What is inside, folding or rigid" },
          { label: "Price", value: "Quoted as the build you pick" },
        ],
        materials: ["rigid", "art-paper"],
        printing: printStandard,
        finishing: ["Foil stamping", "Matte lamination", "Embossing", "No special finishing"],
      }),
      product({
        slug: "makeup-kit-box",
        name: "Makeup kit box",
        summary: "A box for a palette, brushes, or a small makeup kit.",
        description: "Share the palette size or a photo of the kit. Print can carry the shade range on the back and the brand on the front. No price is shown until the size is known.",
        shape: "cosmetic",
        accent: "#8d2f1c",
        material: "art-paper",
        studioPack: "cosmetic-box",
        specs: [
          { label: "Good for", value: "Palettes, kits, brush sets" },
          { label: "You choose", value: "Kit size and front design" },
          { label: "Price", value: "Quoted after size and quantity" },
        ],
        materials: ["art-paper", "rigid", "duplex"],
        printing: printStandard,
        finishing: finishCarton,
      }),
    ],
  },
  {
    slug: "pharmaceutical-packaging",
    name: "Pharmaceutical Packaging",
    short: "Cartons and labels with your approved text",
    description:
      "Pharmaceutical packaging for cartons and labels. Bring approved artwork. This page does not claim a pharmaceutical licence or regulatory approval.",
    seoDescription:
      "Pharmaceutical packaging cartons and labels in Pakistan, printed to your approved artwork. Quotation-based. No licence is claimed on this site.",
    shape: "carton",
    accent: "#234c38",
    material: "duplex",
    studioPack: "folding-carton",
    materials: ["duplex", "bleach-card", "art-paper", "coated"],
    customizations: ["Approved regulatory artwork", "Readable type and panels", "Leaflets only if you supply the specification", "Outer shippers as a separate line"],
    products: [
      product({
        slug: "medicine-carton",
        name: "Medicine carton",
        summary: "A folding carton for a bottle, blister, or tube.",
        description:
          "The carton has to fit the primary pack and carry the text you are required to show. PACKNEXT prints to artwork you approve. We do not write medical claims and we do not claim a pharmaceutical manufacturing licence here. Batch coding and tamper evidence must be requested if you need them.",
        shape: "carton",
        accent: "#234c38",
        material: "duplex",
        studioPack: "folding-carton",
        specs: [
          { label: "Structure", value: "Folding carton" },
          { label: "Artwork", value: "Supplied and approved by your team" },
          { label: "Compliance", value: "Remains with the brand. Not certified on this website." },
        ],
        materials: ["duplex", "bleach-card", "art-paper"],
        printing: printStandard,
        finishing: ["No special finishing", "Matte lamination", "Gloss lamination"],
      }),
      product({
        slug: "pharma-label",
        name: "Container label",
        summary: "A label for a bottle or jar, set in the type size your artwork needs.",
        description:
          "Small pharmaceutical labels fail when the type is reduced to fit a guess. Specify the label size and supply the artwork at that size. The label material and adhesive are confirmed against the container.",
        shape: "label",
        accent: "#161410",
        material: "coated",
        studioPack: "labels",
        specs: [
          { label: "Structure", value: "Label" },
          { label: "Type", value: "Do not assume small text will remain readable" },
          { label: "Pricing", value: "Quoted from size, stock, and quantity" },
        ],
        materials: ["coated", "art-paper", "specialty"],
        printing: printStandard,
        finishing: ["No special finishing", "Matte lamination"],
      }),
      product({
        slug: "pharma-outer",
        name: "Wholesale outer",
        summary: "A corrugated outer for a stated number of unit cartons.",
        description:
          "The shipping carton is not the same job as the unit carton. Share how many units it holds and how it will be stacked. Print can be limited to identification if the retail face is already on the unit.",
        shape: "industrial",
        accent: "#8d6a3f",
        material: "corrugated",
        studioPack: "corrugated-box",
        specs: [
          { label: "Structure", value: "Corrugated outer" },
          { label: "Count", value: "Units per outer, supplied by you" },
          { label: "Board", value: "Grade follows weight and stacking, confirmed in the quote" },
        ],
        materials: ["corrugated"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing"],
      }),
    ],
  },
  {
    slug: "retail-packaging",
    name: "Retail Packaging",
    short: "The pack on the shelf and the pack in the back room",
    description:
      "Retail packaging for products that have to explain themselves on a shelf and survive the trip from a warehouse. Unit packs and trade outers can be quoted together.",
    seoDescription:
      "Retail packaging and custom printed boxes in Pakistan for shelf products, gifts, and wholesale outers.",
    shape: "printed",
    accent: "#c4452d",
    material: "art-paper",
    studioPack: "folding-carton",
    materials: ["art-paper", "bleach-card", "duplex", "rigid", "corrugated"],
    customizations: ["Shelf-facing print", "Hang or stack behaviour", "Trade carton quantity", "Campaign sleeves"],
    products: [
      product({
        slug: "shelf-carton",
        name: "Shelf carton",
        summary: "A printed unit carton for a product sold from a shelf.",
        description:
          "Decide what the shopper must read in the first glance, then what can sit on the side panels. PACKNEXT will not invent claims about your product. The structure is a folding carton unless you ask for rigid board.",
        shape: "printed",
        accent: "#c4452d",
        material: "art-paper",
        studioPack: "folding-carton",
        specs: [
          { label: "Structure", value: "Folding retail carton" },
          { label: "Panels", value: "Front, sides, and optional back copy" },
          { label: "Pricing", value: "Quoted in PKR from the full specification" },
        ],
        materials: ["art-paper", "bleach-card", "duplex"],
        printing: [...printStandard, "Double-sided printing"],
        finishing: finishCarton,
      }),
      product({
        slug: "gift-carton",
        name: "Gift carton",
        summary: "A more deliberate unboxing for products given as gifts.",
        description:
          "A gift carton can be a folding box with a finish or a rigid box. Choose based on the weight you want in the hand and the quantity you actually sell. Seasonal artwork should be named as its own version.",
        shape: "rigid",
        accent: "#8d6a3f",
        material: "rigid",
        studioPack: "rigid-box",
        specs: [
          { label: "Structure", value: "Folding or rigid, chosen in the brief" },
          { label: "Finish", value: "Lamination, foil, or emboss on request" },
          { label: "Pricing", value: "The structure changes the quote" },
        ],
        materials: ["rigid", "art-paper", "bleach-card"],
        printing: printStandard,
        finishing: finishCarton,
      }),
      product({
        slug: "trade-carton",
        name: "Trade carton",
        summary: "The outer that a shop or distributor receives.",
        description:
          "Print the information a warehouse needs: product, count, and handling if you require it. This is usually corrugated. It can sit alongside a fully printed retail unit in the same quotation.",
        shape: "industrial",
        accent: "#a8844e",
        material: "corrugated",
        studioPack: "corrugated-box",
        specs: [
          { label: "Structure", value: "Corrugated trade carton" },
          { label: "Print", value: "Identification, or fuller print if the outer is seen" },
          { label: "Pricing", value: "Quoted separately from the retail unit" },
        ],
        materials: ["corrugated", "kraft"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing"],
      }),
    ],
  },
  {
    slug: "shopping-bags",
    name: "Shopping Bags",
    short: "Carried bags for shops and events",
    description:
      "Shopping bags with your print, in the width, gusset, and height your products need. Handles and board or paper weight are part of the quotation.",
    seoDescription:
      "Custom shopping bags in Pakistan. Specify size, paper, handles, and print, then request a quotation from PACKNEXT.",
    shape: "bag",
    accent: "#161410",
    material: "kraft",
    studioPack: "shopping-bag",
    materials: ["kraft", "art-paper", "bleach-card", "coated"],
    customizations: ["Width, gusset, and height", "Handle type", "One or both faces printed", "Reinforced base on request"],
    products: [
      product({
        slug: "twist-handle-bag",
        name: "Twist-handle shopping bag",
        summary: "A paper shopping bag with twisted paper handles.",
        description:
          "A shop bag is specified by the largest item a customer might carry, not by a fashion photograph. Twisted handles, print coverage, and paper weight change the quote. Say if the bag is for clothing, a hamper, or a mixed retail purchase.",
        shape: "bag",
        accent: "#c4452d",
        material: "kraft",
        studioPack: "shopping-bag",
        specs: [
          { label: "Structure", value: "Shopping bag with twisted handles" },
          { label: "Dimensions", value: "Width, gusset, height" },
          { label: "Pricing", value: "Handles and paper are part of the quote" },
        ],
        materials: ["kraft", "art-paper", "bleach-card"],
        printing: printStandard,
        finishing: ["No special finishing", "Matte lamination", "Gloss lamination"],
      }),
      product({
        slug: "flat-handle-bag",
        name: "Flat-handle bag",
        summary: "A bag with flat tape handles and a broad print face.",
        description:
          "Flat handles change the construction and the way the bag sits in the hand. Use this direction when the face of the bag is a poster for the brand. Full-bleed print and a single-colour mark are both valid. They will not cost the same.",
        shape: "bag",
        accent: "#234c38",
        material: "art-paper",
        studioPack: "shopping-bag",
        specs: [
          { label: "Structure", value: "Flat-handle shopping bag" },
          { label: "Print", value: "One face or both" },
          { label: "Pricing", value: "Quoted from size, paper, and print" },
        ],
        materials: ["art-paper", "kraft", "coated"],
        printing: [...printStandard, "Double-sided printing"],
        finishing: ["Matte lamination", "Gloss lamination", "No special finishing"],
      }),
      product({
        slug: "event-bag",
        name: "Event and launch bag",
        summary: "A short-quantity conversation for launches, press kits, and pop-ups.",
        description:
          "Event bags are still custom bags. The difference is the quantity and the speed you need. Write both in the request. This page does not promise a turnaround. The quotation will.",
        shape: "bag",
        accent: "#8d6a3f",
        material: "kraft",
        studioPack: "shopping-bag",
        specs: [
          { label: "Structure", value: "Shopping bag" },
          { label: "Quantity", value: "State the event quantity honestly" },
          { label: "Timing", value: "Confirmed in the quotation, not on this page" },
        ],
        materials: ["kraft", "art-paper"],
        printing: printStandard,
        finishing: ["No special finishing", "Foil stamping"],
      }),
    ],
  },
  {
    slug: "paper-bags",
    name: "Paper Bags",
    short: "Counter bags and carriers",
    description:
      "Paper bags for bakeries, groceries, pharmacies, and retail counters. Smaller than a ceremony, specific about size and print.",
    seoDescription:
      "Paper bags manufacturing enquiries in Pakistan. Custom printed kraft and white paper bags, quoted to size and quantity.",
    shape: "paperbag",
    accent: "#a8844e",
    material: "kraft",
    studioPack: "paper-bag",
    materials: ["kraft", "bleach-card", "art-paper"],
    customizations: ["Counter or carrier size", "Gusset", "Print in one or more colours", "Optional window, confirmed as a material"],
    products: [
      product({
        slug: "sos-bag",
        name: "SOS paper bag",
        summary: "A self-opening satchel bag for counters and takeaway.",
        description:
          "The SOS bag stands open on a counter. Specify the litre or the millimetre size you need, the paper, and whether the print is a small mark or a full face. Greasy food should be mentioned so the paper can be discussed properly.",
        shape: "paperbag",
        accent: "#a8844e",
        material: "kraft",
        studioPack: "paper-bag",
        specs: [
          { label: "Structure", value: "Self-opening satchel" },
          { label: "Paper", value: "Kraft or white, weight confirmed in the quote" },
          { label: "Pricing", value: "No catalogue rate is published" },
        ],
        materials: ["kraft", "bleach-card"],
        printing: printStandard,
        finishing: ["No special finishing"],
      }),
      product({
        slug: "merchandise-bag",
        name: "Merchandise bag",
        summary: "A flat-bottom paper bag for lighter retail goods.",
        description:
          "Use a merchandise bag when the product is light and the bag is the brand carrier. It is not a substitute for a rigid mailer. If the product is fragile, say so and consider a box instead.",
        shape: "paperbag",
        accent: "#c4452d",
        material: "art-paper",
        studioPack: "paper-bag",
        specs: [
          { label: "Structure", value: "Flat-bottom paper bag" },
          { label: "Best for", value: "Light retail goods" },
          { label: "Pricing", value: "Quoted with the handle style" },
        ],
        materials: ["art-paper", "kraft", "bleach-card"],
        printing: printStandard,
        finishing: ["No special finishing", "Matte lamination"],
      }),
      product({
        slug: "prescription-bag",
        name: "Counter bag with privacy print",
        summary: "A discreet bag for pharmacies and clinics that still carries the brand.",
        description:
          "Some bags should be quiet. A single colour, a small wordmark, and an opaque paper can be the whole design. Do not put patient information in the artwork. This is a bag specification, not a medical service.",
        shape: "paperbag",
        accent: "#234c38",
        material: "bleach-card",
        studioPack: "paper-bag",
        specs: [
          { label: "Structure", value: "Paper counter bag" },
          { label: "Print", value: "Often single colour" },
          { label: "Privacy", value: "No patient data in the print" },
        ],
        materials: ["bleach-card", "kraft"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing"],
      }),
    ],
  },
  {
    slug: "labels",
    name: "Labels",
    short: "The print that stays on the product",
    description:
      "Custom labels for jars, bottles, cartons, and shipping information. Size, adhesive, and the surface they stick to are the specification.",
    seoDescription:
      "Custom stickers and labels in Pakistan for products, jars, cartons, and shipping. Quotation-based label printing.",
    shape: "label",
    accent: "#161410",
    material: "coated",
    studioPack: "labels",
    materials: ["coated", "art-paper", "specialty"],
    customizations: ["Cut size in millimetres", "Face stock", "Adhesive discussed against the surface", "Roll or sheet, confirmed in the quote"],
    products: [
      product({
        slug: "product-label",
        name: "Product label",
        summary: "A front or wrap label for a retail product.",
        description:
          "A product label has to carry the name, the variant, and whatever else your brand must show, at a size where it can be read. Specify the container. A wrap label and a front label are different cuts.",
        shape: "label",
        accent: "#c4452d",
        material: "coated",
        studioPack: "labels",
        specs: [
          { label: "Structure", value: "Cut label" },
          { label: "Application", value: "Name the container and whether it is a wrap" },
          { label: "Pricing", value: "Quoted from size, stock, and quantity" },
        ],
        materials: ["coated", "art-paper"],
        printing: printStandard,
        finishing: ["Gloss lamination", "Matte lamination", "Spot UV", "Foil stamping", "No special finishing"],
      }),
      product({
        slug: "jar-label",
        name: "Jar and bottle label",
        summary: "Labels for round containers, including the curve.",
        description:
          "Round containers change how a rectangular design looks. Share the diameter and the printable height. If the product is refrigerated or oily, say so, because the adhesive conversation starts there.",
        shape: "label",
        accent: "#8d6a3f",
        material: "coated",
        studioPack: "labels",
        specs: [
          { label: "Structure", value: "Label for a curved surface" },
          { label: "Measure", value: "Diameter and label height" },
          { label: "Adhesive", value: "Confirmed against the surface and conditions" },
        ],
        materials: ["coated", "specialty", "art-paper"],
        printing: printStandard,
        finishing: ["Matte lamination", "Gloss lamination", "No special finishing"],
      }),
      product({
        slug: "information-label",
        name: "Carton and shipping label",
        summary: "An identifying label when the pack itself stays plain.",
        description:
          "Not every carton needs to be fully printed. A label can carry the product name, the count, and a barcode while the board stays plain. This is often the economical line next to a printed retail face.",
        shape: "label",
        accent: "#234c38",
        material: "art-paper",
        studioPack: "labels",
        specs: [
          { label: "Structure", value: "Applied label" },
          { label: "Content", value: "Identification, not a decoration by default" },
          { label: "Pricing", value: "Usually a different quote from a full carton print" },
        ],
        materials: ["art-paper", "coated"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing"],
      }),
    ],
  },
  {
    slug: "stickers",
    name: "Stickers",
    short: "Seals, marks, and shaped cuts",
    description:
      "Custom stickers for seals, promotions, packaging closures, and brand marks. Shape, size, and the surface they stick to define the job.",
    seoDescription:
      "Custom stickers and labels in Pakistan. Die-cut seals, sheets, and brand marks, quoted to size and quantity.",
    shape: "sticker",
    accent: "#c4452d",
    material: "coated",
    studioPack: "stickers",
    materials: ["coated", "art-paper", "specialty"],
    customizations: ["Circle, rectangle, or a described custom outline", "Cut size", "Single or full colour", "Permanent or removable, confirmed per surface"],
    products: [
      product({
        slug: "die-cut-sticker",
        name: "Die-cut sticker",
        summary: "A sticker cut to a shape you specify.",
        description:
          "A die-cut sticker follows an outline. Send the shape with the artwork, or describe it and accept that the outline will be drawn before production. Size is the cut size, not the size of the design inside the margin.",
        shape: "sticker",
        accent: "#c4452d",
        material: "coated",
        studioPack: "stickers",
        specs: [
          { label: "Structure", value: "Die-cut sticker" },
          { label: "Artwork", value: "Include the cut path if you have one" },
          { label: "Pricing", value: "Shape and quantity both matter" },
        ],
        materials: ["coated", "art-paper", "specialty"],
        printing: printStandard,
        finishing: ["Gloss lamination", "Matte lamination", "No special finishing"],
      }),
      product({
        slug: "seal-sticker",
        name: "Seal sticker",
        summary: "A small sticker that closes a box, bag, or wrap.",
        description:
          "Seals are doing a job: they close the pack and carry a short mark. Specify the diameter or the rectangle, and the surface it must hold. A seal is often single colour. Full colour is available when the artwork needs it.",
        shape: "sticker",
        accent: "#8d6a3f",
        material: "coated",
        studioPack: "stickers",
        specs: [
          { label: "Structure", value: "Small closure sticker" },
          { label: "Typical role", value: "Close a carton, bag, or tissue wrap" },
          { label: "Pricing", value: "Quoted from size and quantity" },
        ],
        materials: ["coated", "art-paper"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing", "Gloss lamination"],
      }),
      product({
        slug: "sticker-sheet",
        name: "Sticker sheet",
        summary: "Several stickers arranged on one sheet.",
        description:
          "Sheets suit variety packs, thank-you sets, and labels a team will peel by hand. Tell us how many designs sit on a sheet and whether they are the same shape. Kiss-cut versus a through-cut can be confirmed in the quotation.",
        shape: "sticker",
        accent: "#234c38",
        material: "art-paper",
        studioPack: "stickers",
        specs: [
          { label: "Structure", value: "Sheet of stickers" },
          { label: "Layout", value: "Count and shapes per sheet" },
          { label: "Pricing", value: "Quoted from the sheet, not from a guessed unit rate" },
        ],
        materials: ["art-paper", "coated"],
        printing: printStandard,
        finishing: ["No special finishing", "Matte lamination"],
      }),
    ],
  },
  {
    slug: "clothing-tags",
    name: "Clothing Tags",
    short: "Swing tags and printed tickets",
    description:
      "Clothing tags for fashion and apparel brands: swing tags, size tickets, and sticker seals. These are printed paper and board tags. Woven label looms are not claimed here.",
    seoDescription:
      "Custom clothing tags and swing tickets in Pakistan for fashion brands. Printed board tags, quoted to size and quantity.",
    shape: "tag",
    accent: "#161410",
    material: "art-paper",
    studioPack: "labels",
    materials: ["art-paper", "duplex", "coated", "bleach-card"],
    customizations: ["Hole, slot, or no punch", "One or both sides", "String is requested separately", "Size tickets and swing tags as a set"],
    products: [
      product({
        slug: "swing-tag",
        name: "Swing tag",
        summary: "A board tag that hangs from a garment.",
        description:
          "A swing tag is a small piece of print with a physical job. Specify the board, the hole or slot, and whether both sides are printed. If you want string or a pin, ask for it. It is not included by silence.",
        shape: "tag",
        accent: "#c4452d",
        material: "art-paper",
        studioPack: "labels",
        specs: [
          { label: "Structure", value: "Printed board tag" },
          { label: "Attachment", value: "Hole or slot. Fastener specified separately." },
          { label: "Not included", value: "Woven neck labels are not offered as a loom service here." },
        ],
        materials: ["art-paper", "duplex", "bleach-card"],
        printing: [...printStandard, "Double-sided printing"],
        finishing: ["Matte lamination", "Foil stamping", "Embossing", "No special finishing"],
      }),
      product({
        slug: "size-ticket",
        name: "Size ticket",
        summary: "A small printed ticket for size, price, or care information you choose to show.",
        description:
          "Size tickets are a quantity game and a readability game. Set the type large enough for the ticket you are actually printing. Care text should come from you. This website will not invent care symbols for a fabric.",
        shape: "tag",
        accent: "#161410",
        material: "coated",
        studioPack: "labels",
        specs: [
          { label: "Structure", value: "Small printed ticket" },
          { label: "Content", value: "Supplied by the brand" },
          { label: "Pricing", value: "Quoted with the swing tags if they are one order" },
        ],
        materials: ["coated", "art-paper"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing"],
      }),
      product({
        slug: "garment-seal",
        name: "Garment seal",
        summary: "A sticker seal for tissue, poly mailers, or a wrapped garment.",
        description:
          "When a tag is too much, a seal might be enough. Specify the surface. A sticker that holds on tissue may not be the same sticker that holds on a mailer.",
        shape: "sticker",
        accent: "#8d6a3f",
        material: "coated",
        studioPack: "stickers",
        specs: [
          { label: "Structure", value: "Sticker seal" },
          { label: "Surface", value: "Name what it sticks to" },
          { label: "Pricing", value: "Quoted as a sticker, not as a swing tag" },
        ],
        materials: ["coated", "art-paper"],
        printing: printStandard,
        finishing: ["No special finishing", "Gloss lamination"],
      }),
    ],
  },
  {
    slug: "hardware-packaging",
    name: "Hardware Packaging",
    short: "Cartons and labels for parts and sets",
    description:
      "Hardware packaging for parts, fittings, and retail sets. Strength follows weight. Print follows how the product is identified on a shelf or in a bin.",
    seoDescription:
      "Hardware packaging boxes and labels in Pakistan for parts, fittings, and retail sets. Custom sizes, quoted to weight and quantity.",
    shape: "hardware",
    accent: "#8d6a3f",
    material: "corrugated",
    studioPack: "corrugated-box",
    materials: ["corrugated", "duplex", "kraft", "coated"],
    customizations: ["Product weight", "Retail print or plain outer", "Part number and barcode placement", "Dividers only if requested"],
    products: [
      product({
        slug: "parts-carton",
        name: "Parts carton",
        summary: "A corrugated carton for hardware parts and fittings.",
        description:
          "Share the weight, whether the parts are loose or bagged, and if anything is sharp or oily. The board is then a recommendation in the quotation, not a number invented on this page. Print can be a single colour part name or a fuller retail face.",
        shape: "hardware",
        accent: "#a8844e",
        material: "corrugated",
        studioPack: "corrugated-box",
        specs: [
          { label: "Structure", value: "Corrugated carton" },
          { label: "Needed from you", value: "Weight and how the parts are packed inside" },
          { label: "Board grade", value: "Confirmed in the quotation" },
        ],
        materials: ["corrugated", "kraft"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing"],
      }),
      product({
        slug: "hardware-shelf-pack",
        name: "Retail hardware carton",
        summary: "A printed pack for hardware sold as a set from a shelf.",
        description:
          "A retail set needs the contents listed honestly and a board that matches the weight of the set. If you also ship a bulk outer, add it as a second line so retail print is not used on every warehouse carton.",
        shape: "hardware",
        accent: "#c4452d",
        material: "duplex",
        studioPack: "folding-carton",
        specs: [
          { label: "Structure", value: "Printed retail carton or a corrugated shelf pack" },
          { label: "Contents", value: "List the set" },
          { label: "Pricing", value: "Retail pack and bulk outer can be two lines" },
        ],
        materials: ["duplex", "corrugated", "bleach-card"],
        printing: printStandard,
        finishing: ["No special finishing", "Gloss lamination", "Matte lamination"],
      }),
      product({
        slug: "hardware-label",
        name: "Bin and carton label",
        summary: "Labels for part numbers when the carton stays plain.",
        description:
          "Distributors often need a clean label more than a fully printed box. Specify the label size, the barcode, and whether the label is applied by you or needs to be supplied in sheets or rolls. The supply format is confirmed in the quote.",
        shape: "label",
        accent: "#161410",
        material: "coated",
        studioPack: "labels",
        specs: [
          { label: "Structure", value: "Identification label" },
          { label: "Data", value: "Part numbers come from your artwork" },
          { label: "Format", value: "Sheets or rolls, confirmed per job" },
        ],
        materials: ["coated", "art-paper"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing"],
      }),
    ],
  },
  {
    slug: "machinery-packaging",
    name: "Machinery Packaging",
    short: "Outers and labels for components and equipment",
    description:
      "Packaging for machinery components and industrial equipment. Protection and identification come before decoration. Load ratings are not invented here.",
    seoDescription:
      "Machinery and component packaging in Pakistan. Corrugated outers and labels specified from the product weight and handling.",
    shape: "machinery",
    accent: "#3a342c",
    material: "corrugated",
    studioPack: "corrugated-box",
    materials: ["corrugated", "kraft", "coated"],
    customizations: ["Weight and handling", "Scratch-sensitive surfaces", "Identification panels", "Multi-part kits"],
    products: [
      product({
        slug: "component-carton",
        name: "Component carton",
        summary: "An outer for a component or sub-assembly.",
        description:
          "Describe how the component is lifted and whether its surface can be marked. The carton size should include any protective wrap you already use. Print is typically identification: name, code, and handling marks you supply.",
        shape: "machinery",
        accent: "#3a342c",
        material: "corrugated",
        studioPack: "corrugated-box",
        specs: [
          { label: "Structure", value: "Corrugated outer" },
          { label: "Handling", value: "Describe lifting and stacking" },
          { label: "Ratings", value: "Not published. Board is confirmed per product." },
        ],
        materials: ["corrugated"],
        printing: ["Single-colour printing", "Custom artwork", "CMYK printing"],
        finishing: ["No special finishing"],
      }),
      product({
        slug: "kit-carton",
        name: "Kit carton",
        summary: "One outer for a machinery kit with several parts.",
        description:
          "A kit needs a list. The carton can be plain, with a printed contents label, or printed in full if the kit is sold onward. Dividers and bags inside the carton are separate lines. Ask for them if parts should not touch.",
        shape: "machinery",
        accent: "#8d6a3f",
        material: "corrugated",
        studioPack: "corrugated-box",
        specs: [
          { label: "Structure", value: "Outer carton plus optional internal organisation" },
          { label: "List", value: "Include the parts list in the notes" },
          { label: "Pricing", value: "Internals are itemised" },
        ],
        materials: ["corrugated", "kraft"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing"],
      }),
      product({
        slug: "equipment-label",
        name: "Equipment label",
        summary: "A durable identification label for a machine or a crate.",
        description:
          "When the crate is plain, the label does the speaking. Specify the surface, indoor or outdoor conditions, and the information that must remain readable. Material is confirmed for those conditions rather than assumed.",
        shape: "label",
        accent: "#c4452d",
        material: "specialty",
        studioPack: "labels",
        specs: [
          { label: "Structure", value: "Identification label" },
          { label: "Conditions", value: "Tell us about abrasion, weather, or oils" },
          { label: "Pricing", value: "Stock depends on those conditions" },
        ],
        materials: ["specialty", "coated"],
        printing: ["Single-colour printing", "CMYK printing", "Custom artwork"],
        finishing: ["No special finishing", "Matte lamination"],
      }),
    ],
  },
  {
    slug: "industrial-packaging",
    name: "Industrial Packaging",
    short: "Master cartons and printed outers",
    description:
      "Industrial packaging for goods that move in bulk. Corrugated outers, printed or plain, specified from the unit count and the journey.",
    seoDescription:
      "Industrial packaging and corrugated boxes in Pakistan for master cartons and printed outers. Quotation-based, no invented load ratings.",
    shape: "industrial",
    accent: "#8d6a3f",
    material: "corrugated",
    studioPack: "corrugated-box",
    materials: ["corrugated", "kraft", "specialty"],
    customizations: ["Units per carton", "Stacking description", "Print level", "Export marks supplied in your artwork"],
    products: [
      product({
        slug: "master-carton",
        name: "Master carton",
        summary: "A bulk carton that holds a stated number of units.",
        description:
          "The master carton is sized from the unit pack and the count. Share both. Flute and ply are recommendations in the quotation after the weight is known. This page does not publish a strength rating.",
        shape: "industrial",
        accent: "#a8844e",
        material: "corrugated",
        studioPack: "corrugated-box",
        specs: [
          { label: "Structure", value: "Corrugated master carton" },
          { label: "Count", value: "Units per carton, from you" },
          { label: "Strength", value: "Specified in the quotation, not as a site-wide rating" },
        ],
        materials: ["corrugated"],
        printing: ["Single-colour printing", "Custom artwork", "CMYK printing"],
        finishing: ["No special finishing"],
      }),
      product({
        slug: "printed-outer",
        name: "Printed industrial outer",
        summary: "An outer that is seen by a buyer, not only by a warehouse.",
        description:
          "Some industrial products are sold onward in the outer carton. Then the print has to be more than a code. Specify the brand panel and the handling marks separately so the functional print is not lost in the decoration.",
        shape: "industrial",
        accent: "#c4452d",
        material: "corrugated",
        studioPack: "corrugated-box",
        specs: [
          { label: "Structure", value: "Printed corrugated outer" },
          { label: "Artwork", value: "Brand panel and handling information" },
          { label: "Pricing", value: "Print coverage changes the quote" },
        ],
        materials: ["corrugated", "kraft"],
        printing: printStandard,
        finishing: ["No special finishing"],
      }),
      product({
        slug: "plain-shipper",
        name: "Plain shipper with label",
        summary: "An unprinted carton plus a label, when full print is unnecessary.",
        description:
          "A plain shipper is a valid industrial choice. Pair it with a label if the carton still has to be identified. Asking for both in one request keeps the quotation comparable with a fully printed outer.",
        shape: "industrial",
        accent: "#3a342c",
        material: "corrugated",
        studioPack: "corrugated-box",
        specs: [
          { label: "Structure", value: "Plain corrugated carton" },
          { label: "Identification", value: "Optional label" },
          { label: "Pricing", value: "Usually distinct from a printed outer" },
        ],
        materials: ["corrugated"],
        printing: ["Single-colour printing", "Custom artwork"],
        finishing: ["No special finishing"],
      }),
    ],
  },
  {
    slug: "custom-printed-packaging",
    name: "Custom Printed Packaging",
    short: "Print planned with the structure",
    description:
      "Custom printed packaging where the artwork, the colour count, and the structure are specified together. Print is not a filter added to a generic box at the end.",
    seoDescription:
      "Custom printed packaging and custom printed boxes in Pakistan. CMYK, single colour, and finishing, quoted with the structure.",
    shape: "printed",
    accent: "#c4452d",
    material: "art-paper",
    studioPack: "folding-carton",
    materials: ["art-paper", "bleach-card", "kraft", "coated", "duplex", "corrugated"],
    customizations: ["CMYK or single colour", "One face or two", "Finishes named in the quote", "Artwork checked against the structure"],
    products: [
      product({
        slug: "full-print-carton",
        name: "Full-print carton",
        summary: "A carton where the print covers the brand faces.",
        description:
          "Full print means the artwork is planned for the panels, including folds and glue areas that should stay clear. Send what you have. If you do not have a dieline yet, say so. The preview in the studio is not a dieline.",
        shape: "printed",
        accent: "#c4452d",
        material: "art-paper",
        studioPack: "folding-carton",
        specs: [
          { label: "Print", value: "CMYK or the colour count you specify" },
          { label: "Artwork", value: "Checked against the structure before production" },
          { label: "Proof", value: "Screen preview is not a colour approval" },
        ],
        materials: ["art-paper", "bleach-card", "duplex"],
        printing: [...printStandard, "Double-sided printing"],
        finishing: finishCarton,
      }),
      product({
        slug: "single-colour-pack",
        name: "Single-colour pack",
        summary: "One ink, used deliberately, on board or paper.",
        description:
          "A single colour is not a compromise by default. On kraft, one dark ink can be the entire identity. Name the ink if you have a reference. If you do not, describe it and expect the quotation to propose how it will be matched.",
        shape: "printed",
        accent: "#161410",
        material: "kraft",
        studioPack: "folding-carton",
        specs: [
          { label: "Print", value: "One ink" },
          { label: "Ground", value: "White board and kraft will not look the same" },
          { label: "Pricing", value: "Often different from a four-colour job" },
        ],
        materials: ["kraft", "bleach-card", "duplex", "corrugated"],
        printing: ["Single-colour printing", "Custom artwork", "Double-sided printing"],
        finishing: ["No special finishing", "Foil stamping", "Embossing"],
      }),
      product({
        slug: "inside-print",
        name: "Inside print",
        summary: "Print on the interior, for unboxing or instructions.",
        description:
          "Inside print is a second surface. It can carry instructions, a pattern, or a short message. Specify it at the start. Adding it after the structure is quoted changes the job. Duplex board shows a grey back unless the inside is printed or lined.",
        shape: "printed",
        accent: "#234c38",
        material: "bleach-card",
        studioPack: "folding-carton",
        specs: [
          { label: "Print", value: "Interior, with or without an exterior design" },
          { label: "Board", value: "The back colour matters. Name it." },
          { label: "Pricing", value: "Inside print is its own line in the specification" },
        ],
        materials: ["bleach-card", "art-paper", "duplex"],
        printing: ["Double-sided printing", "CMYK printing", "Single-colour printing", "Custom artwork"],
        finishing: finishCarton,
      }),
    ],
  },
];

export const mainCategorySlugs = [
  "food-packaging",
  "window-boxes",
  "lid-boxes",
  "medicine-boxes",
  "syrup-boxes",
  "cosmetics-packaging",
  "shopping-bags",
] as const;

export function mainCategories() {
  return mainCategorySlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((category) => category !== undefined);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(categorySlug: string, productSlug: string) {
  const category = getCategory(categorySlug);
  const item = category?.products.find((entry) => entry.slug === productSlug);
  if (!category || !item) return null;
  return { category, product: item };
}

export function allProductPaths() {
  return categories.flatMap((category) =>
    category.products.map((item) => ({ category: category.slug, product: item.slug })),
  );
}

export function relatedProducts(categorySlug: string, productSlug: string) {
  const category = getCategory(categorySlug);
  if (!category) return [];
  const others = category.products.filter((item) => item.slug !== productSlug);
  const adjacent = categories
    .filter((item) => item.slug !== categorySlug)
    .flatMap((item) => item.products.slice(0, 1).map((product) => ({ category: item, product })));
  return [
    ...others.map((product) => ({ category, product })),
    ...adjacent,
  ].slice(0, 3);
}
