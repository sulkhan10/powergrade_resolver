import Navigation from "@/components/Navigation";
import BlogSection from "@/components/sections/BlogSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import PersonalSection from "@/components/sections/PersonalSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProcessSection from "@/components/sections/ProcessSection";
import StoreSection from "@/components/sections/StoreSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      {/* <AboutSection /> */}
      <PortfolioSection />
      <PersonalSection />
      <ProcessSection />
      <StoreSection />
      <BlogSection />
      <FooterSection />
    </main>
  );
}
