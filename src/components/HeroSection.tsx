import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDentist from "@/assets/hero-dentist.png";

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hey%2C%20I%20want%20to%20book%20an%20appointment%20on%20teeth%20cleaning.";

const HeroSection = () => (
  <section id="home" className="bg-hero-bg relative overflow-hidden">
    <div className="container-max section-padding">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text */}
        <div className="space-y-6 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 bg-badge-bg text-badge-text text-sm font-medium px-4 py-2 rounded-full">
            🦷 Top-Notch Dental Care, Just for You
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Your Best Dental <br />
            <span className="text-primary">Experience</span> Awaits
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md">
            At Dent Arena, we combine advanced technology with gentle care to give you a healthy, beautiful smile you'll love to show off.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Book Appointment
              </Button>
            </a>
            <a href="tel:9876543210">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Phone className="w-4 h-4" /> Call Now
              </Button>
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center lg:justify-end animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroDentist}
            alt="Dent Arena professional dentist ready to serve you"
            width={800}
            height={900}
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl object-contain"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
