import Link from "next/link";

const CTA = () => {
  return (
    <section id="cta" className="py-24 bg-linear-to-br from-amber-600 to-orange-600 relative overflow-hidden" aria-labelledby="cta-title">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white/10 blur-3xl mix-blend-overlay" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-white/10 blur-3xl mix-blend-overlay" aria-hidden="true"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
        <h2 id="cta-title" className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
          Ready to land your next big role?
        </h2>
        <p className="text-xl md:text-2xl text-amber-50 font-bold mb-12 opacity-95 max-w-2xl mx-auto">
          Start building your professional resume today and see the difference.
        </p>
        <Link 
          href="/auth/signup" 
          className="inline-block bg-white text-amber-700 text-xl font-black px-12 py-6 rounded-2xl hover:bg-slate-50 transition-all shadow-2xl hover:shadow-orange-900/40 hover:-translate-y-1.5 active:scale-[0.98]"
        >
          Create My Resume Now
        </Link>
      </div>
    </section>
  );
};

export default CTA;