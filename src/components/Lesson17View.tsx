import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  Check,
  TrendingDown,
  Play,
  Calculator,
  RefreshCw
} from 'lucide-react';

interface Lesson17ViewProps {
  onPrev: () => void;
  onNext: () => void;
  onLessonComplete: (lessonId: string) => void;
  isCompleted: boolean;
}

export default function Lesson17View({ onPrev, onNext, onLessonComplete, isCompleted }: Lesson17ViewProps) {
  // Interactive Walkthrough calculator state
  const [ticker, setTicker] = useState('XYZ');
  const [entryPrice, setEntryPrice] = useState(100);
  const [exitPrice, setExitPrice] = useState(80);
  const [shares, setShares] = useState(100);

  const initialProceeds = entryPrice * shares;
  const coverCost = exitPrice * shares;
  const netProfit = initialProceeds - coverCost;
  const marginNeeded = initialProceeds * 1.5; // 150% margin requirement

  const triggerComplete = () => {
    onLessonComplete('lesson-17');
  };

  return (
    <div id="lesson17-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in pb-16">
      {/* Main Column */}
      <div className="lg:col-span-9 space-y-8">

        {/* Header section */}
        <header className="space-y-4">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-lg font-headline text-xs font-bold uppercase tracking-wider">
            Lesson 17
          </span>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-market-navy">Short Selling Mechanics</h1>
          <p className="font-sans text-base md:text-lg text-slate-500 max-w-3xl leading-relaxed">
            Understanding how to profit from a decline in the price of a stock, the associated risks, and the specific mechanics required to execute a short trade.
          </p>
        </header>

        {/* The Anatomy of a Short Sale Card */}
        <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 relative overflow-hidden shadow-sm border-t-4 border-t-growth-green">
          <h2 className="font-headline text-xl font-bold text-market-navy mb-4 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-growth-green" />
            The Anatomy of a Short Sale
          </h2>
          <div className="font-sans text-sm md:text-base text-slate-500 space-y-4 leading-relaxed">
            <p>
              Traditional investing involves buying an asset with the expectation that its price will rise. Short selling reverses this process. You are borrowing an asset, selling it at the current market price, and hoping to buy it back later at a lower price to return it to the lender.
            </p>
            <p className="font-semibold text-market-navy">The core components involve:</p>
            <ul className="space-y-3 pl-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-growth-green rounded-full mt-2 flex-shrink-0"></span>
                <p>
                  <strong className="text-market-navy font-headline text-sm">Borrowing:</strong> Your broker must locate shares to lend you. High-Liquidity stocks are usually Easy to Borrow, while speculative or thin ones are Hard to Borrow (HTB).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-growth-green rounded-full mt-2 flex-shrink-0"></span>
                <p>
                  <strong className="text-market-navy font-headline text-sm">Selling:</strong> You immediately sell the borrowed shares on the open market, receiving proceeds (cash) as collateral in your account.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-growth-green rounded-full mt-2 flex-shrink-0"></span>
                <p>
                  <strong className="text-market-navy font-headline text-sm">Margin:</strong> Because you owe physical shares (not cash), you must maintain a margin account with sufficient equity to cover potential losses if the stock rises.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-growth-green rounded-full mt-2 flex-shrink-0"></span>
                <p>
                  <strong className="text-market-navy font-headline text-sm">Covering:</strong> Buying back the equivalent number of shares on the open market to return them to the lender, closing out the liability.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Walkthrough Calculator */}
        <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
            <h3 className="font-headline text-xl font-bold text-market-navy flex items-center gap-2">
              <Calculator className="w-6 h-6 text-accent-blue" />
              Interactive Short-Sale Simulator
            </h3>
            <span className="font-mono text-xs font-semibold bg-sky-50 text-accent-blue px-2.5 py-1 rounded">
              Configurable Walkthrough
            </span>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Ticker</label>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 font-headline text-sm font-bold text-market-navy focus:outline-none focus:border-accent-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Shares</label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 font-headline text-sm font-bold text-market-navy focus:outline-none focus:border-accent-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Short Price ($)</label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 font-headline text-sm font-bold text-market-navy focus:outline-none focus:border-accent-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Cover Price ($)</label>
              <input
                type="number"
                value={exitPrice}
                onChange={(e) => setExitPrice(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 font-headline text-sm font-bold text-market-navy focus:outline-none focus:border-accent-blue"
              />
            </div>
          </div>

          {/* Walkthrough Steps */}
          <div className="space-y-6 pt-2">

            {/* Step 1 */}
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-market-navy flex items-center justify-center font-bold font-headline mr-4 shrink-0 shadow-sm">1</div>
              <div className="flex-1 space-y-2">
                <h4 className="font-headline text-sm font-bold text-market-navy uppercase">1. Initiating the Position</h4>
                <p className="font-sans text-xs md:text-sm text-slate-500">
                  You borrow and sell <span className="font-bold text-market-navy">{shares} shares</span> of <span className="font-bold text-market-navy">${ticker}</span> at <span className="font-bold text-market-navy">${entryPrice} per share</span>. Your broker executes this short transaction immediately.
                </p>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg font-mono text-xs text-slate-600 space-y-1">
                  <div>Action: Sell Short {shares} ${ticker} @ ${entryPrice.toFixed(2)}</div>
                  <div>Proceeds: +${initialProceeds.toLocaleString('en-US', { minimumFractionDigits: 2 })} (credited to account as collateral)</div>
                  <div className="text-sky-600">Required Margin (150%): ${marginNeeded.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-market-navy flex items-center justify-center font-bold font-headline mr-4 shrink-0 shadow-sm">2</div>
              <div className="flex-1 space-y-1">
                <h4 className="font-headline text-sm font-bold text-market-navy uppercase">2. The Price Moves</h4>
                <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
                  The stock fluctuates on high volatility. It moves down from your entry point of <span className="font-semibold text-market-navy">${entryPrice.toFixed(2)}</span> to <span className="font-semibold text-market-navy">${exitPrice.toFixed(2)} per share</span>. This constitutes a drop of <span className="font-bold text-growth-green">{(((entryPrice - exitPrice) / entryPrice) * 100).toFixed(1)}%</span>.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-success-light text-growth-green flex items-center justify-center font-bold font-headline mr-4 shrink-0 shadow-sm border border-emerald-200">3</div>
              <div className="flex-1 space-y-2">
                <h4 className="font-headline text-sm font-bold text-market-navy uppercase">3. Covering the Position</h4>
                <p className="font-sans text-xs md:text-sm text-slate-500">
                  To lock in the profit, you execute a "Buy to Cover" order. This purchases {shares} shares at the lower current price of ${exitPrice} to return them to your lending broker.
                </p>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg font-mono text-xs text-slate-600 space-y-1">
                  <div>Action: Buy to Cover {shares} ${ticker} @ ${exitPrice.toFixed(2)}</div>
                  <div>Cost to Purchase: -${coverCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  <div className={`font-bold mt-1.5 ${netProfit >= 0 ? 'text-growth-green' : 'text-rose-600'}`}>
                    {netProfit >= 0 ? 'Gross Profit: ' : 'Net Loss: '}${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={triggerComplete}
              className={`font-headline text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                isCompleted
                  ? 'bg-slate-100 text-slate-500 cursor-default'
                  : 'bg-growth-green hover:bg-opacity-95 text-white shadow active:scale-95'
              }`}
            >
              {isCompleted ? 'Simulator Explored' : 'Confirm Mechanics'}
              {isCompleted && <Check className="w-4 h-4 text-growth-green" />}
            </button>
          </div>
        </section>

        {/* Warning Section */}
        <section className="bg-[#fef2f2] border border-[#fca5a5] rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-105 transition-transform duration-300">
            <AlertTriangle className="w-24 h-24 text-[#ba1a1a]" />
          </div>
          <div className="relative z-10 space-y-3">
            <h3 className="font-headline text-lg md:text-xl font-bold text-[#991b1b] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              The Risk of Infinite Loss &amp; Short Squeezes
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#7f1d1d] leading-relaxed">
              When buying a stock, your maximum loss is strictly limited to your initial investment (if the stock drops to zero). However, when shorting a stock, your potential loss is **theoretically infinite** because a stock's price can rise indefinitely.
            </p>
            <h4 className="font-headline text-xs font-bold uppercase text-[#991b1b] tracking-wider pt-2">The Short Squeeze</h4>
            <p className="font-sans text-xs md:text-sm text-[#7f1d1d] leading-relaxed">
              If a heavily shorted stock suddenly rises, short sellers are forced to buy shares immediately to cover and limit their exposure. This frantic buying pressure drives the price even higher, forcing *more* short sellers to cover, creating a cascading, explosive upward surge called a **Short Squeeze**.
            </p>
          </div>
        </section>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center py-6 border-t border-slate-200">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-3 border border-market-navy text-market-navy font-headline text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all rounded-lg cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 bg-growth-green hover:bg-opacity-95 text-white font-headline text-xs font-bold uppercase tracking-wider shadow-md transition-all rounded-lg cursor-pointer active:scale-95"
          >
            Next: Lesson 18
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Sidebar Info Panel */}
      <div className="lg:col-span-3 space-y-6">

        {/* Margin Requirements snap card */}
        <div className="bg-white border border-surface-border rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="font-headline text-xs font-bold text-market-navy uppercase tracking-wider border-b border-slate-100 pb-2">
            Margin Requirements
          </h3>
          <ul className="space-y-3 font-sans text-xs text-slate-500 font-semibold">
            <li className="flex justify-between items-center">
              <span>Initial Margin</span>
              <span className="text-market-navy font-bold">150%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Maintenance Margin</span>
              <span className="text-market-navy font-bold">30%</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Account Type</span>
              <span className="text-market-navy font-bold">Margin Only</span>
            </li>
          </ul>
        </div>

        {/* Key Vocabulary Terms */}
        <div className="bg-white border border-surface-border rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="font-headline text-xs font-bold text-market-navy uppercase tracking-wider border-b border-slate-100 pb-2">
            Key Terms
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-headline text-xs font-bold text-market-navy">Days to Cover</h4>
              <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed">
                A ratio showing how many trading days it would take all short sellers to buy back their shares based on the stock's average daily trading volume.
              </p>
            </div>
            <div>
              <h4 className="font-headline text-xs font-bold text-market-navy">Hard to Borrow (HTB)</h4>
              <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed">
                A label given to shares that are scarce or difficult for a clearing brokerage to locate for lending, typically attracting high interest rate borrow fees.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
