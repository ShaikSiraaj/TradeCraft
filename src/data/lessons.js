export const modules = [
  {
    id: "module-1",
    title: "1. Stock Market Basics",
    description: "Learn the absolute fundamentals of stocks, shares, exchanges, and orders.",
    lessons: [
      {
        id: "lesson-1-1",
        title: "What is a Stock?",
        summary: "Understand what stocks are, why companies issue them, and how public listings work.",
        content: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed">
              At its most basic level, a <strong>stock</strong> (also known as equity or shares) represents fractional ownership in a corporation.
            </p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 dark:bg-blue-950/30 dark:border-blue-700 rounded-r">
              <p class="font-semibold text-blue-800 dark:text-blue-300">W3Schools Style Tip:</p>
              <p class="text-sm">Think of a company as a giant pizza. Buying a share is like buying a single slice. If the pizza gets bigger (the company grows), your slice becomes more valuable!</p>
            </div>

            <h3 class="text-xl font-bold mt-6">Why do Companies Issue Stock?</h3>
            <p>Companies issue stock to raise <strong>capital</strong> (money). They can use this money to expand their business, research new products, hire more employees, or pay off debt. This process of offering stock to the public for the first time is called an <strong>Initial Public Offering (IPO)</strong>.</p>

            <h3 class="text-xl font-bold mt-6">Key Concepts Table</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-sm">
                <thead>
                  <tr class="bg-slate-100 dark:bg-slate-800 text-left font-semibold">
                    <th class="p-3">Term</th>
                    <th class="p-3">Definition</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td class="p-3 font-semibold text-indigo-600 dark:text-indigo-400">Shareholder</td>
                    <td class="p-3">An individual or institution that owns at least one share of a company's stock.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-semibold text-indigo-600 dark:text-indigo-400">Market Cap</td>
                    <td class="p-3">The total dollar market value of a company's outstanding shares. Calculated as: Shares × Share Price.</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-semibold text-indigo-600 dark:text-indigo-400">Dividend</td>
                    <td class="p-3">A distribution of a portion of a company's earnings, decided by the board of directors, paid to shareholders.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `,
        quiz: {
          question: "If a company has 10 million outstanding shares and the current share price is $50, what is its Market Capitalization?",
          options: [
            "$50,000",
            "$10 Million",
            "$500 Million",
            "$5 Billion"
          ],
          correctIndex: 2,
          explanation: "Market Cap = Total Shares * Share Price. So, 10,000,000 shares * $50 = $500,000,000 (or $500 Million)."
        }
      },
      {
        id: "lesson-1-2",
        title: "How the Market Works",
        summary: "Explore stock exchanges, the order book, bid/ask spreads, and order types.",
        content: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed">
              Stocks are traded on <strong>Stock Exchanges</strong> like the New York Stock Exchange (NYSE) or NASDAQ. Think of an exchange as a highly regulated digital marketplace connecting buyers and sellers.
            </p>

            <h3 class="text-xl font-bold mt-6">The Bid/Ask Spread</h3>
            <p>Every stock has two primary prices at any given moment:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Bid Price:</strong> The highest price a buyer is willing to pay.</li>
              <li><strong>Ask Price:</strong> The lowest price a seller is willing to accept.</li>
              <li><strong>Spread:</strong> The difference between the Bid and Ask price. High-volume stocks have very narrow spreads (pennies), while illiquid stocks can have wide spreads.</li>
            </ul>

            <h3 class="text-xl font-bold mt-6">Market Orders vs. Limit Orders</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <h4 class="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Market Order</h4>
                <p class="text-sm">Executes <strong>immediately</strong> at the best available current market price. Guarantees execution speed, but does not guarantee the exact price.</p>
              </div>
              <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <h4 class="font-bold text-amber-600 dark:text-amber-400 mb-2">Limit Order</h4>
                <p class="text-sm">Executes only at a <strong>specific price</strong> or better. Guarantees the price you pay/receive, but does not guarantee that the order will fill.</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          question: "Which order type guarantees immediate execution but does NOT guarantee a specific price?",
          options: [
            "Limit Order",
            "Market Order",
            "Stop-Loss Order",
            "Trailing Stop Order"
          ],
          correctIndex: 1,
          explanation: "A Market Order guarantees immediate execution at the current best available market price, whereas a Limit Order specifies a maximum price to buy or minimum to sell."
        }
      }
    ]
  },
  {
    id: "module-2",
    title: "2. Fundamental Analysis",
    description: "Examine company health, earnings reports, balance sheets, and valuation metrics.",
    lessons: [
      {
        id: "lesson-2-1",
        title: "Key Financial Ratios",
        summary: "Deconstruct the most important metrics used to evaluate stock valuation: P/E, P/B, and Dividend Yield.",
        content: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed">
              <strong>Fundamental Analysis</strong> involves evaluating a company's financial health, performance, and future growth prospects to estimate its intrinsic value.
            </p>

            <h3 class="text-xl font-bold mt-6">Top 3 Valuation Metrics</h3>
            <div class="space-y-4">
              <div class="p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 rounded-r">
                <h4 class="font-bold text-indigo-900 dark:text-indigo-300">Price-to-Earnings (P/E) Ratio</h4>
                <p class="text-sm mb-2">Calculated as: <strong>Share Price ÷ Earnings Per Share (EPS)</strong>. It shows how much investors are willing to pay for each dollar of earnings. A high P/E could mean a stock is overvalued or has very high growth expectations.</p>
              </div>

              <div class="p-4 border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 rounded-r">
                <h4 class="font-bold text-emerald-900 dark:text-emerald-300">Price-to-Book (P/B) Ratio</h4>
                <p class="text-sm mb-2">Calculated as: <strong>Share Price ÷ Book Value Per Share</strong>. Book value is the net asset value of the company. A lower P/B can indicate an undervalued company or a company in deep financial trouble.</p>
              </div>

              <div class="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 rounded-r">
                <h4 class="font-bold text-amber-900 dark:text-amber-300">Dividend Yield</h4>
                <p class="text-sm mb-2">Calculated as: <strong>Annual Dividend Per Share ÷ Share Price</strong>. Expressed as a percentage, it tells you the cash return you get just for holding the stock.</p>
              </div>
            </div>

            <h3 class="text-xl font-bold mt-6">Try It Yourself: Interactive Calculator</h3>
            <p>Use the simulator calculator below to play with company financial inputs and see how P/E and EPS update dynamically!</p>
          </div>
        `,
        hasCalculator: "earnings",
        quiz: {
          question: "If a company has a Share Price of $100 and its Earnings Per Share (EPS) is $5, what is its P/E Ratio?",
          options: [
            "5",
            "20",
            "500",
            "0.05"
          ],
          correctIndex: 1,
          explanation: "P/E Ratio = Share Price / EPS. Here, $100 / $5 = 20."
        }
      },
      {
        id: "lesson-2-2",
        title: "Reading Financial Statements",
        summary: "Demystify the Income Statement, Balance Sheet, and Cash Flow Statement.",
        content: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed">
              Public companies are required by regulators to publish financial reports quarterly (10-Q) and annually (10-K). Let's review the big three statements:
            </p>

            <div class="space-y-4 mt-4">
              <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <h4 class="font-bold text-slate-800 dark:text-slate-200">1. Income Statement</h4>
                <p class="text-sm">Shows a company's <strong>revenues</strong>, <strong>expenses</strong>, and <strong>net profit</strong> over a specific period. It is often referred to as the P&L statement.</p>
              </div>

              <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <h4 class="font-bold text-slate-800 dark:text-slate-200">2. Balance Sheet</h4>
                <p class="text-sm">A snapshot at a single point in time showing what the company owns (<strong>Assets</strong>) and what it owes (<strong>Liabilities</strong>). Shareholders' Equity = Assets - Liabilities.</p>
              </div>

              <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <h4 class="font-bold text-slate-800 dark:text-slate-200">3. Cash Flow Statement</h4>
                <p class="text-sm">Tracks the actual cash moving in and out of the business, categorized into Operating, Investing, and Financing activities. Essential for seeing if a company has real liquidity.</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          question: "Which financial statement provides a snapshot of a company's Assets, Liabilities, and Equity at a specific point in time?",
          options: [
            "Income Statement",
            "Cash Flow Statement",
            "Balance Sheet",
            "Proxy Statement"
          ],
          correctIndex: 2,
          explanation: "The Balance Sheet is a snapshot showing the fundamental equation: Assets = Liabilities + Equity at a single point in time."
        }
      }
    ]
  },
  {
    id: "module-3",
    title: "3. Technical Analysis",
    description: "Master candlestick charts, key chart patterns, support/resistance, and indicators.",
    lessons: [
      {
        id: "lesson-3-1",
        title: "Introduction to Candlestick Charts",
        summary: "Understand how a single candlestick is formed and how to read market psychology from candles.",
        content: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed">
              Unlike Fundamental Analysis, which looks at the 'why' of a business, <strong>Technical Analysis</strong> focuses on price action and trading volume to predict future price moves.
            </p>

            <h3 class="text-xl font-bold mt-6">Anatomy of a Candlestick</h3>
            <p>Each candlestick represents price action over a specific time frame (e.g., 1 Minute, 1 Hour, or 1 Day):</p>

            <div class="flex flex-col sm:flex-row gap-6 my-4 p-4 bg-slate-100 dark:bg-slate-800 rounded justify-around items-center">
              <div class="flex flex-col items-center">
                <span class="text-emerald-500 font-bold">Green (Bullish) Candle</span>
                <div class="w-1 bg-emerald-500 h-6"></div>
                <div class="w-12 bg-emerald-500 text-white font-mono text-xs flex flex-col justify-between items-center py-2 h-24 rounded border border-emerald-600">
                  <span>Close</span>
                  <span>Body</span>
                  <span>Open</span>
                </div>
                <div class="w-1 bg-emerald-500 h-6"></div>
                <span class="text-xs text-slate-500 mt-1">High (top wick), Low (bottom wick)</span>
              </div>

              <div class="flex flex-col items-center">
                <span class="text-rose-500 font-bold">Red (Bearish) Candle</span>
                <div class="w-1 bg-rose-500 h-6"></div>
                <div class="w-12 bg-rose-500 text-white font-mono text-xs flex flex-col justify-between items-center py-2 h-24 rounded border border-rose-600">
                  <span>Open</span>
                  <span>Body</span>
                  <span>Close</span>
                </div>
                <div class="w-1 bg-rose-500 h-6"></div>
                <span class="text-xs text-slate-500 mt-1">High (top wick), Low (bottom wick)</span>
              </div>
            </div>

            <h3 class="text-xl font-bold mt-6">Common Reversal Patterns</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Doji:</strong> Open and close are nearly identical, showing intense market indecision.</li>
              <li><strong>Hammer:</strong> Small body with a long lower wick. Indicates sellers pushed prices down, but buyers surged back to close near the high. A bullish reversal sign.</li>
              <li><strong>Engulfing:</strong> A large candle body that completely covers ('engulfs') the previous candle's body, indicating a strong momentum shift.</li>
            </ul>

            <h3 class="text-xl font-bold mt-6">Interactive Candlestick Matcher</h3>
            <p>Try identifying bullish and bearish patterns in our pattern practice widget below!</p>
          </div>
        `,
        hasCalculator: "candlestick",
        quiz: {
          question: "Which candlestick pattern is characterized by a tiny body and a long lower shadow/wick, signaling a potential bullish reversal?",
          options: [
            "Doji",
            "Hammer",
            "Shooting Star",
            "Bearish Engulfing"
          ],
          correctIndex: 1,
          explanation: "A Hammer candlestick features a long lower wick (usually at least 2x the body length) and a small body near the top of the range, showing that buyers aggressively rejected lower prices."
        }
      },
      {
        id: "lesson-3-2",
        title: "Key Technical Indicators",
        summary: "Learn how Moving Averages, RSI, and MACD help gauge momentum and find entries.",
        content: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed">
              Indicators are mathematical calculations based on price, volume, or open interest. They are overlaid on stock charts to identify trend strength and entry/exit signals.
            </p>

            <h3 class="text-xl font-bold mt-6">1. Moving Averages (MA / EMA)</h3>
            <p>Smothers out price action by averaging prices over a selected period (e.g., 50-day or 200-day). It helps identify the overall trend direction. If price is above the 200 EMA, we are generally in a long-term bull trend.</p>

            <h3 class="text-xl font-bold mt-6">2. Relative Strength Index (RSI)</h3>
            <p>A momentum oscillator that ranges from 0 to 100.</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>RSI > 70:</strong> Typically considered <strong>overbought</strong> (market is highly heated, potential pullback).</li>
              <li><strong>RSI < 30:</strong> Typically considered <strong>oversold</strong> (market is heavily beaten down, potential bounce).</li>
            </ul>

            <h3 class="text-xl font-bold mt-6">3. MACD (Moving Average Convergence Divergence)</h3>
            <p>A trend-following momentum indicator that shows the relationship between two moving averages. When the MACD line crosses above the signal line, it represents a bullish trigger.</p>
          </div>
        `,
        quiz: {
          question: "An RSI reading of 22 typically indicates that a stock is in which condition?",
          options: [
            "Overbought",
            "Fairly Valued",
            "Oversold",
            "Extremely Bullish"
          ],
          correctIndex: 2,
          explanation: "An RSI value under 30 is generally considered oversold, meaning the price has fallen rapidly and may be primed for a technical bounce."
        }
      }
    ]
  },
  {
    id: "module-4",
    title: "4. Risk Management & Psychology",
    description: "Protect your capital with position sizing rules and manage trading emotions.",
    lessons: [
      {
        id: "lesson-4-1",
        title: "Position Sizing & The 1% Rule",
        summary: "Calculate how much stock you should buy to protect your trading capital from devastating losses.",
        content: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed">
              The single most important rule in professional trading is: <strong>Never blow up your account.</strong> Risk management is what separates gamblers from profitable traders.
            </p>

            <h3 class="text-xl font-bold mt-6">The Golden 1% Risk Rule</h3>
            <p>You should never risk more than <strong>1% of your total account value</strong> on a single trade. This doesn't mean you only buy $1,000 worth of stock with a $100,000 account. It means if your trade hits its stop-loss, your total financial loss is capped at $1,000.</p>

            <h3 class="text-xl font-bold mt-6">Position Sizing Formula</h3>
            <div class="p-4 bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900 rounded font-mono text-sm space-y-2">
              <p class="font-bold text-indigo-900 dark:text-indigo-300">Position Size = Account Risk ($) ÷ Trade Stop-Loss Distance ($)</p>
              <hr class="border-indigo-200 dark:border-indigo-900" />
              <p>Example:</p>
              <ul class="list-disc pl-6 space-y-1">
                <li>Account Value: $100,000</li>
                <li>Max Risk (1%): $1,000</li>
                <li>Buy Price: $50 per share</li>
                <li>Stop-Loss Price: $48 per share (Risk is $2 per share)</li>
                <li>Shares to buy = $1,000 ÷ $2 = 500 shares ($25,000 position size)</li>
              </ul>
            </div>
          </div>
        `,
        quiz: {
          question: "With a $50,000 account, using the 1% risk rule, what is the maximum dollar amount you should risk losing on a single trade?",
          options: [
            "$5,000",
            "$500",
            "$1,000",
            "$50"
          ],
          correctIndex: 1,
          explanation: "1% of $50,000 is calculated as 50,000 * 0.01 = $500. This is your maximum dollar loss limit for any single trade."
        }
      },
      {
        id: "lesson-4-2",
        title: "Trading Psychology & Pitfalls",
        summary: "Identify the dangerous psychological traps of trading, including FOMO, revenge trading, and fear.",
        content: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed">
              Even with the best system, emotional decisions will destroy a trading portfolio. Mastering your mind is the final boss of trading.
            </p>

            <h3 class="text-xl font-bold mt-6">The Four Horsemen of Trading Psychology</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <h4 class="font-bold text-red-500 mb-1">1. FOMO (Fear of Missing Out)</h4>
                <p class="text-sm">Buying a stock that has already skyrocketed, fearing you will miss the profits. This often results in buying at the absolute top.</p>
              </div>

              <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <h4 class="font-bold text-red-500 mb-1">2. Revenge Trading</h4>
                <p class="text-sm">After a big loss, immediately entering another trade with double the size to 'win the money back'. This usually leads to compounding losses.</p>
              </div>

              <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <h4 class="font-bold text-red-500 mb-1">3. Loss Aversion (Holding Bags)</h4>
                <p class="text-sm">Refusing to sell a losing stock because 'it has to go back up eventually'. Small, controlled losses turn into portfolio-killing disasters.</p>
              </div>

              <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <h4 class="font-bold text-red-500 mb-1">4. Overtrading</h4>
                <p class="text-sm">Feeling the constant need to be in a position. More trades usually lead to higher commissions, lower accuracy, and mental fatigue.</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          question: "What is 'Revenge Trading' in the stock market context?",
          options: [
            "Trading stocks of companies you personally dislike",
            "Executing quick trades to capitalize on a short-term correction",
            "Immediately placing a large, emotional trade to recoup a preceding loss",
            "Shorting a stock that has just hit an all-time high"
          ],
          correctIndex: 2,
          explanation: "Revenge trading is an emotional response where a trader, after suffering a loss, immediately re-enters the market with a larger position, hoping to recover losses quickly."
        }
      }
    ]
  }
];

export const glossary = [
  { term: "Bear Market", definition: "A market condition in which securities prices fall and widespread pessimism causes the stock market's downward spiral (traditionally a drop of 20% or more)." },
  { term: "Bull Market", definition: "A financial market of a group of securities in which prices are rising or are expected to rise." },
  { term: "Bid Price", definition: "The highest price that a buyer is willing to pay for a security." },
  { term: "Ask Price", definition: "The lowest price that a seller is willing to accept for a security." },
  { term: "Initial Public Offering (IPO)", definition: "The process of offering shares of a private corporation to the public in a new stock issuance." },
  { term: "Market Capitalization", definition: "The total market value of a company's outstanding shares of stock (Shares Outstanding × Current Share Price)." },
  { term: "Dividend", definition: "A share of a company's profits passed on to its shareholders, usually quarterly." },
  { term: "Price-to-Earnings (P/E) Ratio", definition: "A valuation ratio calculated by dividing the company's current share price by its earnings per share." },
  { term: "Relative Strength Index (RSI)", definition: "A momentum indicator that measures the speed and change of price movements, ranging from 0 to 100." },
  { term: "Support Level", definition: "The price level at which a stock historically tends to find buyers and stop falling." },
  { term: "Resistance Level", definition: "The price level at which a stock historically tends to find sellers and stop rising." },
  { term: "Short Selling", definition: "The sale of a security that is not owned by the seller, hoping its price will decline so it can be bought back cheaper." },
  { term: "Stop-Loss Order", definition: "An order placed with a broker to buy or sell once the stock reaches a certain price, designed to limit investor loss." },
  { term: "Volume", definition: "The total number of shares of a stock traded during a given period of time." }
];
