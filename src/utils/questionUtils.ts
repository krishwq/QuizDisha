import { QuestionOption } from '../types';

export function isImageUrl(value?: string | null): boolean {
  if (!value || typeof value !== 'string') return false;
  const str = value.trim();
  if (str.startsWith('data:image/')) return true;
  if (/^https?:\/\/.+\.(png|jpe?g|gif|webp|svg|bmp|ico|avif)(\?.*)?$/i.test(str)) return true;
  if (/^https?:\/\/(images\.unsplash\.com|upload\.wikimedia\.org|i\.imgur\.com|imgur\.com|res\.cloudinary\.com|placehold\.co|via\.placeholder\.com|fastly\.picsum\.photos|picsum\.photos)\//i.test(str)) return true;
  if (/^https?:\/\/[^\s]+$/i.test(str)) {
    if (
      /\.(png|jpe?g|gif|webp|svg|avif)/i.test(str) ||
      str.includes('/image') ||
      str.includes('/img') ||
      str.includes('format=') ||
      str.includes('photo-') ||
      str.includes('media') ||
      str.includes('diagram') ||
      str.includes('figure')
    ) {
      return true;
    }
    // Any direct URL passed as an option in multiple choice should be treated as an image
    return true;
  }
  return false;
}

export interface ParsedOption {
  text: string;
  imageUrl?: string;
  caption?: string;
  isImage: boolean;
}

export function parseOption(
  opt: QuestionOption | undefined | null,
  optionImageFallback?: string
): ParsedOption {
  if (!opt && !optionImageFallback) {
    return { text: '', isImage: false };
  }

  // If option is an object
  if (typeof opt === 'object' && opt !== null) {
    const imageUrl = opt.imageUrl || optionImageFallback;
    const text = opt.text || '';
    const caption = opt.caption;
    return {
      text,
      imageUrl,
      caption,
      isImage: Boolean(imageUrl),
    };
  }

  // If option is a string
  const str = String(opt || '').trim();

  // If there's an explicit image fallback from optionImages array
  if (optionImageFallback) {
    return {
      text: str,
      imageUrl: optionImageFallback,
      isImage: true,
    };
  }

  // Check for markdown image syntax: ![caption](url)
  const markdownImgMatch = str.match(/^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
  if (markdownImgMatch) {
    return {
      text: markdownImgMatch[1],
      imageUrl: markdownImgMatch[2],
      caption: markdownImgMatch[1],
      isImage: true,
    };
  }

  // Check if string is an image URL
  if (isImageUrl(str)) {
    return {
      text: '',
      imageUrl: str,
      isImage: true,
    };
  }

  // Regular text option
  return {
    text: str,
    imageUrl: undefined,
    isImage: false,
  };
}

export function getOptionDisplayText(
  opt: QuestionOption | undefined | null,
  index: number = 0
): string {
  const parsed = parseOption(opt);
  if (parsed.text) {
    return parsed.imageUrl ? `${parsed.text} [Diagram / Image]` : parsed.text;
  }
  if (parsed.imageUrl) {
    return `[Diagram Option ${String.fromCharCode(65 + index)}]`;
  }
  return `Option ${String.fromCharCode(65 + index)}`;
}
