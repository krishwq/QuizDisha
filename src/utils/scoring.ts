import { Question, UserAnswerValue, QuestionResult, QuizReportData, ProctorViolation, CandidateInfo } from '../types';

/**
 * Calculates scores, marks, and evaluation breakdown for a submitted quiz.
 */
export function evaluateQuiz(
  questions: Question[],
  answers: Record<string, UserAnswerValue>,
  timeSpentSeconds: number,
  totalAllocatedSeconds: number,
  violations: ProctorViolation[],
  submissionReason: 'manual' | 'timeout' | 'disqualification',
  videoBlobUrl: string | null,
  recordedFileName?: string,
  backendArchiveInfo?: QuizReportData['backendArchiveInfo'],
  candidate?: CandidateInfo,
  testInfo?: QuizReportData['testInfo']
): QuizReportData {
  let attemptedCount = 0;
  let unattemptedCount = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let positiveMarks = 0;
  let negativeMarks = 0;

  const maxPossibleScore = questions.length * 4;

  const breakdown: QuestionResult[] = questions.map((q) => {
    const rawAnswer = answers[q.id];
    let isAttempted = false;
    let isCorrect = false;
    let scoreAwarded = 0;
    let toleranceApplied: QuestionResult['toleranceApplied'] = undefined;

    if (q.type === 'single') {
      if (typeof rawAnswer === 'number' && rawAnswer >= 0) {
        isAttempted = true;
        if (rawAnswer === q.correctAnswer) {
          isCorrect = true;
          scoreAwarded = 4;
          positiveMarks += 4;
          correctCount++;
        } else {
          isCorrect = false;
          scoreAwarded = -1;
          negativeMarks += 1;
          incorrectCount++;
        }
      } else {
        isAttempted = false;
        unattemptedCount++;
      }
    } else if (q.type === 'multiple') {
      const selected = Array.isArray(rawAnswer) ? rawAnswer : [];
      if (selected.length > 0) {
        isAttempted = true;
        const sortedSelected = [...selected].sort((a, b) => a - b);
        const sortedCorrect = [...q.correctAnswers].sort((a, b) => a - b);
        const isExactMatch =
          sortedSelected.length === sortedCorrect.length &&
          sortedSelected.every((val, idx) => val === sortedCorrect[idx]);

        if (isExactMatch) {
          isCorrect = true;
          scoreAwarded = 4;
          positiveMarks += 4;
          correctCount++;
        } else {
          isCorrect = false;
          scoreAwarded = -2;
          negativeMarks += 2;
          incorrectCount++;
        }
      } else {
        isAttempted = false;
        unattemptedCount++;
      }
    } else if (q.type === 'numerical') {
      const minAcceptable = Number((q.correctAnswer - q.tolerance).toFixed(4));
      const maxAcceptable = Number((q.correctAnswer + q.tolerance).toFixed(4));
      const userNum = typeof rawAnswer === 'number' && !isNaN(rawAnswer) ? rawAnswer : null;

      toleranceApplied = {
        min: minAcceptable,
        max: maxAcceptable,
        userValue: userNum,
      };

      if (userNum !== null) {
        isAttempted = true;
        const diff = Math.abs(userNum - q.correctAnswer);
        // Using slight epsilon for floating point tolerances
        if (diff <= q.tolerance + 0.00001) {
          isCorrect = true;
          scoreAwarded = 4;
          positiveMarks += 4;
          correctCount++;
        } else {
          isCorrect = false;
          scoreAwarded = 0; // 0 negative marks for numerical
          incorrectCount++;
        }
      } else {
        isAttempted = false;
        unattemptedCount++;
      }
    }

    if (isAttempted) {
      attemptedCount++;
    }

    return {
      question: q,
      userAnswer: rawAnswer ?? null,
      isAttempted,
      isCorrect,
      scoreAwarded,
      toleranceApplied,
    };
  });

  const netScore = positiveMarks - negativeMarks;
  const accuracyRate =
    attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  return {
    candidate: candidate || { name: 'Candidate', email: 'candidate@example.com' },
    testInfo,
    totalQuestions: questions.length,
    attemptedCount,
    unattemptedCount,
    correctCount,
    incorrectCount,
    positiveMarks,
    negativeMarks,
    netScore,
    maxPossibleScore,
    accuracyRate,
    timeSpentSeconds,
    totalAllocatedSeconds,
    submissionReason,
    violations,
    videoBlobUrl,
    recordedFileName,
    backendArchiveInfo,
    breakdown,
  };
}

/**
 * Format seconds into mm:ss format.
 */
export function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
