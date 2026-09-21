import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Video, 
  Mic, 
  Maximize2, 
  AlertTriangle, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Eye, 
  FileText,
  RefreshCw,
  CameraOff,
  User,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { Question, CandidateInfo, TestMetadata } from '../types';
import { QuizDishaLogo } from './QuizDishaLogo';

interface InstructionScreenProps {
  questions: Question[];
  candidate: CandidateInfo;
  onCandidateChange: (info: CandidateInfo) => void;
  onStartExam: () => void;
  permissionError: string | null;
  requestMediaPermissions: () => Promise<MediaStream | null>;
  stream: MediaStream | null;
  testMetadata?: TestMetadata;
  onBackToLanding?: () => void;
}

export const InstructionScreen: React.FC<InstructionScreenProps> = ({
  questions,
  candidate,
  onCandidateChange,
  onStartExam,
  permissionError,
  requestMediaPermissions,
  stream,
  testMetadata,
  onBackToLanding,
}) => {
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);
  const [isVerifyingHardware, setIsVerifyingHardware] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const totalMinutes = questions.length * 2;

  // Bind video element to media stream
  useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  // Audio visualizer meter for mic test
  useEffect(() => {
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) return;

    let animationFrameId: number;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateMeter = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animationFrameId = requestAnimationFrame(updateMeter);
      };
      updateMeter();
    } catch (e) {
      console.warn('Audio metering init error:', e);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stream]);

  const handleTestHardware = async () => {
    setIsVerifyingHardware(true);
    await requestMediaPermissions();
    setIsVerifyingHardware(false);
  };

  const isNameValid = candidate.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email.trim());
  const isReadyToStart = Boolean(stream && hasAgreedTerms && isNameValid && isEmailValid);

  return (
    <div id="instruction-screen" className="min-h-screen bg-[#FAFAF9] text-[#1C1917] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Back to Test Directory button if navigation callback exists */}
        {onBackToLanding && (
          <div>
            <button
              id="back-to-landing-btn"
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#78716C] hover:text-[#4338CA] px-3.5 py-2 rounded-xl bg-white border border-[#E7E5E4] shadow-xs hover:border-[#78716C] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#4338CA]" />
              <span>Back to Examination Directory / Change Test</span>
            </button>
          </div>
        )}

        {/* Top Header */}
        <header className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-3">
            <QuizDishaLogo size="sm" showTagline={true} />
            <div className="flex flex-wrap items-center gap-2">
              {testMetadata ? (
                <>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#4338CA] border border-[#EEF2FF]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4338CA]" />
                    {testMetadata.standard} • {testMetadata.subject}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAFAF9] text-[#1C1917] border border-[#E7E5E4]">
                    Set {testMetadata.setNumber}
                  </span>
                </>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#4338CA] border border-[#EEF2FF]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4338CA]" />
                  Proctor Intelligence Engine
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FAFAF9] text-[#78716C] border border-[#E7E5E4]">
                Verified Assessment
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C1917]">
              {testMetadata ? testMetadata.title : 'Candidate Examination Portal'}
            </h1>
            <p className="text-sm text-[#4338CA] font-semibold">
              {testMetadata ? testMetadata.subtitle : 'High-Integrity Proctoring with Audio/Visual Surveillance & Anti-Cheat Protection'}
            </p>
            {testMetadata && (
              <p className="text-xs text-[#78716C] pt-0.5">
                {testMetadata.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 bg-[#FAFAF9] border border-[#E7E5E4] px-4 py-2.5 rounded-xl shrink-0">
            <Clock className="w-5 h-5 text-[#0891B2]" />
            <div>
              <div className="text-xs text-[#78716C]">Allocated Exam Time</div>
              <div className="text-sm font-bold text-[#1C1917]">
                {testMetadata ? `${testMetadata.durationMinutes} Minutes` : `${totalMinutes} Minutes`} ({questions.length} Questions)
              </div>
            </div>
          </div>
        </header>

        {/* Hardware Permission Alert Banner if Denied */}
        {permissionError && (
          <div 
            id="permission-error-banner"
            className="bg-[#FFF1F2] border border-[#FECDD3] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in"
          >
            <div className="flex items-start gap-3">
              <CameraOff className="w-6 h-6 text-[#E11D48] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-[#E11D48]">
                  Camera &amp; Microphone Access Mandatory
                </h2>
                <p className="text-sm text-[#1C1917] mt-1">
                  {permissionError}
                </p>
                <p className="text-xs text-[#78716C] mt-1">
                  Please click the lock or camera icon in your browser address bar, grant Camera and Microphone access, then click Retry below.
                </p>
              </div>
            </div>
            <button
              id="retry-permissions-btn"
              onClick={handleTestHardware}
              disabled={isVerifyingHardware}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#E11D48] hover:bg-[#BE123C] text-white transition-colors shrink-0 shadow-md cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isVerifyingHardware ? 'animate-spin' : ''}`} />
              Retry Permissions
            </button>
          </div>
        )}

        {/* Two-Column Grid: Hardware Verification & Proctor Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Proctor Verification & Live Feeds (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#0891B2]" />
                  <h2 className="font-semibold text-[#1C1917] text-base">Surveillance Sensor Check</h2>
                </div>
                {stream ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#16A34A] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#E11D48] bg-[#FFF1F2] px-2.5 py-1 rounded-full border border-[#FECDD3]">
                    <XCircle className="w-3.5 h-3.5" /> Required
                  </span>
                )}
              </div>

              {/* Video Preview Box */}
              <div className="relative aspect-video bg-[#1C1917] rounded-xl overflow-hidden border border-[#E7E5E4] flex items-center justify-center shadow-inner">
                {stream ? (
                  <>
                    <video
                      ref={videoPreviewRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 backdrop-blur px-2 py-0.5 rounded text-[11px] font-mono text-[#0891B2] flex items-center gap-1.5 border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                      LIVE FEED
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#292524] border border-[#44403C] flex items-center justify-center mx-auto text-[#78716C]">
                      <Video className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-[#E7E5E4]">Camera feed awaiting activation</p>
                      <button
                        id="enable-webcam-btn"
                        onClick={handleTestHardware}
                        disabled={isVerifyingHardware}
                        className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#4338CA] hover:bg-[#3730A3] text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isVerifyingHardware ? 'animate-spin' : ''}`} />
                        {isVerifyingHardware ? 'Checking...' : 'Activate Camera & Mic'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Microphone Level Visualizer */}
              <div className="bg-[#FAFAF9] border border-[#E7E5E4] p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#78716C]">
                    <Mic className="w-3.5 h-3.5 text-[#4338CA]" /> Microphone Input Level:
                  </span>
                  <span className="font-mono font-bold text-[#0891B2]">{audioLevel}%</span>
                </div>
                <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden border border-[#E7E5E4]">
                  <div
                    className="h-full bg-gradient-to-r from-[#16A34A] via-[#0891B2] to-[#4338CA] transition-all duration-75"
                    style={{ width: `${audioLevel}%` }}
                  />
                </div>
              </div>

              {/* Readiness Checks List */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  <span className="flex items-center gap-2 text-[#1C1917]">
                    <Maximize2 className="w-4 h-4 text-[#0891B2]" /> Mandatory Full-Screen
                  </span>
                  <span className="text-[#0891B2] font-semibold">Auto-Enforced</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  <span className="flex items-center gap-2 text-[#1C1917]">
                    <Lock className="w-4 h-4 text-[#4338CA]" /> Anti-Cheat Lockdown
                  </span>
                  <span className="text-[#4338CA] font-semibold">Keybinds Blocked</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  <span className="flex items-center gap-2 text-[#1C1917]">
                    <Eye className="w-4 h-4 text-[#E11D48]" /> Tab Switching Detection
                  </span>
                  <span className="text-[#E11D48] font-semibold">3-Strikes Limit</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Exam Rules & Scoring Scheme (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Scoring Scheme Card */}
            <section className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E7E5E4] pb-3">
                <Award className="w-5 h-5 text-[#4338CA]" />
                <h2 className="font-semibold text-[#1C1917] text-base">Grading &amp; Marking Structure</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Single Choice Rule */}
                <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-3.5 space-y-2">
                  <div className="text-xs font-bold text-[#0891B2] uppercase tracking-wider">
                    Single Choice
                  </div>
                  <div className="text-xs text-[#78716C]">Select 1 correct option</div>
                  <div className="space-y-1 text-xs pt-2 border-t border-[#E7E5E4]">
                    <div className="flex justify-between text-[#16A34A]">
                      <span>Correct:</span>
                      <span className="font-bold">+4 Marks</span>
                    </div>
                    <div className="flex justify-between text-[#E11D48]">
                      <span>Incorrect:</span>
                      <span className="font-bold">-1 Mark</span>
                    </div>
                    <div className="flex justify-between text-[#78716C]">
                      <span>Skipped:</span>
                      <span>0 Marks</span>
                    </div>
                  </div>
                </div>

                {/* Multiple Choice Rule */}
                <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-3.5 space-y-2">
                  <div className="text-xs font-bold text-[#4338CA] uppercase tracking-wider">
                    Multiple Choice
                  </div>
                  <div className="text-xs text-[#78716C]">Multi-option selection</div>
                  <div className="space-y-1 text-xs pt-2 border-t border-[#E7E5E4]">
                    <div className="flex justify-between text-[#16A34A]">
                      <span>All Correct:</span>
                      <span className="font-bold">+4 Marks</span>
                    </div>
                    <div className="flex justify-between text-[#E11D48]">
                      <span>Partial/Wrong:</span>
                      <span className="font-bold">-2 Marks</span>
                    </div>
                    <div className="flex justify-between text-[#78716C]">
                      <span>Skipped:</span>
                      <span>0 Marks</span>
                    </div>
                  </div>
                </div>

                {/* Numerical Rule */}
                <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-3.5 space-y-2">
                  <div className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                    Numerical
                  </div>
                  <div className="text-xs text-[#78716C]">Tolerance margin active</div>
                  <div className="space-y-1 text-xs pt-2 border-t border-[#E7E5E4]">
                    <div className="flex justify-between text-[#16A34A]">
                      <span>In Range:</span>
                      <span className="font-bold">+4 Marks</span>
                    </div>
                    <div className="flex justify-between text-[#78716C]">
                      <span>Incorrect:</span>
                      <span className="font-bold">0 Marks</span>
                    </div>
                    <div className="flex justify-between text-[#78716C]">
                      <span>Skipped:</span>
                      <span>0 Marks</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Anti-Cheat Regulations Card */}
            <section className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E7E5E4] pb-3">
                <AlertTriangle className="w-5 h-5 text-[#E11D48]" />
                <h2 className="font-semibold text-[#1C1917] text-base">Proctoring Directives &amp; Guidelines</h2>
              </div>

              <ul className="space-y-2.5 text-xs text-[#1C1917]">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5 border border-[#FECDD3]">
                    1
                  </span>
                  <div>
                    <strong className="text-[#1C1917]">Full-Screen Lockdown:</strong> Clicking &quot;Start Proctored Assessment&quot; locks your browser in full screen. Exiting initiates a proctoring violation warning.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5 border border-[#FECDD3]">
                    2
                  </span>
                  <div>
                    <strong className="text-[#1C1917]">3-Strikes Violation Policy:</strong> Tab switching, app unfocus, or window resizing triggers strikes. Reaching <strong>3 strikes</strong> immediately terminates and auto-submits your test.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5 border border-[#FECDD3]">
                    3
                  </span>
                  <div>
                    <strong className="text-[#1C1917]">Google Drive Archival Provision:</strong> Continuous A/V feed and official PDF transcripts are provisioned for direct archival to Google Drive via Google Apps Script.
                  </div>
                </li>
              </ul>
            </section>

            {/* Candidate Registration Form Card */}
            <section id="candidate-registration-card" className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E7E5E4] pb-3">
                <User className="w-5 h-5 text-[#4338CA]" />
                <div>
                  <h2 className="font-semibold text-[#1C1917] text-base">Candidate Information</h2>
                  <p className="text-xs text-[#78716C]">Enter credentials to generate your official PDF assessment transcript.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="candidate-name-input" className="block text-xs font-semibold text-[#1C1917]">
                    Candidate Full Name <span className="text-[#E11D48]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                    <input
                      id="candidate-name-input"
                      type="text"
                      value={candidate.name}
                      onChange={(e) => onCandidateChange({ ...candidate, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-[#FAFAF9] border border-[#E7E5E4] focus:border-[#4338CA] focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917] placeholder-[#78716C] focus:outline-none transition-colors"
                    />
                  </div>
                  {!isNameValid && candidate.name.length > 0 && (
                    <p className="text-[11px] text-[#E11D48]">Name must be at least 2 characters</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="candidate-email-input" className="block text-xs font-semibold text-[#1C1917]">
                    Official Email ID <span className="text-[#E11D48]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                    <input
                      id="candidate-email-input"
                      type="email"
                      value={candidate.email}
                      onChange={(e) => onCandidateChange({ ...candidate, email: e.target.value })}
                      placeholder="e.g. alex@university.edu"
                      className="w-full bg-[#FAFAF9] border border-[#E7E5E4] focus:border-[#4338CA] focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917] placeholder-[#78716C] focus:outline-none transition-colors"
                    />
                  </div>
                  {!isEmailValid && candidate.email.length > 0 && (
                    <p className="text-[11px] text-[#E11D48]">Please enter a valid email address</p>
                  )}
                </div>
              </div>
            </section>

            {/* Candidate Declaration & Start Button */}
            <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-sm space-y-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  id="agree-proctor-terms-checkbox"
                  type="checkbox"
                  checked={hasAgreedTerms}
                  onChange={(e) => setHasAgreedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#4338CA] bg-white border-[#E7E5E4] focus:ring-[#4338CA] cursor-pointer"
                />
                <span className="text-xs text-[#1C1917] leading-relaxed">
                  I agree to enter Full-Screen mode, permit continuous surveillance recording, and understand that violations will invoke the 3-strikes disqualification protocol.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-[#78716C] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#4338CA]" />
                  <span>Ready to start {questions.length} questions</span>
                </div>

                <button
                  id="start-quiz-btn"
                  onClick={onStartExam}
                  disabled={!isReadyToStart}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 ${
                    isReadyToStart
                      ? 'bg-[#4338CA] hover:bg-[#3730A3] text-white cursor-pointer shadow-indigo-500/25 hover:shadow-indigo-500/35'
                      : 'bg-[#FAFAF9] text-[#78716C] border border-[#E7E5E4] cursor-not-allowed opacity-60'
                  }`}
                >
                  <Maximize2 className="w-4 h-4" />
                  Start Proctored Assessment
                </button>
              </div>

              {(!stream || !isNameValid || !isEmailValid || !hasAgreedTerms) && (
                <p className="text-xs text-[#E11D48] text-center sm:text-right font-medium">
                  {!stream 
                    ? '* Activate Camera and Microphone hardware test to proceed'
                    : !isNameValid || !isEmailValid
                    ? '* Please provide Candidate Name and Email ID above'
                    : '* Please confirm your declaration agreement to begin'}
                </p>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
