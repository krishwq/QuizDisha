import { useState, useEffect, useRef, useCallback } from 'react';
import { ProctorViolation } from '../types';
import { uploadToGoogleDriveViaGas } from '../utils/gasDriveSync';
import { getAssessmentFileNames } from '../utils/fileNaming';

interface UseProctoringOptions {
  isQuizActive: boolean;
  onAutoSubmitDisqualification: (violations: ProctorViolation[]) => void;
}

export function useProctoring({
  isQuizActive,
  onAutoSubmitDisqualification,
}: UseProctoringOptions) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [violations, setViolations] = useState<ProctorViolation[]>([]);
  const [currentWarning, setCurrentWarning] = useState<ProctorViolation | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [recordedFileName, setRecordedFileName] = useState<string>('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const activeStreamRef = useRef<MediaStream | null>(null);
  const violationsRef = useRef<ProctorViolation[]>([]);
  violationsRef.current = violations;

  // Track strikes (up to 3)
  const strikeCount = violations.filter(
    (v) => v.type === 'tab_switch' || v.type === 'fullscreen_exit' || v.type === 'window_blur'
  ).length;

  /**
   * Request webcam and microphone media stream
   */
  const requestMediaPermissions = useCallback(async (): Promise<MediaStream | null> => {
    try {
      setPermissionError(null);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media Devices API is not supported in this browser.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: true,
      });

      setStream(mediaStream);
      activeStreamRef.current = mediaStream;
      return mediaStream;
    } catch (err: any) {
      console.error('Camera/Microphone permission error:', err);
      let errorMsg = 'Failed to obtain camera and microphone access.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg = 'Camera and microphone access was declined. You must grant access to proceed with this proctored assessment.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMsg = 'No active webcam or microphone hardware detected on this machine.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMsg = 'Your camera or microphone is already in use by another application.';
      }
      setPermissionError(errorMsg);
      return null;
    }
  }, []);

  /**
   * Request native Fullscreen mode
   */
  const enterFullscreen = useCallback(async (): Promise<boolean> => {
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if ((docEl as any).webkitRequestFullscreen) {
        await (docEl as any).webkitRequestFullscreen();
      } else if ((docEl as any).msRequestFullscreen) {
        await (docEl as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
      return true;
    } catch (err) {
      console.warn('Fullscreen request blocked or unsupported:', err);
      // In embedded environments, document might fail fullscreen; we record current state
      setIsFullscreen(!!document.fullscreenElement);
      return false;
    }
  }, []);

  /**
   * Start A/V recording via MediaRecorder
   */
  const startRecording = useCallback((activeStream: MediaStream) => {
    try {
      recordedChunksRef.current = [];
      let mimeType = 'video/webm;codecs=vp8,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }

      const recorder = new MediaRecorder(activeStream, {
        mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined,
      });

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstart = () => {
        setIsRecording(true);
      };

      recorder.start(1000); // 1-second chunks for stability
      mediaRecorderRef.current = recorder;
    } catch (err) {
      console.error('Failed to initiate MediaRecorder:', err);
    }
  }, []);

  /**
   * Stop recording, assemble Blob, dispatch to Google Drive provision via Google Apps Script
   * (Candidate download provision is strictly disabled to maintain assessment integrity)
   */
  const stopRecordingAndArchiveToBackend = useCallback(async (candidateInfo?: { name?: string; email?: string }): Promise<{
    videoUrl: string | null;
    archiveInfo?: {
      success: boolean;
      message: string;
      fileName: string;
      fileSize?: number;
      timestamp?: string;
      driveUrl?: string;
      driveFileId?: string;
      gasSynced?: boolean;
      gasConfigured?: boolean;
      mode?: string;
    };
  }> => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === 'inactive') {
        // Fallback if recorder never started
        if (activeStreamRef.current) {
          activeStreamRef.current.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false);
        resolve({ videoUrl: null });
        return;
      }

      recorder.onstop = () => {
        setIsRecording(false);
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const blobUrl = URL.createObjectURL(blob);
        const { videoFileName: fileName } = getAssessmentFileNames(candidateInfo?.name);

        setRecordedBlobUrl(blobUrl);
        setRecordedFileName(fileName);

        // Clean up media stream tracks immediately to release camera
        if (activeStreamRef.current) {
          activeStreamRef.current.getTracks().forEach((track) => track.stop());
        }

        const archiveResult = {
          success: true,
          message: 'Surveillance recording prepared for Google Drive archival.',
          fileName,
          fileSize: blob.size,
          timestamp: new Date().toISOString(),
          driveUrl: undefined as string | undefined,
          driveFileId: undefined as string | undefined,
          folderName: undefined as string | undefined,
          gasSynced: false,
          gasConfigured: false,
          mode: 'google_apps_script',
        };

        // Resolve immediately so assessment submission never hangs or delays the user
        resolve({ videoUrl: blobUrl, archiveInfo: archiveResult });

        // Trigger Google Drive archival in background without blocking the UI
        uploadToGoogleDriveViaGas(
          blob,
          fileName,
          'video/webm',
          candidateInfo?.name,
          candidateInfo?.email
        ).catch((uploadErr) => {
          console.warn('Video Google Drive provision notice:', uploadErr);
        });
      };

      try {
        recorder.stop();
      } catch (err) {
        console.error('Error stopping recorder:', err);
        resolve({ videoUrl: null });
      }
    });
  }, []);

  /**
   * Log an anti-cheat violation event
   */
  const logViolation = useCallback(
    (
      type: ProctorViolation['type'],
      description: string,
      severity: ProctorViolation['severity'] = 'warning'
    ) => {
      if (!isQuizActive) return;

      const newViolation: ProctorViolation = {
        id: `v-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toLocaleTimeString(),
        type,
        description,
        severity,
      };

      setViolations((prev) => {
        const updated = [...prev, newViolation];
        const newStrikes = updated.filter(
          (v) =>
            v.type === 'tab_switch' ||
            v.type === 'fullscreen_exit' ||
            v.type === 'window_blur'
        ).length;

        // Severe warning modal to user
        setCurrentWarning(newViolation);

        // Check if strike count reached 3 -> Disqualification
        if (newStrikes >= 3) {
          setTimeout(() => {
            onAutoSubmitDisqualification(updated);
          }, 800);
        }

        return updated;
      });
    },
    [isQuizActive, onAutoSubmitDisqualification]
  );

  /**
   * Dismiss the warning modal and attempt to restore fullscreen
   */
  const acknowledgeWarning = useCallback(() => {
    setCurrentWarning(null);
    if (!document.fullscreenElement) {
      enterFullscreen();
    }
  }, [enterFullscreen]);

  // Handle Fullscreen change detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement
      );
      setIsFullscreen(active);

      if (isQuizActive && !active) {
        logViolation(
          'fullscreen_exit',
          'Candidate exited Full-Screen mode during the active assessment.',
          'critical'
        );
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isQuizActive, logViolation]);

  // Handle Page Visibility API & Window Blur (Tab Switching)
  useEffect(() => {
    if (!isQuizActive) return;

    let blurTimeout: NodeJS.Timeout | null = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        logViolation(
          'tab_switch',
          'Candidate switched tabs or minimized the active exam window (Page Visibility API).',
          'critical'
        );
      }
    };

    const handleWindowBlur = () => {
      // Debounce window blur to avoid false positives from browser alerts
      blurTimeout = setTimeout(() => {
        if (document.hidden) return; // already caught by visibilitychange
        logViolation(
          'window_blur',
          'Application focus lost. Candidate may have clicked outside the active test environment.',
          'warning'
        );
      }, 300);
    };

    const handleWindowFocus = () => {
      if (blurTimeout) {
        clearTimeout(blurTimeout);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      if (blurTimeout) clearTimeout(blurTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isQuizActive, logViolation]);

  // Browser Lockdown: Context Menu, Copy, Paste, Drag & Drop, Keyboard Shortcuts
  useEffect(() => {
    if (!isQuizActive) {
      document.body.classList.remove('proctor-lockdown');
      return;
    }

    document.body.classList.add('proctor-lockdown');

    // Disable Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      logViolation('context_menu', 'Right-click context menu attempt prevented.', 'warning');
      return false;
    };

    // Disable Copy, Cut, Paste
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      logViolation('copy_paste', 'Clipboard copy action prohibited.', 'warning');
    };
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      logViolation('copy_paste', 'Clipboard cut action prohibited.', 'warning');
    };
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      logViolation('copy_paste', 'Clipboard paste action prohibited.', 'warning');
    };

    // Disable Drag and Drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable Inspection & System Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 developer tools
      if (e.key === 'F12') {
        e.preventDefault();
        logViolation('key_violation', 'Developer Tools shortcut (F12) blocked.', 'critical');
        return;
      }

      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (Inspect elements)
      if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
        e.preventDefault();
        logViolation('key_violation', 'Inspection shortcut combination blocked.', 'critical');
        return;
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        logViolation('key_violation', 'View Source command (Ctrl+U) blocked.', 'warning');
        return;
      }

      // Ctrl+P (Print)
      if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        logViolation('key_violation', 'Print screen attempt (Ctrl+P) blocked.', 'warning');
        return;
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('cut', handleCut);
    window.addEventListener('paste', handlePaste);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('drop', handleDrop);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('proctor-lockdown');
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('cut', handleCut);
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isQuizActive, logViolation]);

  return {
    stream,
    permissionError,
    setPermissionError,
    isFullscreen,
    violations,
    strikeCount,
    currentWarning,
    isRecording,
    recordedBlobUrl,
    recordedFileName,
    requestMediaPermissions,
    enterFullscreen,
    startRecording,
    stopRecordingAndArchiveToBackend,
    acknowledgeWarning,
    logViolation,
  };
}
