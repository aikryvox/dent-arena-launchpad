import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/about-dental.jpg";

const HIGHLIGHTS = [
  "Premium Dental Services You Can Trust",
  "Award-Winning Experts in Dental Care",
  "Dedicated Experts Behind Every Smile",
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-background">
    <div className="container-max">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={aboutImg}
            alt="Modern Dent Arena dental clinic interior"
            loading="lazy"
            width={600}
            height={700}
            className="rounded-2xl w-full object-cover shadow-lg"
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-2xl opacity-20 hidden lg:block" />
        </div>
        <div className="space-y-6">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            15 Years of Expertise <br />in Dental Care
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At Dent Arena, we have been delivering exceptional dental services for over 15 years. Our team of experienced professionals uses cutting-edge technology to ensure you receive the best possible care in a comfortable environment.
          </p>
          <ul className="space-y-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{h}</span>
              </li>
            ))}
          </ul>
          <a href="#contact">
            <Button size="lg">Learn More</Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
