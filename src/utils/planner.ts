import { Semester, Course, CourseState } from '../data/roadmap';

export type StudentProfile = {
  major: string;
  catalogYear: string;
  completed: string[];
  waived: string[];
};

export type PlannerResult = {
  roadmap: Semester[];
  creditsCompleted: number;
  creditsInProgress: number;
  creditsRemaining: number;
  totalRequired: number;
  remainingCoursesCount: number;
  nextSemester?: Semester;
  recommendedCourses: Course[];
};

const sanitizeMatch = (target: string, query: string) => {
  const t = target.replace(/\s+/g, '').toUpperCase();
  const q = query.replace(/\s+/g, '').toUpperCase();
  // Match if exact code, or target code starts with query (e.g. Free Elective matching FREE)
  return t === q || t.startsWith(q);
};

export function buildRoadmap(
  profile: StudentProfile,
  template: { id: string; season: string; year: number; courses: Course[] }[]
): PlannerResult {
  let creditsCompleted = 0;
  let creditsInProgress = 0;
  let creditsRemaining = 0;

  const tempRoadmap = template.map(semester => {
    let semesterComplete = true;
    let hasWaivedOrCompleted = false;

    const processedCourses: Course[] = semester.courses.map(course => {
      let state: CourseState = 'remaining';
      
      const isCompleted = profile.completed.some(c => sanitizeMatch(course.code, c));
      const isWaived = profile.waived.some(c => sanitizeMatch(course.code, c));

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
      // Edge case: all courses taken, so first semester is future logically but should be current
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

  const remainingCoursesCount = finalRoadmap.reduce((acc, sem) => acc + sem.courses.filter(c => c.state === 'remaining' || c.state === 'recommended').length, 0);
  
  const nextSemester = finalRoadmap.find(sem => sem.status === 'future');
  const recommendedCourses = nextSemester?.courses.filter(c => c.state === 'recommended') || [];

  return {
    roadmap: finalRoadmap,
    creditsCompleted,
    creditsInProgress,
    creditsRemaining,
    totalRequired,
    remainingCoursesCount,
    nextSemester,
    recommendedCourses
  };
}
