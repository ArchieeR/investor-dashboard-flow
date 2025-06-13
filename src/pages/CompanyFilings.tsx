
import { useState } from 'react';
import { TopNavigation } from '@/components/portfolio/TopNavigation';
import { FilingHeader } from '@/components/filings/FilingHeader';
import { FinancialCards } from '@/components/filings/FinancialCards';
import { FilingTable } from '@/components/filings/FilingTable';
import { SavedViews } from '@/components/filings/SavedViews';
import { AIAssistant } from '@/components/filings/AIAssistant';

const CompanyFilings = () => {
  const [activeTab, setActiveTab] = useState('Company Filings');
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const [filingType, setFilingType] = useState('Quarterly');
  const [dateRange, setDateRange] = useState('Last 4 quarters');

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Company Filings</h1>
        </div>

        <FilingHeader
          selectedTicker={selectedTicker}
          onTickerChange={setSelectedTicker}
          filingType={filingType}
          onFilingTypeChange={setFilingType}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <AIAssistant ticker={selectedTicker} />

        <FinancialCards ticker={selectedTicker} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <SavedViews />
          </div>
          <div className="lg:col-span-3">
            <FilingTable 
              ticker={selectedTicker}
              filingType={filingType}
              dateRange={dateRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyFilings;
