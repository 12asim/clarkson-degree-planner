"use client";

import React, { useEffect, useState } from 'react';
import { CS_ROADMAP_TEMPLATE, CourseState, Course, Semester } from '@/data/roadmap';
import { buildRoadmap, StudentProfile } from '@/utils/planner';

export default function AdvisorSummaryPage() {
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

  if (!mounted) return <div className="p-8 text-center text-slate-500">Loading summary...</div>;

  const {
    roadmap: finalRoadmap,
    creditsCompleted,
    creditsRemaining,
    totalRequired,
    remainingCoursesCount,
    recommendedCourses,
    nextSemester
  } = buildRoadmap(studentInfo, CS_ROADMAP_TEMPLATE);

  const completionPercentage = Math.round((creditsCompleted / totalRequired) * 100) || 0;
  // Unique completed courses count
  const allCompletedCodes = new Set([...studentInfo.completed, ...studentInfo.waived]);
  const completedCoursesCount = allCompletedCodes.size;

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-12 w-full max-w-5xl mx-auto space-y-12">
      <header className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Advisor Summary Report
          </h1>
          <p className="text-sm text-slate-500">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>
        <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors border border-slate-200 flex items-center gap-2" onClick={() => window.print()}>
          Print Report
        </button>
      </header>

      {/* 1. Student Summary & Course Counts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Student Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-slate-500 mb-1">Major</span>
                <span className="block text-sm font-semibold text-slate-900">{studentInfo.major}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500 mb-1">Catalog Year</span>
                <span className="block text-sm font-semibold text-slate-900">{studentInfo.catalogYear}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Course Tracking</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-4xl font-semibold text-[#004e36]">{completedCoursesCount}</span>
                <span className="block text-xs text-slate-500 mt-1">Completed / Waived</span>
              </div>
              <div>
                <span className="block text-4xl font-semibold text-slate-700">{remainingCoursesCount}</span>
                <span className="block text-xs text-slate-500 mt-1">Courses Remaining</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 & 3. Progress / Remaining Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-center shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Degree Progress</h2>
          <div className="flex items-end justify-between mb-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-4xl font-semibold text-slate-900 tracking-tight leading-none">{creditsCompleted}</span>
              <span className="text-sm font-medium text-slate-400 ml-1.5">/ {totalRequired} cr earned</span>
            </div>
            <span className="text-lg font-bold text-[#004e36] bg-[#004e36]/10 px-3 py-1 rounded-lg">
              {completionPercentage}%
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Credits Remaining</span>
              <span className="font-semibold text-slate-900">{creditsRemaining} cr</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Courses Remaining</span>
              <span className="font-semibold text-slate-900">{remainingCoursesCount}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Recommended Next Semester */}
      <section>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Next Semester Breakdown {nextSemester && <span className="lowercase normal-case font-normal">({nextSemester.season} {nextSemester.year})</span>}
        </h2>
        {recommendedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCourses.map(c => (
              <div key={c.code} className="bg-white border border-[#004e36]/20 p-4 rounded-xl shadow-sm flex flex-col gap-2 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#004e36]/60"></div>
                <div className="flex items-start justify-between pl-2">
                  <span className="font-semibold text-slate-900 text-sm">{c.code}</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">{c.credits} cr</span>
                </div>
                <span className="text-xs text-slate-600 leading-snug pl-2">{c.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-sm text-slate-500 italic">
            No recommended courses found.
          </div>
        )}
      </section>

      {/* 5. Simple Roadmap Snapshot */}
      <section>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Roadmap Snapshot</h2>
        <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900 rounded-tl-xl">Semester</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Total Credits</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Courses Preview</th>
                <th className="px-6 py-4 font-semibold text-slate-900 text-right rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {finalRoadmap.map((sem, index) => {
                const totalCr = sem.courses.reduce((acc, c) => acc + c.credits, 0);
                const coursesPreview = sem.courses.map(c => c.code).join(', ');
                
                return (
                  <tr key={sem.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{sem.season} {sem.year}</td>
                    <td className="px-6 py-4 text-slate-600">{totalCr} cr</td>
                    <td className="px-6 py-4 text-slate-500 truncate max-w-[200px] sm:max-w-xs xl:max-w-md" title={coursesPreview}>
                      {coursesPreview}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {sem.status === 'past' && <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600">Past</span>}
                      {sem.status === 'current' && <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-[#004e36]/10 text-[#004e36]">Current</span>}
                      {sem.status === 'future' && <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-800">Future</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
