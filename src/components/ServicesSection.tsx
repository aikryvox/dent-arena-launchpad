import { Stethoscope, Sparkles, HeartPulse, ShieldCheck, Smile, Syringe } from "lucide-react";

const SERVICES = [
  { icon: Stethoscope, title: "General Dentistry", desc: "Comprehensive dental check-ups, cleanings, and preventive care for the whole family." },
  { icon: Sparkles, title: "Teeth Whitening", desc: "Professional whitening treatments to brighten your smile safely and effectively." },
  { icon: HeartPulse, title: "Dental Implant", desc: "Permanent tooth replacement solutions that look and feel like natural teeth." },
  { icon: ShieldCheck, title: "Root Canal", desc: "Pain-free root canal treatments using advanced technology for optimal results." },
  { icon: Smile, title: "Cosmetic Dentistry", desc: "Transform your smile with veneers, bonding, and smile makeover procedures." },
  { icon: Syringe, title: "Orthodontics", desc: "Braces and clear aligners to straighten teeth and improve your bite." },
];

const ServicesSection = () => (
  <section id="services" className="section-padding bg-section-alt">
    <div className="container-max">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
          A Wide Range of Services for <br className="hidden sm:block" />
          <span className="text-primary">Your Best Smile</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group border border-transparent hover:border-primary/20"
          >
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
              <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
