import { MessageCircle } from "lucide-react";
import { whatsappConfigured, whatsappLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const configured = whatsappConfigured();
  const href = configured
    ? whatsappLink("Hello PACKNEXT. I would like to talk about a custom packaging quotation.")
    : "/contact#whatsapp";

  if (!href) return null;

  return (
    <a
      href={href}
      target={configured ? "_blank" : undefined}
      rel={configured ? "noreferrer" : undefined}
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#128C7E] px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(18,140,126,0.35)] hover:bg-[#0d7368]"
    >
      <MessageCircle size={18} aria-hidden />
      <span>{configured ? "WhatsApp" : "WhatsApp setup"}</span>
    </a>
  );
}
