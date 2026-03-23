import { Linkedin } from "lucide-react";
import Image from "next/image";
import React from "react";

const SocialSignUp = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* LinkedIn Button */}
      <button 
        type="button" 
        aria-label="Join with LinkedIn"
        className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:border-amber-600/30 group active:scale-[0.98]"
      >
        <div className="w-5 h-5 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
          <Linkedin className="text-[#0077B5]" size={20} />
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">LinkedIn</span>
      </button>

      {/* Google Button */}
      <button 
        type="button" 
        aria-label="Join with Google"
        className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:border-amber-600/30 group active:scale-[0.98]"
      >
        <img
          className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all"
          alt=""
          aria-hidden="true"
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        />
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Google</span>
      </button>
    </div>
  );
};

export default SocialSignUp;
