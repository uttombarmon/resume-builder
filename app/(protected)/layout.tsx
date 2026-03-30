import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { 
  Bell, 
  Search, 
  Plus, 
  Menu 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const { user } = session;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <DashboardSidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 border-b bg-white dark:bg-slate-900 px-6 flex items-center justify-between transition-colors duration-300 relative z-10">
          <div className="flex items-center gap-4 lg:gap-0 flex-1">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu size={24} />
            </Button>
            
            <div className="max-w-md w-full relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Search resumes..." 
                className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus-visible:ring-amber-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent">
                  <Avatar className="h-9 w-9 rounded-lg border-2 border-amber-600/20">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="bg-amber-600 text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 mt-2">
                <div className="px-3 py-2.5 border-b mb-1">
                    <p className="text-xs font-black text-slate-400 uppercase">Signed in as</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user.email}</p>
                </div>
                <DropdownMenuItem className="rounded-xl font-bold gap-3 cursor-pointer py-2.5">
                    Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl font-bold gap-3 cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20">
                    Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
