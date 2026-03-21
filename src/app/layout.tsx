import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";
import { ClerkProvider, Show } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clarkson Degree Planner",
  description: "A simple degree roadmap planner for Clarkson students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased bg-white">
        <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col font-sans bg-white text-slate-900 selection:bg-green-100 selection:text-green-900`}>
          <TopNav />
          <div className="flex flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Show when="signed-in">
              <Sidebar />
            </Show>
            <main className="flex-1 min-w-0 bg-white">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
