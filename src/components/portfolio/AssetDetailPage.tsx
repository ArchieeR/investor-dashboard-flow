
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

// Mock data for demonstration
const assetData = {
  name: 'Vanguard S&P 500 UCITS ETF',
  ticker: 'VUSA',
  exchange: 'LON',
  type: 'ETF',
  category: 'Large Cap',
  price: 73.12,
  currency: 'USD',
  dayChange: 0.51,
  dayChangePercent: 0.70,
  objective: 'Track the performance of the S&P 500 Index',
  ter: 0.07,
  indexTracked: 'S&P 500',
  domicile: 'Ireland'
};

const performanceData = [
  { date: 'Dec', value: 65.20 },
  { date: 'Jan', value: 67.50 },
  { date: 'Feb', value: 66.80 },
  { date: 'Mar', value: 69.20 },
  { date: 'Apr', value: 71.10 },
  { date: 'May', value: 72.30 },
  { date: 'Jun', value: 73.12 }
];

const holdingsData = [
  { company: 'Apple Inc.', allocation: 6.2, sector: 'Technology' },
  { company: 'Microsoft Corp.', allocation: 5.0, sector: 'Technology' },
  { company: 'Amazon.com Inc.', allocation: 3.7, sector: 'Consumer Discretionary' },
  { company: 'NVIDIA Corp.', allocation: 3.3, sector: 'Technology' },
  { company: 'Alphabet Inc.', allocation: 2.2, sector: 'Communication Services' },
  { company: 'Tesla Inc.', allocation: 1.7, sector: 'Consumer Discretionary' },
  { company: 'UnitedHealth Group Inc.', allocation: 1.4, sector: 'Healthcare' }
];

const sectorData = [
  { name: 'Information Technology', value: 25.2, color: '#3b82f6' },
  { name: 'Healthcare', value: 13.6, color: '#10b981' },
  { name: 'Financials', value: 10.8, color: '#f59e0b' },
  { name: 'Consumer Discretionary', value: 10.4, color: '#ef4444' },
  { name: 'Other', value: 39.0, color: '#6b7280' }
];

const newsData = [
  {
    headline: 'Market Update: Stocks rally as tech leads gains',
    timestamp: '6 hours ago',
    source: 'Reuters'
  },
  {
    headline: 'Apple Inc. announces record quarterly earnings',
    timestamp: '8 hours ago',
    source: 'Bloomberg'
  },
  {
    headline: 'S&P 500 reaches new all-time high amid optimism',
    timestamp: '12 hours ago',
    source: 'CNBC'
  }
];

export const AssetDetailPage = () => {
  const [timeframe, setTimeframe] = useState('1Y');
  const [showAllHoldings, setShowAllHoldings] = useState(false);

  const timeframes = ['6M', '1Y', '5Y'];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">{assetData.name}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="secondary">{assetData.ticker}</Badge>
                <span className="text-muted-foreground">{assetData.exchange} • {assetData.type} • {assetData.category}</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <span className="text-2xl font-bold">{assetData.price} {assetData.currency}</span>
                <span className={`font-medium ${assetData.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {assetData.dayChange >= 0 ? '+' : ''}{assetData.dayChange} | {assetData.dayChangePercent >= 0 ? '+' : ''}{assetData.dayChangePercent}%
                </span>
              </div>
            </div>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Fact Sheet</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Fund Objective</h3>
                  <p className="text-muted-foreground text-sm">{assetData.objective}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TER</span>
                    <span className="font-medium">{assetData.ter}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Index Tracked</span>
                    <span className="font-medium">{assetData.indexTracked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domicile</span>
                    <span className="font-medium">{assetData.domicile}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance</CardTitle>
                <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        timeframe === tf
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
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

          {/* News Panel */}
          <Card>
            <CardHeader>
              <CardTitle>News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsData.map((news, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <h3 className="font-medium hover:text-primary cursor-pointer">{news.headline}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{news.timestamp} • {news.source}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Holdings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Individual Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b">
                  <span>Company</span>
                  <span className="text-right">Allocation</span>
                </div>
                {holdingsData.slice(0, showAllHoldings ? holdingsData.length : 5).map((holding, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">{holding.company}</div>
                      <div className="text-muted-foreground text-xs">{holding.sector}</div>
                    </div>
                    <div className="text-right font-medium">{holding.allocation}%</div>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAllHoldings(!showAllHoldings)}
                  className="w-full mt-3"
                >
                  {showAllHoldings ? 'Show Less' : 'Show More'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sector Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {sectorData.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: sector.color }}
                      />
                      <span>{sector.name}</span>
                    </div>
                    <span className="font-medium">{sector.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
