import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Atom, 
  FlaskConical, 
  Layers, 
  Clock, 
  Award, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  FileText, 
  Video, 
  AlertTriangle,
  Lock,
  Eye,
  SlidersHorizontal,
  BookOpen,
  Phone,
  Mail,
  ArrowUp,
  Monitor,
  Laptop,
  Smartphone
} from 'lucide-react';
import { TestMetadata, ExamStandard, ExamSubject } from '../types';
import { EXAM_CATALOG } from '../data/examCatalog';
import { QuizDishaLogo } from './QuizDishaLogo';
import { DesktopOnlyModal } from './DesktopOnlyModal';
import { isMobileOrTabletDevice, useIsMobileDevice } from '../utils/deviceDetection';

interface LandingPageProps {
  onSelectTest: (test: TestMetadata) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectTest }) => {
  const [selectedSubject, setSelectedSubject] = useState<ExamSubject | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDesktopWarningOpen, setIsDesktopWarningOpen] = useState<boolean>(false);
  const [selectedTestForWarning, setSelectedTestForWarning] = useState<TestMetadata | null>(null);
  const isMobile = useIsMobileDevice();

  const handleAttemptTest = (test: TestMetadata) => {
    if (isMobileOrTabletDevice()) {
      setSelectedTestForWarning(test);
      setIsDesktopWarningOpen(true);
    } else {
      onSelectTest(test);
    }
  };

  // Filter Class 9 tests by Subject and Search
  const class9Tests = useMemo(() => {
    return EXAM_CATALOG.filter((test) => test.standard === 'Class 9').filter((test) => {
      if (selectedSubject !== 'All' && test.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = test.title.toLowerCase().includes(q);
        const matchesSubtitle = test.subtitle.toLowerCase().includes(q);
        const matchesDesc = test.description.toLowerCase().includes(q);
        const matchesSyllabus = test.syllabus.some((s) => s.toLowerCase().includes(q));
        return matchesTitle || matchesSubtitle || matchesDesc || matchesSyllabus;
      }
      return true;
    });
  }, [selectedSubject, searchQuery]);

  // Filter Class 10 tests by Subject and Search
  const class10Tests = useMemo(() => {
    return EXAM_CATALOG.filter((test) => test.standard === 'Class 10').filter((test) => {
      if (selectedSubject !== 'All' && test.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = test.title.toLowerCase().includes(q);
        const matchesSubtitle = test.subtitle.toLowerCase().includes(q);
        const matchesDesc = test.description.toLowerCase().includes(q);
        const matchesSyllabus = test.syllabus.some((s) => s.toLowerCase().includes(q));
        return matchesTitle || matchesSubtitle || matchesDesc || matchesSyllabus;
      }
      return true;
    });
  }, [selectedSubject, searchQuery]);

  const subjectsList: Array<ExamSubject | 'All'> = [
    'All',
    'Physics',
    'Mathematics',
    'Combined',
  ];

  // Helper for subject icons and accent styles
  const getSubjectMeta = (subject: ExamSubject) => {
    switch (subject) {
      case 'Physics':
        return {
          icon: Atom,
          bg: 'bg-[#a6e1fa]/20',
          border: 'border-[#0e6ba8]/30',
          text: 'text-[#0e6ba8]',
          badgeBg: 'bg-[#a6e1fa]/30 text-[#0e6ba8] border border-[#0e6ba8]/30',
          accentGradient: 'from-[#0e6ba8] to-[#0a2472]',
          cardHover: 'hover:border-[#0e6ba8] hover:shadow-[0_8px_25px_rgb(14,107,168,0.12)]',
        };
      case 'Mathematics':
        return {
          icon: BookOpen,
          bg: 'bg-[#a6e1fa]/15',
          border: 'border-[#0a2472]/30',
          text: 'text-[#0a2472]',
          badgeBg: 'bg-[#a6e1fa]/30 text-[#0a2472] border border-[#0a2472]/30',
          accentGradient: 'from-[#0a2472] to-[#001c55]',
          cardHover: 'hover:border-[#0a2472] hover:shadow-[0_8px_25px_rgb(10,36,114,0.14)]',
        };
      case 'Combined':
      default:
        return {
          icon: Layers,
          bg: 'bg-gradient-to-br from-[#a6e1fa]/30 via-white to-[#d6e4f0]/40',
          border: 'border-[#001c55]/30',
          text: 'text-[#001c55]',
          badgeBg: 'bg-[#001c55]/10 text-[#001c55] border border-[#001c55]/20',
          accentGradient: 'from-[#0a2472] via-[#0e6ba8] to-[#001c55]',
          cardHover: 'hover:border-[#001c55] hover:shadow-[0_8px_25px_rgb(0,28,85,0.15)]',
        };
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTestCard = (test: TestMetadata) => {
    const meta = getSubjectMeta(test.subject);
    const Icon = meta.icon;

    return (
      <div
        key={test.id}
        id={`test-card-${test.id}`}
        className={`bg-white border border-[#d6e4f0] rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all duration-200 ${meta.cardHover}`}
      >
        <div className="space-y-4">
          
          {/* Card Header Badges */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${meta.badgeBg}`}>
                <Icon className="w-3.5 h-3.5" />
                {test.subject}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#f8fbfe] text-[#0a2472] border border-[#d6e4f0]">
                {test.subject === 'Combined' ? 'Physics + Math' : 'MCQ & Numerical'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#a6e1fa]/25 text-[#0e6ba8] border border-[#0e6ba8]/20">
                <Monitor className="w-3 h-3" />
                Desktop Exam
              </span>
              <span className="text-xs font-semibold text-[#536b82]">
                {test.standard}
              </span>
            </div>
          </div>

          {/* Test Title & Subtitle */}
          <div>
            <h3 className="text-lg font-bold text-[#00072d] group-hover:text-[#0a2472] transition-colors">
              {test.title}
            </h3>
            <p className="text-xs font-semibold text-[#0a2472] mt-0.5">
              {test.subtitle}
            </p>
            <p className="text-xs text-[#536b82] mt-2 leading-relaxed">
              {test.description}
            </p>
          </div>

          {/* Syllabus / Topic tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {test.syllabus.slice(0, 4).map((topic, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-[#f8fbfe] border border-[#d6e4f0] text-[11px] font-medium text-[#536b82]"
              >
                {topic}
              </span>
            ))}
            {test.syllabus.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-md bg-[#f8fbfe] text-[10px] font-semibold text-[#536b82] border border-[#d6e4f0]">
                +{test.syllabus.length - 4} more
              </span>
            )}
          </div>

          {/* Metadata Specs Row */}
          <div className="pt-3 border-t border-[#d6e4f0] grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-[#f8fbfe] p-2 rounded-xl border border-[#d6e4f0]">
              <span className="block text-[10px] uppercase font-bold text-[#536b82]">Questions</span>
              <span className="font-extrabold text-[#00072d]">{test.questions.length} Items</span>
            </div>
            <div className="bg-[#f8fbfe] p-2 rounded-xl border border-[#d6e4f0]">
              <span className="block text-[10px] uppercase font-bold text-[#536b82]">Duration</span>
              <span className="font-extrabold text-[#00072d]">{test.durationMinutes} Min</span>
            </div>
            <div className="bg-[#f8fbfe] p-2 rounded-xl border border-[#d6e4f0]">
              <span className="block text-[10px] uppercase font-bold text-[#536b82]">Total Marks</span>
              <span className="font-extrabold text-[#00072d]">{test.totalMarks} Pts</span>
            </div>
          </div>

        </div>

        {/* Card CTA: Start Test (strictly "Start Test") */}
        <div className="pt-6">
          <button
            id={`start-test-btn-${test.id}`}
            onClick={() => handleAttemptTest(test)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#00072d] hover:bg-[#0a2472] text-white transition-all shadow-xs group cursor-pointer"
          >
            <span>Start Test</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fbfe] text-[#00072d] flex flex-col font-sans">
      
      {/* 1. Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#d6e4f0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <QuizDishaLogo size="sm" showTagline={true} />
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => scrollToSection('give-exam-section')}
              className="text-xs sm:text-sm font-medium text-[#536b82] hover:text-[#0a2472] transition-colors cursor-pointer hidden md:inline-block"
            >
              Exams &amp; Tests
            </button>
            <button
              onClick={() => scrollToSection('proctoring-features')}
              className="text-xs sm:text-sm font-medium text-[#536b82] hover:text-[#0a2472] transition-colors cursor-pointer hidden md:inline-block"
            >
              Anti-Cheat Security
            </button>
            <button
              onClick={() => scrollToSection('exam-rules')}
              className="text-xs sm:text-sm font-medium text-[#536b82] hover:text-[#0a2472] transition-colors cursor-pointer hidden md:inline-block"
            >
              Test Guidelines
            </button>

            <button
              id="nav-give-exam-cta"
              onClick={() => scrollToSection('give-exam-section')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#0a2472] hover:bg-[#001c55] text-white shadow-sm shadow-[#0a2472]/20 transition-all cursor-pointer"
            >
              <span>Give Exam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative bg-white border-b border-[#d6e4f0] overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-radial-at-top-right from-[#a6e1fa]/25 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#f8fbfe] border border-[#d6e4f0] text-[#0a2472] text-xs font-bold tracking-wide uppercase">
            Official Standard Mock Papers • 2026 Examination Series
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#00072d] tracking-tight leading-[1.18] max-w-4xl mx-auto">
            Secure Online Assessments <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a2472] via-[#0e6ba8] to-[#001c55]">
              Across Core Subjects
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#536b82] max-w-3xl mx-auto leading-relaxed">
            Practice board-pattern tests across <strong>Physics</strong>, <strong>Mathematics</strong>, and <strong>Combined</strong> assessments. Access certified papers with automated webcam proctoring, strict anti-cheating monitoring, and instant certified PDF performance reports.
          </p>

          {/* Quick Metrics Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#00072d]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0]">
              <BookOpen className="w-4 h-4 text-[#0a2472]" />
              <span>Standardized Test Papers</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0]">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>AI Audio/Video Proctoring</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f8fbfe] border border-[#d6e4f0]">
              <FileText className="w-4 h-4 text-[#0e6ba8]" />
              <span>Instant Certified PDF Report</span>
            </div>
          </div>

          {/* Device Compatibility Notice Banner */}
          <div className="pt-2 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-[#d6e4f0] shadow-xs flex items-start gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#a6e1fa]/30 text-[#0a2472] border border-[#a6e1fa]/40 flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#00072d]">
                    Device Policy: Web Page on Any Device • Test Window on Desktop Only
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#16A34A] border border-[#A7F3D0]">
                    Mobile Browsing Allowed
                  </span>
                </div>
                <p className="text-xs text-[#536b82] leading-relaxed">
                  You can explore syllabus topics, view sample questions, and review past test transcripts on <strong>any mobile phone, tablet, or desktop</strong>. However, the <strong>live examination window strictly requires a desktop or laptop computer</strong> to support full-screen lockdown, continuous webcam proctoring, and microphone monitoring.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-start-exam-btn"
              onClick={() => scrollToSection('give-exam-section')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#0a2472] hover:bg-[#001c55] text-white shadow-lg shadow-[#0a2472]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Tests &amp; Give Exam</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection('proctoring-features')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#f8fbfe] text-[#00072d] border border-[#d6e4f0] transition-all cursor-pointer"
            >
              <span>How Anti-Cheat Works</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. GIVE EXAM SECTION */}
      <section id="give-exam-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        
        {/* Section Title & Description */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a6e1fa]/30 border border-[#a6e1fa] text-[#0a2472] text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Online Examination Center
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#00072d] tracking-tight">
            Available Examination Papers
          </h2>
          <p className="text-sm sm:text-base text-[#536b82]">
            Explore <strong>Class 9</strong> assessments above and <strong>Class 10</strong> assessments below. Select a subject and click 
            <strong> &ldquo;Start Test&rdquo;</strong> to launch the assessment.
          </p>
        </div>

        {/* Device Policy Notice for Give Exam */}
        <div className="max-w-3xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-start gap-3 text-xs text-[#9A3412]">
          <Laptop className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-[#C2410C]">
              Important Examination Notice: Desktop / Laptop Required
            </p>
            <p className="text-[#9A3412] leading-relaxed">
              The web portal opens on all devices. However, the certified test window strictly opens on desktop or laptop computers. Mobile visitors will see a prompt to copy the link and open the exam on PC.
            </p>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white border border-[#d6e4f0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Subject Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#536b82] flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Subject:
            </span>
            {subjectsList.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedSubject === subj
                    ? 'bg-[#0a2472] text-white shadow-xs'
                    : 'bg-[#f8fbfe] text-[#536b82] hover:bg-[#d6e4f0] border border-[#d6e4f0]'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-[#536b82] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g. motion, optics, AP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs rounded-xl bg-[#f8fbfe] border border-[#d6e4f0] focus:outline-hidden focus:border-[#0a2472] focus:bg-white text-[#00072d] transition-all placeholder-[#536b82]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#536b82] hover:text-[#00072d]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 1: CLASS 9 TESTS (KEPT ABOVE) */}
        {/* ================================================================= */}
        <div id="class-9-section" className="space-y-6 pt-2">
          
          {/* Class 9 Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d6e4f0] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a6e1fa]/30 text-[#0a2472] flex items-center justify-center font-extrabold text-sm border border-[#a6e1fa]/40">
                IX
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#00072d]">
                    Class 9 Examination Papers
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#a6e1fa]/30 text-[#0a2472]">
                    {class9Tests.length} Papers
                  </span>
                </div>
                <p className="text-xs text-[#536b82] mt-0.5">
                  Physics, Mathematics &amp; Combined Papers (3 Mins / Question)
                </p>
              </div>
            </div>

            <div className="text-xs text-[#536b82] flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-[#00072d] bg-white px-3 py-1.5 rounded-xl border border-[#d6e4f0] shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[#0e6ba8]" /> 3 Mins Allocated Per Question
              </span>
            </div>
          </div>

          {/* Class 9 Cards Grid */}
          {class9Tests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {class9Tests.map((test) => renderTestCard(test))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#d6e4f0] text-xs text-[#536b82]">
              No Class 9 test papers match your current filters.
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* SECTION 2: CLASS 10 TESTS (BELOW) */}
        {/* ================================================================= */}
        <div id="class-10-section" className="space-y-6 pt-6 border-t-2 border-dashed border-[#d6e4f0]">
          
          {/* Class 10 Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d6e4f0] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0e6ba8]/15 text-[#0e6ba8] flex items-center justify-center font-extrabold text-sm border border-[#0e6ba8]/20">
                X
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#00072d]">
                    Class 10 Examination Papers
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0e6ba8]/15 text-[#0e6ba8]">
                    {class10Tests.length} Papers
                  </span>
                </div>
                <p className="text-xs text-[#536b82] mt-0.5">
                  Physics, Mathematics &amp; Combined Papers (3 Mins / Question)
                </p>
              </div>
            </div>

            <div className="text-xs text-[#536b82] flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-[#00072d] bg-white px-3 py-1.5 rounded-xl border border-[#d6e4f0] shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[#0e6ba8]" /> 3 Mins Allocated Per Question
              </span>
            </div>
          </div>

          {/* Class 10 Cards Grid */}
          {class10Tests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {class10Tests.map((test) => renderTestCard(test))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#d6e4f0] text-xs text-[#536b82]">
              No Class 10 test papers match your current filters.
            </div>
          )}
        </div>

        {/* Global Empty Search State if both are empty */}
        {class9Tests.length === 0 && class10Tests.length === 0 && (
          <div className="bg-white border border-[#d6e4f0] rounded-2xl p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-[#536b82] mx-auto" />
            <h3 className="text-base font-bold text-[#00072d]">No test papers match your search</h3>
            <p className="text-xs text-[#536b82]">Try searching for different keywords or clear the filters.</p>
            <button
              onClick={() => {
                setSelectedSubject('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0a2472] hover:bg-[#001c55] text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* 4. Anti-Cheat Security & Proctoring Highlights */}
      <section id="proctoring-features" className="py-14 bg-white border-y border-[#d6e4f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#16A34A] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Proctoring Assurance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00072d] tracking-tight">
              Rigorous Anti-Cheat Assessment Technology
            </h2>
            <p className="text-xs sm:text-sm text-[#536b82]">
              Every assessment is fortified with automated real-time proctoring safeguards to uphold academic integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-[#d6e4f0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#a6e1fa]/30 text-[#0e6ba8] flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#00072d]">Continuous A/V Surveillance</h3>
              <p className="text-xs text-[#536b82] leading-relaxed">
                Candidate webcam and microphone feeds are monitored throughout the active test session and safely archived for integrity validation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-[#d6e4f0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#00072d]">Fullscreen &amp; Tab-Switch Lock</h3>
              <p className="text-xs text-[#536b82] leading-relaxed">
                Navigating away from the active exam window or exiting fullscreen triggers instant warning strikes. Accumulating 3 strikes auto-terminates the exam.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-[#d6e4f0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#a6e1fa]/30 text-[#0a2472] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#00072d]">Certified PDF Transcript</h3>
              <p className="text-xs text-[#536b82] leading-relaxed">
                Upon completion, a multi-page PDF transcript with full question breakdowns, scoring marks, and integrity audit trails is generated and saved.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Exam Guidelines & Marking Rules */}
      <section id="exam-rules" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00072d] tracking-tight">
            Examination Regulations &amp; Scoring Matrix
          </h2>
          <p className="text-xs sm:text-sm text-[#536b82]">
            Standard competitive scoring scheme designed to reward accuracy and deter random guessing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white border border-[#d6e4f0] shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0a2472] block">Single Choice</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#16A34A]">+4</span>
              <span className="text-sm font-bold text-[#E11D48]">/ -1 Mark</span>
            </div>
            <p className="text-xs text-[#536b82]">
              +4 for the correct choice, -1 negative mark for incorrect choices, 0 if unattempted.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#d6e4f0] shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0a2472] block">Multiple Choice</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#16A34A]">+4</span>
              <span className="text-sm font-bold text-[#E11D48]">/ -2 Marks</span>
            </div>
            <p className="text-xs text-[#536b82]">
              +4 for selecting all correct options without error, -2 for incorrect combinations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#d6e4f0] shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0a2472] block">Numerical Input</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#16A34A]">+4</span>
              <span className="text-sm font-bold text-[#536b82]">/ 0 Marks</span>
            </div>
            <p className="text-xs text-[#536b82]">
              +4 if computed value falls within physical scientific tolerance. Zero penalty for errors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#d6e4f0] shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E11D48] block">3-Strike Policy</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#E11D48]">3 Strikes</span>
            </div>
            <p className="text-xs text-[#536b82]">
              Exiting fullscreen or switching tabs triggers warnings. 3 strikes results in immediate disqualification.
            </p>
          </div>

          {/* Device & Hardware Policy Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#d6e4f0] shadow-xs space-y-2 sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-white via-[#f8fbfe] to-[#a6e1fa]/25">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0a2472]">
              <Monitor className="w-4 h-4" />
              <span>Device &amp; Hardware Policy</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-[#00072d]">Desktop / Laptop Required</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#16A34A] border border-[#A7F3D0]">
                Web Portal Accessible on Any Device
              </span>
            </div>
            <p className="text-xs text-[#536b82] leading-relaxed">
              While you can browse papers and read syllabi on any smartphone or tablet, the certified examination window strictly requires a desktop or laptop computer to enable full-screen security monitoring, continuous webcam surveillance, and microphone noise auditing.
            </p>
          </div>

        </div>

      </section>

      {/* 6. Comprehensive Dark Footer Styled with Prussian Blue & Deep Navy */}
      <footer id="main-portal-footer" className="mt-auto bg-[#00072d] text-[#f8fbfe] border-t border-[#001c55] pt-14 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Main Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Column 1: Brand & Overview (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <QuizDishaLogo size="sm" showTagline={true} inverted={true} />
              <p className="text-xs sm:text-sm text-[#d6e4f0] leading-relaxed">
                QuizDisha is a premier online examination portal for West Bengal Board Class 9 &amp; 10 students. Featuring real-time audiovisual proctoring, standardized marking formulas, and instant certified PDF transcripts.
              </p>
              <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-semibold text-[#a6e1fa]">
                <span className="px-2.5 py-1 rounded-lg bg-[#001c55] border border-[#0a2472] text-[#a6e1fa]">
                  Live Proctoring
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#001c55] border border-[#0a2472] text-[#16A34A]">
                  Certified Transcripts
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#a6e1fa]">
                Quick Navigation
              </h3>
              <ul className="space-y-2.5 text-xs text-[#d6e4f0]">
                <li>
                  <button 
                    onClick={() => scrollToSection('give-exam-section')} 
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Take Online Assessment</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('class-9-section')} 
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Class 9 Mock Tests</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0a2472] text-white">Top Section</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('class-10-section')} 
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Class 10 Mock Tests</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('proctoring-features')} 
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Anti-Cheat &amp; Proctoring Specs</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('exam-rules')} 
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Marking Scheme &amp; Matrix</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Subjects & Curriculum (2 cols) */}
            <div className="lg:col-span-2 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#a6e1fa]">
                Assessment Subjects
              </h3>
              <ul className="space-y-2.5 text-xs text-[#d6e4f0]">
                <li>
                  <button 
                    onClick={() => {
                      setSelectedSubject('Physics');
                      scrollToSection('give-exam-section');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Physics / Physical Science
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSelectedSubject('Mathematics');
                      scrollToSection('give-exam-section');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Mathematics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSelectedSubject('Combined');
                      scrollToSection('give-exam-section');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Combined (Physics &amp; Mathematics)
                  </button>
                </li>
                <li className="text-[#a6e1fa]/70 pt-1 text-[11px]">
                  Instant Certified Key
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Details (Call-to & Mailto features) (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#a6e1fa]">
                Candidate Help Desk
              </h3>
              <p className="text-xs text-[#d6e4f0] leading-relaxed">
                Need assistance with webcam permissions, test registration, or scorecards? Reach our technical team:
              </p>

              <div className="space-y-2 pt-1">
                {/* Phone Call-To Link */}
                <a 
                  href="tel:+916290671032" 
                  id="footer-call-link"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#001c55] hover:bg-[#0a2472] border border-[#0a2472]/60 text-[#f8fbfe] transition-all group cursor-pointer"
                  title="Click to call QuizDisha Help Desk: 6290671032"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold tracking-wide group-hover:text-[#a6e1fa] transition-colors">
                      +91 6290671032
                    </div>
                    <div className="text-[10px] text-[#a6e1fa]/80">
                      Tap to Call (Mon&ndash;Sat 9AM&ndash;8PM IST)
                    </div>
                  </div>
                </a>

                {/* Email Mailto Link */}
                <a 
                  href="mailto:birkrishnendu@gmail.com?subject=QuizDisha%20Candidate%20Support%20Request" 
                  id="footer-email-link"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#001c55] hover:bg-[#0a2472] border border-[#0a2472]/60 text-[#f8fbfe] transition-all group cursor-pointer"
                  title="Click to email birkrishnendu@gmail.com"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0e6ba8]/30 text-[#a6e1fa] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold tracking-wide truncate group-hover:text-[#a6e1fa] transition-colors">
                      birkrishnendu@gmail.com
                    </div>
                    <div className="text-[10px] text-[#a6e1fa]/80">
                      Click to Mail (Direct Inquiries)
                    </div>
                  </div>
                </a>

                {/* Direct Action Buttons */}
                <div className="pt-1 flex items-center gap-2">
                  <a
                    href="tel:+916290671032"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-[#16A34A] hover:bg-[#15803D] text-white transition-colors cursor-pointer shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Support</span>
                  </a>
                  <a
                    href="mailto:birkrishnendu@gmail.com?subject=QuizDisha%20Exam%20Support"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-[#0a2472] hover:bg-[#0e6ba8] text-white transition-colors cursor-pointer shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Desk</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Back to top */}
          <div className="pt-8 border-t border-[#001c55] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a6e1fa]/70">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span>&copy; {new Date().getFullYear()} QuizDisha Online Examination System.</span>
            </div>
            <div className="flex items-center gap-5">
              <button 
                onClick={() => scrollToSection('proctoring-features')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Integrity &amp; Anti-Cheat
              </button>
              <button 
                onClick={() => scrollToSection('exam-rules')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Scoring Scheme
              </button>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#001c55] hover:bg-[#0a2472] text-white transition-colors cursor-pointer font-bold border border-[#0a2472]"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Mobile Device Restriction Modal */}
      <DesktopOnlyModal
        isOpen={isDesktopWarningOpen}
        onClose={() => {
          setIsDesktopWarningOpen(false);
          setSelectedTestForWarning(null);
        }}
        selectedTest={selectedTestForWarning}
        onPreviewInstructions={() => {
          if (selectedTestForWarning) {
            onSelectTest(selectedTestForWarning);
          }
        }}
      />

    </div>
  );
};
