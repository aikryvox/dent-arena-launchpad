// Location data for Dent Arena
export const LOCATION = {
    name: "Dent Arena",
    latitude: 21.175596,
    longitude: 72.8173459,
    address: "Dent Arena, Surat, Gujarat, India",
    phone: "+91 98765 43210",
    email: "info@dentarena.in",
    googleMapsUrl: "https://maps.app.goo.gl/C2frCvYY4B1BXuhW8",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.5!2d72.8173459!3d21.175596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e6d4ba80395:0xd0e1a985e8658f5c!2sDent%20Arena!5e0!3m2!1sen!2sin!4v1700000000000",
    rating: 4.9,
    reviewCount: 500,
    workingHours: {
        weekday: "9:00 AM - 8:00 PM",
        weekend: "10:00 AM - 2:00 PM",
    },
};

// Google Reviews (mock data - in production, fetch from Google Places API)
export const GOOGLE_REVIEWS = [
    {
        id: 1,
        author: "Rajesh Kumar",
        rating: 5,
        date: "2 weeks ago",
        text: "Excellent dental care! Dr. Priya is very professional and gentle. The clinic is clean and well-maintained. Highly recommended!",
        verified: true,
    },
    {
        id: 2,
        author: "Priya Patel",
        rating: 5,
        date: "1 month ago",
        text: "Best dental clinic in Surat. The staff is friendly and the treatment is painless. Worth every penny!",
        verified: true,
    },
    {
        id: 3,
        author: "Amit Singh",
        rating: 5,
        date: "1 month ago",
        text: "Had my teeth whitening done here. Results are amazing! The dentist explained everything clearly.",
        verified: true,
    },
    {
        id: 4,
        author: "Neha Desai",
        rating: 4,
        date: "2 months ago",
        text: "Good experience overall. The clinic has modern equipment and the doctors are knowledgeable.",
        verified: true,
    },
    {
        id: 5,
        author: "Vikram Joshi",
        rating: 5,
        date: "2 months ago",
        text: "Had root canal treatment. Pain-free procedure! Dr. Rahul is excellent at his work.",
        verified: true,
    },
    {
        id: 6,
        author: "Anjali Sharma",
        rating: 5,
        date: "3 months ago",
        text: "Very professional team. They made me feel comfortable during my first visit. Will definitely come back!",
        verified: true,
    },
];
