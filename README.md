# Clarkson Degree Planner

A lightweight, visually clean degree planning web application built specifically for Clarkson University students to experiment with different academic paths.

## Overview

The Clarkson Degree Planner is an unofficial, frontend-only application designed to help students map out their courses without the bulk of a heavy enterprise system. It is **not** a full degree audit engine nor a MyCU replacement. Instead, it provides a fast, responsive interface to manage completed courses, view remaining requirements, and project a semester-by-semester roadmap. 

All data is stored purely locally, meaning you can open the app, mock your course history, and instantly see how your degree path changes in real time.

## Features

- **Profile Setup:** Set your major, catalog year, and track prior AP credits or explicitly waived courses.
- **My Courses Management:** A clean interface to add and remove completed courses that immediately updates your overall progress.
- **Dynamic Roadmap Generation:** Automatically builds a responsive UI timeline displaying past, current, and future semesters based on your progress.
- **Advisor Summary:** Generates a high-level print-ready dashboard summarizing degree completion metrics, credit distributions, and next-semester scheduling.
- **What-If Simulator:** Temporarily inject or remove classes to see live reflections of how new paths might alter future semesters, without overwriting your saved profile.
- **Local Storage Architecture:** 100% frontend implementation. Your data never leaves your browser.

## Why I Built It

Planning out four years of prerequisite chains, lab requirements, and electives can be incredibly dense. Existing systems like MyCU are exceptionally accurate for official degree clearance, but they aren't always agile enough for "what-if" scheduling experiments. 

I built this app to serve as a fast sandbox. It uses a modern, lightweight tech stack mimicking the exact UI of premium modern web dashboards, providing an intuitive, stress-free space for students to explore their remaining requirements.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router format)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React hooks + Browser `localStorage`

## Current Status

**Status: MVP Complete**
Currently, the application includes a mocked logic engine perfectly customized for navigating a sample Computer Science (B.S.) curriculum based on the 2024-2025 catalog year flowchart.

## Screenshots

*(Placeholder for future screenshots)*

- `1-overview.png` - Dashboard showing overall progress and credits logic.
- `2-roadmap.png` - Semester timeline visualizing prerequisite placements.
- `3-advisor.png` - Print-friendly high-level advisor review.
- `4-simulator.png` - The What-If analysis engine reacting to state changes.

## Local Development

To run this application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/12asim/clarkson-degree-planner.git
   ```
2. Navigate into the directory:
   ```bash
   cd clarkson-degree-planner
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local Next.js development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:3000`.

## Future Improvements

- Map out curriculum templates for additional majors (Software Engineering, Data Science, etc.).
- Introduce complex validation rules for prerequisite chaining conflicts.
- Add drag-and-drop capability for moving specific future courses between semester blocks.
- Generate exportable PDF schedules.
