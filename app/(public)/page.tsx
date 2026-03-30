import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import LogoBar from "@/components/home/LogoBar";
import Navbar from "@/components/home/Navbar";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import Expertise from "@/components/home/Expertise";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Features />
        <Expertise />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
