import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User, Mail, Bell, Shield, Moon, Sun, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const { user } = session;

  return (
    <div className="space-y-10 font-sans max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage your account settings, profile preferences, and security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Settings */}
        <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-6">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <User className="text-amber-600" />
                    Profile Information
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
                    Update your personal details and how others see you.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div className="relative group">
                        <Avatar className="h-24 w-24 rounded-3xl border-4 border-slate-100 dark:border-slate-800 shadow-lg">
                            <AvatarImage src={user.image || ""} />
                            <AvatarFallback className="bg-amber-600 text-white text-3xl font-black">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <button className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors">
                            <Save size={16} />
                        </button>
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-400 ml-1">Full Name</Label>
                                <Input 
                                    defaultValue={user.name}
                                    className="rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-12 font-bold focus-visible:ring-amber-500/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase text-slate-400 ml-1">Email Address</Label>
                                <div className="relative">
                                    <Input 
                                        defaultValue={user.email}
                                        disabled
                                        className="rounded-xl bg-slate-100 dark:bg-slate-800/50 border-none h-12 font-bold text-slate-400 cursor-not-allowed pr-10"
                                    />
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-2">
                    <Button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black px-8 h-12 shadow-lg shadow-slate-900/10 hover:opacity-90">
                        Save Changes
                    </Button>
                </div>
            </CardContent>
        </Card>

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 p-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <Sun className="text-amber-500" size={24} />
                    Appearance
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Dark Mode</p>
                            <p className="text-sm text-slate-500 font-medium tracking-tight">Toggle between light and dark themes</p>
                        </div>
                        <Switch className="data-[state=checked]:bg-amber-600" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Compact View</p>
                            <p className="text-sm text-slate-500 font-medium tracking-tight">Show more content in the dashboard</p>
                        </div>
                        <Switch className="data-[state=checked]:bg-amber-600" />
                    </div>
                </div>
            </Card>

            <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 p-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <Bell className="text-blue-500" size={24} />
                    Notifications
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Email Updates</p>
                            <p className="text-sm text-slate-500 font-medium tracking-tight">Product news and feature releases</p>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-amber-600" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Job Tips</p>
                            <p className="text-sm text-slate-500 font-medium tracking-tight">Tips for improving your resume</p>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-amber-600" />
                    </div>
                </div>
            </Card>
        </div>

        {/* Danger Zone */}
        <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/40 dark:shadow-none dark:bg-slate-900 overflow-hidden border-2 border-red-50 dark:border-red-900/10">
            <CardHeader className="bg-red-50/50 dark:bg-red-900/5 pb-6">
                <CardTitle className="text-2xl font-black flex items-center gap-3 text-red-600">
                    <Shield className="text-red-500" />
                    Security & Privacy
                </CardTitle>
                <CardDescription className="text-red-600/60 font-medium">
                    Permanently delete your account and all associated data.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-md">
                        <p className="font-bold text-slate-900 dark:text-white mb-1">Delete Account</p>
                        <p className="text-sm text-slate-500 font-medium">
                            Once your account is deleted, all of your resumes and AI generations will be permanently removed. This action is irreversible.
                        </p>
                    </div>
                    <Button variant="outline" className="rounded-xl font-bold border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 h-12 px-8 gap-2">
                        <Trash2 size={18} />
                        Delete Account
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
