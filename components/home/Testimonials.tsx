import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    text: "I was struggling to get interviews for months. Within a week of using ResumePro, I had three interviews lined up!",
    stars: 5,
  },
  {
    name: "Marcus Lee",
    role: "Software Engineer",
    text: "The ATS optimization tool is a game changer. I could see exactly what I needed to change to get past the bots.",
    stars: 5,
  },
  {
    name: "Elena Diaz",
    role: "Project Coordinator",
    text: "Professional, clean, and so easy to use. I loved that I could download my resume in multiple formats.",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Join thousands of <span className="text-amber-600">successful</span> job seekers
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium text-lg">
            Real stories from real professionals who landed their dream roles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-amber-600/30 transition-all duration-300 group"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-6" aria-hidden="true">
                  {Array(t.stars)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  &quot;{t.text}&quot;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-600/10 rounded-2xl shrink-0 flex items-center justify-center text-amber-600 font-black text-xl border border-amber-600/20" aria-hidden="true">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
