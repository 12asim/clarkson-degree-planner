"use client";

import React, { useEffect, useState } from 'react';

import { CourseState, Semester, Course, CS_ROADMAP_TEMPLATE } from '@/data/roadmap';
import { buildRoadmap } from '@/utils/planner';

function StateBadge({ state, grade }: { state: CourseState; grade?: string }) {
  switch (state) {
    case 'completed':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-200">Completed{grade ? ` (${grade})` : ''}</span>;
    case 'in-progress':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-800 border border-blue-200">In Progress</span>;
    case 'remaining':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600 border border-slate-200">Remaining</span>;
    case 'recommended':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-800 border border-amber-200">Recommended</span>;
    case 'waived':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-purple-100 text-purple-800 border border-purple-200">Waived</span>;
  }
}

export default function RoadmapPage() {
  const [mounted, setMounted] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
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
        // use defaults on parse error
      }
    }
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-8 text-center text-slate-500">Loading roadmap...</div>;

  // -- DYNAMIC CALCULATION --
  const {
    roadmap: finalRoadmap,
    creditsCompleted,
    creditsInProgress,
    creditsRemaining,
    totalRequired,
    remainingCoursesCount,
    nextSemester,
    recommendedCourses
  } = buildRoadmap(studentInfo, CS_ROADMAP_TEMPLATE);

  // -- RENDER --
  return (
    <div className="px-4 sm:px-8 py-8 sm:py-12 w-full max-w-5xl mx-auto">
      {/* Header section */}
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
          Degree Roadmap
        </h1>
        <p className="text-sm text-slate-500">
          Viewing roadmap for <span className="font-medium text-slate-700">{studentInfo.major}</span>
        </p>
      </header>

      {/* Student Summary Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-12 shadow-sm flex flex-col md:flex-row gap-8">
        <div className="flex-[1.5] space-y-5 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6 flex flex-col justify-center">
          <div>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Program</h2>
            <p className="text-base font-semibold text-slate-900">{studentInfo.major}</p>
          </div>
          <div>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Catalog Year</h2>
            <p className="text-sm font-medium text-slate-700">{studentInfo.catalogYear}</p>
          </div>
        </div>

        {/* Simple Progress Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Overall Progress</h2>
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-semibold text-[#004e36] leading-none tracking-tight">{creditsCompleted} <span className="text-sm font-medium text-slate-400">/ {totalRequired} cr</span></span>
            <span className="text-sm text-slate-500 font-medium">
              {Math.round((creditsCompleted / totalRequired) * 100)}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 flex shadow-inner">
            <div className="h-full bg-[#004e36]" style={{ width: `${(creditsCompleted / totalRequired) * 100}%` }}></div>
            <div className="h-full bg-blue-400" style={{ width: `${(creditsInProgress / totalRequired) * 100}%` }}></div>
          </div>
          <div className="mt-4 flex gap-5 text-[11px] font-medium tracking-wide">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#004e36]"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-2.5 h-2.5 rounded-sm bg-blue-400"></div>
              <span>In Progress</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500 font-medium">
            <span>{remainingCoursesCount} courses remaining</span>
            <span>{creditsRemaining} cr remaining</span>
          </div>
        </div>
      </div>

      {/* Recommended Next Semester Panel */}
      {recommendedCourses.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-sm font-medium text-slate-900 mb-4">Recommended Next Semester {nextSemester && <span className="text-slate-500 font-normal">({nextSemester.season} {nextSemester.year})</span>}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {recommendedCourses.map(c => (
              <div key={c.code} className="p-3 rounded border border-slate-100 bg-slate-50/50 flex flex-col justify-between hover:border-slate-200 transition-colors">
                <div className="mb-2">
                  <span className="font-medium text-sm text-slate-900 block">{c.code}</span>
                  <span className="text-xs text-slate-500 line-clamp-1" title={c.title}>{c.title}</span>
                </div>
                <span className="text-xs font-semibold text-slate-600">{c.credits} cr</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roadmap Timeline */}
      <div className="relative">
        {/* Timeline Line (Mobile) */}
        <div className="md:hidden absolute left-[15px] top-2 bottom-0 w-px bg-slate-200"></div>
        {/* Timeline Line (Desktop) */}
        <div className="hidden md:block absolute left-[111px] top-2 bottom-0 w-px bg-slate-200"></div>
        
        <div className="space-y-10">
          {finalRoadmap.map((semester) => {
            const isCurrent = semester.status === 'current';
            const credits = semester.courses.reduce((acc, current) => acc + current.credits, 0);

            return (
              <div key={semester.id} className="relative pl-12 md:pl-0 md:flex md:gap-14">
                {/* Timeline dot */}
                <div className={`absolute left-[10.5px] md:left-[106.5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white z-10 ${
                  isCurrent ? 'bg-[#004e36] ring-8 ring-[#004e36]/10' : 
                  semester.status === 'past' ? 'bg-slate-300' : 'bg-white border-2 border-slate-300'
                }`}></div>
                
                {/* Semester Header: Desktop left, Mobile top */}
                <div className="mb-4 md:mb-0 md:w-[84px] md:text-right md:shrink-0 pt-0.5">
                  <h3 className="text-sm font-semibold text-slate-900 leading-tight">{semester.season}</h3>
                  <p className="text-sm font-semibold text-slate-900 leading-tight">{semester.year}</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-2">{credits} Credits</p>
                  {isCurrent && (
                    <span className="inline-block mt-3 text-[10px] uppercase tracking-widest font-bold bg-[#004e36]/10 text-[#004e36] px-2 py-1 rounded">Current</span>
                  )}
                </div>
                
                {/* Course List */}
                <div className={`flex-1 flex flex-col gap-3 p-5 rounded-xl border ${isCurrent ? 'border-[#004e36]/20 bg-[#004e36]/[0.01] shadow-sm' : 'border-slate-200 bg-white shadow-sm'}`}>
                  {semester.courses.map((course) => (
                    <div key={course.code} className="group flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 rounded-lg border border-slate-100 bg-white hover:border-slate-300 hover:shadow-md transition-all cursor-default">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-semibold text-sm text-slate-900 group-hover:text-[#004e36] transition-colors">{course.code}</span>
                          <StateBadge state={course.state} grade={course.grade} />
                        </div>
                        <span className="text-sm text-slate-600">{course.title}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded shrink-0 w-fit">{course.credits} cr</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
