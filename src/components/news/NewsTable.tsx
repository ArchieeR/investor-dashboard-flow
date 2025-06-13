
import { Badge } from '@/components/ui/badge';

interface NewsItem {
  id: string;
  headline: string;
  importance: 'HIGH' | 'MED' | 'LOW';
  asset: string;
  impact: number;
  timestamp: string;
  source: string;
}

const newsData: NewsItem[] = [
  {
    id: '1',
    headline: 'Apple unveils new products at annual event',
    importance: 'HIGH',
    asset: 'QQQ',
    impact: 4,
    timestamp: '2 hours ago',
    source: 'Reuters'
  },
  {
    id: '2',
    headline: 'Amazon.com Inc. reports strong quarterly earnings',
    importance: 'HIGH',
    asset: 'EQQQ',
    impact: 1,
    timestamp: '4 hours ago',
    source: 'FT.com'
  },
  {
    id: '3',
    headline: "Rising demand boosts TSMC's revenue forecast",
    importance: 'HIGH',
    asset: 'QQQ',
    impact: 3,
    timestamp: '6 hours ago',
    source: 'Bloomberg'
  },
  {
    id: '4',
    headline: 'NVIDIA Corp. unveils latest advancements in AI chips',
    importance: 'HIGH',
    asset: 'EQQQ',
    impact: 4,
    timestamp: '8 hours ago',
    source: 'WSJ'
  },
  {
    id: '5',
    headline: 'Meta plans notable investments in AR and VR tech',
    importance: 'MED',
    asset: 'EQQQ',
    impact: 1,
    timestamp: '10 hours ago',
    source: 'CNBC'
  },
  {
    id: '6',
    headline: 'Federal Reserve considers new monetary policy adjustments',
    importance: 'HIGH',
    asset: 'SPY',
    impact: 5,
    timestamp: '12 hours ago',
    source: 'Reuters'
  },
  {
    id: '7',
    headline: 'Tesla reports record deliveries for Q4',
    importance: 'HIGH',
    asset: 'TSLA',
    impact: 3,
    timestamp: '14 hours ago',
    source: 'Bloomberg'
  },
  {
    id: '8',
    headline: 'Oil prices surge amid geopolitical tensions',
    importance: 'MED',
    asset: 'XOP',
    impact: 2,
    timestamp: '16 hours ago',
    source: 'WSJ'
  },
  {
    id: '9',
    headline: 'Microsoft announces new cloud computing initiatives',
    importance: 'MED',
    asset: 'MSFT',
    impact: 2,
    timestamp: '18 hours ago',
    source: 'TechCrunch'
  },
  {
    id: '10',
    headline: 'Inflation data shows signs of cooling',
    importance: 'HIGH',
    asset: 'TLT',
    impact: 4,
    timestamp: '20 hours ago',
    source: 'CNBC'
  },
  {
    id: '11',
    headline: 'Banking sector faces regulatory scrutiny',
    importance: 'MED',
    asset: 'XLF',
    impact: 1,
    timestamp: '22 hours ago',
    source: 'Financial Times'
  },
  {
    id: '12',
    headline: 'Gold prices hit new monthly highs',
    importance: 'LOW',
    asset: 'GLD',
    impact: 1,
    timestamp: '24 hours ago',
    source: 'MarketWatch'
  },
  {
    id: '13',
    headline: 'Cryptocurrency market shows volatility patterns',
    importance: 'LOW',
    asset: 'BTC',
    impact: 2,
    timestamp: '1 day ago',
    source: 'CoinDesk'
  },
  {
    id: '14',
    headline: 'Renewable energy sector attracts major investments',
    importance: 'MED',
    asset: 'ICLN',
    impact: 2,
    timestamp: '1 day ago',
    source: 'Green Finance'
  },
  {
    id: '15',
    headline: 'Healthcare stocks rally on breakthrough treatment news',
    importance: 'HIGH',
    asset: 'XLV',
    impact: 3,
    timestamp: '1 day ago',
    source: 'BioPharma Dive'
  }
];

interface NewsTableProps {
  importanceFilter?: string[];
  assetFilter?: string;
}

export const NewsTable = ({ importanceFilter = ['HIGH'], assetFilter = 'All assets' }: NewsTableProps) => {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'HIGH': return 'bg-green-500';
      case 'MED': return 'bg-yellow-500';
      case 'LOW': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getImportanceBadgeColor = (importance: string) => {
    switch (importance) {
      case 'HIGH': return 'bg-green-500 text-white border-green-500';
      case 'MED': return 'bg-yellow-500 text-white border-yellow-500';
      case 'LOW': return 'bg-red-500 text-white border-red-500';
      default: return 'bg-gray-500 text-white border-gray-500';
    }
  };

  // Filter news data based on importance and asset
  const filteredNews = newsData.filter(item => {
    const matchesImportance = importanceFilter.includes(item.importance);
    const matchesAsset = assetFilter === 'All assets' || item.asset === assetFilter;
    return matchesImportance && matchesAsset;
  });

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-muted-foreground border-b border-border">
        <div className="col-span-6">Headline</div>
        <div className="col-span-2 text-center">Priority</div>
        <div className="col-span-2 text-center">Asset</div>
        <div className="col-span-2 text-right">Impact</div>
      </div>
      
      {/* News Items - Full page scroll */}
      <div className="space-y-1">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-accent transition-colors cursor-pointer rounded-md"
          >
            <div className="col-span-6">
              <div className="font-medium text-foreground leading-snug">
                {item.headline}
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center space-x-2">
                <span>{item.timestamp}</span>
                <span>•</span>
                <span className="font-medium">{item.source}</span>
              </div>
            </div>
            
            <div className="col-span-2 flex justify-center items-center">
              <Badge 
                className={`${getImportanceBadgeColor(item.importance)} text-xs px-2 py-1`}
              >
                {item.importance}
              </Badge>
            </div>
            
            <div className="col-span-2 flex justify-center items-center">
              <Badge 
                variant="outline" 
                className="bg-blue-100 text-blue-800 border-blue-300 font-mono text-xs px-2 py-1"
              >
                {item.asset}
              </Badge>
            </div>

            <div className="col-span-2 flex justify-end items-center">
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-3 h-3 rounded-full ${getImportanceColor(item.importance)}`}
                />
                <span className="text-sm font-medium">{item.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
