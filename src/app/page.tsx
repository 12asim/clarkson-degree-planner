"use client";

import React, { useEffect, useState } from 'react';
import { CS_ROADMAP_TEMPLATE } from '@/data/roadmap';
import { buildRoadmap, StudentProfile } from '@/utils/planner';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentProfile>({
    major: "Computer Science, B.S.",
    catalogYear: "2024-2025",
    completed: ["CS 141", "MA 131", "PH 131", "UNIV 190"],
    waived: ["FY 100"]
  });

  useEffect(() => {
    const saved = localStorage.getItem('student-profile');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        
        let majorFormatted = "Computer Science, B.S.";
        if (data.major === 'se') majorFormatted = "Software Engineering, B.S.";
        if (data.major === 'ce') majorFormatted = "Computer Engineering, B.S.";
        if (data.major === 'ds') majorFormatted = "Data Science, B.S.";

        let catalogFormatted = "2024-2025";
        if (data.catalogYear === '23-24') catalogFormatted = "2023-2024";
        if (data.catalogYear === '22-23') catalogFormatted = "2022-2023";

        setStudentInfo({
          major: majorFormatted,
          catalogYear: catalogFormatted,
          completed: data.completed || [],
          waived: data.waived || [],
        });
      } catch (e) {
        // use defaults
      }
    }
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-8 text-center text-slate-500">Loading overview...</div>;

  const {
    creditsCompleted,
    creditsRemaining,
    totalRequired,
    remainingCoursesCount,
    recommendedCourses,
    nextSemester
  } = buildRoadmap(studentInfo, CS_ROADMAP_TEMPLATE);

  const completionPercentage = Math.round((creditsCompleted / totalRequired) * 100) || 0;

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-12 w-full max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
          Academic Overview
        </h1>
        <p className="text-sm text-slate-500">
          Viewing overview for <span className="font-medium text-slate-700">{studentInfo.major}</span>
        </p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Completed Courses */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-medium text-slate-900">Credits Completed</h2>
            <span className="text-sm font-medium text-[#004e36] bg-[#004e36]/10 px-2.5 flex items-center h-6 rounded-md">
              {creditsCompleted} / {totalRequired}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 flex shadow-inner">
            <div className="h-full rounded-full bg-[#004e36]" style={{ width: `${completionPercentage}%` }}></div>
          </div>
          <p className="mt-4 text-sm text-slate-500 font-medium">
            You are {completionPercentage}% of the way to your degree requirements.
          </p>
        </div>
        
        {/* Remaining Required */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-medium text-slate-900 mb-4">Remaining Requirements</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
              <span className="text-slate-600">Remaining Credits</span>
              <span className="font-semibold text-slate-900">{creditsRemaining} cr</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
              <span className="text-slate-600">Remaining Courses</span>
              <span className="font-semibold text-slate-900">{remainingCoursesCount}</span>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              View your Planner to see a detailed semester breakdown of these remaining requirements.
            </p>
          </div>
        </div>

        {/* Next Semester */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <h2 className="text-base font-medium text-slate-900 mb-4">
            Recommended Next Semester {nextSemester && <span className="text-slate-500 font-normal">({nextSemester.season} {nextSemester.year})</span>}
          </h2>
          {recommendedCourses.length > 0 ? (
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
              {recommendedCourses.map((c, i) => (
                <div key={c.code} className={`flex items-center justify-between p-4 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}>
                  <div>
                    <span className="font-medium text-slate-900 block">{c.code}</span>
                    <span className="text-sm text-slate-500 line-clamp-1">{c.title}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600 shrink-0 ml-4">{c.credits} cr</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 p-4 border border-slate-100 rounded-lg text-center bg-slate-50/50">
              No recommended courses found. You might have finished your degree!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
