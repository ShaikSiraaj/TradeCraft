import {
  TrendingUp,
  Clock,
  Award,
  ChevronRight,
  BookOpen,
  CandlestickChart,
  Globe,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { UserProgress, MarketTicker, Certificate } from '../types';

interface DashboardViewProps {
  progress: UserProgress;
  setCurrentScreen: (screen: string) => void;
}

export default function DashboardView({ progress, setCurrentScreen }: DashboardViewProps) {
  // Static lists to match design exactly
  const liveMarkets: MarketTicker[] = [
    { symbol: '$SPY', name: 'S&P 500 ETF', price: 541.22, changePercent: 1.24 },
    { symbol: '$QQQ', name: 'Nasdaq 100 ETF', price: 479.50, changePercent: 0.89 },
    { symbol: '$VIX', name: 'Volatility Index', price: 13.40, changePercent: -4.50 },
  ];

  const certificates: Certificate[] = [
    { id: 'cert-1', title: 'Equities Foundation', earnedDate: 'Oct 12, 2023', status: 'earned' },
    { id: 'cert-2', title: 'Professional Certification', status: progress.overallProgress === 100 ? 'earned' : 'locked', earnedDate: progress.overallProgress === 100 ? 'Just now' : undefined },
  ];

  const modulesList = [
    {
      number: 1,
      name: "Market Basics",
      description: "Shares, exchanges, order types, and basic market terminology.",
      lessons: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6'],
      icon: BookOpen,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      number: 2,
      name: "Fundamental Analysis",
      description: "Evaluating company health, financial statements, and valuation ratios.",
      lessons: ['lesson-7', 'lesson-8', 'lesson-9', 'lesson-10', 'lesson-11', 'lesson-12'],
      icon: TrendingUp,
      iconColor: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      number: 3,
      name: "Technical Analysis",
      description: "Reading price action, chart patterns, and technical indicators.",
      lessons: ['lesson-13', 'lesson-14', 'lesson-15', 'lesson-16', 'lesson-17', 'lesson-18', 'lesson-19'],
      icon: CandlestickChart,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      number: 4,
      name: "Risk Management & Psychology",
      description: "Position sizing, stop-losses, and mastering trading emotions.",
      lessons: ['lesson-20', 'lesson-21', 'lesson-22', 'lesson-23', 'lesson-24'],
      icon: ShieldCheck,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      number: 5,
      name: "Advanced Trading Tools",
      description: "RSI, MACD, moving averages, and market cycle analysis.",
      lessons: ['lesson-25', 'lesson-26', 'lesson-27'],
      icon: Award,
      iconColor: 'text-pink-400',
      bgColor: 'bg-pink-500/10 border-pink-500/20'
    }
  ];

  const getModuleProgress = (lessonIds: string[]) => {
    const completed = lessonIds.filter(id => progress.completedLessonIds.includes(id)).length;
    return Math.round((completed / lessonIds.length) * 100);
  };

  const handleModuleClick = (lessonIds: string[]) => {
    const firstIncomplete = lessonIds.find(id => !progress.completedLessonIds.includes(id));
    const targetLessonId = firstIncomplete || lessonIds[0];
    setCurrentScreen(targetLessonId);
  };

  // Find the first incomplete lesson overall to resume learning
  const allSyllabusIds = modulesList.flatMap(m => m.lessons);
  const nextIncompleteLessonId = allSyllabusIds.find(id => !progress.completedLessonIds.includes(id)) || 'lesson-1';

  return (
    <div id="dashboard-view-root" className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <header id="dashboard-header" className="space-y-1">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-market-navy">Welcome back, {progress.name}.</h1>
        <p className="font-sans text-base text-slate-400">Pick up where you left off in your professional curriculum.</p>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Column (8 spans) */}
        <div className="lg:col-span-8 space-y-8">

          {/* Continue Learning Card */}
          <div className="bg-white border border-surface-border rounded-xl overflow-hidden shadow-lg relative group hover:border-growth-green transition-all duration-300">
            {/* Green top marker accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-growth-green"></div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Candlestick visualization block */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0 border border-sky-500/20 group-hover:scale-105 transition-transform duration-300">
                {/* Custom candlestick bars */}
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-3 bg-red-400"></div>
                    <div className="w-3 h-8 bg-red-400 rounded-sm"></div>
                    <div className="w-0.5 h-4 bg-red-400"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-growth-green"></div>
                    <div className="w-3 h-10 bg-growth-green rounded-sm"></div>
                    <div className="w-0.5 h-2 bg-growth-green"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-3 bg-growth-green"></div>
                    <div className="w-3 h-6 bg-growth-green rounded-sm"></div>
                    <div className="w-0.5 h-3 bg-growth-green"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-headline text-xs font-bold text-growth-green bg-success-light px-2 py-0.5 rounded-full">Syllabus Path</span>
                  <span className="font-sans text-xs text-slate-400 font-medium">Trade Craft Academy</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-market-navy">Reading Candlestick Patterns</h3>
                  <p className="font-sans text-sm text-slate-400 mt-1 leading-relaxed">
                    Master the foundational visual language of price action. Learn to identify bullish engulfing, doji, and hammer patterns to predict short-term market sentiment.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-1 flex-wrap">
                  <button
                    onClick={() => setCurrentScreen(nextIncompleteLessonId)}
                    className="bg-growth-green hover:bg-opacity-95 text-white font-headline text-xs font-bold py-2 px-5 rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer shadow active:scale-95"
                  >
                    Resume Learning
                  </button>
                  <span className="font-headline text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
                    <Clock className="w-4 h-4 text-slate-400" />
                    10 mins left
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum Grid */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-headline text-2xl font-bold text-market-navy">Your Curriculum</h3>
              <button
                onClick={() => setCurrentScreen('lesson-1')}
                className="font-headline text-xs font-bold text-accent-blue hover:underline cursor-pointer flex items-center gap-0.5"
              >
                View Full Syllabus
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modulesList.map((mod) => {
                const completion = getModuleProgress(mod.lessons);
                const IconComponent = mod.icon;
                return (
                  <div
                    key={mod.number}
                    onClick={() => handleModuleClick(mod.lessons)}
                    className={`bg-white border rounded-xl p-5 hover:border-growth-green hover:shadow-sm cursor-pointer transition-all duration-200 group ${
                      completion === 100 ? 'border-emerald-500/30' : 'border-surface-border'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border group-hover:scale-105 transition-transform ${mod.bgColor}`}>
                        {completion === 100 ? (
                          <CheckCircle className="w-5 h-5 text-growth-green" />
                        ) : (
                          <IconComponent className={`w-5 h-5 ${mod.iconColor}`} />
                        )}
                      </div>
                      <span className="font-headline text-xs font-bold text-slate-400">Module {mod.number}</span>
                    </div>
                    <h4 className="font-headline text-lg font-bold text-market-navy">{mod.name}</h4>
                    <p className="font-sans text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {mod.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-grow bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-growth-green h-full rounded-full transition-all duration-500"
                          style={{ width: `${completion}%` }}
                        ></div>
                      </div>
                      <span className={`font-headline text-xs font-bold ${completion === 100 ? 'text-growth-green' : 'text-slate-400'}`}>
                        {completion}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sidebar Column (4 spans) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Live Markets snapshot */}
          <div className="bg-market-navy text-white rounded-2xl p-6 border border-slate-800 shadow-lg">
            <h4 className="font-headline text-xs font-bold text-sky-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-200 animate-spin" style={{ animationDuration: '20s' }} />
              Live Markets
            </h4>
            <div className="space-y-4">
              {liveMarkets.map((ticker) => (
                <div key={ticker.symbol} className="flex justify-between items-center border-b border-slate-800 pb-3 last:border-b-0 last:pb-0">
                  <div className="space-y-0.5">
                    <span className="font-headline text-xs font-bold bg-slate-800 px-2.5 py-1 rounded text-white inline-block">
                      {ticker.symbol}
                    </span>
                    <p className="text-[10px] text-slate-400 font-medium pl-1">{ticker.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-sm font-semibold block">${ticker.price.toFixed(2)}</span>
                    <span className={`font-headline text-xs font-bold ${
                      ticker.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {ticker.changePercent >= 0 ? '+' : ''}{ticker.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements certificates widget */}
          <div className="bg-white border border-surface-border rounded-xl p-5 space-y-4">
            <h4 className="font-headline text-lg font-bold text-market-navy">Certificates</h4>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div key={cert.id} className={`flex items-center gap-4 ${cert.status === 'locked' ? 'opacity-50 grayscale' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border ${
                    cert.status === 'earned'
                      ? 'bg-success-light border-emerald-200 text-growth-green'
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-headline text-sm font-bold text-market-navy truncate">{cert.title}</p>
                    <p className="font-sans text-xs text-slate-500">
                      {cert.status === 'earned' ? `Earned ${cert.earnedDate}` : 'Locked'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Padding */}
      <div className="h-12"></div>
    </div>
  );
}
