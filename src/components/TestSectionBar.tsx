import React from 'react';
import { Question } from '../types';
import { Atom, BookOpen, CheckSquare, Hash, Layers, ArrowLeft } from 'lucide-react';

interface TestSectionBarProps {
  questions: Question[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  isCombined?: boolean;
  onReturnToSubjectSelection?: () => void;
}

export const TestSectionBar: React.FC<TestSectionBarProps> = ({
  questions,
  currentIndex,
  onSelectQuestion,
  isCombined = false,
  onReturnToSubjectSelection,
}) => {
  const currentQuestion = questions[currentIndex];

  const hasMultipleSubjects = isCombined || (
    questions.some((q) => q.subject === 'Physics') &&
    questions.some((q) => q.subject === 'Mathematics')
  );

  // Group indices by subject and type
  const sections = React.useMemo(() => {
    if (hasMultipleSubjects) {
      const phyMcqIndices: number[] = [];
      const phyNumIndices: number[] = [];
      const mathMcqIndices: number[] = [];
      const mathNumIndices: number[] = [];

      questions.forEach((q, idx) => {
        const isMath = q.subject === 'Mathematics';
        const isNum = q.type === 'numerical';
        if (!isMath && !isNum) phyMcqIndices.push(idx);
        else if (!isMath && isNum) phyNumIndices.push(idx);
        else if (isMath && !isNum) mathMcqIndices.push(idx);
        else mathNumIndices.push(idx);
      });

      return {
        isCombined: true,
        physics: {
          mcq: phyMcqIndices,
          num: phyNumIndices,
        },
        math: {
          mcq: mathMcqIndices,
          num: mathNumIndices,
        },
      };
    } else {
      const mcqIndices: number[] = [];
      const numIndices: number[] = [];

      questions.forEach((q, idx) => {
        if (q.type === 'numerical') numIndices.push(idx);
        else mcqIndices.push(idx);
      });

      return {
        isCombined: false,
        single: {
          mcq: mcqIndices,
          num: numIndices,
        },
      };
    }
  }, [questions, hasMultipleSubjects]);

  if (sections.isCombined && sections.physics && sections.math) {
    const isCurrentMath = currentQuestion?.subject === 'Mathematics';
    const isCurrentNumerical = currentQuestion?.type === 'numerical';

    return (
      <div className="bg-white border border-[#d6e4f0] rounded-2xl p-3 sm:p-4 shadow-xs space-y-3">
        {/* Level 1: Subject Selection Tabs */}
        <div className="flex items-center justify-between gap-2 border-b border-[#d6e4f0] pb-2.5 flex-wrap">
          <div className="flex items-center gap-2">
            {onReturnToSubjectSelection && (
              <button
                type="button"
                onClick={onReturnToSubjectSelection}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#f8fbfe] hover:bg-[#a6e1fa]/25 text-[#0a2472] border border-[#d6e4f0] hover:border-[#0a2472]/30 transition-all cursor-pointer shadow-2xs mr-1"
                title="Return to Subject Selection Hub"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Subject Selection</span>
              </button>
            )}
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#536b82]">
              <Layers className="w-3.5 h-3.5 text-[#0a2472]" />
              <span>Subject:</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Physics Tab */}
            <button
              type="button"
              onClick={() => {
                if (sections.physics.mcq.length > 0) onSelectQuestion(sections.physics.mcq[0]);
                else if (sections.physics.num.length > 0) onSelectQuestion(sections.physics.num[0]);
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !isCurrentMath
                  ? 'bg-[#0e6ba8] text-white shadow-xs'
                  : 'bg-[#f8fbfe] text-[#536b82] hover:bg-[#d6e4f0] hover:text-[#00072d] border border-[#d6e4f0]'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>Physics</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                !isCurrentMath ? 'bg-white/20 text-white' : 'bg-[#d6e4f0] text-[#536b82]'
              }`}>
                {sections.physics.mcq.length + sections.physics.num.length} Qs
              </span>
            </button>

            {/* Mathematics Tab */}
            <button
              type="button"
              onClick={() => {
                if (sections.math.mcq.length > 0) onSelectQuestion(sections.math.mcq[0]);
                else if (sections.math.num.length > 0) onSelectQuestion(sections.math.num[0]);
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isCurrentMath
                  ? 'bg-[#0a2472] text-white shadow-xs'
                  : 'bg-[#f8fbfe] text-[#536b82] hover:bg-[#d6e4f0] hover:text-[#00072d] border border-[#d6e4f0]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mathematics</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                isCurrentMath ? 'bg-white/20 text-white' : 'bg-[#d6e4f0] text-[#536b82]'
              }`}>
                {sections.math.mcq.length + sections.math.num.length} Qs
              </span>
            </button>
          </div>
        </div>

        {/* Level 2: Section Tabs (MCQ vs Numerical for the active subject) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-semibold text-[#00072d] flex items-center gap-1.5">
            <span className="text-[#536b82]">Current Section:</span>
            <span className="font-bold text-[#0a2472]">
              {!isCurrentMath ? 'Physics' : 'Mathematics'} — {isCurrentNumerical ? 'Section B: Numerical' : 'Section A: MCQ'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* MCQ Section */}
            <button
              type="button"
              onClick={() => {
                const targetList = !isCurrentMath ? sections.physics.mcq : sections.math.mcq;
                if (targetList.length > 0) onSelectQuestion(targetList[0]);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                !isCurrentNumerical
                  ? 'bg-[#a6e1fa]/30 text-[#0a2472] border-[#0a2472]/40 shadow-xs'
                  : 'bg-white text-[#536b82] border-[#d6e4f0] hover:bg-[#f8fbfe] hover:text-[#00072d]'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-[#0a2472]" />
              <span>Section A: MCQ</span>
              <span className="text-[10px] text-[#536b82] bg-white/80 px-1.5 py-0.5 rounded border border-[#d6e4f0]">
                {!isCurrentMath ? sections.physics.mcq.length : sections.math.mcq.length} Qs
              </span>
            </button>

            {/* Numerical Section */}
            <button
              type="button"
              onClick={() => {
                const targetList = !isCurrentMath ? sections.physics.num : sections.math.num;
                if (targetList.length > 0) onSelectQuestion(targetList[0]);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isCurrentNumerical
                  ? 'bg-[#ECFDF5] text-[#16A34A] border-[#16A34A]/40 shadow-xs'
                  : 'bg-white text-[#536b82] border-[#d6e4f0] hover:bg-[#f8fbfe] hover:text-[#00072d]'
              }`}
            >
              <Hash className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Section B: Numerical</span>
              <span className="text-[10px] text-[#536b82] bg-white/80 px-1.5 py-0.5 rounded border border-[#d6e4f0]">
                {!isCurrentMath ? sections.physics.num.length : sections.math.num.length} Qs
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Single Subject Section Bar: 2 sections (MCQ and Numerical)
  const isCurrentNumerical = currentQuestion?.type === 'numerical';
  const single = sections.single!;

  return (
    <div className="bg-white border border-[#d6e4f0] rounded-2xl p-3 sm:p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-[#536b82]">Test Sections:</span>
        <span className="text-xs font-extrabold text-[#0a2472] bg-[#a6e1fa]/30 px-2.5 py-0.5 rounded-lg border border-[#a6e1fa]/40">
          {isCurrentNumerical ? 'Section B: Numerical Value' : 'Section A: Multiple Choice (MCQ)'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Section A: MCQ */}
        {single.mcq.length > 0 && (
          <button
            type="button"
            onClick={() => onSelectQuestion(single.mcq[0])}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              !isCurrentNumerical
                ? 'bg-[#0a2472] text-white border-[#0a2472] shadow-xs'
                : 'bg-[#f8fbfe] text-[#536b82] border-[#d6e4f0] hover:bg-[#d6e4f0] hover:text-[#00072d]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Section A: MCQ ({single.mcq.length} Questions)</span>
          </button>
        )}

        {/* Section B: Numerical */}
        {single.num.length > 0 && (
          <button
            type="button"
            onClick={() => onSelectQuestion(single.num[0])}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              isCurrentNumerical
                ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-xs'
                : 'bg-[#f8fbfe] text-[#536b82] border-[#d6e4f0] hover:bg-[#d6e4f0] hover:text-[#00072d]'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Section B: Numerical ({single.num.length} Questions)</span>
          </button>
        )}
      </div>
    </div>
  );
};
