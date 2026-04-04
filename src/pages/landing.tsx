import { useLocation } from "wouter";
import NavBar from "../components/landing/NavBar";
import HeroSection from "../components/landing/HeroSection";
import TrustBar from "../components/landing/TrustBar";
import ToolsShowcase from "../components/landing/ToolsShowcase";
import StatsSection from "../components/landing/StatsSection";
import FeaturesGrid from "../components/landing/FeaturesGrid";
import HowItWorks from "../components/landing/HowItWorks";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <NavBar navigate={navigate} />
      <HeroSection navigate={navigate} />
      <TrustBar />
      <ToolsShowcase navigate={navigate} />
      <StatsSection />
      <FeaturesGrid />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection navigate={navigate} />
      <Footer />
    </div>
  );
}
