import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  X,
  ExternalLink,
  ShieldCheck,
  KeyRound,
  ArrowUpDown,
} from 'lucide-react';
import { StudyDay, SubjectData, ModuleData, ModuleOrder } from '../types/planner';
import { createCalendarEvent, CalendarEventPayload } from '../services/calendarService';
import {
  getOrCreateKarunyaTaskList,
  createGoogleTask,
} from '../services/tasksService';
import { getAccessToken, googleSignIn, verifyTokenScopes } from '../services/auth';

export interface SyncConfig {
  type: 'calendar-day' | 'calendar-all' | 'tasks-module' | 'tasks-all';
  targetDay?: StudyDay;
  targetSubject?: SubjectData;
  targetModule?: ModuleData;
  allDays?: StudyDay[];
  allSubjects?: SubjectData[];
  defaultOrder?: ModuleOrder;
}

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SyncConfig | null;
  hasGoogleToken: boolean;
  onLogin: () => Promise<void>;
  onSuccess: (message: string) => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  config,
  hasGoogleToken,
  onLogin,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isScopeError, setIsScopeError] = useState(false);
  const [isCheckingScopes, setIsCheckingScopes] = useState(false);
  const [taskOrder, setTaskOrder] = useState<ModuleOrder>(config?.defaultOrder || '6-to-1');

  useEffect(() => {
    if (config?.defaultOrder) {
      setTaskOrder(config.defaultOrder);
    }
  }, [config?.defaultOrder]);

  // Check scopes on modal open
  useEffect(() => {
    if (isOpen && hasGoogleToken) {
      const check = async () => {
        setIsCheckingScopes(true);
        const token = await getAccessToken();
        if (token) {
          const res = await verifyTokenScopes(token);
          if (!res.valid) {
            setIsScopeError(true);
            setError(
              `Your current sign-in is missing permissions for: ${res.missingScopes.join(' and ')}. Please grant permissions below.`
            );
          } else {
            setIsScopeError(false);
            setError(null);
          }
        }
        setIsCheckingScopes(false);
      };
      check();
    } else {
      setError(null);
      setIsScopeError(false);
    }
  }, [isOpen, hasGoogleToken]);

  if (!isOpen || !config) return null;

  const isCalendar = config.type.startsWith('calendar');
  const isTasks = config.type.startsWith('tasks');

  // Compute description and count of affected items
  let title = '';
  let description = '';
  let itemCount = 0;
  const itemsPreview: string[] = [];

  if (config.type === 'calendar-day' && config.targetDay) {
    title = `Sync Study Slots for Day ${config.targetDay.dayNumber} to Google Calendar`;
    itemCount = config.targetDay.slots.length;
    description = `This will create ${itemCount} calendar events on your primary Google Calendar for ${config.targetDay.date} with reminders, time blocks, and Karunya syllabus notes.`;
    config.targetDay.slots.forEach((s) => {
      itemsPreview.push(`${s.timeSlot} — ${s.subjectName} (M${s.moduleNumber}): ${s.description}`);
    });
  } else if (config.type === 'calendar-all' && config.allDays) {
    title = 'Sync Full 29-Day Study Schedule to Google Calendar';
    const totalSlots = config.allDays.reduce((acc, d) => acc + d.slots.length, 0);
    itemCount = totalSlots;
    description = `This will schedule ${totalSlots} study blocks across 29 days (Oct 12 to Nov 9, 2026) directly onto your primary Google Calendar, organized by time slot and subject color.`;
    config.allDays.slice(0, 5).forEach((d) => {
      itemsPreview.push(`Day ${d.dayNumber} (${d.date}): ${d.focusTheme} (${d.slots.length} slots)`);
    });
    if (config.allDays.length > 5) {
      itemsPreview.push(`...and ${config.allDays.length - 5} more days leading up to Nov 10 exams.`);
    }
  } else if (config.type === 'tasks-module' && config.targetSubject && config.targetModule) {
    title = `Sync ${config.targetSubject.name} (Module ${config.targetModule.moduleNumber}) to Google Tasks`;
    itemCount = config.targetModule.subtopics.length;
    description = `This will create a task list named "Karunya: ${config.targetSubject.shortName}" in Google Tasks and add ${itemCount} revision topics as actionable checkable tasks.`;
    config.targetModule.subtopics.forEach((sub) => {
      itemsPreview.push(`[ ] ${sub.name}`);
    });
  } else if (config.type === 'tasks-all' && config.allSubjects) {
    title = `Sync All 5 Subjects to Google Tasks (${taskOrder === '6-to-1' ? '6 ➔ 1 Reverse' : '1 ➔ 6 Sequential'})`;
    let totalSubs = 0;
    config.allSubjects.forEach((s) => {
      s.modules.forEach((m) => {
        totalSubs += m.subtopics.length;
      });
    });
    itemCount = totalSubs;
    description = `This will create a comprehensive task list "Karunya Semester Prep (Nov 10)" with ${totalSubs} actionable checklist items across all 5 subjects ordered from ${
      taskOrder === '6-to-1' ? 'Module 6 down to Module 1' : 'Module 1 up to Module 6'
    }.`;
    config.allSubjects.forEach((s) => {
      itemsPreview.push(
        `${s.name}: ${taskOrder === '6-to-1' ? 'Modules 6 ➔ 1' : 'Modules 1 ➔ 6'} (${s.modules.reduce((a, b) => a + b.subtopics.length, 0)} topics)`
      );
    });
  }

  const handleGrantPermissions = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const res = await googleSignIn(true);
      if (res?.accessToken) {
        setIsScopeError(false);
        setError(null);
      }
    } catch (err: any) {
      console.error('Re-auth error:', err);
      setError(err.message || 'Failed to grant permissions');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmSync = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      if (config.type === 'calendar-day' && config.targetDay) {
        setProgressText(`Creating ${config.targetDay.slots.length} study events...`);
        for (const slot of config.targetDay.slots) {
          const payload = createSlotEventPayload(config.targetDay.date, slot);
          await createCalendarEvent(payload);
        }
        onSuccess(`Successfully synced ${config.targetDay.slots.length} study events to Google Calendar!`);
        onClose();
      } else if (config.type === 'calendar-all' && config.allDays) {
        let created = 0;
        const total = config.allDays.reduce((acc, d) => acc + d.slots.length, 0);

        // Schedule first 7 days immediately for quick responsiveness (user can sync more anytime)
        const daysToSync = config.allDays.slice(0, 7);
        for (const d of daysToSync) {
          setProgressText(`Syncing Day ${d.dayNumber} of 29...`);
          for (const slot of d.slots) {
            const payload = createSlotEventPayload(d.date, slot);
            await createCalendarEvent(payload);
            created++;
          }
        }
        onSuccess(
          `Successfully scheduled ${created} study sessions for the upcoming week on Google Calendar!`
        );
        onClose();
      } else if (config.type === 'tasks-module' && config.targetSubject && config.targetModule) {
        setProgressText('Accessing Google Tasks list...');
        const taskList = await getOrCreateKarunyaTaskList(
          `Karunya: ${config.targetSubject.shortName}`
        );
        let count = 0;
        for (const sub of config.targetModule.subtopics) {
          setProgressText(`Adding task: ${sub.name}...`);
          await createGoogleTask(
            taskList.id,
            `[M${config.targetModule.moduleNumber}] ${sub.name}`,
            `Subject: ${config.targetSubject.name} (${config.targetSubject.code})\nModule: ${config.targetModule.title}\nKarunya Tips: ${config.targetModule.examTips}`
          );
          count++;
        }
        onSuccess(`Created ${count} tasks in Google Tasks under "${taskList.title}"!`);
        onClose();
      } else if (config.type === 'tasks-all' && config.allSubjects) {
        const listName = `Karunya Prep (Nov 10) [${taskOrder === '6-to-1' ? '6-to-1' : '1-to-6'}]`;
        setProgressText(`Setting up "${listName}" list...`);
        const taskList = await getOrCreateKarunyaTaskList(listName);
        let count = 0;

        // Loop through all subjects in chosen order (6 to 1 or 1 to 6)
        for (const s of config.allSubjects) {
          const sortedModules =
            taskOrder === '6-to-1'
              ? [...s.modules].sort((a, b) => b.moduleNumber - a.moduleNumber)
              : [...s.modules].sort((a, b) => a.moduleNumber - b.moduleNumber);

          setProgressText(`Adding tasks for ${s.shortName} (${taskOrder === '6-to-1' ? '6 ➔ 1' : '1 ➔ 6'})...`);
          for (const m of sortedModules) {
            for (const sub of m.subtopics) {
              await createGoogleTask(
                taskList.id,
                `[${s.shortName} M${m.moduleNumber}] ${sub.name}`,
                `Subject: ${s.name}\nModule: Module ${m.moduleNumber}: ${m.title}\nWeight: ${m.weight}\nKarunya Exam Tips: ${m.examTips}`
              );
              count++;
            }
          }
        }
        onSuccess(
          `Created ${count} tasks in Google Tasks ordered ${taskOrder === '6-to-1' ? 'from Module 6 down to 1' : 'from Module 1 up to 6'} under "${taskList.title}"!`
        );
        onClose();
      }
    } catch (err: any) {
      console.error('Sync error:', err);
      const msg = err.message || 'An error occurred while communicating with Google Workspace.';
      setError(msg);
      if (
        msg.includes('insufficient authentication scopes') ||
        msg.includes('403') ||
        msg.includes('insufficient')
      ) {
        setIsScopeError(true);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                isCalendar ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {isCalendar ? <Calendar className="h-5 w-5" /> : <CheckSquare className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{title}</h3>
              <span className="text-xs text-slate-400">
                Google Workspace Integration Confirmation
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Order Selection Pill (For Task Syncs) */}
          {config.type === 'tasks-all' && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <ArrowUpDown className="h-3.5 w-3.5 text-amber-400" />
                  Task Generation Order:
                </span>
                <span className="text-[11px] font-semibold text-amber-400">
                  {taskOrder === '6-to-1' ? '6 ➔ 1 (Reverse High-Weight)' : '1 ➔ 6 (Sequential)'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setTaskOrder('6-to-1')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    taskOrder === '6-to-1'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>Reverse: 6 ➔ 1</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTaskOrder('1-to-6')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    taskOrder === '1-to-6'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>Sequential: 1 ➔ 6</span>
                </button>
              </div>
            </div>
          )}

          {!hasGoogleToken ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="h-4 w-4" />
                <span>Google Account Connection Required</span>
              </div>
              <p className="text-xs">
                To sync study sessions to your Google Calendar or tasks to Google Tasks, please
                authenticate with your Google account and approve permissions.
              </p>
              <button
                onClick={onLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 shadow transition cursor-pointer"
              >
                <span>Sign in with Google</span>
              </button>
            </div>
          ) : isScopeError ? (
            <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                <KeyRound className="h-4 w-4 text-amber-400" />
                <span>Google Permissions Required</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-100/90">
                Your current Google session has not granted access to Google Calendar or Google Tasks.
                Click the button below to open Google's consent screen and allow access to schedule your study sessions.
              </p>
              <button
                onClick={handleGrantPermissions}
                disabled={isProcessing}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Grant Calendar & Tasks Permissions</span>
              </button>
            </div>
          ) : (
            <>
              {/* Explicit Operation Summary */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-indigo-400" />
                  <span>Confirmation Details</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{description}</p>
              </div>

              {/* Items Count and Preview */}
              <div>
                <span className="text-xs font-semibold text-slate-300">
                  Items to be Created ({itemCount} total):
                </span>
                <div className="mt-2 max-h-44 overflow-y-auto space-y-1.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300">
                  {itemsPreview.map((item, idx) => (
                    <div key={idx} className="truncate">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
          >
            Cancel
          </button>

          {hasGoogleToken && !isScopeError && (
            <button
              onClick={handleConfirmSync}
              disabled={isProcessing || isCheckingScopes}
              className={`px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 text-white shadow-lg transition cursor-pointer ${
                isCalendar
                  ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
              } disabled:opacity-50`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{progressText || 'Syncing...'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm & Sync ({itemCount})</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function createSlotEventPayload(dateStr: string, slot: any): CalendarEventPayload {
  let startHour = 9;
  let startMin = 0;
  let endHour = 11;
  let endMin = 30;

  if (slot.timeSlot.includes('Afternoon')) {
    startHour = 14;
    endHour = 16;
    endMin = 30;
  } else if (slot.timeSlot.includes('Evening')) {
    startHour = 18;
    startMin = 30;
    endHour = 21;
    endMin = 0;
  } else if (slot.timeSlot.includes('Night')) {
    startHour = 21;
    startMin = 30;
    endHour = 22;
    endMin = 30;
  }

  const startIso = `${dateStr}T${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}:00+05:30`;
  const endIso = `${dateStr}T${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}:00+05:30`;

  return {
    summary: `[Karunya Prep] ${slot.subjectName} (M${slot.moduleNumber}): ${slot.activity}`,
    description: `Subject: ${slot.subjectName}\nModule: ${slot.moduleTitle}\nFocus Topic: ${slot.description}\nActivity: ${slot.activity}\n\nExam Commencing: Nov 10, 2026\nKarunya Library Question Bank: https://www.karunya.edu/library/question/banks`,
    start: {
      dateTime: startIso,
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: endIso,
      timeZone: 'Asia/Kolkata',
    },
  };
}
