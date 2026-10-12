export type CaseType =
  | 'Genitivo'
  | 'Dativo'
  | 'Accusativo'
  | 'Strumentale'
  | 'Preposizionale'
  | 'Variabile'
  | 'Concordanza Numerali';

export type SectionId = 'section_1' | 'section_2' | 'section_3';

export type QuestionType = 'multiple_choice' | 'true_false' | 'case_study';

export interface Exercise {
  id: string;
  sectionId: SectionId;
  sectionTitle: string;
  category: string;
  bookRef: string;
  questionType: QuestionType;
  prompt: string;
  russianSentence: string;
  highlightWord?: string;
  options: string[];
  correctIndex: number;
  hint: string;
  detailedExplanation: string;
  targetCase: CaseType;
  prepositionUsed?: string;
}

export interface GovernanceEntry {
  id: string;
  word: string;
  aspect?: string;
  partOfSpeech: 'verbo' | 'aggettivo' | 'sostantivo';
  governmentFormula: string;
  italianMeaning: string;
  cases: CaseType[];
  exampleRussian: string;
  exampleItalian: string;
  notes?: string;
  section: 'Base' | 'Letterario' | 'Scientifico' | 'Variabile';
}

export interface UserStats {
  totalAnswered: number;
  totalCorrect: number;
  streak: number;
  maxStreak: number;
  completedExerciseIds: string[];
  incorrectExerciseIds: string[];
  bookmarkedExerciseIds: string[];
  byCase: Record<CaseType, { total: number; correct: number }>;
  history?: Record<string, { answered: number; correct: number }>;
}

export interface SectionInfo {
  id: SectionId;
  number: string;
  titleRussian: string;
  titleItalian: string;
  author: string;
  descriptionItalian: string;
  subtopics: {
    id: string;
    titleItalian: string;
    titleRussian: string;
    summary: string;
    exerciseCount: number;
  }[];
}
