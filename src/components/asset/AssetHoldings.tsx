
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const holdingsData = [
  { company: 'Apple Inc.', sector: 'Inform', allocation: 6.2 },
  { company: 'Microsoft Corp.', sector: 'Info', allocation: 5.0 },
  { company: 'Amazon.com Inc.', sector: '', allocation: 3.7 },
  { company: 'NVIDIA Corp.', sector: 'Infor', allocation: 3.3 },
  { company: 'Alphabet Inc.', sector: 'Oilass', allocation: 2.2 },
  { company: 'Alphabet Inc.', sector: 'Comm SI', allocation: 1.8 },
  { company: 'Tesla Inc.', sector: 'Financials', allocation: 1.7 },
  { company: 'UnitedHealth Group In', sector: '', allocation: 1.4 },
];

export const AssetHoldings = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedHoldings = showAll ? holdingsData : holdingsData.slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Individual Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border">
            <div>Company</div>
            <div className="text-right">Allocation</div>
          </div>
          
          {displayedHoldings.map((holding, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 py-1">
              <div className="text-sm">
                <div className="font-medium text-foreground">
                  {holding.company}
                </div>
                {holding.sector && (
                  <div className="text-xs text-muted-foreground">
                    {holding.sector}
                  </div>
                )}
              </div>
              <div className="text-right text-sm font-medium">
                {holding.allocation}%
              </div>
            </div>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-xs text-muted-foreground hover:text-foreground"
          >
            {showAll ? 'Show less' : 'Show more'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
