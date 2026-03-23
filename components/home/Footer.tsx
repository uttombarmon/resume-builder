import { FileText } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-amber-600" size={32} />
              <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">ResumePro</span>
            </div>
            <p className="max-w-sm mb-6 leading-relaxed font-medium">
              Empowering professionals to build their future with industry-leading resume tools and expert career advice.
            </p>
          </div>
          
          {/* Footer Links */}
          <nav aria-label="Product Links">
            <h5 className="text-slate-900 dark:text-white font-bold mb-6">Product</h5>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="#" className="hover:text-amber-600 transition-colors">Templates</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">AI Writer</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Pricing</Link></li>
            </ul>
          </nav>

          <nav aria-label="Resource Links">
            <h5 className="text-slate-900 dark:text-white font-bold mb-6">Resources</h5>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="#" className="hover:text-amber-600 transition-colors">Career Blog</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Resume Guide</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Help Center</Link></li>
            </ul>
          </nav>
        </div>
        
        <div className="pt-12 border-t border-slate-100 dark:border-slate-800/50 text-xs text-center font-bold uppercase tracking-widest leading-loose">
          © {currentYear} ResumePro Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;