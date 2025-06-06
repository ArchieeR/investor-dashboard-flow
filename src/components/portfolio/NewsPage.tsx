
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NewsItem {
  headline: string;
  importance: 'HIGH' | 'MED' | 'LOW';
  asset: string;
  timestamp: string;
  source: string;
}

const newsData: NewsItem[] = [
  {
    headline: 'Apple unveils new products at annual event',
    importance: 'HIGH',
    asset: 'QQQ',
    timestamp: '2 hours ago',
    source: 'Reuters'
  },
  {
    headline: 'Amazon.com Inc. reports strong quarterly earnings',
    importance: 'HIGH',
    asset: 'EQQQ',
    timestamp: '4 hours ago',
    source: 'Bloomberg'
  },
  {
    headline: 'Rising demand boosts TSMC\'s revenue forecast',
    importance: 'MED',
    asset: 'QQQ',
    timestamp: '6 hours ago',
    source: 'Financial Times'
  },
  {
    headline: 'NVIDIA Corp. unveils latest advancements in AI chips',
    importance: 'HIGH',
    asset: 'EQQQ',
    timestamp: '8 hours ago',
    source: 'TechCrunch'
  },
  {
    headline: 'Meta plans notable investments in AR and VR tech',
    importance: 'MED',
    asset: 'EQQQ',
    timestamp: '12 hours ago',
    source: 'The Verge'
  }
];

export const NewsPage = () => {
  const [selectedImportance, setSelectedImportance] = useState<'ALL' | 'HIGH' | 'MED' | 'LOW'>('ALL');
  const [selectedAsset, setSelectedAsset] = useState('All assets');

  const importanceFilters = ['HIGH', 'MED', 'LOW'];
  const assetFilters = ['All assets', 'QQQ', 'EQQQ', 'VUSA'];

  const filteredNews = newsData.filter(item => {
    const importanceMatch = selectedImportance === 'ALL' || item.importance === selectedImportance;
    const assetMatch = selectedAsset === 'All assets' || item.asset === selectedAsset;
    return importanceMatch && assetMatch;
  });

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'HIGH': return 'bg-red-500';
      case 'MED': return 'bg-orange-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getImportanceIndicator = (importance: string) => {
    const baseClass = "w-2 h-2 rounded-full";
    const colorClass = getImportanceColor(importance);
    return (
      <div className="flex items-center space-x-1">
        <div className={`${baseClass} ${colorClass}`} />
        <div className={`${baseClass} ${importance !== 'LOW' ? colorClass : 'bg-gray-300'}`} />
        <div className={`${baseClass} ${importance === 'HIGH' ? colorClass : 'bg-gray-300'}`} />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <CardTitle className="text-3xl">News</CardTitle>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Importance Filter */}
              <div className="flex items-center space-x-2">
                {getImportanceIndicator('HIGH')}
                <div className="flex space-x-1">
                  {importanceFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedImportance(filter)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        selectedImportance === filter
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Filter */}
              <div className="flex items-center space-x-2">
                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="px-3 py-2 text-sm border rounded-md bg-background"
                >
                  {assetFilters.map((asset) => (
                    <option key={asset} value={asset}>
                      {asset}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-3 border-b text-sm font-medium text-muted-foreground">
              <div className="col-span-6 lg:col-span-7">Headline</div>
              <div className="col-span-2 lg:col-span-2 text-center">Importance</div>
              <div className="col-span-4 lg:col-span-3 text-right">Asset</div>
            </div>

            {/* News Items */}
            {filteredNews.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 py-4 border-b hover:bg-accent transition-colors rounded-lg px-2">
                <div className="col-span-6 lg:col-span-7">
                  <h3 className="font-medium hover:text-primary cursor-pointer mb-1">{item.headline}</h3>
                  <p className="text-sm text-muted-foreground">{item.timestamp} • {item.source}</p>
                </div>
                <div className="col-span-2 lg:col-span-2 flex justify-center">
                  {getImportanceIndicator(item.importance)}
                </div>
                <div className="col-span-4 lg:col-span-3 flex justify-end items-start">
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    {item.asset}
                  </Badge>
                  <span className="ml-2 text-sm font-medium">4</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
