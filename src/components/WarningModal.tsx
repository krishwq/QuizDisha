import React from 'react';
import { AlertOctagon, Maximize2, ShieldAlert } from 'lucide-react';
import { ProctorViolation } from '../types';

interface WarningModalProps {
  warning: ProctorViolation | null;
  totalStrikes: number;
  onAcknowledge: () => void;
}

export const WarningModal: React.FC<WarningModalProps> = ({
  warning,
  totalStrikes,
  onAcknowledge,
}) => {
  if (!warning) return null;

  const isFinalStrike = totalStrikes >= 3;
  const remainingStrikes = Math.max(0, 3 - totalStrikes);

  return (
    <div 
      id="anti-cheat-warning-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in select-none"
    >
      <div className="bg-white border-2 border-[#E11D48] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 text-center">
        
        {/* Warning Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-center mx-auto text-[#E11D48] shadow-inner animate-bounce">
          <AlertOctagon className="w-9 h-9" />
        </div>

        {/* Title & Strike Tag */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3]">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>
              {isFinalStrike ? 'CRITICAL DISQUALIFICATION' : `SECURITY WARNING #${totalStrikes}`}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#00072d]">
            {isFinalStrike
              ? 'Assessment Terminated: 3 Strikes Reached'
              : 'Proctoring Security Alert'}
          </h3>
        </div>

        {/* Violation Description */}
        <div className="bg-[#f8fbfe] border border-[#d6e4f0] rounded-xl p-4 text-left space-y-2">
          <div className="flex items-center justify-between text-xs text-[#536b82] border-b border-[#d6e4f0] pb-2">
            <span>Detected Violation:</span>
            <span className="font-mono text-[#0e6ba8] font-semibold">{warning.timestamp}</span>
          </div>
          <p className="text-sm text-[#00072d] font-medium leading-relaxed">
            {warning.description}
          </p>
        </div>

        {/* Strikes Warning Explanations */}
        {!isFinalStrike ? (
          <div className="p-3 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-xs text-[#E11D48] space-y-1 text-left">
            <p className="font-bold">
              ⚠️ Strict Anti-Cheat Rule: You have {remainingStrikes} strike{remainingStrikes === 1 ? '' : 's'} remaining.
            </p>
            <p className="text-[#78716C]">
              Switching tabs, minimizing the browser, or exiting full-screen mode will immediately terminate your assessment on the 3rd strike and automatically submit your responses.
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-[#FFF1F2] border border-[#E11D48] text-xs text-[#E11D48] font-semibold text-center">
            You have exceeded the maximum permissible infractions (3 strikes). All current responses are being locked and auto-submitted.
          </div>
        )}

        {/* Action Button */}
        {!isFinalStrike ? (
          <button
            id="acknowledge-warning-btn"
            onClick={onAcknowledge}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#E11D48] hover:bg-[#be123c] text-white shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
            <span>I Understand &amp; Return to Full-Screen</span>
          </button>
        ) : (
          <div className="text-xs text-[#78716C] italic animate-pulse">
            Processing assessment auto-submission...
          </div>
        )}

      </div>
    </div>
  );
};
