import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Ananya R.", text: "Dent Arena transformed my smile! The team was incredibly gentle and professional. I highly recommend them for any dental work.", rating: 5 },
  { name: "Karan S.", text: "Best dental experience I've ever had. The clinic is clean, modern and the staff makes you feel at ease. My teeth whitening results are amazing!", rating: 5 },
  { name: "Meera P.", text: "Dr. Sharma is wonderful! She explained every step of my root canal and I felt zero pain. Dent Arena is now my permanent dental home.", rating: 5 },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="section-padding bg-section-alt">
    <div className="container-max">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
          What Our Patients Say
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="bg-background rounded-xl p-6 shadow-sm border">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
            <p className="font-semibold text-foreground text-sm">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
