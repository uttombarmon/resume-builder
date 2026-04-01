import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreditCard, Check, Shield, Download, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UpgradeModal } from "@/components/dashboard/UpgradeModal";

export default async function BillingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const { user } = session;
  const isPro = (user as any).plan === "pro";

  return (
    <div className="space-y-10 font-sans max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Billing & Subscription
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage your subscription plan, billing cycle, and payment history securely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Current Plan Card */}
        <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="relative z-10 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Active Plan</p>
                    <Badge className={`${isPro ? "bg-emerald-500" : "bg-amber-600"} text-white font-bold rounded-lg px-2 py-0.5`}>
                        {isPro ? "PRO" : "FREE"}
                    </Badge>
                </div>
                <CardTitle className="text-3xl font-black text-slate-900 dark:text-white">
                    {isPro ? "Advanced Plan" : "Basic Access"}
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
                    {isPro ? "You are enjoying premium features." : "Unlock 1 AI resume generation."}
                </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-6">
                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{isPro ? "$9" : "$0"}</span>
                    <span className="text-slate-500 font-bold">/ month</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                    {isPro ? [
                        "Unlimited AI resume generations",
                        "Job-specific AI optimization",
                        "Premium ATS-friendly templates",
                        "Priority email support"
                    ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <Check size={16} className="text-amber-600" strokeWidth={3} />
                            <span className="text-slate-700 dark:text-slate-300 font-bold text-sm">{feature}</span>
                        </li>
                    )) : [
                        "1 AI resume generation",
                        "Standard templates",
                        "Basic PDF export"
                    ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <Check size={16} className="text-slate-400" strokeWidth={3} />
                            <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>

                {isPro ? (
                    <Button className="w-full rounded-xl font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 h-12 text-slate-900 dark:text-white transition-colors">
                        Manage Premium Subscription
                    </Button>
                ) : (
                    <UpgradeModal>
                        <Button className="w-full rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white h-12 shadow-lg shadow-amber-600/20 text-lg">
                            Upgrade to Pro
                        </Button>
                    </UpgradeModal>
                )}
            </CardContent>
            <CardFooter className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 justify-center text-xs font-black text-slate-400 uppercase tracking-widest">
                <Shield size={14} className="text-amber-500" />
                Secure Payments via Stripe
            </CardFooter>
        </Card>

        {/* Payment Methods and History */}
        <div className="space-y-6">
            <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 p-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">Payment Method</h3>
                {isPro ? (
                    <div className="flex items-center justify-between border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-4 group hover:border-amber-500 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white leading-none mb-1">•••• 4242</p>
                                <p className="text-xs text-slate-500 font-medium">Expires 12/26</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="font-bold text-amber-600 rounded-lg">Edit</Button>
                    </div>
                ) : (
                    <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl mb-4">
                        <CreditCard className="mx-auto text-slate-300 mb-2" size={32} />
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">No payment method added yet.</p>
                    </div>
                )}
                {!isPro && (
                    <Button variant="outline" className="w-full rounded-xl font-bold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                        Add Payment Method
                    </Button>
                )}
            </Card>

            <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 p-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                    Billing History
                    <Receipt size={20} className="text-slate-400" />
                </h3>
                {isPro ? (
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Pro Plan - Monthly</p>
                            <p className="text-xs text-slate-500 font-medium">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-900 dark:text-white">$9.00</span>
                            <Button variant="ghost" size="icon" className="rounded-lg text-slate-400 hover:text-amber-600 group">
                                <Download size={16} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">No past transactions found.</p>
                    </div>
                )}
            </Card>
        </div>
      </div>
    </div>
  );
}
