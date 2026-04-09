import { useState } from "react";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.png";
import gallery8 from "@/assets/gallery-8.png";
import gallery9 from "@/assets/gallery-9.png";

const GALLERY = [
  { src: gallery1, alt: "Modern dental clinic interior with advanced equipment", label: "Our Clinic" },
  { src: gallery2, alt: "Professional dental instruments and tools", label: "Advanced Tools" },
  { src: gallery3, alt: "Digital dental X-ray technology", label: "Digital X-Ray" },
  { src: gallery4, alt: "Dentist treating a patient with care", label: "Patient Care" },
  { src: gallery5, alt: "Beautiful healthy smile after treatment", label: "Smile Results" },
  { src: gallery6, alt: "Happy family at dental clinic", label: "Family Dentistry" },
  { src: gallery7, alt: "Modern dental treatment room with advanced equipment", label: "Treatment Room" },
  { src: gallery8, alt: "Comfortable and welcoming clinic waiting area", label: "Waiting Area" },
  { src: gallery9, alt: "Before and after smile transformation results", label: "Transformation" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding bg-section-alt">
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Gallery</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
            See Our <span className="text-primary">Services in Action</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Take a look at our state-of-the-art clinic, advanced equipment, and the smiles we've transformed.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={640}
                height={512}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end">
                <span className="text-primary-foreground font-semibold text-sm px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-primary-foreground hover:text-primary transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
