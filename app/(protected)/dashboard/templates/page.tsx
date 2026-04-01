import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Layout, Search, Filter, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TemplateGallery from "@/components/templates/TemplateGallery";

export default async function TemplatesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-10 font-sans max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Professional Templates
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
            Choose from a wide variety of ATS-friendly templates designed by industry experts to get you hired.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-600/20 h-12 px-6 gap-2">
            <Sparkles size={20} />
            AI Recommendations
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <TemplateGallery />
    </div>
  );
}
