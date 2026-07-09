import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  History,
  Briefcase,
  Search,
  ChevronRight
} from 'lucide-react';

const SAMPLE_TICKERS = ['AAPL', 'MSFT', 'TSLA', 'AMZN', 'NVDA', 'BTC'];

// Historical generator for our charts
const generateInitialChartData = (basePrice) => {
  const data = [];
  let curr = basePrice * 0.95;
  for (let i = 0; i < 30; i++) {
    const change = (Math.random() - 0.48) * (basePrice * 0.015);
    const open = curr;
    const close = curr + change;
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.005);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.005);
    data.push({
      time: i,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });
    curr = close;
  }
  return data;
};

function Simulator({
  isWidget = false,
  balance,
  setBalance,
  portfolio,
  setPortfolio,
  trades,
  setTrades,
  currentPrices
}) {
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const [orderType, setOrderType] = useState('BUY'); // 'BUY' or 'SELL'
  const [executionType, setExecutionType] = useState('MARKET'); // 'MARKET' or 'LIMIT'
  const [limitPrice, setLimitPrice] = useState('');
  const [sharesInput, setSharesInput] = useState('10');
  const [chartData, setChartData] = useState({});
  const [feedback, setFeedback] = useState({ message: '', error: false });
  const [searchQuery, setSearchQuery] = useState('');

  const currentPrice = currentPrices[selectedTicker] || 100.00;

  // Initialize and update chart data
  useEffect(() => {
    // Generate initial 30 days of data per ticker if not present
    const initializedData = {};
    SAMPLE_TICKERS.forEach(ticker => {
      initializedData[ticker] = generateInitialChartData(currentPrices[ticker]);
    });
    setChartData(initializedData);
  }, []);

  // Simulate price ticks appending to chart data
  useEffect(() => {
    setChartData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(ticker => {
        const series = [...(updated[ticker] || [])];
        if (series.length === 0) return;

        // Update the last candle or add a new one
        const lastCandle = { ...series[series.length - 1] };
        const price = currentPrices[ticker];

        // Randomly either update the current candle or add a new candle
        if (Math.random() > 0.7) {
          // Add new candle
          const newOpen = lastCandle.close;
          const newClose = price;
          const newHigh = Math.max(newOpen, newClose) + Math.random() * (price * 0.002);
          const newLow = Math.min(newOpen, newClose) - Math.random() * (price * 0.002);
          series.push({
            time: series.length,
            open: parseFloat(newOpen.toFixed(2)),
            high: parseFloat(newHigh.toFixed(2)),
            low: parseFloat(newLow.toFixed(2)),
            close: parseFloat(newClose.toFixed(2))
          });
          if (series.length > 40) series.shift(); // keep last 40 candles
        } else {
          // Mutate the last candle
          lastCandle.close = price;
          lastCandle.high = parseFloat(Math.max(lastCandle.high, price).toFixed(2));
          lastCandle.low = parseFloat(Math.min(lastCandle.low, price).toFixed(2));
          series[series.length - 1] = lastCandle;
        }
        updated[ticker] = series;
      });
      return updated;
    });
  }, [currentPrices]);

  // Set default limit price when switching to LIMIT execution
  useEffect(() => {
    if (executionType === 'LIMIT') {
      setLimitPrice(currentPrice.toString());
    }
  }, [executionType, selectedTicker]);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setFeedback({ message: '', error: false });

    const shares = parseInt(sharesInput);
    if (isNaN(shares) || shares <= 0) {
      setFeedback({ message: 'Please enter a valid positive number of shares.', error: true });
      return;
    }

    const tradePrice = executionType === 'LIMIT' ? parseFloat(limitPrice) : currentPrice;
    if (isNaN(tradePrice) || tradePrice <= 0) {
      setFeedback({ message: 'Please enter a valid target execution price.', error: true });
      return;
    }

    // Limit order execution pre-validation (Mock instant fill)
    if (executionType === 'LIMIT') {
      if (orderType === 'BUY' && tradePrice < currentPrice) {
        setFeedback({ message: `Limit Buy placed at $${tradePrice.toFixed(2)}. In a real exchange, this executes when price drops. For learning, we filled it instantly!`, error: false });
      } else if (orderType === 'SELL' && tradePrice > currentPrice) {
        setFeedback({ message: `Limit Sell placed at $${tradePrice.toFixed(2)}. In a real exchange, this executes when price rises. For learning, we filled it instantly!`, error: false });
      }
    }

    const totalCost = parseFloat((shares * tradePrice).toFixed(2));

    if (orderType === 'BUY') {
      if (totalCost > balance) {
        setFeedback({ message: `Insufficient balance! You need $${totalCost.toLocaleString()} but only have $${balance.toLocaleString()}.`, error: true });
        return;
      }

      // Deduct balance
      setBalance(prev => parseFloat((prev - totalCost).toFixed(2)));

      // Add to portfolio
      setPortfolio(prev => {
        const existing = prev.find(p => p.ticker === selectedTicker);
        if (existing) {
          const totalShares = existing.quantity + shares;
          const avgPrice = parseFloat(((existing.avgPrice * existing.quantity + tradePrice * shares) / totalShares).toFixed(2));
          return prev.map(p => p.ticker === selectedTicker ? { ...p, quantity: totalShares, avgPrice } : p);
        } else {
          return [...prev, { ticker: selectedTicker, quantity: shares, avgPrice: tradePrice }];
        }
      });

      // Log trade
      setTrades(prev => [
        {
          id: Date.now(),
          ticker: selectedTicker,
          type: 'BUY',
          shares,
          price: tradePrice,
          total: totalCost,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);

      setFeedback({ message: `Successfully bought ${shares} shares of ${selectedTicker} for $${totalCost.toLocaleString()}!`, error: false });
    } else {
      // SELL order
      const existing = portfolio.find(p => p.ticker === selectedTicker);
      if (!existing || existing.quantity < shares) {
        setFeedback({ message: `Insufficient shares! You own ${existing ? existing.quantity : 0} shares of ${selectedTicker}, but want to sell ${shares}.`, error: true });
        return;
      }

      // Add to balance
      setBalance(prev => parseFloat((prev + totalCost).toFixed(2)));

      // Remove / reduce from portfolio
      setPortfolio(prev => {
        return prev.map(p => {
          if (p.ticker === selectedTicker) {
            const newQty = p.quantity - shares;
            return { ...p, quantity: newQty };
          }
          return p;
        }).filter(p => p.quantity > 0);
      });

      // Log trade
      setTrades(prev => [
        {
          id: Date.now(),
          ticker: selectedTicker,
          type: 'SELL',
          shares,
          price: tradePrice,
          total: totalCost,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);

      setFeedback({ message: `Successfully sold ${shares} shares of ${selectedTicker} for $${totalCost.toLocaleString()}!`, error: false });
    }
  };

  // Portfolio P&L calculations
  const calculatePortfolioValue = () => {
    return portfolio.reduce((sum, item) => {
      const livePrice = currentPrices[item.ticker] || item.avgPrice;
      return sum + (item.quantity * livePrice);
    }, 0);
  };

  const portfolioValue = calculatePortfolioValue();
  const totalAccountValue = balance + portfolioValue;
  const totalPnL = totalAccountValue - 100000;
  const totalPnLPercent = parseFloat(((totalPnL / 100000) * 100).toFixed(2));

  // Render Candle Graph via pure styled HTML/CSS bars
  const renderedCandles = chartData[selectedTicker] || [];
  const maxHigh = renderedCandles.length > 0 ? Math.max(...renderedCandles.map(c => c.high)) : 100;
  const minLow = renderedCandles.length > 0 ? Math.min(...renderedCandles.map(c => c.low)) : 0;
  const priceRange = maxHigh - minLow || 1;

  // Search tickers logic
  const filteredTickers = SAMPLE_TICKERS.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">

      {/* Balances Board */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Virtual Balance</span>
          <span className="text-lg sm:text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">${balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Portfolio Value</span>
          <span className="text-lg sm:text-xl font-extrabold font-mono">${portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Capital</span>
          <span className="text-lg sm:text-xl font-extrabold font-mono">${totalAccountValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">Net Profit & Loss</span>
          <span className={`text-lg sm:text-xl font-extrabold flex items-center font-mono ${totalPnL >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({totalPnLPercent}%)
            {totalPnL >= 0 ? <ArrowUpRight className="w-4 h-4 ml-0.5" /> : <ArrowDownRight className="w-4 h-4 ml-0.5" />}
          </span>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${isWidget ? 'gap-6' : 'lg:grid-cols-3 gap-6'}`}>

        {/* Left/Middle Column (Chart and list) */}
        <div className={isWidget ? 'space-y-6' : 'lg:col-span-2 space-y-6'}>

          {/* Stock Selector & Live prices bar */}
          <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            {/* Search/Toggles */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tickers Watchlist</span>
              <div className="relative w-full sm:w-48">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search stock..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Scrolling watchlist cards */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {filteredTickers.map(ticker => {
                const isSelected = ticker === selectedTicker;
                const price = currentPrices[ticker] || 100.00;
                // Simple static daily change simulation for visual flair
                const priceHash = ticker.charCodeAt(0) % 2 === 0;
                return (
                  <button
                    key={ticker}
                    onClick={() => setSelectedTicker(ticker)}
                    className={`flex-shrink-0 p-3 rounded-xl border transition-all text-left ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-indigo-400'}`}
                  >
                    <div className="flex items-center justify-between gap-6">
                      <span className="font-extrabold text-sm">{ticker}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${isSelected ? 'bg-white/20 text-white' : priceHash ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        {priceHash ? '+1.4%' : '-0.8%'}
                      </span>
                    </div>
                    <div className={`text-base font-bold font-mono mt-1 ${isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                      ${price.toFixed(2)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Dynamic Candle Chart */}
          <div className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-lg flex items-center gap-1.5">
                  <TrendingUp className="w-5 h-5 text-indigo-500" /> {selectedTicker} Live Candlestick Chart
                </h3>
                <p className="text-xs text-slate-500">Ticks dynamically in real-time. Practice pattern identification.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">${currentPrice.toFixed(2)}</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">Current Bid/Ask</span>
              </div>
            </div>

            {/* Actual HTML Candlestick Chart Visualization */}
            <div className="h-64 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl relative p-4 flex items-end gap-[3px] sm:gap-1 overflow-hidden">

              {/* Grid Lines Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none opacity-40">
                <div className="border-b border-slate-100 dark:border-slate-900 text-[10px] text-slate-400 pl-2 font-mono">${maxHigh.toFixed(2)}</div>
                <div className="border-b border-slate-100 dark:border-slate-900 text-[10px] text-slate-400 pl-2 font-mono">${((maxHigh + minLow) / 2).toFixed(2)}</div>
                <div className="text-[10px] text-slate-400 pl-2 font-mono">${minLow.toFixed(2)}</div>
              </div>

              {/* Candles Map */}
              {renderedCandles.map((candle, idx) => {
                const isBullish = candle.close >= candle.open;

                // Calculate percentages relative to scale
                const highY = ((maxHigh - candle.high) / priceRange) * 100;
                const lowY = ((maxHigh - candle.low) / priceRange) * 100;
                const openY = ((maxHigh - candle.open) / priceRange) * 100;
                const closeY = ((maxHigh - candle.close) / priceRange) * 100;

                const wickTop = Math.min(highY, lowY);
                const wickHeight = Math.abs(highY - lowY);
                const bodyTop = Math.min(openY, closeY);
                const bodyHeight = Math.max(Math.abs(openY - closeY), 2.5); // Ensure at least a slim line

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full relative group">
                    {/* Wick Line */}
                    <div
                      className={`absolute w-[1.5px] ${isBullish ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{
                        top: `${wickTop}%`,
                        height: `${wickHeight}%`
                      }}
                    />
                    {/* Candle Body */}
                    <div
                      className={`absolute w-full rounded-sm border ${isBullish ? 'bg-emerald-500/80 border-emerald-600' : 'bg-rose-500/80 border-rose-600'}`}
                      style={{
                        top: `${bodyTop}%`,
                        height: `${bodyHeight}%`
                      }}
                    />

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-xl font-mono">
                      <div>O: ${candle.open}</div>
                      <div>H: ${candle.high}</div>
                      <div>L: ${candle.low}</div>
                      <div>C: ${candle.close}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart Legend */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded-sm inline-block" /> Bullish (Buyers Dominating)</span>
              <span>Visualized Stock Price History (30 Days + Live ticks)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-rose-500 rounded-sm inline-block" /> Bearish (Sellers Dominating)</span>
            </div>
          </div>

        </div>

        {/* Right Column: Trade Form & Current Positions */}
        <div className="space-y-6">

          {/* Order execution widget */}
          <div className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <h3 className="font-extrabold text-lg uppercase tracking-wide">Place Stock Order</h3>

            {/* Buy/Sell Toggles */}
            <div className="flex bg-slate-200 dark:bg-slate-950 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setOrderType('BUY')}
                className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all ${orderType === 'BUY' ? 'bg-emerald-500 text-white shadow' : 'text-slate-500'}`}
              >
                BUY / GO LONG
              </button>
              <button
                type="button"
                onClick={() => setOrderType('SELL')}
                className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all ${orderType === 'SELL' ? 'bg-rose-500 text-white shadow' : 'text-slate-500'}`}
              >
                SELL / CLOSE
              </button>
            </div>

            {/* Execution Toggles */}
            <div className="flex bg-slate-200 dark:bg-slate-950 p-1 rounded-xl text-[10px]">
              <button
                type="button"
                onClick={() => setExecutionType('MARKET')}
                className={`flex-1 py-1.5 text-center font-bold rounded transition ${executionType === 'MARKET' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
              >
                Market Order (Instant)
              </button>
              <button
                type="button"
                onClick={() => setExecutionType('LIMIT')}
                className={`flex-1 py-1.5 text-center font-bold rounded transition ${executionType === 'LIMIT' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
              >
                Limit Order (Target)
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">

              {/* Ticker Display */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Selected Security</label>
                <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between">
                  <span className="font-extrabold text-base text-indigo-600 dark:text-indigo-400">{selectedTicker}</span>
                  <span className="font-mono text-sm font-bold">${currentPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Conditional Limit Price Field */}
              {executionType === 'LIMIT' && (
                <div>
                  <label htmlFor="limit-price" className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Limit Price ($)</label>
                  <input
                    id="limit-price"
                    type="number"
                    step="0.01"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm outline-none font-mono focus:border-indigo-500"
                    placeholder="Enter execution price"
                    required
                  />
                </div>
              )}

              {/* Quantity Shares Input */}
              <div>
                <label htmlFor="shares-qty" className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Shares Quantity</label>
                <input
                  id="shares-qty"
                  type="number"
                  min="1"
                  value={sharesInput}
                  onChange={(e) => setSharesInput(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm outline-none font-mono focus:border-indigo-500"
                  required
                />
              </div>

              {/* Estimate Block */}
              <div className="flex justify-between items-center text-xs text-slate-400 border-t border-b border-slate-200 dark:border-slate-800 py-3">
                <span>Estimated Cost</span>
                <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">
                  ${(parseInt(sharesInput || '0') * (executionType === 'LIMIT' ? parseFloat(limitPrice || '0') : currentPrice)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </div>

              {/* Feedback messages */}
              {feedback.message && (
                <div className={`p-3 rounded-lg text-xs font-medium ${feedback.error ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {feedback.message}
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl text-sm font-black transition-transform active:scale-[0.98] ${orderType === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-rose-500 hover:bg-rose-600 text-white'}`}
              >
                Execute {orderType} Order
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* PORTFOLIO HOLDINGS & TRADE HISTORY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">

        {/* Active Holdings */}
        <div className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Briefcase className="w-5 h-5 text-indigo-500" />
            <h3 className="font-extrabold text-lg">My Open Positions ({portfolio.length})</h3>
          </div>

          {portfolio.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">No open holdings. Find a stock and execute a Buy order to get started!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left divide-y divide-slate-200 dark:divide-slate-800">
                <thead>
                  <tr className="text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5">Stock</th>
                    <th className="py-2.5">Qty</th>
                    <th className="py-2.5">Avg Buy Price</th>
                    <th className="py-2.5">Live Price</th>
                    <th className="py-2.5 text-right">Market Value</th>
                    <th className="py-2.5 text-right">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  {portfolio.map(item => {
                    const livePrice = currentPrices[item.ticker] || item.avgPrice;
                    const marketValue = item.quantity * livePrice;
                    const costBasis = item.quantity * item.avgPrice;
                    const pnl = marketValue - costBasis;
                    const pnlPercent = (pnl / costBasis) * 100;
                    return (
                      <tr key={item.ticker}>
                        <td className="py-3 font-bold text-indigo-600 dark:text-indigo-400">{item.ticker}</td>
                        <td className="py-3 font-semibold">{item.quantity}</td>
                        <td className="py-3">${item.avgPrice.toFixed(2)}</td>
                        <td className="py-3">${livePrice.toFixed(2)}</td>
                        <td className="py-3 text-right font-bold">${marketValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className={`py-3 text-right font-bold ${pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} ({pnlPercent.toFixed(1)}%)
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Transaction History Log */}
        <div className="p-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <History className="w-5 h-5 text-indigo-500" />
            <h3 className="font-extrabold text-lg">Transaction History Log</h3>
          </div>

          {trades.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">No past trades found. All your buy/sell orders will be logged here.</p>
          ) : (
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {trades.map(trade => (
                <div key={trade.id} className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] ${trade.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>{trade.type}</span>
                      <span className="text-slate-900 dark:text-slate-100">{trade.shares} shares of {trade.ticker}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">{trade.time}</span>
                  </div>
                  <div className="text-right font-mono">
                    <div className="font-bold text-slate-900 dark:text-slate-100">${trade.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    <div className="text-[10px] text-slate-400">@ ${trade.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default Simulator;
