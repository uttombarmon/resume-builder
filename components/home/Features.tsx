const features = [
  {
    title: "Easy-to-use Editor",
    desc: "No design skills? No problem. Just fill in your details and watch your resume come to life.",
    iconColor: "bg-blue-100 text-blue-600"
  },
  {
    title: "ATS-Friendly Templates",
    desc: "Our templates are engineered to pass through Applicant Tracking Systems reliably.",
    iconColor: "bg-indigo-100 text-indigo-600"
  },
  {
    title: "Expert Tips",
    desc: "Get context-specific advice and bullet point suggestions tailored to your industry.",
    iconColor: "bg-sky-100 text-sky-600"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to succeed</h2>
          <p className="text-lg text-slate-600">Our platform is designed by career experts to give you the competitive edge.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${f.iconColor} rounded-lg flex items-center justify-center mb-6`}>
                <span className="font-bold">#</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;