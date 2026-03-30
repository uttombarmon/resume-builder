"use client";

import { useState } from "react";
import { Check, Loader2, Zap } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function UpgradeModal({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const onUpgrade = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-amber-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <Zap className="w-12 h-12 mb-4 opacity-80" />
            <DialogTitle className="text-3xl font-black mb-2">Upgrade to Pro</DialogTitle>
            <DialogDescription className="text-amber-100 font-medium text-lg">
                Unlock the full power of AI and land your dream job faster.
            </DialogDescription>
        </div>

        <div className="p-8 space-y-6 bg-white dark:bg-slate-900">
            <ul className="space-y-4">
                {[
                    "Unlimited AI resume generations",
                    "Job-specific AI optimization",
                    "Premium ATS-friendly templates",
                    "Advanced customization options",
                    "Priority support & updates",
                ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600">
                            <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-bold text-sm">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="pt-4">
                <div className="flex items-baseline gap-2 mb-6 justify-center">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">$9</span>
                    <span className="text-slate-500 font-bold">/ month</span>
                </div>

                <Button 
                    onClick={onUpgrade}
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-lg shadow-xl shadow-amber-600/20 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        "Upgrade Now"
                    )}
                </Button>
                <p className="text-center text-xs text-slate-400 font-medium mt-4">
                    Secure payment via Stripe. Cancel anytime.
                </p>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
