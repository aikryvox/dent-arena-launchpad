import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    text: "Dr. Mayank Shah at Dent Arena is phenomenal! I had a root canal done and felt absolutely no pain. The clinic on Bhatar Road is spotless and equipped with the latest technology. Highly recommend!",
    rating: 5,
    service: "Root Canal Treatment",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Rajesh Patel",
    text: "Best dental clinic in Surat! Dr. Minal Shah did my teeth whitening and the results are incredible. The staff is very friendly and the clinic ambience is world-class. Will definitely come back.",
    rating: 5,
    service: "Teeth Whitening",
    timeAgo: "1 month ago",
  },
  {
    name: "Sneha Desai",
    text: "I was terrified of dentists but Dent Arena changed that completely. Dr. Mayank explained every step of my dental implant procedure. The Sheetal Shopping Complex location is very convenient too!",
    rating: 5,
    service: "Dental Implants",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Amit Joshi",
    text: "Got my braces done from Dent Arena and I couldn't be happier with the results. Dr. Minal Shah is very patient and skilled. The clinic maintains excellent hygiene standards.",
    rating: 5,
    service: "Orthodontic Braces",
    timeAgo: "2 months ago",
  },
  {
    name: "Kavita Sharma",
    text: "My entire family visits Dent Arena for regular check-ups. Both Dr. Mayank and Dr. Minal are extremely professional. The clinic timings (10 AM - 8 PM) are very convenient for working professionals.",
    rating: 5,
    service: "General Checkup",
    timeAgo: "1 week ago",
  },
  {
    name: "Darshan Nakrani",
    text: "Had a wisdom tooth extraction at Dent Arena. Was very nervous but Dr. Mayank Shah made the process so smooth and painless. Great experience, 5 stars all the way!",
    rating: 5,
    service: "Tooth Extraction",
    timeAgo: "5 days ago",
  },
];

const GOOGLE_RATING = 5.0;
const TOTAL_REVIEWS = TESTIMONIALS.length;

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const getVisibleIndices = () => {
    const len = TESTIMONIALS.length;
    return [
      (current - 1 + len) % len,
      current,
      (current + 1) % len,
    ];
  };

  const visible = getVisibleIndices();

  return (
    <section id="testimonials" className="section-padding bg-section-alt">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
            What Our Patients Say
          </h2>
          {/* Google Rating Badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            <span className="font-bold text-foreground text-lg">{GOOGLE_RATING}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">
              ({TOTAL_REVIEWS}+ reviews on Google)
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop: show 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {visible.map((idx) => (
              <TestimonialCard key={`${idx}-${current}`} testimonial={TESTIMONIALS[idx]} />
            ))}
          </div>

          {/* Mobile: show 1 card */}
          <div className="md:hidden">
            <TestimonialCard testimonial={TESTIMONIALS[current]} />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
}) => (
  <div className="bg-background rounded-xl p-6 shadow-sm border flex flex-col h-full animate-fade-in-up">
    <div className="flex items-center justify-between mb-3">
      <div className="flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{testimonial.timeAgo}</span>
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
      "{testimonial.text}"
    </p>
    <div className="border-t pt-3 mt-auto">
      <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
      <p className="text-xs text-primary">{testimonial.service}</p>
    </div>
  </div>
);

export default TestimonialsSection;
