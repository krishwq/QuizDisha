import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from 'lucide-react';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
  caption?: string;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title = 'Diagram / Image Preview',
  caption,
}) => {
  const [scale, setScale] = React.useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      setScale(1);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setScale(1);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#E7E5E4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E7E5E4] bg-[#FAFAF9]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#1C1917]">{title}</span>
            <span className="text-xs text-[#78716C] bg-[#E7E5E4] px-2 py-0.5 rounded font-mono">
              {Math.round(scale * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              title="Zoom Out"
              className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#E7E5E4] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomIn}
              disabled={scale >= 3}
              title="Zoom In"
              className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#E7E5E4] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom"
              className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#E7E5E4] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Original in New Tab"
              className="p-1.5 rounded-lg text-[#78716C] hover:text-[#4338CA] hover:bg-[#EEF2FF] transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              title="Close Preview"
              className="p-1.5 rounded-lg text-[#78716C] hover:text-[#E11D48] hover:bg-[#FFF1F2] transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Body */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#1C1917]/5 min-h-[300px]">
          <div 
            className="transition-transform duration-150 ease-out max-w-full flex items-center justify-center"
            style={{ transform: `scale(${scale})` }}
          >
            <img
              src={imageUrl}
              alt={caption || title}
              referrerPolicy="no-referrer"
              className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-sm border border-[#E7E5E4] bg-white"
            />
          </div>
        </div>

        {/* Modal Caption Footer (if present) */}
        {caption && (
          <div className="px-5 py-3 border-t border-[#E7E5E4] bg-white text-xs text-[#78716C] font-medium text-center">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
