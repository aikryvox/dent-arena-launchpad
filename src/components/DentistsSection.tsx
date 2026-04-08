const DENTISTS = [
  { name: "Dr. Priya Sharma", role: "General Dentist", initials: "PS" },
  { name: "Dr. Rahul Mehta", role: "Orthodontist", initials: "RM" },
  { name: "Dr. Anjali Verma", role: "Cosmetic Dentist", initials: "AV" },
  { name: "Dr. Vikram Patel", role: "Oral Surgeon", initials: "VP" },
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
          <div key={d.name} className="bg-section-alt rounded-xl p-6 text-center group hover:shadow-md transition-shadow">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
              <span className="text-2xl font-heading font-bold text-primary group-hover:text-primary-foreground transition-colors">
                {d.initials}
              </span>
            </div>
            <h3 className="font-heading font-semibold text-foreground">{d.name}</h3>
            <p className="text-muted-foreground text-sm mt-1">{d.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DentistsSection;
