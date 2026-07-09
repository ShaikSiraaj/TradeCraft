import React, { useState, useEffect, useRef } from 'react';
import { modules, glossary } from './data/lessons';
import Simulator from './components/Simulator';
import Quiz from './components/Quiz';
import Calculators from './components/Calculators';
import Glossary from './components/Glossary';
import {
  BookOpen,
  TrendingUp,
  Award,
  BookMarked,
  Sun,
  Moon,
  CheckCircle,
  Play,
  Menu,
  X,
  Search,
  DollarSign
} from 'lucide-react';

const INITIAL_BALANCE = 100000;

function App() {
  // Theme & Layout state
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons', 'simulator', 'glossary'

  // Lesson & Progress state
  const [selectedLessonId, setSelectedLessonId] = useState('lesson-1-1');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]); // Array of lessonIds with completed quizzes
  const [badges, setBadges] = useState([]);

  // Simulator state
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [portfolio, setPortfolio] = useState([]); // Array of { ticker, avgPrice, quantity }
  const [trades, setTrades] = useState([]); // Array of { id, ticker, type, shares, price, time, total }
  const [currentPrices, setCurrentPrices] = useState({
    AAPL: 175.50,
    MSFT: 420.20,
    TSLA: 180.80,
    AMZN: 178.40,
    NVDA: 875.00,
    BTC: 65000.00
  });

  // Track state of current lesson object
  const currentLesson = modules.flatMap(m => m.lessons).find(l => l.id === selectedLessonId) || modules[0].lessons[0];

  // Load state from localStorage on mount (if available)
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('tradecraft_darkmode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    }

    const savedProgress = localStorage.getItem('tradecraft_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (parsed.completedLessons) setCompletedLessons(parsed.completedLessons);
        if (parsed.completedQuizzes) setCompletedQuizzes(parsed.completedQuizzes);
        if (parsed.badges) setBadges(parsed.badges);
        if (parsed.balance) setBalance(parsed.balance);
        if (parsed.portfolio) setPortfolio(parsed.portfolio);
        if (parsed.trades) setTrades(parsed.trades);
      } catch (e) {
        console.error("Failed to parse progress:", e);
      }
    }
  }, []);

  // Save progress state to localStorage
  useEffect(() => {
    localStorage.setItem('tradecraft_progress', JSON.stringify({
      completedLessons,
      completedQuizzes,
      badges,
      balance,
      portfolio,
      trades
    }));
  }, [completedLessons, completedQuizzes, badges, balance, portfolio, trades]);

  // Handle Dark mode class toggle
  useEffect(() => {
    localStorage.setItem('tradecraft_darkmode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Live Price Tick Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrices(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(ticker => {
          const changePercent = (Math.random() - 0.5) * 0.004; // max +/- 0.2% tick
          updated[ticker] = parseFloat((updated[ticker] * (1 + changePercent)).toFixed(2));
        });
        return updated;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Badge logic
  useEffect(() => {
    const newBadges = [...badges];

    // Badge 1: Quick Learner - complete first lesson
    if (completedLessons.length >= 1 && !newBadges.includes('Quick Learner')) {
      newBadges.push('Quick Learner');
    }
    // Badge 2: Quiz Master - pass any quiz
    if (completedQuizzes.length >= 1 && !newBadges.includes('Quiz Master')) {
      newBadges.push('Quiz Master');
    }
    // Badge 3: Master of All - complete all lessons
    const totalLessons = modules.flatMap(m => m.lessons).length;
    if (completedLessons.length === totalLessons && !newBadges.includes('Master of All')) {
      newBadges.push('Master of All');
    }
    // Badge 4: First Trade - execute any transaction
    if (trades.length >= 1 && !newBadges.includes('First Trade')) {
      newBadges.push('First Trade');
    }
    // Badge 5: High Roller - make a profit and cross $105k
    if (balance > INITIAL_BALANCE * 1.05 && !newBadges.includes('High Roller')) {
      newBadges.push('High Roller');
    }

    if (newBadges.length !== badges.length) {
      setBadges(newBadges);
    }
  }, [completedLessons, completedQuizzes, trades, balance, badges]);

  const handleCompleteLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  const handleCompleteQuiz = (lessonId) => {
    if (!completedQuizzes.includes(lessonId)) {
      setCompletedQuizzes(prev => [...prev, lessonId]);
    }
  };

  // Calculate Progress Percentage
  const totalLessons = modules.flatMap(m => m.lessons).length;
  const progressPercent = Math.round(((completedLessons.length + completedQuizzes.length) / (totalLessons * 2)) * 100);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur flex-none transition-colors duration-500 bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              TradeCraft
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              W3Schools for Trading
            </span>
          </div>

          {/* Center Tabs */}
          <nav className="hidden md:flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'lessons' ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Lessons</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'simulator' ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'glossary' ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span className="flex items-center gap-1.5"><BookMarked className="w-4 h-4" /> Glossary</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Progress */}
            <div className="hidden sm:flex flex-col items-end text-xs font-semibold mr-2">
              <span className="text-slate-500 dark:text-slate-400">Total Progress: {progressPercent}%</span>
              <div className="w-24 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-full" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm pt-16 flex flex-col">
          <div className={`p-6 space-y-4 shadow-xl border-b ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-around bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => { setActiveTab('lessons'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-center text-sm font-semibold rounded ${activeTab === 'lessons' ? 'bg-white dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 shadow' : 'text-slate-500'}`}
              >
                Lessons
              </button>
              <button
                onClick={() => { setActiveTab('simulator'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-center text-sm font-semibold rounded ${activeTab === 'simulator' ? 'bg-white dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 shadow' : 'text-slate-500'}`}
              >
                Simulator
              </button>
              <button
                onClick={() => { setActiveTab('glossary'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-center text-sm font-semibold rounded ${activeTab === 'glossary' ? 'bg-white dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 shadow' : 'text-slate-500'}`}
              >
                Glossary
              </button>
            </div>

            {/* Mobile Progress */}
            <div className="pt-2">
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-full" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            {/* Badges Display */}
            {badges.length > 0 && (
              <div className="pt-2">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">My Achievements</span>
                <div className="flex flex-wrap gap-2">
                  {badges.map(badge => (
                    <span key={badge} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Dashboard */}
      <main className="flex-1 flex overflow-hidden">

        {/* VIEW 1: LESSONS & SIDEBAR READER (3-Panel Layout) */}
        {activeTab === 'lessons' && (
          <div className="flex-1 flex overflow-hidden w-full">

            {/* Panel 1 (Left): Course Syllabus Navigation */}
            <aside className="hidden lg:block w-80 flex-none border-r border-slate-200 dark:border-slate-800 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/20">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Course Modules</h2>
                  <div className="space-y-4">
                    {modules.map(module => (
                      <div key={module.id} className="space-y-1">
                        <div className="font-bold text-sm text-slate-700 dark:text-slate-300">{module.title}</div>
                        <p className="text-xs text-slate-500 mb-2">{module.description}</p>
                        <div className="space-y-1 pl-2">
                          {module.lessons.map(lesson => {
                            const isSelected = lesson.id === selectedLessonId;
                            const isCompleted = completedLessons.includes(lesson.id);
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => setSelectedLessonId(lesson.id)}
                                className={`w-full text-left flex items-center justify-between p-2 rounded-lg text-sm transition font-medium ${isSelected ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'}`}
                              >
                                <span className="truncate pr-2">{lesson.title}</span>
                                {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements / Badges Panel */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-500" /> Unlocked Badges
                  </h3>
                  {badges.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">Complete lessons and trades to earn beautiful badges!</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      {badges.map(badge => (
                        <div key={badge} className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-lg">
                          <div className="p-1.5 bg-amber-100 dark:bg-amber-950/40 rounded-full">
                            <Award className="w-4 h-4 text-amber-500" />
                          </div>
                          <div>
                            <div className="text-xs font-bold">{badge}</div>
                            <div className="text-[10px] text-slate-500">Achievement Unlocked</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Panel 2 (Center): Active Lesson Reader */}
            <article className="flex-1 overflow-y-auto px-4 py-8 sm:p-8 lg:p-12">
              <div className="max-w-3xl mx-auto space-y-8">

                {/* Mobile syllabus picker dropdown */}
                <div className="lg:hidden bg-slate-100 dark:bg-slate-800 p-4 rounded-xl space-y-2">
                  <label htmlFor="lesson-selector" className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Select Lesson</label>
                  <select
                    id="lesson-selector"
                    value={selectedLessonId}
                    onChange={(e) => setSelectedLessonId(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm"
                  >
                    {modules.map(module => (
                      <optgroup key={module.id} label={module.title}>
                        {module.lessons.map(lesson => (
                          <option key={lesson.id} value={lesson.id}>
                            {lesson.title} {completedLessons.includes(lesson.id) ? '✓' : ''}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Lesson Header */}
                <div className="space-y-3">
                  <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                    Lesson {currentLesson.id.replace('lesson-', '').replace('-', '.')}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {currentLesson.title}
                  </h1>
                  <p className="text-lg text-slate-500 dark:text-slate-400">
                    {currentLesson.summary}
                  </p>
                </div>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* Rich Content Material */}
                <section
                  className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6"
                  dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                />

                {/* Embedded Calculators & Mini Games (W3Schools Practice Widget) */}
                {currentLesson.hasCalculator && (
                  <section className="mt-8 border border-indigo-200 dark:border-indigo-900 bg-indigo-50/20 dark:bg-indigo-950/10 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-6 h-6 text-indigo-500" />
                      <h3 className="text-lg font-bold">Interactive Practice Tool</h3>
                    </div>
                    <Calculators type={currentLesson.hasCalculator} />
                  </section>
                )}

                {/* Action Controls to Mark Complete */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 rounded-xl mt-8">
                  <div>
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-300">Finished reading the lesson?</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Mark it complete to update your overall progress tracking!</p>
                  </div>
                  <button
                    onClick={() => handleCompleteLesson(currentLesson.id)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-1.5 ${completedLessons.includes(currentLesson.id) ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100'}`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {completedLessons.includes(currentLesson.id) ? 'Completed ✓' : 'Mark as Complete'}
                  </button>
                </div>

                {/* Interactive Quiz Module */}
                {currentLesson.quiz && (
                  <section className="mt-12 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                      <div>
                        <h3 className="text-xl font-bold">Practice Quiz</h3>
                        <p className="text-xs text-slate-500">Test your understanding immediately (W3Schools style!)</p>
                      </div>
                      {completedQuizzes.includes(currentLesson.id) && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-bold rounded-full">
                          Passed ✓
                        </span>
                      )}
                    </div>

                    <Quiz
                      lessonId={currentLesson.id}
                      quiz={currentLesson.quiz}
                      onPassed={() => handleCompleteQuiz(currentLesson.id)}
                    />
                  </section>
                )}

              </div>
            </article>

            {/* Panel 3 (Right): Side Stock Simulator Bar (Instant Practice) */}
            <aside className="hidden xl:block w-96 flex-none border-l border-slate-200 dark:border-slate-800 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Trading</h3>
                  <button
                    onClick={() => setActiveTab('simulator')}
                    className="text-xs text-indigo-500 font-bold hover:underline"
                  >
                    Open Full Simulator &rarr;
                  </button>
                </div>

                {/* Embedded Live Simulator widget */}
                <Simulator
                  isWidget={true}
                  balance={balance}
                  setBalance={setBalance}
                  portfolio={portfolio}
                  setPortfolio={setPortfolio}
                  trades={trades}
                  setTrades={setTrades}
                  currentPrices={currentPrices}
                />
              </div>
            </aside>

          </div>
        )}

        {/* VIEW 2: FULL STOCK SIMULATOR SCREEN */}
        {activeTab === 'simulator' && (
          <div className="flex-1 overflow-y-auto px-4 py-8 sm:p-8 lg:p-12">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
                    <TrendingUp className="w-8 h-8 text-emerald-500" /> Stock Trading Simulator
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    Practice trading with $100,000 of mock capital in real-time. Feel the market ticking!
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reset your virtual balance, portfolio, and transaction history?")) {
                        setBalance(INITIAL_BALANCE);
                        setPortfolio([]);
                        setTrades([]);
                        const newBadges = badges.filter(b => b !== 'High Roller' && b !== 'First Trade');
                        setBadges(newBadges);
                      }
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition"
                  >
                    Reset Account
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Simulator Content */}
                <div className="lg:col-span-3">
                  <Simulator
                    isWidget={false}
                    balance={balance}
                    setBalance={setBalance}
                    portfolio={portfolio}
                    setPortfolio={setPortfolio}
                    trades={trades}
                    setTrades={setTrades}
                    currentPrices={currentPrices}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: GLOSSARY TERMS DICTIONARY */}
        {activeTab === 'glossary' && (
          <div className="flex-1 overflow-y-auto px-4 py-8 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <Glossary glossaryList={glossary} />
            </div>
          </div>
        )}

      </main>

      {/* Footer Disclaimer */}
      <footer className="py-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 bg-white dark:bg-slate-900">
        <p>&copy; {new Date().getFullYear()} TradeCraft Edu. For educational purposes only. No real money or real assets are used.</p>
      </footer>

    </div>
  );
}

export default App;
