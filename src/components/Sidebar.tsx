import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  ChevronRight,
  LineChart,
  TrendingUp,
  Award,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { UserProgress } from '../types';
import { lessonsData } from '../data/lessonsData';

interface SidebarProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  progress: UserProgress;
  onGetCertified: () => void;
}

export default function Sidebar({ currentScreen, setCurrentScreen, progress, onGetCertified }: SidebarProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  const activeLesson = lessonsData.find(l => l.id === currentScreen);
  const activeModuleNum = activeLesson ? activeLesson.moduleNumber : null;

  // Auto-expand active module accordion when active screen changes
  useEffect(() => {
    if (activeModuleNum !== null) {
      setExpandedModule(activeModuleNum);
    }
  }, [activeModuleNum]);

  const modulesList = [
    { number: 1, name: "Market Basics", icon: BookOpen, lessons: lessonsData.filter(l => l.moduleNumber === 1) },
    { number: 2, name: "Fundamental Analysis", icon: TrendingUp, lessons: lessonsData.filter(l => l.moduleNumber === 2) },
    { number: 3, name: "Technical Analysis", icon: LineChart, lessons: lessonsData.filter(l => l.moduleNumber === 3) },
    { number: 4, name: "Risk Management", icon: ShieldCheck, lessons: lessonsData.filter(l => l.moduleNumber === 4) },
    { number: 5, name: "Advanced Tools", icon: Award, lessons: lessonsData.filter(l => l.moduleNumber === 5) },
  ];

  return (
    <aside id="sidebar-container" className="hidden md:flex flex-col w-72 h-screen border-r border-surface-border bg-white p-5 space-y-4 sticky top-0 shrink-0 select-none overflow-y-auto custom-scrollbar">
      {/* Brand Profile section */}
      <div id="sidebar-profile-header" className="flex items-center gap-3 pb-4 border-b border-surface-border">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container border border-surface-border flex-shrink-0">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src={progress.avatarUrl}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-headline text-base font-bold text-market-navy truncate">Academy Pro</h2>
          <p className="font-sans text-xs text-slate-gray mt-0.5">{progress.overallProgress}% Complete</p>
          <div className="w-full bg-slate-100 h-1.5 mt-1.5 rounded-full overflow-hidden">
            <div
              className="bg-growth-green h-full transition-all duration-500 ease-out"
              style={{ width: `${progress.overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main navigation links */}
      <nav id="sidebar-navigation-links" className="flex-grow space-y-1.5 py-2">
        {/* Overview */}
        <button
          onClick={() => setCurrentScreen('overview')}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 font-headline text-sm font-semibold cursor-pointer ${
            currentScreen === 'overview'
              ? 'text-growth-green bg-success-light'
              : 'text-market-navy hover:bg-slate-50 hover:text-growth-green'
          }`}
        >
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </div>
        </button>

        {/* Modules Accordion Syllabus */}
        {modulesList.map((mod) => {
          const isExpanded = expandedModule === mod.number;
          const Icon = mod.icon;
          return (
            <div key={mod.number} className="space-y-1">
              <button
                onClick={() => setExpandedModule(isExpanded ? null : mod.number)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 font-headline text-sm font-semibold cursor-pointer ${
                  activeModuleNum === mod.number
                    ? 'text-growth-green bg-success-light/40 font-bold'
                    : 'text-market-navy hover:bg-slate-50 hover:text-growth-green'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4.5 h-4.5" />
                  <span className="truncate">{mod.name}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-growth-green' : 'text-slate-400'}`} />
              </button>

              {isExpanded && (
                <div className="pl-11 py-1 space-y-2 border-l-2 border-slate-800 ml-6 my-1">
                  {mod.lessons.map((lesson) => {
                    const isActive = currentScreen === lesson.id;
                    const isCompleted = progress.completedLessonIds.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentScreen(lesson.id)}
                        className={`block text-left text-xs font-medium w-full truncate transition-colors relative ${
                          isActive
                            ? 'text-market-navy font-bold flex items-center before:content-[""] before:w-1.5 before:h-1.5 before:bg-growth-green before:rounded-full before:mr-2 before:-ml-3.5'
                            : 'text-slate-400 hover:text-market-navy flex items-center'
                        }`}
                      >
                        <span className="truncate flex-grow">L{lesson.number}: {lesson.title}</span>
                        {isCompleted && (
                          <span className="text-[10px] text-growth-green ml-1 font-sans shrink-0">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Action panel & CTA */}
      <div id="sidebar-action-footer" className="mt-auto pt-4 border-t border-surface-border space-y-4">
        <button
          onClick={onGetCertified}
          className="w-full bg-growth-green text-white uppercase font-headline text-xs font-bold tracking-wider py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Get Certified
        </button>

        <div className="space-y-1">
          <button
            onClick={() => alert("Academy Pro Help Center - Support ticketing & trading vocabulary database.")}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 hover:text-market-navy rounded-lg transition-colors font-headline text-xs font-semibold cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </button>
          <button
            onClick={() => alert("Logged out from Trade Craft simulator session.")}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-headline text-xs font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
