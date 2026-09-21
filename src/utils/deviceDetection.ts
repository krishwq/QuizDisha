import { useState, useEffect } from 'react';

/**
 * Checks whether the current user is operating on a mobile or tablet device.
 * Examination mode requires a full desktop/laptop environment for:
 * 1. Continuous A/V surveillance stream & hardware access
 * 2. Unrestricted full-screen lock and tab monitoring
 * 3. Physical keyboard for numerical answers
 * 4. Desktop display resolution for complex scientific diagrams
 */
export function isMobileOrTabletDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';

  // 1. Check mobile user agent strings
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  if (mobileRegex.test(ua)) {
    return true;
  }

  // 2. iPad on iOS 13+ (identifies as Macintosh Intel Mac OS X with multi-touch support)
  const isIPadOS = /Macintosh/i.test(ua) && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;
  if (isIPadOS) {
    return true;
  }

  // 3. Screen width & touch criteria: mobile and small tablet screens (<1024px) with touch support
  const hasTouch = (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0) || 'ontouchstart' in window;
  if (window.innerWidth < 1024 && hasTouch) {
    return true;
  }

  // 4. Mobile viewport fallback (< 768px)
  if (window.innerWidth < 768) {
    return true;
  }

  return false;
}

/**
 * Hook to reactively track whether current viewport/device is mobile/tablet.
 */
export function useIsMobileDevice(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return isMobileOrTabletDevice();
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileOrTabletDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
