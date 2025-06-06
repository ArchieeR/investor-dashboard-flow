
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const sectorData = [
  { name: 'Information Technology', value: 65, color: '#3b82f6' },
  { name: 'Healthcare', value: 20, color: '#10b981' },
  { name: 'Financial Services', value: 10, color: '#f59e0b' },
  { name: 'Consumer Goods', value: 5, color: '#ef4444' }
];

const assetAllocationData = [
  { name: 'ETFs', value: 56.2, color: '#3b82f6' },
  { name: 'Stocks', value: 25.7, color: '#8b5cf6' },
  { name: 'Crypto', value: 15.7, color: '#f59e0b' },
  { name: 'Cash', value: 2.4, color: '#6b7280' }
];

const coreStageData = [
  { name: 'Core', value: 60, color: '#3b82f6' },
  { name: 'Satellite', value: 30, color: '#8b5cf6' },
  { name: 'Alternative', value: 10, color: '#1f2937' }
];

const regionData = [
  { name: 'US', value: 40 },
  { name: 'UK', value: 25 },
  { name: 'Japan', value: 15 },
  { name: 'Other', value: 20 }
];

export const AnalyticsWidgets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Sector Allocation */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Sector Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1">
            {sectorData.slice(0, 2).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1">
            {assetAllocationData.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Core/Satellite/Alt */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Portfolio Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={coreStageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                >
                  {coreStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1">
            {coreStageData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Region Exposure */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Region Exposure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="horizontal">
                <XAxis type="number" domain={[0, 50]} hide />
                <YAxis type="category" dataKey="name" width={50} tick={{ fontSize: 12 }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1">
            {regionData.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
