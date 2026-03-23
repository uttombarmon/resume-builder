import { Edit3, CheckCircle2, Lightbulb } from "lucide-react";

const features = [
  {
    title: "Easy-to-use Editor",
    desc: "No design skills? No problem. Just fill in your details and watch your resume come to life.",
    iconColor: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    icon: Edit3
  },
  {
    title: "ATS-Friendly Templates",
    desc: "Our templates are engineered to pass through Applicant Tracking Systems reliably.",
    iconColor: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
    icon: CheckCircle2
  },
  {
    title: "Expert Tips",
    desc: "Get context-specific advice and bullet point suggestions tailored to your industry.",
    iconColor: "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    icon: Lightbulb
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/10 transition-colors duration-300" aria-labelledby="features-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="features-title" className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Our platform is designed by career experts to give you the competitive edge.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              role="article"
            >
              <div className={`w-14 h-14 ${f.iconColor} rounded-xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;