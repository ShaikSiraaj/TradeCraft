export interface Lesson {
  id: string;
  title: string;
  description: string;
  moduleNumber: number;
  moduleName: string;
  lessonNumber: number;
  durationMins: number;
  status: 'locked' | 'completed' | 'in-progress' | 'current';
  path: string;
}

export interface Module {
  number: number;
  name: string;
  description: string;
  lessons: Lesson[];
  progress: number; // 0 to 100
  status: 'locked' | 'completed' | 'in-progress';
  iconName: string;
}

export interface Transaction {
  id: string;
  timestamp: string;
  type: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT';
  ticker: string;
  quantity: number;
  price: number;
  totalValue: number;
  status: 'EXECUTED' | 'PENDING';
}

export interface MarketTicker {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

export interface Certificate {
  id: string;
  title: string;
  earnedDate?: string;
  status: 'earned' | 'locked';
}

export interface UserProgress {
  name: string;
  avatarUrl: string;
  overallProgress: number; // e.g. 65
  completedLessonIds: string[];
  balance: number; // For simulation, starts at $100,000
  portfolioShares: { [ticker: string]: number };
}
