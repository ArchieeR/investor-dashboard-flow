
import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EditableCell } from './EditableCell';
import { ColumnManager } from './ColumnManager';
import { ViewModeSelector } from './ViewModeSelector';
import { PortfolioHolding, ColumnConfig, ViewMode, GroupedHoldings } from '@/types/portfolio';

// Updated mock data with all specified accounts and holdings
const mockHoldings: PortfolioHolding[] = [
  // Stocks & Shares ISA
  {
    id: '1',
    ticker: 'NUCL',
    assetName: 'HAN‑Sprott Uranium Miners UCITS ETF',
    percentEquity: 1.1,
    percentPortfolio: 1.1,
    category: 'SATELLITE',
    account: 'Stocks & Shares ISA',
    fx: 'GBP',
    price: 7.15,
    deltaPercent: 0.15,
    quantity: 28, // £200 / £7.15
    value: 200,
    notes: '',
    type: 'ETF'
  },
  {
    id: '2',
    ticker: 'DFNG',
    assetName: 'VanEck Defense UCITS ETF',
    percentEquity: 1.7,
    percentPortfolio: 1.7,
    category: 'SATELLITE',
    account: 'Stocks & Shares ISA',
    fx: 'GBP',
    price: 40.20,
    deltaPercent: 0.25,
    quantity: 7, // £300 / £40.20
    value: 300,
    notes: '',
    type: 'ETF'
  },
  {
    id: '3',
    ticker: 'NATO',
    assetName: 'Tema NATO & Cybersecurity UCITS ETF',
    percentEquity: 2.2,
    percentPortfolio: 2.2,
    category: 'SATELLITE',
    account: 'Stocks & Shares ISA',
    fx: 'GBP',
    price: 25.00,
    deltaPercent: 0.35,
    quantity: 16, // £400 / £25
    value: 400,
    notes: '',
    type: 'ETF'
  },
  {
    id: '4',
    ticker: 'IEM',
    assetName: 'iShares Emerging Markets ETF',
    percentEquity: 2.8,
    percentPortfolio: 2.8,
    category: 'CORE',
    account: 'Stocks & Shares ISA',
    fx: 'GBP',
    price: 20.00,
    deltaPercent: 0.12,
    quantity: 25, // £500 / £20
    value: 500,
    notes: '',
    type: 'ETF'
  },
  {
    id: '5',
    ticker: 'DXJP',
    assetName: 'WisdomTree Japan Hedged Equity ETF',
    percentEquity: 8.3,
    percentPortfolio: 8.3,
    category: 'CORE',
    account: 'Stocks & Shares ISA',
    fx: 'GBP',
    price: 15.00,
    deltaPercent: 0.08,
    quantity: 100, // £1500 / £15
    value: 1500,
    notes: '',
    type: 'ETF'
  },
  {
    id: '6',
    ticker: 'IIND',
    assetName: 'iShares India ETF',
    percentEquity: 2.2,
    percentPortfolio: 2.2,
    category: 'CORE',
    account: 'Stocks & Shares ISA',
    fx: 'GBP',
    price: 18.00,
    deltaPercent: 0.18,
    quantity: 22, // £400 / £18
    value: 400,
    notes: '',
    type: 'ETF'
  },
  {
    id: '7',
    ticker: 'CS1',
    assetName: 'iShares MSCI Spain ETF',
    percentEquity: 2.2,
    percentPortfolio: 2.2,
    category: 'CORE',
    account: 'Stocks & Shares ISA',
    fx: 'GBP',
    price: 10.00,
    deltaPercent: 0.05,
    quantity: 40, // £400 / £10
    value: 400,
    notes: '',
    type: 'ETF'
  },
  
  // Lifetime ISA
  {
    id: '8',
    ticker: 'EQQQ',
    assetName: 'Invesco Nasdaq‑100 UCITS ETF',
    percentEquity: 11.1,
    percentPortfolio: 11.1,
    category: 'CORE',
    account: 'Lifetime ISA',
    fx: 'GBP',
    price: 50.00,
    deltaPercent: 0.42,
    quantity: 40, // £2000 / £50
    value: 2000,
    notes: '',
    type: 'ETF'
  },
  {
    id: '9',
    ticker: 'SPXP',
    assetName: 'SPDR S&P 500 ETF',
    percentEquity: 11.1,
    percentPortfolio: 11.1,
    category: 'CORE',
    account: 'Lifetime ISA',
    fx: 'GBP',
    price: 60.00,
    deltaPercent: 0.38,
    quantity: 33, // £2000 / £60
    value: 2000,
    notes: '',
    type: 'ETF'
  },
  
  // Crypto Account
  {
    id: '10',
    ticker: 'SOL',
    assetName: 'Solana',
    percentEquity: 0,
    percentPortfolio: 1.7,
    category: 'ALTS',
    account: 'Crypto Account',
    fx: 'GBP',
    price: 300.00,
    deltaPercent: 2.15,
    quantity: 1,
    value: 300,
    notes: '',
    type: 'Crypto'
  },
  {
    id: '11',
    ticker: 'ETH',
    assetName: 'Ethereum',
    percentEquity: 0,
    percentPortfolio: 2.8,
    category: 'ALTS',
    account: 'Crypto Account',
    fx: 'GBP',
    price: 500.00,
    deltaPercent: 1.85,
    quantity: 1,
    value: 500,
    notes: '',
    type: 'Crypto'
  },
  {
    id: '12',
    ticker: 'XRP',
    assetName: 'Ripple',
    percentEquity: 0,
    percentPortfolio: 1.1,
    category: 'ALTS',
    account: 'Crypto Account',
    fx: 'GBP',
    price: 200.00,
    deltaPercent: -0.95,
    quantity: 1,
    value: 200,
    notes: '',
    type: 'Crypto'
  },
  {
    id: '13',
    ticker: 'ADA',
    assetName: 'Cardano',
    percentEquity: 0,
    percentPortfolio: 2.8,
    category: 'ALTS',
    account: 'Crypto Account',
    fx: 'GBP',
    price: 500.00,
    deltaPercent: 0.75,
    quantity: 1,
    value: 500,
    notes: '',
    type: 'Crypto'
  },
  
  // Cash ISA
  {
    id: '14',
    ticker: 'CASH',
    assetName: 'Cash Holdings',
    percentEquity: 0,
    percentPortfolio: 22.2,
    category: 'ALTS',
    account: 'Cash ISA',
    fx: 'GBP',
    price: 1.00,
    deltaPercent: 0.00,
    quantity: 4000,
    value: 4000,
    notes: '',
    type: 'Cash'
  },
  
  // Alternative Assets
  {
    id: '15',
    ticker: 'CAR',
    assetName: 'Vehicle Asset',
    percentEquity: 0,
    percentPortfolio: 27.8,
    category: 'ALTS',
    account: 'Alternative Assets',
    fx: 'GBP',
    price: 5000.00,
    deltaPercent: 0.00,
    quantity: 1,
    value: 5000,
    notes: '',
    type: 'Alternative'
  }
];

const defaultColumns: ColumnConfig[] = [
  { key: 'account', label: 'Account', visible: true, editable: false, resizable: true, width: 140, type: 'text' },
  { key: 'ticker', label: 'Ticker', visible: true, editable: false, resizable: true, width: 80, type: 'text' },
  { key: 'assetName', label: 'Asset Name', visible: true, editable: false, resizable: true, width: 200, type: 'text' },
  { key: 'price', label: 'Price', visible: true, editable: false, resizable: true, width: 100, type: 'currency' },
  { key: 'quantity', label: 'Qty', visible: true, editable: true, resizable: true, width: 80, type: 'number' },
  { key: 'value', label: 'Value', visible: true, editable: false, resizable: true, width: 120, type: 'currency' },
  { key: 'percentPortfolio', label: '% Portfolio', visible: true, editable: true, resizable: true, width: 100, type: 'percentage' },
  { key: 'percentEquity', label: '% Equity', visible: true, editable: true, resizable: true, width: 80, type: 'percentage' },
  { key: 'deltaPercent', label: 'Δ %', visible: true, editable: false, resizable: true, width: 80, type: 'percentage' },
  { key: 'notes', label: 'Notes', visible: true, editable: true, resizable: true, width: 120, type: 'text' }
];

export const EnhancedPortfolioTable = () => {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>(mockHoldings);
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns);
  const [viewMode, setViewMode] = useState<ViewMode>('general');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['CORE', 'SATELLITE', 'ALTS', 'Stocks & Shares ISA', 'Lifetime ISA', 'Crypto Account', 'Cash ISA', 'Alternative Assets']));
  const [sortBy, setSortBy] = useState<keyof PortfolioHolding>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const visibleColumns = columns.filter(col => col.visible);
  const totalPortfolioValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

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
      'Gold': 'bg-amber-100 text-amber-800',
      'Cash': 'bg-gray-100 text-gray-800',
      'Alternative': 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      'CORE': 'Core Holdings',
      'SATELLITE': 'Satellite Holdings', 
      'ALTS': 'Alternative Holdings'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const renderTableHeader = () => (
    <thead>
      <tr className="border-b">
        {visibleColumns.map((column) => (
          <th
            key={column.key}
            className="pb-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground text-left px-2"
            style={{ width: column.width, minWidth: column.width }}
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

  const renderHoldingRow = (holding: PortfolioHolding) => (
    <tr key={holding.id} className="border-b hover:bg-accent transition-colors">
      {visibleColumns.map((column) => (
        <td 
          key={column.key} 
          className="py-2 px-2" 
          style={{ width: column.width, minWidth: column.width }}
        >
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
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full" style={{ tableLayout: 'fixed' }}>
              {renderTableHeader()}
              <tbody>
                {sortedHoldings.map(holding => renderHoldingRow(holding))}
              </tbody>
            </table>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Portfolio Total:</span>
              <span>£{totalPortfolioValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {Object.entries(groupedHoldings).map(([groupKey, groupHoldings]) => {
          const isExpanded = expandedGroups.has(groupKey);
          const groupTotal = groupHoldings.reduce((sum, holding) => sum + holding.value, 0);
          const groupPercentage = ((groupTotal / totalPortfolioValue) * 100).toFixed(1);
          
          return (
            <div key={groupKey}>
              <div
                className="flex items-center justify-between p-3 bg-muted/50 rounded cursor-pointer hover:bg-muted"
                onClick={() => toggleGroup(groupKey)}
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span className="font-medium">
                    {viewMode === 'strategy' ? getCategoryLabel(groupKey) : groupKey}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({groupHoldings.length} holdings)
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">£{groupTotal.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{groupPercentage}% of portfolio</div>
                </div>
              </div>
              
              {isExpanded && (
                <div className="overflow-x-auto ml-6">
                  <table className="w-full" style={{ tableLayout: 'fixed' }}>
                    {renderTableHeader()}
                    <tbody>
                      {groupHoldings.map(holding => renderHoldingRow(holding))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Portfolio Total:</span>
            <span>£{totalPortfolioValue.toLocaleString()}</span>
          </div>
        </div>
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
