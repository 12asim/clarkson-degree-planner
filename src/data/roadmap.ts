export type CourseState = 'completed' | 'in-progress' | 'remaining' | 'recommended' | 'waived';

export type Course = {
  code: string;
  title: string;
  credits: number;
  state: CourseState;
  grade?: string;
};

export type Semester = {
  id: string;
  season: string;
  year: number;
  status: 'past' | 'current' | 'future';
  courses: Course[];
};

// Base Template Data
export const CS_ROADMAP_TEMPLATE: { id: string; season: string; year: number; courses: Course[] }[] = [
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
