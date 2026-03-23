import type { Metadata } from "next";
import { Public_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils/cn";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "ResumePro — Build Your Professional Resume in Minutes",
  description:
    "Create ATS-friendly, professionally designed resumes in minutes. Land your dream job with ResumePro's expert templates and AI-powered tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geist.variable, publicSans.variable, "font-sans")}>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
