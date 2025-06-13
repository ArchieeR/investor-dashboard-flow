
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewsFiltersProps {
  onImportanceChange: (importance: string[]) => void;
  onAssetChange: (asset: string) => void;
  currentImportance: string[];
  currentAsset: string;
}

export const NewsFilters = ({ 
  onImportanceChange, 
  onAssetChange, 
  currentImportance, 
  currentAsset 
}: NewsFiltersProps) => {
  const toggleImportance = (importance: string) => {
    if (currentImportance.includes(importance)) {
      onImportanceChange(currentImportance.filter(i => i !== importance));
    } else {
      onImportanceChange([...currentImportance, importance]);
    }
  };

  const getImportanceButtonStyle = (importance: string) => {
    const isSelected = currentImportance.includes(importance);
    
    if (importance === 'HIGH') {
      return isSelected 
        ? 'bg-green-500 text-white hover:bg-green-600' 
        : 'border-green-500 text-green-500 hover:bg-green-50';
    } else if (importance === 'MEDIUM') {
      return isSelected 
        ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
        : 'border-yellow-500 text-yellow-500 hover:bg-yellow-50';
    } else if (importance === 'LOW') {
      return isSelected 
        ? 'bg-red-500 text-white hover:bg-red-600' 
        : 'border-red-500 text-red-500 hover:bg-red-50';
    }
    return '';
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-muted-foreground">Priority:</span>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleImportance('HIGH')}
            className={getImportanceButtonStyle('HIGH')}
          >
            High
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleImportance('MEDIUM')}
            className={getImportanceButtonStyle('MEDIUM')}
          >
            Medium
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleImportance('LOW')}
            className={getImportanceButtonStyle('LOW')}
          >
            Low
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-muted-foreground">Asset:</span>
        <Select value={currentAsset} onValueChange={onAssetChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All assets">All assets</SelectItem>
            <SelectItem value="VUSA">VUSA</SelectItem>
            <SelectItem value="EQQQ">EQQQ</SelectItem>
            <SelectItem value="VWCE">VWCE</SelectItem>
            <SelectItem value="IIND">IIND</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
