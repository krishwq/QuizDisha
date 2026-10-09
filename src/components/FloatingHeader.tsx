import React from 'react';
import { Clock, ShieldAlert, Video, Send } from 'lucide-react';
import { formatTime } from '../utils/scoring';
import { QuizDishaLogo } from './QuizDishaLogo';

interface FloatingHeaderProps {
  testTitle?: string;
  remainingSeconds: number;
  totalSeconds: number;
  strikeCount: number;
  answeredCount: number;
  totalQuestions: number;
  isRecording: boolean;
  onSubmitClick: () => void;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  testTitle,
  remainingSeconds,
  totalSeconds,
  strikeCount,
  answeredCount,
  totalQuestions,
  isRecording,
  onSubmitClick,
}) => {
  const isUrgent = remainingSeconds <= 120; // under 2 minutes
  const isWarning = remainingSeconds <= 300 && !isUrgent; // under 5 minutes

  const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <header 
      id="floating-proctor-header"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#d6e4f0] shadow-sm transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        
        {/* Main Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Exam Brand & Recording Badge */}
          <div className="flex items-center gap-3">
            <QuizDishaLogo size="xs" showTagline={false} />

            {/* Test Title Badge */}
            {testTitle && (
              <div className="hidden md:flex items-center px-2.5 py-1 rounded-lg bg-[#f8fbfe] border border-[#d6e4f0] text-xs font-bold text-[#00072d]">
                {testTitle}
              </div>
            )}

            {/* Live Recording Badge */}
            {isRecording && (
              <div 
                id="rec-status-badge"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#FECDD3] text-[#E11D48] text-xs font-mono font-bold shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-rec-pulse"></span>
                <span>REC LIVE</span>
              </div>
            )}

            {/* Strikes Warning Badge */}
            <div 
              id="header-strikes-badge"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                strikeCount > 0
                  ? 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3] animate-pulse'
                  : 'bg-[#f8fbfe] text-[#536b82] border-[#d6e4f0]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{strikeCount} / 3 Strikes</span>
            </div>
          </div>

          {/* Center: Prominent Floating Countdown Timer */}
          <div className="flex items-center justify-center order-first sm:order-none w-full sm:w-auto my-1 sm:my-0">
            <div 
              id="countdown-timer-display"
              className={`flex items-center gap-2.5 px-4 py-1.5 rounded-xl border font-mono font-extrabold text-lg sm:text-xl tracking-wider shadow-xs transition-all ${
                isUrgent
                  ? 'bg-[#FFF1F2] text-[#E11D48] border-[#E11D48] shadow-sm animate-pulse'
                  : isWarning
                  ? 'bg-[#FFF7ED] text-[#F97316] border-[#FED7AA] shadow-sm'
                  : 'bg-[#f8fbfe] text-[#00072d] border-[#d6e4f0] shadow-xs'
              }`}
            >
              <Clock className={`w-5 h-5 ${isUrgent ? 'animate-bounce text-[#E11D48]' : 'text-[#0a2472]'}`} />
              <span>{formatTime(remainingSeconds)}</span>
              <span className="text-[10px] text-[#536b82] font-sans font-medium uppercase tracking-wider">
                Time Left
              </span>
            </div>
          </div>

          {/* Right: Answered Progress & Submit Button */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end text-xs">
              <span className="text-[#536b82]">
                Answered: <strong className="text-[#00072d]">{answeredCount} / {totalQuestions}</strong>
              </span>
              <span className="text-[#16A34A] font-semibold">{completionPercentage}% Completed</span>
            </div>

            <button
              id="header-submit-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSubmitClick();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-[#16A34A] hover:bg-[#15803d] text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Finish &amp; Submit</span>
            </button>
          </div>

        </div>

        {/* Global Progress Bar pinned under header */}
        <div className="w-full bg-[#d6e4f0] h-1.5 rounded-full overflow-hidden mt-2 border border-[#d6e4f0]">
          <div 
            id="quiz-completion-progress-bar"
            className="h-full bg-gradient-to-r from-[#0a2472] via-[#0e6ba8] to-[#16A34A] transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

      </div>
    </header>
  );
};
