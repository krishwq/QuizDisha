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
  const [selectedStandard, setSelectedStandard] = useState<ExamStandard>('Class 10');
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

  // Filter tests by Standard, Subject, and Search
  const filteredTests = useMemo(() => {
    return EXAM_CATALOG.filter((test) => {
      // 1. Standard filter
      if (test.standard !== selectedStandard) return false;

      // 2. Subject filter
      if (selectedSubject !== 'All' && test.subject !== selectedSubject) return false;

      // 3. Search query filter
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
  }, [selectedStandard, selectedSubject, searchQuery]);

  // Counts for tabs
  const class10Count = useMemo(() => EXAM_CATALOG.filter((t) => t.standard === 'Class 10').length, []);
  const class9Count = useMemo(() => EXAM_CATALOG.filter((t) => t.standard === 'Class 9').length, []);

  const subjectsList: Array<ExamSubject | 'All'> = [
    'All',
    'Physics',
    'Chemistry',
    'Mathematics',
    'All in One',
  ];

  // Helper for subject icons and accent styles
  const getSubjectMeta = (subject: ExamSubject) => {
    switch (subject) {
      case 'Physics':
        return {
          icon: Atom,
          bg: 'bg-[#ECFEFF]',
          border: 'border-[#0891B2]/30',
          text: 'text-[#0891B2]',
          badgeBg: 'bg-[#ECFEFF] text-[#0891B2] border border-[#0891B2]/20',
          accentGradient: 'from-[#0891B2] to-[#4338CA]',
          cardHover: 'hover:border-[#0891B2] hover:shadow-cyan-500/10',
        };
      case 'Chemistry':
        return {
          icon: FlaskConical,
          bg: 'bg-[#DCFCE7]',
          border: 'border-[#16A34A]/30',
          text: 'text-[#16A34A]',
          badgeBg: 'bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20',
          accentGradient: 'from-[#16A34A] to-[#0891B2]',
          cardHover: 'hover:border-[#16A34A] hover:shadow-emerald-500/10',
        };
      case 'Mathematics':
        return {
          icon: BookOpen,
          bg: 'bg-[#EEF2FF]',
          border: 'border-[#4338CA]/30',
          text: 'text-[#4338CA]',
          badgeBg: 'bg-[#EEF2FF] text-[#4338CA] border border-[#4338CA]/20',
          accentGradient: 'from-[#4338CA] to-[#3730A3]',
          cardHover: 'hover:border-[#4338CA] hover:shadow-indigo-500/10',
        };
      case 'All in One':
      default:
        return {
          icon: Layers,
          bg: 'bg-[#FFF7ED]',
          border: 'border-[#F97316]/30',
          text: 'text-[#F97316]',
          badgeBg: 'bg-[#FFF7ED] text-[#F97316] border border-[#F97316]/20',
          accentGradient: 'from-[#F97316] to-[#4338CA]',
          cardHover: 'hover:border-[#F97316] hover:shadow-orange-500/10',
        };
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] flex flex-col font-sans">
      
      {/* 1. Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <QuizDishaLogo size="sm" showTagline={true} />
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => scrollToSection('give-exam-section')}
              className="text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#4338CA] transition-colors cursor-pointer hidden md:inline-block"
            >
              Exams &amp; Tests
            </button>
            <button
              onClick={() => scrollToSection('proctoring-features')}
              className="text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#4338CA] transition-colors cursor-pointer hidden md:inline-block"
            >
              Anti-Cheat Security
            </button>
            <button
              onClick={() => scrollToSection('exam-rules')}
              className="text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#4338CA] transition-colors cursor-pointer hidden md:inline-block"
            >
              Test Guidelines
            </button>

            <button
              id="nav-give-exam-cta"
              onClick={() => scrollToSection('give-exam-section')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#4338CA] hover:bg-[#3730A3] text-white shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <span>Give Exam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative bg-white border-b border-[#E7E5E4] overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-radial-at-top-right from-indigo-50/70 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-[#4338CA] text-xs font-bold tracking-wide uppercase">
            Official Standard Mock Papers • 2026 Examination Series
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight leading-[1.18] max-w-4xl mx-auto">
            Secure Online Assessments <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4338CA] via-[#0891B2] to-[#F97316]">
              Across Core Subjects
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#78716C] max-w-3xl mx-auto leading-relaxed">
            Practice board-pattern tests across <strong>Physics</strong>, <strong>Chemistry</strong>, <strong>Mathematics</strong>, <strong>Aptitude</strong>, <strong>Reasoning</strong>, and many more subjects. Access multiple question sets with automated webcam proctoring, strict anti-cheating monitoring, and instant certified PDF performance reports.
          </p>

          {/* Quick Metrics Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#1C1917]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
              <BookOpen className="w-4 h-4 text-[#4338CA]" />
              <span>16 Standardized Test Papers</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>AI Audio/Video Proctoring</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
              <FileText className="w-4 h-4 text-[#0891B2]" />
              <span>Instant Certified PDF Report</span>
            </div>
          </div>

          {/* Device Compatibility Notice Banner */}
          <div className="pt-2 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs flex items-start gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4338CA] border border-[#EEF2FF] flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#1C1917]">
                    Device Policy: Web Page on Any Device • Test Window on Desktop Only
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#16A34A] border border-[#A7F3D0]">
                    Mobile Browsing Allowed
                  </span>
                </div>
                <p className="text-xs text-[#78716C] leading-relaxed">
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
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#4338CA] hover:bg-[#3730A3] text-white shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Tests &amp; Give Exam</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection('proctoring-features')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#FAFAF9] text-[#1C1917] border border-[#E7E5E4] transition-all cursor-pointer"
            >
              <span>How Anti-Cheat Works</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. GIVE EXAM SECTION */}
      <section id="give-exam-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Section Title & Description */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Select Examination Paper
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            Give Exam — Available Test Papers
          </h2>
          <p className="text-sm sm:text-base text-[#78716C]">
            Choose your standard (Class 10 or Class 9), select a subject or set, and click 
            <strong> &ldquo;Take Test&rdquo;</strong> to start the secure assessment.
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

        {/* Standard Selector Tabs (Class 10 vs Class 9) */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs">
            <button
              id="standard-tab-class-10"
              onClick={() => setSelectedStandard('Class 10')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                selectedStandard === 'Class 10'
                  ? 'bg-[#4338CA] text-white shadow-sm'
                  : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAFAF9]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Class 10 Standard</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedStandard === 'Class 10' ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#78716C]'
              }`}>
                {class10Count} Tests
              </span>
            </button>

            <button
              id="standard-tab-class-9"
              onClick={() => setSelectedStandard('Class 9')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                selectedStandard === 'Class 9'
                  ? 'bg-[#4338CA] text-white shadow-sm'
                  : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAFAF9]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Class 9 Standard</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedStandard === 'Class 9' ? 'bg-white/20 text-white' : 'bg-[#FAFAF9] text-[#78716C]'
              }`}>
                {class9Count} Tests
              </span>
            </button>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Subject Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#78716C] flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Subject:
            </span>
            {subjectsList.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedSubject === subj
                    ? 'bg-[#4338CA] text-white shadow-xs'
                    : 'bg-[#FAFAF9] text-[#78716C] hover:bg-[#E7E5E4] border border-[#E7E5E4]'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g. optics, acids, AP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] focus:outline-hidden focus:border-[#4338CA] focus:bg-white text-[#1C1917] transition-all placeholder-[#78716C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#78716C] hover:text-[#1C1917]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Active Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredTests.map((test) => {
            const meta = getSubjectMeta(test.subject);
            const Icon = meta.icon;

            return (
              <div
                key={test.id}
                id={`test-card-${test.id}`}
                className={`bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all duration-200 ${meta.cardHover}`}
              >
                <div className="space-y-4">
                  
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${meta.badgeBg}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {test.subject}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-[#FAFAF9] text-[#1C1917] border border-[#E7E5E4]">
                        Set {test.setNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ECFEFF] text-[#0891B2] border border-[#0891B2]/20">
                        <Monitor className="w-3 h-3" />
                        Desktop Exam
                      </span>
                      <span className="text-xs font-semibold text-[#78716C]">
                        {test.standard}
                      </span>
                    </div>
                  </div>

                  {/* Test Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-bold text-[#1C1917] group-hover:text-[#4338CA] transition-colors">
                      {test.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#4338CA] mt-0.5">
                      {test.subtitle}
                    </p>
                    <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                      {test.description}
                    </p>
                  </div>

                  {/* Syllabus / Topic tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {test.syllabus.slice(0, 4).map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#FAFAF9] border border-[#E7E5E4] text-[11px] font-medium text-[#78716C]"
                      >
                        {topic}
                      </span>
                    ))}
                    {test.syllabus.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-[#FAFAF9] text-[10px] font-semibold text-[#78716C] border border-[#E7E5E4]">
                        +{test.syllabus.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Metadata Specs Row */}
                  <div className="pt-3 border-t border-[#E7E5E4] grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-[#FAFAF9] p-2 rounded-xl border border-[#E7E5E4]">
                      <span className="block text-[10px] uppercase font-bold text-[#78716C]">Questions</span>
                      <span className="font-extrabold text-[#1C1917]">{test.questions.length} Items</span>
                    </div>
                    <div className="bg-[#FAFAF9] p-2 rounded-xl border border-[#E7E5E4]">
                      <span className="block text-[10px] uppercase font-bold text-[#78716C]">Duration</span>
                      <span className="font-extrabold text-[#1C1917]">{test.durationMinutes} Min</span>
                    </div>
                    <div className="bg-[#FAFAF9] p-2 rounded-xl border border-[#E7E5E4]">
                      <span className="block text-[10px] uppercase font-bold text-[#78716C]">Total Marks</span>
                      <span className="font-extrabold text-[#1C1917]">{test.totalMarks} Pts</span>
                    </div>
                  </div>

                </div>

                {/* Card CTA: Take Test */}
                <div className="pt-6">
                  <button
                    id={`start-test-btn-${test.id}`}
                    onClick={() => handleAttemptTest(test)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#1C1917] hover:bg-[#4338CA] text-white transition-all shadow-xs group cursor-pointer"
                  >
                    <span>Give Exam: {test.subject} (Set {test.setNumber})</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredTests.length === 0 && (
          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-[#78716C] mx-auto" />
            <h3 className="text-base font-bold text-[#1C1917]">No test papers match your search</h3>
            <p className="text-xs text-[#78716C]">Try searching for different keywords or clear the filters.</p>
            <button
              onClick={() => {
                setSelectedSubject('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#4338CA] hover:bg-[#3730A3] text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* 4. Anti-Cheat Security & Proctoring Highlights */}
      <section id="proctoring-features" className="py-14 bg-white border-y border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#16A34A] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Proctoring Assurance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
              Rigorous Anti-Cheat Assessment Technology
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C]">
              Every assessment is fortified with automated real-time proctoring safeguards to uphold academic integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#ECFEFF] text-[#0891B2] flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1C1917]">Continuous A/V Surveillance</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Candidate webcam and microphone feeds are monitored throughout the active test session and safely archived for integrity validation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1C1917]">Fullscreen &amp; Tab-Switch Lock</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Navigating away from the active exam window or exiting fullscreen triggers instant warning strikes. Accumulating 3 strikes auto-terminates the exam.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1C1917]">Certified PDF Transcript</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Upon completion, a multi-page PDF transcript with full question breakdowns, scoring marks, and integrity audit trails is generated and saved.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Exam Guidelines & Marking Rules */}
      <section id="exam-rules" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
            Examination Regulations &amp; Scoring Matrix
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C]">
            Standard competitive scoring scheme designed to reward accuracy and deter random guessing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4338CA] block">Single Choice</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#16A34A]">+4</span>
              <span className="text-sm font-bold text-[#E11D48]">/ -1 Mark</span>
            </div>
            <p className="text-xs text-[#78716C]">
              +4 for the correct choice, -1 negative mark for incorrect choices, 0 if unattempted.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4338CA] block">Multiple Choice</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#16A34A]">+4</span>
              <span className="text-sm font-bold text-[#E11D48]">/ -2 Marks</span>
            </div>
            <p className="text-xs text-[#78716C]">
              +4 for selecting all correct options without error, -2 for incorrect combinations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4338CA] block">Numerical Input</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#16A34A]">+4</span>
              <span className="text-sm font-bold text-[#78716C]">/ 0 Marks</span>
            </div>
            <p className="text-xs text-[#78716C]">
              +4 if computed value falls within physical scientific tolerance. Zero penalty for errors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E11D48] block">3-Strike Policy</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#E11D48]">3 Strikes</span>
            </div>
            <p className="text-xs text-[#78716C]">
              Exiting fullscreen or switching tabs triggers warnings. 3 strikes results in immediate disqualification.
            </p>
          </div>

          {/* Device & Hardware Policy Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-2 sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-white via-[#FAFAF9] to-[#EEF2FF]/40">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4338CA]">
              <Monitor className="w-4 h-4" />
              <span>Device &amp; Hardware Policy</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-[#1C1917]">Desktop / Laptop Required</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#16A34A] border border-[#A7F3D0]">
                Web Portal Accessible on Any Device
              </span>
            </div>
            <p className="text-xs text-[#78716C] leading-relaxed">
              While you can browse papers and read syllabi on any smartphone or tablet, the certified examination window strictly requires a desktop or laptop computer to enable full-screen security monitoring, continuous webcam surveillance, and microphone noise auditing.
            </p>
          </div>

        </div>

      </section>

      {/* 6. Comprehensive Dark Footer */}
      <footer id="main-portal-footer" className="mt-auto bg-[#1C1917] text-[#FAFAF9] border-t border-[#292524] pt-14 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Main Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Column 1: Brand & Overview (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <QuizDishaLogo size="sm" showTagline={true} inverted={true} />
              <p className="text-xs sm:text-sm text-[#D6D3D1] leading-relaxed">
                QuizDisha is a premier online examination portal for West Bengal Board Class 9 &amp; 10 students. Featuring real-time audiovisual proctoring, standardized marking formulas, and instant certified PDF transcripts.
              </p>
              <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-semibold text-[#A8A29E]">
                <span className="px-2.5 py-1 rounded-lg bg-[#292524] border border-[#44403C] text-[#38BDF8]">
                  Live Proctoring
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#292524] border border-[#44403C] text-[#16A34A]">
                  Certified Transcripts
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">
                Quick Navigation
              </h3>
              <ul className="space-y-2.5 text-xs text-[#D6D3D1]">
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
                    onClick={() => {
                      setSelectedStandard('Class 10');
                      scrollToSection('give-exam-section');
                    }} 
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Class 10 Mock Tests</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4338CA] text-white">Active</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSelectedStandard('Class 9');
                      scrollToSection('give-exam-section');
                    }} 
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Class 9 Mock Tests</span>
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">
                Assessment Subjects
              </h3>
              <ul className="space-y-2.5 text-xs text-[#D6D3D1]">
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
                      setSelectedSubject('Chemistry');
                      scrollToSection('give-exam-section');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Chemistry / Physical Science
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
                      setSelectedSubject('All in One');
                      scrollToSection('give-exam-section');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    All in One Combined Tests
                  </button>
                </li>
                <li className="text-[#A8A29E] pt-1 text-[11px]">
                  Instant Certified Key
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Details (Call-to & Mailto features) (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">
                Candidate Help Desk
              </h3>
              <p className="text-xs text-[#D6D3D1] leading-relaxed">
                Need assistance with webcam permissions, test registration, or scorecards? Reach our technical team:
              </p>

              <div className="space-y-2 pt-1">
                {/* Phone Call-To Link */}
                <a 
                  href="tel:+916290671032" 
                  id="footer-call-link"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#292524] hover:bg-[#44403C] border border-[#44403C] text-[#FAFAF9] transition-all group cursor-pointer"
                  title="Click to call QuizDisha Help Desk: 6290671032"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold tracking-wide group-hover:text-[#38BDF8] transition-colors">
                      +91 6290671032
                    </div>
                    <div className="text-[10px] text-[#A8A29E]">
                      Tap to Call (Mon&ndash;Sat 9AM&ndash;8PM IST)
                    </div>
                  </div>
                </a>

                {/* Email Mailto Link */}
                <a 
                  href="mailto:birkrishnendu@gmail.com?subject=QuizDisha%20Candidate%20Support%20Request" 
                  id="footer-email-link"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#292524] hover:bg-[#44403C] border border-[#44403C] text-[#FAFAF9] transition-all group cursor-pointer"
                  title="Click to email birkrishnendu@gmail.com"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#4338CA]/30 text-[#818CF8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold tracking-wide truncate group-hover:text-[#38BDF8] transition-colors">
                      birkrishnendu@gmail.com
                    </div>
                    <div className="text-[10px] text-[#A8A29E]">
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
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-[#4338CA] hover:bg-[#3730A3] text-white transition-colors cursor-pointer shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Desk</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Back to top */}
          <div className="pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A29E]">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#292524] hover:bg-[#44403C] text-white transition-colors cursor-pointer font-bold"
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
