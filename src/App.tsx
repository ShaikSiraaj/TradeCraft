import { useState, useEffect } from 'react';
import { Award, X, Sparkles, BookOpen } from 'lucide-react';
import { UserProgress } from './types';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import DashboardView from './components/DashboardView';
import Lesson1View from './components/Lesson1View';
import Lesson17View from './components/Lesson17View';
import Lesson18View from './components/Lesson18View';
import Lesson19View from './components/Lesson19View';
import Lesson20View from './components/Lesson20View';
import LessonGenericView from './components/LessonGenericView';
import { lessonsData } from './data/lessonsData';

export default function App() {
  // Main app states
  const [currentScreen, setCurrentScreen] = useState<string>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  // User details & progress state (Starts at 16 completed lessons (~59% progress), completing remaining lessons unlocks certificate!)
  const [progress, setProgress] = useState<UserProgress>({
    name: 'Alex',
    avatarUrl: 'https://lh3.googleusercontent.com/a/default-user=s120',
    overallProgress: 59,
    completedLessonIds: [
      'lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6',
      'lesson-7', 'lesson-8', 'lesson-9', 'lesson-10', 'lesson-11', 'lesson-12',
      'lesson-13', 'lesson-14', 'lesson-15', 'lesson-16'
    ], // Fundamental baseline lessons completed
    balance: 100000.00, // Simulated sandbox cash
    portfolioShares: {
      AAPL: 50,
      COF: 10
    }
  });

  // Calculate dynamic progress percentage based on completed lessons
  useEffect(() => {
    const totalLessons = 27;
    const calculated = Math.min(100, Math.round((progress.completedLessonIds.length / totalLessons) * 100));

    setProgress(prev => ({
      ...prev,
      overallProgress: calculated
    }));

    // Auto-trigger certificate modal if they reach 100% completion!
    if (calculated >= 100 && !showCertModal) {
      setTimeout(() => {
        setShowCertModal(true);
      }, 400);
    }
  }, [progress.completedLessonIds]);

  const handleLessonComplete = (lessonId: string) => {
    if (!progress.completedLessonIds.includes(lessonId)) {
      setProgress(prev => ({
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId]
      }));
    }
  };

  const handleGetCertified = () => {
    if (progress.overallProgress < 100) {
      alert(`Certification Requirements:\n\nYou must complete all curriculum lessons first. Current Progress: ${progress.overallProgress}%`);
    } else {
      setShowCertModal(true);
    }
  };

  // Lessons list metadata for search filtering
  const allLessons = lessonsData.map(l => ({
    id: l.id,
    title: l.title,
    description: l.description,
    screen: l.id
  }));

  const filteredLessons = searchQuery
    ? allLessons.filter(l =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div id="tradecraft-app-wrapper" className="min-h-screen bg-background-soft flex flex-col font-sans select-none overflow-x-hidden relative">
      {/* Immersive UI glow elements */}
      <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,#1e1b4b_0%,transparent_70%)] top-[-200px] left-[-200px] opacity-60 filter blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,#312e81_0%,transparent_70%)] bottom-[-100px] right-[-100px] opacity-50 filter blur-[100px] pointer-events-none z-0"></div>

      {/* Top Header */}
      <div className="relative z-10 w-full">
        <TopNavBar
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          progress={progress}
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onSearchQuery={setSearchQuery}
        />
      </div>

      {/* Main Split Layout */}
      <div className="flex-grow flex relative z-10">
        {/* Left Desktop Sidebar */}
        <Sidebar
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          progress={progress}
          onGetCertified={handleGetCertified}
        />

        {/* Mobile Slide-out Menu Overlay Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-drawer-overlay"
            className="fixed inset-0 bg-market-navy/40 backdrop-blur-xs z-50 md:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              id="mobile-drawer-content"
              className="absolute top-0 left-0 w-80 h-full bg-white p-6 shadow-2xl space-y-6 flex flex-col overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="font-headline text-lg font-bold text-market-navy">Menu Navigation</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Profile Block */}
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                  <img src={progress.avatarUrl} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold text-market-navy">Alex (Academy Student)</h4>
                  <p className="text-[10px] text-slate-500">{progress.overallProgress}% Syllabus Complete</p>
                </div>
              </div>

              {/* Navigation lists */}
              <nav className="space-y-1.5 flex-grow overflow-y-auto max-h-[60vh] custom-scrollbar">
                <button
                  onClick={() => { setCurrentScreen('overview'); setIsMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-headline text-sm font-bold flex items-center gap-3 cursor-pointer ${
                    currentScreen === 'overview' ? 'bg-success-light text-growth-green' : 'text-market-navy hover:bg-slate-50'
                  }`}
                >
                  Overview Dashboard
                </button>

                <p className="font-headline text-[10px] uppercase font-bold text-slate-400 tracking-wider pt-4 px-4 pb-1">Academy Syllabus</p>

                {lessonsData.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => { setCurrentScreen(lesson.id); setIsMobileMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 rounded-lg font-sans text-xs font-semibold flex items-center gap-3 cursor-pointer ${
                      currentScreen === lesson.id ? 'bg-success-light text-growth-green font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    L{lesson.number}: {lesson.title}
                  </button>
                ))}
              </nav>

              <button
                onClick={() => { handleGetCertified(); setIsMobileMenuOpen(false); }}
                className="w-full bg-growth-green text-white font-headline text-xs font-bold py-3 rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Sparkles className="w-4 h-4" />
                Get Certified
              </button>
            </div>
          </div>
        )}

        {/* Primary Screen View Stage Area */}
        <main id="primary-view-stage" className="flex-grow p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* Quick Search Overlay Results banner if they search */}
          {searchQuery && (
            <div className="mb-6 bg-white border border-slate-200 rounded-xl p-4 space-y-3 animate-fade-in shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-headline text-xs font-bold text-slate-500 uppercase">Search Matches ({filteredLessons.length})</span>
                <button onClick={() => setSearchQuery('')} className="text-xs text-slate-400 hover:underline">Clear Search</button>
              </div>
              {filteredLessons.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {filteredLessons.map(l => (
                    <button
                      key={l.id}
                      onClick={() => { setCurrentScreen(l.screen); setSearchQuery(''); }}
                      className="w-full text-left py-2.5 hover:bg-slate-50 rounded px-2 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <BookOpen className="w-4 h-4 text-growth-green" />
                      <div>
                        <p className="font-headline text-sm font-bold text-market-navy group-hover:text-growth-green">{l.title}</p>
                        <p className="font-sans text-xs text-slate-400">{l.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="font-sans text-xs text-slate-400">No matching lessons found. Type "Stocks", "Short", "Orders", or "Volume".</p>
              )}
            </div>
          )}

          {/* Conditional Screen Rendering */}
          {currentScreen === 'overview' && (
            <DashboardView
              progress={progress}
              setCurrentScreen={setCurrentScreen}
            />
          )}

          {currentScreen === 'lesson-1' && (
            <Lesson1View
              onPrev={() => setCurrentScreen('overview')}
              onNext={() => setCurrentScreen('lesson-2')}
              onLessonComplete={handleLessonComplete}
              isCompleted={progress.completedLessonIds.includes('lesson-1')}
            />
          )}

          {currentScreen === 'lesson-17' && (
            <Lesson17View
              onPrev={() => setCurrentScreen('lesson-16')}
              onNext={() => setCurrentScreen('lesson-18')}
              onLessonComplete={handleLessonComplete}
              isCompleted={progress.completedLessonIds.includes('lesson-17')}
            />
          )}

          {currentScreen === 'lesson-18' && (
            <Lesson18View
              onPrev={() => setCurrentScreen('lesson-17')}
              onNext={() => setCurrentScreen('lesson-19')}
              onLessonComplete={handleLessonComplete}
              isCompleted={progress.completedLessonIds.includes('lesson-18')}
              progress={progress}
              setProgress={setProgress}
            />
          )}

          {currentScreen === 'lesson-19' && (
            <Lesson19View
              onPrev={() => setCurrentScreen('lesson-18')}
              onNext={() => setCurrentScreen('lesson-20')}
              onLessonComplete={handleLessonComplete}
              isCompleted={progress.completedLessonIds.includes('lesson-19')}
            />
          )}

          {currentScreen === 'lesson-20' && (
            <Lesson20View
              onPrev={() => setCurrentScreen('lesson-19')}
              onFinish={() => setCurrentScreen('lesson-21')}
              onLessonComplete={handleLessonComplete}
              isCompleted={progress.completedLessonIds.includes('lesson-20')}
            />
          )}

          {/* Dynamic rendering of other 22 lessons */}
          {currentScreen.startsWith('lesson-') &&
           !['lesson-1', 'lesson-17', 'lesson-18', 'lesson-19', 'lesson-20'].includes(currentScreen) && (() => {
             const matchedLesson = lessonsData.find(l => l.id === currentScreen);
             if (!matchedLesson) return null;
             return (
               <LessonGenericView
                 lesson={matchedLesson}
                 onPrev={() => {
                   if (matchedLesson.number === 1) {
                     setCurrentScreen('overview');
                   } else {
                     setCurrentScreen(`lesson-${matchedLesson.number - 1}`);
                   }
                 }}
                 onNext={() => {
                   if (matchedLesson.number === 27) {
                     setCurrentScreen('overview');
                   } else {
                     setCurrentScreen(`lesson-${matchedLesson.number + 1}`);
                   }
                 }}
                 onLessonComplete={handleLessonComplete}
                 isCompleted={progress.completedLessonIds.includes(matchedLesson.id)}
               />
             );
           })()}
        </main>
      </div>

      {/* Graduation Certificate Earned Modal */}
      {showCertModal && (
        <div
          id="certificate-modal-overlay"
          className="fixed inset-0 bg-market-navy/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowCertModal(false)}
        >
          <div
            id="certificate-modal-container"
            className="bg-white border-4 border-double border-growth-green rounded-2xl max-w-lg w-full p-8 text-center relative shadow-2xl animate-scale-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Elegant corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-growth-green"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-growth-green"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-growth-green"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-growth-green"></div>

            <button
              onClick={() => setShowCertModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 pt-4">
              <div className="w-20 h-20 rounded-full bg-success-light border border-emerald-200 mx-auto flex items-center justify-center text-growth-green animate-bounce">
                <Award className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <p className="font-headline text-[10px] font-bold text-growth-green uppercase tracking-widest">Trade Craft Academy Graduation</p>
                <h3 className="font-headline text-2xl font-bold text-market-navy">Certificate of Excellence</h3>
                <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto">This certifies that</p>
                <h4 className="font-headline text-xl font-bold text-growth-green border-b border-dashed border-slate-200 pb-2 max-w-xs mx-auto">
                  {progress.name}
                </h4>
                <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto leading-relaxed pt-2">
                  has successfully passed all 27 curriculum milestones, completed live-market order book simulation queues, and formulated a written risk-disciplined Trading Plan.
                </p>
              </div>

              {/* Stamp / verification */}
              <div className="flex justify-between items-center max-w-xs mx-auto pt-4 text-left border-t border-slate-100">
                <div>
                  <p className="text-[9px] font-mono uppercase text-slate-400 font-bold">Verification Hash</p>
                  <p className="text-[10px] font-mono text-slate-600 font-bold">TC-MASTER-ALEX-100</p>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-growth-green/50 flex items-center justify-center text-[10px] font-headline font-bold text-growth-green rotate-12 select-none uppercase tracking-wider">
                  Verified
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert("Simulating PDF Generation... Downloading completed Certificate.")}
                  className="w-full bg-growth-green hover:bg-opacity-95 text-white font-headline text-xs font-bold uppercase tracking-wider py-3 rounded-lg shadow cursor-pointer active:scale-95 transition-all"
                >
                  Download Print-Ready PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
