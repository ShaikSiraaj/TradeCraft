export interface SidebarKeyTerm {
  term: string;
  definition: string;
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonData {
  id: string;
  number: number;
  title: string;
  description: string;
  summary: string;
  moduleNumber: number;
  moduleName: string;
  content: string;
  quiz: LessonQuiz;
  sidebarKeyTerms: SidebarKeyTerm[];
  tip: string;
  imageUrl: string;
}

export const modulesMetadata = [
  { number: 1, name: "Market Basics", description: "Shares, exchanges, order types, and basic market terminology." },
  { number: 2, name: "Fundamental Analysis", description: "Evaluating company health, financial statements, and valuation ratios." },
  { number: 3, name: "Technical Analysis", description: "Reading price action, chart patterns, and technical indicators." },
  { number: 4, name: "Risk Management & Psychology", description: "Position sizing, stop-losses, and mastering trading emotions." },
  { number: 5, name: "Advanced Trading Tools", description: "RSI, MACD, moving averages, and market cycle analysis." }
];

export const lessonsData: LessonData[] = [
  {
    id: "lesson-1",
    number: 1,
    title: "Introduction to Stocks",
    description: "Shares, equity, CoffeeCo example.",
    summary: "Understand what stocks are, why companies issue them, and how public listings work.",
    moduleNumber: 1,
    moduleName: "Market Basics",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        At its most fundamental level, a <strong>stock</strong> represents fractional ownership in a corporation. When you buy a share of stock, you are purchasing a tiny piece of that company, giving you a claim on part of its assets and earnings.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Companies issue stock to raise <strong>capital</strong>. Capital is the cash needed to develop new products, build factories, hire workers, and expand operations. Instead of borrowing money and incurring debt, a company can sell shares to the public in an <strong>Initial Public Offering (IPO)</strong>.
      </p>
      <h4 class="font-headline text-lg font-bold text-market-navy mt-6">Why Do Prices Fluctuate?</h4>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Once a stock is publicly traded, its price is determined solely by <strong>supply and demand</strong> in the open market. If more people want to buy a stock (demand) than sell it (supply), the price moves up. If more people want to sell than buy, the price moves down.
      </p>
    `,
    quiz: {
      question: "What exactly are you purchasing when you buy a share of stock in a public company?",
      options: [
        "A corporate debt contract with guaranteed interest payments",
        "A fractional slice of equity representing partial ownership in the company",
        "A product warranty card and free store membership",
        "An option contract to buy corporate assets"
      ],
      correctIndex: 1,
      explanation: "A share represents authentic, fractional ownership in a company's equity, giving you legal claims on its assets and earnings."
    },
    sidebarKeyTerms: [
      { term: "Equity", definition: "Ownership interest in a corporation, represented by shares of stock." },
      { term: "IPO", definition: "Initial Public Offering—the first time a company sells its shares to the public." }
    ],
    tip: "Don't confuse a company's product with its stock. You can love a company's coffee but hate its stock if it is overpriced.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsgqm8jDiSI-i-4z7jSsudwV38kvqkmBDiD0Fl4sNrzOqFOuecJvrVkMc1eHoYqYxvDeIIXN3PHzkJKRC0HlDzJEsknt23PgwCSImhqgr8edg7ahbHEJDWn3gUdCKqHPFw3pRwxDF-ZYTuSAXx_mGVp5dGCrnJWEPPxToY2gEknSzp5Z3jy3IiCVqF5bQb4l-PAyGPA1aikJSjZSRQ9CQN5cV6nG32TbjcvszpX1_d5doTzkyZ7xkXNEZBurK1yuIWMhPbTFY51Ws"
  },
  {
    id: "lesson-2",
    number: 2,
    title: "How the Stock Market Works",
    description: "Marketplaces, transaction routes, and brokers.",
    summary: "Discover the physical and digital pathways that allow investors to trade shares instantly.",
    moduleNumber: 1,
    moduleName: "Market Basics",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The stock market is a vast network of <strong>exchanges</strong> where buyers and sellers meet. In the past, trades were executed by shouting on a physical trading floor. Today, almost all trading is digital, executed on powerful computerized networks.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        To trade stocks, individual investors use <strong>brokerage accounts</strong>. A broker acts as an intermediary, taking your order and submitting it to an exchange to find a matching counterparty (a seller if you want to buy, or a buyer if you want to sell).
      </p>
      <h4 class="font-headline text-lg font-bold text-market-navy mt-6">Instant Execution Routing</h4>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Modern routing algorithms send your order across multiple exchanges and dark pools in milliseconds to secure the best possible transaction price, a regulatory requirement known as <strong>best execution</strong>.
      </p>
    `,
    quiz: {
      question: "What is the primary role of a stockbroker?",
      options: [
        "To decide what price a company's stock should trade at",
        "To act as an intermediary, routing your buy and sell orders to stock exchanges",
        "To lend money to companies going public",
        "To manage the physical vault where paper share certificates are stored"
      ],
      correctIndex: 1,
      explanation: "A broker acts as an agent, providing the software and routing connections to execute trades on public exchanges on your behalf."
    },
    sidebarKeyTerms: [
      { term: "Broker", definition: "A firm or individual that charges a fee or commission to execute buy and sell orders submitted by investors." },
      { term: "Exchange", definition: "A highly regulated market where securities, commodities, and derivatives are bought and sold." }
    ],
    tip: "Make sure you choose a broker with low commissions, high-quality execution routing, and a clean interface.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-3",
    number: 3,
    title: "Market Participants: Bulls vs Bears",
    description: "The psychology of market participants.",
    summary: "Understand the core opposing forces that drive market directions and define cycles.",
    moduleNumber: 1,
    moduleName: "Market Basics",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The stock market is defined by two primary animal metaphors: <strong>Bulls</strong> and <strong>Bears</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        A <strong>Bull</strong> is an investor who believes stock prices will rise. They are optimistic, buying stocks now with the goal of selling them later at a higher price. When the overall market is trending upward over a sustained period, we call it a <strong>Bull Market</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Conversely, a <strong>Bear</strong> is an investor who believes stock prices will decline. They are pessimistic or cautious, sometimes selling stocks or shorting them. A sustained downward trend of 20% or more from recent peaks is defined as a <strong>Bear Market</strong>.
      </p>
    `,
    quiz: {
      question: "What does it mean if a trader is 'Bearish' on a stock?",
      options: [
        "They expect the stock price to climb higher",
        "They expect the stock price to decline",
        "They believe the stock price will remain flat",
        "They think the company is going to double its dividend"
      ],
      correctIndex: 1,
      explanation: "A Bear expects the market to go down. Being bearish means expecting prices to fall."
    },
    sidebarKeyTerms: [
      { term: "Bull Market", definition: "A sustained period of rising asset prices, typically driven by economic expansion and optimism." },
      { term: "Bear Market", definition: "A market downturn of 20% or more from recent highs, driven by fear and economic contraction." }
    ],
    tip: "Successful traders can make money in both bull and bear markets by aligning their strategy with prevailing market momentum.",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-4",
    number: 4,
    title: "Stock Exchanges (NYSE vs NASDAQ)",
    description: "Understanding the world's leading exchanges.",
    summary: "Learn the core differences between physical auction markets and electronic dealer markets.",
    moduleNumber: 1,
    moduleName: "Market Basics",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The two largest stock exchanges in the world are the <strong>New York Stock Exchange (NYSE)</strong> and the <strong>NASDAQ</strong>, both located in New York City.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The <strong>NYSE</strong> (often called the 'Big Board') is an auction market that traditionally featured a physical trading floor. It uses <em>Designated Market Makers (DMMs)</em> to maintain orderly markets and is home to older, blue-chip industrial companies.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The <strong>NASDAQ</strong> is a dealer market that has never had a physical trading floor; it operates entirely electronically. NASDAQ is famously tech-heavy, listing massive technology, software, and biotech giants.
      </p>
    `,
    quiz: {
      question: "Which of the following is a key historical difference between the NYSE and NASDAQ?",
      options: [
        "NYSE operates purely electronically while NASDAQ relies entirely on paper forms",
        "NYSE is a physical auction market, while NASDAQ is a digital dealer market with no physical floor",
        "NYSE only trades bonds, whereas NASDAQ only trades penny stocks",
        "NASDAQ is open 24 hours a day while NYSE is only open for 2 hours"
      ],
      correctIndex: 1,
      explanation: "NYSE is an auction-based exchange that had a famous physical trading floor. NASDAQ was created in 1971 as a computer-driven digital trading network."
    },
    sidebarKeyTerms: [
      { term: "Market Maker", definition: "A professional firm that stands ready to buy or sell a security at publicly quoted prices to provide liquidity." },
      { term: "Blue-Chip", definition: "Large, established, and financially sound companies with a history of stable performance." }
    ],
    tip: "You can find ticker listings of NYSE (e.g. Brk.A, JNJ) and NASDAQ (e.g. AAPL, MSFT) integrated in the same brokerage platform.",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-5",
    number: 5,
    title: "Bid/Ask Spread & Order Book",
    description: "The micro-mechanics of price discovery.",
    summary: "Deconstruct how buyers and sellers negotiate prices using bids, asks, and spreads.",
    moduleNumber: 1,
    moduleName: "Market Basics",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Whenever you look at a stock quote, you are seeing a dynamic balance. In reality, there is no single 'price' of a stock. Instead, there is a <strong>Bid</strong> and an <strong>Ask</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The <strong>Bid Price</strong> is the maximum price that buyers are currently willing to pay. The <strong>Ask Price</strong> is the minimum price that sellers are willing to accept.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The difference between these two prices is the <strong>Spread</strong>. Highly liquid stocks with millions of active traders have tight spreads of just a single penny. Illiquid stocks can have wide spreads of dollars, making them expensive to trade.
      </p>
    `,
    quiz: {
      question: "If a stock has a Bid of $150.00 and an Ask of $150.05, what is the Spread?",
      options: [
        "$0.05",
        "$150.00",
        "$300.05",
        "$0.01"
      ],
      correctIndex: 0,
      explanation: "The spread is the difference between Ask and Bid: $150.05 - $150.00 = $0.05."
    },
    sidebarKeyTerms: [
      { term: "Liquidity", definition: "The ease with which an asset can be converted into cash without affecting its market price." },
      { term: "Spread", definition: "The transaction friction cost, calculated as Ask Price minus Bid Price." }
    ],
    tip: "Avoid trading stocks with wide spreads, as you instantly lose money the moment you enter and exit.",
    imageUrl: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-6",
    number: 6,
    title: "Market Sectors & Industries",
    description: "Categorizing the stock market.",
    summary: "Understand the 11 stock market sectors that organize public companies.",
    moduleNumber: 1,
    moduleName: "Market Basics",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        To make sense of thousands of public companies, economists categorize them into <strong>Sectors</strong> based on their primary business activities.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The Global Industry Classification Standard (GICS) divides the market into <strong>11 sectors</strong>: Technology, Financials, Healthcare, Consumer Discretionary, Consumer Staples, Energy, Industrials, Materials, Utilities, Telecommunications, and Real Estate.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Understanding sectors is critical because different sectors perform well at different times of the economic cycle. For example, Technology stocks thrive during economic growth, while Utilities and Consumer Staples are defensive shelters during recessions.
      </p>
    `,
    quiz: {
      question: "Which sector is considered 'defensive' (often remaining stable during economic downturns)?",
      options: [
        "Technology",
        "Consumer Staples (everyday essentials)",
        "Consumer Discretionary (luxury travel and goods)",
        "Financials"
      ],
      correctIndex: 1,
      explanation: "Consumer Staples includes products like food, beverages, and hygiene products. People must buy these regardless of economic health, making the sector highly defensive."
    },
    sidebarKeyTerms: [
      { term: "GICS", definition: "Global Industry Classification Standard—the industry standard for categorizing companies." },
      { term: "Defensive Sector", definition: "Sectors that remain stable and secure during market recessions." }
    ],
    tip: "Diversifying your portfolio across multiple sectors helps shield you from sector-specific crashes.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-7",
    number: 7,
    title: "Introduction to Fundamental Analysis",
    description: "The science of intrinsic company value.",
    summary: "Evaluate financial reports, business health, and products to calculate true stock value.",
    moduleNumber: 2,
    moduleName: "Fundamental Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        <strong>Fundamental Analysis</strong> is the method of evaluating a security to measure its <strong>intrinsic value</strong>. It focuses on the underlying business, its financial health, products, competitors, and economic environment.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Unlike technical analysis (which looks at price charts), fundamental analysis aims to answer: <em>'Is this company a sound, profitable business, and is its current stock price cheap or expensive?'</em>
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        By examining public financial reports, you can estimate whether a stock is undervalued (trading below its actual business worth) or overvalued (trading above its actual worth).
      </p>
    `,
    quiz: {
      question: "What is the core objective of Fundamental Analysis?",
      options: [
        "To predict tomorrow's stock price by looking at chart shapes",
        "To determine the intrinsic economic value of a business to see if it is under- or over-priced",
        "To find the fastest execution route on an electronic exchange",
        "To trade options contracts based on high-frequency volatility indicators"
      ],
      correctIndex: 1,
      explanation: "Fundamental analysis focuses on business metrics (assets, earnings, growth) to find a stock's true intrinsic value, regardless of short-term noise."
    },
    sidebarKeyTerms: [
      { term: "Intrinsic Value", definition: "The true, calculated economic value of an asset based on mathematical valuation methods." },
      { term: "Undervalued", definition: "A stock trading at a market price significantly below its calculated intrinsic value." }
    ],
    tip: "Warren Buffett is a legendary fundamental analyst who searches for great companies trading at bargain prices.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-8",
    number: 8,
    title: "The Income Statement (P&L)",
    description: "Revenue, expenses, and net profit.",
    summary: "Understand how to read a company's profit and loss statement to measure earnings health.",
    moduleNumber: 2,
    moduleName: "Fundamental Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The <strong>Income Statement</strong> (also known as the Profit & Loss or P&L statement) summarizes a company's revenues and expenses over a specific period (usually a quarter or a year).
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        It starts at the very top with <strong>Revenue</strong> (also called Sales or 'the top line'). This is the total cash generated by selling goods and services.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        As you move down, expenses (cost of goods sold, research, marketing, taxes) are subtracted. The final figure at the bottom is <strong>Net Income</strong> (also called Profit or 'the bottom line'). This is the real money the company earned after all expenses are settled.
      </p>
    `,
    quiz: {
      question: "Which of the following describes the difference between Revenue and Net Income?",
      options: [
        "Revenue is what the company owes; Net Income is what it owns",
        "Revenue is total sales generated (the top line), while Net Income is profit remaining after all expenses are paid (the bottom line)",
        "Revenue is calculated only annually, while Net Income is calculated daily",
        "There is no difference; they are exactly the same thing"
      ],
      correctIndex: 1,
      explanation: "Revenue is total cash brought in. Net Income is what is left over as pure profit after subtracting all costs, taxes, and expenses."
    },
    sidebarKeyTerms: [
      { term: "Net Income", definition: "A company's total earnings (or profit) after subtracting all expenses from revenue." },
      { term: "Operating Expense", definition: "The day-to-day costs required to run a business, such as salaries, rent, and utility bills." }
    ],
    tip: "Always look for companies with growing revenues *and* stable or growing net income margins over several years.",
    imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-9",
    number: 9,
    title: "The Balance Sheet",
    description: "Assets, liabilities, and equity.",
    summary: "Examine a company's balance sheet to audit what it owns vs what it owes.",
    moduleNumber: 2,
    moduleName: "Fundamental Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        While the income statement tracks performance over time, the <strong>Balance Sheet</strong> is a static snapshot at a single point in time. It details a company's financial structure.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The balance sheet is governed by the core accounting equation:
        <br />
        <strong class="font-mono text-center block py-2 text-market-navy">Assets = Liabilities + Shareholders' Equity</strong>
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        <strong>Assets</strong> are what the company owns (cash, inventory, real estate, patents). <strong>Liabilities</strong> are what the company owes to creditors (loans, bonds, accounts payable). <strong>Shareholders' Equity</strong> is the net value remaining for shareholders if the company paid off all debts.
      </p>
    `,
    quiz: {
      question: "If a company has $500M in Assets and $300M in Liabilities, what is its Shareholders' Equity?",
      options: [
        "$800 Million",
        "$200 Million",
        "$500 Million",
        "$150 Million"
      ],
      correctIndex: 1,
      explanation: "Using Equity = Assets - Liabilities: $500M - $300M = $200M."
    },
    sidebarKeyTerms: [
      { term: "Asset", definition: "A resource with economic value that a corporation owns or controls with the expectation of future benefit." },
      { term: "Liability", definition: "A financial obligation or debt that a company is legally bound to pay to outside parties." }
    ],
    tip: "Make sure the company has ample cash assets relative to its short-term debt liabilities, or it could face sudden bankruptcy.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-10",
    number: 10,
    title: "Cash Flow Statement (Liquidity)",
    description: "The actual movement of hard cash.",
    summary: "Audit the cash moving in and out of the business across operating, investing, and financing tasks.",
    moduleNumber: 2,
    moduleName: "Fundamental Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        A company can report positive profits on its income statement but still run out of cash and collapse. The <strong>Cash Flow Statement</strong> tracks the actual physical movement of paper currency into and out of the company's bank accounts.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        It is divided into three key categories:
      </p>
      <ul class="list-disc pl-5 font-sans text-sm text-slate-500 space-y-2">
        <li><strong>Operating Cash Flow:</strong> Cash generated from day-to-day product sales. This should always be positive for a healthy business.</li>
        <li><strong>Investing Cash Flow:</strong> Cash spent on capital expenditures, like buying real estate, factories, or other companies (typically negative).</li>
        <li><strong>Financing Cash Flow:</strong> Cash flow from issuing stock, repurchasing shares, or taking on/repaying long-term bank loans.</li>
      </ul>
    `,
    quiz: {
      question: "Why is Cash Flow separate from the Income Statement?",
      options: [
        "Income statements include non-cash accounting entries (like depreciation), whereas cash flow only tracks actual bank deposits and cash spending",
        "Cash flow statements are optional, while income statements are mandatory",
        "Income statements only track loans, and cash flow only tracks stock sales",
        "There is no difference; they are redundant documents"
      ],
      correctIndex: 0,
      explanation: "The income statement uses accrual accounting (recording sales when they are contracted, not paid), whereas Cash Flow measures actual physical cash receipts and spending."
    },
    sidebarKeyTerms: [
      { term: "Operating Cash Flow", definition: "The actual cash generated from a company's core business activities." },
      { term: "Capital Expenditure (CapEx)", definition: "Funds spent by a company to acquire, upgrade, and maintain physical assets." }
    ],
    tip: "Look for strong Free Cash Flow (FCF) as it indicates a business can organically fund its own expansion and pay dividends.",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-11",
    number: 11,
    title: "Valuation Metrics: P/E & EPS",
    description: "Pricing stock relative to its profits.",
    summary: "Discover the Price-to-Earnings ratio and how to quickly gauge if a stock is cheap or expensive.",
    moduleNumber: 2,
    moduleName: "Fundamental Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        How do we determine if a stock trading at $100 is cheaper than a stock trading at $10? We look at <strong>Valuation Ratios</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        First, we calculate <strong>Earnings Per Share (EPS)</strong>, which is Net Income divided by total outstanding shares. This shows how much profit is allocated to each single share of stock.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Next, we find the <strong>Price-to-Earnings (P/E) Ratio</strong> by dividing the share price by its EPS. For example, if a stock is $50 and its EPS is $2, its P/E is 25. This means investors are paying $25 for every $1 of annual earnings.
      </p>
    `,
    quiz: {
      question: "If a stock is trading at $100 and its Earnings Per Share (EPS) is $5, what is its P/E ratio?",
      options: [
        "500",
        "20",
        "5",
        "0.05"
      ],
      correctIndex: 1,
      explanation: "P/E = Stock Price / EPS = $100 / $5 = 20."
    },
    sidebarKeyTerms: [
      { term: "EPS", definition: "Earnings Per Share—the portion of a company's profit allocated to each outstanding share." },
      { term: "P/E Ratio", definition: "Price-to-Earnings ratio—a valuation metric measuring price relative to profits." }
    ],
    tip: "A low P/E can mean a stock is undervalued, or it could mean the company is failing. Always compare P/E ratios to industry peers.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-12",
    number: 12,
    title: "Dividends & Dividend Yield",
    description: "Earning passive income from shares.",
    summary: "Learn how companies distribute surplus cash directly to shareholders as dividend checks.",
    moduleNumber: 2,
    moduleName: "Fundamental Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        When a company earns a profit, it can reinvest it in the business or distribute it directly to shareholders as a cash reward called a <strong>Dividend</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Dividends are typically paid quarterly. To compare dividend payments across different stock prices, we use <strong>Dividend Yield</strong>:
        <br />
        <strong class="font-mono text-center block py-2 text-market-navy">Dividend Yield = Annual Dividend per Share ÷ Share Price</strong>
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        For example, if a company pays $2 per year in dividends and the stock price is $100, the dividend yield is 2%. This represents your cash return on investment just for holding the share.
      </p>
    `,
    quiz: {
      question: "If a company pays $4.00 per year in dividends and its stock price is $50.00, what is its Dividend Yield?",
      options: [
        "2%",
        "4%",
        "8%",
        "12.5%"
      ],
      correctIndex: 2,
      explanation: "Dividend Yield = Annual Dividend / Stock Price = $4.00 / $50.00 = 0.08 or 8%."
    },
    sidebarKeyTerms: [
      { term: "Dividend", definition: "A portion of a company's earnings paid directly to shareholders as cash." },
      { term: "Dividend Yield", definition: "The annual cash return of a dividend, expressed as a percentage of the stock's current price." }
    ],
    tip: "High-growth tech companies rarely pay dividends; they prefer to reinvest 100% of profits to drive fast capital growth.",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-13",
    number: 13,
    title: "Introduction to Technical Analysis",
    description: "Trading based on market action.",
    summary: "Transition from business statistics to price and volume charts to time entries and exits.",
    moduleNumber: 3,
    moduleName: "Technical Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Unlike fundamental analysis, which asks <em>'Why should this stock move?'</em>, <strong>Technical Analysis</strong> asks <em>'How is the price moving right now?'</em>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Technical analysis focuses on price charts, trading volume, and historical patterns to forecast future price directions. Technical traders believe that all fundamental news, rumors, and psychological fears are instantly priced into the stock chart, meaning the chart is the ultimate source of truth.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        By studying historical price trends and momentum, technical traders aim to find trading opportunities with favorable risk-to-reward parameters.
      </p>
    `,
    quiz: {
      question: "Which of the following describes the core philosophy of Technical Analysis?",
      options: [
        "Company earnings and financial ratios are the only factors determining stock prices",
        "All market information, supply, demand, and investor psychology are already reflected in the stock's price chart",
        "Technical charts are purely random and have no predictive value whatsoever",
        "It is only useful for identifying dividend payouts"
      ],
      correctIndex: 1,
      explanation: "Technical analysis assumes that the current chart price reflects all known information and trader psychology, allowing trend analysis of historical patterns."
    },
    sidebarKeyTerms: [
      { term: "Technical Analysis", definition: "A trading discipline employed to evaluate investments and identify opportunities by analyzing statistical trends from trading activity." },
      { term: "Price Action", definition: "The movement of a security's price plotted over a specific time horizon." }
    ],
    tip: "Neither method is perfect. Many elite traders combine Fundamental Analysis to choose *what* to buy, and Technical Analysis to choose *when* to buy.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-14",
    number: 14,
    title: "Line Charts vs Candlestick Charts",
    description: "Visualizing market data formats.",
    summary: "Deconstruct how a single candlestick compiles four critical market metrics over a specific time frame.",
    moduleNumber: 3,
    moduleName: "Technical Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        While simple line charts only show the <strong>Closing Price</strong> of a stock, professional traders rely on <strong>Candlestick Charts</strong> to gain a deeper look into market sentiment.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Each individual candlestick represents price activity over a specific time interval (such as 5 minutes, 1 hour, or 1 day). It shows four vital prices:
      </p>
      <ul class="list-disc pl-5 font-sans text-sm text-slate-500 space-y-2">
        <li><strong>Open Price:</strong> The price when the time interval began.</li>
        <li><strong>High Price:</strong> The highest price reached during the interval.</li>
        <li><strong>Low Price:</strong> The lowest price reached during the interval.</li>
        <li><strong>Close Price:</strong> The price when the interval ended.</li>
      </ul>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The wide part is the <strong>body</strong>, and the thin lines extending from the top and bottom are the <strong>wicks (or shadows)</strong>.
      </p>
    `,
    quiz: {
      question: "What does the thin vertical line (wick/shadow) of a candlestick represent?",
      options: [
        "The price change over the entire year",
        "The highest and lowest prices reached during that specific time frame",
        "The volume of shares traded",
        "The opening and closing prices"
      ],
      correctIndex: 1,
      explanation: "Wicks (shadows) show the extreme price range (highest and lowest points reached) during that candlestick's time frame."
    },
    sidebarKeyTerms: [
      { term: "Candlestick Body", definition: "The colored block of a candlestick representing the range between the Open and Close prices." },
      { term: "Wick/Shadow", definition: "The thin lines extending from the candle body indicating the session high and low prices." }
    ],
    tip: "A green (bullish) candle closes higher than it opened. A red (bearish) candle closes lower than it opened.",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-15",
    number: 15,
    title: "Support & Resistance Levels",
    description: "The ceiling and floor of stock prices.",
    summary: "Identify key horizontal price zones where supply and demand historically change direction.",
    moduleNumber: 3,
    moduleName: "Technical Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Price action does not move in a straight line. Instead, it bounces between invisible boundaries created by trader memory. These boundaries are called <strong>Support</strong> and <strong>Resistance</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        <strong>Support</strong> is the price level where a stock historically tends to find buyers and stop falling. Think of it as a price <strong>floor</strong>. Demand is strong enough to absorb the selling pressure.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        <strong>Resistance</strong> is the price level where a stock historically tends to find sellers and stop rising. Think of it as a price <strong>ceiling</strong>. Supply is strong enough to overpower the buyers' enthusiasm.
      </p>
    `,
    quiz: {
      question: "What technical pattern typically happens when a stock price breaks above a strong 'Resistance' ceiling?",
      options: [
        "The stock price immediately drops to support",
        "A bullish breakout can occur, where the old resistance level often becomes new support",
        "Trading of the stock is permanently suspended",
        "The company executes a stock split"
      ],
      correctIndex: 1,
      explanation: "Once a stock breaks above resistance, that ceiling is breached and often flips to become the new support floor for future pullbacks."
    },
    sidebarKeyTerms: [
      { term: "Support", definition: "A price level where buying interest is sufficiently strong to overcome selling pressure." },
      { term: "Resistance", definition: "A price level where selling interest is sufficiently strong to overcome buying pressure." }
    ],
    tip: "The more times a stock bounces off a support or resistance level, the stronger and more reliable that level becomes.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-16",
    number: 16,
    title: "Chart Patterns: Reversals & Continuations",
    description: "Recognizing high-probability setups.",
    summary: "Learn head & shoulders, double bottoms, and wedges to anticipate market shifts.",
    moduleNumber: 3,
    moduleName: "Technical Analysis",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        As traders buy and sell, their collective emotional reactions create recognizable shapes on price charts. These shapes are called <strong>Chart Patterns</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Patterns are split into two major camps:
      </p>
      <ul class="list-disc pl-5 font-sans text-sm text-slate-500 space-y-2">
        <li><strong>Reversal Patterns:</strong> Signal that the current trend is exhausted and is about to turn around. Examples include the <em>Head and Shoulders</em> (bearish reversal) and the <em>Double Bottom</em> (bullish reversal).</li>
        <li><strong>Continuation Patterns:</strong> Signal that the market is just taking a brief pause before resuming its original trend direction. Examples include <em>Bull Flags</em> and <em>Pennants</em>.</li>
      </ul>
    `,
    quiz: {
      question: "Which of the following is a classic bullish reversal pattern?",
      options: [
        "Head and Shoulders",
        "Double Bottom (resembling a 'W' shape)",
        "Bear Flag",
        "Ascending Triangle breakout failure"
      ],
      correctIndex: 1,
      explanation: "A Double Bottom pattern features two distinct price lows rejected at a similar support zone, signaling a strong shift from bearish to bullish trend."
    },
    sidebarKeyTerms: [
      { term: "Double Bottom", definition: "A bullish charting structure indicating a trend reversal after testing a support level twice." },
      { term: "Bull Flag", definition: "A brief pause pattern consisting of a strong upward pole followed by a tight downward channel before breakout." }
    ],
    tip: "Never trade a pattern before it fully forms and breaks out. Entering early is speculative guessing, not disciplined trading.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-17",
    number: 17,
    title: "Short Selling Mechanics",
    description: "Borrowing, margin accounts, short squeeze risk.",
    summary: "Understanding how to profit from a decline in stock prices and the risks involved.",
    moduleNumber: 3,
    moduleName: "Technical Analysis",
    content: ``, // Existing Lesson17View used instead
    quiz: { question: "", options: [], correctIndex: 0, explanation: "" },
    sidebarKeyTerms: [],
    tip: "",
    imageUrl: ""
  },
  {
    id: "lesson-18",
    number: 18,
    title: "Market Orders vs Limit Orders",
    description: "Priority, slippage, order queues.",
    summary: "Demystifying execution mechanics, order priorities, and trade slippage.",
    moduleNumber: 3,
    moduleName: "Technical Analysis",
    content: ``, // Existing Lesson18View used instead
    quiz: { question: "", options: [], correctIndex: 0, explanation: "" },
    sidebarKeyTerms: [],
    tip: "",
    imageUrl: ""
  },
  {
    id: "lesson-19",
    number: 19,
    title: "Volume Analysis: Confirming Trends",
    description: "Divergence, climax panic, OBV indicator.",
    summary: "Use trading volume to confirm price moves and spot institutional footprints.",
    moduleNumber: 3,
    moduleName: "Technical Analysis",
    content: ``, // Existing Lesson19View used instead
    quiz: { question: "", options: [], correctIndex: 0, explanation: "" },
    sidebarKeyTerms: [],
    tip: "",
    imageUrl: ""
  },
  {
    id: "lesson-20",
    number: 20,
    title: "Building a Trading Plan",
    description: "Strategy parameters, risk ceiling, entry triggers.",
    summary: "Establish professional guardrails to eliminate emotional decision-making.",
    moduleNumber: 4,
    moduleName: "Risk Management & Psychology",
    content: ``, // Existing Lesson20View used instead
    quiz: { question: "", options: [], correctIndex: 0, explanation: "" },
    sidebarKeyTerms: [],
    tip: "",
    imageUrl: ""
  },
  {
    id: "lesson-21",
    number: 21,
    title: "Position Sizing & The 1% Rule",
    description: "Calculating precise allocation weights.",
    summary: "Master the mathematics of position sizing to protect your capital from successive losses.",
    moduleNumber: 4,
    moduleName: "Risk Management & Psychology",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The ultimate rule of survival in the financial markets is: <strong>Protect your trading capital at all costs</strong>. You cannot trade if your account is depleted to zero.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The gold standard of risk management is the <strong>1% Rule</strong>. This rule dictates that you should never risk losing more than <strong>1% of your total account equity</strong> on a single trade.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        This is calculated using stop-loss distances, not buying capacity. For example, if you have a $10,000 account, your maximum loss on a trade is $100. If you buy a stock at $50 and place your stop-loss at $48 (risking $2 per share), you can buy exactly $100 / $2 = 50 shares. Your position size is $2,500, but your risk is strictly $100.
      </p>
    `,
    quiz: {
      question: "With a $50,000 account, using the 1% risk rule, what is the maximum dollar amount you should risk losing on any single trade?",
      options: [
        "$50",
        "$500",
        "$5,000",
        "$1,000"
      ],
      correctIndex: 1,
      explanation: "1% of $50,000 is calculated as $50,000 * 0.01 = $500. This is the absolute risk limit for a single position."
    },
    sidebarKeyTerms: [
      { term: "1% Rule", definition: "A risk management strategy where a trader limits the potential loss on any single trade to 1% of total account capital." },
      { term: "Position Sizing", definition: "Calculating the exact quantity of shares or contracts to trade based on entry price and stop-loss distance." }
    ],
    tip: "Using the 1% rule means you would have to suffer 100 consecutive losses in a row to completely blow up your account.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-22",
    number: 22,
    title: "Stop-Loss and Take-Profit Orders",
    description: "Automating your exits.",
    summary: "Eliminate emotional hesitation by placing automated exits before entering a trade.",
    moduleNumber: 4,
    moduleName: "Risk Management & Psychology",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Entering a trade is easy; exiting a trade is where profits are secured or accounts are saved. Disciplined traders use automated orders to handle exits.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        A <strong>Stop-Loss Order</strong> is a sell instruction placed with your broker to automatically exit a position once it drops to a specific price. This caps your loss, preventing a small, manageable pullback from turning into a devastating, capital-killing disaster.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        A <strong>Take-Profit Order</strong> is an instruction to automatically close your trade at a set price ceiling, locking in your gains once your profit target is reached.
      </p>
    `,
    quiz: {
      question: "What is the primary function of a Stop-Loss order?",
      options: [
        "To guarantee you buy a stock at the cheapest possible price of the day",
        "To automatically exit a position at a set price limit to protect capital from larger losses",
        "To borrow shares from your broker to open a margin short trade",
        "To execute a tax-loss harvesting algorithm"
      ],
      correctIndex: 1,
      explanation: "A Stop-Loss acts as a safety belt, automatically selling your position to cut losses short when the market moves against your thesis."
    },
    sidebarKeyTerms: [
      { term: "Stop-Loss", definition: "An order placed to buy or sell once the stock reaches a certain trigger price, designed to limit investor loss." },
      { term: "Take-Profit", definition: "An order to close a trade once it hits a specified target price, harvesting the accumulated gains." }
    ],
    tip: "Always set your stop-loss and take-profit targets *before* entering a trade. Your brain becomes highly emotional and biased once real cash is on the line.",
    imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-23",
    number: 23,
    title: "Risk-to-Reward Ratio Calculations",
    description: "Ensuring an asymmetric trading edge.",
    summary: "Discover how a positive risk-to-reward ratio allows you to be highly profitable even with a 40% win rate.",
    moduleNumber: 4,
    moduleName: "Risk Management & Psychology",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Many amateur traders believe that profitable trading requires a 90% accuracy rate. This is an expensive misconception. In reality, the key to wealth is <strong>asymmetric risk-to-reward ratios</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The <strong>Risk-to-Reward (R:R) Ratio</strong> compares your potential loss to your potential profit:
        <br />
        <strong class="font-mono text-center block py-2 text-market-navy">R:R Ratio = (Target Price - Entry Price) ÷ (Entry Price - Stop Price)</strong>
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        If you risk $100 on a trade to make $300, your ratio is <strong>1:3</strong>. With a 1:3 ratio, you can lose 60% of your trades and still be highly profitable!
        <br />
        Lose 6 trades (-$600) + Win 4 trades (+$1,200) = **+$600 Net Profit**.
      </p>
    `,
    quiz: {
      question: "If you buy a stock at $10.00, place a Stop-Loss at $9.00, and a Profit Target at $13.00, what is your Risk-to-Reward Ratio?",
      options: [
        "1:1",
        "1:2",
        "1:3",
        "3:1"
      ],
      correctIndex: 2,
      explanation: "Risk is $10.00 - $9.00 = $1.00. Reward is $13.00 - $10.00 = $3.00. The risk-to-reward ratio is 1:3."
    },
    sidebarKeyTerms: [
      { term: "Risk-to-Reward", definition: "A calculation comparing the expected return of an investment to its potential downside risk." },
      { term: "Asymmetric Edge", definition: "A trade setup where the potential profit is significantly larger than the maximum potential loss." }
    ],
    tip: "Never accept a trade setup with a risk-to-reward ratio lower than 1:2. Anything less makes it mathematically difficult to succeed over time.",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-24",
    number: 24,
    title: "Mastering Trading Psychology & Pitfalls",
    description: "Defeating FOMO and revenge trading.",
    summary: "Identify and neutralize the biological emotional traps that damage investment portfolios.",
    moduleNumber: 4,
    moduleName: "Risk Management & Psychology",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        You can have a perfect trading system with an excellent edge, but if you cannot control your emotions, you will inevitably lose money. The biggest risk in trading is not the market—it is <strong>yourself</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Our brains are biologically evolved to avoid pain and seek instant gratification, which is toxic for financial decisions. The two most dangerous psychological pitfalls are:
      </p>
      <ul class="list-disc pl-5 font-sans text-sm text-slate-500 space-y-2">
        <li><strong>FOMO (Fear Of Missing Out):</strong> Watching a stock skyrocket and buying impulsively at the absolute top, fearing you will miss out on the action.</li>
        <li><strong>Revenge Trading:</strong> After suffering a painful loss, immediately placing another, much larger trade without a plan, trying to forcefully 'win back' the lost money.</li>
      </ul>
    `,
    quiz: {
      question: "What is the psychological trap of 'Revenge Trading'?",
      options: [
        "Buying stocks of competitive companies you want to see fail",
        "Immediately placing emotional, oversized trades to aggressively win back capital after a loss",
        "Trading options contracts with high leveraged margins",
        "Refusing to pay brokerage commissions"
      ],
      correctIndex: 1,
      explanation: "Revenge trading is an emotional response to a loss, leading to impulsive, high-risk executions that usually lead to compounding losses."
    },
    sidebarKeyTerms: [
      { term: "FOMO", definition: "Fear of Missing Out—emotional anxiety that leads to buying into overheated, overvalued price peaks." },
      { term: "Revenge Trading", definition: "A highly destructive emotional state where a trader attempts to recoup losses by taking immediate, reckless trades." }
    ],
    tip: "If you feel your heart racing or anger rising after a trade, close your screens and walk away. Discipline always beats impulse.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-25",
    number: 25,
    title: "Technical Indicators: RSI & MACD",
    description: "Momentum oscillators and trend changes.",
    summary: "Learn how oscillators measure momentum to find overheated peaks and oversold bounces.",
    moduleNumber: 5,
    moduleName: "Advanced Trading Tools",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Technical Indicators are mathematical formulas calculated based on price and volume data. The two most popular momentum indicators are <strong>RSI</strong> and <strong>MACD</strong>.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The <strong>Relative Strength Index (RSI)</strong> measures speed and change of price movements on a scale of 0 to 100. It is primarily used to identify overextended markets:
      </p>
      <ul class="list-disc pl-5 font-sans text-sm text-slate-500 space-y-1">
        <li><strong>RSI > 70:</strong> Overbought conditions (market is overheated, pullbacks are likely).</li>
        <li><strong>RSI < 30:</strong> Oversold conditions (market is heavily beaten down, technical bounces are likely).</li>
      </ul>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The <strong>MACD (Moving Average Convergence Divergence)</strong> tracks the relationship between moving averages to identify momentum accelerations and trend reversals.
      </p>
    `,
    quiz: {
      question: "An RSI indicator reading of 21 suggests that a stock is in which condition?",
      options: [
        "Highly Overbought (primed for a crash)",
        "Oversold (primed for a potential technical bounce)",
        "Trading at fair book value",
        "Undergoing an immediate stock split"
      ],
      correctIndex: 1,
      explanation: "RSI readings under 30 indicate oversold conditions, meaning the selling pressure may have been overextended, opening the door for a bounce."
    },
    sidebarKeyTerms: [
      { term: "RSI", definition: "Relative Strength Index—a momentum oscillator measuring the velocity of price movements." },
      { term: "MACD", definition: "Moving Average Convergence Divergence—a trend-following momentum indicator displaying MA relationships." }
    ],
    tip: "Never buy a stock *solely* because the RSI is low. Oversold stocks can stay oversold for weeks in strong downtrends.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-26",
    number: 26,
    title: "Moving Averages & The Golden Cross",
    description: "Smoothing price action trendlines.",
    summary: "Smooth daily price spikes to establish long-term direction lines and spot powerful crossovers.",
    moduleNumber: 5,
    moduleName: "Advanced Trading Tools",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Stock prices fluctuate with high noise on a daily basis. <strong>Moving Averages (MA)</strong> smooth out this price action by averaging closing prices over a selected number of days.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        The two most common formats are the Simple Moving Average (SMA) and the Exponential Moving Average (EMA), which gives more weight to recent prices.
      </p>
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        When averages crossover, they generate powerful trend signals. A <strong>Golden Cross</strong> occurs when a short-term moving average (like the 50-day) crosses *above* a long-term average (like the 200-day), signaling a massive long-term bullish cycle change.
      </p>
    `,
    quiz: {
      question: "What chart event defines a technical 'Golden Cross' pattern?",
      options: [
        "The stock price drops below its book value",
        "A short-term moving average (e.g. 50 SMA) crosses above a long-term moving average (e.g. 200 SMA)",
        "When volume drops to a yearly low",
        "The company issues special high-yield dividends"
      ],
      correctIndex: 1,
      explanation: "A Golden Cross is a powerful lagging indicator signaling the birth of a major long-term bullish trend."
    },
    sidebarKeyTerms: [
      { term: "Moving Average", definition: "An indicator used to smooth out price data by creating a constantly updated average price." },
      { term: "Golden Cross", definition: "A bullish crossover pattern formed by a short-term average crossing above a long-term average." }
    ],
    tip: "The 200-day Simple Moving Average is regarded by Wall Street as the ultimate dividing line between bull territory and bear territory.",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "lesson-27",
    number: 27,
    title: "Trading Psychology & Market Cycles",
    description: "Accumulation, markup, distribution, and markdown.",
    summary: "Understand the four structural phases of market cycles to align your trading setups with macro trends.",
    moduleNumber: 5,
    moduleName: "Advanced Trading Tools",
    content: `
      <p class="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
        Markets are emotional entities that cycle through four distinct structural phases, driven by the shift between greed and fear:
      </p>
      <ul class="list-disc pl-5 font-sans text-sm text-slate-500 space-y-2">
        <li><strong>1. Accumulation Phase:</strong> After a long bear market, smart institutional money quietly buys shares at depressed bargain prices. The public is highly pessimistic here.</li>
        <li><strong>2. Markup Phase:</strong> Prices begin climbing steadily. The trend turns bullish, attracting public excitement, media attention, and heavy buying momentum.</li>
        <li><strong>3. Distribution Phase:</strong> After major peaks, the market stalls. Smart money begins selling (distributing) their positions to late-coming, overexcited retail buyers.</li>
        <li><strong>4. Markdown Phase:</strong> The trend reverses downward. Panic spreads, and margin calls trigger forced liquidation—otherwise known as a bear market.</li>
      </ul>
    `,
    quiz: {
      question: "What cycle phase occurs after a major bear market, where smart money quietly buys up shares at bargain prices?",
      options: [
        "Distribution Phase",
        "Markup Phase",
        "Accumulation Phase",
        "Capitulation Phase"
      ],
      correctIndex: 2,
      explanation: "In the Accumulation Phase, institutional investors quietly compile shares after a major selloff, when the public is too afraid to buy."
    },
    sidebarKeyTerms: [
      { term: "Accumulation Phase", definition: "The phase of a market cycle where institutional buyers quietly acquire shares at low prices." },
      { term: "Distribution Phase", definition: "The top of a market cycle where early buyers sell their shares to the excited public." }
    ],
    tip: "Always know where a stock sits in its overall cycle. Buying during the markdown phase is incredibly high-risk.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
  }
];
