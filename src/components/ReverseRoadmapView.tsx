import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckSquare,
  HelpCircle,
  Lightbulb,
  ArrowUpDown,
  ArrowRight,
} from 'lucide-react';
import { SubjectData, ModuleData, PriorityWeight, ModuleOrder } from '../types/planner';
import { KARUNYA_QUESTION_BANK_URL } from '../data/curriculumData';

interface ReverseRoadmapViewProps {
  subjects: SubjectData[];
  moduleOrder: ModuleOrder;
  onToggleModuleOrder: () => void;
  onToggleSubtopic: (subjectId: string, moduleNumber: number, subtopicId: string) => void;
  onSyncModuleToTasks: (subject: SubjectData, module: ModuleData) => void;
  onOpenQuestionBank: (subjectId: string, moduleNumber: number) => void;
}

export const ReverseRoadmapView: React.FC<ReverseRoadmapViewProps> = ({
  subjects,
  moduleOrder,
  onToggleModuleOrder,
  onToggleSubtopic,
  onSyncModuleToTasks,
  onOpenQuestionBank,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'ds-6': true,
    'dbms-6': true,
    'fsd-6': true,
    'toc-6': true,
    'qc-6': true,
    'ds-1': true,
    'dbms-1': true,
    'fsd-1': true,
    'toc-1': true,
    'qc-1': true,
  });

  const toggleExpand = (key: string) => {
    setExpandedModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredSubjects =
    selectedSubjectId === 'all'
      ? subjects
      : subjects.filter((s) => s.id === selectedSubjectId);

  const getWeightBadge = (weight: PriorityWeight) => {
    switch (weight) {
      case 'CRITICAL_HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <Flame className="h-3.5 w-3.5 text-rose-400" />
            🔥 Part C Critical (14-16 M)
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            ⭐ Part B Heavy (8-10 M)
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
            📘 Part A Foundation (2 M)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Roadmap Strategy Header with Reverse / Forward Toggle Button */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <span>Syllabus Order Mode</span>
              <span>•</span>
              <span>
                {moduleOrder === '6-to-1'
                  ? 'Reverse: Module 6 ➔ 5 ➔ 4 ➔ 3 ➔ 2 ➔ 1'
                  : 'Sequential: Module 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {moduleOrder === '6-to-1'
                ? 'Reverse Module Roadmap (High-Yield 6 ➔ 1)'
                : 'Sequential Module Roadmap (Foundations 1 ➔ 6)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {moduleOrder === '6-to-1'
                ? 'Prioritizing heavy-scoring modules (M6 to M4) first to eliminate tough bottlenecks early.'
                : 'Progressing sequentially from basic principles (M1) up to advanced modules (M6).'}
            </p>
          </div>

          {/* Action: Toggle Button (6 ➔ 1 vs 1 ➔ 6) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onToggleModuleOrder}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
              title="Click to toggle module direction between 6 ➔ 1 and 1 ➔ 6"
            >
              <ArrowUpDown className="h-4 w-4" />
              <span>
                {moduleOrder === '6-to-1'
                  ? 'Switch Order: 1 ➔ 6'
                  : 'Switch Order: 6 ➔ 1 (Reverse)'}
              </span>
            </button>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Filter Subject:</span>
            <button
              onClick={() => setSelectedSubjectId('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedSubjectId === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              All 5 Subjects
            </button>
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubjectId(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSubjectId === s.id
                    ? `${s.color.badge} font-extrabold shadow-md`
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {s.shortName}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>Currently showing: <strong>{moduleOrder === '6-to-1' ? 'Modules 6 ➔ 1' : 'Modules 1 ➔ 6'}</strong></span>
          </div>
        </div>
      </div>

      {/* Subject and Module Blocks */}
      <div className="space-y-8">
        {filteredSubjects.map((subject) => {
          // Sort modules according to moduleOrder
          const orderedModules =
            moduleOrder === '6-to-1'
              ? [...subject.modules].sort((a, b) => b.moduleNumber - a.moduleNumber)
              : [...subject.modules].sort((a, b) => a.moduleNumber - b.moduleNumber);

          const completedSubs = subject.modules.reduce(
            (acc, m) => acc + m.subtopics.filter((s) => s.completed).length,
            0
          );
          const totalSubs = subject.modules.reduce((acc, m) => acc + m.subtopics.length, 0);
          const percent = totalSubs > 0 ? Math.round((completedSubs / totalSubs) * 100) : 0;

          return (
            <div
              key={subject.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Subject Banner */}
              <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center font-bold text-white shadow"
                    style={{ backgroundColor: subject.color.hex }}
                  >
                    {moduleOrder === '6-to-1' ? 'M6' : 'M1'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{subject.name}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${subject.color.badge}`}>
                        {subject.code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {subject.totalHours} Hours Syllabus • Order:{' '}
                      <strong className="text-amber-300">
                        {moduleOrder === '6-to-1' ? 'Module 6 ➔ Module 1' : 'Module 1 ➔ Module 6'}
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-300">{percent}% Complete</span>
                    <div className="w-28 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(5, percent)}%`, backgroundColor: subject.color.hex }}
                      />
                    </div>
                  </div>
                  <a
                    href={KARUNYA_QUESTION_BANK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition"
                    title="Open Karunya Question Bank for this subject"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Karunya QB</span>
                  </a>
                </div>
              </div>

              {/* Modules List according to active order */}
              <div className="p-5 space-y-4">
                {orderedModules.map((module) => {
                  const key = `${subject.id}-${module.moduleNumber}`;
                  const isExpanded = !!expandedModules[key];
                  const moduleSubsDone = module.subtopics.filter((s) => s.completed).length;
                  const moduleAllDone =
                    moduleSubsDone === module.subtopics.length && module.subtopics.length > 0;

                  return (
                    <div
                      key={key}
                      className={`rounded-xl border transition-all duration-200 ${
                        moduleAllDone
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : module.moduleNumber >= 5
                          ? 'bg-slate-950/60 border-amber-500/30'
                          : 'bg-slate-950/40 border-slate-800'
                      }`}
                    >
                      {/* Module Header Bar */}
                      <div
                        onClick={() => toggleExpand(key)}
                        className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                              moduleAllDone
                                ? 'bg-emerald-500 text-slate-950 font-extrabold'
                                : module.moduleNumber >= 5
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            M{module.moduleNumber}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm sm:text-base font-bold text-white">
                                Module {module.moduleNumber}: {module.title}
                              </h4>
                              {getWeightBadge(module.weight)}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                              <span>{module.hours} Lecture Hours</span>
                              <span>•</span>
                              <span>
                                {moduleSubsDone}/{module.subtopics.length} topics checked
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-4">
                          {/* Syllabus Snippet from Official Syllabus */}
                          <div className="bg-slate-900/90 rounded-lg p-3 text-xs text-slate-300 leading-relaxed border border-slate-800">
                            <span className="font-semibold text-amber-300">Syllabus Coverage: </span>
                            {module.topicsDescription}
                          </div>

                          {/* Karunya Exam Tips */}
                          <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2.5">
                            <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                            <div className="text-xs text-amber-200/90 leading-relaxed">
                              <strong className="text-amber-300">Karunya University Exam Strategy: </strong>
                              {module.examTips}
                            </div>
                          </div>

                          {/* Subtopics Checklist */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-slate-300">
                                Revision Topics Checklist
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSyncModuleToTasks(subject, module);
                                }}
                                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                                title="Push these subtopics to Google Tasks"
                              >
                                <CheckSquare className="h-3.5 w-3.5" />
                                <span>Sync to Google Tasks</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {module.subtopics.map((sub) => (
                                <div
                                  key={sub.id}
                                  onClick={() =>
                                    onToggleSubtopic(subject.id, module.moduleNumber, sub.id)
                                  }
                                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 cursor-pointer transition select-none ${
                                    sub.completed
                                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {sub.completed ? (
                                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                    ) : (
                                      <Circle className="h-4 w-4 text-slate-500 shrink-0" />
                                    )}
                                    <span className={sub.completed ? 'line-through text-slate-400' : ''}>
                                      {sub.name}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Curated Karunya Exam Questions for this Module */}
                          {module.karunyaQuestions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-800">
                              <div className="flex items-center justify-between mb-2.5">
                                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                                  <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                                  Karunya Question Bank Expected Questions (Module {module.moduleNumber})
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenQuestionBank(subject.id, module.moduleNumber);
                                  }}
                                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                                >
                                  Practice in QB Hub →
                                </button>
                              </div>

                              <div className="space-y-2">
                                {module.karunyaQuestions.map((q) => (
                                  <div
                                    key={q.id}
                                    className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1.5"
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="font-bold text-slate-300">{q.part}</span>
                                      <div className="flex items-center gap-1.5">
                                        {q.frequentlyRepeated && (
                                          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                                            Repeated in KITS
                                          </span>
                                        )}
                                        {q.yearAppeared && (
                                          <span className="text-[10px] text-slate-500">
                                            {q.yearAppeared}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-slate-200">{q.question}</p>
                                    {q.answerKeyHint && (
                                      <p className="text-[11px] text-slate-400 bg-slate-950/60 p-1.5 rounded border border-slate-800/80">
                                        <strong className="text-slate-300">Answer Key Hint: </strong>
                                        {q.answerKeyHint}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
