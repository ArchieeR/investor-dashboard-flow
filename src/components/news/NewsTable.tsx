
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
  }
];

export const NewsTable = () => {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'HIGH': return 'bg-green-500';
      case 'MED': return 'bg-yellow-500';
      case 'LOW': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-muted-foreground border-b border-border">
        <div className="col-span-7">Headline</div>
        <div className="col-span-2 text-center">Importance</div>
        <div className="col-span-3 text-center">Asset</div>
      </div>
      
      {/* News Items */}
      <div className="space-y-1">
        {newsData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-accent transition-colors cursor-pointer rounded-md"
          >
            <div className="col-span-7">
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
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-3 h-3 rounded-full ${getImportanceColor(item.importance)}`}
                />
                <div 
                  className={`w-2 h-2 rounded-full ${getImportanceColor(item.importance)} opacity-60`}
                />
              </div>
            </div>
            
            <div className="col-span-3 flex justify-center items-center">
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="outline" 
                  className="bg-green-100 text-green-800 border-green-300 font-mono text-xs px-2 py-1"
                >
                  {item.asset}
                </Badge>
                <span className="text-sm font-medium">{item.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
