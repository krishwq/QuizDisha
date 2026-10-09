import React from 'react';
import { Question, UserAnswerValue } from '../types';
import { LayoutGrid, CheckSquare, Hash, Atom, BookOpen, Layers, ArrowLeft } from 'lucide-react';

interface QuestionPaletteProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, UserAnswerValue>;
  markedForReview: Record<string, boolean>;
  onSelectQuestion: (index: number) => void;
  isCombined?: boolean;
  onReturnToSubjectSelection?: () => void;
}

interface PaletteSectionGroup {
  id: string;
  subject?: 'Physics' | 'Mathematics';
  sectionTitle: string;
  sectionType: 'mcq' | 'numerical';
  items: {
    question: Question;
    globalIndex: number;
    indexInSection: number;
  }[];
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  answers,
  markedForReview,
  onSelectQuestion,
  isCombined = false,
  onReturnToSubjectSelection,
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

  // Group questions by Subject and Section (MCQ vs Numerical)
  const hasMultipleSubjects = isCombined || (
    questions.some((q) => q.subject === 'Physics') &&
    questions.some((q) => q.subject === 'Mathematics')
  );

  const sectionGroups: PaletteSectionGroup[] = React.useMemo(() => {
    if (hasMultipleSubjects) {
      // 4 Sections: Physics MCQ, Physics Numerical, Math MCQ, Math Numerical
      const groups: PaletteSectionGroup[] = [
        {
          id: 'phy-mcq',
          subject: 'Physics',
          sectionTitle: 'Physics — Section A (MCQ)',
          sectionType: 'mcq',
          items: [],
        },
        {
          id: 'phy-num',
          subject: 'Physics',
          sectionTitle: 'Physics — Section B (Numerical)',
          sectionType: 'numerical',
          items: [],
        },
        {
          id: 'math-mcq',
          subject: 'Mathematics',
          sectionTitle: 'Mathematics — Section A (MCQ)',
          sectionType: 'mcq',
          items: [],
        },
        {
          id: 'math-num',
          subject: 'Mathematics',
          sectionTitle: 'Mathematics — Section B (Numerical)',
          sectionType: 'numerical',
          items: [],
        },
      ];

      questions.forEach((q, idx) => {
        const isMath = q.subject === 'Mathematics';
        const isNum = q.type === 'numerical';

        if (!isMath && !isNum) {
          groups[0].items.push({ question: q, globalIndex: idx, indexInSection: groups[0].items.length + 1 });
        } else if (!isMath && isNum) {
          groups[1].items.push({ question: q, globalIndex: idx, indexInSection: groups[1].items.length + 1 });
        } else if (isMath && !isNum) {
          groups[2].items.push({ question: q, globalIndex: idx, indexInSection: groups[2].items.length + 1 });
        } else {
          groups[3].items.push({ question: q, globalIndex: idx, indexInSection: groups[3].items.length + 1 });
        }
      });

      return groups.filter((g) => g.items.length > 0);
    } else {
      // Single Subject: 2 Sections (Section A: MCQ, Section B: Numerical)
      const mcqGroup: PaletteSectionGroup = {
        id: 'sec-mcq',
        subject: questions[0]?.subject,
        sectionTitle: 'Section A: Multiple Choice Questions (MCQ)',
        sectionType: 'mcq',
        items: [],
      };
      const numGroup: PaletteSectionGroup = {
        id: 'sec-num',
        subject: questions[0]?.subject,
        sectionTitle: 'Section B: Numerical Value Questions',
        sectionType: 'numerical',
        items: [],
      };

      questions.forEach((q, idx) => {
        if (q.type === 'numerical') {
          numGroup.items.push({ question: q, globalIndex: idx, indexInSection: numGroup.items.length + 1 });
        } else {
          mcqGroup.items.push({ question: q, globalIndex: idx, indexInSection: mcqGroup.items.length + 1 });
        }
      });

      return [mcqGroup, numGroup].filter((g) => g.items.length > 0);
    }
  }, [questions, hasMultipleSubjects]);

  // Overall counts for legend
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
      answeredCount++;
    } else unansweredCount++;
  });

  return (
    <aside 
      id="question-palette-sidebar"
      className="bg-white border border-[#d6e4f0] rounded-2xl shadow-sm p-4 sm:p-5 space-y-4"
    >
      {/* Palette Title */}
      <div className="flex items-center justify-between border-b border-[#d6e4f0] pb-3">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-[#0a2472]" />
          <h3 className="font-bold text-[#00072d] text-sm">Question Matrix</h3>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f8fbfe] border border-[#d6e4f0] text-[#536b82]">
          {questions.length} Questions
        </span>
      </div>

      {/* Return to Subject Selection Hub button for Combined Paper */}
      {isCombined && onReturnToSubjectSelection && (
        <button
          type="button"
          onClick={onReturnToSubjectSelection}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-[#f8fbfe] hover:bg-[#a6e1fa]/25 text-[#0a2472] border border-[#d6e4f0] hover:border-[#0a2472]/30 transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Subject Selection</span>
        </button>
      )}

      {/* Sections Accordion / Grids */}
      <div className="space-y-4">
        {sectionGroups.map((group) => {
          const groupAnswered = group.items.filter((item) => {
            const st = getQuestionStatus(item.question.id);
            return st === 'answered' || st === 'marked_answered';
          }).length;

          const isGroupActive = group.items.some((item) => item.globalIndex === currentIndex);

          return (
            <div 
              key={group.id}
              className={`rounded-xl border transition-all p-3 space-y-2.5 ${
                isGroupActive
                  ? 'border-[#0a2472]/40 bg-[#a6e1fa]/10 shadow-2xs'
                  : 'border-[#d6e4f0] bg-[#f8fbfe]/50'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {group.subject === 'Physics' ? (
                    <Atom className="w-3.5 h-3.5 text-[#0e6ba8]" />
                  ) : group.subject === 'Mathematics' ? (
                    <BookOpen className="w-3.5 h-3.5 text-[#0a2472]" />
                  ) : group.sectionType === 'mcq' ? (
                    <CheckSquare className="w-3.5 h-3.5 text-[#0a2472]" />
                  ) : (
                    <Hash className="w-3.5 h-3.5 text-[#16A34A]" />
                  )}
                  <h4 className="text-xs font-bold text-[#00072d]">
                    {group.sectionTitle}
                  </h4>
                </div>

                <span className="text-[10px] font-semibold text-[#536b82] bg-white px-2 py-0.5 rounded-md border border-[#d6e4f0]">
                  {groupAnswered}/{group.items.length} Ans
                </span>
              </div>

              {/* Grid of Question Numbers in this Section */}
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {group.items.map((item) => {
                  const status = getQuestionStatus(item.question.id);
                  const isCurrent = currentIndex === item.globalIndex;

                  let bgClasses = 'bg-white text-[#536b82] border-[#d6e4f0] hover:border-[#0e6ba8] hover:text-[#00072d]';

                  if (status === 'answered') {
                    bgClasses = 'bg-[#ECFDF5] text-[#16A34A] border-[#16A34A] font-bold shadow-xs';
                  } else if (status === 'marked') {
                    bgClasses = 'bg-[#FFF7ED] text-[#F97316] border-[#F97316] font-bold shadow-xs';
                  } else if (status === 'marked_answered') {
                    bgClasses = 'bg-gradient-to-br from-[#FFF7ED] to-[#ECFDF5] text-[#00072d] border-[#F97316] font-bold ring-1 ring-[#16A34A]';
                  }

                  return (
                    <button
                      key={item.question.id}
                      id={`palette-btn-${item.globalIndex + 1}`}
                      onClick={() => onSelectQuestion(item.globalIndex)}
                      className={`relative h-10 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${bgClasses} ${
                        isCurrent
                          ? 'ring-2 ring-[#0a2472] ring-offset-2 ring-offset-white scale-105 z-10'
                          : ''
                      }`}
                      title={`Question ${item.globalIndex + 1} (${group.sectionTitle}) - Status: ${status}`}
                    >
                      <span>{item.globalIndex + 1}</span>

                      {/* Dot badge if marked for review and answered */}
                      {status === 'marked_answered' && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#16A34A] ring-1 ring-white"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Legend Breakdown */}
      <div className="space-y-2 pt-2 border-t border-[#d6e4f0] text-xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#536b82] mb-2">
          Palette Status Legend
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Answered */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0]">
            <span className="w-3.5 h-3.5 rounded-md bg-[#16A34A] shrink-0"></span>
            <div className="flex justify-between w-full">
              <span className="text-[#00072d]">Answered</span>
              <span className="font-bold text-[#16A34A]">{answeredCount}</span>
            </div>
          </div>

          {/* Unanswered */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0]">
            <span className="w-3.5 h-3.5 rounded-md bg-white border border-[#d6e4f0] shrink-0"></span>
            <div className="flex justify-between w-full">
              <span className="text-[#00072d]">Unattempted</span>
              <span className="font-bold text-[#536b82]">{unansweredCount}</span>
            </div>
          </div>

          {/* Marked for Review */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0]">
            <span className="w-3.5 h-3.5 rounded-md bg-[#F97316] shrink-0"></span>
            <div className="flex justify-between w-full">
              <span className="text-[#00072d]">Review</span>
              <span className="font-bold text-[#F97316]">{markedCount}</span>
            </div>
          </div>

          {/* Marked & Answered */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0]">
            <div className="w-3.5 h-3.5 rounded-md bg-[#F97316] relative shrink-0">
              <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-[#00072d]">Ans &amp; Rev</span>
              <span className="font-bold text-[#00072d]">{markedAnsweredCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proctor Security Status Card in Sidebar */}
      <div className="bg-[#f8fbfe] border border-[#d6e4f0] rounded-xl p-3 text-xs space-y-1.5">
        <div className="flex items-center justify-between text-[#536b82]">
          <span>Security Protocol:</span>
          <span className="text-[#0e6ba8] font-semibold">Active Lockdown</span>
        </div>
        <div className="flex items-center justify-between text-[#536b82]">
          <span>Disqualification:</span>
          <span className="text-[#E11D48] font-semibold">3-Strikes Limit</span>
        </div>
      </div>
    </aside>
  );
};
