import { Star, StarHalf } from "lucide-react";

const STATS = [
  { value: "4.9", label: "Google Rating" },
  { value: "2000+", label: "Happy Patients" },
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "5-Star Reviews" },
];

const ReviewsSection = () => (
  <section id="reviews" className="section-padding bg-primary">
    <div className="container-max text-center">
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
        Trusted by Thousands of Happy Smiles
      </h2>
      <div className="flex items-center justify-center gap-1 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
        ))}
        <StarHalf className="w-6 h-6 fill-yellow-400 text-yellow-400" />
        <span className="text-primary-foreground/80 ml-2 text-sm">4.9 / 5 on Google</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-3xl sm:text-4xl font-heading font-bold text-primary-foreground">{s.value}</p>
            <p className="text-primary-foreground/70 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
