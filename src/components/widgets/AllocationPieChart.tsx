
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'US Equities', value: 45, color: '#3b82f6' },
  { name: 'International', value: 25, color: '#8b5cf6' },
  { name: 'Bonds', value: 20, color: '#06b6d4' },
  { name: 'Alternatives', value: 10, color: '#f59e0b' },
];

const chartConfig = {
  value: { label: "Allocation %" },
};

export const AllocationPieChart = () => {
  return (
    <Card className="h-full flex flex-col rounded-xl border-0 shadow-sm bg-card overflow-hidden">
      <CardHeader className="pb-2 px-4 pt-4">
        <CardTitle className="text-sm font-semibold">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden px-4 pb-4">
        <div className="flex-1 min-h-0">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <div className="space-y-1 mt-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}</span>
              </div>
              <span className="flex-shrink-0 font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
