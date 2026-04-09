import { Phone, Mail, MapPin } from "lucide-react";

const TopBar = () => (
  <div className="bg-primary hidden md:block">
    <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 text-sm text-primary-foreground">
      <div className="flex items-center gap-6">
        <a href="tel:9586635135" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Phone className="w-3.5 h-3.5" />
          <span>+91 98765 43210</span>
        </a>
        <a href="mailto:info@dentarena.in" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Mail className="w-3.5 h-3.5" />
          <span>info@dentarena.in</span>
        </a>
      </div>
      <a
        href="https://maps.app.goo.gl/C2frCvYY4B1BXuhW8"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <MapPin className="w-3.5 h-3.5" />
        <span>Find us on Google Maps</span>
      </a>
    </div>
  </div>
);

export default TopBar;
