import { Search, Bell, Settings, Menu, Award } from 'lucide-react';
import { UserProgress } from '../types';

interface TopNavBarProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  progress: UserProgress;
  toggleMobileMenu: () => void;
  onSearchQuery: (query: string) => void;
}

export default function TopNavBar({ currentScreen, setCurrentScreen, progress, toggleMobileMenu, onSearchQuery }: TopNavBarProps) {
  return (
    <header id="top-navbar-container" className="bg-white border-b border-surface-border w-full h-16 flex justify-between items-center px-4 md:px-8 sticky top-0 z-40 select-none">
      {/* Brand logo & Desktop top-level links */}
      <div className="flex items-center gap-8">
        <button
          onClick={() => toggleMobileMenu()}
          className="md:hidden p-1.5 hover:bg-slate-100 rounded-lg text-market-navy cursor-pointer active:scale-95 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentScreen('overview')}
          className="font-headline text-lg md:text-xl font-bold text-market-navy cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
        >
          Trade Craft
        </button>

        <nav className="hidden md:flex gap-6">
          <button
            onClick={() => setCurrentScreen('overview')}
            className={`font-headline text-sm font-semibold cursor-pointer transition-colors ${
              currentScreen === 'overview'
                ? 'text-growth-green font-bold'
                : 'text-slate-500 hover:text-growth-green'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentScreen('lesson-1')}
            className={`font-headline text-sm font-semibold cursor-pointer transition-colors ${
              currentScreen.startsWith('lesson-')
                ? 'text-growth-green font-bold'
                : 'text-slate-500 hover:text-growth-green'
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => alert(`Simulated Portfolio:\n\nBalance: $${progress.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\nActive Holdings: ${JSON.stringify(progress.portfolioShares)}`)}
            className="font-headline text-sm font-semibold text-slate-500 hover:text-growth-green cursor-pointer transition-colors"
          >
            Portfolio
          </button>
        </nav>
      </div>

      {/* Utilities panel */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search lessons..."
            onChange={(e) => onSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 bg-slate-50 border border-surface-border rounded-lg text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 w-52 md:w-64 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Notifications trigger */}
        <button
          onClick={() => alert("Notification: Market Basics completed by 65%. Dynamic order book simulations ready for testing!")}
          className="p-1.5 text-slate-500 hover:text-growth-green rounded-lg cursor-pointer hover:bg-slate-50 active:scale-95 transition-all relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings panel trigger */}
        <button
          onClick={() => alert("Academy Pro Settings: Configure sandbox parameters, reset portfolio data, or toggle High-Liquidity ticker listings.")}
          className="p-1.5 text-slate-500 hover:text-growth-green rounded-lg cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Profile indicator */}
        <button
          onClick={() => alert(`User Alex profile:\nCompleted chapters: ${progress.completedLessonIds.length}/5\nCertificate Code: TRADE-MASTER-65`)}
          className="hidden sm:flex items-center gap-2 border border-market-navy hover:bg-slate-50 font-headline text-xs font-bold text-market-navy py-2 px-3.5 rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95"
        >
          Profile
        </button>

        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold sm:hidden">
          AL
        </div>
      </div>
    </header>
  );
}
