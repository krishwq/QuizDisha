import React from 'react';
import { Send, AlertCircle, CheckCircle2, Bookmark, HelpCircle, Loader2 } from 'lucide-react';
import { Question, UserAnswerValue } from '../types';

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  isSubmitting?: boolean;
  questions: Question[];
  answers: Record<string, UserAnswerValue>;
  markedForReview: Record<string, boolean>;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmSubmitModal: React.FC<ConfirmSubmitModalProps> = ({
  isOpen,
  isSubmitting = false,
  questions,
  answers,
  markedForReview,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  let attemptedCount = 0;
  let markedCount = 0;

  questions.forEach((q) => {
    const raw = answers[q.id];
    if (raw !== null && raw !== undefined && (Array.isArray(raw) ? raw.length > 0 : true)) {
      attemptedCount++;
    }
    if (markedForReview[q.id]) {
      markedCount++;
    }
  });

  const unattemptedCount = questions.length - attemptedCount;

  return (
    <div 
      id="confirm-submit-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
    >
      <div className="bg-white border border-[#E7E5E4] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
        
        <div className="flex items-center gap-3 border-b border-[#E7E5E4] pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#16A34A]">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1C1917]">Final Exam Submission</h3>
            <p className="text-xs text-[#78716C]">Review your attempt breakdown before concluding</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-3">
            <div className="text-xl font-bold text-[#16A34A]">{attemptedCount}</div>
            <div className="text-[11px] text-[#78716C] mt-0.5">Attempted</div>
          </div>
          <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-3">
            <div className="text-xl font-bold text-[#E11D48]">{unattemptedCount}</div>
            <div className="text-[11px] text-[#78716C] mt-0.5">Unattempted</div>
          </div>
          <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-3">
            <div className="text-xl font-bold text-[#F97316]">{markedCount}</div>
            <div className="text-[11px] text-[#78716C] mt-0.5">For Review</div>
          </div>
        </div>

        {/* Notice Info */}
        <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs text-[#1C1917] space-y-1.5">
          <p className="flex items-center gap-1.5 text-[#0891B2] font-semibold">
            <AlertCircle className="w-3.5 h-3.5" /> A/V Recording &amp; Submission Notice:
          </p>
          <p className="text-[#78716C] leading-relaxed">
            Submitting will permanently lock your answers, conclude the proctored session, and automatically save your surveillance recording and PDF report to the backend. Candidate video download is restricted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            id="cancel-submit-modal-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-[#FAFAF9] text-[#1C1917] border border-[#E7E5E4] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resume Assessment
          </button>
          <button
            id="confirm-submit-modal-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16A34A] hover:bg-[#15803d] text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting &amp; Archiving...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Confirm &amp; Final Submit</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
