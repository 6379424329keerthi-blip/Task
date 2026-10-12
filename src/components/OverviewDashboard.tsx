import React from 'react';
import {
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Target,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  CalendarCheck,
  Zap,
  ArrowUpDown,
} from 'lucide-react';
import { SubjectData, StudyDay, ModuleOrder } from '../types/planner';

interface OverviewDashboardProps {
  subjects: SubjectData[];
  currentDay: StudyDay;
  allDays: StudyDay[];
  moduleOrder: ModuleOrder;
  onToggleModuleOrder: () => void;
  onSelectTab: (tab: 'roadmap' | 'calendar' | 'question-bank') => void;
  onOpenSubjectModal: (subject: SubjectData) => void;
  onToggleSlot: (dayNumber: number, slotId: string) => void;
  onOpenSyncCalendar: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  subjects,
  currentDay,
  allDays,
  moduleOrder,
  onToggleModuleOrder,
  onSelectTab,
  onOpenSubjectModal,
  onToggleSlot,
  onOpenSyncCalendar,
}) => {
  // Compute overall stats
  let totalSubtopics = 0;
  let completedSubtopics = 0;
  let highWeightCompleted = 0;
  let totalHighWeight = 0;

  subjects.forEach((subj) => {
    subj.modules.forEach((mod) => {
      const isHigh = mod.moduleNumber >= 4;
      if (isHigh) totalHighWeight += mod.subtopics.length;

      mod.subtopics.forEach((sub) => {
        totalSubtopics++;
        if (sub.completed) {
          completedSubtopics++;
          if (isHigh) highWeightCompleted++;
        }
      });
    });
  });

  const overallPercent = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;
  const highWeightPercent = totalHighWeight > 0 ? Math.round((highWeightCompleted / totalHighWeight) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Strategy Banner with Order Toggle */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950/60 border border-indigo-500/30 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold uppercase tracking-wider">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                {moduleOrder === '6-to-1'
                  ? 'Reverse Protocol (Module 6 ➔ 1)'
                  : 'Sequential Protocol (Module 1 ➔ 6)'}
              </span>
              <button
                onClick={onToggleModuleOrder}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold transition cursor-pointer"
                title="Toggle between 6 to 1 and 1 to 6 module order"
              >
                <ArrowUpDown className="h-3 w-3 text-amber-400" />
                <span>Switch to {moduleOrder === '6-to-1' ? '1 ➔ 6' : '6 ➔ 1'}</span>
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {moduleOrder === '6-to-1'
                ? 'Master High-Weight Modules First for Nov 10'
                : 'Build Foundations to Advanced Modules for Nov 10'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {moduleOrder === '6-to-1' ? (
                <>
                  In Karunya end-semester exams, <strong className="text-amber-300">Modules 4, 5, and 6</strong> carry over <strong className="text-white">65% of Part B & Part C marks</strong> (8, 10, and 14–16 mark problems). By beginning with Module 6 (Advanced Topics) while your focus is sharpest, you eliminate deep conceptual hurdles early!
                </>
              ) : (
                <>
                  Studying from <strong className="text-amber-300">Module 1 up to 6</strong> develops foundational definitions, syntax, and relational concepts first, ensuring you have the prerequisites in place before moving into complex distributed algorithms.
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onSelectTab('roadmap')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <span>Explore Roadmap ({moduleOrder === '6-to-1' ? '6 ➔ 1' : '1 ➔ 6'})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onSelectTab('question-bank')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition cursor-pointer"
            >
              <span>Karunya Exam Papers</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Days Left */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Exam Timeline</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white">29 Days</div>
            <p className="text-xs text-rose-300/90 mt-1 font-medium">Commencing Nov 10, 2026</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Today: Day 1 (Oct 12)</span>
            <span className="text-slate-200 font-medium">Phase 1 Active</span>
          </div>
        </div>

        {/* Subjects & Modules */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Curriculum Scope</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <GraduationCap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white">5 Subjects</div>
            <p className="text-xs text-indigo-300/90 mt-1 font-medium">30 Total Modules (6 each)</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Active: {moduleOrder === '6-to-1' ? '6 ➔ 1' : '1 ➔ 6'}</span>
            <span className="text-indigo-300 font-medium">225 Total Hrs</span>
          </div>
        </div>

        {/* High-Weight Progress */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">High-Weight Progress</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-amber-300">{highWeightPercent}%</div>
            <p className="text-xs text-amber-400/80 mt-1 font-medium">Modules 4, 5 & 6 (Part C Core)</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-amber-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, highWeightPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Overall Semester Readiness */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Readiness</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-emerald-400">{overallPercent}%</div>
            <p className="text-xs text-emerald-300/80 mt-1 font-medium">
              {completedSubtopics} of {totalSubtopics} Topics Mastered
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, overallPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Row: 5 Subjects Cards & Today's Study Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 5 Subjects Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">
                5 Semester Subjects (Order: {moduleOrder === '6-to-1' ? '6 ➔ 1' : '1 ➔ 6'})
              </h3>
            </div>
            <span className="text-xs text-slate-400">Click subject to view full syllabus & papers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {subjects.map((subject) => {
              const totalSubs = subject.modules.reduce((acc, m) => acc + m.subtopics.length, 0);
              const doneSubs = subject.modules.reduce(
                (acc, m) => acc + m.subtopics.filter((s) => s.completed).length,
                0
              );
              const pct = totalSubs > 0 ? Math.round((doneSubs / totalSubs) * 100) : 0;
              const startModuleNum = moduleOrder === '6-to-1' ? 6 : 1;
              const startModule = subject.modules.find((m) => m.moduleNumber === startModuleNum);

              return (
                <div
                  key={subject.id}
                  onClick={() => onOpenSubjectModal(subject)}
                  className="group p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/70 transition-all cursor-pointer shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${subject.color.badge}`}>
                        {subject.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {subject.totalHours} Hours
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                      {subject.name}
                    </h4>

                    <div className="mt-2 text-xs text-slate-400 line-clamp-1">
                      Start: <span className="text-amber-300 font-medium">Module {startModuleNum}: {startModule?.title}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Prep Progress</span>
                      <span className="font-semibold text-slate-200">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.max(5, pct)}%`,
                          backgroundColor: subject.color.hex,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick 5th Card: Karunya Exam Strategy Checklist */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 to-slate-900 border border-amber-500/30 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  KITS Exam Pattern
                </div>
                <h4 className="text-base font-bold text-white">Karunya Paper Blueprint</h4>
                <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span><strong>Part A:</strong> 10 questions × 2 marks = 20 Marks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span><strong>Part B:</strong> 5 questions × 8/10 marks = 40-50 Marks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span><strong>Part C:</strong> Comprehensive Problem = 30-40 Marks</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onSelectTab('question-bank')}
                className="mt-4 text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Karunya Question Bank</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Today's High-Yield Study Schedule */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Day {currentDay.dayNumber} of 29 • Today
                </span>
                <h3 className="text-lg font-bold text-white">{currentDay.focusTheme}</h3>
              </div>
              <button
                onClick={onOpenSyncCalendar}
                className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition cursor-pointer"
                title="Sync today to Google Calendar"
              >
                <CalendarCheck className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {currentDay.slots.map((slot) => {
                const subject = subjects.find((s) => s.id === slot.subjectId);
                return (
                  <div
                    key={slot.id}
                    className={`p-3 rounded-xl border transition-all ${
                      slot.completed
                        ? 'bg-emerald-950/20 border-emerald-500/30 opacity-75'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <button
                          onClick={() => onToggleSlot(currentDay.dayNumber, slot.id)}
                          className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center transition cursor-pointer ${
                            slot.completed
                              ? 'bg-emerald-500 text-slate-950'
                              : 'border border-slate-600 hover:border-amber-400'
                          }`}
                        >
                          {slot.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase">
                              {slot.timeSlot.split(' ')[0]}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${subject?.color.badge}`}>
                              {slot.subjectName} (M{slot.moduleNumber})
                            </span>
                          </div>
                          <h5 className="text-xs font-semibold text-white mt-1">
                            {slot.description}
                          </h5>
                          <span className="text-[10px] text-amber-400/90 font-medium inline-block mt-0.5">
                            Focus: {slot.activity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {currentDay.slots.filter((s) => s.completed).length}/{currentDay.slots.length} slots done
            </span>
            <button
              onClick={() => onSelectTab('calendar')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View full 29-day plan</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
