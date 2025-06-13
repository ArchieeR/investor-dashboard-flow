
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

export const CountryExposure = () => {
  const countries = [
    { name: 'United States', percentage: 72.5, flag: '🇺🇸' },
    { name: 'Japan', percentage: 8.2, flag: '🇯🇵' },
    { name: 'United Kingdom', percentage: 4.1, flag: '🇬🇧' },
    { name: 'France', percentage: 3.8, flag: '🇫🇷' },
    { name: 'Others', percentage: 11.4, flag: '🌍' },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-1">
          <Globe className="h-3 w-3" />
          Country Exposure
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {countries.map((country, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span className="text-sm">{country.flag}</span>
                <span className="font-medium truncate">{country.name}</span>
              </div>
              <span className="font-semibold">{country.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${country.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
