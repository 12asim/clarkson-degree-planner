export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#004e36] text-sm font-bold tracking-wider text-white shadow-sm">
            CU
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Degree Planner
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
          <span>Student View</span>
        </div>
      </div>
    </header>
  );
}
