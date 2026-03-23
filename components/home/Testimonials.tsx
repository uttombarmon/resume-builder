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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
          Join thousands of successful job seekers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-yellow-400 mb-4" aria-hidden="true">
                  {Array(t.stars)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                </div>
                <p className="text-slate-700 italic mb-6 leading-relaxed">
                  &quot;{t.text}&quot;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-300 rounded-full shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-500">{t.role}</p>
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
