import React from 'react';
import { Question, UserAnswerValue } from '../types';
import { LayoutGrid, Bookmark, CheckCircle2, CircleDashed, Award } from 'lucide-react';

interface QuestionPaletteProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, UserAnswerValue>;
  markedForReview: Record<string, boolean>;
  onSelectQuestion: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  answers,
  markedForReview,
  onSelectQuestion,
}) => {
  // Determine the status of a question
  const getQuestionStatus = (qId: string) => {
    const rawAnswer = answers[qId];
    const isAnswered =
      rawAnswer !== null &&
      rawAnswer !== undefined &&
      (Array.isArray(rawAnswer) ? rawAnswer.length > 0 : true);
    const isMarked = !!markedForReview[qId];

    if (isMarked && isAnswered) return 'marked_answered';
    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    return 'unanswered';
  };

  // Counts for legend
  let answeredCount = 0;
  let unansweredCount = 0;
  let markedCount = 0;
  let markedAnsweredCount = 0;

  questions.forEach((q) => {
    const status = getQuestionStatus(q.id);
    if (status === 'answered') answeredCount++;
    else if (status === 'marked') markedCount++;
    else if (status === 'marked_answered') {
      markedAnsweredCount++;
      answeredCount++; // Also counts towards answered
    } else unansweredCount++;
  });

  return (
    <aside 
      id="question-palette-sidebar"
      className="bg-white border border-[#E7E5E4] rounded-2xl shadow-sm p-5 space-y-5"
    >
      {/* Palette Title */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-[#4338CA]" />
          <h3 className="font-bold text-[#1C1917] text-sm">Question Matrix</h3>
        </div>
        <span className="text-xs text-[#78716C]">
          {questions.length} Questions
        </span>
      </div>

      {/* Grid of Question Numbers */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-2.5">
        {questions.map((q, idx) => {
          const status = getQuestionStatus(q.id);
          const isCurrent = currentIndex === idx;

          let bgClasses = 'bg-[#FAFAF9] text-[#78716C] border-[#E7E5E4] hover:border-[#4338CA] hover:text-[#1C1917]';

          if (status === 'answered') {
            bgClasses = 'bg-[#ECFDF5] text-[#16A34A] border-[#16A34A] font-bold shadow-xs';
          } else if (status === 'marked') {
            bgClasses = 'bg-[#FFF7ED] text-[#F97316] border-[#F97316] font-bold shadow-xs';
          } else if (status === 'marked_answered') {
            bgClasses = 'bg-gradient-to-br from-[#FFF7ED] to-[#ECFDF5] text-[#1C1917] border-[#F97316] font-bold ring-1 ring-[#16A34A]';
          }

          return (
            <button
              key={q.id}
              id={`palette-btn-${idx + 1}`}
              onClick={() => onSelectQuestion(idx)}
              className={`relative h-11 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center cursor-pointer ${bgClasses} ${
                isCurrent
                  ? 'ring-2 ring-[#4338CA] ring-offset-2 ring-offset-white scale-105 z-10'
                  : ''
              }`}
              title={`Question ${idx + 1} (${status})`}
            >
              <span>{idx + 1}</span>

              {/* Dot badge if marked for review and answered */}
              {status === 'marked_answered' && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#16A34A] ring-1 ring-white"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Status Legend Breakdown */}
      <div className="space-y-2 pt-2 border-t border-[#E7E5E4] text-xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] mb-2">
          Palette Status Legend
        </div>

        <div className="grid grid-cols-2 gap-2">
          
          {/* Answered */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
            <span className="w-3.5 h-3.5 rounded-md bg-[#16A34A] shrink-0"></span>
            <div className="flex justify-between w-full">
              <span className="text-[#1C1917]">Answered</span>
              <span className="font-bold text-[#16A34A]">{answeredCount}</span>
            </div>
          </div>

          {/* Unanswered */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
            <span className="w-3.5 h-3.5 rounded-md bg-white border border-[#E7E5E4] shrink-0"></span>
            <div className="flex justify-between w-full">
              <span className="text-[#1C1917]">Unattempted</span>
              <span className="font-bold text-[#78716C]">{unansweredCount}</span>
            </div>
          </div>

          {/* Marked for Review */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
            <span className="w-3.5 h-3.5 rounded-md bg-[#F97316] shrink-0"></span>
            <div className="flex justify-between w-full">
              <span className="text-[#1C1917]">Review</span>
              <span className="font-bold text-[#F97316]">{markedCount}</span>
            </div>
          </div>

          {/* Marked & Answered */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
            <div className="w-3.5 h-3.5 rounded-md bg-[#F97316] relative shrink-0">
              <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-[#1C1917]">Ans &amp; Rev</span>
              <span className="font-bold text-[#1C1917]">{markedAnsweredCount}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Proctor Security Status Card in Sidebar */}
      <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-3 text-xs space-y-1.5">
        <div className="flex items-center justify-between text-[#78716C]">
          <span>Security Protocol:</span>
          <span className="text-[#0891B2] font-semibold">Active Lockdown</span>
        </div>
        <div className="flex items-center justify-between text-[#78716C]">
          <span>Disqualification:</span>
          <span className="text-[#E11D48] font-semibold">3-Strikes Limit</span>
        </div>
      </div>

    </aside>
  );
};
