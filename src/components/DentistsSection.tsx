const DENTISTS = [
  { name: "Dr. Priya Sharma", role: "General Dentist", image: "/doctor-1.png" },
  { name: "Dr. Rahul Mehta", role: "Orthodontist", image: "/doctor-2.png" },
  { name: "Dr. Anjali Verma", role: "Cosmetic Dentist", image: "/doctor-3.png" },
  { name: "Dr. Vikram Patel", role: "Oral Surgeon", image: "/doctor-4.png" },
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
