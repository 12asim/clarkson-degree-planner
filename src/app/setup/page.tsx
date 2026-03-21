"use client";

import React from 'react';

export default function SetupPage() {
  return (
    <div className="px-8 py-10 w-full max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Student Profile Setup
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Configure your academic details to generate an accurate degree roadmap.
        </p>
      </header>

      <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
        
        {/* Section 1: Academic Program */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-4">
            1. Academic Program
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <label htmlFor="major" className="block text-sm font-medium text-slate-900">
                Major
              </label>
              <select 
                id="major" 
                className="block w-full rounded-md border-slate-300 py-2.5 px-3 text-sm text-slate-900 shadow-sm border focus:border-[#004e36] focus:outline-none focus:ring-1 focus:ring-[#004e36] bg-slate-50 hover:bg-white transition-colors cursor-pointer"
                defaultValue="cs"
              >
                <option value="" disabled>Select your major...</option>
                <option value="cs">Computer Science, B.S.</option>
                <option value="se">Software Engineering, B.S.</option>
                <option value="ce">Computer Engineering, B.S.</option>
                <option value="ds">Data Science, B.S.</option>
              </select>
            </div>

            <div className="flex-1 space-y-2">
              <label htmlFor="catalog" className="block text-sm font-medium text-slate-900">
                Catalog Year
              </label>
              <select 
                id="catalog" 
                className="block w-full rounded-md border-slate-300 py-2.5 px-3 text-sm text-slate-900 shadow-sm border focus:border-[#004e36] focus:outline-none focus:ring-1 focus:ring-[#004e36] bg-slate-50 hover:bg-white transition-colors cursor-pointer"
                defaultValue="24-25"
              >
                <option value="" disabled>Select catalog year...</option>
                <option value="24-25">2024-2025</option>
                <option value="23-24">2023-2024</option>
                <option value="22-23">2022-2023</option>
              </select>
            </div>
          </div>
        </section>

        {/* Section 2: Previous Credit */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-4">
            2. Prior Credits
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-8">
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900">
                  Completed Courses
                </label>
                <p className="text-xs text-slate-500 mt-1">Add previous courses taken at Clarkson or transfer equivalents.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[100px] flex items-start shadow-inner">
                <div className="flex flex-wrap gap-2.5 items-start content-start w-full">
                  <span className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-[#004e36]/30">
                    CS 141
                    <button type="button" className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">&times;</button>
                  </span>
                  <span className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-[#004e36]/30">
                    MA 131
                    <button type="button" className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">&times;</button>
                  </span>
                  <span className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-[#004e36]/30">
                    PH 131
                    <button type="button" className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">&times;</button>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Add course (e.g. CS 142)..." 
                    className="flex-1 min-w-[200px] bg-transparent text-sm text-slate-900 border-none focus:ring-0 px-1 py-1 outline-none placeholder:text-slate-400"
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
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[100px] flex items-start shadow-inner">
                <div className="flex flex-wrap gap-2.5 items-start content-start w-full">
                  <span className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-sm font-medium text-purple-800 shadow-sm transition-all hover:border-purple-300">
                    FY 100
                    <button type="button" className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">&times;</button>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Add course..." 
                    className="flex-1 min-w-[200px] bg-transparent text-sm text-slate-900 border-none focus:ring-0 px-1 py-1 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>
        
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Changes will be reflected across your entire roadmap.
          </p>
          <button 
            type="button" 
            className="rounded-lg bg-[#004e36] px-8 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#003b29] focus:outline-none focus:ring-2 focus:ring-[#004e36] focus:ring-offset-2 transition-all active:scale-[0.98]"
          >
            Save & Continue to Roadmap
          </button>
        </div>

      </form>
    </div>
  );
}
