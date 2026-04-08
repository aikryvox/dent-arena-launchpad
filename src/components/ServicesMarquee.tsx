const SERVICES = [
  "General Dentistry",
  "Teeth Whitening",
  "Dental Implant",
  "Dental Sealants",
  "Root Canal",
  "Orthodontics",
  "Oral Surgery",
  "Cosmetic Dentistry",
];

const ServicesMarquee = () => (
  <div className="bg-primary py-4 overflow-hidden">
    <div className="animate-marquee flex whitespace-nowrap">
      {[...SERVICES, ...SERVICES].map((s, i) => (
        <span key={i} className="mx-8 text-primary-foreground font-medium text-sm flex items-center gap-3">
          <span className="w-5 h-5 rounded-full border border-primary-foreground/40 flex items-center justify-center text-xs">✓</span>
          {s}
        </span>
      ))}
    </div>
  </div>
);

export default ServicesMarquee;
