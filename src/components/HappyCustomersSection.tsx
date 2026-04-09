import { Star } from "lucide-react";

const HAPPY_CUSTOMERS = [
    {
        name: "Rajesh Kumar",
        role: "Business Owner",
        image: "/customer-1.svg",
        testimonial: "Amazing experience! My teeth look perfect now. Highly recommend Dent Arena!",
        rating: 5,
    },
    {
        name: "Priya Singh",
        role: "Software Engineer",
        image: "/customer-2.svg",
        testimonial: "Professional staff and painless treatment. Best dental clinic in the city!",
        rating: 5,
    },
    {
        name: "Amit Patel",
        role: "Entrepreneur",
        image: "/customer-3.svg",
        testimonial: "Got my smile back! The team is so caring and the results are outstanding.",
        rating: 5,
    },
    {
        name: "Neha Sharma",
        role: "Marketing Manager",
        image: "/customer-4.svg",
        testimonial: "Affordable prices with premium quality. I'm very satisfied with my treatment.",
        rating: 5,
    },
    {
        name: "Vikram Desai",
        role: "Consultant",
        image: "/customer-5.svg",
        testimonial: "State-of-the-art equipment and expert doctors. Truly world-class service!",
        rating: 5,
    },
];

const HappyCustomersSection = () => (
    <section id="happy-customers" className="section-padding bg-background">
        <div className="container-max">
            <div className="text-center mb-12">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Success Stories</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
                    Our <span className="text-primary">Happy Customers</span>
                </h2>
                <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                    Real smiles from real people. See how we've transformed lives with our expert dental care.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {HAPPY_CUSTOMERS.map((customer) => (
                    <div
                        key={customer.name}
                        className="bg-section-alt rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
                    >
                        {/* Customer Image */}
                        <div className="relative w-full aspect-square bg-secondary overflow-hidden">
                            <img
                                src={customer.image}
                                alt={customer.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Customer Info */}
                        <div className="p-4 text-center">
                            <h3 className="font-heading font-semibold text-foreground text-sm">{customer.name}</h3>
                            <p className="text-muted-foreground text-xs mt-1">{customer.role}</p>

                            {/* Rating */}
                            <div className="flex justify-center gap-1 mt-3">
                                {Array.from({ length: customer.rating }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                                ))}
                            </div>

                            {/* Testimonial */}
                            <p className="text-muted-foreground text-xs mt-3 line-clamp-3 italic">
                                "{customer.testimonial}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HappyCustomersSection;
