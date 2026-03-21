import { Show, UserButton, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#004e36] text-sm font-bold tracking-wider text-white shadow-sm">
            CU
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Degree Planner
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
          <Show when="signed-in">
            <span className="hidden sm:inline-block border-r border-slate-200 pr-4">Student View</span>
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-medium rounded-lg transition-colors border border-slate-200 shadow-sm">
                Log In
              </button>
            </SignInButton>
          </Show>
        </div>
      </div>
    </header>
  );
}
