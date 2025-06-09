
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ComparisonTableProps {
  selectedETFs: string[];
}

const mockData = {
  SPY: { name: 'SPDR S&P 500 ETF', expenseRatio: 0.09, aum: '450B', dividend: '1.2%', inception: '1993' },
  QQQ: { name: 'Invesco QQQ Trust', expenseRatio: 0.20, aum: '220B', dividend: '0.5%', inception: '1999' },
  VTI: { name: 'Vanguard Total Stock Market', expenseRatio: 0.03, aum: '320B', dividend: '1.4%', inception: '2001' },
  EQQQ: { name: 'Invesco EQQQ NASDAQ-100', expenseRatio: 0.30, aum: '8B', dividend: '0.4%', inception: '2020' },
  VWCE: { name: 'Vanguard FTSE All-World', expenseRatio: 0.22, aum: '15B', dividend: '1.8%', inception: '2019' },
  AAPL: { name: 'Apple Inc.', expenseRatio: 0, aum: '3.2T', dividend: '0.4%', inception: '1980' },
};

export const ComparisonTable = ({ selectedETFs }: ComparisonTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Side-by-Side Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Metric</th>
                {selectedETFs.map((ticker) => (
                  <th key={ticker} className="text-left py-3 px-2 font-medium">
                    <Badge variant="outline" className="font-mono">{ticker}</Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-2 text-muted-foreground">Name</td>
                {selectedETFs.map((ticker) => (
                  <td key={ticker} className="py-3 px-2 text-sm">
                    {mockData[ticker as keyof typeof mockData]?.name}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-3 px-2 text-muted-foreground">Expense Ratio</td>
                {selectedETFs.map((ticker) => (
                  <td key={ticker} className="py-3 px-2 text-sm">
                    {mockData[ticker as keyof typeof mockData]?.expenseRatio}%
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-3 px-2 text-muted-foreground">AUM</td>
                {selectedETFs.map((ticker) => (
                  <td key={ticker} className="py-3 px-2 text-sm">
                    ${mockData[ticker as keyof typeof mockData]?.aum}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-3 px-2 text-muted-foreground">Dividend Yield</td>
                {selectedETFs.map((ticker) => (
                  <td key={ticker} className="py-3 px-2 text-sm">
                    {mockData[ticker as keyof typeof mockData]?.dividend}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-3 px-2 text-muted-foreground">Inception</td>
                {selectedETFs.map((ticker) => (
                  <td key={ticker} className="py-3 px-2 text-sm">
                    {mockData[ticker as keyof typeof mockData]?.inception}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
