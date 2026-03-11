import Image from "next/image";

const logos = [
  {
    name: "Google",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Amazon",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Microsoft",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "Meta",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "Apple",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
];

const LogoBar = () => {
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Our graduates work at the world&apos;s best companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo) => (
            <Image
              key={logo.name}
              src={logo.url}
              alt={`${logo.name} Logo`}
              className="h-6 md:h-8 w-auto object-contain"
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
