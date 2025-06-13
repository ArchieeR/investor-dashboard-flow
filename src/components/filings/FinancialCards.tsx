
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FinancialCardsProps {
  ticker: string;
}

const mockFinancialData = {
  AAPL: {
    eps: { current: 1.46, lastQuarter: 1.29, yoy: 1.40, change: 4.3 },
    revenue: { current: 89.5, lastQuarter: 81.8, yoy: 83.0, change: 7.8 },
    netIncome: { current: 22.96, lastQuarter: 20.72, yoy: 19.44, change: 18.1 },
    profitMargin: { current: 25.6, lastQuarter: 25.3, yoy: 23.4, change: 2.2 },
    guidance: 'Revenue guidance raised for Q4 2024'
  }
};

export const FinancialCards = ({ ticker }: FinancialCardsProps) => {
  const data = mockFinancialData[ticker as keyof typeof mockFinancialData] || mockFinancialData.AAPL;

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  const formatBillion = (value: number) => `$${value.toFixed(1)}B`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  const getChangeColor = (change: number) => change >= 0 ? 'text-green-600' : 'text-red-600';
  const getChangeIcon = (change: number) => change >= 0 ? TrendingUp : TrendingDown;

  const cards = [
    {
      title: 'Earnings Per Share',
      icon: DollarSign,
      current: formatCurrency(data.eps.current),
      lastQuarter: formatCurrency(data.eps.lastQuarter),
      yoy: formatCurrency(data.eps.yoy),
      change: data.eps.change,
      unit: 'EPS'
    },
    {
      title: 'Revenue',
      icon: BarChart3,
      current: formatBillion(data.revenue.current),
      lastQuarter: formatBillion(data.revenue.lastQuarter),
      yoy: formatBillion(data.revenue.yoy),
      change: data.revenue.change,
      unit: 'Revenue'
    },
    {
      title: 'Net Income',
      icon: DollarSign,
      current: formatBillion(data.netIncome.current),
      lastQuarter: formatBillion(data.netIncome.lastQuarter),
      yoy: formatBillion(data.netIncome.yoy),
      change: data.netIncome.change,
      unit: 'Net Income'
    },
    {
      title: 'Profit Margin',
      icon: Percent,
      current: formatPercent(data.profitMargin.current),
      lastQuarter: formatPercent(data.profitMargin.lastQuarter),
      yoy: formatPercent(data.profitMargin.yoy),
      change: data.profitMargin.change,
      unit: 'Margin'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const ChangeIcon = getChangeIcon(card.change);
          
          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <card.icon className="h-4 w-4" />
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold">{card.current}</div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Quarter:</span>
                    <span>{card.lastQuarter}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Year over Year:</span>
                    <span>{card.yoy}</span>
                  </div>
                </div>
                
                <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor(card.change)}`}>
                  <ChangeIcon className="h-3 w-3" />
                  {Math.abs(card.change)}% YoY
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {data.guidance && (
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Forward Guidance
            </Badge>
            <span className="text-sm text-muted-foreground">{data.guidance}</span>
          </div>
        </Card>
      )}
    </div>
  );
};
