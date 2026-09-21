import React, { useState } from 'react';
import { 
  Question, 
  UserAnswerValue, 
  SingleChoiceQuestion, 
  MultipleChoiceQuestion, 
  NumericalQuestion 
} from '../types';
import { 
  Bookmark, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle,
  Hash,
  CheckSquare,
  Dot,
  Send,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import { parseOption } from '../utils/questionUtils';
import { ImageViewerModal } from './ImageViewerModal';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  currentAnswer: UserAnswerValue;
  isMarkedForReview: boolean;
  onAnswerChange: (newAnswer: UserAnswerValue) => void;
  onToggleReview: () => void;
  onClearResponse: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  currentAnswer,
  isMarkedForReview,
  onAnswerChange,
  onToggleReview,
  onClearResponse,
  onPrev,
  onNext,
}) => {
  // Modal state for inspecting diagram in high resolution
  const [modalImage, setModalImage] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    caption?: string;
  }>({
    isOpen: false,
    url: '',
    title: '',
    caption: '',
  });

  const openImageModal = (url: string, title: string, caption?: string) => {
    setModalImage({
      isOpen: true,
      url,
      title,
      caption,
    });
  };

  const closeImageModal = () => {
    setModalImage((prev) => ({ ...prev, isOpen: false }));
  };

  // Helpers for single choice
  const handleSingleSelect = (optionIndex: number) => {
    onAnswerChange(optionIndex);
  };

  // Helpers for multiple choice
  const handleMultipleToggle = (optionIndex: number) => {
    const currentList = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    const exists = currentList.includes(optionIndex);
    let updated: number[];
    if (exists) {
      updated = currentList.filter((idx) => idx !== optionIndex);
    } else {
      updated = [...currentList, optionIndex].sort((a, b) => a - b);
    }
    onAnswerChange(updated.length > 0 ? updated : null);
  };

  // Helpers for numerical input
  const handleNumericalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.trim();
    if (rawVal === '') {
      onAnswerChange(null);
    } else {
      const parsed = parseFloat(rawVal);
      if (!isNaN(parsed)) {
        onAnswerChange(parsed);
      }
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  // Render question marking badge
  const renderMarkingBadge = () => {
    switch (question.type) {
      case 'single':
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#ECFEFF] text-[#0891B2] border border-[#0891B2]/30">
            <span>Single Choice</span>
            <span className="text-[#78716C]">•</span>
            <span className="text-[#16A34A]">+4</span>
            <span className="text-[#E11D48]">-1</span>
          </div>
        );
      case 'multiple':
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#EEF2FF] text-[#4338CA] border border-[#4338CA]/30">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Multiple Choice</span>
            <span className="text-[#78716C]">•</span>
            <span className="text-[#16A34A]">+4</span>
            <span className="text-[#E11D48]">-2</span>
          </div>
        );
      case 'numerical':
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#ECFDF5] text-[#16A34A] border border-[#16A34A]/30">
            <Hash className="w-3.5 h-3.5" />
            <span>Numerical Value</span>
            <span className="text-[#78716C]">•</span>
            <span className="text-[#16A34A]">+4</span>
            <span className="text-[#78716C]">0 Neg</span>
          </div>
        );
    }
  };

  return (
    <article 
      id={`question-card-${question.id}`}
      className="bg-white border border-[#E7E5E4] rounded-2xl shadow-sm p-5 sm:p-7 flex flex-col justify-between min-h-[500px]"
    >
      {/* Top Question Info Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E5E4] pb-3.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-sm font-bold bg-[#FAFAF9] text-[#1C1917] border border-[#E7E5E4]">
              Q{currentIndex + 1}
            </span>
            <span className="text-xs text-[#78716C]">of {totalQuestions}</span>
            <span className="text-xs font-medium text-[#4338CA] bg-[#EEF2FF] px-2.5 py-0.5 rounded-md border border-[#4338CA]/20">
              {question.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {renderMarkingBadge()}
            {isMarkedForReview && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#FFF7ED] text-[#F97316] border border-[#FED7AA]">
                <Bookmark className="w-3 h-3 fill-current" /> Marked for Review
              </span>
            )}
          </div>
        </div>

        {/* Question Statement */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-[#1C1917] leading-relaxed">
            {question.prompt}
          </h2>

          {/* External Question Diagram / Illustration */}
          {question.imageUrl && (
            <div className="my-3 p-3.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl flex flex-col items-center justify-center relative group">
              <div className="relative max-h-72 sm:max-h-84 w-full flex items-center justify-center overflow-hidden rounded-lg bg-white border border-[#E7E5E4] p-2">
                <img
                  src={question.imageUrl}
                  alt={question.imageCaption || `Question ${currentIndex + 1} Diagram`}
                  referrerPolicy="no-referrer"
                  className="max-h-72 sm:max-h-84 max-w-full object-contain cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
                  onClick={() => openImageModal(question.imageUrl!, `Question ${currentIndex + 1} Diagram`, question.imageCaption)}
                />
              </div>
              <div className="w-full flex items-center justify-between pt-2.5 border-t border-[#E7E5E4] mt-2 text-xs text-[#78716C]">
                <div className="flex items-center gap-1.5 font-medium">
                  <ImageIcon className="w-3.5 h-3.5 text-[#4338CA]" />
                  <span>{question.imageCaption || `Figure ${currentIndex + 1}: Question Diagram`}</span>
                </div>
                <button
                  type="button"
                  onClick={() => openImageModal(question.imageUrl!, `Question ${currentIndex + 1} Diagram`, question.imageCaption)}
                  className="inline-flex items-center gap-1 text-[#4338CA] hover:text-[#3730A3] font-semibold text-xs transition-colors cursor-pointer bg-white px-2.5 py-1 rounded-md border border-[#E7E5E4] shadow-2xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Diagram</span>
                </button>
              </div>
            </div>
          )}

          {question.type === 'multiple' && (
            <p className="text-xs text-[#4338CA] font-medium">
              * Multiple choices apply: Select every correct choice (+4 for full match, -2 for incorrect/partial).
            </p>
          )}
          {question.type === 'numerical' && (
            <p className="text-xs text-[#0891B2] font-medium">
              * Enter numeric answer: System verifies within configured tolerance window (0 negative marks).
            </p>
          )}
        </div>

        {/* Answer Selection Workspace */}
        <div className="pt-2">
          
          {/* 1. Single Choice Options */}
          {question.type === 'single' && (
            <div className="space-y-3">
              {(question as SingleChoiceQuestion).options.map((opt, optIdx) => {
                const isSelected = currentAnswer === optIdx;
                const optionLabel = String.fromCharCode(65 + optIdx); // A, B, C, D
                const parsed = parseOption(opt, (question as SingleChoiceQuestion).optionImages?.[optIdx]);

                return (
                  <button
                    key={optIdx}
                    id={`q${question.id}-opt-${optIdx}`}
                    onClick={() => handleSingleSelect(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#ECFEFF] border-[#0891B2] text-[#1C1917] shadow-xs ring-1 ring-[#0891B2]'
                        : 'bg-white border-[#E7E5E4] text-[#1C1917] hover:bg-[#FAFAF9] hover:border-[#78716C]'
                    }`}
                  >
                    <span 
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                        isSelected
                          ? 'bg-[#0891B2] text-white border-[#0891B2]'
                          : 'bg-[#FAFAF9] text-[#78716C] border-[#E7E5E4]'
                      }`}
                    >
                      {optionLabel}
                    </span>
                    
                    <div className="flex-1 space-y-2">
                      {parsed.text && (
                        <span className="text-sm font-medium leading-relaxed block pt-0.5">
                          {parsed.text}
                        </span>
                      )}
                      {parsed.imageUrl && (
                        <div className="relative group/optimg inline-block max-w-full">
                          <img
                            src={parsed.imageUrl}
                            alt={`Option ${optionLabel}`}
                            referrerPolicy="no-referrer"
                            className="max-h-40 sm:max-h-48 max-w-full object-contain rounded-lg border border-[#E7E5E4] bg-white p-1.5"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openImageModal(parsed.imageUrl!, `Option ${optionLabel} Diagram`, parsed.caption || parsed.text);
                            }}
                            title="Enlarge Option Image"
                            className="absolute top-2 right-2 p-1.5 rounded-md bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover/optimg:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. Multiple Choice Options */}
          {question.type === 'multiple' && (
            <div className="space-y-3">
              {(question as MultipleChoiceQuestion).options.map((opt, optIdx) => {
                const selectedArr = Array.isArray(currentAnswer) ? currentAnswer : [];
                const isSelected = selectedArr.includes(optIdx);
                const optionLabel = String.fromCharCode(65 + optIdx);
                const parsed = parseOption(opt, (question as MultipleChoiceQuestion).optionImages?.[optIdx]);

                return (
                  <button
                    key={optIdx}
                    id={`q${question.id}-multi-${optIdx}`}
                    onClick={() => handleMultipleToggle(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#EEF2FF] border-[#4338CA] text-[#1C1917] shadow-xs ring-1 ring-[#4338CA]'
                        : 'bg-white border-[#E7E5E4] text-[#1C1917] hover:bg-[#FAFAF9] hover:border-[#78716C]'
                    }`}
                  >
                    <div 
                      className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                        isSelected
                          ? 'bg-[#4338CA] text-white border-[#4338CA]'
                          : 'bg-[#FAFAF9] text-[#78716C] border-[#E7E5E4]'
                      }`}
                    >
                      {isSelected ? '✓' : optionLabel}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      {parsed.text && (
                        <span className="text-sm font-medium leading-relaxed block pt-0.5">
                          {parsed.text}
                        </span>
                      )}
                      {parsed.imageUrl && (
                        <div className="relative group/optimg inline-block max-w-full">
                          <img
                            src={parsed.imageUrl}
                            alt={`Option ${optionLabel}`}
                            referrerPolicy="no-referrer"
                            className="max-h-40 sm:max-h-48 max-w-full object-contain rounded-lg border border-[#E7E5E4] bg-white p-1.5"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openImageModal(parsed.imageUrl!, `Option ${optionLabel} Diagram`, parsed.caption || parsed.text);
                            }}
                            title="Enlarge Option Image"
                            className="absolute top-2 right-2 p-1.5 rounded-md bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover/optimg:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* 3. Numerical Value Input */}
          {question.type === 'numerical' && (
            <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-5 space-y-4">
              <label 
                htmlFor={`numerical-input-${question.id}`}
                className="block text-xs font-semibold uppercase tracking-wider text-[#78716C]"
              >
                Enter Numerical Answer
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    id={`numerical-input-${question.id}`}
                    type="number"
                    step="any"
                    value={
                      typeof currentAnswer === 'number' && !isNaN(currentAnswer)
                        ? currentAnswer
                        : ''
                    }
                    onChange={handleNumericalChange}
                    placeholder={(question as NumericalQuestion).placeholder || 'e.g. 10.5'}
                    className="w-full bg-white border-2 border-[#E7E5E4] focus:border-[#4338CA] rounded-xl px-4 py-3.5 text-lg font-mono text-[#1C1917] placeholder-[#78716C] outline-none transition-all shadow-xs"
                  />
                  {(question as NumericalQuestion).unit && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#1C1917] bg-[#FAFAF9] px-2.5 py-1 rounded-lg border border-[#E7E5E4]">
                      {(question as NumericalQuestion).unit}
                    </span>
                  )}
                </div>

                {currentAnswer !== null && (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-semibold text-[#16A34A]">
                    <span>Recorded:</span>
                    <span className="font-mono text-[#1C1917] font-bold">{String(currentAnswer)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#78716C] bg-white p-3 rounded-xl border border-[#E7E5E4]">
                <HelpCircle className="w-4 h-4 text-[#0891B2] shrink-0" />
                <span>
                  Tolerance margin is applied automatically during evaluation. Round to 2 decimal places where applicable.
                </span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Action Controls */}
      <div className="pt-6 border-t border-[#E7E5E4] mt-6 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Actions: Clear & Mark Review */}
        <div className="flex items-center gap-2.5">
          <button
            id="clear-response-btn"
            onClick={onClearResponse}
            disabled={currentAnswer === null}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
              currentAnswer !== null
                ? 'bg-white hover:bg-[#FFF1F2] text-[#78716C] hover:text-[#E11D48] border-[#E7E5E4] hover:border-[#FECDD3] cursor-pointer'
                : 'bg-[#FAFAF9] text-[#E7E5E4] border-[#E7E5E4] cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Answer</span>
          </button>

          <button
            id="mark-review-btn"
            onClick={onToggleReview}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              isMarkedForReview
                ? 'bg-[#F97316] text-white border-[#F97316] font-bold shadow-xs'
                : 'bg-white hover:bg-[#FFF7ED] text-[#F97316] border-[#FED7AA]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isMarkedForReview ? 'fill-current' : ''}`} />
            <span>{isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>
        </div>

        {/* Right Navigation Controls: Previous / Next */}
        <div className="flex items-center gap-2.5">
          <button
            id="prev-question-btn"
            onClick={onPrev}
            disabled={isFirst}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              !isFirst
                ? 'bg-white hover:bg-[#FAFAF9] text-[#1C1917] border-[#E7E5E4] cursor-pointer'
                : 'bg-[#FAFAF9] text-[#E7E5E4] border-[#E7E5E4] cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            id="next-question-btn"
            type="button"
            onClick={onNext}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
              isLast
                ? 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-emerald-600/20'
                : 'bg-[#4338CA] hover:bg-[#3730A3] text-white shadow-indigo-500/20'
            }`}
          >
            <span>{isLast ? 'Finish & Final Submit' : 'Save & Next'}</span>
            {isLast ? <Send className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* High-Resolution Diagram Preview Modal */}
      <ImageViewerModal
        isOpen={modalImage.isOpen}
        onClose={closeImageModal}
        imageUrl={modalImage.url}
        title={modalImage.title}
        caption={modalImage.caption}
      />
    </article>
  );
};
