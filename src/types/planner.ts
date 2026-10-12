export type PriorityWeight = 'CRITICAL_HIGH' | 'HIGH' | 'MEDIUM';
export type ModuleOrder = '6-to-1' | '1-to-6';

export interface SubTopic {
  id: string;
  name: string;
  completed: boolean;
  notes?: string;
}

export interface KarunyaQuestion {
  id: string;
  part: 'Part A (2 Marks)' | 'Part B (8-10 Marks)' | 'Part C (14-16 Marks)';
  marks: number;
  question: string;
  frequentlyRepeated: boolean;
  yearAppeared?: string;
  answerKeyHint?: string;
}

export interface ModuleData {
  moduleNumber: number; // 1 to 6
  title: string;
  hours: number;
  weight: PriorityWeight;
  weightScore: number; // e.g. 95/100
  topicsDescription: string;
  subtopics: SubTopic[];
  examTips: string;
  karunyaQuestions: KarunyaQuestion[];
  completed: boolean;
}

export interface SubjectData {
  id: string;
  code: string;
  name: string;
  shortName: string;
  color: {
    bg: string;
    text: string;
    border: string;
    badge: string;
    hex: string;
    calendarColorId: string; // Google Calendar colorId
  };
  totalHours: number;
  examDate?: string; // Estimated exam slot
  modules: ModuleData[]; // 1 to 6
}

export interface StudySlot {
  id: string;
  timeSlot: 'Morning (09:00 - 11:30)' | 'Afternoon (14:00 - 16:30)' | 'Evening (18:30 - 21:00)' | 'Night Recall (21:30 - 22:30)';
  subjectId: string;
  subjectName: string;
  moduleNumber: number;
  moduleTitle: string;
  activity: 'Core Concept Learning' | 'Numerical / Algorithm Problem' | 'Karunya Past Paper Practice' | 'Summary & Flash Recall';
  description: string;
  highPriority: boolean;
  completed: boolean;
  syncedToCalendar?: boolean;
}

export interface StudyDay {
  date: string; // YYYY-MM-DD
  dayNumber: number; // Day 1 to 29
  phase: 'Phase 1: High Weight Modules (6 & 5)' | 'Phase 2: Core Deep-Dives (4 & 3)' | 'Phase 3: Foundations & Fast Recall (2 & 1)' | 'Phase 4: Full Karunya Mock Papers';
  focusTheme: string;
  slots: StudySlot[];
  isRestOrBuffer?: boolean;
}
