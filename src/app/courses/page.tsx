"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CoursesPage() {
  const router = useRouter();

  const [major, setMajor] = useState("cs");
  const [catalogYear, setCatalogYear] = useState("24-25");
  
  const [completed, setCompleted] = useState<string[]>([]);
  const [waived, setWaived] = useState<string[]>([]);
  
  const [completedInput, setCompletedInput] = useState("");
  const [waivedInput, setWaivedInput] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('student-profile');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.major) setMajor(data.major);
        if (data.catalogYear) setCatalogYear(data.catalogYear);
        if (data.completed) setCompleted(data.completed);
        if (data.waived) setWaived(data.waived);
      } catch (e) {
        // ignore JSON parse errors
      }
    } else {
      // Default demo data
      setCompleted(["CS 141", "MA 131", "PH 131", "UNIV 190"]);
      setWaived(["FY 100"]);
    }
    setMounted(true);
  }, []);

  const handleAddCompleted = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = completedInput.trim().toUpperCase();
      if (val && !completed.includes(val)) {
        setCompleted([...completed, val]);
      }
      setCompletedInput("");
    }
  };

  const handleAddWaived = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = waivedInput.trim().toUpperCase();
      if (val && !waived.includes(val)) {
        setWaived([...waived, val]);
      }
      setWaivedInput("");
    }
  };

  const removeCompleted = (code: string) => {
    setCompleted(completed.filter(c => c !== code));
  };

  const removeWaived = (code: string) => {
    setWaived(waived.filter(c => c !== code));
  };

  const handleSave = () => {
    localStorage.setItem('student-profile', JSON.stringify({
      major,
      catalogYear,
      completed,
      waived
    }));
    router.push('/roadmap');
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-12 w-full max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
          My Courses
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your completed and waived courses to keep your roadmap accurate.
        </p>
      </header>

      <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
        <section>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900">
                  Completed Courses
                </label>
                <p className="text-xs text-slate-500 mt-1">Add previous courses taken at Clarkson or transfer equivalents.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[100px] flex items-start shadow-inner cursor-text" onClick={() => document.getElementById("completed-input")?.focus()}>
                <div className="flex flex-wrap gap-2.5 items-start content-start w-full">
                  {completed.map((course) => (
                    <span key={course} className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-[#004e36]/30">
                      {course}
                      <button type="button" onClick={(e) => { e.stopPropagation(); removeCompleted(course); }} className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">&times;</button>
                    </span>
                  ))}
                  <input 
                    id="completed-input"
                    type="text" 
                    value={completedInput}
                    onChange={(e) => setCompletedInput(e.target.value)}
                    onKeyDown={handleAddCompleted}
                    placeholder="Type course and press Enter (e.g. CS 142)..." 
                    className="flex-1 min-w-[280px] bg-transparent text-sm text-slate-900 border-none focus:ring-0 px-1 py-1 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900">
                  AP / Waived Courses
                </label>
                <p className="text-xs text-slate-500 mt-1">Add requirements completed via AP credit or explicitly waived by advisor.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[100px] flex items-start shadow-inner cursor-text" onClick={() => document.getElementById("waived-input")?.focus()}>
                <div className="flex flex-wrap gap-2.5 items-start content-start w-full">
                  {waived.map((course) => (
                    <span key={course} className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-medium text-purple-800 shadow-sm transition-all hover:border-purple-300">
                      {course}
                      <button type="button" onClick={(e) => { e.stopPropagation(); removeWaived(course); }} className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">&times;</button>
                    </span>
                  ))}
                  <input 
                    id="waived-input"
                    type="text" 
                    value={waivedInput}
                    onChange={(e) => setWaivedInput(e.target.value)}
                    onKeyDown={handleAddWaived}
                    placeholder="Type course and press Enter..." 
                    className="flex-1 min-w-[280px] bg-transparent text-sm text-slate-900 border-none focus:ring-0 px-1 py-1 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Changes will update your Roadmap and Overview.
          </p>
          <button 
            type="button" 
            onClick={handleSave}
            className="rounded-lg bg-[#004e36] px-8 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#003b29] focus:outline-none focus:ring-2 focus:ring-[#004e36] focus:ring-offset-2 transition-all active:scale-[0.98]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
