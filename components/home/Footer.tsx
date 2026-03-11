const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">ResumePro</span>
            </div>
            <p className="max-w-sm mb-6 leading-relaxed">
              Empowering professionals to build their future with industry-leading resume tools and expert career advice.
            </p>
          </div>
          
          {/* Footer Links */}
          <div>
            <h5 className="text-white font-bold mb-6">Product</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Writer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Resources</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Career Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resume Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-800 text-sm text-center">
          © {currentYear} ResumePro Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;