export type Industry = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  description: string;
  considerations: string[];
  directions: { title: string; text: string }[];
  categories: string[];
  studioPack: string;
};

export const industries: Industry[] = [
  {
    slug: "food-and-beverages",
    name: "Food and beverages",
    kicker: "Service, shelf, and kitchen",
    summary: "Packs for food that is handed over a counter, delivered, or sold from a shelf.",
    description:
      "Food packaging has to name the product clearly and survive grease, moisture, heat, or a chilled journey. PACKNEXT treats that as a specification, not a single box style. Tell us what is inside, how it is served, and whether the pack is used once at a counter or lives on a shelf.",
    considerations: [
      "Say if the food is hot, cold, greasy, dry, or liquid.",
      "Ask for a food-contact suitable material when the pack touches food. This site does not claim a food-safety certificate.",
      "Decide whether the pack is printed to be seen in a rider’s hand or on a retail shelf.",
    ],
    directions: [
      { title: "Counter and delivery", text: "Cartons, sleeves, and bags sized to the portion you actually sell." },
      { title: "Shelf packs", text: "Printed cartons and labels with room for the product name, weight, and the information your brand needs to show." },
      { title: "Seals and labels", text: "Stickers that close a bag or name a bottle without a full carton." },
    ],
    categories: ["food-packaging", "labels", "paper-bags", "stickers"],
    studioPack: "food-box",
  },
  {
    slug: "bakeries-and-confectionery",
    name: "Bakeries and confectionery",
    kicker: "Pastry, cake, and gifting",
    summary: "Boxes and bags that carry the way a bakery presents itself, from a single pastry to a celebration cake.",
    description:
      "Bakery packaging is often the last thing a customer holds. Window or no window, kraft or white board, a handle or a flat carton: those choices change both the cost and the unboxing. Specify the piece you are packing, including height, because cakes and pastry boxes fail when the height is guessed.",
    considerations: [
      "Measure the tallest piece, including frosting or a topper.",
      "A window is a die-cut decision. Ask for it only if the product should be seen.",
      "Grease and refrigeration needs belong in the quotation notes.",
    ],
    directions: [
      { title: "Celebration boxes", text: "Square or rectangular cartons with a stated height." },
      { title: "Counter bags", text: "Paper bags for loaves, cookies, and items that do not need a rigid box." },
      { title: "Seals", text: "Small stickers that close a box and carry a short brand mark." },
    ],
    categories: ["food-packaging", "paper-bags", "stickers", "labels"],
    studioPack: "bakery-box",
  },
  {
    slug: "cosmetics-and-skincare",
    name: "Cosmetics and skincare",
    kicker: "Jars, bottles, and sets",
    summary: "Cartons, rigid boxes, and labels for products that are judged in the hand.",
    description:
      "Cosmetic packaging is often as considered as the formula. A folding carton, a rigid lid-and-base, or a label on the container itself are different products. PACKNEXT can specify the structure, the print, and finishes such as matte film, foil, or embossing. Colour on screen is a guide. A proof is how critical colour gets approved.",
    considerations: [
      "Share the container size, including the cap.",
      "Say whether the pack is a single unit or a set with an insert.",
      "Name finishes you care about. They change both the look and the quotation.",
    ],
    directions: [
      { title: "Folding cartons", text: "For individual retail units and kits that ship flat." },
      { title: "Rigid boxes", text: "For sets and gifts where the box should hold its shape." },
      { title: "Labels", text: "For jars and bottles that do not need an outer carton." },
    ],
    categories: ["cosmetics-packaging", "labels", "stickers", "custom-boxes"],
    studioPack: "cosmetic-box",
  },
  {
    slug: "pharmaceuticals",
    name: "Pharmaceuticals",
    kicker: "Cartons and information",
    summary: "Printed cartons and labels for pharmaceutical products, specified with your regulatory text.",
    description:
      "Pharmaceutical packs need readable type, a structure that protects the primary container, and space for the information you are required to print. PACKNEXT does not claim a pharmaceutical manufacturing licence, a GDP certificate, or regulatory approval on this website. Your team remains responsible for artwork compliance. We can produce printed packaging to the specification you approve.",
    considerations: [
      "Provide approved artwork rather than asking the site to invent medical claims.",
      "Batch coding, leaflets, and tamper evidence must be requested explicitly.",
      "Board colour and inside print should be decided before the quotation is treated as final.",
    ],
    directions: [
      { title: "Unit cartons", text: "Folding cartons for bottles, blisters, and tubes." },
      { title: "Labels", text: "Container labels with the type size your artwork requires." },
      { title: "Outers", text: "Corrugated shippers for wholesale movement. Share the unit count." },
    ],
    categories: ["medicine-boxes", "syrup-boxes", "pharmaceutical-packaging", "labels"],
    studioPack: "folding-carton",
  },
  {
    slug: "fashion-and-apparel",
    name: "Fashion and apparel",
    kicker: "Tags, bags, and garment packs",
    summary: "Swing tags, stickers, bags, and boxes for clothing and accessories.",
    description:
      "Fashion brands often need a family of small printed pieces rather than one box: a swing tag, a size strip, a bag, and sometimes a mailer. Specify them together so the paper, the print colour, and the attachment method can be quoted as a set.",
    considerations: [
      "Say how the tag is attached: string, pin, or sticker.",
      "Mailers and shopping bags are different builds. Choose the one the customer actually receives.",
      "Black and white photography of a tag is not a colour standard. Share the ink colours.",
    ],
    directions: [
      { title: "Swing tags", text: "Board tags with a hole or a slot, printed one or both sides." },
      { title: "Shopping bags", text: "Carried bags for stores, sized to the garment." },
      { title: "Mailers", text: "Corrugated or folding mailers for e-commerce orders." },
    ],
    categories: ["clothing-tags", "shopping-bags", "stickers", "retail-packaging"],
    studioPack: "shopping-bag",
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    kicker: "The parcel is the shop",
    summary: "Mailers, tape-free unboxing, tissue is not assumed, and print that survives a courier.",
    description:
      "For an online brand the outer pack is the first physical impression. It also has to survive a courier. A printed mailer, a plain shipper with a branded sticker, or a retail carton inside a mailer are three different costs. Start from how the parcel is opened, then choose the print that is worth paying for.",
    considerations: [
      "Share typical order contents so the mailer is not oversized on every shipment.",
      "Inside print is optional. Ask for it if the unboxing is part of the brand.",
      "This website does not promise courier rates or nationwide delivery terms.",
    ],
    directions: [
      { title: "Printed mailers", text: "Corrugated mailers with the brand on the outside." },
      { title: "Seals", text: "Stickers that close a plain shipper at a lower print cost." },
      { title: "Inserts", text: "Cards and thank-you notes specified with the mailer." },
    ],
    categories: ["retail-packaging", "stickers", "labels", "industrial-packaging"],
    studioPack: "corrugated-box",
  },
  {
    slug: "hardware",
    name: "Hardware",
    kicker: "Parts, sets, and shelf packs",
    summary: "Cartons and labels for hardware that must be identified quickly and protected in transit.",
    description:
      "Hardware packaging is a clarity problem as much as a strength problem. A parts carton needs the part name, the count, and a board that matches the weight. Printed shelf packs and plain bulk cartons can be specified separately so you are not paying for retail print on a warehouse outer.",
    considerations: [
      "Share the weight and whether the items are loose, bagged, or sharp.",
      "Ask for dividers only if the product needs them.",
      "Barcode and part-number placement should be in the artwork, not an afterthought.",
    ],
    directions: [
      { title: "Shelf cartons", text: "Printed packs for retail hardware." },
      { title: "Bulk cartons", text: "Corrugated outers for distributors." },
      { title: "Labels", text: "Identifying labels when the carton itself stays plain." },
    ],
    categories: ["hardware-packaging", "labels", "industrial-packaging"],
    studioPack: "corrugated-box",
  },
  {
    slug: "machinery-and-industrial",
    name: "Machinery and industrial products",
    kicker: "Protection before decoration",
    summary: "Outer packs and labels for components, machines, and industrial goods.",
    description:
      "Industrial packaging starts with the object: its weight, its finish, and how it will be lifted or stacked. Print is then added where identification matters. PACKNEXT will not invent a load rating. The quotation should record the weight and handling you describe, and the board specification that follows from it.",
    considerations: [
      "Describe lifting: by hand, by two people, or by equipment.",
      "Say if the surface of the product can be scratched.",
      "Export marks and handling symbols need to be in the artwork you approve.",
    ],
    directions: [
      { title: "Component cartons", text: "Sized outers for parts and sub-assemblies." },
      { title: "Identification", text: "Labels and printed panels that stay readable in a workshop." },
      { title: "Kits", text: "A carton plus a label system for multi-part products." },
    ],
    categories: ["machinery-packaging", "industrial-packaging", "labels"],
    studioPack: "corrugated-box",
  },
  {
    slug: "retail-and-wholesale",
    name: "Retail and wholesale",
    kicker: "Shelf and warehouse",
    summary: "One product often needs a retail face and a wholesale outer. Specify both.",
    description:
      "Wholesale distributors and retailers rarely need only one pack. The unit the shopper sees and the carton the store receives do different jobs. PACKNEXT can quote them as related items so the print, the board, and the quantity are not planned in isolation.",
    considerations: [
      "Separate the consumer pack from the shipping pack in your brief.",
      "Share how many units sit in a trade carton.",
      "Seasonal artwork should be named as its own version, not assumed.",
    ],
    directions: [
      { title: "Retail face", text: "Cartons, bags, and labels designed for the shelf." },
      { title: "Trade outers", text: "Corrugated cartons for distribution." },
      { title: "Campaign print", text: "Stickers and sleeves for a promotion without changing the base pack." },
    ],
    categories: ["retail-packaging", "shopping-bags", "labels", "industrial-packaging"],
    studioPack: "folding-carton",
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
