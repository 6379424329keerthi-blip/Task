import React, { useState } from 'react';
import {
  ExternalLink,
  BookOpen,
  Search,
  Filter,
  Flame,
  Award,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { SubjectData, KarunyaQuestion } from '../types/planner';
import { KARUNYA_QUESTION_BANK_URL } from '../data/curriculumData';

interface KarunyaQuestionBankHubProps {
  subjects: SubjectData[];
  initialSubjectId?: string;
  initialModuleNumber?: number;
}

export const KarunyaQuestionBankHub: React.FC<KarunyaQuestionBankHubProps> = ({
  subjects,
  initialSubjectId,
  initialModuleNumber,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || 'all');
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<number | 'all'>(
    initialModuleNumber || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAnswerHints, setShowAnswerHints] = useState<Record<string, boolean>>({});
  const [mockExamMode, setMockExamMode] = useState<boolean>(false);

  // Flatten questions from curriculum data
  const allQuestions: Array<{
    subject: SubjectData;
    moduleNumber: number;
    moduleTitle: string;
    question: KarunyaQuestion;
  }> = [];

  subjects.forEach((subj) => {
    subj.modules.forEach((mod) => {
      mod.karunyaQuestions.forEach((q) => {
        allQuestions.push({
          subject: subj,
          moduleNumber: mod.moduleNumber,
          moduleTitle: mod.title,
          question: q,
        });
      });
    });
  });

  // Filter questions
  const filteredQuestions = allQuestions.filter((item) => {
    if (selectedSubjectId !== 'all' && item.subject.id !== selectedSubjectId) return false;
    if (selectedModule !== 'all' && item.moduleNumber !== selectedModule) return false;
    if (selectedPart !== 'all') {
      if (selectedPart === 'Part A' && !item.question.part.includes('Part A')) return false;
      if (selectedPart === 'Part B' && !item.question.part.includes('Part B')) return false;
      if (selectedPart === 'Part C' && !item.question.part.includes('Part C')) return false;
      if (selectedPart === 'Repeated' && !item.question.frequentlyRepeated) return false;
    }
    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase();
      const matchText =
        item.question.question.toLowerCase() +
        item.subject.name.toLowerCase() +
        item.moduleTitle.toLowerCase() +
        (item.question.answerKeyHint?.toLowerCase() || '');
      if (!matchText.includes(qLower)) return false;
    }
    return true;
  });

  const toggleHint = (id: string) => {
    setShowAnswerHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Portal Callout Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 border border-amber-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5 text-amber-400" />
              Official Portal Integration
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Karunya Library Question Bank Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curated past examination questions from the official{' '}
              <span className="text-amber-300 font-semibold">Karunya Institute of Technology and Sciences Library Portal</span>{' '}
              ({KARUNYA_QUESTION_BANK_URL}). Filter by Part A (2M), Part B (8-10M), and Part C (14-16M).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href={KARUNYA_QUESTION_BANK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <span>Visit Official Library Portal</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMockExamMode(!mockExamMode)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
                mockExamMode
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>{mockExamMode ? 'Exit Mock Simulator' : 'Mock Paper Simulator'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mock Exam Paper Simulator Modal or Banner */}
      {mockExamMode && (
        <div className="bg-slate-900 border-2 border-indigo-500/60 rounded-2xl p-6 shadow-2xl space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Karunya University End-Semester Examination Pattern
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Simulated Question Paper (100 Marks • 3 Hours)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Reverse-Module Prioritization: Heavy weighting on Modules 6, 5 & 4
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              <Printer className="h-4 w-4 text-indigo-400" />
              <span>Print Paper</span>
            </button>
          </div>

          <div className="space-y-6 text-sm">
            {/* Part A */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-300">
                  PART A (10 × 2 = 20 Marks) — Answer all questions
                </span>
                <span className="text-xs text-slate-400">2 Marks Each</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-2 text-xs sm:text-sm">
                <li>Define k-anonymity and l-diversity in privacy preservation (Data Science M6).</li>
                <li>State Brewer CAP Theorem and give examples of CP and AP databases (DBMS M6).</li>
                <li>Explain the role of libuv and Event Loop in Node.js non-blocking I/O (Full Stack M6).</li>
                <li>State Church-Turing Thesis and define Decidable languages (TOC M6).</li>
                <li>What is the speedup provided by Grover\'s Search Algorithm over classical search? (QC M6).</li>
                <li>Explain Conflict Serializability vs View Serializability in DBMS transactions (DBMS M5).</li>
                <li>Why cannot classical repetition error correction codes be applied to quantum bits? (QC M5).</li>
                <li>What is the purpose of $elemMatch operator in MongoDB? (Full Stack M5).</li>
                <li>Define Type I and Type II errors in statistical hypothesis testing (Data Science M3).</li>
                <li>State the No-Cloning theorem in quantum mechanics (QC M4).</li>
              </ol>
            </div>

            {/* Part B */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-300">
                  PART B (5 × 8 = 40 Marks) — Either / Or Analytical Questions
                </span>
                <span className="text-xs text-slate-400">8 Marks Each</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-white">Q11. (Data Science)</div>
                  <p>(a) Given a user-item rating matrix, compute predicted rating using User-based Collaborative Filtering with Cosine Similarity. OR (b) Derive Gradient Descent update rule for Multiple Linear Regression.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-white">Q12. (DBMS)</div>
                  <p>(a) Check whether a given multi-transaction schedule is conflict serializable using Precedence Graph. OR (b) Construct a B+ Tree of order 3 with step-by-step node splitting for keys: 10, 20, 5, 15, 25, 30.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-white">Q13. (Full Stack Web)</div>
                  <p>(a) Develop an Express.js REST API with Mongoose schema and error middleware for Student resource. OR (b) Build a React shopping cart component using useState and useEffect hooks.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-white">Q14. (Theory of Computation)</div>
                  <p>(a) Construct a Pushdown Automata accepting L = &#123;w w^R | w in &#123;0, 1&#125;*&#125; by empty stack. OR (b) State and prove Rice\'s Theorem with respect to Turing Machines.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-white">Q15. (Quantum Computing)</div>
                  <p>(a) Explain BB84 Quantum Key Distribution protocol and eavesdropping detection. OR (b) Mathematically prove the No-Cloning theorem assuming a unitary operator.</p>
                </div>
              </div>
            </div>

            {/* Part C */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-300">
                  PART C (2 × 20 = 40 Marks) — Comprehensive Problem Solving (Reverse Modules 6, 5 & 4)
                </span>
                <span className="text-xs text-slate-400">20 Marks Each</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-white">Q16. (TOC / DBMS Comprehensive)</div>
                  <p>Design a 7-tuple Turing Machine to recognize L = &#123;a^n b^n c^n | n &gt;= 1&#125;. Provide formal transition diagram, transition table, and string trace. ALSO, decompose a given banking relation into 3NF and BCNF verifying lossless join and dependency preservation.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-white">Q17. (Quantum / Data Science Comprehensive)</div>
                  <p>Detail the Quantum Teleportation protocol with complete circuit, tensor state expansion, Bell measurement, and Bob\'s reconstruction. In addition, construct a Decision Tree using ID3 algorithm calculating Entropy and Information Gain for root split.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Karunya questions or keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quick Filter Buttons: Part A / Part B / Part C / Repeated */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-semibold mr-1">Section:</span>
            {['all', 'Part A', 'Part B', 'Part C', 'Repeated'].map((part) => (
              <button
                key={part}
                onClick={() => setSelectedPart(part)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedPart === part
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {part === 'all' ? 'All Sections' : part}
              </button>
            ))}
          </div>
        </div>

        {/* Second Row: Subject and Reverse Module Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedSubjectId('all')}
              className={`px-2.5 py-1 rounded-md transition ${
                selectedSubjectId === 'all'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Subjects
            </button>
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubjectId(s.id)}
                className={`px-2.5 py-1 rounded-md transition ${
                  selectedSubjectId === s.id
                    ? `${s.color.badge} font-bold`
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s.shortName}
              </button>
            ))}
          </div>

          {/* Reverse Module Filter (6 down to 1) */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Module:</span>
            <button
              onClick={() => setSelectedModule('all')}
              className={`px-2 py-0.5 rounded text-[11px] ${
                selectedModule === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              All
            </button>
            {[6, 5, 4, 3, 2, 1].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedModule(m)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  selectedModule === m
                    ? 'bg-amber-500 text-slate-950'
                    : m >= 5
                    ? 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                M{m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing {filteredQuestions.length} Karunya Exam Questions</span>
          <span>Sourced from KITS Library Portal Examination Archives</span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400">
            No questions match your filter criteria. Try resetting filters.
          </div>
        ) : (
          filteredQuestions.map((item) => {
            const isHintVisible = !!showAnswerHints[item.question.id];

            return (
              <div
                key={item.question.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition shadow-md space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${item.subject.color.badge}`}>
                      {item.subject.name}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                      Module {item.moduleNumber}: {item.moduleTitle}
                    </span>
                    <span className="text-xs font-bold text-white px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40">
                      {item.question.part}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.question.frequentlyRepeated && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        <Flame className="h-3 w-3 text-rose-400" />
                        Frequent in Karunya
                      </span>
                    )}
                    {item.question.yearAppeared && (
                      <span className="text-xs font-medium text-slate-400">
                        KITS: {item.question.yearAppeared}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                  {item.question.question}
                </p>

                {item.question.answerKeyHint && (
                  <div>
                    <button
                      onClick={() => toggleHint(item.question.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{isHintVisible ? 'Hide Answer Key / Formula Hint' : 'View Answer Key / Formula Hint'}</span>
                      {isHintVisible ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>

                    {isHintVisible && (
                      <div className="mt-2 p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-300">Model Answer & Marking Scheme: </strong>
                        {item.question.answerKeyHint}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
