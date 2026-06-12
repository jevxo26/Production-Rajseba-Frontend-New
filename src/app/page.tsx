import ExploreCategories from "@/components/home/sections/home/ExploreCategories";
import Hero from "@/components/home/sections/home/Hero";
import HowItWorks from "@/components/home/sections/home/HowItWorks";
import Testimonials from "@/components/home/sections/home/Testimonials";
import TopServices from "@/components/home/sections/home/TopServices";
import WhyChooseUs from "@/components/home/sections/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Hero/>
      <div className="relative">
        {/* Background Pattern with low opacity to prevent contrast issues */}
        <div 
          className="absolute top-30 md:top-40 lg:top-50 inset-0 z-0 pointer-events-none opacity-10 bg-repeat" 
          style={{ 
            backgroundImage: "url('/bg-icons-design.png')",
            backgroundSize: "2500px auto"
          }}
        />
        
        {/* Content sections rendered above the background */}
        <div className="relative z-10">
          <ExploreCategories/>
          <TopServices/>
          <WhyChooseUs/>
          <HowItWorks/>
          <Testimonials/>
        </div>
      </div>
    </div>
  );
}
