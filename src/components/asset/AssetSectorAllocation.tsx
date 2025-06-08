
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const sectorData = [
  { name: 'Information', value: 25.2, color: '#3b82f6' },
  { name: 'Health Care', value: 10.4, color: '#8b5cf6' },
  { name: 'Consumes', value: 10.8, color: '#06b6d4' },
  { name: 'Financials', value: 13.6, color: '#6b7280' },
  { name: 'Other', value: 40.0, color: '#94a3b8' },
];

const chartConfig = {
  value: {
    label: "Allocation %",
  },
};

export const AssetSectorAllocation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <PieChart>
            <Pie
              data={sectorData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        
        <div className="space-y-2 mt-4">
          {sectorData.map((sector, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: sector.color }}
                />
                <span className="text-foreground">{sector.name}</span>
              </div>
              <span className="font-medium">{sector.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
