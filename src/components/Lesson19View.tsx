import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  BarChart2,
  TrendingUp,
  Info,
  AlertCircle,
  TrendingDown
} from 'lucide-react';

interface Lesson19ViewProps {
  onPrev: () => void;
  onNext: () => void;
  onLessonComplete: (lessonId: string) => void;
  isCompleted: boolean;
}

type VolumeScenario = 'HEALTHY' | 'EXHAUSTION' | 'CLIMAX';

export default function Lesson19View({ onPrev, onNext, onLessonComplete, isCompleted }: Lesson19ViewProps) {
  const [selectedScenario, setSelectedScenario] = useState<VolumeScenario>('HEALTHY');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Scenario specific data
  const scenarioDetails = {
    HEALTHY: {
      title: 'Healthy Trend Confirmation',
      icon: <TrendingUp className="w-5 h-5 text-growth-green" />,
      description: 'Price rises on expanding volume and pulls back on contracting volume. This shows buyers are actively supporting the advance, confirming a strong, reliable trend.',
      interpretation: 'Bullish Continuation. Institutional players are accumulating shares as the price breaks to new highs.',
      tradingAction: 'Look to buy light pullbacks or support level bounces with tight risk parameters.',
      points: [
        { price: 100, vol: 150, color: 'emerald' },
        { price: 105, vol: 180, color: 'emerald' },
        { price: 103, vol: 90, color: 'rose' },
        { price: 110, vol: 250, color: 'emerald' },
        { price: 108, vol: 110, color: 'rose' },
        { price: 120, vol: 320, color: 'emerald' },
      ]
    },
    EXHAUSTION: {
      title: 'Buying Exhaustion (Bearish Divergence)',
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      description: 'The price continues to creep higher, making new local peaks, but the volume is steadily declining. This shows buying interest is evaporating, and the rally is fragile.',
      interpretation: 'Bearish Exhaustion. The advance is driven by low liquidity, not active institutional accumulation. Reversal is highly probable.',
      tradingAction: 'Refrain from chasing breakouts. Tighten trailing stops on long shares or initiate short-sale setups.',
      points: [
        { price: 100, vol: 300, color: 'emerald' },
        { price: 108, vol: 240, color: 'emerald' },
        { price: 106, vol: 150, color: 'rose' },
        { price: 115, vol: 110, color: 'emerald' },
        { price: 113, vol: 80, color: 'rose' },
        { price: 122, vol: 40, color: 'emerald' },
      ]
    },
    CLIMAX: {
      title: 'Selling Climax (Panic Capitulation)',
      icon: <TrendingDown className="w-5 h-5 text-red-500" />,
      description: 'A sharp, parabolic drop in price accompanied by a massive, extreme volume spike. This represents panic selling where the final weak-hand investors capitulate.',
      interpretation: 'Potential Local Bottom. Over-saturation of sellers often cleanses the market, leaving only strong buyers to accumulate.',
      tradingAction: 'Watch for a bullish candlestick reversal trigger (e.g. hammer or engulfing bar) to buy the absolute bottom.',
      points: [
        { price: 110, vol: 120, color: 'rose' },
        { price: 105, vol: 140, color: 'rose' },
        { price: 95, vol: 210, color: 'rose' },
        { price: 82, vol: 650, color: 'red' }, // Climate Spike
        { price: 88, vol: 380, color: 'emerald' },
        { price: 96, vol: 320, color: 'emerald' },
      ]
    }
  };

  const activeData = scenarioDetails[selectedScenario];

  const handleQuizSubmit = () => {
    if (!quizAnswer) return;
    setQuizSubmitted(true);
    if (quizAnswer === 'divergence') {
      onLessonComplete('lesson-19');
    }
  };

  return (
    <div id="lesson19-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in pb-16">
      {/* Primary Content Column (8 spans) */}
      <div className="lg:col-span-8 space-y-8">

        {/* Header Breadcrumbs */}
        <header className="space-y-4">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-lg font-headline text-xs font-bold uppercase tracking-wider">
            Lesson 19
          </span>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-market-navy">Volume Analysis: Confirming Trends</h1>
          <p className="font-sans text-base md:text-lg text-slate-500 max-w-3xl leading-relaxed">
            Price action is the map, but volume is the fuel. Learn to spot the vital difference between high-confidence trend advances and fragile, exhausted rallies.
          </p>
        </header>

        {/* Dynamic Scenario Selection */}
        <div className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div>
              <h3 className="font-headline text-lg font-bold text-market-navy flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-growth-green" />
                Interactive Volume Scenario Guide
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-0.5">Toggle real volume structures to visualize market mechanics.</p>
            </div>

            {/* Scenarios tab bar */}
            <div className="flex bg-slate-100 p-1 rounded-lg gap-1 self-start md:self-center">
              {(['HEALTHY', 'EXHAUSTION', 'CLIMAX'] as VolumeScenario[]).map((scen) => (
                <button
                  key={scen}
                  onClick={() => {
                    setSelectedScenario(scen);
                    // Reset quiz if switching
                  }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold font-headline transition-all cursor-pointer ${
                    selectedScenario === scen
                      ? 'bg-white text-market-navy shadow-sm'
                      : 'text-slate-500 hover:text-market-navy'
                  }`}
                >
                  {scen === 'HEALTHY' ? 'Healthy Trend' : scen === 'EXHAUSTION' ? 'Exhaustion' : 'Panic Climax'}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Price & Volume Graph Canvas */}
          <div className="bg-slate-950 p-6 rounded-xl relative overflow-hidden border border-slate-900 shadow-inner">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              Live Sandbox Simulator
            </div>

            {/* Price Line chart representation */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 font-semibold uppercase">
                <span>Price Line ($)</span>
                <span>Relative Peak</span>
              </div>
              <div className="h-44 relative flex items-end justify-between px-6 pt-8 pb-4">
                {/* Connecting SVG Path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <path
                    d={
                      selectedScenario === 'HEALTHY'
                        ? 'M 40 120 L 120 100 L 200 110 L 280 80 L 360 90 L 440 40'
                        : selectedScenario === 'EXHAUSTION'
                        ? 'M 40 120 L 120 100 L 200 110 L 280 85 L 360 95 L 440 65'
                        : 'M 40 50 L 120 70 L 200 95 L 280 155 L 360 135 L 440 110'
                    }
                    fill="none"
                    stroke={selectedScenario === 'CLIMAX' ? '#ef4444' : '#10b981'}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-500"
                  />
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="100%" y2="40" stroke="#1e293b" strokeDasharray="3" />
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#1e293b" strokeDasharray="3" />
                  <line x1="0" y1="140" x2="100%" y2="140" stroke="#1e293b" strokeDasharray="3" />
                </svg>

                {/* Graph Dots */}
                {activeData.points.map((pt, idx) => {
                  let topVal = '';
                  if (selectedScenario === 'HEALTHY') {
                    const tops = ['top-[112px]', 'top-[92px]', 'top-[102px]', 'top-[72px]', 'top-[82px]', 'top-[32px]'];
                    topVal = tops[idx];
                  } else if (selectedScenario === 'EXHAUSTION') {
                    const tops = ['top-[112px]', 'top-[92px]', 'top-[102px]', 'top-[77px]', 'top-[87px]', 'top-[57px]'];
                    topVal = tops[idx];
                  } else {
                    const tops = ['top-[42px]', 'top-[62px]', 'top-[87px]', 'top-[147px]', 'top-[127px]', 'top-[102px]'];
                    topVal = tops[idx];
                  }

                  return (
                    <div
                      key={idx}
                      className={`absolute w-3 h-3 rounded-full bg-white border-2 border-growth-green transition-all duration-500 ${topVal} hover:scale-150 cursor-pointer shadow-md`}
                      style={{ left: `${(idx / 5) * 85 + 6}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white font-mono text-[9px] px-1 rounded font-bold">
                        ${pt.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Volume bar chart representation */}
            <div className="space-y-1 border-t border-slate-800 pt-3 mt-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 font-semibold uppercase">
                <span>Volume Profile (Contracts)</span>
                <span>Spike Threshold</span>
              </div>
              <div className="h-20 flex items-end justify-between px-6">
                {activeData.points.map((pt, idx) => {
                  // Max size calculation
                  const barHeight = Math.min(100, (pt.vol / 650) * 100);
                  const isSpike = pt.vol > 400;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative" style={{ maxWidth: '40px' }}>
                      <div
                        className={`w-4 rounded-t transition-all duration-500 ${
                          isSpike
                            ? 'bg-rose-500 animate-pulse'
                            : pt.color === 'emerald'
                            ? 'bg-emerald-500'
                            : 'bg-rose-400'
                        }`}
                        style={{ height: `${barHeight}%` }}
                      ></div>
                      <span className="font-mono text-[9px] text-slate-500 mt-1">{pt.vol}k</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Scenario Written Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <h4 className="font-headline text-sm font-bold text-market-navy flex items-center gap-2">
                {activeData.icon}
                {activeData.title}
              </h4>
              <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
                {activeData.description}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-100">
              <div>
                <p className="font-headline text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trading Interpretation</p>
                <p className="font-sans text-xs text-market-navy font-bold mt-0.5 leading-relaxed">{activeData.interpretation}</p>
              </div>
              <div>
                <p className="font-headline text-[10px] font-bold text-slate-400 uppercase tracking-wider">Action Guidelines</p>
                <p className="font-sans text-xs text-slate-500 mt-0.5 leading-relaxed">{activeData.tradingAction}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Mini-Test */}
        <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-4">
          <h3 className="font-headline text-lg font-bold text-market-navy">Lesson Checkpoint: Pattern Recognition</h3>
          <p className="font-sans text-sm text-slate-600">
            What term describes a scenario where the stock price prints a brand new all-time high, but the volume registers its lowest level in months?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => setQuizAnswer('climax')}
              disabled={quizSubmitted}
              className={`p-3.5 text-left text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                quizAnswer === 'climax'
                  ? 'border-accent-blue bg-blue-50/50 text-market-navy font-bold'
                  : 'border-slate-100 hover:bg-slate-50 text-slate-500'
              }`}
            >
              Volume Climax (Capitulation)
            </button>
            <button
              onClick={() => setQuizAnswer('divergence')}
              disabled={quizSubmitted}
              className={`p-3.5 text-left text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                quizAnswer === 'divergence'
                  ? 'border-accent-blue bg-blue-50/50 text-market-navy font-bold'
                  : 'border-slate-100 hover:bg-slate-50 text-slate-500'
              }`}
            >
              Bearish Volume Divergence
            </button>
          </div>

          <div className="pt-2">
            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={!quizAnswer}
                className={`font-headline text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all cursor-pointer ${
                  quizAnswer
                    ? 'bg-market-navy text-white hover:bg-opacity-95 active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <div className={`p-4 rounded-xl flex items-start gap-3 border ${
                quizAnswer === 'divergence'
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50/50 border-rose-200 text-rose-800'
              }`}>
                {quizAnswer === 'divergence' ? (
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <span className="text-rose-600 font-bold flex-shrink-0">✕</span>
                )}
                <div>
                  <h4 className="font-headline text-xs font-bold">
                    {quizAnswer === 'divergence' ? 'Correct! Bearish Volume Divergence.' : 'Incorrect Option'}
                  </h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed mt-1">
                    {quizAnswer === 'divergence'
                      ? 'By confirming price rallies are losing volume fuel, you avoid buying vulnerable breakouts right before a market reversal.'
                      : 'Remember, a massive selling spike indicates capitulation. Price creeping upwards on low interest is an accumulation divergence. Reset and try again!'
                    }
                  </p>
                  {quizAnswer !== 'divergence' && (
                    <button
                      onClick={() => { setQuizAnswer(null); setQuizSubmitted(false); }}
                      className="font-headline text-[10px] font-bold text-rose-600 hover:underline mt-2 block"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Screen Navigation */}
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
            Next: Lesson 20
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Sidebar Info column */}
      <div className="lg:col-span-4 space-y-6">

        {/* Core Indicators quick facts */}
        <div className="bg-white border border-surface-border rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="font-headline text-xs font-bold text-market-navy uppercase tracking-wider border-b border-slate-100 pb-2">
            Volume indicators
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-headline text-xs font-bold text-market-navy">OBV (On-Balance Volume)</h4>
              <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed">
                A running total of volume that incorporates up-day and down-day movements. It helps confirm whether institutions are buying or liquidating assets.
              </p>
            </div>
            <div>
              <h4 className="font-headline text-xs font-bold text-market-navy">Volume Profile</h4>
              <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed">
                An advanced indicator displaying trading activity over a specified period at specific price levels rather than time bars, showing where heavy supply sits.
              </p>
            </div>
          </div>
        </div>

        {/* Infotip box */}
        <div className="bg-sky-50 border-l-4 border-accent-blue p-5 rounded-r-xl space-y-2">
          <h4 className="font-headline text-xs font-bold text-accent-blue uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            Expert Consensus
          </h4>
          <p className="font-sans text-xs text-slate-600 leading-relaxed">
            "Price can be manipulated on low share liquidity, but volume cannot lie. It is the absolute signature of institutional accumulation."
          </p>
        </div>

      </div>
    </div>
  );
}
