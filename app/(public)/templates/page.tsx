import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import TemplateGallery from "@/components/templates/TemplateGallery";

export const metadata = {
  title: "Resume Templates | ResumePro",
  description: "Browse our collection of professionally designed resume templates. Find the perfect layout to showcase your skills and land your dream job.",
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Templates Hero Section */}
        <section className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900/10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
              Find your <span className="text-amber-500">perfect</span> foundation
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
              Choose from our professionally designed, ATS-friendly templates. 
              Whether you're a recent graduate or a seasoned executive, we have a layout that fits your story.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TemplateGallery />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
