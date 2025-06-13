import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ColumnReorderDialog } from './ColumnReorderDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowDown, ArrowUp, ChevronsUpDown, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Holding {
  asset: string;
  quantity: number;
  price: number;
  value: number;
  dayChange: number;
  totalChange: number;
  allocation: number;
}

interface Column {
  id: string;
  label: string;
  visible: boolean;
}

const mockData: Holding[] = [
  {
    asset: 'VUSA',
    quantity: 10,
    price: 100,
    value: 1000,
    dayChange: 0.05,
    totalChange: 0.10,
    allocation: 0.25,
  },
  {
    asset: 'EQQQ',
    quantity: 5,
    price: 200,
    value: 1000,
    dayChange: -0.03,
    totalChange: 0.15,
    allocation: 0.25,
  },
  {
    asset: 'VWCE',
    quantity: 20,
    price: 50,
    value: 1000,
    dayChange: 0.02,
    totalChange: 0.08,
    allocation: 0.25,
  },
  {
    asset: 'IIND',
    quantity: 8,
    price: 125,
    value: 1000,
    dayChange: 0.07,
    totalChange: 0.12,
    allocation: 0.25,
  },
];

const defaultColumns = [
  { id: 'asset', label: 'Asset', visible: true },
  { id: 'quantity', label: 'Quantity', visible: true },
  { id: 'price', label: 'Price', visible: true },
  { id: 'value', label: 'Value', visible: true },
  { id: 'dayChange', label: 'Day Change', visible: true },
  { id: 'totalChange', label: 'Total Change', visible: true },
  { id: 'allocation', label: 'Allocation', visible: true },
];

export const EnhancedPortfolioTable = () => {
  const [columns, setColumns] = useState(defaultColumns);
  const [data, setData] = useState(mockData);
  const [sortColumn, setSortColumn] = useState<keyof Holding | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (column: keyof Holding) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    }
    return 0;
  });

  const visibleColumns = columns.filter(col => col.visible);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Holdings</CardTitle>
        <div className="flex items-center space-x-2">
          <ColumnReorderDialog 
            columns={columns}
            onColumnsChange={setColumns}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHead key={column.id} onClick={() => column.id !== 'asset' && toggleSort(column.id as keyof Holding)} className={column.id !== 'asset' ? "cursor-pointer" : ""}>
                  <div className="flex items-center gap-1">
                    {column.label}
                    {sortColumn === column.id && (
                      sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                    {column.id !== 'asset' && <ChevronsUpDown className="h-4 w-4 opacity-50" />}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                {visibleColumns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === 'asset' && (
                      <div className="flex items-center gap-2">
                        <Circle className="h-2 w-2 text-muted-foreground" />
                        {row.asset}
                      </div>
                    )}
                    {column.id === 'quantity' && row.quantity}
                    {column.id === 'price' && `$${row.price.toFixed(2)}`}
                    {column.id === 'value' && `$${row.value.toFixed(2)}`}
                    {column.id === 'dayChange' && (
                      <Badge className={row.dayChange >= 0 ? "bg-green-100 text-green-600 border-green-200" : "bg-red-100 text-red-600 border-red-200"}>
                        {row.dayChange >= 0 ? "+" : ""}{row.dayChange.toFixed(2)}%
                      </Badge>
                    )}
                    {column.id === 'totalChange' && (
                      <Badge className={row.totalChange >= 0 ? "bg-green-100 text-green-600 border-green-200" : "bg-red-100 text-red-600 border-red-200"}>
                        {row.totalChange >= 0 ? "+" : ""}{row.totalChange.toFixed(2)}%
                      </Badge>
                    )}
                    {column.id === 'allocation' && `${(row.allocation * 100).toFixed(1)}%`}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
