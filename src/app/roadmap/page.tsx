import React from 'react';

// Mock Data
const STUDENT_INFO = {
  name: "Jane Doe",
  major: "Computer Science, B.S.",
  minor: "Mathematics",
  catalogYear: "2024-2025",
  advisor: "Dr. Smith",
};

const PROGRESS = {
  totalRequired: 120,
  completed: 64,
  inProgress: 15,
  remaining: 41,
};

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

const ROADMAP_DATA: Semester[] = [
  {
    id: "fall-2023",
    season: "Fall",
    year: 2023,
    status: "past",
    courses: [
      { code: "CS 141", title: "Intro to Computer Science I", credits: 4, state: "completed", grade: "A" },
      { code: "MA 131", title: "Calculus I", credits: 3, state: "completed", grade: "B+" },
      { code: "FY 100", title: "First Year Seminar", credits: 1, state: "waived" },
      { code: "PH 131", title: "Physics I", credits: 4, state: "completed", grade: "A-" },
    ]
  },
  {
    id: "spring-2024",
    season: "Spring",
    year: 2024,
    status: "past",
    courses: [
      { code: "CS 142", title: "Intro to Computer Science II", credits: 3, state: "completed", grade: "A" },
      { code: "MA 132", title: "Calculus II", credits: 3, state: "completed", grade: "B" },
      { code: "PH 132", title: "Physics II", credits: 4, state: "completed", grade: "B+" },
    ]
  },
  {
    id: "fall-2024",
    season: "Fall",
    year: 2024,
    status: "current",
    courses: [
      { code: "CS 241", title: "Computer Organization", credits: 3, state: "in-progress" },
      { code: "CS 242", title: "Advanced Programming in Java", credits: 3, state: "in-progress" },
      { code: "MA 211", title: "Foundations of Computer Science", credits: 3, state: "in-progress" },
      { code: "STAT 383", title: "Probability and Statistics", credits: 3, state: "in-progress" },
    ]
  },
  {
    id: "spring-2025",
    season: "Spring",
    year: 2025,
    status: "future",
    courses: [
      { code: "CS 344", title: "Algorithms and Data Structures", credits: 3, state: "recommended" },
      { code: "CS 350", title: "Software Design and Development", credits: 3, state: "recommended" },
      { code: "UNIV 190", title: "Clarkson Seminar", credits: 3, state: "remaining" },
      { code: "COMM 210", title: "Theory of Rhetoric", credits: 3, state: "remaining" },
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
  return (
    <div className="px-8 py-10 w-full max-w-5xl mx-auto">
      {/* Header section */}
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">
          Degree Roadmap
        </h1>
        <p className="text-sm text-slate-500">
          Viewing roadmap for <span className="font-medium text-slate-700">{STUDENT_INFO.name}</span>
        </p>
      </header>

      {/* Student Summary Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-12 shadow-sm flex flex-col md:flex-row gap-8">
        <div className="flex-[1.5] space-y-5 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
          <div>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Program</h2>
            <p className="text-base font-semibold text-slate-900">{STUDENT_INFO.major}</p>
            {STUDENT_INFO.minor && (
              <p className="text-sm text-slate-600 mt-0.5">Minor in {STUDENT_INFO.minor}</p>
            )}
          </div>
          <div className="flex gap-12">
            <div>
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Catalog Year</h2>
              <p className="text-sm font-medium text-slate-700">{STUDENT_INFO.catalogYear}</p>
            </div>
            <div>
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Advisor</h2>
              <p className="text-sm font-medium text-slate-700">{STUDENT_INFO.advisor}</p>
            </div>
          </div>
        </div>

        {/* Simple Progress Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Overall Progress</h2>
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-semibold text-[#004e36] leading-none tracking-tight">{PROGRESS.completed} <span className="text-sm font-medium text-slate-400">/ {PROGRESS.totalRequired} cr</span></span>
            <span className="text-sm text-slate-500 font-medium">
              {Math.round((PROGRESS.completed / PROGRESS.totalRequired) * 100)}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 flex shadow-inner">
            <div className="h-full bg-[#004e36]" style={{ width: `${(PROGRESS.completed / PROGRESS.totalRequired) * 100}%` }}></div>
            <div className="h-full bg-blue-400" style={{ width: `${(PROGRESS.inProgress / PROGRESS.totalRequired) * 100}%` }}></div>
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
          {ROADMAP_DATA.map((semester) => {
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
