
import { useState } from 'react';
import { Settings, Wand2, TrendingUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockNews = [
  {
    id: 1,
    title: 'Fed Signals Rate Cut in September',
    source: 'Reuters',
    time: '2h ago',
    sentiment: 'positive'
  },
  {
    id: 2,
    title: 'Tech Stocks Rally on AI News',
    source: 'Bloomberg',
    time: '4h ago',
    sentiment: 'positive'
  },
  {
    id: 3,
    title: 'Oil Prices Drop Amid Supply Concerns',
    source: 'CNBC',
    time: '6h ago',
    sentiment: 'negative'
  }
];

export const NotificationWidget = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-4 space-y-4 flex-1 flex flex-col">
        {/* Day/Total Gain Display */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-green-50 rounded-lg flex-shrink-0">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">DAY GAIN</div>
            <div className="text-sm font-semibold text-green-600">£10.29 (0.01%)</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">TOTAL GAIN</div>
            <div className="text-sm font-semibold text-green-600">£9,667.72 (11.52%)</div>
          </div>
        </div>

        {/* News Widget - Flexible height */}
        <div className="space-y-3 flex-1 flex flex-col">
          <div className="flex items-center justify-between flex-shrink-0">
            <h3 className="text-sm font-semibold">Market News</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-2 flex-1 overflow-auto">
            {mockNews.map((article) => (
              <div key={article.id} className="p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium leading-tight line-clamp-2">{article.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{article.source}</span>
                      <span className="text-xs text-muted-foreground">{article.time}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={article.sentiment === 'positive' ? 'default' : 'destructive'} 
                    className="text-xs px-1.5 py-0.5 flex-shrink-0"
                  >
                    {article.sentiment === 'positive' ? '+' : '-'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons - Icon Only */}
        <div className="grid grid-cols-3 gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" className="flex items-center justify-center p-3 h-10 w-full">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center justify-center p-3 h-10 w-full">
            <Wand2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center justify-center p-3 h-10 w-full">
            <TrendingUp className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
