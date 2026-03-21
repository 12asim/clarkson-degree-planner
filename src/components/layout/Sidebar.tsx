"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/" },
    { name: "My Courses", href: "/courses" },
    { name: "Planner", href: "/roadmap" },
  ];

  const bottomNavItems = [
    { name: "Setup Profile", href: "/setup" },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50/40 shrink-0 hidden md:block">
      <div className="sticky top-16 flex flex-col justify-between py-8 px-4 h-[calc(100vh-4rem)]">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`rounded-md flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-white border border-slate-200 shadow-sm text-[#004e36]" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <nav className="flex flex-col gap-1 mt-auto pb-4">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`rounded-md flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-white border border-slate-200 shadow-sm text-[#004e36]" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
