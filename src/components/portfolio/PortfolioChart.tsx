
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const chartData = [
  { date: 'May 1', value: 89000, displayDate: 'May 1' },
  { date: 'May 8', value: 90500, displayDate: 'May 8' },
  { date: 'May 13', value: 88800, displayDate: 'May 13' },
  { date: 'May 20', value: 91200, displayDate: 'May 20' },
  { date: 'May 28', value: 92800, displayDate: 'May 28' },
  { date: 'Jun 3', value: 93200, displayDate: 'Jun 3' },
  { date: 'Jun 6', value: 93576, displayDate: 'Jun 6' },
];

export const PortfolioChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const timeframes = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX'];

  const currentValue = 93576.21;
  const dayChange = -5597.43;
  const dayChangePercent = -5.64;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">£{currentValue.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className={`font-medium ${dayChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {dayChangePercent}% {dayChange.toLocaleString()} 1M
              </span>
              <span>Jun 6, 9:21:06 PM UTC+2 · GBP · Disclaimer</span>
            </div>
          </div>
          
          {/* Timeframe Selector */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="displayDate" 
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                stroke="#6b7280"
              />
              <YAxis 
                domain={['dataMin - 1000', 'dataMax + 1000']}
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                stroke="#6b7280"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                formatter={(value: number) => [`£${value.toLocaleString()}`, 'Portfolio Value']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
