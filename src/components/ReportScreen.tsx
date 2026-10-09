import React, { useState, useEffect } from 'react';
import { 
  QuizReportData, 
  QuestionResult, 
  SingleChoiceQuestion, 
  MultipleChoiceQuestion, 
  NumericalQuestion 
} from '../types';
import { formatTime } from '../utils/scoring';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  ShieldCheck, 
  ShieldAlert, 
  Video, 
  Server,
  Lock, 
  Eye, 
  FileText, 
  AlertTriangle,
  Play,
  Filter,
  Download,
  FileDown,
  User,
  Mail,
  Phone,
  ArrowUp,
  Cloud,
  Folder,
  ExternalLink,
  Code2,
  Copy,
  Check,
  X,
  Send,
  Loader2,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { parseOption } from '../utils/questionUtils';
import { ImageViewerModal } from './ImageViewerModal';
import { 
  getSavedGasUrl, 
  saveGasUrl, 
  getSavedDriveFolder, 
  saveDriveFolder, 
  uploadToGoogleDriveViaGas, 
  isValidGasEndpoint,
  DEFAULT_GAS_URL,
  DEFAULT_DRIVE_FOLDER
} from '../utils/gasDriveSync';
import { getAssessmentFileNames } from '../utils/fileNaming';
import { QuizDishaLogo } from './QuizDishaLogo';

interface ReportScreenProps {
  report: QuizReportData;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  report,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'review' | 'proctor'>('analytics');
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showGasModal, setShowGasModal] = useState(false);
  const [copiedGas, setCopiedGas] = useState(false);
  const [gasUrlInput, setGasUrlInput] = useState<string>(() => getSavedGasUrl());
  const [folderInput, setFolderInput] = useState<string>(() => getSavedDriveFolder());
  const [gasSyncStatus, setGasSyncStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    driveUrl?: string;
  }>({ loading: false });
  const [videoSyncStatus, setVideoSyncStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    driveUrl?: string;
  }>({ loading: false });

  const defaultAssessmentFileNames = getAssessmentFileNames(report.candidate?.name);
  const resolvedVideoFileName = report.recordedFileName || defaultAssessmentFileNames.videoFileName;

  // Modal state for inspecting diagram in high resolution
  const [modalImage, setModalImage] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    caption?: string;
  }>({
    isOpen: false,
    url: '',
    title: '',
    caption: '',
  });

  const openImageModal = (url: string, title: string, caption?: string) => {
    setModalImage({
      isOpen: true,
      url,
      title,
      caption,
    });
  };

  const closeImageModal = () => {
    setModalImage((prev) => ({ ...prev, isOpen: false }));
  };

  

  const handleSyncToGoogleDrive = async () => {
    const targetUrl = gasUrlInput.trim() || DEFAULT_GAS_URL;
    if (!targetUrl) {
      setGasSyncStatus({
        loading: false,
        success: false,
        message: 'Please paste your deployed Google Apps Script Web App URL first.',
      });
      return;
    }

    if (!isValidGasEndpoint(targetUrl)) {
      setGasSyncStatus({
        loading: false,
        success: false,
        message: 'The URL must be a valid http/https Web App URL ending in /exec.',
      });
      return;
    }

    saveGasUrl(targetUrl);
    saveDriveFolder(folderInput);
    setGasSyncStatus({ loading: true, message: `Uploading PDF report to Google Drive folder "${folderInput}"...` });

    try {
      let pdfBlob: Blob;
      if (report.pdfBlobUrl) {
        const res = await fetch(report.pdfBlobUrl);
        pdfBlob = await res.blob();
      } else {
        const { blob } = (await import('../utils/generatePdfReport')).generateQuizPdfReport(report);
        pdfBlob = blob;
      }

      const syncRes = await uploadToGoogleDriveViaGas(
        pdfBlob,
        report.pdfFileName || `${(report.candidate?.name || 'Candidate').replace(/\s+/g, '_')}_Report.pdf`,
        'application/pdf',
        report.candidate?.name,
        report.candidate?.email,
        targetUrl,
        folderInput
      );

      setGasSyncStatus({
        loading: false,
        success: syncRes.success,
        message: syncRes.message,
        driveUrl: syncRes.driveUrl,
      });
    } catch (err: any) {
      setGasSyncStatus({
        loading: false,
        success: false,
        message: 'Failed to upload: ' + (err?.message || 'Network error'),
      });
    }
  };

  const handleSyncVideoToGoogleDrive = async () => {
    if (!report.videoBlobUrl) {
      setVideoSyncStatus({
        loading: false,
        success: false,
        message: 'No video recording found for this session.',
      });
      return;
    }

    const targetUrl = gasUrlInput.trim() || DEFAULT_GAS_URL;
    if (!targetUrl || !isValidGasEndpoint(targetUrl)) {
      setVideoSyncStatus({
        loading: false,
        success: false,
        message: 'Please enter a valid Google Apps Script Web App URL ending in /exec.',
      });
      return;
    }

    saveGasUrl(targetUrl);
    saveDriveFolder(folderInput);
    setVideoSyncStatus({
      loading: true,
      message: `Uploading surveillance video to Google Drive folder "${folderInput}"...`,
    });

    try {
      const res = await fetch(report.videoBlobUrl);
      const videoBlob = await res.blob();

      const syncRes = await uploadToGoogleDriveViaGas(
        videoBlob,
        resolvedVideoFileName,
        'video/webm',
        report.candidate?.name,
        report.candidate?.email,
        targetUrl,
        folderInput
      );

      setVideoSyncStatus({
        loading: false,
        success: syncRes.success,
        message: syncRes.message,
        driveUrl: syncRes.driveUrl,
      });
    } catch (err: any) {
      setVideoSyncStatus({
        loading: false,
        success: false,
        message: 'Failed to upload video: ' + (err?.message || 'Network error'),
      });
    }
  };

  // Trigger celebration confetti if netScore > 50%
  useEffect(() => {
    if (report.netScore > (report.maxPossibleScore * 0.5)) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4338CA', '#0891B2', '#16A34A', '#F97316'],
      });
    }
  }, [report]);

  // Filter breakdown
  const filteredQuestions = report.breakdown.filter((item) => {
    if (filterType === 'correct') return item.isCorrect;
    if (filterType === 'incorrect') return item.isAttempted && !item.isCorrect;
    if (filterType === 'unattempted') return !item.isAttempted;
    return true;
  });

  const percentageScore = Math.max(
    0,
    Math.round((report.netScore / report.maxPossibleScore) * 100)
  );

  return (
    <div id="post-test-report-screen" className="min-h-screen bg-[#FAFAF9] text-[#1C1917] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <header className="bg-white border border-[#E7E5E4] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <QuizDishaLogo size="sm" showTagline={true} />
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                report.submissionReason === 'disqualification'
                  ? 'bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/30'
                  : 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30'
              }`}>
                {report.submissionReason === 'disqualification'
                  ? 'Terminated via Proctor Disqualification'
                  : report.submissionReason === 'timeout'
                  ? 'Auto-Submitted (Timer Expiry)'
                  : 'Submitted Successfully'}
              </span>
              <span className="text-xs text-[#78716C]">
                Time: {formatTime(report.timeSpentSeconds)} of {formatTime(report.totalAllocatedSeconds)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
              Assessment Performance &amp; Integrity Audit
            </h1>
            
            {/* Candidate Identity Profile & Test Metadata */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#1C1917]">
              {report.testInfo && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#a6e1fa]/30 border border-[#a6e1fa]/40 font-bold text-[#0a2472]">
                  {report.testInfo.title}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0] font-semibold text-[#00072d]">
                <User className="w-3.5 h-3.5 text-[#0a2472]" />
                {report.candidate?.name || 'Candidate'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0] text-[#536b82]">
                <Mail className="w-3.5 h-3.5 text-[#0e6ba8]" />
                {report.candidate?.email || 'N/A'}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {report.pdfBlobUrl && (
              <a
                id="header-download-pdf-btn"
                href={report.pdfBlobUrl}
                download={report.pdfFileName || 'Candidate_Report.pdf'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0a2472] hover:bg-[#001c55] text-white shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Report</span>
              </a>
            )}
          </div>
        </header>

        {/* 7 Required Core Metric Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          
          {/* 1. Net Score */}
          <div className="bg-white border-2 border-[#0a2472]/40 rounded-2xl p-4 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-2 lg:col-span-1">
            <span className="text-xs font-bold text-[#0a2472] uppercase tracking-wider">
              Net Score
            </span>
            <div className="my-2">
              <span className="text-3xl font-extrabold text-[#00072d]">
                {report.netScore}
              </span>
              <span className="text-xs text-[#536b82] ml-1">
                / {report.maxPossibleScore}
              </span>
            </div>
            <span className="text-[11px] text-[#0e6ba8] font-semibold">
              {percentageScore}% Achievement
            </span>
          </div>

          {/* 2. Total Questions */}
          <div className="bg-white border border-[#d6e4f0] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-medium text-[#536b82]">Total Questions</span>
            <div className="my-1.5 text-2xl font-bold text-[#00072d]">
              {report.totalQuestions}
            </div>
            <span className="text-[11px] text-[#536b82]">100% Monitored</span>
          </div>

          {/* 3. Total Attempted */}
          <div className="bg-white border border-[#d6e4f0] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-medium text-[#536b82]">Attempted</span>
            <div className="my-1.5 text-2xl font-bold text-[#00072d]">
              {report.attemptedCount}
            </div>
            <span className="text-[11px] text-[#536b82]">
              {report.unattemptedCount} Skipped
            </span>
          </div>

          {/* 4. Correct Answers */}
          <div className="bg-white border border-[#16A34A]/30 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-medium text-[#16A34A]">Correct</span>
            <div className="my-1.5 text-2xl font-bold text-[#16A34A]">
              {report.correctCount}
            </div>
            <span className="text-[11px] text-[#16A34A]">
              {report.accuracyRate}% Accuracy
            </span>
          </div>

          {/* 5. Incorrect Answers */}
          <div className="bg-white border border-[#E11D48]/30 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-medium text-[#E11D48]">Incorrect</span>
            <div className="my-1.5 text-2xl font-bold text-[#E11D48]">
              {report.incorrectCount}
            </div>
            <span className="text-[11px] text-[#E11D48]">Errors/Partial</span>
          </div>

          {/* 6. Total Positive Marks */}
          <div className="bg-white border border-[#16A34A]/30 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-medium text-[#16A34A]">Positive Marks</span>
            <div className="my-1.5 text-2xl font-bold text-[#16A34A]">
              +{report.positiveMarks}
            </div>
            <span className="text-[11px] text-[#536b82]">Scored Correctly</span>
          </div>

          {/* 7. Total Negative Marks */}
          <div className="bg-white border border-[#E11D48]/30 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-medium text-[#E11D48]">Negative Marks</span>
            <div className="my-1.5 text-2xl font-bold text-[#E11D48]">
              -{report.negativeMarks}
            </div>
            <span className="text-[11px] text-[#536b82]">Penalty Deductions</span>
          </div>

        </section>

        {/* Navigation Tabs between Overview Analytics, Question Review, and Proctor Audit */}
        <div className="flex items-center gap-2 border-b border-[#d6e4f0] pb-1">
          <button
            id="tab-analytics-btn"
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-[#0a2472] text-white shadow-sm'
                : 'text-[#536b82] hover:text-[#00072d] hover:bg-[#a6e1fa]/20'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Scorecard &amp; Insights</span>
          </button>

          <button
            id="tab-review-btn"
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'review'
                ? 'bg-[#0e6ba8] text-white shadow-sm'
                : 'text-[#536b82] hover:text-[#00072d] hover:bg-[#a6e1fa]/20'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Review Quiz ({report.totalQuestions})</span>
          </button>

          <button
            id="tab-proctor-btn"
            onClick={() => setActiveTab('proctor')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'proctor'
                ? 'bg-[#E11D48] text-white shadow-sm'
                : 'text-[#536b82] hover:text-[#00072d] hover:bg-[#E11D48]/10'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>
              Proctoring Audit ({report.violations.length} Incidents)
            </span>
          </button>
        </div>

        {/* Tab 1: Detailed Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Score Breakdown Graphic & Summary */}
              <div className="lg:col-span-2 bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="font-bold text-[#1C1917] text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#4338CA]" />
                  Scoring Analysis &amp; Formula Verification
                </h3>

                <div className="bg-[#FAFAF9] border border-[#E7E5E4] p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#78716C]">Net Score Formula:</span>
                    <span className="font-mono text-[#1C1917] font-bold">
                      Positive Marks ({report.positiveMarks}) - Negative Marks ({report.negativeMarks}) = {report.netScore}
                    </span>
                  </div>

                  <div className="w-full bg-[#E7E5E4] h-4 rounded-full overflow-hidden flex border border-[#E7E5E4]">
                    <div 
                      className="bg-[#16A34A] h-full" 
                      style={{ width: `${(report.correctCount / report.totalQuestions) * 100}%` }}
                      title={`Correct: ${report.correctCount}`}
                    />
                    <div 
                      className="bg-[#E11D48] h-full" 
                      style={{ width: `${(report.incorrectCount / report.totalQuestions) * 100}%` }}
                      title={`Incorrect: ${report.incorrectCount}`}
                    />
                    <div 
                      className="bg-[#D6D3D1] h-full" 
                      style={{ width: `${(report.unattemptedCount / report.totalQuestions) * 100}%` }}
                      title={`Unattempted: ${report.unattemptedCount}`}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#16A34A]"></span>
                      <span className="text-[#1C1917]">Correct: {report.correctCount} ({Math.round((report.correctCount / report.totalQuestions) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#E11D48]"></span>
                      <span className="text-[#1C1917]">Incorrect: {report.incorrectCount} ({Math.round((report.incorrectCount / report.totalQuestions) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#78716C]"></span>
                      <span className="text-[#1C1917]">Skipped: {report.unattemptedCount} ({Math.round((report.unattemptedCount / report.totalQuestions) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#FAFAF9] border border-[#E7E5E4] p-4 rounded-xl text-center">
                    <div className="text-xs text-[#78716C]">Accuracy Rate</div>
                    <div className="text-xl font-bold text-[#16A34A] mt-1">{report.accuracyRate}%</div>
                  </div>
                  <div className="bg-[#FAFAF9] border border-[#E7E5E4] p-4 rounded-xl text-center">
                    <div className="text-xs text-[#78716C]">Time Taken</div>
                    <div className="text-xl font-bold text-[#0891B2] mt-1">{formatTime(report.timeSpentSeconds)}</div>
                  </div>
                  <div className="bg-[#FAFAF9] border border-[#E7E5E4] p-4 rounded-xl text-center">
                    <div className="text-xs text-[#78716C]">Proctor Strikes</div>
                    <div className={`text-xl font-bold mt-1 ${report.violations.length > 0 ? 'text-[#E11D48]' : 'text-[#16A34A]'}`}>
                      {report.violations.length} logged
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Assessment PDF Report Card */}
              <div id="candidate-pdf-report-card" className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#1C1917] text-base flex items-center gap-2">
                    <FileDown className="w-5 h-5 text-[#4338CA]" />
                    Assessment PDF Report
                  </h3>
                  <span className="text-[11px] font-mono text-[#0891B2] bg-[#ECFEFF] px-2.5 py-0.5 rounded-lg border border-[#0891B2]/30 font-semibold">
                    .pdf Document
                  </span>
                </div>

                <p className="text-xs text-[#78716C] leading-relaxed">
                  Generated official candidate assessment transcript with verified credentials, full answer sheet, question breakdown, and scoring analytics.
                </p>

                {/* Report Metadata Box */}
                <div className="bg-[#FAFAF9] rounded-2xl p-4 border border-[#E7E5E4] space-y-2.5">
                  <div className="text-[11px] font-mono text-[#78716C] space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Candidate:</span>
                      <span className="text-[#1C1917] font-sans font-semibold">
                        {report.candidate?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Email ID:</span>
                      <span className="text-[#4338CA] font-sans">
                        {report.candidate?.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>File Name:</span>
                      <span className="text-[#0891B2] truncate max-w-[200px]" title={report.pdfFileName}>
                        {report.pdfFileName || 'Candidate_Report.pdf'}
                      </span>
                    </div>
                    {report.pdfArchiveInfo?.fileSize && (
                      <div className="flex justify-between items-center">
                        <span>Report Size:</span>
                        <span className="text-[#1C1917]">
                          {(report.pdfArchiveInfo.fileSize / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Provision for Candidate to Download PDF */}
                {report.pdfBlobUrl ? (
                  <div className="space-y-3 pt-1">
                    <a
                      id="download-candidate-pdf-btn"
                      href={report.pdfBlobUrl}
                      download={report.pdfFileName || 'Assessment_Report.pdf'}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-[#4338CA] hover:bg-[#3730A3] text-white shadow-sm transition-all cursor-pointer select-none"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Assessment PDF Report</span>
                    </a>
                    
                    <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                      <span>* Verified transcript with full question and scoring breakdown</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] text-xs text-[#78716C]">
                    Generating assessment PDF report...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Question-by-Question Review with Explanations & Tolerance */}
        {activeTab === 'review' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E7E5E4] p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#78716C]">
                <Filter className="w-4 h-4 text-[#4338CA]" />
                <span>Filter Review:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    filterType === 'all'
                      ? 'bg-[#4338CA] text-white font-bold'
                      : 'bg-[#FAFAF9] border border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  All Questions ({report.totalQuestions})
                </button>
                <button
                  onClick={() => setFilterType('correct')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    filterType === 'correct'
                      ? 'bg-[#16A34A] text-white font-bold'
                      : 'bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A]/20'
                  }`}
                >
                  Correct ({report.correctCount})
                </button>
                <button
                  onClick={() => setFilterType('incorrect')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    filterType === 'incorrect'
                      ? 'bg-[#E11D48] text-white font-bold'
                      : 'bg-[#E11D48]/10 text-[#E11D48] hover:bg-[#E11D48]/20'
                  }`}
                >
                  Incorrect ({report.incorrectCount})
                </button>
                <button
                  onClick={() => setFilterType('unattempted')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    filterType === 'unattempted'
                      ? 'bg-[#F97316] text-white font-bold'
                      : 'bg-[#FFF7ED] text-[#F97316] hover:bg-[#FFF7ED]/80'
                  }`}
                >
                  Unattempted ({report.unattemptedCount})
                </button>
              </div>
            </div>

            {/* List of Questions */}
            <div className="space-y-4">
              {filteredQuestions.map((res, index) => {
                const q = res.question;
                const originalIndex = report.breakdown.findIndex(b => b.question.id === q.id);

                return (
                  <article
                    key={q.id}
                    id={`review-question-${q.id}`}
                    className={`bg-white border rounded-2xl p-6 shadow-sm space-y-4 transition-all ${
                      res.isCorrect
                        ? 'border-[#16A34A]/40'
                        : res.isAttempted
                        ? 'border-[#E11D48]/40'
                        : 'border-[#E7E5E4]'
                    }`}
                  >
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E5E4] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] text-[#1C1917] font-bold text-xs flex items-center justify-center">
                          Q{originalIndex + 1}
                        </span>
                        <span className="text-xs font-medium text-[#4338CA] bg-[#EEF2FF] px-2.5 py-1 rounded-md border border-[#4338CA]/20">
                          {q.category}
                        </span>
                        <span className="text-xs text-[#78716C] capitalize">
                          {q.type} Question
                        </span>
                      </div>

                      {/* Marks Awarded Badge */}
                      <div>
                        {res.isCorrect ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30">
                            <CheckCircle2 className="w-3.5 h-3.5" /> +4 Marks (Full Marks)
                          </span>
                        ) : res.isAttempted ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/30">
                            <XCircle className="w-3.5 h-3.5" /> {res.scoreAwarded} Marks Penalty
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAFAF9] text-[#78716C] border border-[#E7E5E4]">
                            0 Marks (Unattempted)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div className="space-y-3">
                      <h4 className="text-base font-semibold text-[#1C1917] leading-relaxed">
                        {q.prompt}
                      </h4>

                      {/* Question Diagram / Image in Review */}
                      {q.imageUrl && (
                        <div className="my-2.5 p-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl flex flex-col items-center justify-center">
                          <div className="relative max-h-64 sm:max-h-72 w-full flex items-center justify-center overflow-hidden rounded-lg bg-white border border-[#E7E5E4] p-2">
                            <img
                              src={q.imageUrl}
                              alt={q.imageCaption || `Question ${originalIndex + 1} Diagram`}
                              referrerPolicy="no-referrer"
                              className="max-h-64 sm:max-h-72 max-w-full object-contain cursor-pointer transition-transform duration-150 hover:scale-[1.01]"
                              onClick={() => openImageModal(q.imageUrl!, `Question ${originalIndex + 1} Diagram`, q.imageCaption)}
                            />
                          </div>
                          <div className="w-full flex items-center justify-between pt-2 border-t border-[#E7E5E4] mt-2 text-xs text-[#78716C]">
                            <span className="font-medium flex items-center gap-1.5">
                              <ImageIcon className="w-3.5 h-3.5 text-[#4338CA]" />
                              {q.imageCaption || `Figure: Question ${originalIndex + 1} Diagram`}
                            </span>
                            <button
                              type="button"
                              onClick={() => openImageModal(q.imageUrl!, `Question ${originalIndex + 1} Diagram`, q.imageCaption)}
                              className="inline-flex items-center gap-1 text-[#4338CA] hover:text-[#3730A3] font-semibold text-xs transition-colors cursor-pointer bg-white px-2.5 py-0.5 rounded border border-[#4338CA]/30"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>Enlarge</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Options Review for Single / Multiple */}
                    {(q.type === 'single' || q.type === 'multiple') && (
                      <div className="space-y-2 pt-2">
                        {(q as SingleChoiceQuestion | MultipleChoiceQuestion).options.map((opt, optIdx) => {
                          const optionLetter = String.fromCharCode(65 + optIdx);
                          const parsed = parseOption(opt, (q as SingleChoiceQuestion | MultipleChoiceQuestion).optionImages?.[optIdx]);
                          const isCorrectOption =
                            q.type === 'single'
                              ? (q as SingleChoiceQuestion).correctAnswer === optIdx
                              : (q as MultipleChoiceQuestion).correctAnswers.includes(optIdx);

                          const isUserSelected =
                            q.type === 'single'
                              ? res.userAnswer === optIdx
                              : Array.isArray(res.userAnswer) && res.userAnswer.includes(optIdx);

                          let itemBorder = 'border-[#E7E5E4] bg-[#FAFAF9] text-[#1C1917]';
                          let tagLabel = null;

                          if (isCorrectOption && isUserSelected) {
                            itemBorder = 'border-[#16A34A] bg-[#16A34A]/10 text-[#1C1917]';
                            tagLabel = (
                              <span className="text-[11px] font-bold text-[#16A34A] bg-[#16A34A]/15 px-2 py-0.5 rounded border border-[#16A34A]/30 shrink-0">
                                ✓ Correct &amp; Selected
                              </span>
                            );
                          } else if (isCorrectOption && !isUserSelected) {
                            itemBorder = 'border-[#16A34A]/50 bg-[#16A34A]/5 text-[#1C1917]';
                            tagLabel = (
                              <span className="text-[11px] font-semibold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded border border-[#16A34A]/30 shrink-0">
                                Correct Answer
                              </span>
                            );
                          } else if (!isCorrectOption && isUserSelected) {
                            itemBorder = 'border-[#E11D48] bg-[#E11D48]/10 text-[#1C1917]';
                            tagLabel = (
                              <span className="text-[11px] font-bold text-[#E11D48] bg-[#E11D48]/15 px-2 py-0.5 rounded border border-[#E11D48]/30 shrink-0">
                                ✗ Your Incorrect Selection
                              </span>
                            );
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-sm ${itemBorder}`}
                            >
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <span className="w-6 h-6 rounded-md bg-white border border-[#E7E5E4] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[#1C1917]">
                                  {optionLetter}
                                </span>
                                
                                <div className="space-y-2 flex-1">
                                  {parsed.text && (
                                    <span className="pt-0.5 block">{parsed.text}</span>
                                  )}
                                  {parsed.imageUrl && (
                                    <div className="relative group/optimg inline-block">
                                      <img
                                        src={parsed.imageUrl}
                                        alt={`Option ${optionLetter}`}
                                        referrerPolicy="no-referrer"
                                        className="max-h-36 sm:max-h-44 max-w-full object-contain rounded-lg border border-[#E7E5E4] bg-white p-1"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => openImageModal(parsed.imageUrl!, `Option ${optionLetter} Diagram`, parsed.caption || parsed.text)}
                                        title="Enlarge Option Image"
                                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover/optimg:opacity-100 transition-opacity cursor-pointer"
                                      >
                                        <Maximize2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {tagLabel}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Numerical Value Review with Tolerance */}
                    {q.type === 'numerical' && (
                      <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-4 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 bg-white rounded-xl border border-[#E7E5E4]">
                            <span className="text-[#78716C] block mb-1">Your Submitted Value:</span>
                            <span className={`text-base font-mono font-bold ${res.isCorrect ? 'text-[#16A34A]' : 'text-[#E11D48]'}`}>
                              {res.userAnswer !== null ? String(res.userAnswer) : 'Not Answered'}
                            </span>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-[#E7E5E4]">
                            <span className="text-[#78716C] block mb-1">Exact Target Answer:</span>
                            <span className="text-base font-mono font-bold text-[#0891B2]">
                              {(q as NumericalQuestion).correctAnswer} {(q as NumericalQuestion).unit || ''}
                            </span>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-[#E7E5E4]">
                            <span className="text-[#78716C] block mb-1">Accepted Range (±{(q as NumericalQuestion).tolerance}):</span>
                            <span className="text-base font-mono font-bold text-[#16A34A]">
                              [{res.toleranceApplied?.min} to {res.toleranceApplied?.max}]
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-[#78716C]">
                          * Tolerance calculation: inputs falling between {res.toleranceApplied?.min} and {res.toleranceApplied?.max} are granted full +4 marks.
                        </div>
                      </div>
                    )}

                    {/* Detailed Explanation */}
                    {q.explanation && (
                      <div className="bg-[#FAFAF9] border-l-4 border-[#4338CA] p-4 rounded-r-xl text-xs space-y-1">
                        <div className="font-bold text-[#4338CA] uppercase tracking-wider">
                          Official Solution &amp; Explanation
                        </div>
                        <p className="text-[#1C1917] leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}

                  </article>
                );
              })}
            </div>

          </div>
        )}

        {/* Tab 3: Proctoring Integrity & Anti-Cheat Audit Trail */}
        {activeTab === 'proctor' && (
          <div className="space-y-6 animate-in fade-in">

            <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#4338CA]" />
                  <h3 className="font-bold text-[#1C1917] text-base">
                    Proctor Security Audit Log
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#78716C]">
                  {report.violations.length} Incident{report.violations.length === 1 ? '' : 's'} Logged
                </span>
              </div>

              {report.violations.length > 0 ? (
                <div className="space-y-3">
                  {report.violations.map((violation, vIdx) => (
                    <div
                      key={violation.id || vIdx}
                      className="p-4 rounded-xl bg-[#E11D48]/10 border border-[#E11D48]/30 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white text-[#E11D48] border border-[#E11D48]/30 uppercase">
                            {violation.type.replace('_', ' ')}
                          </span>
                          <span className="text-xs font-mono text-[#0891B2] font-semibold">
                            {violation.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-[#1C1917] font-medium">
                          {violation.description}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#E11D48] shrink-0">
                        Strike Logged
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-[#16A34A]/10 rounded-xl border border-[#16A34A]/30 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto" />
                  <h4 className="text-base font-bold text-[#1C1917]">Clean Session Record</h4>
                  <p className="text-xs text-[#78716C] max-w-md mx-auto">
                    Zero anti-cheat violations detected. The candidate maintained full-screen mode, window focus, and camera surveillance throughout the examination.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
      
      {/* Report Screen Dark Footer */}
      <footer id="report-portal-footer" className="mt-16 bg-[#1C1917] text-[#FAFAF9] border-t border-[#292524] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Brand */}
            <div className="space-y-3">
              <QuizDishaLogo size="sm" showTagline={true} inverted={true} />
              <p className="text-xs text-[#D6D3D1] leading-relaxed">
                Official Certified Examination Transcript generated by QuizDisha Online Examination Platform. Stored securely with full question audit trails and anti-cheat surveillance logs.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">
                Report Sections
              </h4>
              <ul className="space-y-2 text-xs text-[#D6D3D1]">
                <li>
                  <button 
                    onClick={() => {
                      setActiveTab('analytics');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Performance Summary &amp; Scorecard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setActiveTab('review');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Question-by-Question Audit &amp; Keys
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setActiveTab('proctor');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Proctoring &amp; Anti-Cheat Audit Log
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-white transition-colors cursor-pointer text-left font-semibold text-[#38BDF8]"
                  >
                    Back to Top &uarr;
                  </button>
                </li>
              </ul>
            </div>

            {/* Support & Contact Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">
                Transcript Verification &amp; Help Desk
              </h4>
              <p className="text-xs text-[#D6D3D1]">
                Have inquiries about your scores, answers, or transcript certificate?
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="tel:+916290671032"
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-[#16A34A] hover:bg-[#15803D] text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: +91 6290671032</span>
                </a>
                <a
                  href={`mailto:birkrishnendu@gmail.com?subject=Transcript%20Verification%20Inquiry%20-%20Candidate%20${encodeURIComponent(report.candidate.name || 'Candidate')}`}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-[#4338CA] hover:bg-[#3730A3] text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Support</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A8A29E]">
            <div>
              &copy; {new Date().getFullYear()} QuizDisha. All Rights Reserved. Candidate: {report.candidate.name || 'Candidate'}
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="inline-flex items-center gap-1 text-white hover:text-[#38BDF8] transition-colors cursor-pointer font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
      
      {/* High-Resolution Diagram Preview Modal */}
      <ImageViewerModal
        isOpen={modalImage.isOpen}
        onClose={closeImageModal}
        imageUrl={modalImage.url}
        title={modalImage.title}
        caption={modalImage.caption}
      />
    </div>
  );
};
