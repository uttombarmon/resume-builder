import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    desc: "Perfect for getting started and creating your first professional resume.",
    price: "$0",
    features: [
      "Access to basic templates",
      "Standard PDF export",
      "Basic customization options",
      "1 Resume included",
    ],
    cta: "Start for free",
    href: "/auth/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    desc: "For serious job seekers who want to stand out with premium features.",
    price: "$9",
    features: [
      "All premium templates",
      "Unlimited resumes",
      "Advanced customization",
      "Cover letter builder",
      "ATS optimization checks",
    ],
    cta: "Upgrade to Pro",
    href: "/auth/sign-up?plan=pro",
    highlighted: true,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Choose the plan that best fits your career goals. Upgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-3xl p-8 border ${
                plan.highlighted
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10 shadow-xl shadow-amber-500/10 relative"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
              } flex flex-col transition-all duration-300 hover:-translate-y-1`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium h-12">{plan.desc}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline text-5xl font-black text-slate-900 dark:text-white">
                  {plan.price}
                  <span className="text-xl font-medium text-slate-500 dark:text-slate-400 ml-2">/mo</span>
                </div>
              </div>

              <ul className="mb-8 space-y-4 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start">
                    <Check className={`shrink-0 h-6 w-6 mr-3 ${plan.highlighted ? "text-amber-500" : "text-emerald-500"}`} />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full py-4 px-6 rounded-xl font-bold text-center transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 active:scale-[0.98]"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white active:scale-[0.98]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
