import doctor1 from "@/assets/doctor-1.png";
import doctor2 from "@/assets/doctor-2.png";
import doctor3 from "@/assets/doctor-3.png";
import doctor4 from "@/assets/doctor-4.png";

const DENTISTS = [
  { name: "Dr. Priya Sharma", role: "General Dentist", image: doctor1 },
  { name: "Dr. Rahul Mehta", role: "Orthodontist", image: doctor2 },
  { name: "Dr. Anjali Verma", role: "Cosmetic Dentist", image: doctor3 },
  { name: "Dr. Vikram Patel", role: "Oral Surgeon", image: doctor4 },
];

const DentistsSection = () => (
  <section id="dentists" className="section-padding bg-background">
    <div className="container-max">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Team</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
          Meet Our Expert <span className="text-primary">Dental Specialists</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DENTISTS.map((d) => (
          <div key={d.name} className="bg-section-alt rounded-xl overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative w-full aspect-square bg-secondary overflow-hidden">
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-heading font-semibold text-foreground">{d.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{d.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DentistsSection;
