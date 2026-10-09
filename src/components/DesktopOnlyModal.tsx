import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  X, 
  Copy, 
  Check, 
  Keyboard,
  Camera,
  Layers,
  ArrowRight,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { TestMetadata } from '../types';

interface DesktopOnlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTest?: TestMetadata | null;
  onPreviewInstructions?: () => void;
}

export const DesktopOnlyModal: React.FC<DesktopOnlyModalProps> = ({
  isOpen,
  onClose,
  selectedTest,
  onPreviewInstructions,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.warn('Failed to copy link:', err);
    }
  };

  return (
    <div 
      id="desktop-only-warning-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="desktop-warning-title"
    >
      <div className="bg-white border border-[#d6e4f0] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header Bar */}
        <div className="bg-gradient-to-r from-[#00072d] via-[#001c55] to-[#0a2472] p-5 text-white flex items-start justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shrink-0">
              <Monitor className="w-6 h-6 text-[#a6e1fa]" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[#a6e1fa] text-[11px] font-bold uppercase tracking-wider mb-1">
                <AlertTriangle className="w-3 h-3 text-[#f59e0b]" />
                Desktop Required
              </span>
              <h3 id="desktop-warning-title" className="text-lg sm:text-xl font-extrabold leading-tight">
                Test Window Opens on Desktop Only
              </h3>
            </div>
          </div>

          <button
            id="close-desktop-warning-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#00072d]">
          
          {/* Target Test Details Card if available */}
          {selectedTest && (
            <div className="bg-[#f8fbfe] border border-[#d6e4f0] rounded-xl p-3.5 flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0e6ba8]">
                  Selected Paper
                </span>
                <p className="text-sm font-bold text-[#00072d] truncate">
                  {selectedTest.title}
                </p>
                <p className="text-xs text-[#0a2472]">
                  {selectedTest.standard} • {selectedTest.subject} (Set {selectedTest.setNumber})
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="block text-xs font-extrabold text-[#00072d]">
                  {selectedTest.durationMinutes} Min
                </span>
                <span className="text-[11px] text-[#536b82]">
                  {selectedTest.questions.length} Items
                </span>
              </div>
            </div>
          )}

          {/* Primary Alert Callout */}
          <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-[#9a3412]">
            <Smartphone className="w-5 h-5 text-[#ea580c] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-[#c2410c]">
                Mobile Examination Not Permitted
              </p>
              <p className="text-[#9a3412] leading-relaxed text-xs">
                You can browse the website, view test catalogs, and check syllabi from any smartphone or tablet. However, the <strong>live assessment window strictly requires a desktop or laptop computer</strong>.
              </p>
            </div>
          </div>

          {/* Requirements Breakdown */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#536b82]">
              Why the Test Window Requires a Desktop/Laptop:
            </h4>

            <div className="grid grid-cols-1 gap-2.5 text-xs">
              
              <div className="p-3 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#a6e1fa]/30 text-[#0a2472] flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#00072d]">Full-Screen Anti-Cheat Lockdown</p>
                  <p className="text-[#536b82] mt-0.5 leading-relaxed">
                    Tracks window focus, prevents background app switching, and enforces single-window examination rules.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] text-[#16a34a] flex items-center justify-center shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#00072d]">Live Webcam &amp; Microphone Proctoring</p>
                  <p className="text-[#536b82] mt-0.5 leading-relaxed">
                    Surveillance recording and noise anomaly detection require stable desktop browser media streaming.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#fff7ed] text-[#f97316] flex items-center justify-center shrink-0">
                  <Keyboard className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#00072d]">Physical Keyboard &amp; Large Display</p>
                  <p className="text-[#536b82] mt-0.5 leading-relaxed">
                    Scientific formulas, circuit diagrams, and numerical inputs are built for desktop resolution.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Share/Copy link to open on desktop */}
          <div className="bg-[#f8fbfe] border border-[#d6e4f0] rounded-xl p-3.5 space-y-2">
            <p className="text-xs font-semibold text-[#00072d]">
              Copy link to open on your PC or Laptop:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="w-full text-xs font-mono text-[#536b82] bg-white border border-[#d6e4f0] rounded-lg px-3 py-2 focus:outline-none select-all"
              />
              <button
                id="copy-exam-link-btn"
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  copied
                    ? 'bg-[#16a34a] text-white'
                    : 'bg-[#0a2472] hover:bg-[#001c55] text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            {copied && (
              <p className="text-[11px] text-[#16a34a] font-semibold">
                ✓ Link copied to clipboard. Send it via WhatsApp or Email to open on your desktop.
              </p>
            )}
          </div>

        </div>

        {/* Modal Footer Buttons */}
        <div className="bg-[#f8fbfe] border-t border-[#d6e4f0] p-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {onPreviewInstructions ? (
            <button
              id="preview-instructions-btn"
              onClick={() => {
                onClose();
                onPreviewInstructions();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0a2472] hover:bg-[#a6e1fa]/20 border border-[#d6e4f0] transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Guidelines on Mobile</span>
            </button>
          ) : (
            <div className="text-[11px] text-[#536b82]">
              Switch to a laptop or PC to take the exam.
            </div>
          )}

          <button
            id="modal-browse-mobile-btn"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#00072d] bg-white border border-[#d6e4f0] hover:bg-[#edf5fa] transition-colors cursor-pointer"
          >
            Got It, Continue Browsing
          </button>
        </div>

      </div>
    </div>
  );
};
