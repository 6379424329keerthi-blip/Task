import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  CalendarCheck,
  Flame,
  Sparkles,
  ChevronRight,
  Filter,
  CheckSquare,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { StudyDay, StudySlot, SubjectData } from '../types/planner';

interface DailyCalendarViewProps {
  days: StudyDay[];
  subjects: SubjectData[];
  onToggleSlot: (dayNumber: number, slotId: string) => void;
  onSyncDayToCalendar: (day: StudyDay) => void;
  onOpenSyncAllCalendar: () => void;
  onOpenSyncTasks: () => void;
}

export const DailyCalendarView: React.FC<DailyCalendarViewProps> = ({
  days,
  subjects,
  onToggleSlot,
  onSyncDayToCalendar,
  onOpenSyncAllCalendar,
  onOpenSyncTasks,
}) => {
  const [activePhase, setActivePhase] = useState<string>('all');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);

  const filteredDays =
    activePhase === 'all'
      ? days
      : days.filter((d) => d.phase.includes(activePhase));

  const selectedDay = days.find((d) => d.dayNumber === selectedDayNumber) || days[0];

  return (
    <div className="space-y-6">
      {/* Calendar Header with Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Calendar className="h-4 w-4" />
            <span>29-Day Systematic Timetable (Oct 12 – Nov 9, 2026)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Daily Study Schedule & Workspace Sync
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Structured daily slots with balanced theory, algorithms, and Karunya library past paper revisions.
          </p>
        </div>

        {/* Global Calendar & Task Sync Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenSyncAllCalendar}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition cursor-pointer"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Sync All to Google Calendar</span>
          </button>
          <button
            onClick={onOpenSyncTasks}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition cursor-pointer"
          >
            <CheckSquare className="h-4 w-4" />
            <span>Sync All to Google Tasks</span>
          </button>
        </div>
      </div>

      {/* Phase Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
        <span className="text-xs font-semibold text-slate-400 px-2 flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5" />
          Phases:
        </span>
        <button
          onClick={() => setActivePhase('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            activePhase === 'all'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          All 29 Days
        </button>
        <button
          onClick={() => setActivePhase('Phase 1')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            activePhase === 'Phase 1'
              ? 'bg-rose-500 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Phase 1: High Weight (M6 & M5) [Days 1-10]
        </button>
        <button
          onClick={() => setActivePhase('Phase 2')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            activePhase === 'Phase 2'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Phase 2: Core Deep-Dives (M4 & M3) [Days 11-20]
        </button>
        <button
          onClick={() => setActivePhase('Phase 3')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            activePhase === 'Phase 3'
              ? 'bg-blue-500 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Phase 3: Foundations (M2 & M1) [Days 21-25]
        </button>
        <button
          onClick={() => setActivePhase('Phase 4')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            activePhase === 'Phase 4'
              ? 'bg-indigo-500 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Phase 4: Karunya Mock Papers [Days 26-29]
        </button>
      </div>

      {/* Main Grid: Days Timeline Strip & Selected Day Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Days Carousel / List (4 Cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredDays.map((d) => {
            const isSelected = d.dayNumber === selectedDayNumber;
            const completedCount = d.slots.filter((s) => s.completed).length;
            const isAllCompleted = completedCount === d.slots.length;

            return (
              <div
                key={d.date}
                onClick={() => setSelectedDayNumber(d.dayNumber)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isAllCompleted
                          ? 'bg-emerald-500 text-slate-950'
                          : isSelected
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      D{d.dayNumber}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{d.date}</span>
                        {d.dayNumber === 1 && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                            Today
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{d.focusTheme}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-slate-400">
                      {completedCount}/{d.slots.length}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Selected Day Detail View (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            {/* Day Header */}
            <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Day {selectedDay.dayNumber} of 29 • {selectedDay.date}
                  </span>
                  <span className="text-xs text-slate-400">{selectedDay.phase}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5">
                  {selectedDay.focusTheme}
                </h3>
              </div>

              <button
                onClick={() => onSyncDayToCalendar(selectedDay)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold transition shrink-0 cursor-pointer"
                title="Schedule these slots on your Google Calendar"
              >
                <CalendarCheck className="h-3.5 w-3.5" />
                <span>Sync to Google Calendar</span>
              </button>
            </div>

            {/* Slots List */}
            <div className="mt-5 space-y-3.5">
              {selectedDay.slots.map((slot) => {
                const subject = subjects.find((s) => s.id === slot.subjectId);
                return (
                  <div
                    key={slot.id}
                    className={`p-4 rounded-xl border transition-all ${
                      slot.completed
                        ? 'bg-emerald-950/20 border-emerald-500/30 opacity-80'
                        : slot.highPriority
                        ? 'bg-slate-950/70 border-slate-700/80 hover:border-slate-600'
                        : 'bg-slate-950/50 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggleSlot(selectedDay.dayNumber, slot.id)}
                          className={`mt-0.5 h-5 w-5 rounded-md flex items-center justify-center transition cursor-pointer ${
                            slot.completed
                              ? 'bg-emerald-500 text-slate-950'
                              : 'border border-slate-600 hover:border-amber-400 bg-slate-900'
                          }`}
                          title={slot.completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {slot.completed && <CheckCircle2 className="h-4 w-4 stroke-[3]" />}
                        </button>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-slate-300">
                              {slot.timeSlot}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${subject?.color.badge}`}>
                              {slot.subjectName} (M{slot.moduleNumber})
                            </span>
                            {slot.activity === 'Karunya Past Paper Practice' ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                Karunya QB Drill
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                {slot.activity}
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-semibold text-white mt-1.5">
                            {slot.description}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => setSelectedDayNumber(Math.max(1, selectedDayNumber - 1))}
              disabled={selectedDayNumber <= 1}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium"
            >
              ← Previous Day
            </button>
            <span>
              {selectedDay.slots.filter((s) => s.completed).length} of {selectedDay.slots.length} completed
            </span>
            <button
              onClick={() => setSelectedDayNumber(Math.min(29, selectedDayNumber + 1))}
              disabled={selectedDayNumber >= 29}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium"
            >
              Next Day →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
