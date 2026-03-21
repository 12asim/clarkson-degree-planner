"use client";

import React, { useEffect, useState } from 'react';

type Semester = {
  id: string;
  season: string;
  year: number;
  status: 'past' | 'current' | 'future';
  courses: Course[];
};

type CourseState = 'completed' | 'in-progress' | 'remaining' | 'recommended' | 'waived';

type Course = {
  code: string;
  title: string;
  credits: number;
  state: CourseState;
  grade?: string;
};

// Base Template Data
const ROADMAP_TEMPLATE: Omit<Semester, 'status'>[] = [
  {
    id: "fall-2023",
    season: "Fall",
    year: 2023,
    courses: [
      { code: "CS 141", title: "Intro to Computer Science I", credits: 4, state: "remaining" },
      { code: "MA 131", title: "Calculus I", credits: 3, state: "remaining" },
      { code: "PH 131", title: "Physics I", credits: 4, state: "remaining" },
      { code: "FY 100", title: "First Year Seminar", credits: 1, state: "remaining" },
      { code: "UNIV 190", title: "Clarkson Seminar", credits: 3, state: "remaining" },
    ]
  },
  {
    id: "spring-2024",
    season: "Spring",
    year: 2024,
    courses: [
      { code: "CS 142", title: "Intro to Computer Science II", credits: 3, state: "remaining" },
      { code: "MA 132", title: "Calculus II", credits: 3, state: "remaining" },
      { code: "PH 132", title: "Physics II", credits: 4, state: "remaining" },
      { code: "KA 101", title: "Knowledge Area Elective", credits: 3, state: "remaining" },
      { code: "STAT 383", title: "Probability and Statistics", credits: 3, state: "remaining" },
    ]
  },
  {
    id: "fall-2024",
    season: "Fall",
    year: 2024,
    courses: [
      { code: "CS 241", title: "Computer Organization", credits: 3, state: "remaining" },
      { code: "CS 242", title: "Advanced Programming Concepts in Java", credits: 3, state: "remaining" },
      { code: "MA 211", title: "Foundations of Computer Science", credits: 3, state: "remaining" },
      { code: "COMM 210", title: "Theory of Rhetoric", credits: 3, state: "remaining" },
      { code: "KA 102", title: "Knowledge Area Elective", credits: 3, state: "remaining" },
    ]
  },
  {
    id: "spring-2025",
    season: "Spring",
    year: 2025,
    courses: [
      { code: "CS 344", title: "Algorithms and Data Structures", credits: 3, state: "remaining" },
      { code: "CS 350", title: "Software Design and Development", credits: 3, state: "remaining" },
      { code: "MA 339", title: "Applied Linear Algebra", credits: 3, state: "remaining" },
      { code: "KA 103", title: "Knowledge Area Elective", credits: 3, state: "remaining" },
      { code: "FREE 101", title: "Free Elective", credits: 3, state: "remaining" },
    ]
  },
  {
    id: "fall-2025",
    season: "Fall",
    year: 2025,
    courses: [
      { code: "CS 341", title: "Programming Languages", credits: 3, state: "remaining" },
      { code: "CS 345", title: "Automata Theory and Formal Languages", credits: 3, state: "remaining" },
      { code: "CS 4xx", title: "CS Professional Elective", credits: 3, state: "remaining" },
      { code: "FREE 102", title: "Free Elective", credits: 3, state: "remaining" },
      { code: "FREE 103", title: "Free Elective", credits: 3, state: "remaining" },
    ]
  },
  {
    id: "spring-2026",
    season: "Spring",
    year: 2026,
    courses: [
      { code: "CS 444", title: "Operating Systems", credits: 3, state: "remaining" },
      { code: "CS 4xx", title: "CS Professional Elective", credits: 3, state: "remaining" },
      { code: "KA 104", title: "Knowledge Area Elective", credits: 3, state: "remaining" },
      { code: "FREE 104", title: "Free Elective", credits: 3, state: "remaining" },
      { code: "FREE 105", title: "Free Elective", credits: 3, state: "remaining" },
    ]
  },
  {
    id: "fall-2026",
    season: "Fall",
    year: 2026,
    courses: [
      { code: "CS 4xx", title: "CS Professional Elective", credits: 3, state: "remaining" },
      { code: "KA 105", title: "Knowledge Area Elective", credits: 3, state: "remaining" },
      { code: "KA 106", title: "Knowledge Area / Univ Elective", credits: 3, state: "remaining" },
      { code: "FREE 106", title: "Free Elective", credits: 3, state: "remaining" },
      { code: "FREE 107", title: "Free Elective", credits: 3, state: "remaining" },
    ]
  },
  {
    id: "spring-2027",
    season: "Spring",
    year: 2027,
    courses: [
      { code: "CS 499", title: "Professional Experience", credits: 0, state: "remaining" },
      { code: "CS 4xx", title: "CS Professional Elective", credits: 3, state: "remaining" },
      { code: "FREE 108", title: "Free Elective", credits: 3, state: "remaining" },
      { code: "FREE 109", title: "Free Elective", credits: 3, state: "remaining" },
      { code: "FREE 110", title: "Free Elective", credits: 3, state: "remaining" },
      { code: "FREE 111", title: "Free Elective", credits: 2, state: "remaining" },
    ]
  }
];

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
  let creditsCompleted = 0;
  let creditsInProgress = 0;
  let creditsRemaining = 0;

  const sanitizeMatch = (target: string, query: string) => {
    const t = target.replace(/\s+/g, '').toUpperCase();
    const q = query.replace(/\s+/g, '').toUpperCase();
    // Match if exact code, or target code starts with query (e.g. Free Elective matching FREE)
    return t === q || t.startsWith(q);
  };

  const tempRoadmap = ROADMAP_TEMPLATE.map(semester => {
    let semesterComplete = true;
    let hasWaivedOrCompleted = false;

    const processedCourses = semester.courses.map(course => {
      let state: CourseState = 'remaining';
      
      const isCompleted = studentInfo.completed.some(c => sanitizeMatch(course.code, c));
      const isWaived = studentInfo.waived.some(c => sanitizeMatch(course.code, c));

      if (isCompleted) {
        state = 'completed';
        hasWaivedOrCompleted = true;
      } else if (isWaived) {
        state = 'waived';
        hasWaivedOrCompleted = true;
      } else {
        state = 'remaining';
        semesterComplete = false;
      }

      return { ...course, state };
    });

    return { ...semester, semesterComplete, hasWaivedOrCompleted, courses: processedCourses };
  });

  // Assign Past/Current/Future states
  let foundCurrent = false;
  
  const finalRoadmap: Semester[] = tempRoadmap.map(sem => {
    let status: 'past' | 'current' | 'future' = 'future';

    if (sem.semesterComplete && sem.hasWaivedOrCompleted) {
      status = 'past';
    } else if (!sem.semesterComplete && !foundCurrent) {
      status = 'current';
      foundCurrent = true;
      // Current semester courses that are remaining become in-progress
      sem.courses.forEach(c => {
        if (c.state === 'remaining') c.state = 'in-progress';
      });
    }

    return { id: sem.id, season: sem.season, year: sem.year, status, courses: sem.courses };
  });

  // Next future semester gets 'recommended' class
  let foundFuture = false;
  for (const sem of finalRoadmap) {
    if (sem.status === 'future' && !foundFuture && foundCurrent) {
      foundFuture = true;
      sem.courses.forEach(c => {
        if (c.state === 'remaining') c.state = 'recommended';
      });
    } else if (sem.status === 'future' && !foundFuture && !foundCurrent) {
      // Edge case: all 0 courses taken, so first semester is future logically but should be current
      // handled implicitly though, because if 0 courses, !sem.semesterComplete fires the 'current' block on 1st sem.
      foundFuture = true;
      sem.courses.forEach(c => {
        if (c.state === 'remaining') c.state = 'recommended';
      });
    }
  }

  // Tally credits
  finalRoadmap.forEach(sem => {
    sem.courses.forEach(c => {
      if (c.state === 'completed' || c.state === 'waived') creditsCompleted += c.credits;
      else if (c.state === 'in-progress') creditsInProgress += c.credits;
      else creditsRemaining += c.credits;
    });
  });

  const totalRequired = creditsCompleted + creditsInProgress + creditsRemaining; // dynamically ensures matching the exact roadmap sum (120)

  // -- RENDER --
  return (
    <div className="px-8 py-10 w-full max-w-5xl mx-auto">
      {/* Header section */}
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">
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
        </div>
      </div>

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
