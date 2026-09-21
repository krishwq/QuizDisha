import React, { useState } from 'react';

interface QuizDishaLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark';
  showTagline?: boolean;
  inverted?: boolean;
}

export const QuizDishaLogo: React.FC<QuizDishaLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showTagline = true,
  inverted = false,
}) => {
  const [imgSrc, setImgSrc] = useState('/wmremove-transformed.png');

  const sizeMap = {
    xs: 'h-8',
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-28',
  };

  const imageElement = (
    <img
      src={imgSrc}
      alt="QuizDisha Logo"
      className={`${sizeMap[size]} w-auto aspect-square object-contain rounded-xl shadow-xs shrink-0 ${
        inverted ? 'ring-1 ring-white/20 bg-white/5 p-0.5' : ''
      }`}
      onError={() => {
        if (imgSrc !== '/quizdisha-logo.svg') {
          setImgSrc('/quizdisha-logo.svg');
        }
      }}
    />
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {imageElement}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Uploaded logo image directly in place of SVG */}
      <div className="relative shrink-0 flex items-center justify-center">
        {imageElement}
      </div>

      {/* Typography with support for light and inverted dark backgrounds */}
      <div className="flex flex-col justify-center leading-tight">
        <span
          className={`font-serif font-black tracking-wide text-xl sm:text-2xl leading-none transition-colors ${
            inverted ? 'text-white' : 'text-[#1C1917]'
          }`}
        >
          QUIZDISHA
        </span>
        {showTagline && (
          <span
            className={`text-[9px] sm:text-[10px] font-extrabold tracking-[0.22em] uppercase mt-1 leading-none ${
              inverted ? 'text-[#FB7185]' : 'text-[#E11D48]'
            }`}
          >
            LEARN PLAY WIN
          </span>
        )}
      </div>
    </div>
  );
};
