import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  HelpCircle as HelpIcon,
  Check,
  AlertCircle
} from 'lucide-react';

interface Lesson1ViewProps {
  onPrev: () => void;
  onNext: () => void;
  onLessonComplete: (lessonId: string) => void;
  isCompleted: boolean;
}

export default function Lesson1View({ onPrev, onNext, onLessonComplete, isCompleted }: Lesson1ViewProps) {
  // Simple Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const quizOptions = [
    "A direct loan that the company must pay back with high monthly interest.",
    "A tiny fractional slice of ownership in that company's assets and earnings.",
    "A special type of credit card used to buy corporate products at a wholesale discount.",
    "A warranty agreement ensuring corporate products are refund-proof."
  ];

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    setIsQuizSubmitted(true);
    if (selectedAnswer === 1) {
      setIsCorrect(true);
      onLessonComplete('lesson-1');
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div id="lesson1-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in pb-16">
      {/* Primary content area (9 columns on large screens) */}
      <div className="lg:col-span-9 space-y-10">

        {/* Lesson Breadcrumbs & Header */}
        <header className="space-y-4">
          <nav className="flex items-center gap-2 font-headline text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span className="hover:text-growth-green cursor-pointer" onClick={onPrev}>Curriculum</span>
            <span className="text-slate-300">/</span>
            <span className="hover:text-growth-green cursor-pointer" onClick={onPrev}>Market Basics</span>
            <span className="text-slate-300">/</span>
            <span className="text-growth-green font-bold">Lesson 1</span>
          </nav>

          <h1 className="font-headline text-3xl md:text-4xl font-bold text-market-navy">Introduction to Stocks</h1>
          <p className="font-sans text-base md:text-lg text-slate-500 max-w-3xl leading-relaxed">
            To understand the modern financial world, you must first understand its most fundamental building block: the stock. At its core, a stock represents a piece of something much larger.
          </p>
        </header>

        {/* Bento Grid Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: What is a Stock */}
          <div className="bg-white border border-surface-border rounded-xl p-6 md:p-8 relative overflow-hidden group hover:border-growth-green transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-growth-green/5 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-500"></div>

            <div className="space-y-4">
              <h3 className="font-headline text-xl font-bold text-market-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-success-light/70 text-growth-green flex items-center justify-center font-bold">
                  $
                </span>
                What is a Stock?
              </h3>
              <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
                When you buy a stock, you are purchasing <span className="text-market-navy font-bold">equity</span> in a corporation. This means you own a tiny fractional slice of that company's assets and earnings.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex gap-4">
              <div className="flex-1">
                <p className="font-headline text-[10px] text-slate-400 uppercase tracking-wider font-bold">Common Term</p>
                <p className="font-headline text-sm font-bold text-market-navy">Equity</p>
              </div>
              <div className="flex-1">
                <p className="font-headline text-[10px] text-slate-400 uppercase tracking-wider font-bold">Unit of Measure</p>
                <p className="font-headline text-sm font-bold text-market-navy">Shares</p>
              </div>
            </div>
          </div>

          {/* Card: Company vs Shareholder graphic placeholder */}
          <div className="bg-market-navy rounded-xl p-8 text-white relative group overflow-hidden flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-market-navy to-slate-900 opacity-90"></div>
            <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-growth-green rounded-full opacity-10 group-hover:scale-110 transition-transform duration-500"></div>

            <div className="relative z-10 space-y-4 max-w-sm">
              <div className="w-16 h-16 bg-white/10 rounded-full mx-auto flex items-center justify-center border border-white/20 group-hover:rotate-12 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-sky-300" />
              </div>
              <h4 className="font-headline text-lg font-bold">Company vs. Shareholder</h4>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Visualizing the flow of capital and ownership rights. The corporation raises liquid capital by selling shares; the shareholder secures a legal claim on future profits.
              </p>
            </div>
          </div>
        </div>

        {/* Key Terminology Section */}
        <section className="space-y-4">
          <h2 className="font-headline text-2xl font-bold text-market-navy">Key Terminology</h2>
          <div className="space-y-3">
            <div className="bg-white border border-surface-border rounded-xl p-5 hover:bg-slate-50/50 transition-all duration-200">
              <h4 className="font-headline text-sm font-bold text-growth-green uppercase tracking-wider">1. Share</h4>
              <p className="font-sans text-sm text-slate-500 mt-1 leading-relaxed">
                The individual unit of stock. If a company has 1,000,000 shares and you own 10,000, you own exactly 1% of the company's total equity.
              </p>
            </div>
            <div className="bg-white border border-surface-border rounded-xl p-5 hover:bg-slate-50/50 transition-all duration-200">
              <h4 className="font-headline text-sm font-bold text-growth-green uppercase tracking-wider">2. Ticker Symbol</h4>
              <p className="font-sans text-sm text-slate-500 mt-1 leading-relaxed">
                A unique series of letters used to identify a publicly traded company on an exchange (e.g., <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-600">$AAPL</span> for Apple, <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-600">$TSLA</span> for Tesla).
              </p>
            </div>
            <div className="bg-white border border-surface-border rounded-xl p-5 hover:bg-slate-50/50 transition-all duration-200">
              <h4 className="font-headline text-sm font-bold text-growth-green uppercase tracking-wider">3. Stock Exchange</h4>
              <p className="font-sans text-sm text-slate-500 mt-1 leading-relaxed">
                The marketplace where stocks are bought and sold, such as the New York Stock Exchange (NYSE) or Nasdaq. It acts as a trusted clearinghouse.
              </p>
            </div>
          </div>
        </section>

        {/* Learning by Example Box */}
        <section className="bg-success-light border-t-4 border-growth-green p-6 md:p-8 rounded-xl space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-growth-green text-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="font-headline text-xl font-bold text-market-navy">Learning by Example: Your First Trade</h3>
              <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed">
                Imagine "CoffeeCo", a fictional high-end roastery. They decide to "go public" to raise money for high-throughput espresso machines.
              </p>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-market-navy text-white font-headline text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-3 md:p-4 font-bold">Action</th>
                        <th className="p-3 md:p-4 font-bold">Price</th>
                        <th className="p-3 md:p-4 font-bold">Investment</th>
                        <th className="p-3 md:p-4 font-bold">Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-sm text-slate-500">
                      <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 md:p-4 font-bold text-market-navy">Buy 10 Shares</td>
                        <td className="p-3 md:p-4">$50.00</td>
                        <td className="p-3 md:p-4 font-mono">$500.00</td>
                        <td className="p-3 md:p-4 text-xs font-semibold">You own 10 slices of CoffeeCo</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 md:p-4 font-bold text-growth-green">Sell 10 Shares</td>
                        <td className="p-3 md:p-4">$75.00</td>
                        <td className="p-3 md:p-4 font-mono">$750.00</td>
                        <td className="p-3 md:p-4">
                          <span className="font-headline text-xs font-bold text-growth-green bg-success-light px-2 py-0.5 rounded-full inline-block">
                            +$250.00 Profit
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="font-sans text-[10px] italic text-slate-400">Note: This ignores brokerage fees and taxes for simplicity.</p>
            </div>
          </div>
        </section>

        {/* Interactive Quick Quiz Section */}
        <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <HelpIcon className="w-6 h-6 text-accent-blue" />
            <h3 className="font-headline text-xl font-bold text-market-navy">Lesson Checkpoint: Quick Quiz</h3>
          </div>

          <div className="space-y-4">
            <p className="font-sans text-sm md:text-base text-slate-600 font-semibold">
              What exactly are you purchasing when you buy a share of stock in a public company?
            </p>

            <div className="space-y-2.5">
              {quizOptions.map((option, idx) => (
                <button
                  key={idx}
                  disabled={isQuizSubmitted}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    selectedAnswer === idx
                      ? 'border-accent-blue bg-blue-50/30 text-market-navy font-bold'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span>{option}</span>
                  {selectedAnswer === idx && (
                    <div className="w-4 h-4 rounded-full bg-accent-blue flex items-center justify-center text-white flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Submit and Feedback Panel */}
            <div className="pt-2">
              {!isQuizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedAnswer === null}
                  className={`font-headline text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg transition-all cursor-pointer ${
                    selectedAnswer !== null
                      ? 'bg-market-navy hover:bg-opacity-95 text-white active:scale-95'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <div className={`p-4 rounded-xl flex items-start gap-3 border ${
                  isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50/50 border-rose-200 text-rose-800'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-headline text-sm font-bold">
                      {isCorrect ? "Correct! Amazing work." : "Incorrect Answer"}
                    </p>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed">
                      {isCorrect
                        ? "A share represents an authentic, fractional slice of equity. You now have legal ownership claims on corporate assets and profit distributions."
                        : "Remember, stocks represent corporate ownership, not credit cards, loans, or product warranty agreements. Try resetting your checkpoint or review the ideal definition above!"
                      }
                    </p>
                    {!isCorrect && (
                      <button
                        onClick={() => {
                          setSelectedAnswer(null);
                          setIsQuizSubmitted(false);
                        }}
                        className="font-headline text-xs font-bold text-rose-600 hover:underline pt-1.5 block"
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Screen Navigation */}
        <div className="flex justify-between items-center py-8 border-t border-slate-200">
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
            Next: Lesson 17
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Sidebar Content Widget (3 columns) */}
      <div className="lg:col-span-3 space-y-6">

        {/* Progress summary for this lesson */}
        <div className="bg-white border border-surface-border rounded-xl p-5 space-y-4 shadow-sm">
          <h4 className="font-headline text-xs font-bold text-slate-400 uppercase tracking-wider">In This Lesson</h4>
          <ul className="space-y-3 font-sans text-sm text-slate-600">
            <li className="flex items-center gap-2 text-growth-green font-semibold">
              <Check className="w-4 h-4" />
              <span>Concept of Equity</span>
            </li>
            <li className="flex items-center gap-2 text-growth-green font-semibold">
              <Check className="w-4 h-4" />
              <span>Shares &amp; Ownership</span>
            </li>
            <li className="flex items-center gap-2 text-growth-green font-semibold">
              <Check className="w-4 h-4" />
              <span>Hypothetical Trade</span>
            </li>
            <li className={`flex items-center gap-2 ${isCompleted ? 'text-growth-green font-semibold' : 'text-slate-400'}`}>
              {isCompleted ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-200"></div>}
              <span>Quick Quiz</span>
            </li>
          </ul>
        </div>

        {/* Tip Box */}
        <div className="bg-sky-50 border-l-4 border-accent-blue p-5 rounded-r-xl space-y-2">
          <h4 className="font-headline text-xs font-bold text-accent-blue uppercase tracking-wider">Academy Tip</h4>
          <p className="font-sans text-xs text-slate-600 leading-relaxed">
            "Don't confuse a company's product with its stock. You can love a company's coffee but hate its stock if it's overpriced."
          </p>
        </div>

        {/* Beautiful Image Context Box */}
        <div className="rounded-xl overflow-hidden border border-surface-border bg-white shadow-sm group">
          <div className="h-44 relative overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsgqm8jDiSI-i-4z7jSsudwV38kvqkmBDiD0Fl4sNrzOqFOuecJvrVkMc1eHoYqYxvDeIIXN3PHzkJKRC0HlDzJEsknt23PgwCSImhqgr8edg7ahbHEJDWn3gUdCKqHPFw3pRwxDF-ZYTuSAXx_mGVp5dGCrnJWEPPxToY2gEknSzp5Z3jy3IiCVqF5bQb4l-PAyGPA1aikJSjZSRQ9CQN5cV6nG32TbjcvszpX1_d5doTzkyZ7xkXNEZBurK1yuIWMhPbTFY51Ws"
              alt="Global Finance HQ Skyscraper Atrium"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-market-navy/85 via-market-navy/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white space-y-0.5">
              <p className="font-headline text-[9px] uppercase tracking-wider font-bold text-sky-200">The Exchange</p>
              <p className="font-headline text-sm font-bold leading-tight">Global Finance HQ</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
