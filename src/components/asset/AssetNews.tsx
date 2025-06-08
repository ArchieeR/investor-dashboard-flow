
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AssetNewsProps {
  ticker?: string;
}

const newsItems = [
  {
    headline: 'Market Update: Stocks rally as tech leads gains',
    timestamp: '6 hours ago'
  },
  {
    headline: 'Apple Inc. announces record quarterly earnings',
    timestamp: '8 hours ago'
  }
];

export const AssetNews = ({ ticker }: AssetNewsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <div key={index} className="border-b border-border last:border-0 pb-3 last:pb-0">
              <div className="font-medium text-foreground mb-1">
                {item.headline}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.timestamp}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
