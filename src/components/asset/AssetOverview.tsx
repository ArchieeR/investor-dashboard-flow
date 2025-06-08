
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AssetOverviewProps {
  asset: {
    objective: string;
    ter: string;
    indexTracked: string;
    domicile: string;
  };
}

export const AssetOverview = ({ asset }: AssetOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Fund Objective
            </div>
            <div className="text-sm text-foreground">
              {asset.objective}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              TER
            </div>
            <div className="text-sm text-foreground">
              {asset.ter}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Index Tracked
            </div>
            <div className="text-sm text-foreground">
              {asset.indexTracked}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Domicile
            </div>
            <div className="text-sm text-foreground">
              {asset.domicile}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
