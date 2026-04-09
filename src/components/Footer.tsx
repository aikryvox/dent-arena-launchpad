import { Phone } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/919586635135?text=Hey%2C%20I%20want%20to%20book%20an%20appointment%20on%20teeth%20cleaning.";

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container-max section-padding !py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold">D</span>
            </div>
            <span className="font-heading font-bold text-lg text-background">Dent Arena</span>
          </div>
          <p className="text-sm leading-relaxed text-background/60">
            Your trusted dental care partner for over 15 years. We provide comprehensive dental services with a gentle touch.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-background mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Services", "Dentists", "About Us", "Contact Us"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-background mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {["General Dentistry", "Teeth Whitening", "Dental Implant", "Root Canal", "Orthodontics"].map((s) => (
              <li key={s} className="text-background/60">{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-background mb-4">Contact</h4>
          <div className="space-y-2 text-sm">
            <a href="tel:9586635135" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> +91 98765 43210
            </a>
            <a href="mailto:info@dentarena.in" className="hover:text-primary transition-colors block">info@dentarena.in</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/40">
        © {new Date().getFullYear()} Dent Arena. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
