
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Dec', value: 65 },
  { month: 'Jan', value: 62 },
  { month: 'Feb', value: 68 },
  { month: 'Mar', value: 71 },
  { month: 'Apr', value: 69 },
  { month: 'May', value: 72 },
  { month: 'Jun', value: 70 },
  { month: 'Jul', value: 73 },
  { month: 'Aug', value: 75 },
];

const chartConfig = {
  value: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
};

export const AssetPerformance = () => {
  const [timeframe, setTimeframe] = useState('1Y');
  
  const timeframes = ['1Y', '5Y', 'MAX'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="month" 
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
        
        <div className="flex justify-center space-x-2 mt-4">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe(tf)}
              className="text-xs"
            >
              {tf}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
