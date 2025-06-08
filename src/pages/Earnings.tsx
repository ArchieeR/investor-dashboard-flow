
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Calendar, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const Earnings = () => {
  const [activeTab, setActiveTab] = useState('Earnings');
  const [selectedWeek, setSelectedWeek] = useState('This Week');

  const weekOptions = ['Yesterday', 'Today', 'Tomorrow', 'This Week', 'Next Week'];

  const earningsData = [
    {
      date: 'Mon 9',
      count: 1,
      events: [
        {
          time: '11:01 PM',
          flag: '🇬🇧',
          company: 'BRC Retail Sales Monitor YoY...',
          type: 'retail'
        }
      ]
    },
    {
      date: 'Tue 10', 
      count: 5,
      events: [
        {
          time: '6:00 AM',
          flag: '🇬🇧',
          company: 'Unemployment Rate (Apr)',
          type: 'economic'
        },
        {
          time: '6:00 AM',
          flag: '🇬🇧', 
          company: 'Employment Change (Apr)',
          type: 'economic'
        },
        {
          time: '6:00 AM',
          flag: '🇬🇧',
          company: 'Average Earnings incl. Bonus...',
          type: 'economic'
        },
        {
          time: '3:15 AM',
          flag: '🇪🇺',
          company: 'ECB Lagarde Speech',
          type: 'speech'
        }
      ]
    },
    {
      date: 'Wed 11',
      count: 7,
      events: [
        {
          time: '11:01 PM',
          flag: '🇬🇧',
          company: 'RICS House Price Balance (M...)',
          type: 'housing'
        },
        {
          time: '6:00 AM',
          flag: '🇬🇧',
          company: 'Gross Domestic Product Mo...',
          type: 'economic'
        },
        {
          time: '6:00 AM',
          flag: '🇩🇪',
          company: 'Wholesale Prices YoY (May)',
          type: 'economic'
        },
        {
          time: '6:00 AM',
          flag: '🇬🇧',
          company: 'Goods Trade Balance (Apr)',
          type: 'trade'
        }
      ]
    },
    {
      date: 'Thu 12',
      count: 8,
      events: [
        {
          time: '6:00 AM',
          flag: '🇬🇧',
          company: 'Goods Trade Balance Non-E...',
          type: 'trade'
        },
        {
          time: '6:45 AM',
          flag: '🇫🇷',
          company: 'CPI (May)',
          type: 'inflation'
        },
        {
          time: '6:00 AM',
          flag: '🇩🇪',
          company: 'Wholesale Prices MoM (May)',
          type: 'economic'
        }
      ]
    },
    {
      date: 'Fri 13',
      count: 17,
      events: [
        {
          time: '6:00 AM',
          flag: '🇬🇧',
          company: 'GDP 3-Month Avg (Apr)',
          type: 'economic'
        },
        {
          time: '6:45 AM',
          flag: '🇫🇷',
          company: 'HICP MoM',
          type: 'inflation'
        },
        {
          time: '6:00 AM',
          flag: '🇬🇧',
          company: 'Manufacturing Production M...',
          type: 'manufacturing'
        },
        {
          time: '6:00 AM',
          flag: '🇬🇧',
          company: 'NIESR Monthly GDP Tracker ...',
          type: 'economic'
        }
      ]
    },
    {
      date: 'Sat 14',
      count: 0,
      events: []
    }
  ];

  const todayEarnings = [
    {
      ticker: 'AVGO',
      company: 'BROADCOM INC.',
      marketCap: '1.16T',
      epsEstimate: '1.57',
      reportedEps: '1.58',
      surprise: '0.01',
      surprisePercent: '0.69%',
      revenue: { forecast: '14.96B', actual: '15B' },
      date: '2025-06-05',
      time: '2025-04-30',
      trend: 'up'
    },
    {
      ticker: 'CRWD',
      company: 'CROWDSTRIKE HOLDINGS, INC.',
      marketCap: '116.75B',
      epsEstimate: '0.66',
      reportedEps: '0.73',
      surprise: '0.07',
      surprisePercent: '10.55%',
      revenue: { forecast: '1.1B', actual: '1.1B' },
      date: '2025-06-03',
      time: '2025-04-30',
      trend: 'up'
    },
    {
      ticker: 'FERG',
      company: 'FERGUSON ENTERPRISES INC.',
      marketCap: '41.61B',
      epsEstimate: '2.01',
      reportedEps: '2.50',
      surprise: '0.49',
      surprisePercent: '24.19%',
      revenue: { forecast: '7.42B', actual: '7.62B' },
      date: '2025-06-03',
      time: '2025-04-30',
      trend: 'up'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Earnings Calendar</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">Jun 8 - 14</span>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">Week</Button>
            </div>
          </div>

          <div className="flex space-x-2 mb-6">
            {weekOptions.map((option) => (
              <Button
                key={option}
                variant={selectedWeek === option ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedWeek(option)}
              >
                {option}
              </Button>
            ))}
          </div>

          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <div className="grid grid-cols-7 gap-4">
                {earningsData.map((day, index) => (
                  <Card key={index} className={`min-h-[300px] ${day.count > 0 ? 'hover:shadow-md' : ''} transition-shadow`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">{day.date}</CardTitle>
                        {day.count > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {day.count}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {day.events.slice(0, 4).map((event, eventIndex) => (
                        <div key={eventIndex} className="p-2 bg-accent/50 rounded text-xs">
                          <div className="flex items-center space-x-1 mb-1">
                            <span>{event.flag}</span>
                            <span className="text-muted-foreground">{event.time}</span>
                          </div>
                          <div className="font-medium text-xs leading-tight">
                            {event.company}
                          </div>
                        </div>
                      ))}
                      {day.count > 4 && (
                        <div className="text-xs text-muted-foreground text-center pt-1">
                          +{day.count - 4} more
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-medium">Ticker</th>
                      <th className="text-left p-2 text-sm font-medium">Market Cap</th>
                      <th className="text-left p-2 text-sm font-medium">EPS Estimate</th>
                      <th className="text-left p-2 text-sm font-medium">Reported EPS</th>
                      <th className="text-left p-2 text-sm font-medium">Surprise</th>
                      <th className="text-left p-2 text-sm font-medium">Surprise %</th>
                      <th className="text-left p-2 text-sm font-medium">Revenue Forecast</th>
                      <th className="text-left p-2 text-sm font-medium">Revenue Actual</th>
                      <th className="text-left p-2 text-sm font-medium">Date</th>
                      <th className="text-left p-2 text-sm font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayEarnings.map((earning) => (
                      <tr key={earning.ticker} className="border-b hover:bg-accent/50">
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">{earning.ticker.slice(0, 2)}</span>
                            </div>
                            <div>
                              <div className="font-medium text-sm">{earning.ticker}</div>
                              <div className="text-xs text-muted-foreground">{earning.company}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 text-sm">{earning.marketCap}</td>
                        <td className="p-2 text-sm">{earning.epsEstimate}</td>
                        <td className="p-2 text-sm">{earning.reportedEps}</td>
                        <td className="p-2 text-sm text-green-600">{earning.surprise}</td>
                        <td className="p-2 text-sm text-green-600">{earning.surprisePercent}</td>
                        <td className="p-2 text-sm">{earning.revenue.forecast}</td>
                        <td className="p-2 text-sm">{earning.revenue.actual}</td>
                        <td className="p-2 text-sm">{earning.date}</td>
                        <td className="p-2 text-sm">{earning.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
