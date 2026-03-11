const Hero = () => {
  return (
    <section className="bg-linear-to-br from-slate-50 to-slate-200 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Build a Professional <span className="text-blue-600">Resume</span>{" "}
              in Minutes
            </h1>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Land your dream job with a resume that stands out. Our
              expert-crafted templates are ATS-friendly and designed to showcase
              your unique skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white text-lg font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30">
                Get Started for Free
              </button>
              <button className="bg-white border-2 border-slate-200 text-slate-700 text-lg font-bold px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all">
                View Templates
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-4 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-slate-100">
              {/* Using a placeholder for your resume preview */}
              <div className="bg-slate-200 aspect-3/4 rounded-lg w-full flex items-center justify-center text-slate-400">
                Resume Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
