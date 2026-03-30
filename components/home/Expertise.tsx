import { Component, BookOpen, PenTool, LayoutTemplate } from "lucide-react";

const tips = [
  {
    title: "Tailor to the Job Description",
    description: "Align your skills and experience with the specific keywords found in the job posting to bypass ATS systems.",
    icon: BookOpen,
    color: "text-blue-500 bg-blue-100 dark:bg-blue-500/20",
  },
  {
    title: "Keep it Concise",
    description: "Recruiters spend an average of 7 seconds on a resume. Use bullet points and action verbs to make an instant impact.",
    icon: Component,
    color: "text-rose-500 bg-rose-100 dark:bg-rose-500/20",
  },
  {
    title: "Quantify Your Achievements",
    description: "Instead of saying 'improved sales', use numbers: 'increased sales by 15% over 6 months'.",
    icon: PenTool,
    color: "text-purple-500 bg-purple-100 dark:bg-purple-500/20",
  },
  {
    title: "Use Professional Templates",
    description: "A clean, modern format shows professionalism. Avoid cluttered designs that distract from your content.",
    icon: LayoutTemplate,
    color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-500/20",
  }
];

const Expertise = () => {
  return (
    <section id="tips" className="py-24 bg-slate-50 dark:bg-slate-900/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
              Expert tips to <span className="text-amber-500">get hired</span> faster
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-8">
              Building a resume is just the first step. To land your dream job, you need a strategy that stands out to recruiters and hiring managers.
            </p>
            
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 translate-x-4 -translate-y-4 transition-all duration-500">
                <BookOpen size={120} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 relative z-10">
                Did you know?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium relative z-10">
                Resumes with quantifiable achievements receive up to <strong>40% higher interview callback rates</strong>. Always show the impact of your work using data, metrics, and percentages.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {tips.map((tip, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tip.color}`}>
                  <tip.icon size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {tip.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium font-medium">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Expertise;
