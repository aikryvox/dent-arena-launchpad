import { Phone, MessageCircle } from "lucide-react";
import { LOCATION } from "@/lib/constants";

const WHATSAPP_URL = `https://wa.me/${LOCATION.phone.replace(/\D/g, "")}?text=Hey%2C%20I%20want%20to%20book%20an%20appointment%20on%20teeth%20cleaning.`;

const FloatingCTA = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <a
      href={`tel:${LOCATION.phone.replace(/\s/g, "")}`}
      className="w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="Call Dent Arena"
    >
      <Phone className="w-6 h-6 text-primary-foreground" />
    </a>
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Book appointment via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" style={{ color: "#fff" }} />
    </a>
  </div>
);

export default FloatingCTA;
