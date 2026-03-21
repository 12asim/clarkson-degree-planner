import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50/40 shrink-0 hidden md:block">
      <div className="sticky top-16 flex flex-col py-8 px-4 h-[calc(100vh-4rem)]">
        <nav className="flex flex-col gap-1">
          <Link 
            href="/" 
            className="rounded-md bg-white border border-slate-200 shadow-sm flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#004e36]"
          >
            Overview
          </Link>
          <Link 
            href="#" 
            className="rounded-md flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            My Courses
          </Link>
          <Link 
            href="#" 
            className="rounded-md flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            Roadmap
          </Link>
        </nav>
      </div>
    </aside>
  );
}
