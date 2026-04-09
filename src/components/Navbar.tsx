import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Dentists", href: "#dentists" },
  // { label: "Testimonials", href: "#testimonials" },
  { label: "Reviews", href: "#reviews" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const WHATSAPP_URL =
  "https://wa.me/919586635135?text=Hey%2C%20I%20want%20to%20book%20an%20appointment%20on%20teeth%20cleaning.";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.png" alt="Dent Arena Logo" className="w-14 h-9 rounded-lg" />
          <span className="font-heading font-bold text-xl text-foreground">
            Dent <span className="text-primary">Arena</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:9586635135">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </Button>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm">Book Appointment</Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-background px-4 pb-4 animate-fade-in-up">
          <ul className="flex flex-col gap-1 py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-2">
            <a href="tel:9586635135">
              <Button variant="outline" className="w-full gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </Button>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">Book Appointment</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
