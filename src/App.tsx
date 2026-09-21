import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, Monitor } from 'lucide-react';
import { SAMPLE_QUESTIONS } from './data/sampleQuestions';
import { Question, UserAnswerValue, QuizReportData, ProctorViolation, CandidateInfo, TestMetadata } from './types';
import { evaluateQuiz } from './utils/scoring';
import { generateQuizPdfReport } from './utils/generatePdfReport';
import { uploadToGoogleDriveViaGas } from './utils/gasDriveSync';
import { useProctoring } from './hooks/useProctoring';
import { EXAM_CATALOG } from './data/examCatalog';
import { isMobileOrTabletDevice } from './utils/deviceDetection';

// Components
import { LandingPage } from './components/LandingPage';
import { InstructionScreen } from './components/InstructionScreen';
import { FloatingHeader } from './components/FloatingHeader';
import { QuestionCard } from './components/QuestionCard';
import { QuestionPalette } from './components/QuestionPalette';
import { LiveProctorWidget } from './components/LiveProctorWidget';
import { WarningModal } from './components/WarningModal';
import { ConfirmSubmitModal } from './components/ConfirmSubmitModal';
import { ReportScreen } from './components/ReportScreen';
import { DesktopOnlyModal } from './components/DesktopOnlyModal';

export default function App() {
  const [phase, setPhase] = useState<'landing' | 'instructions' | 'active' | 'report'>('landing');
  const [selectedTest, setSelectedTest] = useState<TestMetadata | null>(null);
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [candidate, setCandidate] = useState<CandidateInfo>({
    name: '',
    email: '',
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswerValue>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState<boolean>(false);
  const [reportData, setReportData] = useState<QuizReportData | null>(null);

  // Active question set derived from selected test or fallback to default sample questions
  const questions: Question[] = selectedTest ? selectedTest.questions : SAMPLE_QUESTIONS;
  const totalAllocatedSeconds = selectedTest 
    ? selectedTest.durationMinutes * 60 
    : questions.length * 120; // 2 minutes each
  const [remainingSeconds, setRemainingSeconds] = useState<number>(totalAllocatedSeconds);

  // Submitting state and guard refs to strictly prevent double submission and double PDF upload
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const hasUploadedPdfRef = useRef(false);

  // Ref to track latest state for timer callbacks
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const remainingSecondsRef = useRef(remainingSeconds);
  remainingSecondsRef.current = remainingSeconds;

  // Auto-submit callback for when 3-strikes disqualification occurs
  const handleAutoSubmitDisqualification = useCallback(async (violationsList: ProctorViolation[]) => {
    await submitQuiz('disqualification', violationsList);
  }, []);

  // Handler when user selects a test paper from the Landing Page
  const handleSelectTest = (test: TestMetadata) => {
    setSelectedTest(test);
    const initialAnswers: Record<string, UserAnswerValue> = {};
    test.questions.forEach((q) => {
      initialAnswers[q.id] = null;
    });
    setAnswers(initialAnswers);
    setMarkedForReview({});
    setCurrentIndex(0);
    setRemainingSeconds(test.durationMinutes * 60);
    setPhase('instructions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to Landing Page / Test Directory
  const handleBackToLanding = () => {
    setPhase('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize anti-cheat proctoring hook (immediately deactivates when submission starts)
  const {
    stream,
    permissionError,
    setPermissionError,
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
  } = useProctoring({
    isQuizActive: phase === 'active' && !isSubmitting,
    onAutoSubmitDisqualification: handleAutoSubmitDisqualification,
  });

  // Start Exam Flow
  const handleStartExam = async () => {
    // 0. Strict Desktop Requirement Check
    if (isMobileOrTabletDevice()) {
      setIsDesktopModalOpen(true);
      return;
    }

    // 1. Verify Camera & Mic Stream
    let activeStream = stream;
    if (!activeStream) {
      activeStream = await requestMediaPermissions();
      if (!activeStream) {
        return; // permission denied or hardware missing
      }
    }

    // 2. Request Fullscreen Mode
    await enterFullscreen();

    // 3. Start MediaRecorder for A/V auditing
    startRecording(activeStream);

    // 4. Initialize question answers map
    const initialAnswers: Record<string, UserAnswerValue> = {};
    questions.forEach((q) => {
      initialAnswers[q.id] = null;
    });
    setAnswers(initialAnswers);
    setMarkedForReview({});
    setCurrentIndex(0);
    setRemainingSeconds(totalAllocatedSeconds);
    setPhase('active');
  };

  // Central Submission Logic
  const submitQuiz = useCallback(
    async (
      reason: 'manual' | 'timeout' | 'disqualification',
      overrideViolations?: ProctorViolation[]
    ) => {
      // Prevent double submissions: ensure submission runs at most once
      if (isSubmittingRef.current || phase === 'report') return;
      isSubmittingRef.current = true;
      setIsSubmitting(true);

      setIsConfirmSubmitOpen(false);

      // Stop A/V recording and automatically dispatch to Google Drive provision
      const { videoUrl, archiveInfo } = await stopRecordingAndArchiveToBackend(candidate);

      // Exit fullscreen if active
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen();
        } catch (e) {
          // ignore error if browser blocks programmatic exit
        }
      }

      // Calculate time spent
      const spent = totalAllocatedSeconds - remainingSecondsRef.current;
      const effectiveViolations = overrideViolations || violations;

      // Grade the assessment based on exact scoring rules (+4 / -1, +4 / -2, +4 / 0)
      const evaluation = evaluateQuiz(
        questions,
        answersRef.current,
        Math.max(1, spent),
        totalAllocatedSeconds,
        effectiveViolations,
        reason,
        videoUrl,
        recordedFileName,
        archiveInfo,
        candidate,
        selectedTest
          ? {
              id: selectedTest.id,
              standard: selectedTest.standard,
              subject: selectedTest.subject,
              setNumber: selectedTest.setNumber,
              title: selectedTest.title,
            }
          : undefined
      );

      // Generate PDF assessment report containing candidate info, all questions & answers, and score details
      let pdfBlobUrl: string | null = null;
      let pdfFileName = '';
      let generatedPdfBlob: Blob | null = null;

      try {
        const { blob: pdfBlob, fileName } = generateQuizPdfReport(evaluation);
        pdfFileName = fileName;
        pdfBlobUrl = URL.createObjectURL(pdfBlob);
        generatedPdfBlob = pdfBlob;
      } catch (err: any) {
        console.error('Error generating PDF report:', err);
      }

      evaluation.pdfBlobUrl = pdfBlobUrl;
      evaluation.pdfFileName = pdfFileName;

      // Immediately navigate to the Report Screen on the first click
      setReportData(evaluation);
      setPhase('report');
      setIsSubmitting(false);

      // Save PDF report directly via Google Apps Script Web App in the background (guaranteed exactly once)
      if (generatedPdfBlob && !hasUploadedPdfRef.current) {
        hasUploadedPdfRef.current = true;
        uploadToGoogleDriveViaGas(
          generatedPdfBlob,
          pdfFileName,
          'application/pdf',
          candidate.name,
          candidate.email
        )
          .then((syncRes) => {
            setReportData((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                pdfArchiveInfo: {
                  success: syncRes.success,
                  message: syncRes.message,
                  fileName: syncRes.fileName || pdfFileName,
                  fileSize: syncRes.fileSize || generatedPdfBlob!.size,
                  timestamp: syncRes.timestamp || new Date().toISOString(),
                  driveUrl: syncRes.driveUrl,
                  driveFileId: syncRes.driveFileId,
                  folderName: syncRes.folderName,
                  gasSynced: Boolean(syncRes.gasSynced),
                  gasConfigured: Boolean(syncRes.gasConfigured),
                  mode: syncRes.mode,
                },
              };
            });
          })
          .catch((err) => {
            console.warn('Background PDF archival notice:', err);
          });
      }
    },
    [phase, questions, stopRecordingAndArchiveToBackend, totalAllocatedSeconds, violations, recordedFileName, candidate, selectedTest]
  );

  // Active Countdown Timer Effect
  useEffect(() => {
    if (phase !== 'active' || isSubmitting) return;

    const timerInterval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          // Auto-submit immediately upon timer expiration (00:00)
          setTimeout(() => {
            submitQuiz('timeout');
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [phase, isSubmitting, submitQuiz]);

  // Answer modification handlers
  const handleAnswerChange = (newAnswer: UserAnswerValue) => {
    const currentQ = questions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: newAnswer,
    }));
  };

  const handleClearResponse = () => {
    const currentQ = questions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: null,
    }));
  };

  const handleToggleReview = () => {
    const currentQ = questions[currentIndex];
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Last question reached: open confirm submit modal
      setIsConfirmSubmitOpen(true);
    }
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  // Count answered questions
  const answeredCount = Object.values(answers).filter(
    (ans) => ans !== null && ans !== undefined && (Array.isArray(ans) ? ans.length > 0 : true)
  ).length;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] flex flex-col font-sans selection:bg-[#4338CA] selection:text-white">
      
      {/* 0. Landing Page: Full Examination Directory & Give Exam Portal */}
      {phase === 'landing' && (
        <LandingPage onSelectTest={handleSelectTest} />
      )}

      {/* 1. Instruction Screen (Pre-Quiz) with Candidate Registration */}
      {phase === 'instructions' && (
        <InstructionScreen
          questions={questions}
          candidate={candidate}
          onCandidateChange={setCandidate}
          onStartExam={handleStartExam}
          permissionError={permissionError}
          requestMediaPermissions={requestMediaPermissions}
          stream={stream}
          testMetadata={selectedTest || undefined}
          onBackToLanding={handleBackToLanding}
        />
      )}

      {/* 2. Active Proctored Quiz Screen (Desktop Only Guard) */}
      {phase === 'active' && isMobileOrTabletDevice() && (
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-6 text-center">
          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-8 max-w-md w-full shadow-lg space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA] flex items-center justify-center mx-auto">
              <Monitor className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1C1917]">Desktop Required for Test Window</h2>
            <p className="text-xs text-[#78716C] leading-relaxed">
              The live assessment window cannot run on a mobile or tablet device. Please open this assessment on a desktop computer or laptop to proceed.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setPhase('landing')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Return to Test Directory
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === 'active' && !isMobileOrTabletDevice() && currentQuestion && (
        <div className="flex-1 flex flex-col">
          
          {/* Floating Sticky Countdown Header */}
          <FloatingHeader
            testTitle={selectedTest?.title}
            remainingSeconds={remainingSeconds}
            totalSeconds={totalAllocatedSeconds}
            strikeCount={strikeCount}
            answeredCount={answeredCount}
            totalQuestions={questions.length}
            isRecording={isRecording}
            onSubmitClick={() => setIsConfirmSubmitOpen(true)}
          />

          {/* Main Assessment Layout: Two-Column Responsive Workspace */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Interactive Question Card (8 cols) */}
            <div className="lg:col-span-8 w-full">
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                currentAnswer={answers[currentQuestion.id] ?? null}
                isMarkedForReview={!!markedForReview[currentQuestion.id]}
                onAnswerChange={handleAnswerChange}
                onToggleReview={handleToggleReview}
                onClearResponse={handleClearResponse}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </div>

            {/* Right Column: Question Navigation Grid Palette (4 cols) */}
            <div className="lg:col-span-4 w-full">
              <QuestionPalette
                questions={questions}
                currentIndex={currentIndex}
                answers={answers}
                markedForReview={markedForReview}
                onSelectQuestion={handleSelectQuestion}
              />
            </div>

          </main>

          {/* Floating Picture-in-Picture Webcam Widget */}
          <LiveProctorWidget
            stream={stream}
            isRecording={isRecording}
            strikeCount={strikeCount}
          />

          {/* Anti-Cheat Severe Warning Modal */}
          <WarningModal
            warning={currentWarning}
            totalStrikes={strikeCount}
            onAcknowledge={acknowledgeWarning}
          />

          {/* Final Submission Confirmation Dialog */}
          <ConfirmSubmitModal
            isOpen={isConfirmSubmitOpen}
            isSubmitting={isSubmitting}
            questions={questions}
            answers={answers}
            markedForReview={markedForReview}
            onConfirm={() => submitQuiz('manual')}
            onCancel={() => setIsConfirmSubmitOpen(false)}
          />

          {/* Instant Submitting Feedback Overlay */}
          {isSubmitting && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white space-y-4 animate-in fade-in">
              <Loader2 className="w-10 h-10 animate-spin text-[#16A34A]" />
              <h2 className="text-xl font-bold">Submitting Assessment...</h2>
              <p className="text-sm text-[#E7E5E4]">Calculating scores and preparing performance report...</p>
            </div>
          )}

        </div>
      )}

      {/* 3. Post-Test Performance Report Screen */}
      {phase === 'report' && reportData && (
        <ReportScreen
          report={reportData}
        />
      )}

      {/* Desktop Only Restriction Modal */}
      <DesktopOnlyModal
        isOpen={isDesktopModalOpen}
        onClose={() => setIsDesktopModalOpen(false)}
        selectedTest={selectedTest}
      />

    </div>
  );
}
