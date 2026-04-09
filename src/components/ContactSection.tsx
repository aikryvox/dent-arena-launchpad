import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCATION } from "@/lib/constants";

const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=919586635135&text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20for%20teeth%20cleaning.`;

const ContactSection = () => (
  <section id="contact" className="section-padding bg-background">
    <div className="container-max">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
          Get in Touch With Us
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Phone</h3>
              <a href={`tel:${LOCATION.phone.replace(/\s/g, "")}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">{LOCATION.phone}</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <a href={`mailto:${LOCATION.email}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">{LOCATION.email}</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Location</h3>
              <a
                href={LOCATION.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Working Hours</h3>
              <p className="text-muted-foreground text-sm">Mon - Sat: {LOCATION.workingHours.weekday}</p>
              <p className="text-muted-foreground text-sm">Sunday: {LOCATION.workingHours.weekend}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a href={`tel:${LOCATION.phone.replace(/\s/g, "")}`}>
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <Phone className="w-4 h-4" /> Call Now
              </Button>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto">Book via WhatsApp</Button>
            </a>
          </div>
        </div>
        {/* Map */}
        <div className="rounded-xl overflow-hidden shadow-sm border h-72 lg:h-auto min-h-[300px]">
          <iframe
            title="Dent Arena Location"
            src={LOCATION.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
