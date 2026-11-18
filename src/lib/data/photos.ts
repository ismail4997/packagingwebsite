/** Free product photos, one file per kind of pack. Not a competitor's catalogue. */
const photos: Record<string, string> = {
  "tuck-end-carton": "/packaging/real-cartons.jpg",
  "mailer-box": "/packaging/real-box-yellow.jpg",
  "sleeve-and-tray": "/packaging/white-mailers.jpg",

  "takeaway-carton": "/packaging/burger.jpg",
  "food-sleeve": "/packaging/kraft-bag.jpg",
  "meal-kit-box": "/packaging/burger.jpg",
  "burger-box": "/packaging/burger.jpg",
  "pizza-box": "/packaging/pizza-stack.jpg",
  "fries-box": "/packaging/fries-box.jpg",
  "biryani-box": "/packaging/real-box-yellow.jpg",
  "snack-box": "/packaging/white-mailers.jpg",
  "sweet-box": "/packaging/macarons-open.jpg",
  "stand-up-pouch": "/packaging/pouch-green.jpg",
  "sandwich-box": "/packaging/burger.jpg",

  "cake-box": "/packaging/white-stack.jpg",
  "cake-box-6-inch": "/packaging/real-window-2.jpg",
  "cake-box-8-inch": "/packaging/white-pair.jpg",
  "cake-box-10-inch": "/packaging/white-stack.jpg",
  "cake-box-12-inch": "/packaging/white-single.jpg",
  "kraft-cake-box": "/packaging/real-cartons.jpg",
  "pastry-box": "/packaging/macarons-box.jpg",
  "bakery-bag": "/packaging/kraft-bag.jpg",
  "cupcake-box": "/packaging/cupcake-box.jpg",
  "cupcake-box-4": "/packaging/cupcake-box.jpg",
  "cupcake-box-6": "/packaging/gift-cupcakes.jpg",
  "cupcake-box-12": "/packaging/cupcakes-color.jpg",
  "brownie-box": "/packaging/cake-slices-takeaway.jpg",
  "donut-box": "/packaging/real-window-3.jpg",
  "cookie-box": "/packaging/white-mailers.jpg",
  "mithai-box": "/packaging/macarons-open.jpg",
  "cake-slice-box": "/packaging/cake-slices-takeaway.jpg",
  "cake-board": "/packaging/white-single.jpg",
  "wedding-favour-box": "/packaging/macarons-box.jpg",

  "cosmetic-carton": "/packaging/cos-white-set.jpg",
  "rigid-beauty-box": "/packaging/cos-essentials.jpg",
  "jar-label-set": "/packaging/cos-perfume-hand.jpg",
  "soap-box": "/packaging/cos-soap-gift.jpg",
  "perfume-box": "/packaging/cos-perfume-box.jpg",
  "lipstick-box": "/packaging/cos-lipgloss.jpg",
  "cream-box": "/packaging/cos-white-jar.jpg",
  "skincare-set-box": "/packaging/cos-lineup.jpg",
  "makeup-kit-box": "/packaging/cos-palette.jpg",

  "medicine-carton": "/packaging/med-clean.jpg",
  "pharma-label": "/packaging/blank-cards.jpg",
  "pharma-outer": "/packaging/real-cartons.jpg",

  "shelf-carton": "/packaging/real-cartons.jpg",
  "gift-carton": "/packaging/white-stack.jpg",
  "trade-carton": "/packaging/real-cartons.jpg",

  "twist-handle-bag": "/packaging/kraft-bag.jpg",
  "flat-handle-bag": "/packaging/white-bags.jpg",
  "event-bag": "/packaging/kraft-bag.jpg",
  "sos-bag": "/packaging/kraft-bag.jpg",
  "merchandise-bag": "/packaging/white-bags.jpg",
  "prescription-bag": "/packaging/white-bags.jpg",

  "product-label": "/packaging/blank-label-bag.jpg",
  "jar-label": "/packaging/blank-cards.jpg",
  "information-label": "/packaging/blank-cards.jpg",
  "die-cut-sticker": "/packaging/blank-cards.jpg",
  "seal-sticker": "/packaging/blank-label-bag.jpg",
  "sticker-sheet": "/packaging/blank-cards.jpg",

  "swing-tag": "/packaging/hang-tag.jpg",
  "size-ticket": "/packaging/blank-cards.jpg",
  "garment-seal": "/packaging/blank-cards.jpg",

  "parts-carton": "/packaging/real-cartons.jpg",
  "hardware-shelf-pack": "/packaging/real-box-yellow.jpg",
  "hardware-label": "/packaging/blank-cards.jpg",
  "component-carton": "/packaging/real-cartons.jpg",
  "kit-carton": "/packaging/real-box-yellow.jpg",
  "equipment-label": "/packaging/blank-label-bag.jpg",
  "master-carton": "/packaging/pizza-stack.jpg",
  "printed-outer": "/packaging/real-cartons.jpg",
  "plain-shipper": "/packaging/real-box-yellow.jpg",

  "full-print-carton": "/packaging/white-stack.jpg",
  "single-colour-pack": "/packaging/real-cartons.jpg",
  "inside-print": "/packaging/real-box-yellow.jpg",

  "two-piece-lid-box": "/packaging/real-box-yellow.jpg",
  "kraft-lid-box": "/packaging/real-cartons.jpg",
  "tablet-medicine-box": "/packaging/med-clean.jpg",
  "pharmacy-shelf-box": "/packaging/med-pills.jpg",
  "syrup-carton": "/packaging/real-syrup-1.jpg",
  "syrup-bottle-pack": "/packaging/real-syrup-1.jpg",
  "window-lid-box": "/packaging/real-window-2.jpg",
  "window-feeder-box": "/packaging/real-window-1.jpg",
};

const categories: Record<string, string> = {
  "custom-boxes": "/packaging/real-cartons.jpg",
  "lid-boxes": "/packaging/real-box-yellow.jpg",
  "medicine-boxes": "/packaging/med-clean.jpg",
  "syrup-boxes": "/packaging/real-syrup-1.jpg",
  "window-boxes": "/packaging/real-window-2.jpg",
  "food-packaging": "/packaging/burger.jpg",
  "bakery-packaging": "/packaging/cupcakes-color.jpg",
  "cosmetics-packaging": "/packaging/cos-lineup.jpg",
  "pharmaceutical-packaging": "/packaging/med-clean.jpg",
  "retail-packaging": "/packaging/white-stack.jpg",
  "shopping-bags": "/packaging/kraft-bag.jpg",
  "paper-bags": "/packaging/white-bags.jpg",
  labels: "/packaging/blank-cards.jpg",
  stickers: "/packaging/blank-cards.jpg",
  "clothing-tags": "/packaging/hang-tag.jpg",
  "hardware-packaging": "/packaging/real-cartons.jpg",
  "machinery-packaging": "/packaging/real-box-yellow.jpg",
  "industrial-packaging": "/packaging/pizza-stack.jpg",
  "custom-printed-packaging": "/packaging/white-mailers.jpg",
};

export function productPhoto(slug: string, shape: string, _material?: string) {
  return photos[slug] ?? categories[shape] ?? "/packaging/white-box.png";
}

export function categoryPhoto(slug: string, shape: string, material?: string) {
  return categories[slug] ?? productPhoto(slug, shape, material);
}
