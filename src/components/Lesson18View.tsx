import { useState, Dispatch, SetStateAction } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Play,
  TrendingUp,
  Activity,
  Zap,
  DollarSign,
  Briefcase,
  Layers,
  History
} from 'lucide-react';
import { Transaction, UserProgress } from '../types';

interface Lesson18ViewProps {
  onPrev: () => void;
  onNext: () => void;
  onLessonComplete: (lessonId: string) => void;
  isCompleted: boolean;
  progress: UserProgress;
  setProgress: Dispatch<SetStateAction<UserProgress>>;
}

export default function Lesson18View({ onPrev, onNext, onLessonComplete, isCompleted, progress, setProgress }: Lesson18ViewProps) {
  // Simulator State
  const [ticker, setTicker] = useState('AAPL');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [action, setAction] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState(50);
  const [limitPrice, setLimitPrice] = useState(185.00);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    {
      id: 'tx-0',
      timestamp: 'Just now',
      type: 'BUY',
      orderType: 'MARKET',
      ticker: 'COF',
      quantity: 10,
      price: 64.80,
      totalValue: 648.00,
      status: 'EXECUTED'
    }
  ]);
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });

  // Ticker base prices
  const tickerPrices: { [key: string]: number } = {
    AAPL: 185.20,
    TSLA: 210.50,
    COF: 64.80,
    SPY: 541.22
  };

  const currentBasePrice = tickerPrices[ticker] || 100;

  // Generate dynamic simulated order book based on current base price
  const simulatedOrderBook = {
    asks: [
      { price: currentBasePrice + 0.12, size: 450 },
      { price: currentBasePrice + 0.05, size: 200 },
      { price: currentBasePrice + 0.02, size: 100 },
    ],
    bids: [
      { price: currentBasePrice - 0.02, size: 150 },
      { price: currentBasePrice - 0.06, size: 300 },
      { price: currentBasePrice - 0.15, size: 600 },
    ]
  };

  const handleExecuteTrade = () => {
    const basePrice = currentBasePrice;
    let finalExecutionPrice = basePrice;
    let status: 'EXECUTED' | 'PENDING' = 'EXECUTED';
    let slippage = 0;

    // Calculate execution price and slippage
    if (orderType === 'MARKET') {
      if (action === 'BUY') {
        // Buy from the lowest ask
        finalExecutionPrice = simulatedOrderBook.asks[2].price;
        slippage = finalExecutionPrice - basePrice;
      } else {
        // Sell to the highest bid
        finalExecutionPrice = simulatedOrderBook.bids[0].price;
        slippage = basePrice - finalExecutionPrice;
      }
    } else {
      // LIMIT Order
      if (action === 'BUY') {
        if (limitPrice >= basePrice) {
          finalExecutionPrice = limitPrice;
          status = 'EXECUTED';
        } else {
          status = 'PENDING';
        }
      } else {
        if (limitPrice <= basePrice) {
          finalExecutionPrice = limitPrice;
          status = 'EXECUTED';
        } else {
          status = 'PENDING';
        }
      }
    }

    const totalValue = finalExecutionPrice * quantity;

    if (action === 'BUY' && totalValue > progress.balance && status === 'EXECUTED') {
      setFeedback({
        text: `Transaction failed: Insufficient simulator funds. Required $${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}.`,
        type: 'error'
      });
      return;
    }

    if (action === 'SELL' && status === 'EXECUTED') {
      const existingShares = progress.portfolioShares[ticker] || 0;
      if (existingShares < quantity) {
        setFeedback({
          text: `Transaction failed: Insufficient shares in sandbox portfolio. You only hold ${existingShares} shares of ${ticker}.`,
          type: 'error'
        });
        return;
      }
    }

    // Success - process trade
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: action,
      orderType: orderType,
      ticker: ticker,
      quantity: quantity,
      price: finalExecutionPrice,
      totalValue: totalValue,
      status: status
    };

    setRecentTransactions(prev => [newTx, ...prev]);

    // Update global progress state reactively
    setProgress(prev => {
      const updatedBalance = status === 'EXECUTED'
        ? (action === 'BUY' ? prev.balance - totalValue : prev.balance + totalValue)
        : prev.balance;

      const currentShares = prev.portfolioShares[ticker] || 0;
      const updatedShares = status === 'EXECUTED'
        ? (action === 'BUY' ? currentShares + quantity : currentShares - quantity)
        : currentShares;

      const updatedPortfolio = { ...prev.portfolioShares };
      if (updatedShares > 0) {
        updatedPortfolio[ticker] = updatedShares;
      } else {
        delete updatedPortfolio[ticker];
      }

      return {
        ...prev,
        balance: updatedBalance,
        portfolioShares: updatedPortfolio
      };
    });

    if (status === 'EXECUTED') {
      setFeedback({
        text: `Sandbox order executed! ${action} ${quantity} shares of $${ticker} @ $${finalExecutionPrice.toFixed(2)}. ${
          orderType === 'MARKET' ? `Execution slippage: $${(slippage * quantity).toFixed(2)}.` : ''
        }`,
        type: 'success'
      });
      onLessonComplete('lesson-18');
    } else {
      setFeedback({
        text: `Limit order submitted to simulated order book as PENDING. Trigger price set to $${limitPrice.toFixed(2)}.`,
        type: 'success'
      });
    }
  };

  return (
    <div id="lesson18-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in pb-16">
      {/* Primary content area */}
      <div className="lg:col-span-8 space-y-8">

        {/* Breadcrumb Header */}
        <header className="space-y-4">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-lg font-headline text-xs font-bold uppercase tracking-wider">
            Lesson 18
          </span>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-market-navy">Market Orders vs Limit Orders</h1>
          <p className="font-sans text-base md:text-lg text-slate-500 max-w-3xl leading-relaxed">
            How you send orders to the exchange matters. Learn the vital differences between prioritizing execution speed vs execution price.
          </p>
        </header>

        {/* Dual Core Concept Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Market Orders */}
          <div className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-4 shadow-sm hover:border-growth-green transition-colors">
            <div className="flex justify-between items-start">
              <span className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </span>
              <span className="font-headline text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full uppercase">Priority: Speed</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-market-navy">Market Orders</h3>
            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
              Executes immediately at the best available current price on the exchange. High certainty of execution, but carries risk of <strong>slippage</strong> in fast-moving, high-volatility, or low-liquidity stock conditions.
            </p>
          </div>

          {/* Limit Orders */}
          <div className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-4 shadow-sm hover:border-growth-green transition-colors">
            <div className="flex justify-between items-start">
              <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </span>
              <span className="font-headline text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase">Priority: Price</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-market-navy">Limit Orders</h3>
            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
              Executes only at your specified limit price or better. This guarantees price control, but the order remains unexecuted (pending) if the market price never reaches your trigger point.
            </p>
          </div>
        </div>

        {/* Interactive Order Routing Simulator */}
        <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 flex-wrap gap-4">
            <div>
              <h3 className="font-headline text-lg font-bold text-market-navy flex items-center gap-2">
                <Activity className="w-5 h-5 text-growth-green animate-pulse" />
                Live Order Book Simulator
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-0.5">Test real slippage and order queue parameters in our sandbox engine.</p>
            </div>

            {/* Simulation Balance display */}
            <div className="bg-success-light border border-emerald-200 px-4 py-2 rounded-xl flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-growth-green" />
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500 font-headline">Simulated Balance</p>
                <p className="font-headline text-sm font-bold text-growth-green">
                  ${progress.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Left: Input parameters */}
            <div className="md:col-span-7 space-y-5">

              {/* Ticker select & buy/sell */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Asset</label>
                  <select
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-headline text-sm font-bold text-market-navy focus:outline-none focus:border-accent-blue"
                  >
                    <option value="AAPL">$AAPL (Apple, Inc.)</option>
                    <option value="TSLA">$TSLA (Tesla Motors)</option>
                    <option value="COF">$COF (CoffeeCo Inc.)</option>
                    <option value="SPY">$SPY (S&amp;P 500 ETF)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Action</label>
                  <div className="grid grid-cols-2 bg-slate-50 border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => setAction('BUY')}
                      className={`py-1.5 rounded text-xs font-bold font-headline transition-all cursor-pointer ${
                        action === 'BUY' ? 'bg-growth-green text-white shadow-sm' : 'text-slate-500 hover:text-market-navy'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setAction('SELL')}
                      className={`py-1.5 rounded text-xs font-bold font-headline transition-all cursor-pointer ${
                        action === 'SELL' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-500 hover:text-market-navy'
                      }`}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Type & Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Order Type</label>
                  <div className="grid grid-cols-2 bg-slate-50 border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => setOrderType('MARKET')}
                      className={`py-1.5 rounded text-xs font-bold font-headline transition-all cursor-pointer ${
                        orderType === 'MARKET' ? 'bg-market-navy text-white shadow-sm' : 'text-slate-500 hover:text-market-navy'
                      }`}
                    >
                      Market
                    </button>
                    <button
                      onClick={() => setOrderType('LIMIT')}
                      className={`py-1.5 rounded text-xs font-bold font-headline transition-all cursor-pointer ${
                        orderType === 'LIMIT' ? 'bg-market-navy text-white shadow-sm' : 'text-slate-500 hover:text-market-navy'
                      }`}
                    >
                      Limit
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">Shares Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-headline text-sm font-bold text-market-navy focus:outline-none focus:border-accent-blue"
                  />
                </div>
              </div>

              {/* Conditional Limit Price */}
              {orderType === 'LIMIT' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-bold text-slate-500 uppercase font-headline mb-1.5">
                    Limit Trigger Price ($)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</div>
                    <input
                      type="number"
                      step="0.01"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(Math.max(0.01, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-4 py-2 font-headline text-sm font-bold text-market-navy focus:outline-none focus:border-accent-blue"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 italic mt-1.5">
                    Order executes only if market prints {action === 'BUY' ? `≤ $${limitPrice.toFixed(2)}` : `≥ $${limitPrice.toFixed(2)}`}. Current: ${currentBasePrice.toFixed(2)}.
                  </p>
                </div>
              )}

              {/* Execution Feedback Banner */}
              {feedback.text && (
                <div className={`p-3.5 rounded-lg text-xs font-medium border ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50/50 border-rose-200 text-rose-800'
                }`}>
                  {feedback.text}
                </div>
              )}

              <button
                onClick={handleExecuteTrade}
                className="w-full bg-growth-green hover:bg-opacity-95 text-white font-headline text-xs font-bold uppercase tracking-wider py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Execute Sandbox Trade
              </button>

            </div>

            {/* Right: Real-time Order Book representation */}
            <div className="md:col-span-5 bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-4">
              <h4 className="font-headline text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center pb-2 border-b border-slate-200">
                Simulated Queue Depth
              </h4>

              <div className="space-y-4">
                {/* ASKS (Sells) */}
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-wider font-bold text-red-500 font-headline pl-1 mb-1">ASKS (Offerings)</p>
                  {simulatedOrderBook.asks.map((ask, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-mono py-1 px-2 rounded hover:bg-red-50/50 transition-colors">
                      <span className="text-red-600 font-semibold">${ask.price.toFixed(2)}</span>
                      <span className="text-slate-500">{ask.size} shs</span>
                    </div>
                  ))}
                </div>

                {/* SPREAD INDICATOR */}
                <div className="py-1 px-2 bg-white/80 rounded border border-slate-200/50 flex justify-between items-center text-[10px] font-semibold text-slate-500">
                  <span>SPREAD:</span>
                  <span className="font-mono">$0.04</span>
                </div>

                {/* BIDS (Buys) */}
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-wider font-bold text-emerald-600 font-headline pl-1 mb-1">BIDS (Demands)</p>
                  {simulatedOrderBook.bids.map((bid, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-mono py-1 px-2 rounded hover:bg-emerald-50/50 transition-colors">
                      <span className="text-emerald-600 font-semibold">${bid.price.toFixed(2)}</span>
                      <span className="text-slate-500">{bid.size} shs</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Recent Transactions Log */}
        <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-4">
          <h3 className="font-headline text-lg font-bold text-market-navy flex items-center gap-2">
            <History className="w-5 h-5 text-slate-500" />
            Recent Simulated Orders
          </h3>
          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 font-headline text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Asset</th>
                  <th className="p-3">Method</th>
                  <th className="p-3 text-right">Shares</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="font-sans text-xs text-slate-600">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 font-medium font-mono text-[10px] text-slate-400">{tx.timestamp}</td>
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        tx.type === 'BUY' ? 'bg-success-light text-growth-green' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-market-navy">${tx.ticker}</td>
                    <td className="p-3 text-[10px] font-semibold text-slate-400">{tx.orderType}</td>
                    <td className="p-3 text-right font-semibold">{tx.quantity}</td>
                    <td className="p-3 text-right font-mono">${tx.price.toFixed(2)}</td>
                    <td className="p-3 text-right font-mono font-semibold">${tx.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.status === 'EXECUTED' ? 'bg-sky-50 text-accent-blue' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Screen Navigation */}
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
            Next: Lesson 19
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Sidebar Info Panel */}
      <div className="lg:col-span-4 space-y-6">

        {/* Simulation Rules box */}
        <div className="bg-white border border-surface-border rounded-xl p-5 space-y-4 shadow-sm">
          <h3 className="font-headline text-xs font-bold text-market-navy uppercase tracking-wider border-b border-slate-100 pb-2">
            Simulation Rules
          </h3>
          <ul className="space-y-3 font-sans text-xs text-slate-500 leading-relaxed">
            <li className="flex gap-2">
              <span className="text-growth-green font-bold">●</span>
              <p>Liquid assets are populated using real-time quotes delayed by 15 mins.</p>
            </li>
            <li className="flex gap-2">
              <span className="text-growth-green font-bold">●</span>
              <p>Simulated orders incur zero commission or broker handling fees.</p>
            </li>
            <li className="flex gap-2">
              <span className="text-growth-green font-bold">●</span>
              <p>You can execute short positions as well in alignment with lesson 17 instructions!</p>
            </li>
          </ul>
        </div>

        {/* What is Slippage widget */}
        <div className="bg-white border border-surface-border rounded-xl p-5 space-y-3 shadow-sm">
          <h3 className="font-headline text-xs font-bold text-market-navy uppercase tracking-wider border-b border-slate-100 pb-2">
            What is Slippage?
          </h3>
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            Slippage occurs when a market order executes at a price different from the expected price. This happens during high volatility or because the order book has limited queue sizes at the immediate bid or ask level.
          </p>
          <div className="p-3 bg-orange-50/50 border border-orange-100 rounded-lg text-xs font-sans text-orange-800 leading-relaxed">
            <strong>Hot Tip:</strong> Keep order sizes small or use <strong>Limit Orders</strong> when trading in low-liquidity stock environments to completely eliminate slippage.
          </div>
        </div>

      </div>
    </div>
  );
}
