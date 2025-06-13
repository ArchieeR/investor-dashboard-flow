
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

export const AssetCountryExposure = () => {
  const countryData = [
    { country: 'United States', percentage: 72.5, flag: '🇺🇸' },
    { country: 'Japan', percentage: 8.2, flag: '🇯🇵' },
    { country: 'United Kingdom', percentage: 4.1, flag: '🇬🇧' },
    { country: 'France', percentage: 3.8, flag: '🇫🇷' },
    { country: 'Canada', percentage: 3.2, flag: '🇨🇦' },
    { country: 'Others', percentage: 8.2, flag: '🌍' },
  ];

  return (
    <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-sky-700">
          <Globe className="h-4 w-4" />
          Country Exposure
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {countryData.map((country, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{country.flag}</span>
                <span className="font-medium">{country.country}</span>
              </div>
              <span className="font-semibold text-sky-700">{country.percentage}%</span>
            </div>
            <div className="w-full bg-sky-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-sky-400 to-sky-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${country.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
