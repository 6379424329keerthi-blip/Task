import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  Calendar,
  CheckSquare,
  Clock,
  ExternalLink,
  LogOut,
  Sparkles,
  Timer,
  BookOpen,
  Award,
} from 'lucide-react';
import { KARUNYA_QUESTION_BANK_URL } from '../data/curriculumData';

interface HeaderProps {
  user: User | null;
  hasGoogleToken: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onOpenSyncCalendar: () => void;
  onOpenSyncTasks: () => void;
  onOpenTimer: () => void;
  completedSlotsCount: number;
  totalSlotsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  hasGoogleToken,
  onLogin,
  onLogout,
  onOpenSyncCalendar,
  onOpenSyncTasks,
  onOpenTimer,
  completedSlotsCount,
  totalSlotsCount,
}) => {
  // Countdown to November 10, 2026, 09:00 AM IST (exam start)
  const examDate = new Date('2026-11-10T09:00:00+05:30');
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 28, hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const calculateTime = () => {
      // Local reference time is 2026-10-12
      const now = new Date();
      // If client environment is different year, lock to 2026 relative countdown
      const diff = Math.max(0, examDate.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo & University Tag */}
          <div className="flex items-center gap-3.5 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                    Karunya Semester Prep Master
                  </h1>
                  <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Nov 10 Exams
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span>5-Subject Reverse Strategy (Module 6 → 1)</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400/90 font-medium">KITS Question Bank Integrated</span>
                </p>
              </div>
            </div>

            {/* Mobile Study Timer button */}
            <button
              onClick={onOpenTimer}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700"
              title="Focus Timer"
            >
              <Timer className="h-5 w-5" />
            </button>
          </div>

          {/* Center: Live Countdown to Nov 10 */}
          <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800/80 px-4 py-1.5 rounded-xl">
            <Clock className="h-4 w-4 text-rose-400 animate-pulse" />
            <div className="text-xs text-slate-400 font-medium">Exam Countdown:</div>
            <div className="flex items-center gap-1 font-mono text-sm font-bold text-white">
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">
                {String(timeLeft.days).padStart(2, '0')}d
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-rose-400">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          {/* Right Action Tools & Google Workspace Integration */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
            {/* Quick Timer Button */}
            <button
              onClick={onOpenTimer}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Focus Pomodoro Timer"
            >
              <Timer className="h-3.5 w-3.5 text-amber-400" />
              <span>Pomodoro</span>
            </button>

            {/* Direct Link to Karunya Question Bank */}
            <a
              href={KARUNYA_QUESTION_BANK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 transition"
              title="Open Official Karunya Library Question Bank Portal"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Karunya</span> QB Portal
            </a>

            {/* Google Calendar Sync Button */}
            <button
              onClick={onOpenSyncCalendar}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 transition"
              title="Sync study slots to Google Calendar"
            >
              <Calendar className="h-3.5 w-3.5 text-blue-400" />
              <span>Calendar</span>
            </button>

            {/* Google Tasks Sync Button */}
            <button
              onClick={onOpenSyncTasks}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition"
              title="Sync revision checklists to Google Tasks"
            >
              <CheckSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>Tasks</span>
            </button>

            {/* Google Sign In / User Profile */}
            {user && hasGoogleToken ? (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
                <div
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700"
                  title={`Signed in as ${user.email}`}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="h-5 w-5 rounded-full"
                    />
                  ) : (
                    <div className="h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="text-xs text-slate-200 max-w-[100px] truncate hidden sm:inline">
                    {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-700 transition"
                  title="Sign out of Google"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="gsi-material-button inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-white text-slate-800 hover:bg-slate-100 shadow transition"
              >
                <div className="gsi-material-button-icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-4 w-4 block"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                  </svg>
                </div>
                <span>Connect Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
