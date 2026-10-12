import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  LayoutDashboard,
  GitBranch,
  Calendar,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Flame,
  Award,
  ArrowUpDown,
} from 'lucide-react';
import { SUBJECTS_DATA, KARUNYA_QUESTION_BANK_URL } from './data/curriculumData';
import { generateDefaultSchedule } from './utils/scheduleGenerator';
import { SubjectData, StudyDay, ModuleData, ModuleOrder } from './types/planner';
import { Header } from './components/Header';
import { OverviewDashboard } from './components/OverviewDashboard';
import { ReverseRoadmapView } from './components/ReverseRoadmapView';
import { DailyCalendarView } from './components/DailyCalendarView';
import { KarunyaQuestionBankHub } from './components/KarunyaQuestionBankHub';
import { SyncModal, SyncConfig } from './components/SyncModal';
import { StudyTimerModal } from './components/StudyTimerModal';
import { SubjectDeepDiveModal } from './components/SubjectDeepDiveModal';
import { initAuth, googleSignIn, logout, getAccessToken } from './services/auth';

export default function App() {
  const [subjects, setSubjects] = useState<SubjectData[]>(() => {
    const saved = localStorage.getItem('karunya_subjects_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SUBJECTS_DATA;
      }
    }
    return SUBJECTS_DATA;
  });

  const [days, setDays] = useState<StudyDay[]>(() => {
    const saved = localStorage.getItem('karunya_days_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return generateDefaultSchedule();
      }
    }
    return generateDefaultSchedule();
  });

  const [user, setUser] = useState<User | null>(null);
  const [hasGoogleToken, setHasGoogleToken] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'calendar' | 'question-bank'>('overview');
  const [moduleOrder, setModuleOrder] = useState<ModuleOrder>('6-to-1');

  // Modals & Navigation state
  const [syncConfig, setSyncConfig] = useState<SyncConfig | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [deepDiveSubject, setDeepDiveSubject] = useState<SubjectData | null>(null);
  const [qbInitialSubject, setQbInitialSubject] = useState<string | undefined>();
  const [qbInitialModule, setQbInitialModule] = useState<number | undefined>();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setHasGoogleToken(!!token);
      },
      () => {
        setUser(null);
        setHasGoogleToken(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem('karunya_subjects_v1', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('karunya_days_v1', JSON.stringify(days));
  }, [days]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4500);
      return () => clearInterval(timer);
    }
  }, [toastMessage]);

  const handleToggleModuleOrder = () => {
    setModuleOrder((prev) => {
      const next = prev === '6-to-1' ? '1-to-6' : '6-to-1';
      setToastMessage(`Switched module order to ${next === '6-to-1' ? '6 ➔ 1 (Reverse High-Weight)' : '1 ➔ 6 (Sequential)'}`);
      return next;
    });
  };

  const handleLogin = async () => {
    try {
      const result = await googleSignIn(true);
      if (result) {
        setUser(result.user);
        setHasGoogleToken(true);
        setToastMessage(`Connected to Google as ${result.user.displayName || result.user.email}!`);
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setToastMessage(`Login error: ${err.message || 'Popup closed or failed'}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setHasGoogleToken(false);
      setToastMessage('Signed out from Google Workspace.');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleToggleSubtopic = (
    subjectId: string,
    moduleNumber: number,
    subtopicId: string
  ) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          modules: s.modules.map((m) => {
            if (m.moduleNumber !== moduleNumber) return m;
            return {
              ...m,
              subtopics: m.subtopics.map((sub) =>
                sub.id === subtopicId ? { ...sub, completed: !sub.completed } : sub
              ),
            };
          }),
        };
      })
    );
  };

  const handleToggleSlot = (dayNumber: number, slotId: string) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.dayNumber !== dayNumber) return d;
        return {
          ...d,
          slots: d.slots.map((s) =>
            s.id === slotId ? { ...s, completed: !s.completed } : s
          ),
        };
      })
    );
  };

  const handleSyncDayToCalendar = (day: StudyDay) => {
    setSyncConfig({
      type: 'calendar-day',
      targetDay: day,
      defaultOrder: moduleOrder,
    });
    setIsSyncModalOpen(true);
  };

  const handleSyncAllCalendar = () => {
    setSyncConfig({
      type: 'calendar-all',
      allDays: days,
      defaultOrder: moduleOrder,
    });
    setIsSyncModalOpen(true);
  };

  const handleSyncModuleToTasks = (subject: SubjectData, module: ModuleData) => {
    setSyncConfig({
      type: 'tasks-module',
      targetSubject: subject,
      targetModule: module,
      defaultOrder: moduleOrder,
    });
    setIsSyncModalOpen(true);
  };

  const handleSyncAllTasks = () => {
    setSyncConfig({
      type: 'tasks-all',
      allSubjects: subjects,
      defaultOrder: moduleOrder,
    });
    setIsSyncModalOpen(true);
  };

  const handleOpenQuestionBankForModule = (subjectId: string, moduleNumber: number) => {
    setQbInitialSubject(subjectId);
    setQbInitialModule(moduleNumber);
    setActiveTab('question-bank');
  };

  const handleSessionComplete = (subjectId: string, minutes: number) => {
    const subject = subjects.find((s) => s.id === subjectId);
    setToastMessage(`Awesome! Logged ${minutes} mins focus session on ${subject?.shortName || 'subject'}!`);
  };

  const currentDay = days[0]; // Day 1: October 12, 2026
  const totalSlotsCount = days.reduce((a, b) => a + b.slots.length, 0);
  const completedSlotsCount = days.reduce(
    (a, b) => a + b.slots.filter((s) => s.completed).length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/50 text-amber-200 text-xs sm:text-sm shadow-2xl animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Header */}
      <Header
        user={user}
        hasGoogleToken={hasGoogleToken}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenSyncCalendar={handleSyncAllCalendar}
        onOpenSyncTasks={handleSyncAllTasks}
        onOpenTimer={() => setIsTimerOpen(true)}
        completedSlotsCount={completedSlotsCount}
        totalSlotsCount={totalSlotsCount}
      />

      {/* Navigation Tabs Bar with Global Module Order Toggle */}
      <nav className="border-b border-slate-800 bg-slate-900/60 sticky top-[73px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-2.5">
            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('overview')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Overview & Today</span>
              </button>

              <button
                onClick={() => setActiveTab('roadmap')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'roadmap'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <GitBranch className="h-4 w-4" />
                <span>Roadmap ({moduleOrder === '6-to-1' ? '6 ➔ 1' : '1 ➔ 6'})</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/30 text-rose-200 font-extrabold uppercase">
                  {moduleOrder === '6-to-1' ? 'High Weight' : 'Sequential'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'calendar'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>29-Day Study Schedule</span>
              </button>

              <button
                onClick={() => setActiveTab('question-bank')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'question-bank'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Karunya Question Bank Hub</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                  KITS Portal
                </span>
              </button>
            </div>

            {/* Global Order Switcher Button */}
            <button
              onClick={handleToggleModuleOrder}
              className="shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition shadow-sm cursor-pointer whitespace-nowrap"
              title="Click to toggle module sequence between 6 ➔ 1 (Reverse) and 1 ➔ 6 (Sequential)"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-amber-400" />
              <span>{moduleOrder === '6-to-1' ? 'Order: 6 ➔ 1 (Reverse)' : 'Order: 1 ➔ 6 (Sequential)'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'overview' && (
          <OverviewDashboard
            subjects={subjects}
            currentDay={currentDay}
            allDays={days}
            moduleOrder={moduleOrder}
            onToggleModuleOrder={handleToggleModuleOrder}
            onSelectTab={setActiveTab}
            onOpenSubjectModal={setDeepDiveSubject}
            onToggleSlot={handleToggleSlot}
            onOpenSyncCalendar={() => handleSyncDayToCalendar(currentDay)}
          />
        )}

        {activeTab === 'roadmap' && (
          <ReverseRoadmapView
            subjects={subjects}
            moduleOrder={moduleOrder}
            onToggleModuleOrder={handleToggleModuleOrder}
            onToggleSubtopic={handleToggleSubtopic}
            onSyncModuleToTasks={handleSyncModuleToTasks}
            onOpenQuestionBank={handleOpenQuestionBankForModule}
          />
        )}

        {activeTab === 'calendar' && (
          <DailyCalendarView
            days={days}
            subjects={subjects}
            onToggleSlot={handleToggleSlot}
            onSyncDayToCalendar={handleSyncDayToCalendar}
            onOpenSyncAllCalendar={handleSyncAllCalendar}
            onOpenSyncTasks={handleSyncAllTasks}
          />
        )}

        {activeTab === 'question-bank' && (
          <KarunyaQuestionBankHub
            subjects={subjects}
            initialSubjectId={qbInitialSubject}
            initialModuleNumber={qbInitialModule}
          />
        )}
      </main>

      {/* Modals */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        config={syncConfig}
        hasGoogleToken={hasGoogleToken}
        onLogin={handleLogin}
        onSuccess={(msg) => setToastMessage(msg)}
      />

      <StudyTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        subjects={subjects}
        onSessionComplete={handleSessionComplete}
      />

      <SubjectDeepDiveModal
        subject={deepDiveSubject}
        initialOrder={moduleOrder}
        onClose={() => setDeepDiveSubject(null)}
        onSyncModuleToTasks={handleSyncModuleToTasks}
        onOpenQuestionBank={handleOpenQuestionBankForModule}
      />

      {/* Bottom Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Karunya Semester Exam Master • Order: {moduleOrder === '6-to-1' ? 'Modules 6 ➔ 1' : 'Modules 1 ➔ 6'} • Exam Start: November 10, 2026
          </p>
          <div className="flex items-center gap-4">
            <a
              href={KARUNYA_QUESTION_BANK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400/80 hover:text-amber-300 flex items-center gap-1"
            >
              <span>Karunya Question Bank Portal</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
