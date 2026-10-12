import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Clock,
  Flame,
  Sparkles,
  ExternalLink,
  CheckSquare,
  Lightbulb,
  ArrowUpDown,
} from 'lucide-react';
import { SubjectData, ModuleData, ModuleOrder } from '../types/planner';
import { KARUNYA_QUESTION_BANK_URL } from '../data/curriculumData';

interface SubjectDeepDiveModalProps {
  subject: SubjectData | null;
  initialOrder?: ModuleOrder;
  onClose: () => void;
  onSyncModuleToTasks: (subject: SubjectData, module: ModuleData) => void;
  onOpenQuestionBank: (subjectId: string, moduleNumber: number) => void;
}

export const SubjectDeepDiveModal: React.FC<SubjectDeepDiveModalProps> = ({
  subject,
  initialOrder = '6-to-1',
  onClose,
  onSyncModuleToTasks,
  onOpenQuestionBank,
}) => {
  const [modalOrder, setModalOrder] = useState<ModuleOrder>(initialOrder);

  if (!subject) return null;

  const orderedModules =
    modalOrder === '6-to-1'
      ? [...subject.modules].sort((a, b) => b.moduleNumber - a.moduleNumber)
      : [...subject.modules].sort((a, b) => a.moduleNumber - b.moduleNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
              style={{ backgroundColor: subject.color.hex }}
            >
              {modalOrder === '6-to-1' ? 'M6' : 'M1'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{subject.name}</h3>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${subject.color.badge}`}>
                  {subject.code}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Total: {subject.totalHours} Hours • Order: {modalOrder === '6-to-1' ? 'Module 6 ➔ 1 (Reverse)' : 'Module 1 ➔ 6 (Sequential)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Reverse / Forward Order Toggle Button */}
            <button
              onClick={() => setModalOrder(modalOrder === '6-to-1' ? '1-to-6' : '6-to-1')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition cursor-pointer"
              title="Reverse modules order"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              <span>{modalOrder === '6-to-1' ? 'Order: 6 ➔ 1' : 'Order: 1 ➔ 6'}</span>
            </button>

            <a
              href={KARUNYA_QUESTION_BANK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Library QB</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modules List (Ordered 6 -> 1 or 1 -> 6) */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-semibold text-amber-300">
              Complete 6-Module Syllabus ({modalOrder === '6-to-1' ? 'Module 6 Downwards' : 'Module 1 Upwards'})
            </span>
            <span>6 Modules • 45 Total Hours</span>
          </div>

          {orderedModules.map((mod) => (
            <div
              key={mod.moduleNumber}
              className={`p-4 rounded-xl border space-y-3 ${
                mod.moduleNumber >= 5
                  ? 'bg-slate-950/70 border-amber-500/30'
                  : 'bg-slate-950/40 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      mod.moduleNumber >= 5
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    M{mod.moduleNumber}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Module {mod.moduleNumber}: {mod.title}
                    </h4>
                    <span className="text-[11px] text-slate-400">{mod.hours} Lecture Hours</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSyncModuleToTasks(subject, mod)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium cursor-pointer"
                  >
                    <CheckSquare className="h-3.5 w-3.5" />
                    <span>Tasks</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuestionBank(subject.id, mod.moduleNumber);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium cursor-pointer"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>QB</span>
                  </button>
                </div>
              </div>

              {/* Syllabus topics text */}
              <div className="p-3 rounded-lg bg-slate-900/90 text-xs text-slate-300 leading-relaxed border border-slate-800/80">
                {mod.topicsDescription}
              </div>

              {/* Exam Strategy */}
              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">Karunya Exam Key Point: </strong>
                  {mod.examTips}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Current order: {modalOrder === '6-to-1' ? '6 ➔ 1' : '1 ➔ 6'}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
