export const principles = [
  {
    number: "01",
    title: "Specified, not picked off a single shelf",
    text: "Dimensions, board, print, and quantity are decided for the product you actually sell. A catalogue picture is a starting point, not the order.",
  },
  {
    number: "02",
    title: "A price after the specification",
    text: "Custom packaging does not have one honest list price. PACKNEXT quotes the job once the material, size, print, finish, and quantity are known.",
  },
  {
    number: "03",
    title: "Materials discussed in plain language",
    text: "Bleach card, kraft, corrugated, rigid board, and coated papers behave differently. The materials library and the studio are there so that choice is visible before you enquire.",
  },
  {
    number: "04",
    title: "One brief for the whole family",
    text: "Boxes, bags, labels, stickers, and tags can be requested together. Related pieces stay consistent because they are specified together.",
  },
];

export const processSteps = [
  {
    id: "brief",
    title: "Describe the product",
    text: "What is being packed, who receives it, and what the pack has to survive. A photo of the product helps.",
  },
  {
    id: "specify",
    title: "Set the structure",
    text: "Choose a packaging type, a material, and the size in millimetres. The studio is a way to do this before you write it out.",
  },
  {
    id: "quote",
    title: "Receive a quotation",
    text: "The quotation prices the specification. It is prepared by the business, not calculated automatically on this website.",
  },
  {
    id: "artwork",
    title: "Approve the artwork",
    text: "Print is checked against the dieline and the finishes you asked for. Colour on a phone is not the approval.",
  },
  {
    id: "production",
    title: "Production",
    text: "Printing, finishing, and making follow the approved specification. Lead time is confirmed in the quotation, not guessed here.",
  },
  {
    id: "handover",
    title: "Handover",
    text: "Collection or delivery is agreed with the quotation. This website does not assume a delivery area.",
  },
];

export const customizationSteps = [
  {
    title: "Pick a pack",
    text: "Food, bakery, window, lid, medicine, syrup, cosmetic box, or a bag.",
    href: "/products",
  },
  {
    title: "Send the size",
    text: "Tell us what goes inside, the size, and how many you need.",
    href: "/quote",
  },
  {
    title: "Get a quote",
    text: "We reply with a price. Nothing on the site is a fixed shop price.",
    href: "/quote",
  },
];

export const faqs = [
  {
    question: "Do you show prices on the website?",
    answer:
      "No. A custom pack changes with size, material, colours, finishes, and quantity. Publishing a single price would be misleading. Send a specification and PACKNEXT will quote it. When a price is given, it can be discussed in PKR.",
  },
  {
    question: "What is the minimum order?",
    answer:
      "There is no minimum published on this site. The practical quantity depends on the print method and the material. Write the quantity you need. The quotation will say whether that quantity is workable.",
  },
  {
    question: "Can I preview a box before enquiring?",
    answer:
      "Yes. The Packaging Studio builds a 3D preview from the type, material, colour, size, and finishing you select. It is a visual guide so you can talk about the pack. It is not a printed proof or a dieline.",
  },
  {
    question: "Which cities do you work with?",
    answer:
      "Enquiries are welcome from Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Sialkot, Multan, Gujranwala, Peshawar, and from other cities or international buyers. Delivery and pickup are confirmed per quotation. Coverage is not assumed.",
  },
  {
    question: "How should I send artwork?",
    answer:
      "Upload a PDF, PNG, JPG, or WebP up to 8 MB with the quotation form. If the file is larger, or it is an Adobe Illustrator file, say so in the notes and send it on WhatsApp or email once those contacts are configured.",
  },
  {
    question: "Can packaging be food-contact suitable?",
    answer:
      "Ask for that in the brief and name the food. The material has to be confirmed for the job. This website does not display a food-safety certificate, because none is being claimed here.",
  },
  {
    question: "Do you print pharmaceutical packaging?",
    answer:
      "Printed cartons and labels can be specified for pharmaceutical products. Regulatory text, licences, and compliance stay with your team. PACKNEXT does not claim a pharmaceutical licence on this website.",
  },
  {
    question: "What happens after I submit a request?",
    answer:
      "You receive a reference on screen and a summary you can copy, download, or send on WhatsApp. Storage depends on how this website is configured. If a cloud database is not connected, the page says so plainly. A person still needs to reply with the quotation.",
  },
];

export const studies = [
  {
    slug: "bakery-window",
    title: "A bakery carton, specified two ways",
    note: "Example specification. Not a client project and not a completed order.",
    plain: "A plain kraft carton, unnamed, sized only to fit.",
    branded: "The same proportion, with a print panel, a window, and a seal colour chosen by the brand.",
    lesson:
      "The structure can stay simple while the print and the window do the brand work. Both versions should be quoted, because the window is a die-cut, not a free extra.",
    packId: "bakery-box",
    material: "kraft",
  },
  {
    slug: "cosmetic-rigid",
    title: "A skincare jar and its outer",
    note: "Example specification. Not a client project and not a completed order.",
    plain: "The jar with a small label and no outer pack.",
    branded: "A rigid lid and base, a printed wrap, and a foil stamp on the lid.",
    lesson:
      "The label and the rigid box solve different problems. One is economical. The other changes the unboxing. They should be separate lines on a quotation.",
    packId: "rigid-box",
    material: "rigid",
  },
  {
    slug: "hardware-outer",
    title: "A hardware set, retail and bulk",
    note: "Example specification. Not a client project and not a completed order.",
    plain: "A plain corrugated outer with a handwritten part count.",
    branded: "A printed shelf carton for the set, plus a plainer trade carton for twelve units.",
    lesson:
      "Retail print and warehouse strength do not have to live on the same board. Splitting them keeps the brief honest.",
    packId: "corrugated-box",
    material: "corrugated",
  },
];
