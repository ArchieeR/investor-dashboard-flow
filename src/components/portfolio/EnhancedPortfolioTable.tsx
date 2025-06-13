
import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EditableCell } from './EditableCell';
import { ColumnManager } from './ColumnManager';
import { ViewModeSelector } from './ViewModeSelector';
import { PortfolioHolding, ColumnConfig, ViewMode, GroupedHoldings } from '@/types/portfolio';

// Mock data based on the Excel sheet
const mockHoldings: PortfolioHolding[] = [
  {
    id: '1',
    ticker: 'EQQQ',
    assetName: 'INVESCO NASDAQ-100 UCITS ETF',
    percentEquity: 21.9,
    percentPortfolio: 31.8,
    category: 'CORE',
    account: 'ISA',
    fx: 'GBP',
    price: 394.800,
    deltaPercent: 0.29,
    quantity: 7,
    value: 2763.60,
    notes: '',
    type: 'ETF'
  },
  {
    id: '2',
    ticker: 'SPXP',
    assetName: 'INVS&P500 UCITS ETF',
    percentEquity: 14.0,
    percentPortfolio: 20.3,
    category: 'CORE',
    account: 'ISA',
    fx: 'GBP',
    price: 882.40,
    deltaPercent: 0.51,
    quantity: 2,
    value: 1764.80,
    notes: 'ok',
    type: 'ETF'
  },
  {
    id: '3',
    ticker: 'SMGB',
    assetName: 'VESemiconductor UCITS ETF',
    percentEquity: 6.4,
    percentPortfolio: 26.1,
    category: 'SATELLITE',
    account: 'ISA',
    fx: 'GBP',
    price: 32.37,
    deltaPercent: 0.69,
    quantity: 25,
    value: 809.13,
    notes: '',
    type: 'ETF'
  },
  {
    id: '4',
    ticker: 'SGLN',
    assetName: 'ISHARES PHYSICAL GOLD ETC',
    percentEquity: 6.5,
    percentPortfolio: 0,
    category: 'ALTS',
    account: 'ISA',
    fx: 'GBP',
    price: 48.020,
    deltaPercent: 0.01,
    quantity: 17,
    value: 816.34,
    notes: 'buy',
    type: 'Gold'
  }
];

const defaultColumns: ColumnConfig[] = [
  { key: 'percentEquity', label: '% Equity', visible: true, editable: true, resizable: true, width: 80, type: 'percentage' },
  { key: 'percentPortfolio', label: '% Portfolio', visible: true, editable: true, resizable: true, width: 100, type: 'percentage' },
  { key: 'ticker', label: 'Ticker', visible: true, editable: false, resizable: true, width: 80, type: 'text' },
  { key: 'assetName', label: 'Asset Name', visible: true, editable: false, resizable: true, width: 200, type: 'text' },
  { key: 'fx', label: 'FX', visible: true, editable: false, resizable: true, width: 60, type: 'text' },
  { key: 'price', label: 'Price', visible: true, editable: false, resizable: true, width: 100, type: 'currency' },
  { key: 'deltaPercent', label: 'Δ %', visible: true, editable: false, resizable: true, width: 80, type: 'percentage' },
  { key: 'quantity', label: 'Qty', visible: true, editable: true, resizable: true, width: 80, type: 'number' },
  { key: 'value', label: 'Value', visible: true, editable: false, resizable: true, width: 120, type: 'currency' },
  { key: 'notes', label: 'Notes', visible: true, editable: true, resizable: true, width: 120, type: 'text' }
];

export const EnhancedPortfolioTable = () => {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>(mockHoldings);
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns);
  const [viewMode, setViewMode] = useState<ViewMode>('general');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['CORE', 'SATELLITE', 'ALTS']));
  const [sortBy, setSortBy] = useState<keyof PortfolioHolding>('percentEquity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const visibleColumns = columns.filter(col => col.visible);

  const sortedHoldings = useMemo(() => {
    return [...holdings].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * multiplier;
      }
      return String(aVal).localeCompare(String(bVal)) * multiplier;
    });
  }, [holdings, sortBy, sortOrder]);

  const groupedHoldings = useMemo((): GroupedHoldings => {
    if (viewMode === 'strategy') {
      return sortedHoldings.reduce((acc, holding) => {
        const category = holding.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(holding);
        return acc;
      }, {} as GroupedHoldings);
    } else if (viewMode === 'account') {
      return sortedHoldings.reduce((acc, holding) => {
        const account = holding.account;
        if (!acc[account]) acc[account] = [];
        acc[account].push(holding);
        return acc;
      }, {} as GroupedHoldings);
    }
    return { 'All Holdings': sortedHoldings };
  }, [sortedHoldings, viewMode]);

  const handleSort = (field: keyof PortfolioHolding) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleCellEdit = (holdingId: string, field: keyof PortfolioHolding, value: string | number) => {
    setHoldings(prev => prev.map(holding => {
      if (holding.id === holdingId) {
        const updated = { ...holding, [field]: value };
        
        // Auto-calculate dependent values
        if (field === 'quantity' || field === 'price') {
          updated.value = updated.quantity * updated.price;
        }
        
        return updated;
      }
      return holding;
    }));
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'ETF': 'bg-blue-100 text-blue-800',
      'Stock': 'bg-green-100 text-green-800',
      'Crypto': 'bg-orange-100 text-orange-800',
      'Bond': 'bg-purple-100 text-purple-800',
      'REIT': 'bg-yellow-100 text-yellow-800',
      'Gold': 'bg-amber-100 text-amber-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderTableHeader = () => (
    <thead>
      <tr className="border-b">
        {visibleColumns.map((column) => (
          <th
            key={column.key}
            className="pb-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground text-left px-2"
            style={{ width: column.width }}
            onClick={() => handleSort(column.key)}
          >
            <div className="flex items-center gap-1">
              {column.label}
              {sortBy === column.key && (
                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderHoldingRow = (holding: PortfolioHolding, showGroupColumn = false) => (
    <tr key={holding.id} className="border-b hover:bg-accent transition-colors">
      {visibleColumns.map((column) => (
        <td key={column.key} className="py-2 px-2">
          {column.key === 'type' ? (
            <Badge variant="secondary" className={getTypeColor(holding.type)}>
              {holding.type}
            </Badge>
          ) : column.key === 'deltaPercent' ? (
            <span className={holding.deltaPercent >= 0 ? 'text-green-600' : 'text-red-600'}>
              {holding.deltaPercent >= 0 ? '+' : ''}{holding.deltaPercent}%
            </span>
          ) : (
            <EditableCell
              value={holding[column.key] as string | number}
              type={column.type}
              editable={column.editable}
              onSave={(value) => handleCellEdit(holding.id, column.key, value)}
            />
          )}
        </td>
      ))}
    </tr>
  );

  const renderGroupedTable = () => {
    if (viewMode === 'general') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            {renderTableHeader()}
            <tbody>
              {sortedHoldings.map(holding => renderHoldingRow(holding))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            {renderTableHeader()}
          </table>
        </div>
        
        {Object.entries(groupedHoldings).map(([groupKey, groupHoldings]) => {
          const isExpanded = expandedGroups.has(groupKey);
          const groupTotal = groupHoldings.reduce((sum, holding) => sum + holding.value, 0);
          
          return (
            <div key={groupKey}>
              <div
                className="flex items-center gap-2 p-3 bg-muted/50 rounded cursor-pointer hover:bg-muted"
                onClick={() => toggleGroup(groupKey)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <span className="font-medium">{groupKey}</span>
                <span className="text-sm text-muted-foreground">
                  ({groupHoldings.length} holdings, £{groupTotal.toLocaleString()})
                </span>
              </div>
              
              {isExpanded && (
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <tbody>
                      {groupHoldings.map(holding => renderHoldingRow(holding, true))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Holdings</CardTitle>
          <div className="flex items-center gap-4">
            <ViewModeSelector currentMode={viewMode} onModeChange={setViewMode} />
            <div className="relative">
              <ColumnManager columns={columns} onColumnsChange={setColumns} />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="h-full overflow-auto">
        {renderGroupedTable()}
      </CardContent>
    </Card>
  );
};
