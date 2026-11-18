import { site } from "@/lib/site";

export function whatsappDigits() {
  const digits = site.whatsapp.replace(/[^\d]/g, "");
  if (digits.length < 10 || digits.length > 15) return "";
  return digits;
}

export function whatsappLink(message: string) {
  const digits = whatsappDigits();
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function whatsappConfigured() {
  return Boolean(whatsappDigits());
}
