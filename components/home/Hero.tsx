import Link from "next/link";
import { MoveRight, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 py-20 md:py-32 overflow-hidden transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-orange-600/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/10 text-amber-700 dark:text-amber-500 rounded-full text-sm font-black uppercase tracking-widest border border-amber-600/20 animate-fade-in">
              <Zap size={16} className="fill-current" />
              AI-Powered Resume Builder
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Build a Professional <span className="text-amber-600">Resume</span> in Minutes
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Land your dream job with a resume that stands out. Our expert-crafted templates are ATS-friendly and designed to showcase your unique career journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link 
                href="/auth/signup" 
                className="bg-amber-600 text-white text-lg font-black px-10 py-5 rounded-2xl hover:bg-amber-700 transition-all shadow-xl shadow-amber-600/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Get Started for Free <MoveRight size={20} />
              </Link>
              <Link 
                href="#templates" 
                className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-lg font-black px-10 py-5 rounded-2xl hover:border-amber-600 hover:text-amber-600 dark:hover:border-amber-600 transition-all flex items-center justify-center"
              >
                View Templates
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-amber-600/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
            <div className="relative bg-white dark:bg-slate-900 p-3 rounded-3xl shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-800 animate-tilt">
              <div className="bg-slate-100 dark:bg-slate-800 aspect-[3/4.2] rounded-2xl w-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 p-8 border border-dashed border-slate-300 dark:border-slate-700">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full mb-6"></div>
                <div className="space-y-3 w-full">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4 mx-auto"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2 mx-auto"></div>
                  <div className="pt-8 h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-full"></div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-full"></div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
