
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  selectedETFs: string[];
}

const timeframes = ['1M', '3M', 'YTD', '1Y', '5Y', 'MAX'];

const mockPerformanceData = [
  { date: 'Jan', SPY: 100, QQQ: 100, VTI: 100, EQQQ: 100, VWCE: 100, AAPL: 100 },
  { date: 'Feb', SPY: 102, QQQ: 105, VTI: 101, EQQQ: 106, VWCE: 103, AAPL: 108 },
  { date: 'Mar', SPY: 98, QQQ: 95, VTI: 99, EQQQ: 94, VWCE: 97, AAPL: 92 },
  { date: 'Apr', SPY: 105, QQQ: 110, VTI: 104, EQQQ: 112, VWCE: 106, AAPL: 115 },
  { date: 'May', SPY: 108, QQQ: 115, VTI: 107, EQQQ: 118, VWCE: 109, AAPL: 120 },
  { date: 'Jun', SPY: 112, QQQ: 118, VTI: 111, EQQQ: 120, VWCE: 113, AAPL: 125 },
];

const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const PerformanceChart = ({ selectedETFs }: PerformanceChartProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Performance Comparison (Normalized to 100)</CardTitle>
          <div className="flex space-x-1">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              {selectedETFs.map((ticker, index) => (
                <Line
                  key={ticker}
                  type="monotone"
                  dataKey={ticker}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
