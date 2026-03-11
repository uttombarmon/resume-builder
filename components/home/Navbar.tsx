import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              ResumePro
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Templates
            </Link>
            <Link
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Expert Tips
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
