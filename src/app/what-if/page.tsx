"use client";

import React, { useState, useEffect } from 'react';
import { CS_ROADMAP_TEMPLATE } from '@/data/roadmap';
import { buildRoadmap, StudentProfile } from '@/utils/planner';

// A stripped-down badge
function StateBadge({ state }: { state: string }) {
  if (state === 'current') return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[#004e36]/10 text-[#004e36]">Current</span>;
  if (state === 'future') return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-800">Future</span>;
  return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600">Past</span>;
}

export default function WhatIfPage() {
  const [mounted, setMounted] = useState(false);
  const [originalProfile, setOriginalProfile] = useState<StudentProfile | null>(null);
  
  // Simulation states
  const [simCompleted, setSimCompleted] = useState<string[]>([]);
  const [simInput, setSimInput] = useState("");

  const loadProfile = () => {
    const saved = localStorage.getItem('student-profile');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const profile: StudentProfile = {
          major: data.major || "Computer Science, B.S.",
          catalogYear: data.catalogYear || "2024-2025",
          completed: data.completed || [],
          waived: data.waived || [],
        };
        setOriginalProfile(profile);
        setSimCompleted([...profile.completed]);
      } catch (e) {
        // ignore
      }
    } else {
      const defaultP: StudentProfile = {
        major: "Computer Science, B.S.",
        catalogYear: "2024-2025",
        completed: ["CS 141", "MA 131", "PH 131", "UNIV 190"],
        waived: ["FY 100"]
      };
      setOriginalProfile(defaultP);
      setSimCompleted([...defaultP.completed]);
    }
  };

  useEffect(() => {
    loadProfile();
    setMounted(true);
  }, []);

  if (!mounted || !originalProfile) return <div className="p-8 text-center text-slate-500">Loading simulator...</div>;

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = simInput.trim().toUpperCase();
      if (val && !simCompleted.includes(val)) {
        setSimCompleted([...simCompleted, val]);
      }
      setSimInput("");
    }
  };

  const handleRemove = (code: string) => {
    setSimCompleted(simCompleted.filter(c => c !== code));
  };

  const handleReset = () => {
    setSimCompleted([...originalProfile.completed]);
  };

  const handleSaveToProfile = () => {
    const nextSaved = {
      ...originalProfile,
      completed: simCompleted
    };
    localStorage.setItem('student-profile', JSON.stringify(nextSaved));
    setOriginalProfile(nextSaved);
    alert("Simulation saved to your permanent profile!");
  };

  const simulatedProfile: StudentProfile = {
    ...originalProfile,
    completed: simCompleted
  };

  const {
    roadmap,
    recommendedCourses,
    nextSemester,
    remainingCoursesCount
  } = buildRoadmap(simulatedProfile, CS_ROADMAP_TEMPLATE);

  const futureSemesters = roadmap.filter(s => s.status === 'future' || s.status === 'current');

  return (
    <div className="px-8 py-10 w-full max-w-5xl mx-auto space-y-10">
      <header className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
            What-If Simulator
          </h1>
          <p className="text-sm text-slate-500">
            Temporarily add or remove courses to see how your roadmap updates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={handleReset}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors border border-slate-200 shadow-sm"
          >
            Reset Simulator
          </button>
          <button 
            type="button" 
            onClick={handleSaveToProfile}
            className="px-4 py-2 bg-[#004e36] hover:bg-[#003b29] text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            Save to Profile
          </button>
        </div>
      </header>

      {/* 1. Simulator Editor */}
      <section className="bg-white border border-[#004e36]/30 rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#004e36]"></div>
        <h2 className="text-sm font-bold text-slate-900 mb-4 pl-2">Simulated Completed Courses</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[100px] flex items-start shadow-inner cursor-text" onClick={() => document.getElementById("sim-input")?.focus()}>
          <div className="flex flex-wrap gap-2.5 items-start content-start w-full">
            {simCompleted.map((course) => {
              const isAddedInSim = !originalProfile.completed.includes(course);
              return (
                <span key={course} className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-sm font-medium shadow-sm transition-all ${
                  isAddedInSim 
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:border-emerald-400" 
                  : "bg-white border-slate-200 text-slate-700 hover:border-[#004e36]/30"
                }`}>
                  {course}
                  <button type="button" onClick={(e) => { e.stopPropagation(); handleRemove(course); }} className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">&times;</button>
                </span>
              );
            })}
            <input 
              id="sim-input"
              type="text" 
              value={simInput}
              onChange={(e) => setSimInput(e.target.value)}
              onKeyDown={handleAdd}
              placeholder="Type completed course & press Enter..." 
              className="flex-1 min-w-[280px] bg-transparent text-sm text-slate-900 border-none focus:ring-0 px-1 py-1 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500 pl-2 flex items-center gap-2">
          <span>Changes are local. New courses are highlighted in</span> 
          <span className="text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-1.5 rounded-sm">green</span>
        </p>
      </section>

      {/* 2. Simulation Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Recommended Next Semester */}
        <div className="space-y-4">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            Recomputed Next Semester
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-900 mb-4">
              {nextSemester ? `${nextSemester.season} ${nextSemester.year}` : 'Degree Complete!'}
            </h3>
            {recommendedCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {recommendedCourses.map(c => (
                  <div key={c.code} className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between group hover:border-slate-200 transition-colors">
                    <div>
                      <span className="font-semibold text-slate-900 text-sm block">{c.code}</span>
                      <span className="text-xs text-slate-500">{c.title}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm">{c.credits} cr</span>
                  </div>
                ))}
              </div>
            ) : (
             <p className="text-sm text-slate-500">No recommended courses. All requirements met!</p>
            )}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded inline-block">
                {remainingCoursesCount} Total Courses Remaining Let
              </span>
            </div>
          </div>
        </div>

        {/* Roadmap Snapshot */}
        <div className="space-y-4">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            Future Roadmap Preview
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full max-h-[500px]">
            <div className="flex-1 p-0 overflow-y-auto">
              {futureSemesters.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {futureSemesters.map(sem => {
                    const totalCr = sem.courses.reduce((acc, c) => acc + c.credits, 0);
                    return (
                      <div key={sem.id} className="p-5 hover:bg-slate-50/50 transition-colors group">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-slate-900">{sem.season} {sem.year}</h4>
                          <StateBadge state={sem.status} />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">
                          {sem.courses.map(c => c.code).join(', ')}
                        </p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-500 transition-colors">
                          {totalCr} Credits
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm">No future semesters needed.</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
