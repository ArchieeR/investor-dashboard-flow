
export interface PortfolioHolding {
  id: string;
  ticker: string;
  assetName: string;
  percentEquity: number;
  percentPortfolio: number;
  category: 'CORE' | 'SATELLITE' | 'ALTS';
  account: string;
  fx: string;
  price: number;
  deltaPercent: number;
  quantity: number;
  value: number;
  inav?: number;
  notes: string;
  type: 'ETF' | 'Stock' | 'Crypto' | 'Bond' | 'REIT' | 'Gold' | 'Cash' | 'Alternative';
}

export interface ColumnConfig {
  key: keyof PortfolioHolding;
  label: string;
  visible: boolean;
  editable: boolean;
  resizable: boolean;
  width: number;
  type: 'text' | 'number' | 'percentage' | 'currency';
}

export type ViewMode = 'general' | 'strategy' | 'account';

export interface GroupedHoldings {
  [key: string]: PortfolioHolding[];
}
