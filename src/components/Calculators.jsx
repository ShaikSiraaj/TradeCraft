import React, { useState } from 'react';
import { HelpCircle, Sparkles, Check, Play } from 'lucide-react';

function Calculators({ type }) {
  // Calculator 1: Earnings/Valuation
  const [sharePrice, setSharePrice] = useState(150);
  const [netIncome, setNetIncome] = useState(50000000);
  const [totalShares, setTotalShares] = useState(10000000);

  // Calculator 2: Candlestick Practice
  const [patternScore, setPatternScore] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [patternFeedback, setPatternFeedback] = useState('');

  // 1. Calculations
  const eps = parseFloat((netIncome / totalShares).toFixed(2));
  const peRatio = parseFloat((sharePrice / eps).toFixed(2));

  // 2. Candlestick Mini-Game
  const CANDLESTICK_SCENARIOS = [
    {
      id: 'hammer',
      title: 'Hammer Reversal Pattern',
      description: 'A hammer pattern occurs at the bottom of a downtrend. The stock opens, sellers push the price way down, but strong buying volume pushes the close back up near the top.',
      candle: (
        <div className="flex flex-col items-center p-6 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 w-32">
          <div className="w-0.5 bg-slate-500 h-2"></div>
          <div className="w-10 bg-emerald-500 h-5 border border-emerald-600 rounded flex items-center justify-center text-[8px] text-white font-bold">Body</div>
          <div className="w-0.5 bg-slate-500 h-20"></div>
          <span className="text-[10px] text-slate-400 mt-2 font-mono">Long lower wick</span>
        </div>
      ),
      question: "What does this Hammer candlestick indicate about current market psychology?",
      options: [
        { text: 'Sellers are fully in control and the price will drop much lower.', correct: false },
        { text: 'Sellers tried to crash the price, but buyers aggressively bought the dip, signaling a potential bullish bounce.', correct: true },
        { text: 'A completely neutral market with zero trade activity.', correct: false }
      ]
    },
    {
      id: 'engulfing',
      title: 'Bullish Engulfing Pattern',
      description: 'A large bullish (green) candle body completely covers or engulfs the previous day\'s small bearish (red) candle body, showing complete takeover by buyers.',
      candle: (
        <div className="flex items-end gap-3 p-6 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 w-44 justify-center">
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-slate-400">Day 1</span>
            <div className="w-0.5 bg-slate-500 h-3"></div>
            <div className="w-6 bg-rose-500 h-8 border border-rose-600 rounded"></div>
            <div className="w-0.5 bg-slate-500 h-3"></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-slate-400 font-bold text-emerald-500 font-mono">Day 2 (Engulfs)</span>
            <div className="w-0.5 bg-slate-500 h-2"></div>
            <div className="w-10 bg-emerald-500 h-16 border border-emerald-600 rounded"></div>
            <div className="w-0.5 bg-slate-500 h-2"></div>
          </div>
        </div>
      ),
      question: "Which of the following is required for a pattern to be considered a 'Bullish Engulfing'?",
      options: [
        { text: 'Day 2 candle body must be smaller than Day 1.', correct: false },
        { text: 'Day 2 green candle body must completely overlap or exceed the range of Day 1 red candle body.', correct: true },
        { text: 'Both candles must be red.', correct: false }
      ]
    }
  ];

  const handlePatternAnswer = (scenarioId, isCorrect) => {
    if (isCorrect) {
      setPatternFeedback('Fantastic job! You identified the pattern behavior correctly. You earned +10 Progress Points!');
      setPatternScore(prev => prev + 10);
    } else {
      setPatternFeedback('Oops, that is incorrect. Re-read the definition of the candlestick pattern and try again.');
    }
    setSelectedPattern(scenarioId);
  };

  return (
    <div className="space-y-6">

      {/* RENDER CALCULATOR: Valuation Metrics calculator */}
      {type === 'earnings' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 font-medium">Input your mock financials below and see how the P/E valuation updates in real-time!</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="share-price-input" className="text-xs font-bold text-slate-400 block mb-1">Share Price ($)</label>
              <input
                id="share-price-input"
                type="number"
                value={sharePrice}
                onChange={(e) => setSharePrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm outline-none font-mono"
              />
            </div>
            <div>
              <label htmlFor="net-income-input" className="text-xs font-bold text-slate-400 block mb-1">Net Annual Income ($)</label>
              <input
                id="net-income-input"
                type="number"
                value={netIncome}
                onChange={(e) => setNetIncome(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm outline-none font-mono"
              />
            </div>
            <div>
              <label htmlFor="total-shares-input" className="text-xs font-bold text-slate-400 block mb-1">Outstanding Shares</label>
              <input
                id="total-shares-input"
                type="number"
                value={totalShares}
                onChange={(e) => setTotalShares(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm outline-none font-mono"
              />
            </div>
          </div>

          {/* Results Board */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Earnings Per Share (EPS)</span>
                <span className="text-[10px] text-slate-400">Net Income ÷ Total Shares</span>
              </div>
              <span className="text-xl font-black font-mono text-indigo-500">${eps.toFixed(2)}</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Price-to-Earnings (P/E) Ratio</span>
                <span className="text-[10px] text-slate-400">Share Price ÷ EPS</span>
              </div>
              <span className={`text-xl font-black font-mono ${peRatio < 15 ? 'text-emerald-500' : peRatio > 35 ? 'text-amber-500' : 'text-slate-800 dark:text-slate-200'}`}>{peRatio.toFixed(1)}x</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 italic mt-1">
            * Note: A lower P/E ratio generally suggests the stock could be undervalued, whereas a high P/E ratio suggests investors anticipate high future growth or the stock might be overvalued.
          </div>
        </div>
      )}

      {/* RENDER INTERACTIVE CANDLESTICK MATCHING MINI-GAME */}
      {type === 'candlestick' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500 font-medium">Test your ability to recognize candlestick patterns. Match options with their correct market psychology.</p>
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-full font-mono">Pattern Score: {patternScore} pts</span>
          </div>

          <div className="space-y-8 divide-y divide-slate-200 dark:divide-slate-800/60">
            {CANDLESTICK_SCENARIOS.map((scenario) => (
              <div key={scenario.id} className="pt-6 first:pt-0 flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="flex-shrink-0">{scenario.candle}</div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-200">{scenario.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{scenario.description}</p>

                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{scenario.question}</div>

                  <div className="space-y-2">
                    {scenario.options.map((opt, idx) => {
                      const isChosen = selectedPattern === scenario.id;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handlePatternAnswer(scenario.id, opt.correct)}
                          disabled={isChosen}
                          className={`w-full text-left p-3 border rounded-xl text-xs font-medium transition flex items-center justify-between ${isChosen ? (opt.correct ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600' : 'opacity-50 cursor-not-allowed border-slate-200 dark:border-slate-850') : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
                        >
                          <span>{opt.text}</span>
                          {isChosen && opt.correct && <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {patternFeedback && (
            <div className="p-4 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-bold text-center border border-emerald-500/20">
              {patternFeedback}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default Calculators;
