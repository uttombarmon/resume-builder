import { Linkedin } from "lucide-react";
import Image from "next/image";
import React from "react";

const SocialSignUp = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <Linkedin className=" text-blue-400" />

        <span className="text-sm font-semibold">LinkedIn</span>
      </button>

      <button className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <Image
          className="w-5 h-5"
          width={10}
          height={10}
          alt="Google Logo"
          src="/google.png"
        />

        <span className="text-sm font-semibold">Google</span>
      </button>
    </div>
  );
};

export default SocialSignUp;
