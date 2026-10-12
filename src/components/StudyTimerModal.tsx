import React, { useState, useEffect } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  X,
  CheckCircle2,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { SubjectData } from '../types/planner';

interface StudyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: SubjectData[];
  onSessionComplete: (subjectId: string, minutes: number) => void;
}

export const StudyTimerModal: React.FC<StudyTimerModalProps> = ({
  isOpen,
  onClose,
  subjects,
  onSessionComplete,
}) => {
  const [durationMinutes, setDurationMinutes] = useState<number>(25);
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'ds');
  const [selectedModuleNum, setSelectedModuleNum] = useState<number>(6);

  useEffect(() => {
    setSecondsLeft(durationMinutes * 60);
    setIsActive(false);
  }, [durationMinutes]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((sec) => sec - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      setIsActive(false);
      onSessionComplete(selectedSubjectId, durationMinutes);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, selectedSubjectId, durationMinutes, onSessionComplete]);

  if (!isOpen) return null;

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = Math.round(
    ((durationMinutes * 60 - secondsLeft) / (durationMinutes * 60)) * 100
  );

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(durationMinutes * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Timer className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Pomodoro Focus Timer</h3>
              <span className="text-xs text-slate-400">Karunya High-Weight Deep Work</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center space-y-6">
          {/* Target Subject & Module Select */}
          <div className="w-full grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Subject
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.shortName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Module (Reverse)
              </label>
              <select
                value={selectedModuleNum}
                onChange={(e) => setSelectedModuleNum(Number(e.target.value))}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
              >
                {[6, 5, 4, 3, 2, 1].map((m) => (
                  <option key={m} value={m}>
                    Module {m} {m >= 5 ? '🔥 (High-Weight)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            {[15, 25, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => setDurationMinutes(mins)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  durationMinutes === mins
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>

          {/* Big Circular Clock Display */}
          <div className="relative w-48 h-48 rounded-full bg-slate-950 border-4 border-slate-800 flex flex-col items-center justify-center shadow-inner">
            <div
              className="absolute inset-0 rounded-full border-4 border-amber-500 transition-all duration-1000"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${
                  progressPercent > 50 ? '100%' : '50%'
                } 0%, 100% 100%, 0% 100%, 0% 0%)`,
                opacity: isActive ? 1 : 0.4,
              }}
            />
            <div className="font-mono text-4xl font-extrabold text-white tracking-wider">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <span className="text-[11px] font-semibold text-amber-400 mt-1">
              Module {selectedModuleNum} Deep Work
            </span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Pause Session</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Start Focus</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Reset Timer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
