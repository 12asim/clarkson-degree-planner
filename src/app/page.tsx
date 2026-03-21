export default function Home() {
  return (
    <div className="px-8 py-10 w-full max-w-4xl">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Academic Overview
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Track your progress towards graduation and plan upcoming semesters.
        </p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Completed Courses */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-medium text-slate-900">Credits Completed</h2>
            <span className="text-sm font-medium text-[#004e36] bg-[#004e36]/10 px-2 flex items-center h-6 rounded-md">64 / 120</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[53%] rounded-full bg-[#004e36]"></div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            You are 53% of the way to your degree requirements.
          </p>
        </div>
        
        {/* Remaining Required */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-medium text-slate-900 mb-4">Remaining Requirements</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
              <span className="text-slate-600">Major Core</span>
              <span className="font-medium text-slate-900">18 cr</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
              <span className="text-slate-600">Clarkson Common Core</span>
              <span className="font-medium text-slate-900">6 cr</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Free Electives</span>
              <span className="font-medium text-slate-900">32 cr</span>
            </div>
          </div>
        </div>

        {/* Next Semester */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <h2 className="text-base font-medium text-slate-900 mb-4">Recommended Next Semester</h2>
          <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between bg-slate-50/50 p-4">
              <div>
                <span className="font-medium text-slate-900 block">CS 344</span>
                <span className="text-sm text-slate-500">Algorithms and Data Structures</span>
              </div>
              <span className="text-sm font-medium text-slate-600">3 cr</span>
            </div>
            <div className="flex items-center justify-between bg-white p-4">
              <div>
                <span className="font-medium text-slate-900 block">CS 350</span>
                <span className="text-sm text-slate-500">Software Design and Development</span>
              </div>
              <span className="text-sm font-medium text-slate-600">3 cr</span>
            </div>
            <div className="flex items-center justify-between bg-white p-4">
              <div>
                <span className="font-medium text-slate-900 block">MA 211</span>
                <span className="text-sm text-slate-500">Foundations of Computer Science</span>
              </div>
              <span className="text-sm font-medium text-slate-600">3 cr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
