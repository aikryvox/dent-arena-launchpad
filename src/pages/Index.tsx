import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesMarquee from "@/components/ServicesMarquee";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import DentistsSection from "@/components/DentistsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReviewsSection from "@/components/ReviewsSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => (
  <>
    <TopBar />
    <Navbar />
    <HeroSection />
    <ServicesMarquee />
    <AboutSection />
    <ServicesSection />
    <GallerySection />
    <DentistsSection />
    {/* <TestimonialsSection /> */}
    <ReviewsSection />
    <GoogleReviewsSection />
    <ContactSection />
    <Footer />
    <FloatingCTA />
  </>
);

export default Index;
