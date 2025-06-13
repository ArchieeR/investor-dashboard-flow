
import { useState } from 'react';
import { Eye, Copy, FileText, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface FilingTableProps {
  ticker: string;
  filingType: string;
  dateRange: string;
}

const mockFilings = [
  {
    id: '1',
    date: '2024-01-25',
    type: 'Q1 2024 Earnings',
    category: 'earnings',
    summary: 'EPS: $1.46 (+4.3% YoY), Revenue: $89.5B (+7.8% YoY)',
    keyStats: { eps: 1.46, revenue: 89.5, growth: 7.8 }
  },
  {
    id: '2',
    date: '2024-01-25',
    type: 'Q1 2024 Call Transcript',
    category: 'transcript',
    summary: 'Management discusses AI investments, services growth outlook',
    keyStats: null
  },
  {
    id: '3',
    date: '2023-10-26',
    type: 'Q4 2023 Earnings',
    category: 'earnings',
    summary: 'EPS: $1.29 (-0.8% YoY), Revenue: $81.8B (+0.4% YoY)',
    keyStats: { eps: 1.29, revenue: 81.8, growth: 0.4 }
  },
  {
    id: '4',
    date: '2023-09-30',
    type: 'Annual Report 2023',
    category: 'annual',
    summary: 'Full year results, strategic initiatives, risk factors',
    keyStats: null
  },
  {
    id: '5',
    date: '2023-07-27',
    type: 'Q3 2023 Earnings',
    category: 'earnings',
    summary: 'EPS: $1.26 (+5.0% YoY), Revenue: $81.8B (+1.4% YoY)',
    keyStats: { eps: 1.26, revenue: 81.8, growth: 1.4 }
  }
];

export const FilingTable = ({ ticker, filingType, dateRange }: FilingTableProps) => {
  const [selectedFilings, setSelectedFilings] = useState<string[]>([]);

  const getTypeIcon = (category: string) => {
    switch (category) {
      case 'earnings': return FileText;
      case 'transcript': return Phone;
      case 'annual': return Calendar;
      default: return FileText;
    }
  };

  const getTypeBadge = (category: string) => {
    switch (category) {
      case 'earnings':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Earnings</Badge>;
      case 'transcript':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Call</Badge>;
      case 'annual':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Annual</Badge>;
      default:
        return <Badge variant="outline">Document</Badge>;
    }
  };

  const toggleFilingSelection = (filingId: string) => {
    setSelectedFilings(prev => 
      prev.includes(filingId) 
        ? prev.filter(id => id !== filingId)
        : [...prev, filingId]
    );
  };

  const handleCompareSelected = () => {
    console.log('Comparing filings:', selectedFilings);
    // This would open a comparison view
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Company Filings
        </CardTitle>
        {selectedFilings.length > 1 && (
          <Button onClick={handleCompareSelected} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Compare Selected ({selectedFilings.length})
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedFilings.length === mockFilings.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFilings(mockFilings.map(f => f.id));
                    } else {
                      setSelectedFilings([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Key Stats</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFilings.map((filing) => {
              const TypeIcon = getTypeIcon(filing.category);
              
              return (
                <TableRow key={filing.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedFilings.includes(filing.id)}
                      onCheckedChange={() => toggleFilingSelection(filing.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {new Date(filing.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{filing.type}</div>
                        {getTypeBadge(filing.category)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="text-sm text-muted-foreground">
                      {filing.summary}
                    </div>
                  </TableCell>
                  <TableCell>
                    {filing.keyStats && (
                      <div className="text-sm space-y-1">
                        <div>EPS: ${filing.keyStats.eps}</div>
                        <div>Rev: ${filing.keyStats.revenue}B</div>
                        <div className={`${filing.keyStats.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {filing.keyStats.growth >= 0 ? '+' : ''}{filing.keyStats.growth}% YoY
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
