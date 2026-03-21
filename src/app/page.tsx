import Link from 'next/link';
import { Show } from '@clerk/nextjs';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-16 px-4 sm:px-8 text-center min-h-[80vh]">
      <div className="inline-flex items-center gap-2 mb-8 bg-green-50 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
        <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
        Clarkson University Unofficial
      </div>
      
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
        Your Degree, <span className="text-transparent bg-clip-text bg-linear-to-r from-[#004e36] to-green-600">Perfectly Planned.</span>
      </h1>
      
      <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
        The lightweight degree planning sandbox built specifically for Clarkson students. Experiment with mapping your remaining requirements without the bulk of MyCU.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <Show when="signed-out">
          <Link href="/sign-up" className="w-full sm:w-auto px-8 py-3.5 bg-[#004e36] hover:bg-[#003b29] text-white font-semibold rounded-xl text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            Get Started
          </Link>
          <Link href="/sign-in" className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold rounded-xl text-base shadow-sm hover:shadow transition-all active:scale-[0.98]">
            Log In Existing
          </Link>
        </Show>
        <Show when="signed-in">
          <Link href="/overview" className="w-full sm:w-auto px-10 py-3.5 bg-[#004e36] hover:bg-[#003b29] text-white font-bold rounded-xl text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            Go to My Planner →
          </Link>
        </Show>
      </div>

      <div className="mt-24 grid sm:grid-cols-3 gap-8 text-left w-full border-t border-slate-100 pt-16">
        <div>
          <div className="h-10 w-10 rounded-lg bg-green-100 text-[#004e36] flex items-center justify-center font-bold mb-4 shadow-sm border border-green-200">1</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Configure Profile</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Instantly load your catalog year, major requirements, and completed transfer or AP credits.</p>
        </div>
        <div>
          <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-4 shadow-sm border border-blue-200">2</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Simulate Paths</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Run real-time what-if simulations to see exactly how adding a minor or failing a prerequisite shifts your timeline.</p>
        </div>
        <div>
          <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4 shadow-sm border border-amber-200">3</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Auto-Generate Roadmap</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Watch as a beautiful, print-ready, semester-by-semester layout is generated predicting exactly when to graduate.</p>
        </div>
      </div>
    </div>
  );
}
