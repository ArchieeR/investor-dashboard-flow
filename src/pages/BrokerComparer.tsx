
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingDown, Trophy } from 'lucide-react';

interface Broker {
  name: string;
  fees: {
    low: number; // £100k
    medium: number; // £250k  
    high: number; // £500k
  };
  features: string[];
}

const brokers: Broker[] = [
  {
    name: 'Vanguard',
    fees: { low: 150, medium: 375, high: 375 },
    features: ['Low-cost index funds', 'ISA & SIPP available', 'Simple platform']
  },
  {
    name: 'Fidelity',
    fees: { low: 350, medium: 500, high: 1000 },
    features: ['Zero fund fees', 'Research tools', 'ISA & SIPP available']
  },
  {
    name: 'Barclays SmartInvestor',
    fees: { low: 350, medium: 650, high: 1150 },
    features: ['Bank integration', 'ISA & SIPP available', 'Advice available']
  },
  {
    name: 'Halifax Share Dealing',
    fees: { low: 180, medium: 180, high: 180 },
    features: ['Fixed annual fee', 'ISA available', 'Simple interface']
  },
  {
    name: 'Interactive Investor',
    fees: { low: 156, medium: 156, high: 156 },
    features: ['Fixed monthly fee', 'Free regular investing', 'SIPP available']
  },
  {
    name: 'Hargreaves Lansdown',
    fees: { low: 450, medium: 1125, high: 1750 },
    features: ['Comprehensive platform', 'Research & analysis', 'ISA & SIPP available']
  },
  {
    name: 'AJ Bell',
    fees: { low: 250, medium: 625, high: 875 },
    features: ['SIPP specialist', 'ISA available', 'Good platform']
  },
  {
    name: 'Aviva',
    fees: { low: 375, medium: 900, high: 1525 },
    features: ['Pension specialist', 'SIPP available', 'Life insurance']
  },
  {
    name: 'Bestinvest',
    fees: { low: 400, medium: 1000, high: 1500 },
    features: ['ISA & SIPP available', 'Investment advice', 'Research tools']
  },
  {
    name: 'Aegon/ARC',
    fees: { low: 615, medium: 1290, high: 1290 },
    features: ['Platform variety', 'ISA & SIPP available', 'Pension focus']
  }
];

const BrokerComparer = () => {
  const [activeTab, setActiveTab] = useState('Broker Comparer');
  const [aum, setAum] = useState<string>('250000');
  const [results, setResults] = useState<any[]>([]);

  const calculateCosts = () => {
    const aumValue = parseFloat(aum) || 0;
    
    const calculatedResults = brokers.map(broker => {
      let annualCost = 0;
      
      if (aumValue <= 100000) {
        annualCost = broker.fees.low;
      } else if (aumValue <= 250000) {
        // Interpolate between low and medium
        const ratio = (aumValue - 100000) / (250000 - 100000);
        annualCost = broker.fees.low + (broker.fees.medium - broker.fees.low) * ratio;
      } else if (aumValue <= 500000) {
        // Interpolate between medium and high
        const ratio = (aumValue - 250000) / (500000 - 250000);
        annualCost = broker.fees.medium + (broker.fees.high - broker.fees.medium) * ratio;
      } else {
        // For amounts over £500k, use the high fee structure
        annualCost = broker.fees.high;
      }
      
      return {
        ...broker,
        annualCost: Math.round(annualCost),
        costPercentage: ((annualCost / aumValue) * 100).toFixed(3)
      };
    }).sort((a, b) => a.annualCost - b.annualCost);
    
    setResults(calculatedResults);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRankColor = (index: number) => {
    if (index === 0) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    if (index === 1) return 'bg-gray-100 border-gray-300 text-gray-800';
    if (index === 2) return 'bg-orange-100 border-orange-300 text-orange-800';
    return 'bg-background';
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Broker Comparer</h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calculator className="h-5 w-5" />
              <span className="text-sm">Find the cheapest broker for your portfolio</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5" />
                <span>Calculate Annual Costs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="aum">Assets Under Management (£)</Label>
                  <Input
                    id="aum"
                    type="number"
                    placeholder="e.g. 250000"
                    value={aum}
                    onChange={(e) => setAum(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <Button onClick={calculateCosts} size="lg" className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Compare Brokers
                </Button>
                <div className="text-sm text-muted-foreground">
                  Enter your total portfolio value to see annual costs across all SIPP providers
                </div>
              </div>
            </CardContent>
          </Card>

          {results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Broker Comparison Results</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Annual costs for {formatCurrency(parseFloat(aum))} portfolio value
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">Rank</th>
                        <th className="text-left py-3 px-2 font-medium">Provider</th>
                        <th className="text-left py-3 px-2 font-medium">Annual Cost</th>
                        <th className="text-left py-3 px-2 font-medium">Cost %</th>
                        <th className="text-left py-3 px-2 font-medium">Features</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((broker, index) => (
                        <tr key={broker.name} className={`border-b hover:bg-accent/50 ${getRankColor(index)}`}>
                          <td className="py-3 px-2">
                            <div className="flex items-center">
                              {index === 0 && <Trophy className="h-4 w-4 text-yellow-600 mr-1" />}
                              <Badge variant={index < 3 ? "default" : "secondary"}>
                                #{index + 1}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="font-medium">{broker.name}</div>
                            {index === 0 && (
                              <div className="text-xs text-green-600 font-medium">Cheapest Option</div>
                            )}
                          </td>
                          <td className="py-3 px-2">
                            <div className="font-semibold text-lg">{formatCurrency(broker.annualCost)}</div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="text-sm">{broker.costPercentage}%</div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex flex-wrap gap-1">
                              {broker.features.slice(0, 2).map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {broker.features.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{broker.features.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Key Insights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-green-600">Cheapest: </span>
                      {results[0]?.name} at {formatCurrency(results[0]?.annualCost)}
                    </div>
                    <div>
                      <span className="font-medium text-red-600">Most Expensive: </span>
                      {results[results.length - 1]?.name} at {formatCurrency(results[results.length - 1]?.annualCost)}
                    </div>
                    <div>
                      <span className="font-medium text-blue-600">Potential Savings: </span>
                      {formatCurrency(results[results.length - 1]?.annualCost - results[0]?.annualCost)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrokerComparer;
