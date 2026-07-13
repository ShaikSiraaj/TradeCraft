import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  FileText,
  Save,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Lesson20ViewProps {
  onPrev: () => void;
  onFinish: () => void;
  onLessonComplete: (lessonId: string) => void;
  isCompleted: boolean;
}

export default function Lesson20View({ onPrev, onFinish, onLessonComplete, isCompleted }: Lesson20ViewProps) {
  // Interactive Trading Plan Builder state
  const [assetClass, setAssetClass] = useState('Equities');
  const [strategyType, setStrategyType] = useState('Trend Following');
  const [maxRisk, setMaxRisk] = useState('1%');
  const [entryTrigger, setEntryTrigger] = useState('Breakout on expand volume');
  const [savedPlan, setSavedPlan] = useState<boolean>(false);

  const handleSavePlan = () => {
    setSavedPlan(true);
    onLessonComplete('lesson-20');
  };

  return (
    <div id="lesson20-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in pb-16">
      {/* Primary column */}
      <div className="lg:col-span-8 space-y-8">

        {/* Header Breadcrumbs */}
        <header className="space-y-4">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-lg font-headline text-xs font-bold uppercase tracking-wider">
            Lesson 20
          </span>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-market-navy">Building a Trading Plan</h1>
          <p className="font-sans text-base md:text-lg text-slate-500 max-w-3xl leading-relaxed">
            Consolidate everything you have learned into a written, execution-ready trading plan. Protect your capital and master your trading psychology.
          </p>
        </header>

        {/* Pillars of a Trading Plan */}
        <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-5 shadow-sm hover:border-growth-green transition-colors">
          <h3 className="font-headline text-lg font-bold text-market-navy flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-growth-green" />
            The Pillars of a Trading Plan
          </h3>
          <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
            A trading plan is not a magic crystal ball. It is a strict system designed to keep your risk low, eliminate panic-driven decisions, and ensure you remain consistent in all market cycles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <h4 className="font-headline text-xs font-bold text-market-navy">1. Clear Edge</h4>
              <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                A repetitive market setup (like Candlesticks or Volume levels) that yields a high mathematical win expectancy over 100 trades.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <h4 className="font-headline text-xs font-bold text-market-navy">2. Capital Preservation</h4>
              <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                Rules enforcing stop-losses on every execution. Always calculating max share sizes to maintain an overall risk ceiling.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <h4 className="font-headline text-xs font-bold text-market-navy">3. Mental Equanimity</h4>
              <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                Treating trading like a business. Ignoring FOMO, market chatter, or the desire to "revenge trade" after a setback.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Trading Plan Builder */}
        <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 flex-wrap gap-4">
            <div>
              <h3 className="font-headline text-lg font-bold text-market-navy flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-blue" />
                Your Interactive Trading Constitution
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-0.5">Customize your execution parameters and commit to your core trading rules.</p>
            </div>
            <span className="font-mono text-xs bg-sky-50 text-accent-blue px-2 py-0.5 rounded font-bold">Workspace</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Target Asset Class</label>
                <select
                  value={assetClass}
                  onChange={(e) => setAssetClass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-headline text-sm font-bold text-market-navy focus:outline-none focus:border-accent-blue cursor-pointer"
                >
                  <option value="Equities">Public Equities (Large Cap Stocks)</option>
                  <option value="Indices">ETFs &amp; Sector Indices</option>
                  <option value="FX">Foreign Exchanges (FX)</option>
                  <option value="Crypto">High-Vol Crypto Assets</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Core Setup Strategy</label>
                <select
                  value={strategyType}
                  onChange={(e) => setStrategyType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-headline text-sm font-bold text-market-navy focus:outline-none focus:border-accent-blue cursor-pointer"
                >
                  <option value="Trend Following">Trend Following (Volume Support)</option>
                  <option value="Mean Reversion">Mean Reversion (Bollinger Bands)</option>
                  <option value="Momentum Breakout">Momentum Breakout (Local Peaks)</option>
                  <option value="Short-Sale Mechanics">Short Selling (Capitulation Spike)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Max Risk Per Single Execution</label>
                <div className="grid grid-cols-3 gap-2">
                  {['0.5%', '1.0%', '2.0%'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setMaxRisk(val)}
                      className={`py-2 border rounded-lg text-xs font-bold font-headline transition-all cursor-pointer ${
                        maxRisk === val
                          ? 'border-growth-green bg-success-light text-growth-green font-bold'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {val} (Ideal)
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Entry Trigger Action</label>
                <input
                  type="text"
                  value={entryTrigger}
                  onChange={(e) => setEntryTrigger(e.target.value)}
                  placeholder="e.g. Price breakout with > 2x average volume"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-headline text-sm font-semibold text-market-navy focus:outline-none focus:border-accent-blue"
                />
              </div>

              <button
                onClick={handleSavePlan}
                className="w-full bg-growth-green hover:bg-opacity-95 text-white font-headline text-xs font-bold uppercase tracking-wider py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Commit Strategy Plan
              </button>
            </div>

            {/* Right Output: Personal Trading Constitution printout */}
            <div className="bg-[#fcfdfd] border-2 border-dashed border-slate-200 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-28 h-28 bg-slate-100 rounded-full opacity-50"></div>

              <div className="space-y-4 z-10 relative">
                <h4 className="font-headline text-xs font-bold text-slate-400 uppercase tracking-wider">Trading Constitution</h4>

                <div className="space-y-3 font-sans text-xs text-slate-500 leading-relaxed">
                  <div>
                    <span className="font-bold text-market-navy block uppercase font-headline text-[10px]">1. Specialized Arena</span>
                    <p className="font-medium">I will execute setups strictly inside the <span className="text-growth-green font-bold">{assetClass}</span> universe.</p>
                  </div>
                  <div>
                    <span className="font-bold text-market-navy block uppercase font-headline text-[10px]">2. Strategy Alignment</span>
                    <p className="font-medium">My mathematical edge is derived from <span className="text-growth-green font-bold">{strategyType}</span>.</p>
                  </div>
                  <div>
                    <span className="font-bold text-market-navy block uppercase font-headline text-[10px]">3. Capital Ceiling Rules</span>
                    <p className="font-medium">Under no circumstances will I risk more than <span className="text-growth-green font-bold">{maxRisk}</span> of account equity on a single execution.</p>
                  </div>
                  <div>
                    <span className="font-bold text-market-navy block uppercase font-headline text-[10px]">4. Entry Requirement</span>
                    <p className="font-medium">"I will not enter a trade unless I witness a clear: <span className="text-growth-green font-semibold italic">{entryTrigger || '...'}</span>."</p>
                  </div>
                </div>
              </div>

              {savedPlan ? (
                <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-sans flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-growth-green flex-shrink-0" />
                  <span>Plan committed. Academy completed successfully!</span>
                </div>
              ) : (
                <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200 text-amber-800 rounded-lg text-[11px] font-sans flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Customize the left values and click Commit to save.</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Finishing Navigation controls */}
        <div className="flex justify-between items-center py-6 border-t border-slate-200">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-3 border border-market-navy text-market-navy font-headline text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all rounded-lg cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={onFinish}
            className="flex items-center gap-2 px-6 py-3 bg-growth-green hover:bg-opacity-95 text-white font-headline text-xs font-bold uppercase tracking-wider shadow-md transition-all rounded-lg cursor-pointer active:scale-95"
          >
            Finish Academy
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Sidebar tips */}
      <div className="lg:col-span-4 space-y-6">

        <div className="bg-white border border-surface-border rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="font-headline text-xs font-bold text-market-navy uppercase tracking-wider border-b border-slate-100 pb-2">
            The Golden Rule of Risk
          </h3>
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            "Never risk more than 1% to 2% of your capital on any single trade. If you have $10,000, your maximum loss on a trade should never exceed $100. This ensures you can survive 15 consecutive losses and still have plenty of capital left to execute future setups."
          </p>
        </div>

        <div className="bg-white border border-surface-border rounded-xl p-5 space-y-3 shadow-sm">
          <h3 className="font-headline text-xs font-bold text-market-navy uppercase tracking-wider border-b border-slate-100 pb-2">
            Entry vs. Exit Rules
          </h3>
          <div className="space-y-3 text-xs font-sans text-slate-500 leading-relaxed">
            <p>
              <strong className="text-market-navy font-headline">Entry:</strong> The exact price and candlestick/volume signal needed to trigger a BUY.
            </p>
            <p>
              <strong className="text-market-navy font-headline">Exit:</strong> Stop Loss (to protect capital) and Take Profit (to harvest gain). Both MUST be written down before clicking buy!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
