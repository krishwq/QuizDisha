import React from 'react';
import { Question, UserAnswerValue, TestMetadata } from '../types';
import { Atom, BookOpen, CheckCircle2, Clock, ArrowRight, Send, AlertCircle, Layers, ShieldCheck } from 'lucide-react';

interface CombinedSubjectSelectionHubProps {
  testMetadata: TestMetadata | null;
  questions: Question[];
  answers: Record<string, UserAnswerValue>;
  markedForReview: Record<string, boolean>;
  onSelectSubject: (subject: 'Physics' | 'Mathematics') => void;
  onSubmitExam: () => void;
}

export const CombinedSubjectSelectionHub: React.FC<CombinedSubjectSelectionHubProps> = ({
  testMetadata,
  questions,
  answers,
  markedForReview,
  onSelectSubject,
  onSubmitExam,
}) => {
  // Separate questions by subject
  const physicsQuestions = questions.filter((q) => q.subject === 'Physics');
  const mathQuestions = questions.filter((q) => q.subject === 'Mathematics');

  // Helper to check answer count
  const getSubjectStats = (subQuestions: Question[]) => {
    let answered = 0;
    let marked = 0;

    subQuestions.forEach((q) => {
      const val = answers[q.id];
      const isAns = val !== null && val !== undefined && (Array.isArray(val) ? val.length > 0 : true);
      if (isAns) answered++;
      if (markedForReview[q.id]) marked++;
    });

    const isCompleted = answered === subQuestions.length && subQuestions.length > 0;
    const isStarted = answered > 0;

    return {
      total: subQuestions.length,
      answered,
      marked,
      isCompleted,
      isStarted,
    };
  };

  const physicsStats = getSubjectStats(physicsQuestions);
  const mathStats = getSubjectStats(mathQuestions);
  const totalAnswered = physicsStats.answered + mathStats.answered;
  const totalQuestions = questions.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Title & Introduction Banner */}
      <div className="bg-white border border-[#d6e4f0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a6e1fa]/30 border border-[#a6e1fa] text-[#0a2472] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Combined Dual-Subject Assessment
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Live Anti-Cheat Lockdown Active
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#00072d] tracking-tight">
            Select Starting Subject Section
          </h1>
          <p className="text-sm text-[#536b82] mt-1.5 leading-relaxed max-w-3xl">
            Choose which subject you want to start first: <strong>Physics</strong> or <strong>Mathematics</strong>.
            Once you finish attempting that section, you will return to this selection page to attempt the other subject or submit your test.
          </p>
        </div>

        {/* Overall Progress Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
          <span className="bg-[#f8fbfe] border border-[#d6e4f0] px-3 py-1.5 rounded-xl font-semibold text-[#00072d]">
            Overall Progress: <strong className="text-[#0a2472]">{totalAnswered}</strong> / {totalQuestions} Answered
          </span>
          <span className="bg-[#f8fbfe] border border-[#d6e4f0] px-3 py-1.5 rounded-xl font-semibold text-[#00072d]">
            Physics: <strong className={physicsStats.isCompleted ? 'text-[#16A34A]' : 'text-[#0e6ba8]'}>{physicsStats.answered}/{physicsStats.total}</strong>
          </span>
          <span className="bg-[#f8fbfe] border border-[#d6e4f0] px-3 py-1.5 rounded-xl font-semibold text-[#00072d]">
            Mathematics: <strong className={mathStats.isCompleted ? 'text-[#16A34A]' : 'text-[#0a2472]'}>{mathStats.answered}/{mathStats.total}</strong>
          </span>
        </div>
      </div>

      {/* Two Subject Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ================================================================= */}
        {/* 1. PHYSICS SECTION CARD */}
        {/* ================================================================= */}
        <div className={`bg-white border-2 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-all duration-200 ${
          physicsStats.isCompleted
            ? 'border-[#16A34A]/40 bg-[#F0FDF4]/30'
            : 'border-[#0e6ba8]/30 hover:border-[#0e6ba8] hover:shadow-[0_8px_25px_rgb(14,107,168,0.12)]'
        }`}>
          <div className="space-y-4">
            
            {/* Subject Badge & Status */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-[#a6e1fa]/30 text-[#0e6ba8] border border-[#0e6ba8]/30">
                <Atom className="w-4 h-4" />
                Physics Section
              </span>

              {physicsStats.isCompleted ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16A34A] bg-[#ECFDF5] px-2.5 py-1 rounded-lg border border-[#A7F3D0]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed ({physicsStats.answered}/{physicsStats.total})
                </span>
              ) : physicsStats.isStarted ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#EA580C] bg-[#FFF7ED] px-2.5 py-1 rounded-lg border border-[#FED7AA]">
                  In Progress ({physicsStats.answered}/{physicsStats.total})
                </span>
              ) : (
                <span className="text-xs font-semibold text-[#536b82] bg-[#f8fbfe] px-2.5 py-1 rounded-lg border border-[#d6e4f0]">
                  Not Started ({physicsStats.total} Qs)
                </span>
              )}
            </div>

            {/* Subject Title & Description */}
            <div>
              <h2 className="text-xl font-extrabold text-[#00072d]">
                Physics
              </h2>
              <p className="text-xs text-[#536b82] mt-1 leading-relaxed">
                Contains fundamental mechanics, optics, dynamics, or electrodynamics. Separated into MCQ and Numerical sections.
              </p>
            </div>

            {/* Breakdown of Question Types */}
            <div className="bg-[#f8fbfe] border border-[#d6e4f0] rounded-2xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#00072d]">
                <span className="font-semibold">• Section A: Multiple Choice (MCQ)</span>
                <span className="font-bold text-[#0a2472]">4 Questions (+4 / -1 or -2)</span>
              </div>
              <div className="flex justify-between items-center text-[#00072d]">
                <span className="font-semibold">• Section B: Numerical Value</span>
                <span className="font-bold text-[#16A34A]">2 Questions (+4 / 0 Neg)</span>
              </div>
              <div className="pt-1.5 border-t border-[#d6e4f0] flex justify-between text-[11px] text-[#536b82]">
                <span>Allocated Time: 18 Minutes</span>
                <span>Max Score: 24 Marks</span>
              </div>
            </div>

          </div>

          {/* Action Trigger */}
          <div className="pt-6">
            <button
              id="choose-physics-btn"
              type="button"
              onClick={() => onSelectSubject('Physics')}
              className={`w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                physicsStats.isCompleted
                  ? 'bg-white hover:bg-[#F0FDF4] text-[#16A34A] border-2 border-[#16A34A]'
                  : 'bg-[#0e6ba8] hover:bg-[#0a2472] text-white shadow-[#0e6ba8]/20'
              }`}
            >
              <span>{physicsStats.isCompleted ? 'Review Physics Section' : physicsStats.isStarted ? 'Resume Physics Section' : 'Start with Physics First'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. MATHEMATICS SECTION CARD */}
        {/* ================================================================= */}
        <div className={`bg-white border-2 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-all duration-200 ${
          mathStats.isCompleted
            ? 'border-[#16A34A]/40 bg-[#F0FDF4]/30'
            : 'border-[#0a2472]/30 hover:border-[#0a2472] hover:shadow-[0_8px_25px_rgb(10,36,114,0.14)]'
        }`}>
          <div className="space-y-4">
            
            {/* Subject Badge & Status */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-[#a6e1fa]/30 text-[#0a2472] border border-[#0a2472]/30">
                <BookOpen className="w-4 h-4" />
                Mathematics Section
              </span>

              {mathStats.isCompleted ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16A34A] bg-[#ECFDF5] px-2.5 py-1 rounded-lg border border-[#A7F3D0]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed ({mathStats.answered}/{mathStats.total})
                </span>
              ) : mathStats.isStarted ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#EA580C] bg-[#FFF7ED] px-2.5 py-1 rounded-lg border border-[#FED7AA]">
                  In Progress ({mathStats.answered}/{mathStats.total})
                </span>
              ) : (
                <span className="text-xs font-semibold text-[#536b82] bg-[#f8fbfe] px-2.5 py-1 rounded-lg border border-[#d6e4f0]">
                  Not Started ({mathStats.total} Qs)
                </span>
              )}
            </div>

            {/* Subject Title & Description */}
            <div>
              <h2 className="text-xl font-extrabold text-[#00072d]">
                Mathematics
              </h2>
              <p className="text-xs text-[#536b82] mt-1 leading-relaxed">
                Contains algebra, real numbers, quadratic formulations, coordinate geometry &amp; mensuration. Divided into MCQ and Numerical sections.
              </p>
            </div>

            {/* Breakdown of Question Types */}
            <div className="bg-[#f8fbfe] border border-[#d6e4f0] rounded-2xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#00072d]">
                <span className="font-semibold">• Section A: Multiple Choice (MCQ)</span>
                <span className="font-bold text-[#0a2472]">4 Questions (+4 / -1 or -2)</span>
              </div>
              <div className="flex justify-between items-center text-[#00072d]">
                <span className="font-semibold">• Section B: Numerical Value</span>
                <span className="font-bold text-[#16A34A]">2 Questions (+4 / 0 Neg)</span>
              </div>
              <div className="pt-1.5 border-t border-[#d6e4f0] flex justify-between text-[11px] text-[#536b82]">
                <span>Allocated Time: 18 Minutes</span>
                <span>Max Score: 24 Marks</span>
              </div>
            </div>

          </div>

          {/* Action Trigger */}
          <div className="pt-6">
            <button
              id="choose-mathematics-btn"
              type="button"
              onClick={() => onSelectSubject('Mathematics')}
              className={`w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                mathStats.isCompleted
                  ? 'bg-white hover:bg-[#F0FDF4] text-[#16A34A] border-2 border-[#16A34A]'
                  : 'bg-[#0a2472] hover:bg-[#001c55] text-white shadow-[#0a2472]/20'
              }`}
            >
              <span>{mathStats.isCompleted ? 'Review Mathematics Section' : mathStats.isStarted ? 'Resume Mathematics Section' : 'Start with Mathematics First'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Final Submission Card */}
      <div className="bg-white border border-[#d6e4f0] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#EA580C]" />
            <h3 className="text-sm font-bold text-[#00072d]">
              Ready to Finish Assessment?
            </h3>
          </div>
          <p className="text-xs text-[#536b82]">
            You have attempted <strong>{totalAnswered}</strong> out of <strong>{totalQuestions}</strong> total questions. You may submit now or return to any subject.
          </p>
        </div>

        <button
          id="hub-submit-assessment-btn"
          type="button"
          onClick={onSubmitExam}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold bg-[#16A34A] hover:bg-[#15803D] text-white shadow-md shadow-emerald-600/20 cursor-pointer shrink-0 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Submit Combined Examination</span>
        </button>
      </div>

    </div>
  );
};
