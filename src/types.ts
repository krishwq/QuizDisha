export type QuestionType = 'single' | 'multiple' | 'numerical';

export interface OptionObject {
  text?: string;
  imageUrl?: string;
  caption?: string;
}

export type QuestionOption = string | OptionObject;

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  title: string;
  prompt: string;
  category: string;
  explanation: string;
  imageUrl?: string; // External link for question diagram / illustration
  imageCaption?: string; // Optional caption for the question image
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single';
  options: QuestionOption[];
  correctAnswer: number; // 0-indexed option
  optionImages?: (string | undefined)[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple';
  options: QuestionOption[];
  correctAnswers: number[]; // 0-indexed options
  optionImages?: (string | undefined)[];
}

export interface NumericalQuestion extends BaseQuestion {
  type: 'numerical';
  correctAnswer: number;
  tolerance: number; // e.g. 0.1 means [correctAnswer - tolerance, correctAnswer + tolerance]
  unit?: string;
  placeholder?: string;
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | NumericalQuestion;

export type UserAnswerValue = 
  | number // single choice option index
  | number[] // multiple choice option indices
  | number // numerical value
  | null; // unattempted

export type QuestionStatus = 'unanswered' | 'answered' | 'review' | 'marked_answered';

export interface ProctorViolation {
  id: string;
  timestamp: string;
  type: 'tab_switch' | 'fullscreen_exit' | 'window_blur' | 'context_menu' | 'copy_paste' | 'key_violation';
  description: string;
  severity: 'warning' | 'critical';
}

export interface QuestionResult {
  question: Question;
  userAnswer: UserAnswerValue;
  isAttempted: boolean;
  isCorrect: boolean;
  scoreAwarded: number; // e.g. +4, -1, -2, 0
  toleranceApplied?: {
    min: number;
    max: number;
    userValue: number | null;
  };
}

export interface CandidateInfo {
  name: string;
  email: string;
}

export type ExamStandard = 'Class 10' | 'Class 9';
export type ExamSubject = 'Physics' | 'Chemistry' | 'Mathematics' | 'All in One';

export interface TestMetadata {
  id: string;
  standard: ExamStandard;
  subject: ExamSubject;
  setNumber: 1 | 2;
  title: string;
  subtitle: string;
  description: string;
  syllabus: string[];
  totalMarks: number;
  durationMinutes: number;
  questions: Question[];
}

export interface TestInfo {
  id: string;
  standard: ExamStandard;
  subject: ExamSubject;
  setNumber: 1 | 2;
  title: string;
}

export interface QuizReportData {
  candidate: CandidateInfo;
  testInfo?: TestInfo;
  totalQuestions: number;
  attemptedCount: number;
  unattemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  positiveMarks: number;
  negativeMarks: number;
  netScore: number;
  maxPossibleScore: number;
  accuracyRate: number; // percentage
  timeSpentSeconds: number;
  totalAllocatedSeconds: number;
  submissionReason: 'manual' | 'timeout' | 'disqualification';
  violations: ProctorViolation[];
  videoBlobUrl: string | null;
  recordedFileName?: string;
  backendArchiveInfo?: {
    success: boolean;
    message: string;
    fileName?: string;
    fileSize?: number;
    timestamp?: string;
    driveUrl?: string;
    driveFileId?: string;
    folderName?: string;
    gasSynced?: boolean;
    gasConfigured?: boolean;
    mode?: string;
  };
  pdfBlobUrl?: string | null;
  pdfFileName?: string;
  pdfArchiveInfo?: {
    success: boolean;
    message: string;
    fileName?: string;
    fileSize?: number;
    timestamp?: string;
    driveUrl?: string;
    driveFileId?: string;
    folderName?: string;
    gasSynced?: boolean;
    gasConfigured?: boolean;
    mode?: string;
  };
  breakdown: QuestionResult[];
}
